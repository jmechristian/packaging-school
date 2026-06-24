import {
  AB_SESSION_COOKIE,
  AB_SESSION_MAX_AGE,
  HOME_EXPERIMENT_KEY,
  createSessionCookieValue,
  getSessionIdFromDocumentCookie,
  getVariantFromDocumentCookie,
} from './abVariant';

const DEFAULT_THROTTLE_MS = 1500;
const AB_ATTRIBUTION_COOKIE = 'ps_ab_attribution';
const EVENT_THROTTLE_MS = {
  ab_exposure: 60000,
  ab_page_view: 3000,
  ab_nav_next: 1000,
  ab_engagement: 1000,
  ab_pdf_click: 1500,
  ab_meeting_click: 1500,
  ab_lesson_click: 1500,
  ab_promo_click: 1500,
  ab_purchase_intent: 3000,
  ab_purchase_complete: 3000,
  ab_session_end: 30000,
};

const OWN_HOST_PATTERNS = ['packagingschool.com', 'localhost', '127.0.0.1'];

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

export function ensureAbSessionId() {
  if (typeof document === 'undefined') return null;

  const existing = getSessionIdFromDocumentCookie();
  if (existing) return existing;

  const nextSessionId = makeSessionId();
  document.cookie = createSessionCookieValue(nextSessionId);
  return nextSessionId;
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

function isOwnReferrerHost(host) {
  if (!host) return false;
  return OWN_HOST_PATTERNS.some((pattern) => host === pattern || host.endsWith(`.${pattern}`));
}

function classifyAcquisitionChannel({ medium, source, hasClickId, referrerHost }) {
  const normalizedMedium = String(medium || '').toLowerCase();
  const normalizedSource = String(source || '').toLowerCase();

  if (hasClickId) return 'paid';
  if (
    /(cpc|ppc|paid|display|banner|retargeting|affiliate|sponsored|ads?)/.test(
      normalizedMedium
    )
  ) {
    return 'paid';
  }
  if (/(email|newsletter)/.test(normalizedMedium)) return 'email';
  if (
    /(social|facebook|instagram|linkedin|x|twitter|tiktok|pinterest|reddit)/.test(
      normalizedMedium
    ) ||
    /(facebook|instagram|linkedin|t\\.co|twitter|tiktok|pinterest|reddit)/.test(
      normalizedSource
    )
  ) {
    return 'social';
  }
  if (normalizedMedium === 'organic') return 'organic';
  if (!source && !referrerHost) return 'direct';
  if (referrerHost && !isOwnReferrerHost(referrerHost)) {
    if (/google\\.|bing\\.|yahoo\\.|duckduckgo\\./.test(referrerHost)) {
      return 'organic';
    }
    return 'referral';
  }
  return 'direct';
}

function detectAttributionContext() {
  if (typeof window === 'undefined') return null;

  const url = new URL(window.location.href);
  const params = url.searchParams;
  const referrer = typeof document !== 'undefined' ? document.referrer || '' : '';
  const referrerHost = getReferrerHost(referrer);

  const source = params.get('utm_source') || params.get('source') || referrerHost || null;
  const medium = params.get('utm_medium') || null;
  const campaign = params.get('utm_campaign') || null;
  const term = params.get('utm_term') || null;
  const content = params.get('utm_content') || null;

  const hasClickId = ['gclid', 'msclkid', 'fbclid', 'ttclid', 'li_fat_id'].some((key) =>
    Boolean(params.get(key))
  );

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
  };
}

function resolveAttributionContext(sessionId) {
  if (typeof window === 'undefined') return null;
  if (window.__abAttributionCache?.sessionId === sessionId) {
    return window.__abAttributionCache;
  }

  const fromCookie = safeParseAttributionCookie(getCookieValue(AB_ATTRIBUTION_COOKIE));
  if (fromCookie?.sessionId === sessionId) {
    window.__abAttributionCache = fromCookie;
    return fromCookie;
  }

  const detected = detectAttributionContext();
  if (!detected) return null;

  const payload = {
    sessionId,
    ...detected,
  };
  window.__abAttributionCache = payload;
  writeAttributionCookie(payload);
  return payload;
}

export function getAbContext(overrides = {}) {
  const variant = overrides.variant || getVariantFromDocumentCookie();
  const sessionId = overrides.sessionId || ensureAbSessionId();
  const pagePath =
    overrides.pagePath ||
    (typeof window !== 'undefined' ? window.location.pathname : null);
  const attribution = resolveAttributionContext(sessionId);

  return {
    experimentKey: HOME_EXPERIMENT_KEY,
    variant: variant || null,
    sessionId,
    pagePath,
    deviceType: overrides.deviceType || getDeviceTypeFromUserAgent(),
    acquisitionChannel: overrides.acquisitionChannel || attribution?.channel || null,
    acquisitionSource: overrides.acquisitionSource || attribution?.source || null,
    acquisitionMedium: overrides.acquisitionMedium || attribution?.medium || null,
    acquisitionCampaign: overrides.acquisitionCampaign || attribution?.campaign || null,
    acquisitionTerm: overrides.acquisitionTerm || attribution?.term || null,
    acquisitionContent: overrides.acquisitionContent || attribution?.content || null,
    referrer: overrides.referrer || attribution?.referrer || null,
    ...overrides,
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

function buildEventId(eventName, payload, fingerprint) {
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

  const finalPayload = {
    eventName,
    ...context,
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

export async function trackAbPurchaseComplete(payload = {}) {
  await writeAbEvent('ab_purchase_complete', payload);
}

export async function trackAbSessionEnd(payload = {}) {
  await writeAbEvent('ab_session_end', payload);
}
