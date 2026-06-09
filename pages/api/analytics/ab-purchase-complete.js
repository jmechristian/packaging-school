import { Amplify, API } from 'aws-amplify';
import awsExports from '../../../src/aws-exports';

if (typeof window === 'undefined') {
  Amplify.configure(awsExports);
}

const listPurchaseCompleteQuery = /* GraphQL */ `
  query ListPurchaseCompleteEvents(
    $filter: ModelAbTestEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAbTestEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        eventName
        variant
        sessionId
        orderId
        externalOrderId
        orderNumber
        purchaserEmail
        purchaserFirstName
        purchaserLastName
        couponCode
        grossAmountCents
        netAmountCents
        discountAmountCents
        pagePath
        value
        metadata
        createdAt
      }
      nextToken
    }
  }
`;

function parseDateInput(value) {
  if (typeof value !== 'string' || !value.trim()) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString();
}

function parseJsonSafe(raw) {
  if (!raw) return null;
  if (typeof raw === 'object') return raw;
  try {
    const first = JSON.parse(raw);
    if (typeof first === 'string') {
      try {
        return JSON.parse(first);
      } catch {
        return null;
      }
    }
    return first;
  } catch {
    return null;
  }
}

function normalizeString(value) {
  if (value === undefined || value === null || value === '') return null;
  return String(value);
}

function getThinkificAuth() {
  return {
    apiKey: process.env.NEXT_THINKIFIC_API_KEY || process.env.NEXT_PUBLIC_API_KEY || null,
    subdomain: process.env.NEXT_THINKIFIC_SUBDOMAIN || null,
  };
}

function normalizeNumber(value) {
  if (value === undefined || value === null || value === '') return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function deriveGrossCentsFromItems(items) {
  if (!Array.isArray(items)) return null;
  const total = items.reduce((sum, item) => {
    const amountCents = normalizeNumber(item?.amount_cents ?? item?.amountCents);
    const quantity = normalizeNumber(item?.quantity) || 1;
    if (!Number.isFinite(amountCents)) return sum;
    return sum + amountCents * quantity;
  }, 0);
  return Number.isFinite(total) ? total : null;
}

function splitName(fullName) {
  const normalized = normalizeString(fullName);
  if (!normalized) return { firstName: null, lastName: null };
  const parts = normalized.trim().split(/\s+/);
  if (parts.length === 1) return { firstName: parts[0], lastName: null };
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(' '),
  };
}

function normalizeOrderDetails(event, order = null) {
  const metadata = parseJsonSafe(event?.metadata);
  const payload = metadata?.webhookPayload || metadata || {};
  const payloadUser = payload?.user || {};
  const orderUser = order?.user || {};

  const webhookAmountCents = normalizeNumber(payload?.amount_cents ?? payload?.amountCents);
  const eventNetCents = normalizeNumber(event?.netAmountCents);
  const orderAmountCents = normalizeNumber(order?.amount_cents ?? order?.amountCents);
  const netCents =
    orderAmountCents ?? eventNetCents ?? webhookAmountCents ?? normalizeNumber(event?.value);

  const itemGrossCents =
    deriveGrossCentsFromItems(order?.items) ?? deriveGrossCentsFromItems(payload?.items);
  const eventGrossCents = normalizeNumber(event?.grossAmountCents);
  const grossCents = itemGrossCents ?? eventGrossCents ?? netCents;

  const { firstName: orderNameFirst, lastName: orderNameLast } = splitName(order?.user_name);
  const firstName = normalizeString(
    orderUser?.first_name ||
      order?.first_name ||
      orderNameFirst ||
      event?.purchaserFirstName ||
      payloadUser?.first_name,
  );
  const lastName = normalizeString(
    orderUser?.last_name ||
      order?.last_name ||
      orderNameLast ||
      event?.purchaserLastName ||
      payloadUser?.last_name,
  );
  const email = normalizeString(
    orderUser?.email || order?.user_email || event?.purchaserEmail || payloadUser?.email,
  );

  return {
    eventId: event?.id || null,
    createdAt: event?.createdAt || null,
    variant: event?.variant || null,
    sessionId: event?.sessionId || null,
    pagePath: event?.pagePath || null,
    orderId: event?.orderId || null,
    externalOrderId: normalizeString(
      event?.externalOrderId || order?.id || payload?.id || payload?.order_number,
    ),
    orderNumber: normalizeString(
      order?.order_number || event?.orderNumber || payload?.order_number || event?.externalOrderId,
    ),
    productName: normalizeString(
      order?.product_name || payload?.product_name || order?.items?.[0]?.product_name,
    ),
    grossAmountCents: grossCents,
    netAmountCents: netCents,
    discountAmountCents:
      normalizeNumber(event?.discountAmountCents) ??
      (Number.isFinite(grossCents) && Number.isFinite(netCents) ? grossCents - netCents : null),
    firstName,
    lastName,
    fullName: [firstName, lastName].filter(Boolean).join(' ') || null,
    email,
    couponCode: normalizeString(
      order?.coupon?.code || order?.coupon_code || event?.couponCode || payload?.coupon?.code,
    ),
    source: order ? 'thinkific_api' : metadata?.webhookPayload ? 'webhook_payload' : 'event_only',
  };
}

