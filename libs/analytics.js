import {
  AB_SESSION_COOKIE,
  AB_SESSION_MAX_AGE,
  AB_VISITOR_MAX_AGE,
  CMPM_EXPERIMENT_KEY,
  HOME_EXPERIMENT_KEY,
  createSessionCookieValue,
  createVisitorCookieValue,
  getCmpmVariantFromDocumentCookie,
  getSessionIdFromDocumentCookie,
  getVariantFromDocumentCookie,
  getVisitorIdFromDocumentCookie,
} from './abVariant';
import {
  classifyAcquisitionChannel,
  isOwnReferrerHost,
} from './acquisitionChannel';

const DEFAULT_THROTTLE_MS = 1500;
export const AB_ATTRIBUTION_COOKIE = 'ps_ab_attribution';
export const AB_FIRST_TOUCH_COOKIE = 'ps_ab_first_touch';
export const AB_IDENTITY_COOKIE = 'ps_ab_identity';
// Bumped whenever the emitted event/metadata shape changes so the analytics
// codebase can branch on schema version when reconstructing journeys.
const AB_EVENT_SCHEMA_VERSION = 3;
const AB_GEO_STORAGE_KEY = 'ps_ab_geo';
const EVENT_THROTTLE_MS = {
  ab_exposure: 60000,
  ab_page_view: 3000,
  ab_nav_next: 1000,
  ab_engagement: 1000,
  ab_product_view: 3000,
  ab_pdf_click: 1500,
  ab_meeting_click: 1500,
  ab_lesson_click: 1500,
  ab_promo_click: 1500,
  ab_cmpm_start: 1500,
  ab_cmpm_submit: 1500,
  ab_purchase_intent: 15000,
  ab_purchase_complete: 3000,
  ab_session_end: 30000,
};

function makeSessionId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `ab_${Date.now()}_${Math.floor(Math.random() * 1000000)}`;
}

export function trackEvent(eventName, params = {}) {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...params,
  });
}

// The session window (~6h) after which a returning visitor is a new session.
const AB_SESSION_MS = AB_SESSION_MAX_AGE * 1000;
const AB_SESSION_META_KEY = 'ps_ab_session_meta';
const AB_ENDED_SESSIONS_KEY = 'ps_ab_ended_sessions';

