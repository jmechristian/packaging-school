import crypto from 'crypto';
import { Amplify, API } from 'aws-amplify';
import awsExports from '../../../src/aws-exports';
import { eventsByEmailQuery, toExperimentDay } from '../../../libs/abAnalyticsQueries';

if (typeof window === 'undefined') {
  Amplify.configure(awsExports);
}

const EXPERIMENT_KEY = 'home_v1';
const WEBHOOK_SOURCE = 'thinkific_order_webhook';

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

const createWebhookReceiptMutation = /* GraphQL */ `
  mutation CreateAbWebhookReceipt($input: CreateAbWebhookReceiptInput!) {
    createAbWebhookReceipt(input: $input) {
      id
    }
  }
`;

// Indexed intent lookup by buyer email (abEventByEmail GSI), most-recent first.
const intentByEmailQuery = eventsByEmailQuery(`
  id
  createdAt
  eventName
  variant
  sessionId
  userID
  email
  pagePath
  deviceType
  acquisitionChannel
  acquisitionSource
  acquisitionMedium
  acquisitionCampaign
  metadata
`);

function isDuplicateMutationError(error) {
  const raw = JSON.stringify(error || {});
  return (
    raw.includes('ConditionalCheckFailedException') ||
    raw.includes('already exists') ||
    raw.includes('The conditional request failed')
  );
}

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

function normalizeEmail(value) {
  const normalized = normalizeString(value);
  return normalized ? normalized.trim().toLowerCase() : null;
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

function toReceiptDay(createdAtIso) {
  const date = createdAtIso ? new Date(createdAtIso) : new Date();
  const safe = Number.isNaN(date.getTime()) ? new Date() : date;
  const y = safe.getUTCFullYear();
  const m = String(safe.getUTCMonth() + 1).padStart(2, '0');
  const d = String(safe.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function buildPurchaseCompleteEventId({
  externalOrderId,
  orderNumber,
  fallbackOrderId,
  payloadCreatedAt,
}) {
  const stableKey =
    normalizeString(externalOrderId) ||
    normalizeString(orderNumber) ||
    normalizeString(fallbackOrderId) ||
    normalizeString(payloadCreatedAt);
  if (!stableKey) return null;

  const normalized = String(stableKey).trim().toLowerCase();
  let hash = 0;
  for (let i = 0; i < normalized.length; i += 1) {
    hash = (hash << 5) - hash + normalized.charCodeAt(i);
    hash |= 0;
  }
  return `abpc_${Math.abs(hash).toString(36)}`;
}

async function withTimeout(promise, ms) {
  let timeoutId;
  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error(`Timed out after ${ms}ms`)), ms);
  });
  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    clearTimeout(timeoutId);
  }
}

// Deterministic-ish attribution: scope to the buyer email via the GSI (no table
// scan), then tie-break by product match and time proximity within a window.
async function findIntentByEmail({ email, productName, createdAtIso, windowHours = 72 }) {
  const canonicalEmail = normalizeEmail(email);
  if (!canonicalEmail) return null;

  const createdAtMs = Date.parse(createdAtIso || '');
  const anchorMs = Number.isFinite(createdAtMs) ? createdAtMs : Date.now();
  const lowerBound = new Date(anchorMs - windowHours * 60 * 60 * 1000).toISOString();
  const normalizedProductName = normalizeComparable(productName);

  const result = await API.graphql({
    query: intentByEmailQuery,
    variables: {
      email: canonicalEmail,
      createdAt: { ge: lowerBound },
      sortDirection: 'DESC',
      filter: { eventName: { eq: 'ab_purchase_intent' } },
      limit: 50,
    },
  });

  const candidates = result?.data?.abTestEventsByEmailAndCreatedAt?.items || [];
  if (!candidates.length) return null;

  let best = null;
  for (const candidate of candidates) {
    const candMs = Date.parse(candidate?.createdAt || '');
    if (!Number.isFinite(candMs)) continue;

    const metadata = parseEventMetadata(candidate?.metadata);
    const candCourse = normalizeComparable(metadata?.courseName || metadata?.productName);
    const courseMatches =
      normalizedProductName &&
      candCourse &&
      (candCourse === normalizedProductName ||
        candCourse.includes(normalizedProductName) ||
        normalizedProductName.includes(candCourse));

    const timeDelta = Math.abs(anchorMs - candMs);
    const score = (courseMatches ? 5 : 0) + Math.max(0, 3 - timeDelta / (60 * 60 * 1000));

    if (!best || score > best.score) {
      best = { score, event: candidate, courseMatches: Boolean(courseMatches) };
    }
  }

  if (!best) return null;
  return {
    event: best.event,
    method: best.courseMatches ? 'email_course' : 'email_recency',
  };
}

