import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';
import { handleSSO } from '../../../helpers/api';
import { runThinkificSSO } from '../../../helpers/sso';
import { getAWSUser } from '../../../helpers/api';

console.log('Auth0 API route initialized');

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

    // Always run SSO - remove external URL check
    const isExternalUrl = returnTo && returnTo.startsWith('http');

    try {
      await handleCallback(req, res, {
        // Always redirect to profile first so our callback runs
        returnTo: '/profile',
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

            // Use Auth0 user fields, or fallback to AWS user name
            const nameParts =
              (awsUser && awsUser.name && awsUser.name.trim().split(' ')) ||
              (!isEmail(session.user.name) && session.user.name?.split(' ')) ||
              [];

            const firstName = session.user.given_name || nameParts[0] || '';
            const lastName =
              session.user.family_name || nameParts.slice(1).join(' ') || '';

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

            // Always generate SSO URL for password logins
            console.log('Generating SSO URL for password login');
            // Use the final destination directly instead of intermediate after-sso page
            // Always provide a returnTo to avoid timeout issues
            const finalDestination = returnTo || `${baseUrl}/profile`;

            try {
              const ssoUrl = await handleSSO({
                email: session.user.email,
                first_name: firstName,
                last_name: lastName,
                returnTo: finalDestination,
                baseUrl,
              });
              console.log('SSO redirect URL generated:', ssoUrl);
              session.user.ssoRedirectUrl = ssoUrl;
            } catch (ssoError) {
              console.warn(
                'SSO failed, using fallback redirect:',
                ssoError.message
              );
              // Fallback: redirect directly to final destination without SSO
              session.user.ssoRedirectUrl = finalDestination;
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
