import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';
import { handleSSO } from '../../../helpers/api';
import { runThinkificSSO } from '../../../helpers/sso';

console.log('Auth0 API route initialized'); // Log when the API route is loaded

export default handleAuth({
  authorizationParams: {
    // This will be overridden by query parameters when provided
  },

  async callback(req, res) {
    console.log('Callback endpoint hit');

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
          if (!session?.user) {
            console.log('No user in session');
            return session;
          }

          // Use returnTo if available, otherwise use default
          const redirectUrl = returnTo || 'https://packagingschool.com';
          console.log('Will redirect to:', redirectUrl);

          try {
            console.log('Processing user:', session.user.email);

            const baseUrl =
              process.env.NODE_ENV === 'development'
                ? 'http://localhost:3001'
                : 'https://packagingschool.com';

            const thinkificUser = await fetch(
              `${baseUrl}/api/thinkific/get-user?email=${session.user.email}`
            );
            const data = await thinkificUser.json();

            if (data?.data?.data?.userByEmail) {
              // User exists in Thinkific
              console.log('User found in Thinkific');

              //run sso
              await runThinkificSSO(session.user);
              return session;
            } else {
              console.log('No user found in Thinkific');

              const firstName =
                session.user.given_name ||
                session.user.name?.split(' ')[0] ||
                '';
              const lastName =
                session.user.family_name ||
                session.user.name?.split(' ').slice(1).join(' ') ||
                '';

              if (firstName && lastName) {
                // Create user in Thinkific
                const createUser = await fetch(
                  `${baseUrl}/api/thinkific/create-user`,
                  {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      email: session.user.email,
                      first_name: firstName,
                      last_name: lastName,
                    }),
                  }
                );
                const createUserResult = await createUser.json();

                // User created in Thinkific
                console.log('User created in Thinkific');
              } else {
                console.log(
                  'No first name or last name available, user will be redirected to onboarding'
                );
                // Don't set ssoRedirectUrl, user will go to onboarding
              }
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

console.log('Auth0 API route initialized');
