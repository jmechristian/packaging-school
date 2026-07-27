import { deriveBuyerAttribution, isNonDirectChannel } from './purchaseAttribution';

// Guard for webhook purchase attribution. Run with any Jest-compatible runner.
// These cases mirror the production bug where completes landed with a null
// channel + method="none" even though the buyer's attributed journey existed
// (e.g. ORD015076 / joseph.panella@gmail.com, all organic from search.yahoo.com).

const PURCHASE_ISO = '2026-07-20T18:00:00.000Z';
const anchorMs = Date.parse(PURCHASE_ISO);

// Buyer's journey, most-recent first (DESC) - all organic Yahoo touches, same
// visitorId, including a product view and a purchase intent for the boot camp.
function ord015076Events({ withIntent = true } = {}) {
  const visitorId = 'b34d553c-0000-4000-8000-000000000000';
  const base = {
    variant: 'D',
    sessionId: 'sess-abc',
    visitorId,
    email: 'joseph.panella@gmail.com',
    acquisitionChannel: 'organic',
    acquisitionSource: 'search.yahoo.com',
    acquisitionMedium: 'organic',
    acquisitionCampaign: null,
    metadata: JSON.stringify({
      firstTouch: { channel: 'organic', source: 'search.yahoo.com', medium: 'organic' },
    }),
  };
  const events = [
    { ...base, id: 'e5', eventName: 'ab_page_view', createdAt: '2026-07-20T17:55:00.000Z' },
    { ...base, id: 'e4', eventName: 'ab_product_view', createdAt: '2026-07-20T17:50:00.000Z',
      metadata: JSON.stringify({
        productName: 'Packaging 101 Boot Camp',
        firstTouch: { channel: 'organic', source: 'search.yahoo.com', medium: 'organic' },
      }) },
    { ...base, id: 'e3', eventName: 'ab_page_view', createdAt: '2026-07-20T17:45:00.000Z' },
    { ...base, id: 'e1', eventName: 'ab_page_view', createdAt: '2026-07-19T09:00:00.000Z' },
  ];
  if (withIntent) {
    events.splice(1, 0, {
      ...base,
      id: 'intent-1',
      eventName: 'ab_purchase_intent',
      createdAt: '2026-07-20T17:52:00.000Z',
      metadata: JSON.stringify({
        courseName: 'Packaging 101 Boot Camp',
        firstTouch: { channel: 'organic', source: 'search.yahoo.com', medium: 'organic' },
      }),
    });
  }
  return events;
}

describe('deriveBuyerAttribution', () => {
  it('ORD015076: resolves organic/yahoo via a matched intent (method="intent")', () => {
    const result = deriveBuyerAttribution(ord015076Events({ withIntent: true }), {
      productName: 'Packaging 101 Boot Camp',
      anchorMs,
    });

    expect(result.method).toBe('intent');
    expect(result.matchedIntentId).toBe('intent-1');
    expect(result.acquisitionChannel).toBe('organic');
    expect(result.acquisitionSource).toBe('search.yahoo.com');
    expect(result.visitorId).toBe('b34d553c-0000-4000-8000-000000000000');
    expect(result.sessionId).toBe('sess-abc');
  });

  it('ORD015076 without an intent: still resolves via email (method="email")', () => {
    const result = deriveBuyerAttribution(ord015076Events({ withIntent: false }), {
      productName: 'Packaging 101 Boot Camp',
      anchorMs,
    });

    expect(result.method).toBe('email');
    expect(result.matchedIntentId).toBeNull();
    expect(result.acquisitionChannel).toBe('organic');
    expect(result.acquisitionSource).toBe('search.yahoo.com');
    expect(result.visitorId).toBe('b34d553c-0000-4000-8000-000000000000');
  });

  it('credits the LAST NON-DIRECT touch, skipping a more-recent direct visit', () => {
    const events = [
      { id: 'd', eventName: 'ab_page_view', createdAt: '2026-07-20T17:59:00.000Z',
        acquisitionChannel: 'direct', acquisitionSource: '(direct)', visitorId: 'v1' },
      { id: 'p', eventName: 'ab_page_view', createdAt: '2026-07-20T17:30:00.000Z',
        acquisitionChannel: 'paid', acquisitionSource: 'linkedin', acquisitionMedium: 'paid_social',
        acquisitionCampaign: 'bootcamp', visitorId: 'v1' },
    ];

    const result = deriveBuyerAttribution(events, { anchorMs });
    expect(result.method).toBe('email');
    expect(result.acquisitionChannel).toBe('paid');
    expect(result.acquisitionSource).toBe('linkedin');
    expect(result.acquisitionCampaign).toBe('bootcamp');
  });

  it('falls back to first touch when no event carries a channel (method="email_fallback")', () => {
    const events = [
      { id: 'a', eventName: 'ab_page_view', createdAt: '2026-07-20T17:00:00.000Z',
        acquisitionChannel: null, visitorId: 'v9',
        metadata: JSON.stringify({ firstTouch: { channel: 'referral', source: 'www.isbt.com' } }) },
    ];

    const result = deriveBuyerAttribution(events, { anchorMs });
    expect(result.method).toBe('email_fallback');
    expect(result.acquisitionChannel).toBe('referral');
    expect(result.acquisitionSource).toBe('www.isbt.com');
  });

  it('excludes touches that happen after the purchase', () => {
    const events = [
      { id: 'after', eventName: 'ab_page_view', createdAt: '2026-07-21T10:00:00.000Z',
        acquisitionChannel: 'paid', acquisitionSource: 'google', visitorId: 'v1' },
      { id: 'before', eventName: 'ab_page_view', createdAt: '2026-07-20T10:00:00.000Z',
        acquisitionChannel: 'organic', acquisitionSource: 'search.yahoo.com', visitorId: 'v1' },
    ];

    const result = deriveBuyerAttribution(events, { anchorMs });
    expect(result.acquisitionChannel).toBe('organic');
    expect(result.acquisitionSource).toBe('search.yahoo.com');
  });

  it('returns null when the buyer has no events (webhook keeps method="none")', () => {
    expect(deriveBuyerAttribution([], { anchorMs })).toBeNull();
    expect(deriveBuyerAttribution(null, { anchorMs })).toBeNull();
  });
});

describe('isNonDirectChannel', () => {
  it('treats real channels as non-direct', () => {
    expect(isNonDirectChannel('organic')).toBe(true);
    expect(isNonDirectChannel('paid')).toBe(true);
    expect(isNonDirectChannel('referral')).toBe(true);
    expect(isNonDirectChannel('social')).toBe(true);
  });

  it('treats direct/empty sentinels as direct', () => {
    expect(isNonDirectChannel('direct')).toBe(false);
    expect(isNonDirectChannel('(direct)')).toBe(false);
    expect(isNonDirectChannel('none')).toBe(false);
    expect(isNonDirectChannel('unassigned')).toBe(false);
    expect(isNonDirectChannel(null)).toBe(false);
    expect(isNonDirectChannel('')).toBe(false);
  });
});