async function fetchThinkificOrderById(orderId, cache) {
  const normalized = normalizeString(orderId);
  if (!normalized || !/^\d+$/.test(normalized)) return null;
  if (cache.has(normalized)) return cache.get(normalized);

  const { apiKey, subdomain } = getThinkificAuth();
  if (!apiKey || !subdomain) {
    cache.set(normalized, null);
    return null;
  }

  try {
    const response = await fetch(
      `https://api.thinkific.com/api/public/v1/orders/${encodeURIComponent(normalized)}`,
      {
        method: 'GET',
        headers: {
          'X-Auth-API-Key': apiKey,
          'X-Auth-Subdomain': subdomain,
        },
      },
    );

    if (!response.ok) {
      cache.set(normalized, null);
      return null;
    }

    const json = await response.json();
    cache.set(normalized, json || null);
    return json || null;
  } catch {
    cache.set(normalized, null);
    return null;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const experimentKey =
    typeof req.query.experimentKey === 'string' && req.query.experimentKey.trim()
      ? req.query.experimentKey.trim()
      : 'home_v1';
  const from = parseDateInput(req.query.from);
  const to = parseDateInput(req.query.to);
  const limit = Math.min(Number(req.query.limit) || 200, 1000);

  const filter = {
    experimentKey: { eq: experimentKey },
    eventName: { eq: 'ab_purchase_complete' },
    ...(from || to
      ? {
          createdAt: {
            ...(from ? { ge: from } : {}),
            ...(to ? { le: to } : {}),
          },
        }
      : {}),
  };

  try {
    let events = [];
    let nextToken = null;

    do {
      const response = await API.graphql({
        query: listPurchaseCompleteQuery,
        variables: {
          filter,
          limit: 500,
          nextToken,
        },
      });

      const pageItems = response?.data?.listAbTestEvents?.items || [];
      events = events.concat(pageItems);
      nextToken = response?.data?.listAbTestEvents?.nextToken || null;
    } while (nextToken && events.length < limit);

    const sortedEvents = events
      .slice(0, limit)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const orderCache = new Map();
    const rows = [];

    for (const event of sortedEvents) {
      const lookupId = normalizeString(event?.orderId);

      const quickDetails = normalizeOrderDetails(event);
      const needsBackfill =
        !quickDetails.email || !Number.isFinite(quickDetails.netAmountCents);
      const thinkificOrder = needsBackfill
        ? await fetchThinkificOrderById(lookupId, orderCache)
        : null;

      rows.push(normalizeOrderDetails(event, thinkificOrder));
    }

    return res.status(200).json({
      experimentKey,
      from,
      to,
      count: rows.length,
      items: rows,
    });
  } catch (error) {
    console.error('Failed to load purchase complete details:', error);
    return res
      .status(500)
      .json({ error: 'Failed to load purchase complete details' });
  }
}
