import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';
import { handleSSO, getAWSUser, createAWSUser } from '../../../helpers/api';

console.log('Auth0 API route initialized'); // Log when the API route is loaded

export default handleAuth({
  async callback(req, res) {
    console.log('Callback endpoint hit'); // Log when callback is triggered
    try {
      await handleCallback(req, res, {
        afterCallback: async (req, res, session) => {
          if (!session?.user) {
            console.log('No user in session');
            return session;
          }

          // console.log('session', session);

          // try {
          //   console.log('Processing user:');

          //   const thinkificUser = await fetch(
          //     `http://localhost:3000/api/thinkific/get-user?email=${session.user.email}`
          //   );
          //   const data = await thinkificUser.json();

          //   if (data?.data?.data?.userByEmail) {
          //     console.log('thinkificUser', data.data.data.userByEmail);
          //     // Handle potentially missing name fields
          //     const firstName =
          //       session.user.given_name ||
          //       session.user.name?.split(' ')[0] ||
          //       '';
          //     const lastName =
          //       session.user.family_name ||
          //       session.user.name?.split(' ').slice(1).join(' ') ||
          //       '';

          //     const redirectUrl = await handleSSO({
          //       email: session.user.email,
          //       first_name: firstName,
          //       last_name: lastName,
          //       returnTo: 'http://localhost:3000',
          //     });

          //     console.log('SSO redirect URL generated:', redirectUrl);
          //     // Store the redirect URL in the user object
          //     session.user.ssoRedirectUrl = redirectUrl;
          //   } else {
          //     console.log('No user found in Thinkific');

          //     const firstName =
          //       session.user.given_name ||
          //       session.user.name?.split(' ')[0] ||
          //       '';
          //     const lastName =
          //       session.user.family_name ||
          //       session.user.name?.split(' ').slice(1).join(' ') ||
          //       '';

          //     // create user in thinkific
          //     const createUser = await fetch(
          //       `http://localhost:3000/api/thinkific/create-user?email=${session.user.email}&first_name=${firstName}&last_name=${lastName}`,
          //       {
          //         method: 'POST',
          //       }
          //     );
          //     const createUserResponse = await createUser.json();
          //     console.log('Create user response:', createUserResponse);

          //     // redirect to thinkific
          //     const redirectUrl = await handleSSO({
          //       email: session.user.email,
          //       first_name: firstName,
          //       last_name: lastName,
          //       returnTo:
          //         'https://packaging-school-git-dev-packaging-school.vercel.app/profile',
          //     });
          //     session.user.ssoRedirectUrl = redirectUrl;
          //   }

          //   return session;
          // } catch (ssoError) {
          //   console.error('SSO handling error:', ssoError);
          //   // Still return session even if SSO fails
          //   return session;
          // }

          return session;
        },
      });
    } catch (error) {
      console.error('Callback error:', error);
      throw error;
    }
  },
});

console.log('Auth0 API route initialized');
