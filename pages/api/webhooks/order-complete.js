import crypto from 'crypto';
import { Amplify, API } from 'aws-amplify';
import awsExports from '../../../src/aws-exports';

if (typeof window === 'undefined') {
  Amplify.configure(awsExports);
}

const getOrderQuery = /* GraphQL */ `
  query GetOrderForCompletion($id: ID!) {
    getOrder(id: $id) {
      id
      status
      userID
      page
    }
  }
`;

const updateOrderMutation = /* GraphQL */ `
  mutation UpdateOrderForCompletion($input: UpdateOrderInput!) {
    updateOrder(input: $input) {
      id
      status
    }
  }
`;

const createAbEventMutation = /* GraphQL */ `
  mutation CreateAbTestEventForCompletion($input: CreateAbTestEventInput!) {
    createAbTestEvent(input: $input) {
      id
    }
  }
`;

const listAbIntentEventsQuery = /* GraphQL */ `
  query ListRecentAbIntentEvents(
    $filter: ModelAbTestEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAbTestEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        eventName
        variant
        sessionId
        userID
        pagePath
        deviceType
        acquisitionChannel
        acquisitionSource
        acquisitionMedium
        acquisitionCampaign
        metadata
      }
      nextToken
    }
  }
`;

function verifyWebhookSignature(rawBody, signature, secret) {
  if (!signature || !secret) return false;
  const expected = crypto
    .createHmac('sha256', secret)
    .update(rawBody, 'utf8')
    .digest('hex');

  try {
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  } catch {
    return false;
  }
}

async function readRawBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks).toString('utf8');
}

function normalizeString(value) {
  if (value === undefined || value === null || value === '') return null;
  return String(value);
}

function normalizeLower(value) {
  const normalized = normalizeString(value);
  return normalized ? normalized.toLowerCase() : null;
}

function isLikelyInternalOrderId(value) {
  const normalized = normalizeString(value);
  if (!normalized) return false;
  if (/^\d+$/.test(normalized)) return false;
  return normalized.length >= 12;
}

function normalizeComparable(value) {
  const normalized = normalizeString(value);
  if (!normalized) return null;
  return normalized.trim().toLowerCase().replace(/\s+/g, ' ');
}

function normalizeNumber(value) {
  if (value === undefined || value === null || value === '') return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.round(parsed) : null;
}

function deriveGrossCentsFromItems(items) {
  if (!Array.isArray(items)) return null;
  const total = items.reduce((sum, item) => {
    const amountCents = normalizeNumber(item?.amount_cents);
    const quantity = normalizeNumber(item?.quantity) || 1;
    if (!Number.isFinite(amountCents)) return sum;
    return sum + amountCents * quantity;
  }, 0);
  return Number.isFinite(total) ? total : null;
}

function parseEventMetadata(rawMetadata) {
  if (!rawMetadata) return {};
  if (typeof rawMetadata === 'object') return rawMetadata;
  try {
    const first = JSON.parse(rawMetadata);
    if (typeof first === 'string') {
      try {
        return JSON.parse(first);
      } catch {
        return {};
      }
    }
    return first && typeof first === 'object' ? first : {};
  } catch {
    return {};
  }
}

