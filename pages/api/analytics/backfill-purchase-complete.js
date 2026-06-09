import { Amplify, API } from 'aws-amplify';
import awsExports from '../../../src/aws-exports';

if (typeof window === 'undefined') {
  Amplify.configure(awsExports);
}

const listPurchaseCompleteQuery = /* GraphQL */ `
  query ListPurchaseCompleteEventsForBackfill(
    $filter: ModelAbTestEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAbTestEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        experimentKey
        eventName
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
        metadata
        createdAt
      }
      nextToken
    }
  }
`;

const updateAbEventMutation = /* GraphQL */ `
  mutation UpdateAbTestEventForBackfill($input: UpdateAbTestEventInput!) {
    updateAbTestEvent(input: $input) {
      id
      externalOrderId
      orderNumber
      purchaserEmail
      purchaserFirstName
      purchaserLastName
      couponCode
      grossAmountCents
      netAmountCents
      discountAmountCents
      metadata
      updatedAt
    }
  }
`;

function normalizeString(value) {
  if (value === undefined || value === null || value === '') return null;
  return String(value);
}

function parseJsonSafe(raw) {
  if (!raw) return {};
  if (typeof raw === 'object') return raw || {};
  try {
    const first = JSON.parse(raw);
    if (typeof first === 'string') {
      try {
        return JSON.parse(first) || {};
      } catch {
        return {};
      }
    }
    return first || {};
  } catch {
    return {};
  }
}

function parseBool(value) {
  const normalized = String(value ?? '')
    .trim()
    .toLowerCase();
  return ['1', 'true', 'yes', 'y'].includes(normalized);
}

function getThinkificAuth() {
  return {
    apiKey: process.env.NEXT_THINKIFIC_API_KEY || process.env.NEXT_PUBLIC_API_KEY || null,
    subdomain: process.env.NEXT_THINKIFIC_SUBDOMAIN || null,
  };
}

function getLookupCandidates(event) {
  const candidates = [event?.orderId]
    .map((value) => normalizeString(value))
    .filter(Boolean);

  const unique = [...new Set(candidates)];
  return unique.filter((value) => /^\d+$/.test(value));
}

