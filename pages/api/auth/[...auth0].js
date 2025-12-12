import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';
import { handleSSO } from '../../../helpers/api';
import { getAWSUser } from '../../../helpers/api';

console.log('Auth0 API route initialized');

export default handleAuth({
  authorizationParams: {
    // This will be overridden by query parameters when provided
  },

  async callback(req, res) {
    console.log('Auth0 callback endpoint hit');

    // Decode the state parameter to get returnTo, firstName, and lastName
    let returnTo = null;
    let firstNameFromState = null;
    let lastNameFromState = null;
    if (req.query.state) {
      try {
        const decodedState = JSON.parse(
          Buffer.from(req.query.state, 'base64').toString()
        );
        returnTo = decodedState.returnTo;
        firstNameFromState = decodedState.firstName;
        lastNameFromState = decodedState.lastName;
        console.log('Decoded state:', decodedState);
        console.log('returnTo from state:', returnTo);
        console.log('firstName from state:', firstNameFromState);
        console.log('lastName from state:', lastNameFromState);
      } catch (error) {
        console.error('Error decoding state:', error);
      }
    }

    // Also check for returnTo in query params (for external URLs)
    if (!returnTo && req.query.returnTo) {
      returnTo = req.query.returnTo;
      console.log('returnTo from query params:', returnTo);
    }

    // Also check for state data in returnTo URL (from magic-link flow)
    if (returnTo && returnTo.includes('__state=')) {
      try {
        const url = new URL(returnTo, 'http://localhost'); // Base URL for parsing
        const stateParam = url.searchParams.get('__state');
        if (stateParam) {
          const decodedState = JSON.parse(
            Buffer.from(decodeURIComponent(stateParam), 'base64').toString()
          );
          if (decodedState.returnTo) returnTo = decodedState.returnTo;
          if (decodedState.firstName && !firstNameFromState)
            firstNameFromState = decodedState.firstName;
          if (decodedState.lastName && !lastNameFromState)
            lastNameFromState = decodedState.lastName;
          console.log('Extracted state from returnTo URL');
        }
      } catch (error) {
        console.error('Error extracting state from returnTo:', error);
      }
    }

    // Check if returnTo is external (needs SSO redirect)
    const isExternalUrl =
      returnTo &&
      (returnTo.startsWith('http') ||
        returnTo.includes('learn.packagingschool.com'));

    // If we have an external returnTo, redirect to external-redirect handler
    // which will handle SSO and redirect to the external URL
    // For internal URLs, redirect to profile so afterCallback can run
    const callbackReturnTo = isExternalUrl
      ? `/api/auth/external-redirect?returnTo=${encodeURIComponent(returnTo)}`
      : returnTo || '/profile';

    try {
      await handleCallback(req, res, {
        // Redirect to external-redirect handler for external URLs, returnTo or profile for internal
        returnTo: callbackReturnTo,
        afterCallback: async (req, res, session) => {
          console.log('afterCallback called for', session?.user?.email);

          if (!session?.user) {
            console.log('No user in session');
            return session;
          }

          // Dynamically determine the base URL
          let baseUrl;
          if (process.env.NODE_ENV === 'development') {
            baseUrl = 'http://localhost:3001';
          } else {
            const protocol = req.headers['x-forwarded-proto'] || 'http';
            const host = req.headers.host;
            baseUrl = `${protocol}://${host}`;
          }

          try {
            console.log('Processing user for SSO:', session.user.email);

            // Fetch AWS user by email for fallback name
            let awsUser = null;
            try {
              awsUser = await getAWSUser(session.user.email);
              console.log('AWS user:', awsUser);
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

            // Only run SSO if both first and last name are present
            if (!firstName || !lastName) {
              console.warn('Skipping SSO: missing first or last name', {
                firstName,
                lastName,
                email: session.user.email,
              });
              return session;
            }

            // Ensure Thinkific user exists (create if needed)
            const thinkificUser = await fetch(
              `${baseUrl}/api/thinkific/get-user?email=${session.user.email}`
            );
            const data = await thinkificUser.json();

            if (!data?.data?.data?.userByEmail && firstName && lastName) {
              await fetch(`${baseUrl}/api/thinkific/create-user`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  email: session.user.email,
                  first_name: firstName,
                  last_name: lastName,
                }),
              });
              console.log('User created in Thinkific');
            }

            // Only generate SSO URL if returnTo is external (needs Thinkific SSO)
            // For internal URLs, skip SSO generation to avoid expired token issues
            const finalDestination = returnTo || `${baseUrl}/profile`;
            const needsSSO =
              finalDestination.startsWith('http') ||
              finalDestination.includes('learn.packagingschool.com');

            // Store returnTo in cookie for expired token recovery (both internal and external)
            if (finalDestination) {
              res.setHeader(
                'Set-Cookie',
                `pendingReturnTo=${encodeURIComponent(
                  finalDestination
                )}; Path=/; Max-Age=900; SameSite=Lax`
              );
            }

            if (needsSSO) {
              console.log('Generating SSO URL for external destination');
              try {
                const ssoUrl = await handleSSO({
                  email: session.user.email,
                  first_name: firstName,
                  last_name: lastName,
                  returnTo: finalDestination,
                  baseUrl,
                });
                console.log('SSO redirect URL generated:', ssoUrl);

                // Attach SSO URL to session for Layout component or external-redirect handler
                session.user.ssoRedirectUrl = ssoUrl;
              } catch (ssoError) {
                console.warn(
                  'SSO failed, using fallback redirect:',
                  ssoError.message
                );
                session.user.ssoRedirectUrl = finalDestination;
              }
            } else {
              console.log('Internal URL detected, skipping SSO generation');
              // For internal URLs, don't set ssoRedirectUrl - let them go directly to the page
            }

            return session;
          } catch (ssoError) {
            console.error('SSO handling error:', ssoError);
            // Still return session even if SSO fails
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
