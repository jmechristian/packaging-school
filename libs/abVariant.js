export const HOME_EXPERIMENT_KEY = 'home_v1';
export const HOME_VARIANT_COOKIE = 'ps_ab_home_v1';
export const AB_SESSION_COOKIE = 'ps_ab_session_id';
// Persistent, cross-session visitor id. This is the linchpin for path-to-purchase
// analysis: it stitches every visit from the same browser together, even the
// anonymous browsing that happens before we ever learn an email/user id.
export const AB_VISITOR_COOKIE = 'ps_ab_visitor_id';
export const AB_COOKIE_MAX_AGE = 60 * 60 * 24 * 180; // 180 days
export const AB_SESSION_MAX_AGE = 60 * 60 * 6; // 6 hours
export const AB_VISITOR_MAX_AGE = 60 * 60 * 24 * 730; // 730 days (~2 years)
export const HOME_VARIANT_CONFIG = [
  { key: 'B', weight: 1 },
  { key: 'C', weight: 1 },
  { key: 'D', weight: 1 },
];

// Separate CMPM landing experiment (not homepage home_v1).
export const CMPM_EXPERIMENT_KEY = 'cmpm_v1';
export const CMPM_VARIANT_COOKIE = 'ps_ab_cmpm_v1';
export const CMPM_VARIANT_CONFIG = [
  { key: 'A', weight: 1 },
  { key: 'B', weight: 1 },
];

function normalizeVariant(value) {
  if (value === undefined || value === null) return null;
  const normalized = String(value).replace(/"/g, '').trim().toUpperCase();
  if (getAllowedHomeVariants().includes(normalized)) return normalized;
  return null;
}

function normalizeCmpmVariant(value) {
  if (value === undefined || value === null) return null;
  const normalized = String(value).replace(/"/g, '').trim().toUpperCase();
  if (getAllowedCmpmVariants().includes(normalized)) return normalized;
  return null;
}

export function getAllowedHomeVariants() {
  return HOME_VARIANT_CONFIG.map((entry) => entry.key);
}

export function getAllowedCmpmVariants() {
  return CMPM_VARIANT_CONFIG.map((entry) => entry.key);
}

export function getCookieValues(cookieHeader = '', key) {
  if (!cookieHeader || typeof cookieHeader !== 'string' || !key) return [];

  return cookieHeader
    .split(';')
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const separator = part.indexOf('=');
      if (separator === -1) return null;
      const cookieKey = part.slice(0, separator).trim();
      if (cookieKey !== key) return null;
      const rawValue = part.slice(separator + 1).trim();
      return decodeURIComponent(rawValue);
    })
    .filter((value) => value !== null);
}

export function parseCookieHeader(cookieHeader = '') {
  if (!cookieHeader || typeof cookieHeader !== 'string') return {};

  return cookieHeader.split(';').reduce((acc, part) => {
    const trimmed = part.trim();
    if (!trimmed) return acc;

    const separator = trimmed.indexOf('=');
    if (separator === -1) return acc;

    const key = trimmed.slice(0, separator).trim();
    if (Object.prototype.hasOwnProperty.call(acc, key)) {
      // Keep the first seen value so the most specific cookie (host/path)
      // is favored over later duplicates with the same name.
      return acc;
    }
    const value = trimmed.slice(separator + 1).trim();
    acc[key] = decodeURIComponent(value);
    return acc;
  }, {});
}

export function chooseVariant() {
  const weighted = HOME_VARIANT_CONFIG.filter(
    (entry) => entry?.key && Number(entry.weight) > 0,
  );
  if (weighted.length === 0) return 'C';

  const totalWeight = weighted.reduce((sum, entry) => sum + Number(entry.weight), 0);
  const roll = Math.random() * totalWeight;
  let cumulative = 0;
  for (const entry of weighted) {
    cumulative += Number(entry.weight);
    if (roll < cumulative) {
      return entry.key;
    }
  }

  return weighted[weighted.length - 1].key;
}

