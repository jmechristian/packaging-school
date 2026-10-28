import test from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'crypto';
import {
  googleClickRecordFromSearch,
  mergeClickIds,
  parseGoogleClickRecord,
  pickGoogleClickId,
} from './googleClick.js';
import {
  buildGoogleAdsIngestBody,
  normalizeEmailForGoogle,
  shouldSkipZeroAmount,
} from './googleAdsConversions.js';

const NOW = Date.parse('2026-10-28T18:00:00.000Z');
const DAY = 24 * 60 * 60 * 1000;

test('stores one Google click id from the landing URL, preferring gclid', () => {
  const params = new URLSearchParams('gclid=CLICK1&gbraid=BRAID1&utm_source=google');
  const record = googleClickRecordFromSearch(params, '2026-10-28T18:00:00.000Z');
  assert.deepEqual(record, {
    key: 'gclid',
    value: 'CLICK1',
    capturedAt: '2026-10-28T18:00:00.000Z',
  });
});

test('rejects an expired stored click and accepts an encoded cookie', () => {
  const fresh = parseGoogleClickRecord(
    encodeURIComponent(JSON.stringify({
      key: 'gclid',
      value: 'CLICK1',
      capturedAt: new Date(NOW - 10 * DAY).toISOString(),
    })),
    NOW,
  );
  assert.equal(fresh.value, 'CLICK1');

  const expired = parseGoogleClickRecord(
    JSON.stringify({
      key: 'gclid',
      value: 'OLD',
      capturedAt: new Date(NOW - 91 * DAY).toISOString(),
    }),
    NOW,
  );
  assert.equal(expired, null);
});

test('keeps a click id already on this visit and fills one in when the visit has none', () => {
  const stored = { key: 'gclid', value: 'STORED', capturedAt: '2026-10-01T00:00:00.000Z' };
  const fresh = mergeClickIds({ gclid: 'FRESH', li_fat_id: 'li' }, stored);
  assert.equal(fresh.gclid, 'FRESH');
  assert.equal(fresh.li_fat_id, 'li');

  const filled = mergeClickIds({ li_fat_id: 'li' }, stored);
  assert.equal(filled.gclid, 'STORED');
  assert.equal(filled.googleClickCapturedAt, '2026-10-01T00:00:00.000Z');
  assert.equal(filled.li_fat_id, 'li');
});

test('uses the matched intent click id before a newer event', () => {
  const events = [
    {
      id: 'view',
      createdAt: '2026-10-27T12:00:00.000Z',
      metadata: JSON.stringify({ clickIds: { gclid: 'NEWER' } }),
    },
    {
      id: 'intent',
      createdAt: '2026-10-20T12:00:00.000Z',
      metadata: JSON.stringify({
        clickIds: { gclid: 'FROM_INTENT', googleClickCapturedAt: '2026-10-20T12:00:00.000Z' },
      }),
    },
  ];
  const picked = pickGoogleClickId(events, {
    anchorMs: NOW,
    matchedIntentId: 'intent',
  });
  assert.equal(picked.value, 'FROM_INTENT');
  assert.equal(picked.eventId, 'intent');
});

test('uses the newest click when the intent has none, and drops clicks outside 30 days', () => {
  const events = [
    {
      id: 'recent-intent',
      eventName: 'ab_purchase_intent',
      createdAt: '2026-10-28T17:00:00.000Z',
      metadata: JSON.stringify({ courseName: 'Boot Camp' }),
    },
    {
      id: 'old-click',
      createdAt: '2026-10-28T16:00:00.000Z',
      metadata: JSON.stringify({
        clickIds: { gclid: 'TOO_OLD', googleClickCapturedAt: new Date(NOW - 40 * DAY).toISOString() },
      }),
    },
    {
      id: 'good-click',
      createdAt: '2026-10-10T12:00:00.000Z',
      metadata: JSON.stringify({ clickIds: { wbraid: 'WB1' } }),
    },
    {
      id: 'after-sale',
      createdAt: '2026-10-28T19:00:00.000Z',
      metadata: JSON.stringify({ clickIds: { gclid: 'AFTER' } }),
    },
  ];
  const picked = pickGoogleClickId(events, {
    anchorMs: NOW,
    matchedIntentId: 'recent-intent',
  });
  assert.equal(picked.key, 'wbraid');
  assert.equal(picked.value, 'WB1');
  assert.equal(picked.eventId, 'good-click');
});

test('builds the Purchase Confirmed upload for the Packaging School account', () => {
  const previousCustomer = process.env.GOOGLE_ADS_CUSTOMER_ID;
  const previousAction = process.env.GOOGLE_ADS_CONVERSION_ACTION_ID;
  const previousLogin = process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID;
  delete process.env.GOOGLE_ADS_CUSTOMER_ID;
  delete process.env.GOOGLE_ADS_CONVERSION_ACTION_ID;
  delete process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID;

  try {
    const body = buildGoogleAdsIngestBody({
      click: { key: 'gclid', value: 'CLICK1' },
      email: 'John.Smith+news@gmail.com',
      amountDollars: '97.00',
      conversionHappenedAt: NOW,
      orderId: 'ORD100',
    });
    assert.equal(body.destinations[0].operatingAccount.accountId, '6847854799');
    assert.equal(body.destinations[0].loginAccount.accountId, '6847854799');
    assert.equal(body.destinations[0].productDestinationId, '7878499571');
    assert.equal(body.encoding, 'HEX');
    assert.equal(body.events[0].adIdentifiers.gclid, 'CLICK1');
    assert.equal(body.events[0].conversionValue, 97);
    assert.equal(body.events[0].currency, 'USD');
    assert.equal(body.events[0].transactionId, 'ORD100');
    assert.equal(body.events[0].eventTimestamp, '2026-10-28T18:00:00+00:00');
    const expected = crypto
      .createHash('sha256')
      .update('johnsmith@gmail.com', 'utf8')
      .digest('hex')
      .toUpperCase();
    assert.equal(normalizeEmailForGoogle('John.Smith+news@gmail.com'), 'johnsmith@gmail.com');
    assert.equal(body.events[0].userData.userIdentifiers[0].emailAddress, expected);
    assert.equal(shouldSkipZeroAmount({ amountDollars: 0 }), true);
    assert.equal(shouldSkipZeroAmount({ amountDollars: null, amountCents: 9700 }), false);
    assert.equal(shouldSkipZeroAmount({}), false);
  } finally {
    if (previousCustomer === undefined) delete process.env.GOOGLE_ADS_CUSTOMER_ID;
    else process.env.GOOGLE_ADS_CUSTOMER_ID = previousCustomer;
    if (previousAction === undefined) delete process.env.GOOGLE_ADS_CONVERSION_ACTION_ID;
    else process.env.GOOGLE_ADS_CONVERSION_ACTION_ID = previousAction;
    if (previousLogin === undefined) delete process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID;
    else process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID = previousLogin;
  }
});
