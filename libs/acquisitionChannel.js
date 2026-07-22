// Acquisition channel classification. Standalone and dependency-free so it can
// be unit-tested in isolation (and reused server-side if ever needed).
//
// Channel values: paid | email | social | organic | referral | direct
//
// This replaces loose substring matching that mislabeled referrals as social -
// e.g. "www.isbt.com" matched the Twitter "t.co" pattern because it contains
// the substring "t.co". Social now requires a REAL social-network domain (exact
// host or subdomain) or an explicit social source/medium token. Any other
// external referrer is a referral, and search-engine referrers are organic.
// Channel is always derived consistently with medium (no medium="referral" +
// channel="social").

export const OWN_HOST_PATTERNS = [
  'packagingschool.com',
  'localhost',
  '127.0.0.1',
];

// Real social networks. Matched as an exact host or a subdomain (foo.facebook.com).
const SOCIAL_DOMAINS = [
  'facebook.com',
  'fb.com',
  'fb.me',
  'instagram.com',
  'linkedin.com',
  'lnkd.in',
  'twitter.com',
  'x.com',
  't.co',
  'youtube.com',
  'youtu.be',
  'reddit.com',
  'tiktok.com',
  'pinterest.com',
  'pin.it',
  'threads.net',
  'snapchat.com',
  't.me',
  'telegram.org',
  'whatsapp.com',
  'tumblr.com',
];

// Bare source/medium tokens (e.g. utm_source=linkedin) that denote social.
// Matched EXACTLY against the token so "x" can't match arbitrary substrings.
const SOCIAL_SOURCE_TOKENS = new Set([
  'social',
  'facebook',
  'fb',
  'messenger',
  'instagram',
  'ig',
  'linkedin',
  'twitter',
  'x',
  'youtube',
  'yt',
  'reddit',
  'tiktok',
  'pinterest',
  'threads',
  'snapchat',
  'telegram',
  'whatsapp',
  'tumblr',
]);

// Search engines -> organic. Google/Yahoo/Yandex have many ccTLDs, so match the
// engine name followed by a dot anywhere in the host.
const SEARCH_ENGINE_RE =
  /(^|\.)(google|bing|yahoo|duckduckgo|ecosia|baidu|yandex|ask|aol|startpage|qwant)\./;

export function isOwnReferrerHost(host) {
  if (!host) return false;
  const h = String(host).toLowerCase();
  return OWN_HOST_PATTERNS.some((p) => h === p || h.endsWith(`.${p}`));
}

function hostMatchesDomain(host, domain) {
  return host === domain || host.endsWith(`.${domain}`);
}

function isSocialHost(host) {
  if (!host) return false;
  const h = String(host).toLowerCase();
  return SOCIAL_DOMAINS.some((d) => hostMatchesDomain(h, d));
}

function isSearchHost(host) {
  if (!host) return false;
  const h = String(host).toLowerCase();
  return SEARCH_ENGINE_RE.test(h) || hostMatchesDomain(h, 'search.brave.com');
}

function isSocialSource(source) {
  if (!source) return false;
  const s = String(source).toLowerCase();
  if (SOCIAL_SOURCE_TOKENS.has(s)) return true;
  // source may itself be a host (referrerHost is used as source on referrals).
  return isSocialHost(s);
}

// Classify a referrer host alone: organic (search) | social | referral, or null
// when it's our own host / empty.
export function classifyReferrerHost(host) {
  if (!host || isOwnReferrerHost(host)) return null;
  if (isSearchHost(host)) return 'organic';
  if (isSocialHost(host)) return 'social';
  return 'referral';
}

export function classifyAcquisitionChannel({
  medium,
  source,
  hasClickId,
  referrerHost,
} = {}) {
  const m = String(medium || '').toLowerCase();
  const s = String(source || '').toLowerCase();
  const host =
    referrerHost && !isOwnReferrerHost(referrerHost)
      ? String(referrerHost).toLowerCase()
      : null;

  if (hasClickId) return 'paid';
  if (
    /(^|[^a-z])(cpc|ppc|paid|display|banner|retargeting|affiliate|sponsored|ads?)([^a-z]|$)/.test(
      m,
    )
  ) {
    return 'paid';
  }
  if (/(^|[^a-z])(email|newsletter)([^a-z]|$)/.test(m)) return 'email';

  // Social requires an explicit social medium, a known social source token, or a
  // referrer from a real social-network domain - never a loose substring match.
  if (/(^|[^a-z])social([^a-z]|$)/.test(m)) return 'social';
  if (isSocialSource(s)) return 'social';
  if (isSocialHost(host)) return 'social';

  // Search-engine referrers are organic.
  if (isSearchHost(host)) return 'organic';
  if (m === 'organic') return 'organic';

  // Any other external referrer is a referral.
  if (host) return 'referral';

  return 'direct';
}
