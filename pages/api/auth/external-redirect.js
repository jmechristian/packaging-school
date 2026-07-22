import { getSession } from '@auth0/nextjs-auth0';
import { handleSSO } from '../../../helpers/api';
import { parseCookieHeader, AB_SESSION_COOKIE, HOME_EXPERIMENT_KEY } from '../../../libs/abVariant';
import { AB_ATTRIBUTION_COOKIE } from '../../../libs/analytics';
import { isCheckoutIntentUrl } from '../../../libs/checkoutIntent';

// Thinkific's order webhook can't carry campaign data back to us, so right
// before handing off to Thinkific SSO we record a purchase-intent event that
// pairs the buyer's now-known email with any LinkedIn click id (li_fat_id)
// captured on landing. The order webhook later matches on this email within
// a time window to attribute (and, for gated campaigns, confirm) the sale.
async function recordPreThinkificIntent({ req, baseUrl, email, courseLink }) {
  // This endpoint is a generic SSO handoff used for ALL authenticated LMS
  // redirects (opening owned courses, expired-token retries, etc.) - a checkout
  // can never START here. Only record intent when the destination is an actual
  // enrollment/checkout URL, matching the client-side tracker's classification.
  if (!isCheckoutIntentUrl(courseLink)) return;

  try {
    const cookies = parseCookieHeader(req.headers.cookie || '');
    let attribution = null;
    if (cookies[AB_ATTRIBUTION_COOKIE]) {
      try {
        attribution = JSON.parse(cookies[AB_ATTRIBUTION_COOKIE]);
      } catch {
        attribution = null;
      }
    }

    await fetch(`${baseUrl}/api/analytics/ab-event`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventName: 'ab_purchase_intent',
        experimentKey: HOME_EXPERIMENT_KEY,
        sessionId: attribution?.sessionId || cookies[AB_SESSION_COOKIE] || null,
        email,
        pagePath: '/api/auth/external-redirect',
        acquisitionChannel: attribution?.channel || null,
        acquisitionSource: attribution?.source || null,
        acquisitionMedium: attribution?.medium || null,
        acquisitionCampaign: attribution?.campaign || null,
        acquisitionTerm: attribution?.term || null,
        acquisitionContent: attribution?.content || null,
        referrer: attribution?.referrer || null,
        source: 'external_redirect_pre_sso',
        metadata: {
          email,
          liFatId: attribution?.liFatId || null,
          courseLink,
        },
      }),
    });
  } catch (error) {
    console.warn('Failed to record pre-SSO purchase intent:', error?.message);
  }
}

export default async function externalRedirectHandler(req, res) {
  try {
    const session = await getSession(req, res);

    if (!session?.user) {
      return res.redirect('/login');
    }

    // If returnTo is internal (relative path), do NOT run Thinkific SSO.
    // This keeps internal links (like /schwarzpartners) from ever bouncing to the LMS.
    const requestedReturnTo = req.query.returnTo?.toString();
    if (requestedReturnTo && requestedReturnTo.startsWith('/')) {
      return res.redirect(requestedReturnTo);
    }

    // Dynamically determine the base URL based on the request
    let baseUrl;
    if (process.env.NODE_ENV === 'development') {
      baseUrl = 'http://localhost:3001';
    } else {
      // Get the protocol and host from the request
      const protocol =
        req.headers['x-forwarded-proto'] ||
        req.headers['x-forwarded-ssl'] === 'on'
          ? 'https'
          : 'http';
      const host = req.headers.host;
      baseUrl = `${protocol}://${host}`;
    }

    // Check if user exists in Thinkific
    const thinkificUser = await fetch(
      `${baseUrl}/api/thinkific/get-user?email=${session.user.email}`
    );
    const data = await thinkificUser.json();

    if (data?.data?.data?.userByEmail) {
      // User exists in Thinkific, handle SSO
      const firstName =
        session.user.given_name ||
        session.user.name?.split(' ')[0] ||
        data?.data?.data?.userByEmail?.firstName ||
        '';
      const lastName =
        session.user.family_name ||
        session.user.name?.split(' ').slice(1).join(' ') ||
        data?.data?.data?.userByEmail?.lastName ||
        '';

      console.log('User data for SSO:', {
        email: session.user.email,
        firstName,
        lastName,
        name: session.user.name,
      });

      // Get the actual returnTo URL from query parameter
      const actualReturnTo =
        req.query.returnTo || 'https://learn.packagingschool.com';

      // If someone calls this endpoint with a non-Thinkific external URL,
      // just send them there (no SSO).
      const isThinkificDestination =
        typeof actualReturnTo === 'string' &&
        actualReturnTo.includes('learn.packagingschool.com');
      if (!isThinkificDestination) {
        return res.redirect(actualReturnTo);
      }

      // Store the returnTo in a cookie or pass it through so we can recover it if token expires
      // The returnTo will be included in the SSO URL's return_to parameter, but we'll also
      // store it in case Thinkific redirects back with an error
      res.setHeader(
        'Set-Cookie',
        `pendingReturnTo=${encodeURIComponent(
          actualReturnTo
        )}; Path=/; Max-Age=900; SameSite=Lax`
      );

      await recordPreThinkificIntent({
        req,
        baseUrl,
        email: session.user.email,
        courseLink: actualReturnTo,
      });

      const redirectUrl = await handleSSO({
        email: session.user.email,
        first_name: firstName,
        last_name: lastName,
        returnTo: actualReturnTo,
        baseUrl,
      });
      console.log('SSO redirect URL generated:', redirectUrl);
      return res.redirect(redirectUrl);
    } else {
      console.log('No user found in Thinkific, creating user...');

      const firstName =
        session.user.given_name || session.user.name?.split(' ')[0] || '';
      const lastName =
        session.user.family_name ||
        session.user.name?.split(' ').slice(1).join(' ') ||
        '';

      if (firstName && lastName) {
        // Create user in Thinkific
        const createUser = await fetch(`${baseUrl}/api/thinkific/create-user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: session.user.email,
            first_name: firstName,
            last_name: lastName,
          }),
        });
        const createUserResult = await createUser.json();
        console.log('User created in Thinkific:', createUserResult);

        // Handle SSO after user creation
        const actualReturnTo =
          req.query.returnTo || 'https://learn.packagingschool.com';

        const isThinkificDestination =
          typeof actualReturnTo === 'string' &&
          actualReturnTo.includes('learn.packagingschool.com');
        if (!isThinkificDestination) {
          return res.redirect(actualReturnTo);
        }

        // Store the returnTo in a cookie so we can recover it if token expires
        res.setHeader(
          'Set-Cookie',
          `pendingReturnTo=${encodeURIComponent(
            actualReturnTo
          )}; Path=/; Max-Age=900; SameSite=Lax`
        );

        await recordPreThinkificIntent({
          req,
          baseUrl,
          email: session.user.email,
          courseLink: actualReturnTo,
        });

        const redirectUrl = await handleSSO({
          email: session.user.email,
          first_name: firstName,
          last_name: lastName,
          returnTo: actualReturnTo,
          baseUrl,
        });
        console.log(
          'SSO redirect URL generated after user creation:',
          redirectUrl
        );
        return res.redirect(redirectUrl);
      } else {
        console.log(
          'No first name or last name available, redirecting to profile'
        );
        return res.redirect('/profile?tab=courses');
      }
    }
  } catch (error) {
    console.error('External redirect error:', error);
    return res.redirect('/profile?tab=courses');
  }
}
