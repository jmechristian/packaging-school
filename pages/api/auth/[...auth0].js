import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';
import { getAWSUser } from '../../../helpers/api';
import { toAuth0CallbackReturnTo } from '../../../libs/auth0ExternalReturnTo';

export default handleAuth({
  authorizationParams: {
    // This will be overridden by query parameters when provided
  },

  async callback(req, res) {
    // Decode the state parameter to get returnTo, firstName, and lastName
    let returnTo = null;
    let firstNameFromState = null;
    let lastNameFromState = null;
    if (req.query.state) {
      try {
        const decodedState = JSON.parse(
          Buffer.from(req.query.state, 'base64').toString(),
        );
        returnTo = decodedState.returnTo;
        firstNameFromState = decodedState.firstName;
        lastNameFromState = decodedState.lastName;
      } catch (error) {
        console.error('Error decoding state:', error);
      }
    }

    // Also check for returnTo in query params (for external URLs)
    if (!returnTo && req.query.returnTo) {
      returnTo = req.query.returnTo;
    }

    // Also check for state data in returnTo URL (from magic-link flow)
    if (returnTo && returnTo.includes('__state=')) {
      try {
        const url = new URL(returnTo, 'http://localhost'); // Base URL for parsing
        const stateParam = url.searchParams.get('__state');
        if (stateParam) {
          const decodedState = JSON.parse(
            Buffer.from(decodeURIComponent(stateParam), 'base64').toString(),
          );
          if (decodedState.returnTo) returnTo = decodedState.returnTo;
          if (decodedState.firstName && !firstNameFromState)
            firstNameFromState = decodedState.firstName;
          if (decodedState.lastName && !lastNameFromState)
            lastNameFromState = decodedState.lastName;
        }
      } catch (error) {
        console.error('Error extracting state from returnTo:', error);
      }
    }

    // Check if returnTo is external (needs SSO redirect)
    const callbackReturnTo = toAuth0CallbackReturnTo(returnTo);

    try {
      await handleCallback(req, res, {
        // Redirect to external-redirect handler for external URLs, returnTo or profile for internal
        returnTo: callbackReturnTo,
        afterCallback: async (req, res, session) => {
          if (!session?.user) {
            return session;
          }

          try {
            // Goal: keep callback simple and deterministic.
            // We do NOT auto-run Thinkific SSO here anymore.
            // Auth0 returnTo is an internal path (menu: current page, order:
            // /order/{id}). Thinkific SSO runs after that page loads.

            const protocol =
              req.headers['x-forwarded-proto'] ||
              (process.env.NODE_ENV === 'development' ? 'http' : 'https');
            const baseUrl = `${protocol}://${req.headers.host}`;

            // Fetch AWS user by email for fallback name
            let awsUser = null;
            try {
              awsUser = await getAWSUser(session.user.email);
            } catch (err) {
              console.warn('Could not fetch AWS user for SSO fallback:', err);
            }

            // Helper to check if a string is an email
            function isEmail(str) {
              return str && str.includes('@');
            }

            // Use Auth0 user fields, or fallback to state/AWS user name
            const nameParts =
              (awsUser && awsUser.name && awsUser.name.trim().split(' ')) ||
              (!isEmail(session.user.name) && session.user.name?.split(' ')) ||
              [];

            // Priority: state > Auth0 session > AWS user > empty
            const firstName =
              firstNameFromState ||
              session.user.given_name ||
              nameParts[0] ||
              '';
            const lastName =
              lastNameFromState ||
              session.user.family_name ||
              nameParts.slice(1).join(' ') ||
              '';

            // If we have names from state but not in Auth0 session, store them in session
            // so external-redirect handler can use them
            if (firstNameFromState && !session.user.given_name) {
              session.user.given_name = firstNameFromState;
            }
            if (lastNameFromState && !session.user.family_name) {
              session.user.family_name = lastNameFromState;
            }

            // Ensure Thinkific user exists (create if needed).
            // NOTE: This is NOT SSO. It's just provisioning so later dashboard/purchase flows work.
            // We do it at most once per session.
            if (!session.user.thinkificEnsured) {
              session.user.thinkificEnsured = true;

              if (firstName && lastName) {
                try {
                  const thinkificUserRes = await fetch(
                    `${baseUrl}/api/thinkific/get-user?email=${encodeURIComponent(
                      session.user.email,
                    )}`,
                  );
                  const thinkificData = await thinkificUserRes.json();

                  if (!thinkificData?.data?.data?.userByEmail) {
                    await fetch(`${baseUrl}/api/thinkific/create-user`, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        email: session.user.email,
                        first_name: firstName,
                        last_name: lastName,
                      }),
                    });
                  } else {
                    console.log('Thinkific user already exists');
                  }
                } catch (err) {
                  console.warn('Thinkific ensure failed (non-fatal):', err);
                }
              } else {
                console.log(
                  'Skipping Thinkific ensure: missing first/last name',
                  { firstName, lastName },
                );
              }
            }

            return session;
          } catch (ssoError) {
            console.error('afterCallback error:', ssoError);
            return session;
          }
        },
      });
    } catch (error) {
      console.error('Callback error:', error);
      throw error;
    }
  },
});
