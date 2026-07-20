import { runThinkificSSO } from './sso';
import { getAbContext, trackAbPurchaseIntent } from '../libs/analytics';
import { isCheckoutIntentUrl } from '../libs/checkoutIntent';

export const handleThinkificLink = async (url, awsUser, returnTo) => {
  // If user is not authenticated, redirect to Thinkific directly
  if (!awsUser || !awsUser.email) {
    window.location.href = url;
    return;
  }

  // Thinkific's order webhook has no way to carry campaign data back to us,
  // so right before we hand off to Thinkific we record a purchase-intent
  // event that pairs the buyer's now-known email with any LinkedIn click id
  // (li_fat_id) captured on landing. The order webhook later matches on this
  // email within a time window to attribute (and, for the LinkedIn boot camp
  // campaign, confirm) the sale. Fire-and-forget: keepalive covers the
  // imminent navigation away from the page.
  //
  // IMPORTANT: only fire intent for genuine checkout/enroll destinations.
  // navigateToThinkific() handles every LMS link (opening owned courses,
  // account/billing nav, etc.); firing on all of them inflated the funnel.
  if (isCheckoutIntentUrl(url)) {
    try {
      const abContext = getAbContext();
      trackAbPurchaseIntent({
        ...abContext,
        email: awsUser.email,
        source: 'pre_thinkific_redirect',
        metadata: {
          email: awsUser.email,
          liFatId: abContext.liFatId,
          courseLink: url,
        },
      });
    } catch (error) {
      console.warn(
        'Failed to record pre-redirect purchase intent:',
        error?.message,
      );
    }
  }

  // Check if user has completed onboarding (you might want to adjust this condition)
  // For now, we'll run SSO for all authenticated users
  try {
    await runThinkificSSO(awsUser, returnTo);
  } catch (error) {
    console.error('SSO failed, redirecting directly:', error);
    window.location.href = url;
  }
};