async function recordReceipt(fields) {
  try {
    const createdAt = fields.createdAt || new Date().toISOString();
    await API.graphql({
      query: createWebhookReceiptMutation,
      variables: {
        input: {
          source: WEBHOOK_SOURCE,
          receiptDay: toReceiptDay(createdAt),
          experimentKey: EXPERIMENT_KEY,
          ...fields,
          createdAt,
        },
      },
    });
  } catch (error) {
    // Audit logging must never break the webhook response.
    console.warn('Failed to record webhook receipt:', error?.message);
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let rawBody = '';
  try {
    rawBody = await readRawBody(req);
    let body = {};
    try {
      body = rawBody ? JSON.parse(rawBody) : {};
    } catch {
      await recordReceipt({
        decision: 'error',
        reason: 'invalid_json',
        rawPayload: JSON.stringify({ raw: String(rawBody || '').slice(0, 2000) }),
      });
      return res.status(400).json({ error: 'Invalid JSON payload' });
    }

    const webhookSecret = process.env.THINKIFIC_WEBHOOK_SECRET;
    const signature =
      req.headers['x-thinkific-signature'] || req.headers['x-webhook-signature'];

    if (webhookSecret && signature) {
      const isValid = verifyWebhookSignature(rawBody, signature, webhookSecret);
      if (!isValid) {
        await recordReceipt({
          decision: 'rejected',
          reason: 'invalid_signature',
          rawPayload: JSON.stringify(body),
        });
        return res.status(401).json({ error: 'Invalid webhook signature' });
      }
    }

    const payload = body.payload || body;
    const action = normalizeLower(body.action || payload.action);
    const orderStatus = normalizeLower(payload.status);
    const looksCompleted =
      ['paid', 'completed', 'purchase', 'created'].includes(action || '') ||
      ['complete', 'completed', 'paid'].includes(orderStatus || '');

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
    const webhookOrderNumber = normalizeString(payload?.order_number);
    const webhookUserEmail = normalizeString(payload?.user?.email);

    if (!looksCompleted) {
      await recordReceipt({
        decision: 'ignored',
        reason: `action/status '${action || 'unknown'}/${orderStatus || 'unknown'}' is not a completed sale`,
        action,
        status: orderStatus,
        externalOrderId,
        orderNumber: webhookOrderNumber,
        email: normalizeEmail(webhookUserEmail),
        rawPayload: JSON.stringify(body),
      });
      return res.status(200).json({
        success: true,
        ignored: true,
        reason: `Webhook action/status '${action || 'unknown'}/${orderStatus || 'unknown'}' does not represent completed sale`,
      });
    }

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

    // Attribution fields, if Thinkific happens to echo them (usually empty).
    let variant = normalizeString(
      payload.ab_variant || payload.variant || metadata?.ab_variant,
    );
    let sessionId = normalizeString(
      payload.ab_session_id || payload.session_id || metadata?.ab_session_id,
    );
    let deviceType = normalizeString(
      payload.device_type || payload.device || metadata?.device_type || metadata?.device,
    );
    let acquisitionChannel = normalizeString(
      payload.acquisition_channel || metadata?.acquisition_channel,
    );
    let acquisitionSource = normalizeString(
      payload.acquisition_source || metadata?.acquisition_source,
    );
    let acquisitionMedium = normalizeString(
      payload.acquisition_medium || metadata?.acquisition_medium,
    );
    let acquisitionCampaign = normalizeString(
      payload.acquisition_campaign || metadata?.acquisition_campaign,
    );
    let userID = normalizeString(
      existingOrder?.userID || payload?.user?.id || metadata?.user_id,
    );
    let pagePath = normalizeString(existingOrder?.page || metadata?.page_path);

    const webhookCreatedAt =
      normalizeString(payload.created_at) || normalizeString(body.created_at);
    const webhookProductName = normalizeString(payload.product_name);
    const webhookPurchaserFirstName = normalizeString(payload?.user?.first_name);
    const webhookPurchaserLastName = normalizeString(payload?.user?.last_name);
    const webhookCouponCode = normalizeString(payload?.coupon?.code);
    const netAmountCents = normalizeNumber(payload?.amount_cents);
    const grossAmountCents = deriveGrossCentsFromItems(payload?.items) ?? netAmountCents;
    const discountAmountCents =
      Number.isFinite(grossAmountCents) && Number.isFinite(netAmountCents)
        ? grossAmountCents - netAmountCents
        : null;

    // Deterministic-ish attribution by buyer email via the GSI (no scan).
    let matchedIntent = null;
    let attributionMethod = variant && sessionId ? 'payload' : 'none';
    if (!variant || !sessionId) {
      try {
        const match = await withTimeout(
          findIntentByEmail({
            email: webhookUserEmail,
            productName: webhookProductName,
            createdAtIso: webhookCreatedAt,
            windowHours: 72,
          }),
          3000,
        );
        if (match?.event) {
          matchedIntent = match.event;
          attributionMethod = match.method;
          variant = variant || normalizeString(matchedIntent.variant);
          sessionId = sessionId || normalizeString(matchedIntent.sessionId);
          deviceType = deviceType || normalizeString(matchedIntent.deviceType);
          acquisitionChannel =
            acquisitionChannel || normalizeString(matchedIntent.acquisitionChannel);
          acquisitionSource =
            acquisitionSource || normalizeString(matchedIntent.acquisitionSource);
          acquisitionMedium =
            acquisitionMedium || normalizeString(matchedIntent.acquisitionMedium);
          acquisitionCampaign =
            acquisitionCampaign || normalizeString(matchedIntent.acquisitionCampaign);
          userID = userID || normalizeString(matchedIntent.userID);
          pagePath = pagePath || normalizeString(matchedIntent.pagePath);
        }
      } catch (error) {
        console.warn('Email intent match failed:', error?.message);
      }
    }

    const eventMetadata = {
      customMetadata: metadata || null,
      attribution: {
        method: attributionMethod,
        matchedIntentId: matchedIntent?.id || null,
      },
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

    const dedupeEventId = buildPurchaseCompleteEventId({
      externalOrderId,
      orderNumber: webhookOrderNumber,
      fallbackOrderId: possibleInternalOrderId,
      payloadCreatedAt: webhookCreatedAt,
    });

    const completeCreatedAt = new Date().toISOString();
    const canonicalEmail = normalizeEmail(webhookUserEmail);
    let decision = 'recorded';

    try {
      await API.graphql({
        query: createAbEventMutation,
        variables: {
          input: {
            id: dedupeEventId,
            experimentKey: EXPERIMENT_KEY,
            experimentDay: toExperimentDay(EXPERIMENT_KEY, completeCreatedAt),
            eventName: 'ab_purchase_complete',
            variant: normalizeString(variant),
            sessionId: normalizeString(sessionId),
            deviceType: normalizeString(deviceType),
            acquisitionChannel: normalizeString(acquisitionChannel),
            acquisitionSource: normalizeString(acquisitionSource),
            acquisitionMedium: normalizeString(acquisitionMedium),
            acquisitionCampaign: normalizeString(acquisitionCampaign),
            userID: normalizeString(userID),
            email: canonicalEmail,
            pagePath: normalizeString(pagePath),
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
            matchedIntentId: matchedIntent?.id || null,
            attributionMethod,
            source: 'lms_webhook',
            metadata: JSON.stringify(eventMetadata),
            createdAt: completeCreatedAt,
          },
        },
      });
    } catch (error) {
      if (isDuplicateMutationError(error)) {
        decision = 'duplicate';
      } else {
        await recordReceipt({
          decision: 'error',
          reason: error?.message || 'create_event_failed',
          action,
          status: orderStatus,
          externalOrderId,
          orderNumber: webhookOrderNumber,
          email: canonicalEmail,
          variant,
          matchedSessionId: sessionId,
          matchedIntentId: matchedIntent?.id || null,
          attributionMethod,
          abEventId: dedupeEventId,
          rawPayload: JSON.stringify(body),
        });
        throw error;
      }
    }

    await recordReceipt({
      decision,
      action,
      status: orderStatus,
      externalOrderId,
      orderNumber: webhookOrderNumber,
      email: canonicalEmail,
      variant,
      matchedSessionId: sessionId,
      matchedIntentId: matchedIntent?.id || null,
      attributionMethod,
      abEventId: dedupeEventId,
      rawPayload: JSON.stringify(body),
      createdAt: completeCreatedAt,
    });

    return res.status(200).json({
      success: true,
      decision,
      internalOrderId: existingOrder?.id || possibleInternalOrderId || null,
      externalOrderId,
      matchedInternalOrder: Boolean(existingOrder),
      matchedIntentEventId: matchedIntent?.id || null,
      attributionMethod,
      abEventId: dedupeEventId,
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
