// Classifies an outbound LMS / destination URL as a genuine paid checkout
// intent or not. Used to scope the `ab_purchase_intent` ("checkout started")
// analytics event so it only fires on real enrollment/checkout clicks.
//
// Background: navigateToThinkific() is used for ALL authenticated LMS links -
// opening an owned course, account/billing/certificate nav, and actual
// enrollment. Firing intent on every one of those massively inflated the
// "checkout started" funnel stage (e.g. enrolled students opening owned courses
// from /profile). Only enroll/checkout destinations are real intent.
//
// INCLUDE: learn.packagingschool.com/enroll/..., and cart/checkout paths.
// EXCLUDE: /courses/take/... (owned-course access), /account/... (billing,
//          certificates, account mgmt), and free-trial starts (?et=free_trial).

export function isCheckoutIntentUrl(url) {
  if (!url) return false;
  const value = String(url).toLowerCase();

  // Owned-course access by an already-enrolled student - not a checkout.
  if (value.includes('/courses/take/')) return false;

  // Account / billing / certificate management - not a checkout.
  if (value.includes('/account/')) return false;

  // Free-trial starts are not a paid purchase intent.
  if (/[?&]et=free_trial(\b|&|$)/.test(value)) return false;

  // Genuine enrollment / checkout destinations.
  if (value.includes('/enroll/')) return true;
  if (value.includes('/cart') || value.includes('/checkout')) return true;
  if (/[?&]price_id=/.test(value)) return true;

  // Default: do NOT treat a bare LMS link as intent.
  return false;
}