function buildBackfilledMetadata(existingMetadata, thinkificOrder) {
  const current = parseJsonSafe(existingMetadata);
  const currentPayload = current?.webhookPayload || current || {};

  const orderPayload = {
    id: thinkificOrder?.id ?? currentPayload?.id ?? null,
    order_number:
      thinkificOrder?.order_number ??
      currentPayload?.order_number ??
      null,
    status: thinkificOrder?.status ?? currentPayload?.status ?? null,
    payment_type:
      thinkificOrder?.payment_type ?? currentPayload?.payment_type ?? null,
    amount_cents:
      thinkificOrder?.amount_cents ?? currentPayload?.amount_cents ?? null,
    amount_dollars:
      thinkificOrder?.amount_dollars ??
      currentPayload?.amount_dollars ??
      null,
    product_name:
      thinkificOrder?.product_name ?? currentPayload?.product_name ?? null,
    product_id: thinkificOrder?.product_id ?? currentPayload?.product_id ?? null,
    coupon: thinkificOrder?.coupon ?? currentPayload?.coupon ?? null,
    user: thinkificOrder?.user ?? currentPayload?.user ?? null,
    items: Array.isArray(thinkificOrder?.items)
      ? thinkificOrder.items
      : Array.isArray(currentPayload?.items)
        ? currentPayload.items
        : [],
  };

  return {
    ...current,
    webhookPayload: orderPayload,
    backfill: {
      ...(current?.backfill || {}),
      thinkificOrderSyncAt: new Date().toISOString(),
      thinkificOrderId: normalizeString(thinkificOrder?.id),
      source: 'api/analytics/backfill-purchase-complete',
    },
  };
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
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = req.body && typeof req.body === 'object' ? req.body : {};
  const experimentKey =
    normalizeString(body.experimentKey) || normalizeString(req.query.experimentKey) || 'home_v1';
  const requestedLimit = Number(body.limit ?? req.query.limit ?? 100);
  const limit = Number.isFinite(requestedLimit)
    ? Math.min(Math.max(Math.floor(requestedLimit), 1), 500)
    : 100;
  const dryRun = parseBool(body.dryRun ?? req.query.dryRun);
  const { apiKey, subdomain } = getThinkificAuth();
  const thinkificConfigured = Boolean(apiKey && subdomain);

  try {
    let items = [];
    let nextToken = null;

    do {
      const response = await API.graphql({
        query: listPurchaseCompleteQuery,
        variables: {
          filter: {
            experimentKey: { eq: experimentKey },
            eventName: { eq: 'ab_purchase_complete' },
          },
          limit: 200,
          nextToken,
        },
      });

      const pageItems = response?.data?.listAbTestEvents?.items || [];
      items = items.concat(pageItems);
      nextToken = response?.data?.listAbTestEvents?.nextToken || null;
    } while (nextToken && items.length < limit);

    const events = items
      .slice(0, limit)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const orderCache = new Map();
    const result = {
      experimentKey,
      dryRun,
      thinkificConfigured,
      lookupMode: 'orderId_only',
      scanned: events.length,
      updated: 0,
      matched: 0,
      unmatched: 0,
      errors: 0,
      rows: [],
    };

    for (const event of events) {
      try {
        const candidates = getLookupCandidates(event);
        let match = null;
        let matchedLookupId = null;

        for (const candidate of candidates) {
          const order = await fetchThinkificOrderById(candidate, orderCache);
          if (order) {
            match = order;
            matchedLookupId = candidate;
            break;
          }
        }

        if (!match) {
          result.unmatched += 1;
          result.rows.push({
            eventId: event.id,
            status: 'unmatched',
            orderId: event.orderId || null,
            externalOrderId: event.externalOrderId || null,
            attemptedLookupIds: candidates,
          });
          continue;
        }

        result.matched += 1;
        const normalizedExternalOrderId = normalizeString(match.id || matchedLookupId);
        const mergedMetadata = buildBackfilledMetadata(event.metadata, match);
        const { firstName: userNameFirst, lastName: userNameLast } = splitName(
          match?.user_name,
        );
        const derivedOrderNumber = normalizeString(
          match?.order_number || event?.orderNumber || event?.externalOrderId,
        );
        const orderNumber =
          derivedOrderNumber && /^ORD/i.test(derivedOrderNumber)
            ? derivedOrderNumber
            : normalizeString(match?.order_number || event?.orderNumber);
        const purchaserEmail = normalizeString(
          match?.user?.email || match?.user_email || event?.purchaserEmail,
        );
        const purchaserFirstName = normalizeString(
          match?.user?.first_name ||
            match?.first_name ||
            userNameFirst ||
            event?.purchaserFirstName,
        );
        const purchaserLastName = normalizeString(
          match?.user?.last_name || match?.last_name || userNameLast || event?.purchaserLastName,
        );
        const couponCode = normalizeString(
          match?.coupon?.code || match?.coupon_code || event?.couponCode,
        );
        const netAmountCents = normalizeNumber(match?.amount_cents ?? event?.netAmountCents);
        const grossAmountCents =
          deriveGrossCentsFromItems(match?.items) ??
          normalizeNumber(event?.grossAmountCents) ??
          netAmountCents;
        const discountAmountCents =
          Number.isFinite(grossAmountCents) && Number.isFinite(netAmountCents)
            ? grossAmountCents - netAmountCents
            : normalizeNumber(event?.discountAmountCents);

        if (!dryRun) {
          await API.graphql({
            query: updateAbEventMutation,
            variables: {
              input: {
                id: event.id,
                externalOrderId: normalizedExternalOrderId,
                orderNumber,
                purchaserEmail,
                purchaserFirstName,
                purchaserLastName,
                couponCode,
                grossAmountCents,
                netAmountCents,
                discountAmountCents,
                metadata: JSON.stringify(mergedMetadata),
              },
            },
          });
          result.updated += 1;
        }

        result.rows.push({
          eventId: event.id,
          status: dryRun ? 'matched_dry_run' : 'updated',
          previousExternalOrderId: event.externalOrderId || null,
          externalOrderId: normalizedExternalOrderId,
          orderNumber,
          email: purchaserEmail,
          netAmountCents,
        });
      } catch (error) {
        result.errors += 1;
        result.rows.push({
          eventId: event?.id || null,
          status: 'error',
          error: error?.message || 'Unknown error',
        });
      }
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error('Failed to backfill purchase complete events:', error);
    return res.status(500).json({
      error: 'Failed to backfill purchase complete events',
      detail: error?.message || 'Unknown error',
    });
  }
}
