const DEFAULT_SSO_ORIGIN = 'https://packagingschool.thinkific.com';
const CUSTOM_DOMAIN_SSO_ORIGIN = 'https://learn.packagingschool.com';
const SCHOOL_HOSTS = new Set([
  'learn.packagingschool.com',
  'packagingschool.thinkific.com',
]);

// Checkout tiers use /enroll/{id}?price_id={id}. Thinkific SSO via the
// *.thinkific.com host often 302s onto the custom domain and drops the query
// string, which lands the buyer on the product's default price. For those
// URLs only, SSO on the custom domain with a path+search return_to. Every
// other destination keeps the historical thinkific.com SSO URL.
export function buildThinkificSsoUrl(token, return_to) {
  let ssoOrigin = DEFAULT_SSO_ORIGIN;
  let returnToParam = return_to;

  if (return_to && /[?&]price_id=/.test(return_to)) {
    try {
      const url = return_to.startsWith('http')
        ? new URL(return_to)
        : new URL(return_to, CUSTOM_DOMAIN_SSO_ORIGIN);
      if (return_to.startsWith('/') || SCHOOL_HOSTS.has(url.hostname)) {
        ssoOrigin = CUSTOM_DOMAIN_SSO_ORIGIN;
        returnToParam = `${url.pathname}${url.search}`;
      }
    } catch {
      // Keep the historical SSO URL if parsing fails.
    }
  }

  return `${ssoOrigin}/api/sso/v2/sso/jwt?jwt=${token}${
    returnToParam ? `&return_to=${encodeURIComponent(returnToParam)}` : ''
  }`;
}