async function getBestIntentMatch({ productName, userEmail, createdAtIso }) {
  const createdAtMs = Date.parse(createdAtIso || '');
  if (!Number.isFinite(createdAtMs)) return null;

  const lowerBound = new Date(createdAtMs - 24 * 60 * 60 * 1000).toISOString();
  const normalizedProductName = normalizeComparable(productName);
  const normalizedEmail = normalizeComparable(userEmail);

  let nextToken = null;
  let candidates = [];

  do {
    const result = await API.graphql({
      query: listAbIntentEventsQuery,
      variables: {
        filter: {
          experimentKey: { eq: 'home_v1' },
          eventName: { eq: 'ab_purchase_intent' },
          createdAt: { ge: lowerBound },
        },
        limit: 500,
        nextToken,
      },
    });

    const page = result?.data?.listAbTestEvents?.items || [];
    candidates = candidates.concat(page);
    nextToken = result?.data?.listAbTestEvents?.nextToken || null;
  } while (nextToken && candidates.length < 1500);

  let bestMatch = null;

  for (const candidate of candidates) {
    const candidateCreatedAtMs = Date.parse(candidate?.createdAt || '');
    if (!Number.isFinite(candidateCreatedAtMs)) continue;

    const metadata = parseEventMetadata(candidate?.metadata);
    const candidateCourseName = normalizeComparable(
      metadata?.courseName || metadata?.productName,
    );
    const candidateEmail = normalizeComparable(metadata?.email);
    const timeDeltaMs = Math.abs(createdAtMs - candidateCreatedAtMs);

    const courseMatches =
      normalizedProductName &&
      candidateCourseName &&
      (candidateCourseName === normalizedProductName ||
        candidateCourseName.includes(normalizedProductName) ||
        normalizedProductName.includes(candidateCourseName));
    const emailMatches = normalizedEmail && candidateEmail && candidateEmail === normalizedEmail;

    // Must have at least one strong signal and be reasonably close in time.
    if (!courseMatches && !emailMatches) continue;
    if (timeDeltaMs > 12 * 60 * 60 * 1000) continue;

    // Weighted scoring: exact email/course wins, then closer timestamp.
    const score =
      (emailMatches ? 3 : 0) +
      (courseMatches ? 3 : 0) +
      Math.max(0, 2 - timeDeltaMs / (60 * 60 * 1000));

    if (!bestMatch || score > bestMatch.score) {
      bestMatch = {
        score,
        event: candidate,
      };
    }
  }

  return bestMatch?.event || null;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const rawBody = await readRawBody(req);
    let body = {};
    try {
      body = rawBody ? JSON.parse(rawBody) : {};
    } catch {
      return res.status(400).json({ error: 'Invalid JSON payload' });
    }

    const webhookSecret = process.env.THINKIFIC_WEBHOOK_SECRET;
    const signature =
      req.headers['x-thinkific-signature'] || req.headers['x-webhook-signature'];

    if (webhookSecret && signature) {
      const isValid = verifyWebhookSignature(rawBody, signature, webhookSecret);
      if (!isValid) {
        return res.status(401).json({ error: 'Invalid webhook signature' });
      }
    }

    const payload = body.payload || body;
    const action = normalizeLower(body.action || payload.action);
    const orderStatus = normalizeLower(payload.status);
    const looksCompleted =
      ['paid', 'completed', 'purchase'].includes(action || '') ||
      ['complete', 'completed', 'paid'].includes(orderStatus || '');

    if (!looksCompleted) {
      return res.status(200).json({
        success: true,
        ignored: true,
        reason: `Webhook action/status '${action || 'unknown'}/${orderStatus || 'unknown'}' does not represent completed sale`,
      });
    }

    const metadata = payload.metadata || payload.custom_fields || null;
    const possibleInternalOrderId = normalizeString(
      payload.order_id || payload.internal_order_id || metadata?.order_id,
    );
    const externalOrderId = normalizeString(
      payload.id ||
        payload.external_order_id ||
        payload.transaction_id ||
        payload.order_number,
    );

    let existingOrder = null;

    if (isLikelyInternalOrderId(possibleInternalOrderId)) {
      try {
        const orderResponse = await API.graphql({
          query: getOrderQuery,
          variables: { id: possibleInternalOrderId },
        });
        existingOrder = orderResponse?.data?.getOrder || null;
      } catch (error) {
        console.warn('Failed to fetch internal order for webhook:', error?.message);
      }
    }

    if (existingOrder && existingOrder.status !== 'COMPLETE') {
      await API.graphql({
        query: updateOrderMutation,
        variables: {
          input: {
            id: existingOrder.id,
            status: 'COMPLETE',
          },
        },
      });
    }

    const variant = normalizeString(
      payload.ab_variant || payload.variant || metadata?.ab_variant,
    );
    const sessionId = normalizeString(
      payload.ab_session_id || payload.session_id || metadata?.ab_session_id,
    );
    const deviceType = normalizeString(
      payload.device_type || payload.device || metadata?.device_type || metadata?.device,
    );
    const acquisitionChannel = normalizeString(
      payload.acquisition_channel || metadata?.acquisition_channel,
    );
    const acquisitionSource = normalizeString(
      payload.acquisition_source || metadata?.acquisition_source,
    );
    const acquisitionMedium = normalizeString(
      payload.acquisition_medium || metadata?.acquisition_medium,
    );
    const acquisitionCampaign = normalizeString(
      payload.acquisition_campaign || metadata?.acquisition_campaign,
    );
    const webhookCreatedAt =
      normalizeString(payload.created_at) || normalizeString(body.created_at);
    const webhookProductName = normalizeString(payload.product_name);
    const webhookUserEmail = normalizeString(payload?.user?.email);
    const webhookOrderNumber = normalizeString(payload?.order_number);
    const webhookPurchaserFirstName = normalizeString(payload?.user?.first_name);
    const webhookPurchaserLastName = normalizeString(payload?.user?.last_name);
    const webhookCouponCode = normalizeString(payload?.coupon?.code);
    const netAmountCents = normalizeNumber(payload?.amount_cents);
    const grossAmountCents = deriveGrossCentsFromItems(payload?.items) ?? netAmountCents;
    const discountAmountCents =
      Number.isFinite(grossAmountCents) && Number.isFinite(netAmountCents)
        ? grossAmountCents - netAmountCents
        : null;

    let matchedIntentEvent = null;
    const needsBackfill = !variant || !sessionId;
    if (needsBackfill) {
      try {
        matchedIntentEvent = await getBestIntentMatch({
          productName: webhookProductName,
          userEmail: webhookUserEmail,
          createdAtIso: webhookCreatedAt,
        });
      } catch (error) {
        console.warn('Failed to backfill from purchase intent:', error?.message);
      }
    }

    const eventMetadata = {
      customMetadata: metadata || null,
      webhookPayload: {
        id: payload?.id ?? null,
        order_number: payload?.order_number ?? null,
        status: payload?.status ?? null,
        payment_type: payload?.payment_type ?? null,
        amount_cents: payload?.amount_cents ?? null,
        amount_dollars: payload?.amount_dollars ?? null,
        product_name: payload?.product_name ?? null,
        product_id: payload?.product_id ?? null,
        coupon: payload?.coupon ?? null,
        user: payload?.user ?? null,
        items: Array.isArray(payload?.items) ? payload.items : [],
      },
    };

    await API.graphql({
      query: createAbEventMutation,
      variables: {
        input: {
          experimentKey: 'home_v1',
          eventName: 'ab_purchase_complete',
          variant: normalizeString(variant || matchedIntentEvent?.variant),
          sessionId: normalizeString(sessionId || matchedIntentEvent?.sessionId),
          deviceType: normalizeString(deviceType || matchedIntentEvent?.deviceType),
          acquisitionChannel: normalizeString(
            acquisitionChannel || matchedIntentEvent?.acquisitionChannel,
          ),
          acquisitionSource: normalizeString(
            acquisitionSource || matchedIntentEvent?.acquisitionSource,
          ),
          acquisitionMedium: normalizeString(
            acquisitionMedium || matchedIntentEvent?.acquisitionMedium,
          ),
          acquisitionCampaign: normalizeString(
            acquisitionCampaign || matchedIntentEvent?.acquisitionCampaign,
          ),
          userID: normalizeString(
            existingOrder?.userID ||
              matchedIntentEvent?.userID ||
              payload?.user?.id ||
              metadata?.user_id,
          ),
          pagePath: normalizeString(
            existingOrder?.page || matchedIntentEvent?.pagePath || metadata?.page_path,
          ),
          orderId: normalizeString(existingOrder?.id || possibleInternalOrderId),
          externalOrderId,
          orderNumber: webhookOrderNumber,
          purchaserEmail: webhookUserEmail,
          purchaserFirstName: webhookPurchaserFirstName,
          purchaserLastName: webhookPurchaserLastName,
          couponCode: webhookCouponCode,
          grossAmountCents,
          netAmountCents,
          discountAmountCents,
          source: 'lms_webhook',
          metadata: JSON.stringify(eventMetadata),
          createdAt: new Date().toISOString(),
        },
      },
    });

    return res.status(200).json({
      success: true,
      internalOrderId: existingOrder?.id || possibleInternalOrderId || null,
      externalOrderId,
      matchedInternalOrder: Boolean(existingOrder),
      matchedIntentEventId: matchedIntentEvent?.id || null,
    });
  } catch (error) {
    console.error('Order completion webhook failed:', error);
    return res.status(500).json({ error: 'Failed to process order webhook' });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
