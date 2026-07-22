import {
  classifyAcquisitionChannel,
  classifyReferrerHost,
} from './acquisitionChannel';

// Guard for the acquisition-channel classifier. Run with any Jest-compatible
// runner. Mirrors the production bug where www.isbt.com (a professional
// association referral) was mislabeled "social" via a loose "t.co" substring.

describe('classifyAcquisitionChannel', () => {
  it('maps a professional/association referrer to referral (not social)', () => {
    expect(
      classifyAcquisitionChannel({
        medium: 'referral',
        source: 'www.isbt.com',
        referrerHost: 'www.isbt.com',
      }),
    ).toBe('referral');
  });

  it('maps real social networks to social', () => {
    for (const host of [
      'www.facebook.com',
      'l.facebook.com',
      'www.instagram.com',
      'lnkd.in',
      'www.linkedin.com',
      't.co',
      'x.com',
      'www.youtube.com',
      'www.reddit.com',
    ]) {
      expect(
        classifyAcquisitionChannel({ medium: 'referral', source: host, referrerHost: host }),
      ).toBe('social');
    }
  });

  it('maps search-engine referrers to organic', () => {
    for (const host of ['www.google.com', 'google.com', 'www.bing.com', 'duckduckgo.com', 'search.yahoo.com']) {
      expect(
        classifyAcquisitionChannel({ medium: 'referral', source: host, referrerHost: host }),
      ).toBe('organic');
    }
  });

  it('does not let a non-social host containing a social substring become social', () => {
    // "isbt.com" contains "t.co"; "exceltraining.com" contains "x" - both referral.
    expect(classifyAcquisitionChannel({ referrerHost: 'www.isbt.com' })).toBe('referral');
    expect(classifyAcquisitionChannel({ referrerHost: 'exceltraining.com' })).toBe('referral');
  });

  it('respects explicit paid / email / social tokens', () => {
    expect(classifyAcquisitionChannel({ hasClickId: true })).toBe('paid');
    expect(classifyAcquisitionChannel({ medium: 'cpc' })).toBe('paid');
    expect(classifyAcquisitionChannel({ medium: 'email' })).toBe('email');
    expect(classifyAcquisitionChannel({ medium: 'social', source: 'linkedin' })).toBe('social');
    expect(classifyAcquisitionChannel({ source: 'linkedin' })).toBe('social');
  });

  it('treats our own domain / no referrer as direct', () => {
    expect(classifyAcquisitionChannel({ referrerHost: 'www.packagingschool.com' })).toBe('direct');
    expect(classifyAcquisitionChannel({})).toBe('direct');
  });
});

describe('classifyReferrerHost', () => {
  it('classifies hosts consistently', () => {
    expect(classifyReferrerHost('www.isbt.com')).toBe('referral');
    expect(classifyReferrerHost('www.facebook.com')).toBe('social');
    expect(classifyReferrerHost('www.google.com')).toBe('organic');
    expect(classifyReferrerHost('www.packagingschool.com')).toBe(null);
  });
});
