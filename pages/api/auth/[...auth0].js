import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';
import { handleSSO } from '../../../helpers/api';

console.log('Auth0 API route initialized'); // Log when the API route is loaded

export default handleAuth({
  async callback(req, res) {
    console.log('Callback endpoint hit'); // Log when callback is triggered
    try {
      await handleCallback(req, res, {
        afterCallback: async (req, res, session) => {
          console.log('afterCallback triggered'); // Log when afterCallback starts

          if (!session?.user) {
            console.log('No user in session');
            return session;
          }

          try {
            console.log('Processing user:', {
              email: session.user.email,
              given_name: session.user.given_name,
              family_name: session.user.family_name,
            });

            // Handle potentially missing name fields
            const firstName =
              session.user.given_name || session.user.name?.split(' ')[0] || '';
            const lastName =
              session.user.family_name ||
              session.user.name?.split(' ').slice(1).join(' ') ||
              '';

            const redirectUrl = await handleSSO({
              email: session.user.email,
              first_name: firstName,
              last_name: lastName,
              returnTo:
                'https://packaging-school-git-dev-packaging-school.vercel.app',
            });

            console.log('SSO redirect URL generated:', redirectUrl);
            // Store the redirect URL in the user object
            session.user.ssoRedirectUrl = redirectUrl;
            console.log('Updated session:', session);
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