export function getVariantFromCookieHeader(cookieHeader) {
  const matches = getCookieValues(cookieHeader, HOME_VARIANT_COOKIE);
  for (let i = matches.length - 1; i >= 0; i -= 1) {
    const normalized = normalizeVariant(matches[i]);
    if (normalized) return normalized;
  }
  return null;
}

export function getVariantFromDocumentCookie() {
  if (typeof document === 'undefined') return null;
  const cookies = parseCookieHeader(document.cookie);
  return normalizeVariant(cookies[HOME_VARIANT_COOKIE]);
}

export function createVariantCookieValue(variant, hostHeader) {
  const resolvedVariant = normalizeVariant(variant) || chooseVariant();
  const domain = getCookieDomain(hostHeader);
  const domainPart = domain ? `; Domain=${domain}` : '';
  return `${HOME_VARIANT_COOKIE}=${resolvedVariant}; Path=/; Max-Age=${AB_COOKIE_MAX_AGE}; SameSite=Lax${domainPart}`;
}

export function chooseCmpmVariant() {
  const weighted = CMPM_VARIANT_CONFIG.filter(
    (entry) => entry?.key && Number(entry.weight) > 0,
  );
  if (weighted.length === 0) return 'A';

  const totalWeight = weighted.reduce((sum, entry) => sum + Number(entry.weight), 0);
  const roll = Math.random() * totalWeight;
  let cumulative = 0;
  for (const entry of weighted) {
    cumulative += Number(entry.weight);
    if (roll < cumulative) {
      return entry.key;
    }
  }

  return weighted[weighted.length - 1].key;
}

export function getCmpmVariantFromCookieHeader(cookieHeader) {
  const matches = getCookieValues(cookieHeader, CMPM_VARIANT_COOKIE);
  for (let i = matches.length - 1; i >= 0; i -= 1) {
    const normalized = normalizeCmpmVariant(matches[i]);
    if (normalized) return normalized;
  }
  return null;
}

export function getCmpmVariantFromDocumentCookie() {
  if (typeof document === 'undefined') return null;
  const cookies = parseCookieHeader(document.cookie);
  return normalizeCmpmVariant(cookies[CMPM_VARIANT_COOKIE]);
}

export function createCmpmVariantCookieValue(variant, hostHeader) {
  const resolvedVariant = normalizeCmpmVariant(variant) || chooseCmpmVariant();
  const domain = getCookieDomain(hostHeader);
  const domainPart = domain ? `; Domain=${domain}` : '';
  return `${CMPM_VARIANT_COOKIE}=${resolvedVariant}; Path=/; Max-Age=${AB_COOKIE_MAX_AGE}; SameSite=Lax${domainPart}`;
}

function getCookieDomain(hostHeader = '') {
  const host = String(hostHeader).split(':')[0].toLowerCase();
  if (!host) return null;

  if (host === 'packagingschool.com' || host.endsWith('.packagingschool.com')) {
    return '.packagingschool.com';
  }

  return null;
}

export function getSessionIdFromDocumentCookie() {
  if (typeof document === 'undefined') return null;
  const cookies = parseCookieHeader(document.cookie);
  return cookies[AB_SESSION_COOKIE] || null;
}

export function createSessionCookieValue(sessionId) {
  return `${AB_SESSION_COOKIE}=${encodeURIComponent(sessionId)}; Path=/; Max-Age=${AB_SESSION_MAX_AGE}; SameSite=Lax`;
}

export function getVisitorIdFromDocumentCookie() {
  if (typeof document === 'undefined') return null;
  const cookies = parseCookieHeader(document.cookie);
  return cookies[AB_VISITOR_COOKIE] || null;
}

export function getVisitorIdFromCookieHeader(cookieHeader) {
  const matches = getCookieValues(cookieHeader, AB_VISITOR_COOKIE);
  return matches.length > 0 ? matches[matches.length - 1] : null;
}

export function createVisitorCookieValue(visitorId, hostHeader) {
  const domain = getCookieDomain(hostHeader);
  const domainPart = domain ? `; Domain=${domain}` : '';
  return `${AB_VISITOR_COOKIE}=${encodeURIComponent(visitorId)}; Path=/; Max-Age=${AB_VISITOR_MAX_AGE}; SameSite=Lax${domainPart}`;
}

