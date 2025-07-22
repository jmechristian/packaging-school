import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';
import { handleSSO } from '../../../helpers/api';
import { runThinkificSSO } from '../../../helpers/sso';
import { getAWSUser } from '../../../helpers/api';

console.log('Auth0 API route initialized'); // Log when the API route is loaded

export default handleAuth({
  authorizationParams: {
    // This will be overridden by query parameters when provided
  },

  async callback(req, res) {
    console.log('Auth0 callback endpoint hit');

    // Decode the state parameter to get returnTo
    let returnTo = null;
    if (req.query.state) {
      try {
        const decodedState = JSON.parse(
          Buffer.from(req.query.state, 'base64').toString()
        );
        returnTo = decodedState.returnTo;
        console.log('Decoded state:', decodedState);
        console.log('returnTo from state:', returnTo);
      } catch (error) {
        console.error('Error decoding state:', error);
      }
    }

    // Also check for returnTo in query params (for external URLs)
    if (!returnTo && req.query.returnTo) {
      returnTo = req.query.returnTo;
      console.log('returnTo from query params:', returnTo);
    }

    // Log when callback is triggered
    try {
      await handleCallback(req, res, {
        returnTo: returnTo, // Pass returnTo directly to handleCallback
        afterCallback: async (req, res, session) => {
          console.log('afterCallback called, session:', session);
          if (!session?.user) {
            console.log('No user in session');
            return session;
          }

          // Use returnTo if available, otherwise use default
          const finalReturnTo = returnTo || '/';
          const baseUrl =
            process.env.NODE_ENV === 'development'
              ? 'http://localhost:3001'
              : 'https://packaging-school-git-dev-packaging-school.vercel.app';
          const afterSSOUrl = `${baseUrl}/after-sso?returnTo=${encodeURIComponent(
            finalReturnTo
          )}`;

          try {
            console.log('Processing user for SSO:', session.user.email);

            // Fetch AWS user by email for fallback name
            let awsUser = null;
            try {
              awsUser = await getAWSUser(session.user.email);
            } catch (err) {
              console.warn('Could not fetch AWS user for SSO fallback:', err);
            }

            // Use Auth0 user fields, or fallback to AWS user name
            const firstName =
              session.user.given_name ||
              (awsUser && awsUser.name && awsUser.name.split(' ')[0]) ||
              session.user.name?.split(' ')[0] ||
              '';
            const lastName =
              session.user.family_name ||
              (awsUser &&
                awsUser.name &&
                awsUser.name.split(' ').slice(1).join(' ')) ||
              session.user.name?.split(' ').slice(1).join(' ') ||
              '';

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

            // Always set SSO redirect URL on the user object
            console.log('Calling handleSSO for user:', session.user.email);
            const ssoUrl = await handleSSO({
              email: session.user.email,
              first_name: firstName,
              last_name: lastName,
              returnTo: afterSSOUrl,
              baseUrl,
            });
            console.log('SSO redirect URL generated:', ssoUrl);
            session.user.ssoRedirectUrl = ssoUrl;
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

console.log('Auth0 API route initialized');