function loadSessionMeta() {
  try {
    const raw = window.localStorage.getItem(AB_SESSION_META_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveSessionMeta(meta) {
  try {
    window.localStorage.setItem(AB_SESSION_META_KEY, JSON.stringify(meta));
  } catch {
    // Non-fatal (private mode / storage disabled).
  }
}

function loadEndedSessions() {
  try {
    const raw = window.localStorage.getItem(AB_ENDED_SESSIONS_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function isSessionEnded(sessionId) {
  if (!sessionId) return false;
  return loadEndedSessions().includes(sessionId);
}

// Records that a session has been closed so ab_session_end fires at most once
// per sessionId, no matter how many triggers race to end it.
function markSessionEnded(sessionId) {
  try {
    const arr = loadEndedSessions();
    if (arr.includes(sessionId)) return;
    arr.push(sessionId);
    while (arr.length > 20) arr.shift(); // keep bounded
    window.localStorage.setItem(AB_ENDED_SESSIONS_KEY, JSON.stringify(arr));
  } catch {
    // Non-fatal.
  }
}

export function ensureAbSessionId() {
  if (typeof document === 'undefined') return null;

  const now = Date.now();
  let id = getSessionIdFromDocumentCookie();
  const meta = loadSessionMeta();

  if (id) {
    const stale =
      meta && meta.id === id && now - (meta.lastActivity || 0) > AB_SESSION_MS;

    // Returned after the ~6h window closed without an explicit end: close the
    // old session now (guarded, so it emits exactly one ab_session_end).
    if (stale && !isSessionEnded(id)) {
      trackAbSessionEnd({ sessionId: id, reason: 'inactivity_timeout' });
    }

    // Rotate to a fresh session once the current one has ended - either via the
    // stale-window close above or the in-page inactivity timer.
    if (stale || isSessionEnded(id)) {
      id = null;
    }
  }

  if (!id) {
    id = makeSessionId();
    document.cookie = createSessionCookieValue(id);
    saveSessionMeta({ id, lastActivity: now });
    return id;
  }

  saveSessionMeta({ id, lastActivity: now });
  return id;
}

export function refreshAbSessionCookie() {
  if (typeof document === 'undefined') return null;
  const sessionId = getSessionIdFromDocumentCookie();
  if (!sessionId) return ensureAbSessionId();

  document.cookie = `${AB_SESSION_COOKIE}=${encodeURIComponent(
    sessionId,
  )}; Path=/; Max-Age=${AB_SESSION_MAX_AGE}; SameSite=Lax`;
  return sessionId;
}

// Persistent, cross-session identifier for a browser. Created once and refreshed
// on each visit so it survives for ~2 years, letting the analytics codebase
// stitch together every visit (and eventually the purchase) for one person.
export function ensureAbVisitorId() {
  if (typeof document === 'undefined') return null;

  const existing = getVisitorIdFromDocumentCookie();
  if (existing) {
    // Refresh the TTL so an active visitor never silently expires.
    document.cookie = createVisitorCookieValue(existing);
    ensureFirstTouch(existing);
    return existing;
  }

  const nextVisitorId = makeSessionId();
  document.cookie = createVisitorCookieValue(nextVisitorId);
  ensureFirstTouch(nextVisitorId);
  return nextVisitorId;
}

// Capture the visitor's very first acquisition context exactly once. This is
// what enables true first-touch vs last-touch attribution and time-to-purchase.
function ensureFirstTouch(visitorId) {
  if (typeof document === 'undefined') return null;

  const existing = safeParseAttributionCookie(
    getCookieValue(AB_FIRST_TOUCH_COOKIE),
  );
  if (existing && existing.visitorId === visitorId) return existing;

  const detected = detectAttributionContext() || {};
  const firstTouch = {
    visitorId,
    channel: detected.channel || null,
    source: detected.source || null,
    medium: detected.medium || null,
    campaign: detected.campaign || null,
    referrer: detected.referrer || null,
    landingPath:
      typeof window !== 'undefined' ? window.location.pathname : null,
    firstSeenAt: new Date().toISOString(),
  };

  document.cookie = `${AB_FIRST_TOUCH_COOKIE}=${encodeURIComponent(
    JSON.stringify(firstTouch),
  )}; Path=/; Max-Age=${AB_VISITOR_MAX_AGE}; SameSite=Lax`;
  return firstTouch;
}

function getFirstTouch() {
  return safeParseAttributionCookie(getCookieValue(AB_FIRST_TOUCH_COOKIE));
}

// Called from _app once Auth0 resolves the logged-in user so that userID/email
// ride on every subsequent event. Email is especially valuable: it lets the
// analytics codebase link a known user's browsing (via the abEventByEmail GSI)
// well before any purchase, and matches how the order webhook attributes sales.
export function setAbIdentity({ userID = null, email = null } = {}) {
  if (typeof window === 'undefined') return;

  const normalizedEmail = email ? String(email).trim().toLowerCase() : null;
  const identity = {
    userID: userID != null ? String(userID) : null,
    email: normalizedEmail,
  };

  const current = window.__abIdentity || {};
  const merged = {
    userID: identity.userID || current.userID || null,
    email: identity.email || current.email || null,
  };
  window.__abIdentity = merged;

  try {
    document.cookie = `${AB_IDENTITY_COOKIE}=${encodeURIComponent(
      JSON.stringify(merged),
    )}; Path=/; Max-Age=${AB_SESSION_MAX_AGE}; SameSite=Lax`;
  } catch {
    // Non-fatal: identity still lives on window for the current page.
  }
}

function getAbIdentity() {
  if (typeof window === 'undefined') return null;
  if (window.__abIdentity) return window.__abIdentity;
  const fromCookie = safeParseAttributionCookie(
    getCookieValue(AB_IDENTITY_COOKIE),
  );
  if (fromCookie) {
    window.__abIdentity = fromCookie;
    return fromCookie;
  }
  return null;
}

// Monotonic per-session counter so events can be ordered precisely even when
// beacon/keepalive writes land out of order or share a createdAt timestamp.
function nextEventSeq(sessionId) {
  if (typeof window === 'undefined' || !sessionId) return null;
  try {
    const key = `ab_seq_${sessionId}`;
    const current = Number(window.sessionStorage.getItem(key) || '0');
    const next = Number.isFinite(current) ? current + 1 : 1;
    window.sessionStorage.setItem(key, String(next));
    return next;
  } catch {
    return null;
  }
}

function getDeviceTypeFromUserAgent() {
  if (typeof window === 'undefined' || !window.navigator) {
    return 'unknown';
  }

  const ua = window.navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  }
  if (
    /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    )
  ) {
    return 'mobile';
  }
  return 'desktop';
}

function safeParseAttributionCookie(rawValue) {
  if (!rawValue) return null;
  try {
    return JSON.parse(decodeURIComponent(rawValue));
  } catch {
    return null;
  }
}

// Called once after the Layout ipinfo lookup so every subsequent AB event can
// stamp city/region/country without another geo request.
export function setAbGeoContext(geo = {}) {
  if (typeof window === 'undefined') return;
  const next = {
    city: geo.city ? String(geo.city) : null,
    region: geo.region ? String(geo.region) : null,
    country: geo.country ? String(geo.country) : null,
    ip: geo.ip ? String(geo.ip) : null,
  };
  window.__abGeoCache = next;
  try {
    window.sessionStorage.setItem(AB_GEO_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Non-fatal.
  }
}

function readAbGeoContext() {
  if (typeof window === 'undefined') return null;
  if (window.__abGeoCache) return window.__abGeoCache;
  try {
    const raw = window.sessionStorage.getItem(AB_GEO_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    window.__abGeoCache = parsed;
    return parsed;
  } catch {
    return null;
  }
}

function getCookieValue(name) {
  if (typeof document === 'undefined') return null;
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${escaped}=([^;]*)`));
  return match ? match[1] : null;
}

function writeAttributionCookie(value) {
  if (typeof document === 'undefined') return;
  document.cookie = `${AB_ATTRIBUTION_COOKIE}=${encodeURIComponent(
    JSON.stringify(value)
  )}; Path=/; Max-Age=${AB_SESSION_MAX_AGE}; SameSite=Lax`;
}

function getReferrerHost(referrer) {
  if (!referrer) return null;
  try {
    return new URL(referrer).hostname?.toLowerCase() || null;
  } catch {
    return null;
  }
}

// Ad-platform click ids we recognize. Presence of any of these means the visit
// is a paid ad click. gclid/gbraid/wbraid are Google Ads (wbraid/gbraid are the
// newer iOS/privacy variants); li_fat_id is LinkedIn; msclkid Microsoft/Bing;
// fbclid Meta; ttclid TikTok.
const CLICK_ID_KEYS = [
  'gclid',
  'gbraid',
  'wbraid',
  'li_fat_id',
  'msclkid',
  'fbclid',
  'ttclid',
];

// Canonical source/medium implied by each click id. This is what lets us still
// identify Google Ads and LinkedIn Ads sessions when the campaign relies on
// auto-tagging and sends NO utm_* params (Google Ads' default behavior).
const CLICK_ID_ATTRIBUTION = {
  gclid: { source: 'google', medium: 'cpc' },
  gbraid: { source: 'google', medium: 'cpc' },
  wbraid: { source: 'google', medium: 'cpc' },
  msclkid: { source: 'bing', medium: 'cpc' },
  li_fat_id: { source: 'linkedin', medium: 'paid_social' },
  fbclid: { source: 'facebook', medium: 'paid_social' },
  ttclid: { source: 'tiktok', medium: 'paid_social' },
};

function detectAttributionContext() {
  if (typeof window === 'undefined') return null;

  const url = new URL(window.location.href);
  const params = url.searchParams;
  const referrer = typeof document !== 'undefined' ? document.referrer || '' : '';
  const referrerHost = getReferrerHost(referrer);

  // Collect every ad click id present. These are persisted verbatim (see
  // metadata folding in writeAbEvent) so a conversion can later be replayed to
  // the ad platform's conversions API (LinkedIn today; gclid enables Google Ads
  // offline conversion import) - Thinkific's webhook can't carry them back.
  const clickIds = {};
  for (const key of CLICK_ID_KEYS) {
    const value = params.get(key);
    if (value) clickIds[key] = value;
  }
  const clickIdKey = CLICK_ID_KEYS.find((key) => clickIds[key]) || null;
  const hasClickId = Boolean(clickIdKey);
  const adAttribution = clickIdKey ? CLICK_ID_ATTRIBUTION[clickIdKey] : null;

  // Accept both standard utm_* params and the bare names used by our ad links
  // (e.g. LinkedIn ads land with ?source=LinkedIn&campaign=bootcamp). When no
  // explicit source/medium is present, fall back to the ad network implied by
  // the click id so auto-tagged Google/LinkedIn ad clicks are still labeled.
  const explicitSource = params.get('utm_source') || params.get('source') || null;
  const explicitMedium = params.get('utm_medium') || params.get('medium') || null;
  const source =
    explicitSource || adAttribution?.source || referrerHost || null;
  const medium = explicitMedium || adAttribution?.medium || null;
  const campaign = params.get('utm_campaign') || params.get('campaign') || null;
  const term = params.get('utm_term') || params.get('term') || null;
  const content = params.get('utm_content') || params.get('content') || null;

  const liFatId = clickIds.li_fat_id || null;

  const inferredMedium =
    medium || (hasClickId ? 'cpc' : referrerHost && !isOwnReferrerHost(referrerHost) ? 'referral' : '(none)');

  return {
    channel: classifyAcquisitionChannel({
      medium: inferredMedium,
      source,
      hasClickId,
      referrerHost,
    }),
    source: source || '(direct)',
    medium: inferredMedium,
    campaign,
    term,
    content,
    referrer: referrer || null,
    liFatId,
    clickIds: Object.keys(clickIds).length ? clickIds : null,
  };
}

const MARKETING_PARAM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'source',
  'medium',
  'campaign',
  'gclid',
  'gbraid',
  'wbraid',
  'msclkid',
  'fbclid',
  'ttclid',
  'li_fat_id',
];

// True when the current URL carries an explicit campaign/click-id signal
// (i.e. the visitor arrived via a tagged ad or campaign link).
function hasMarketingParams() {
  if (typeof window === 'undefined') return false;
  const params = new URL(window.location.href).searchParams;
  return MARKETING_PARAM_KEYS.some((key) => Boolean(params.get(key)));
}

function readCachedAttribution(sessionId) {
  if (window.__abAttributionCache?.sessionId === sessionId) {
    return window.__abAttributionCache;
  }
  const fromCookie = safeParseAttributionCookie(
    getCookieValue(AB_ATTRIBUTION_COOKIE),
  );
  if (fromCookie?.sessionId === sessionId) {
    window.__abAttributionCache = fromCookie;
    return fromCookie;
  }
  return null;
}

function resolveAttributionContext(sessionId) {
  if (typeof window === 'undefined') return null;

  // Attribution is first-touch per session, EXCEPT when the current URL carries
  // explicit campaign/click-id params (e.g. a LinkedIn/Google ad click). Those
  // must always be captured so an ad touch is never masked by an earlier
  // same-session direct/organic visit.
  const forceDetect = hasMarketingParams();
  if (!forceDetect) {
    const cached = readCachedAttribution(sessionId);
    if (cached) return cached;
  }

  const detected = detectAttributionContext();
  if (!detected) return readCachedAttribution(sessionId);

  const payload = {
    sessionId,
    ...detected,
  };
  window.__abAttributionCache = payload;
  writeAttributionCookie(payload);
  return payload;
}

export function getAbContext(overrides = {}) {
  const homeVariant = overrides.variant || getVariantFromDocumentCookie();
  const cmpmVariant = getCmpmVariantFromDocumentCookie();
  const sessionId = overrides.sessionId || ensureAbSessionId();
  const visitorId = overrides.visitorId || ensureAbVisitorId();
  const identity = getAbIdentity() || {};
  const pagePath =
    overrides.pagePath ||
    (typeof window !== 'undefined' ? window.location.pathname : null);
  const attribution = resolveAttributionContext(sessionId);
  const geo = readAbGeoContext();

  const base = {
    experimentKey: HOME_EXPERIMENT_KEY,
    variant: homeVariant || null,
    sessionId,
    visitorId,
    userID: overrides.userID || identity.userID || null,
    email: overrides.email || identity.email || null,
    pagePath,
    deviceType: overrides.deviceType || getDeviceTypeFromUserAgent(),
    acquisitionChannel: overrides.acquisitionChannel || attribution?.channel || null,
    acquisitionSource: overrides.acquisitionSource || attribution?.source || null,
    acquisitionMedium: overrides.acquisitionMedium || attribution?.medium || null,
    acquisitionCampaign: overrides.acquisitionCampaign || attribution?.campaign || null,
    acquisitionTerm: overrides.acquisitionTerm || attribution?.term || null,
    acquisitionContent: overrides.acquisitionContent || attribution?.content || null,
    referrer: overrides.referrer || attribution?.referrer || null,
    liFatId: overrides.liFatId || attribution?.liFatId || null,
    clickIds: overrides.clickIds || attribution?.clickIds || null,
    city: overrides.city || geo?.city || null,
    region: overrides.region || geo?.region || null,
    country: overrides.country || geo?.country || null,
    ...overrides,
  };

  // Once assigned to the CMPM landing experiment, stamp membership on every
  // event's metadata so journeys keyed by visitorId can filter A vs B. Callers
  // that pass experimentKey: cmpm_v1 (exposure, CTAs, form events) still win
  // via overrides above for the top-level partition.
  if (cmpmVariant) {
    base.metadata = {
      ...(base.metadata || {}),
      cmpmVariant,
      cmpmExperimentKey: CMPM_EXPERIMENT_KEY,
    };
  }

  // Keep geo mirrored in metadata for dashboards that only read the JSON blob.
  if (base.city || base.region || base.country) {
    base.metadata = {
      ...(base.metadata || {}),
      ...(base.city ? { city: base.city } : {}),
      ...(base.region ? { region: base.region } : {}),
      ...(base.country ? { country: base.country } : {}),
    };
  }

  return base;
}

// Stamp cmpm_v1 + assigned variant for CMPM experiment-scoped events (exposure,
// landing CTAs, application start/submit). Falls back to the sticky cookie when
// the caller doesn't pass an explicit variant.
export function withCmpmExperiment(payload = {}) {
  const cmpmVariant =
    (payload.variant && ['A', 'B'].includes(String(payload.variant).toUpperCase())
      ? String(payload.variant).toUpperCase()
      : null) || getCmpmVariantFromDocumentCookie();

  if (!cmpmVariant) return payload;

  return {
    ...payload,
    experimentKey: CMPM_EXPERIMENT_KEY,
    variant: cmpmVariant,
    metadata: {
      ...(payload.metadata || {}),
      cmpmVariant,
      cmpmExperimentKey: CMPM_EXPERIMENT_KEY,
    },
  };
}

function getCacheStore() {
  if (typeof window === 'undefined') return null;
  if (!window.__abEventThrottleCache) {
    window.__abEventThrottleCache = new Map();
  }
  return window.__abEventThrottleCache;
}

function stableStringify(value) {
  if (value === null || value === undefined) return '';
  if (typeof value !== 'object') return String(value);
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(',')}]`;

  return `{${Object.keys(value)
    .sort()
    .map((key) => `${key}:${stableStringify(value[key])}`)
    .join(',')}}`;
}

function hashString(input) {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
}

function buildEventFingerprint(eventName, payload) {
  return [
    eventName,
    payload.experimentKey || '',
    payload.variant || '',
    payload.sessionId || '',
    payload.pagePath || '',
    payload.previousPath || '',
    payload.nextPath || '',
    payload.metric || '',
    payload.value ?? '',
    payload.orderId || '',
    payload.externalOrderId || '',
    payload.source || '',
    payload.reason || '',
    stableStringify(payload.metadata),
  ].join('|');
}

function normalizePathValue(path) {
  if (!path) return '';
  try {
    const [noQuery] = String(path).split('?');
    const [noHash] = noQuery.split('#');
    return noHash || '';
  } catch {
    return String(path);
  }
}

function buildDedupeFingerprint(eventName, payload) {
  const normalized = {
    ...payload,
    pagePath: normalizePathValue(payload.pagePath),
    previousPath: normalizePathValue(payload.previousPath),
    nextPath: normalizePathValue(payload.nextPath),
  };

  if (eventName === 'ab_session_end') {
    // Session end may trigger from both visibility/pagehide; dedupe regardless of reason.
    return [
      eventName,
      normalized.experimentKey || '',
      normalized.variant || '',
      normalized.sessionId || '',
      normalized.pagePath || '',
    ].join('|');
  }

  if (eventName === 'ab_purchase_intent') {
    // A single checkout fires two intents ~1s apart: the on-site order create
    // (source: create_new_order) and the Thinkific SSO handoff (source:
    // pre_thinkific_redirect). Key only on buyer + session so their differing
    // source/metadata collapse into one intent row within the throttle window.
    return [
      eventName,
      normalized.experimentKey || '',
      normalized.sessionId || '',
      normalized.email || '',
    ].join('|');
  }

  if (eventName === 'ab_page_view') {
    // Route-change and initial-load can represent the same page view within a short window.
    return [
      eventName,
      normalized.experimentKey || '',
      normalized.variant || '',
      normalized.sessionId || '',
      normalized.pagePath || '',
      normalized.previousPath || '',
    ].join('|');
  }

  return buildEventFingerprint(eventName, normalized);
}

function isThrottled(eventName, fingerprint) {
  const store = getCacheStore();
  if (!store) return false;

  const now = Date.now();
  const ttl = EVENT_THROTTLE_MS[eventName] ?? DEFAULT_THROTTLE_MS;
  const key = `${eventName}:${fingerprint}`;
  const previous = store.get(key);

  // Keep cache bounded and fresh.
  for (const [storedKey, timestamp] of store.entries()) {
    if (now - timestamp > 5 * 60 * 1000) {
      store.delete(storedKey);
    }
  }

  if (previous && now - previous < ttl) {
    return true;
  }

  store.set(key, now);
  return false;
}

// Stable, time-INDEPENDENT id for a purchase-intent so every emitter for the
// same buyer+session collapses to one row via the server's attribute_not_exists
// guard - the on-site create-order click, the client pre-SSO handoff, and the
// server-side external-redirect SSO handoff can be minutes apart, so a time
// bucket would let them slip through as duplicates. Email is canonicalized to
// match the server (ab-event.js) and the webhook's email lookup.
export function buildPurchaseIntentEventId({
  experimentKey,
  sessionId,
  email,
} = {}) {
  const fingerprint = [
    'ab_purchase_intent',
    experimentKey || HOME_EXPERIMENT_KEY || '',
    sessionId || '',
    (email || '').trim().toLowerCase(),
  ].join('|');
  return `ab_purchase_intent_${hashString(fingerprint)}`;
}

function buildEventId(eventName, payload, fingerprint) {
  if (eventName === 'ab_purchase_intent') {
    return buildPurchaseIntentEventId(payload);
  }
  const ttl = EVENT_THROTTLE_MS[eventName] ?? DEFAULT_THROTTLE_MS;
  const bucket = Math.floor(Date.now() / ttl);
  const hash = hashString(fingerprint);
  return `ab_${eventName}_${hash}_${bucket}`;
}

async function writeAbEvent(eventName, payload = {}) {
  if (typeof window === 'undefined') return;

  const context = getAbContext(payload);
  const fingerprint = buildDedupeFingerprint(eventName, context);

  if (isThrottled(eventName, fingerprint)) {
    return;
  }

  // Path-to-purchase enrichments live in the metadata JSON blob (no schema
  // change needed): precise ordering signals, the visitor's first-touch
  // snapshot, quality/context signals, and a schema version. Caller-supplied
  // metadata (e.g. contentType/contentId on product views) wins over defaults.
  // liFatId isn't a first-class AbTestEvent column, so it also rides here where
  // the order webhook can read it back out after a purchase.
  const firstTouch = getFirstTouch();
  const mergedMetadata = {
    schemaVersion: AB_EVENT_SCHEMA_VERSION,
    clientTs: new Date().toISOString(),
    eventSeq: nextEventSeq(context.sessionId),
    userAgent:
      typeof navigator !== 'undefined' ? navigator.userAgent || null : null,
    ...(firstTouch ? { firstTouch } : {}),
    ...(context.metadata || {}),
    ...(context.liFatId != null ? { liFatId: context.liFatId } : {}),
    // All ad click ids (gclid/gbraid/wbraid/li_fat_id/msclkid/fbclid/ttclid)
    // persisted for later conversion replay (Google Ads offline import, etc.).
    ...(context.clickIds ? { clickIds: context.clickIds } : {}),
  };

  const finalPayload = {
    eventName,
    ...context,
    metadata: mergedMetadata,
    eventId: buildEventId(eventName, context, fingerprint),
  };

  trackEvent(eventName, finalPayload);

  try {
    await fetch('/api/analytics/ab-event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(finalPayload),
      keepalive: true,
    });
  } catch (error) {
    console.warn('AB analytics event failed:', eventName, error?.message);
  }
}

export async function trackAbExposure(payload = {}) {
  await writeAbEvent('ab_exposure', payload);
}

export async function trackAbPageView(payload = {}) {
  await writeAbEvent('ab_page_view', payload);
}

export async function trackAbNavNext(payload = {}) {
  await writeAbEvent('ab_nav_next', payload);
}

export async function trackAbEngagement(payload = {}) {
  await writeAbEvent('ab_engagement', payload);
}

// Fired when a visitor views a purchasable product (e.g. a course page). The
// product context is stored in metadata so the analytics codebase can measure
// the view -> intent -> complete funnel without any schema change.
export async function trackAbProductView({
  contentType = null,
  contentId = null,
  productName = null,
  priceId = null,
  metadata = {},
  ...rest
} = {}) {
  await writeAbEvent('ab_product_view', {
    ...rest,
    metadata: {
      ...metadata,
      contentType,
      contentId,
      productName,
      priceId,
    },
  });
}

export async function trackAbPurchaseIntent(payload = {}) {
  // Promote the buyer email to a top-level, indexed field so the order webhook
  // can deterministically link this intent to the completed purchase.
  const email = payload.email || payload.metadata?.email || null;
  await writeAbEvent('ab_purchase_intent', { ...payload, email });
}

export async function trackAbPdfClick(payload = {}) {
  await writeAbEvent('ab_pdf_click', payload);
}

export async function trackAbMeetingClick(payload = {}) {
  await writeAbEvent('ab_meeting_click', payload);
}

export async function trackAbLessonClick(payload = {}) {
  await writeAbEvent('ab_lesson_click', payload);
}

export async function trackAbPromoClick(payload = {}) {
  await writeAbEvent('ab_promo_click', payload);
}

// CMPM application funnel: start = the visitor begins the application form,
// submit = they submit it (the app-start step that also fires the
// send-certificate-start email action). Passing the typed email lets the sale
// stitch back to this touch via the abEventByEmail journey resolution.
// When the visitor was assigned on the CMPM landing, these events land in the
// cmpm_v1 partition with their sticky A/B variant.
export async function trackAbCmpmStart(payload = {}) {
  await writeAbEvent('ab_cmpm_start', withCmpmExperiment(payload));
}

export async function trackAbCmpmSubmit(payload = {}) {
  await writeAbEvent('ab_cmpm_submit', withCmpmExperiment(payload));
}

export async function trackAbPurchaseComplete(payload = {}) {
  await writeAbEvent('ab_purchase_complete', payload);
}

// Emits exactly one ab_session_end per sessionId. Session end is driven by the
// session window / inactivity - NEVER by visibility or pagehide (those fire many
// times per visit as the user switches tabs, locks the screen, etc.).
export async function trackAbSessionEnd(payload = {}) {
  if (typeof document === 'undefined') return;
  const sessionId = payload.sessionId || getSessionIdFromDocumentCookie();
  if (!sessionId || isSessionEnded(sessionId)) return;
  markSessionEnded(sessionId);
  await writeAbEvent('ab_session_end', { ...payload, sessionId });
}
