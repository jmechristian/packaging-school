// Pure buyer-attribution derivation for the order-completion webhook.
//
// A Thinkific order webhook is server-to-server: it carries no browser cookies,
// so the request has no visitorId/sessionId and Thinkific echoes no campaign
// data. The buyer email is the only identity we get. Given the buyer's recent
// AB events (fetched by the caller via the abEventByEmail GSI), this derives the
// acquisition context to stamp on the ab_purchase_complete row.
//
// Model: credit the LAST NON-DIRECT touch at/before the purchase, falling back
// to the last touch, then the visitor's first touch, then "direct". Identity
// (visitorId/sessionId) is taken from a matchable purchase intent when present,
// otherwise from the most recent event carrying one.
//
// Kept dependency-free and side-effect-free so it can be unit-tested without
// AWS/Amplify in the loop.

// Channel values that don't represent a real acquisition touch.
const DIRECT_CHANNELS = new Set([
  'direct',
  '(direct)',
  'none',
  '(none)',
  'unassigned',
  'na',
  'unknown',
]);

function str(value) {
  if (value === undefined || value === null || value === '') return null;
  return String(value);
}

function lower(value) {
  const s = str(value);
  return s ? s.toLowerCase() : null;
}

function comparable(value) {
  const s = str(value);
  if (!s) return null;
  return s.trim().toLowerCase().replace(/\s+/g, ' ');
}

export function isNonDirectChannel(channel) {
  const c = lower(channel);
  if (!c) return false;
  return !DIRECT_CHANNELS.has(c);
}

function hasAnyChannel(event) {
  return Boolean(str(event?.acquisitionChannel));
}

export function parseEventMetadata(rawMetadata) {
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

/**
 * Derive attribution for a completed purchase from the buyer's events.
 *
 * @param {Array<object>} items  Buyer AB events, most-recent first (DESC).
 * @param {object} opts
 * @param {string} [opts.productName] Product name from the webhook, for intent matching.
 * @param {number} [opts.anchorMs]   Purchase timestamp (ms). Defaults to now.
 * @returns {object|null} Attribution fields, or null when there are no events.
 */
export function deriveBuyerAttribution(items, { productName, anchorMs } = {}) {
  if (!Array.isArray(items) || !items.length) return null;

  const anchor = Number.isFinite(anchorMs) ? anchorMs : Date.now();
  const graceMs = 5 * 60 * 1000;

  // Only credit touches at/before the purchase (small grace for clock skew).
  const pool = items.filter((event) => {
    const ms = Date.parse(event?.createdAt || '');
    return Number.isFinite(ms) && ms <= anchor + graceMs;
  });
  const events = pool.length ? pool : items; // DESC (most recent first)

  const normalizedProductName = comparable(productName);

  // Best matchable purchase intent (product + time proximity) - used for
  // identity/linkage and to mark method="intent".
  let matchedIntent = null;
  let bestScore = -Infinity;
  for (const candidate of events) {
    if (candidate?.eventName !== 'ab_purchase_intent') continue;
    const candMs = Date.parse(candidate?.createdAt || '');
    if (!Number.isFinite(candMs)) continue;

    const meta = parseEventMetadata(candidate?.metadata);
    const candCourse = comparable(meta?.courseName || meta?.productName);
    const courseMatches =
      normalizedProductName &&
      candCourse &&
      (candCourse === normalizedProductName ||
        candCourse.includes(normalizedProductName) ||
        normalizedProductName.includes(candCourse));

    const timeDelta = Math.abs(anchor - candMs);
    const score = (courseMatches ? 5 : 0) + Math.max(0, 3 - timeDelta / (60 * 60 * 1000));
    if (score > bestScore) {
      bestScore = score;
      matchedIntent = candidate;
    }
  }

  // Last non-direct touch at/before purchase, falling back to last touch.
  const lastNonDirect = events.find((e) => isNonDirectChannel(e?.acquisitionChannel)) || null;
  const lastTouch = events.find((e) => hasAnyChannel(e)) || null;
  const attributionEvent = lastNonDirect || lastTouch || null;

  // Identity to stitch onto the sale: prefer the matched intent, else the most
  // recent event carrying a visitor/session id, else the most recent event.
  const identityEvent =
    matchedIntent ||
    events.find((e) => str(e?.visitorId) || str(e?.sessionId)) ||
    events[0];

  const firstTouch = pickFirstTouch(events);

  let method;
  if (matchedIntent) method = 'intent';
  else if (lastNonDirect) method = 'email';
  else method = 'email_fallback';

  return {
    method,
    matchedIntent,
    matchedIntentId: matchedIntent?.id || null,
    variant: str(identityEvent?.variant),
    sessionId: str(identityEvent?.sessionId),
    visitorId: str(identityEvent?.visitorId),
    userID: str(identityEvent?.userID),
    deviceType: str(identityEvent?.deviceType),
    pagePath: str(identityEvent?.pagePath),
    // Acquisition: last non-direct touch -> last touch -> first touch -> direct.
    acquisitionChannel:
      str(attributionEvent?.acquisitionChannel) || str(firstTouch?.channel) || 'direct',
    acquisitionSource:
      str(attributionEvent?.acquisitionSource) || str(firstTouch?.source) || null,
    acquisitionMedium:
      str(attributionEvent?.acquisitionMedium) || str(firstTouch?.medium) || null,
    acquisitionCampaign:
      str(attributionEvent?.acquisitionCampaign) || str(firstTouch?.campaign) || null,
    firstTouch,
  };
}
