import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';
import { handleSSO } from '../../../helpers/api';

console.log('Auth0 API route initialized'); // Log when the API route is loaded

export default handleAuth({
  async callback(req, res) {
    try {
      await handleCallback(req, res, {
        afterCallback: async (req, res, session) => {
          // Log the user information after successful authentication
          if (session?.user) {
            console.log('User session:', session.user);
            // const redirectUrl = await handleSSO({
            //   email: session.user.email,
            //   first_name: session.user.given_name,
            //   last_name: session.user.family_name,
            // });
            // // Perform the redirect from the server side
            // res.redirect(redirectUrl);
          }
          return session;
        },
      });
    } catch (error) {
      console.error('Callback error:', error);
      throw error;
    }
  },
});
