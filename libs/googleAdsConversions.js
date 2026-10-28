import crypto from 'crypto';

// Reports a webhook-confirmed Thinkific purchase to Google Ads.
//
// Purchase Confirmed (7878499571) is an "Import from clicks" action on
// customer 684-785-4799. New Ads accounts can no longer use
// UploadClickConversions, so this sends the sale through the Data Manager API
// (events:ingest). No developer token is required.
//
// Required environment variables (OAuth client with the Data Manager API
// enabled, refresh token minted for scope
// https://www.googleapis.com/auth/datamanager):
//   GOOGLE_ADS_CLIENT_ID
//   GOOGLE_ADS_CLIENT_SECRET
//   GOOGLE_ADS_REFRESH_TOKEN
// Optional overrides:
//   GOOGLE_ADS_CUSTOMER_ID            defaults to 6847854799
//   GOOGLE_ADS_LOGIN_CUSTOMER_ID      defaults to the customer id (set for an MCC login)
//   GOOGLE_ADS_CONVERSION_ACTION_ID   defaults to 7878499571

const INGEST_URL = 'https://datamanager.googleapis.com/v1/events:ingest';
const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const DEFAULT_CUSTOMER_ID = '6847854799';
const DEFAULT_CONVERSION_ACTION_ID = '7878499571';

let tokenCache = null;

function digitsOnly(value) {
  return String(value || '').replace(/\D/g, '');
}

export function googleAdsCustomerId() {
  return digitsOnly(process.env.GOOGLE_ADS_CUSTOMER_ID || DEFAULT_CUSTOMER_ID);
}

export function googleAdsConversionActionId() {
  return digitsOnly(
    process.env.GOOGLE_ADS_CONVERSION_ACTION_ID || DEFAULT_CONVERSION_ACTION_ID,
  );
}

export function isGoogleAdsConversionsConfigured() {
  return Boolean(
    process.env.GOOGLE_ADS_CLIENT_ID &&
      process.env.GOOGLE_ADS_CLIENT_SECRET &&
      process.env.GOOGLE_ADS_REFRESH_TOKEN,
  );
}

export function normalizeEmailForGoogle(email) {
  if (!email) return null;
  const trimmed = String(email).trim().toLowerCase();
  const at = trimmed.lastIndexOf('@');
  if (at <= 0 || at === trimmed.length - 1) return null;
  let local = trimmed.slice(0, at);
  const domain = trimmed.slice(at + 1);
  if (domain === 'gmail.com' || domain === 'googlemail.com') {
    const plus = local.indexOf('+');
    if (plus !== -1) local = local.slice(0, plus);
    local = local.replace(/\./g, '');
  }
  if (!local) return null;
  return `${local}@${domain}`;
}

function hashSha256(value) {
  return crypto.createHash('sha256').update(value, 'utf8').digest('hex').toUpperCase();
}

export function formatEventTimestamp(ms) {
  const date = new Date(Number.isFinite(ms) ? ms : Date.now());
  if (Number.isNaN(date.getTime())) return new Date().toISOString().replace(/\.\d{3}Z$/, '+00:00');
  return date.toISOString().replace(/\.\d{3}Z$/, '+00:00');
}

export function shouldSkipZeroAmount({ amountDollars, amountCents } = {}) {
  if (amountDollars !== undefined && amountDollars !== null && amountDollars !== '') {
    const dollars = Number(amountDollars);
    if (Number.isFinite(dollars)) return dollars <= 0;
  }
  if (amountCents !== undefined && amountCents !== null && amountCents !== '') {
    const cents = Number(amountCents);
    if (Number.isFinite(cents)) return cents <= 0;
  }
  return false;
}

export function buildGoogleAdsPurchaseEvent({
  click,
  email,
  amountDollars,
  conversionHappenedAt,
  orderId,
} = {}) {
  const event = {
    eventTimestamp: formatEventTimestamp(
      Number.isFinite(conversionHappenedAt) ? conversionHappenedAt : Date.parse(conversionHappenedAt || ''),
    ),
    eventSource: 'WEB',
  };

  if (orderId) event.transactionId = String(orderId).slice(0, 128);

  const amount = Number(amountDollars);
  if (Number.isFinite(amount) && amount > 0) {
    event.conversionValue = amount;
    event.currency = 'USD';
  }

  if (click?.key && click?.value) {
    event.adIdentifiers = { [click.key]: String(click.value) };
  }

  const normalizedEmail = normalizeEmailForGoogle(email);
  if (normalizedEmail) {
    event.userData = {
      userIdentifiers: [{ emailAddress: hashSha256(normalizedEmail) }],
    };
  }

  return event;
}

export function buildGoogleAdsIngestBody(input = {}) {
  const event = buildGoogleAdsPurchaseEvent(input);
  const customerId = googleAdsCustomerId();
  const loginId = digitsOnly(process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID || customerId);
  return {
    destinations: [
      {
        operatingAccount: { accountType: 'GOOGLE_ADS', accountId: customerId },
        loginAccount: { accountType: 'GOOGLE_ADS', accountId: loginId },
        productDestinationId: googleAdsConversionActionId(),
      },
    ],
    events: [event],
    ...(event.userData ? { encoding: 'HEX' } : {}),
  };
}

async function getAccessToken() {
  const now = Date.now();
  if (tokenCache && tokenCache.expiresAt > now + 60 * 1000) return tokenCache.token;

  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_ADS_CLIENT_ID,
      client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET,
      refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN,
      grant_type: 'refresh_token',
    }),
  });

  const json = await response.json().catch(() => ({}));
  if (!response.ok || !json.access_token) {
    const detail = json.error_description || json.error || `oauth_${response.status}`;
    throw new Error(detail);
  }

  tokenCache = {
    token: json.access_token,
    expiresAt: now + (Number(json.expires_in) || 3600) * 1000,
  };
  return tokenCache.token;
}

// Never throws. A Google outage must not fail the Thinkific webhook.
export async function sendGoogleAdsPurchaseConversion(input = {}) {
  if (!isGoogleAdsConversionsConfigured()) {
    return { success: false, skipped: true, reason: 'google_ads_not_configured' };
  }
  if (shouldSkipZeroAmount(input)) {
    return { success: false, skipped: true, reason: 'zero_amount' };
  }

  const body = buildGoogleAdsIngestBody(input);
  const event = body.events[0];
  if (!event?.adIdentifiers && !event?.userData) {
    return { success: false, skipped: true, reason: 'no_identifiers' };
  }

  try {
    const accessToken = await getAccessToken();
    const response = await fetch(INGEST_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const responseText = await response.text().catch(() => '');
    let parsed = null;
    try {
      parsed = responseText ? JSON.parse(responseText) : null;
    } catch {
      parsed = null;
    }

    if (!response.ok) {
      console.warn('Google Ads conversion upload failed:', response.status, responseText.slice(0, 500));
      return {
        success: false,
        status: response.status,
        response: responseText.slice(0, 500),
        clickIdType: input.click?.key || null,
      };
    }

    return {
      success: true,
      status: response.status,
      requestId: parsed?.requestId || null,
      clickIdType: input.click?.key || null,
    };
  } catch (error) {
    console.warn('Google Ads conversion upload errored:', error?.message);
    return { success: false, error: error?.message, clickIdType: input.click?.key || null };
  }
}
