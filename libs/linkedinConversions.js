import crypto from 'crypto';

// LinkedIn's Conversions API is the server-to-server counterpart to the
// Insight Tag <script> snippet. The Insight Tag only runs in a visitor's
// browser, so it has no way to report a conversion that's confirmed later by
// a server-to-server webhook (e.g. Thinkific's order.created). This module
// reports that confirmed purchase directly to LinkedIn instead.
//
// Required LinkedIn setup (done once, outside this codebase):
//   1. A Conversion Rule in Campaign Manager with conversionMethod =
//      CONVERSIONS_API, associated with the target campaign(s). This must be
//      a *separate* rule from any Insight Tag (browser pixel) rule -- LinkedIn
//      requires a distinct rule per data source even for the same goal.
//   2. A non-expiring access token generated directly from Campaign Manager
//      (Ad Account > Data > Signals Manager > Direct API > Generate access
//      token). No Developer Portal app or OAuth flow is needed for direct
//      advertisers.
//
// Required environment variables:
//   LINKEDIN_ACCESS_TOKEN        - Direct API access token (non-expiring)
//   LINKEDIN_CONVERSION_URN      - urn:lla:llaPartnerConversion:<id> of the
//                                  CONVERSIONS_API-sourced rule (not the
//                                  Insight Tag rule)
//   LINKEDIN_API_VERSION         - optional, defaults to DEFAULT_LINKEDIN_VERSION
//   LINKEDIN_CONVERSION_PRODUCT_IDS - optional comma-separated Thinkific
//                                     product ids that should trigger a
//                                     conversion event (defaults to 887760,
//                                     "Packaging 101 Boot Camp")

const LINKEDIN_API_URL = 'https://api.linkedin.com/rest/conversionEvents';
const DEFAULT_LINKEDIN_VERSION = '202506';
const DEFAULT_TARGET_PRODUCT_IDS = ['887760'];
const DEFAULT_TARGET_PRODUCT_NAME = 'packaging 101 boot camp';

function hashEmailSha256(email) {
  if (!email) return null;
  const normalized = String(email).trim().toLowerCase().replace(/\s+/g, '');
  if (!normalized) return null;
  return crypto.createHash('sha256').update(normalized, 'utf8').digest('hex');
}

export function isLinkedInConversionsConfigured() {
  return Boolean(process.env.LINKEDIN_ACCESS_TOKEN && process.env.LINKEDIN_CONVERSION_URN);
}

function normalizeComparable(value) {
  if (value === undefined || value === null) return null;
  return String(value).trim().toLowerCase().replace(/\s+/g, ' ');
}

// Decides whether a completed Thinkific order should be reported to LinkedIn,
// based on the product purchased. Defaults to the boot camp campaign but can
// be extended via LINKEDIN_CONVERSION_PRODUCT_IDS without a code change.
export function isLinkedInTargetProduct({ productId, productName }) {
  const targetIds = String(
    process.env.LINKEDIN_CONVERSION_PRODUCT_IDS || DEFAULT_TARGET_PRODUCT_IDS.join(','),
  )
    .split(',')
    .map((id) => id.trim())
    .filter(Boolean);

  const normalizedProductId = productId !== undefined && productId !== null ? String(productId) : null;
  if (normalizedProductId && targetIds.includes(normalizedProductId)) return true;

  const normalizedProductName = normalizeComparable(productName);
  return normalizedProductName === DEFAULT_TARGET_PRODUCT_NAME;
}

// Streams a single confirmed conversion to LinkedIn. Never throws -- a
// LinkedIn API hiccup should never break the Thinkific webhook it's attached
// to. Returns a small result object suitable for audit logging.
export async function sendLinkedInConversionEvent({
  email,
  liFatId,
  amountDollars,
  conversionHappenedAt,
  eventId,
  firstName,
  lastName,
}) {
  if (!isLinkedInConversionsConfigured()) {
    return { success: false, skipped: true, reason: 'linkedin_not_configured' };
  }

  const hashedEmail = hashEmailSha256(email);
  const userIds = [];
  if (hashedEmail) {
    userIds.push({ idType: 'SHA256_EMAIL', idValue: hashedEmail });
  }
  if (liFatId) {
    userIds.push({ idType: 'LINKEDIN_FIRST_PARTY_ADS_TRACKING_UUID', idValue: String(liFatId) });
  }

  if (!userIds.length) {
    return { success: false, skipped: true, reason: 'no_user_identifiers' };
  }

  const hasName = Boolean(firstName || lastName);
  const body = {
    conversion: process.env.LINKEDIN_CONVERSION_URN,
    conversionHappenedAt: Number.isFinite(conversionHappenedAt) ? conversionHappenedAt : Date.now(),
    user: {
      userIds,
      ...(hasName
        ? {
            userInfo: {
              ...(firstName ? { firstName } : {}),
              ...(lastName ? { lastName } : {}),
            },
          }
        : {}),
    },
    ...(eventId ? { eventId: String(eventId) } : {}),
  };

  const amount = Number(amountDollars);
  if (Number.isFinite(amount)) {
    body.conversionValue = {
      currencyCode: 'USD',
      amount: amount.toFixed(2),
    };
  }

  try {
    const response = await fetch(LINKEDIN_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.LINKEDIN_ACCESS_TOKEN}`,
        'LinkedIn-Version': process.env.LINKEDIN_API_VERSION || DEFAULT_LINKEDIN_VERSION,
        'X-Restli-Protocol-Version': '2.0.0',
      },
      body: JSON.stringify(body),
    });

    const matchedIdentifiers = userIds.map((entry) => entry.idType);

    if (!response.ok) {
      const responseText = await response.text().catch(() => '');
      console.warn('LinkedIn conversion event failed:', response.status, responseText);
      return {
        success: false,
        status: response.status,
        response: responseText.slice(0, 2000),
        matchedIdentifiers,
      };
    }

    return { success: true, status: response.status, matchedIdentifiers };
  } catch (error) {
    console.warn('LinkedIn conversion event request errored:', error?.message);
    return { success: false, error: error?.message };
  }
}
