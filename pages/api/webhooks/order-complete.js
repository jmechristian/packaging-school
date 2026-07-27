import crypto from 'crypto';
import { Amplify, API } from 'aws-amplify';
import awsExports from '../../../src/aws-exports';
import { eventsByEmailQuery, toExperimentDay } from '../../../libs/abAnalyticsQueries';
import { isLinkedInTargetProduct, sendLinkedInConversionEvent } from '../../../libs/linkedinConversions';

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

// Indexed lookup of a buyer's events by email (abEventByEmail GSI), most-recent
// first. Pulls all event types so attribution can be derived from any touch.
const buyerEventsByEmailQuery = eventsByEmailQuery(`
  id
  createdAt
  eventName
  variant
  sessionId
  visitorId
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

// Channel values that don't represent a real acquisition touch (so we can skip
// them when crediting the "last non-direct touch").
const DIRECT_CHANNELS = new Set([
  'direct',
  '(direct)',
  'none',
  '(none)',
  'unassigned',
  'na',
  'unknown',
]);

function isNonDirectChannel(channel) {
  const c = normalizeLower(channel);
  if (!c) return false;
  return !DIRECT_CHANNELS.has(c);
}

function hasAnyChannel(event) {
  return Boolean(normalizeString(event?.acquisitionChannel));
}

// firstTouch is identical across a visitor's events (their very first landing),
// so grab it from whichever buyer event carries it.
function pickFirstTouch(events) {
  for (const event of events) {
    const meta = parseEventMetadata(event?.metadata);
    if (meta?.firstTouch && typeof meta.firstTouch === 'object') {
      return meta.firstTouch;
    }
  }
  return null;
}

// A Thinkific order webhook is server-to-server: no browser cookies, so no
// visitorId/sessionId on the request. The buyer email is the only identity we
// get. This resolves the buyer's on-site journey via the abEventByEmail GSI (no
// table scan) and derives last-non-direct-touch attribution so the complete row
// is stamped with the acquisition context that already exists on their events.
async function resolveBuyerAttribution({
  email,
  productName,
  createdAtIso,
  windowHours = 24 * 90, // 90 days: organic journeys can span weeks
}) {
  const canonicalEmail = normalizeEmail(email);
  if (!canonicalEmail) return null;

  const createdAtMs = Date.parse(createdAtIso || '');
  const anchorMs = Number.isFinite(createdAtMs) ? createdAtMs : Date.now();
  const lowerBound = new Date(anchorMs - windowHours * 60 * 60 * 1000).toISOString();

  // Pull ALL of the buyer's recent events (page views, product views, intents),
  // not just intents - most-recent first.
  const result = await API.graphql({
    query: buyerEventsByEmailQuery,
    variables: {
      email: canonicalEmail,
      createdAt: { ge: lowerBound },
      sortDirection: 'DESC',
      limit: 100,
    },
  });

  const items = result?.data?.abTestEventsByEmailAndCreatedAt?.items || [];
  if (!items.length) return null;

  // Only credit touches at/before the purchase (small grace for clock skew).
  const graceMs = 5 * 60 * 1000;
  const pool = items.filter((event) => {
    const ms = Date.parse(event?.createdAt || '');
    return Number.isFinite(ms) && ms <= anchorMs + graceMs;
  });
  const events = pool.length ? pool : items; // DESC (most recent first)

  const normalizedProductName = normalizeComparable(productName);

  // Best matchable purchase intent (product + time proximity) - used for
  // identity/linkage and to mark method="intent".
  let matchedIntent = null;
  let bestScore = -Infinity;
  for (const candidate of events) {
    if (candidate?.eventName !== 'ab_purchase_intent') continue;
    const candMs = Date.parse(candidate?.createdAt || '');
    if (!Number.isFinite(candMs)) continue;

    const meta = parseEventMetadata(candidate?.metadata);
    const candCourse = normalizeComparable(meta?.courseName || meta?.productName);
    const courseMatches =
      normalizedProductName &&
      candCourse &&
      (candCourse === normalizedProductName ||
        candCourse.includes(normalizedProductName) ||
        normalizedProductName.includes(candCourse));

    const timeDelta = Math.abs(anchorMs - candMs);
    const score = (courseMatches ? 5 : 0) + Math.max(0, 3 - timeDelta / (60 * 60 * 1000));
    if (score > bestScore) {
      bestScore = score;
      matchedIntent = candidate;
    }
  }

  // Last non-direct touch at/before purchase, falling back to last touch.
  const lastNonDirect = events.find((event) => isNonDirectChannel(event?.acquisitionChannel)) || null;
  const lastTouch = events.find((event) => hasAnyChannel(event)) || null;
  const attributionEvent = lastNonDirect || lastTouch || null;

  // Identity to stitch onto the sale: prefer the matched intent, else the most
  // recent event carrying a visitor/session id, else the most recent event.
  const identityEvent =
    matchedIntent ||
    events.find((event) => normalizeString(event?.visitorId) || normalizeString(event?.sessionId)) ||
    events[0];

  const firstTouch = pickFirstTouch(events);

  let method;
  if (matchedIntent) method = 'intent';
  else if (lastNonDirect) method = 'email';
  else method = 'email_fallback';

  // Acquisition: last non-direct touch -> last touch -> first touch -> direct.
  const acquisitionChannel =
    normalizeString(attributionEvent?.acquisitionChannel) ||
    normalizeString(firstTouch?.channel) ||
    'direct';
  const acquisitionSource =
    normalizeString(attributionEvent?.acquisitionSource) ||
    normalizeString(firstTouch?.source) ||
    null;
  const acquisitionMedium =
    normalizeString(attributionEvent?.acquisitionMedium) ||
    normalizeString(firstTouch?.medium) ||
    null;
  const acquisitionCampaign =
    normalizeString(attributionEvent?.acquisitionCampaign) ||
    normalizeString(firstTouch?.campaign) ||
    null;

  return {
    method,
    matchedIntent,
    variant: normalizeString(identityEvent?.variant),
    sessionId: normalizeString(identityEvent?.sessionId),
    visitorId: normalizeString(identityEvent?.visitorId),
    userID: normalizeString(identityEvent?.userID),
    deviceType: normalizeString(identityEvent?.deviceType),
    pagePath: normalizeString(identityEvent?.pagePath),
    acquisitionChannel,
    acquisitionSource,
    acquisitionMedium,
    acquisitionCampaign,
    firstTouch,
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
    // Persistent visitor id, resolved from the matched intent below. Carrying it
    // onto the complete event stitches the purchase back into the visitor's full
    // cross-session journey for path-to-purchase analysis.
    let visitorId = normalizeString(
      payload.ab_visitor_id || metadata?.ab_visitor_id,
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

    // Attribution by buyer email via the GSI (no scan). Resolves the buyer's
    // journey and credits the last non-direct touch even when there's no
    // matchable intent (webhooks carry no cookies, so this is the norm).
    let matchedIntent = null;
    let firstTouch = null;
    let attributionMethod = variant && sessionId ? 'payload' : 'none';
    if (!variant || !sessionId || !acquisitionChannel) {
      try {
        const resolved = await withTimeout(
          resolveBuyerAttribution({
            email: webhookUserEmail,
            productName: webhookProductName,
            createdAtIso: webhookCreatedAt,
          }),
          3500,
        );
        if (resolved) {
          matchedIntent = resolved.matchedIntent || null;
          attributionMethod = resolved.method;
          variant = variant || resolved.variant;
          sessionId = sessionId || resolved.sessionId;
          deviceType = deviceType || resolved.deviceType;
          acquisitionChannel = acquisitionChannel || resolved.acquisitionChannel;
          acquisitionSource = acquisitionSource || resolved.acquisitionSource;
          acquisitionMedium = acquisitionMedium || resolved.acquisitionMedium;
          acquisitionCampaign = acquisitionCampaign || resolved.acquisitionCampaign;
          userID = userID || resolved.userID;
          visitorId = visitorId || resolved.visitorId;
          pagePath = pagePath || resolved.pagePath;
          firstTouch = resolved.firstTouch || null;
        }
      } catch (error) {
        console.warn('Buyer attribution resolution failed:', error?.message);
      }
    }

    const eventMetadata = {
      customMetadata: metadata || null,
      attribution: {
        method: attributionMethod,
        matchedIntentId: matchedIntent?.id || null,
      },
      ...(firstTouch ? { firstTouch } : {}),
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

    const webhookProductId = normalizeString(
      payload?.product_id ?? payload?.items?.[0]?.product_id,
    );
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
            visitorId: normalizeString(visitorId),
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

    // Report to LinkedIn's Conversions API only once per genuinely new sale
    // (never on duplicate webhook deliveries) and only for campaigns we've
    // opted in via LINKEDIN_CONVERSION_PRODUCT_IDS (defaults to the boot
    // camp). The Insight Tag pixel can't do this: it only fires from a
    // browser, and this confirmation arrives via a server-to-server webhook
    // with no browser in the loop.
    let linkedInConversion = null;
    if (
      decision === 'recorded' &&
      isLinkedInTargetProduct({ productId: webhookProductId, productName: webhookProductName })
    ) {
      try {
        const matchedMetadata = parseEventMetadata(matchedIntent?.metadata);
        const liFatId = normalizeString(matchedMetadata?.liFatId);
        const conversionHappenedAt = Date.parse(webhookCreatedAt || '') || Date.now();

        linkedInConversion = await sendLinkedInConversionEvent({
          email: canonicalEmail,
          liFatId,
          amountDollars: payload?.amount_dollars,
          conversionHappenedAt,
          eventId: `li_${dedupeEventId}`,
          firstName: webhookPurchaserFirstName,
          lastName: webhookPurchaserLastName,
        });

        if (!linkedInConversion?.success && !linkedInConversion?.skipped) {
          console.warn('LinkedIn conversion event did not succeed:', linkedInConversion);
        }
      } catch (error) {
        linkedInConversion = { success: false, error: error?.message };
        console.warn('LinkedIn conversion event threw:', error?.message);
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
      reason: linkedInConversion
        ? `linkedin_conversion:${
            linkedInConversion.success
              ? 'sent'
              : linkedInConversion.skipped
                ? `skipped:${linkedInConversion.reason}`
                : `failed:${linkedInConversion.status || linkedInConversion.error || 'unknown'}`
          }`
        : undefined,
      rawPayload: linkedInConversion
        ? JSON.stringify({ ...body, _linkedinConversion: linkedInConversion })
        : JSON.stringify(body),
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
      linkedInConversion,
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
