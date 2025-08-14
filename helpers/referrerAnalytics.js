// Utility functions for analyzing referrer patterns

export const categorizeReferrer = (referrer) => {
  if (!referrer) return 'direct';

  const url = new URL(referrer);
  const hostname = url.hostname.toLowerCase();

  // Social media
  if (hostname.includes('facebook.com')) return 'social_facebook';
  if (hostname.includes('linkedin.com')) return 'social_linkedin';
  if (hostname.includes('twitter.com') || hostname.includes('x.com'))
    return 'social_twitter';
  if (hostname.includes('instagram.com')) return 'social_instagram';
  if (hostname.includes('youtube.com')) return 'social_youtube';

  // Search engines
  if (hostname.includes('google.com')) return 'search_google';
  if (hostname.includes('bing.com')) return 'search_bing';
  if (hostname.includes('yahoo.com')) return 'search_yahoo';
  if (hostname.includes('duckduckgo.com')) return 'search_duckduckgo';

  // Email
  if (hostname.includes('mail.google.com') || hostname.includes('gmail.com'))
    return 'email_gmail';
  if (hostname.includes('outlook.com') || hostname.includes('hotmail.com'))
    return 'email_outlook';
  if (hostname.includes('yahoo.com') && url.pathname.includes('mail'))
    return 'email_yahoo';

  // Internal traffic
  if (hostname.includes('packagingschool.com')) return 'internal';
  if (hostname.includes('learn.packagingschool.com')) return 'internal_learn';
  if (hostname.includes('localhost') || hostname.includes('127.0.0.1'))
    return 'internal_dev';

  // External domains
  return 'external';
};

export const extractReferrerData = (referrerInfo) => {
  const category = categorizeReferrer(referrerInfo.referrer);

  return {
    category,
    referrer: referrerInfo.referrer,
    returnTo: referrerInfo.returnTo,
    timestamp: referrerInfo.timestamp,
    isExternalCourse:
      referrerInfo.returnTo?.includes('learn.packagingschool.com') || false,
    isPurchaseFlow: referrerInfo.returnTo?.includes('coupon=') || false,
    userAgent: referrerInfo.userAgent,
  };
};

export const logReferrerAnalytics = (referrerInfo) => {
  const data = extractReferrerData(referrerInfo);

  console.log('📊 Referrer Analytics:', {
    category: data.category,
    isExternalCourse: data.isExternalCourse,
    isPurchaseFlow: data.isPurchaseFlow,
    referrer: data.referrer,
    returnTo: data.returnTo,
  });

  // Send to analytics service
  if (typeof gtag !== 'undefined') {
    gtag('event', 'referrer_tracking', {
      referrer_category: data.category,
      is_external_course: data.isExternalCourse,
      is_purchase_flow: data.isPurchaseFlow,
      referrer: data.referrer,
      return_to: data.returnTo,
    });
  }

  return data;
};
