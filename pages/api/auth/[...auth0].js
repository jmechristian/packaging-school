import {
  handleAuth,
  handleCallback,
  handleLogin,
  handleLogout,
} from '@auth0/nextjs-auth0';

export default handleAuth({
  async login(req, res) {
    try {
      await handleLogin(req, res, {
        returnTo: '/dashboard', // Custom redirect after login
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Login failed' });
    }
  },

  async logout(req, res) {
    try {
      await handleLogout(req, res, {
        returnTo: '/', // Custom redirect after logout
      });
    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({ error: 'Logout failed' });
    }
  },

  async callback(req, res) {
    try {
      console.log('Starting callback handler');
      await handleCallback(req, res, {
        afterCallback: async (req, res, session) => {
          console.log('Auth0 callback successful, user session:', session.user);

          const { email, given_name, family_name } = session.user;
          console.log('Attempting SSO JWT generation for:', email);

          // Get base URL from environment or construct it
          const baseUrl =
            process.env.NEXT_PUBLIC_API_URL ||
            `${
              process.env.VERCEL_URL
                ? `https://${process.env.VERCEL_URL}`
                : 'http://localhost:3000'
            }`;

          // Generate JWT and SSO URL
          const ssoResponse = await fetch(`${baseUrl}/api/generateJWT`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: email,
              first_name: given_name,
              last_name: family_name,
              return_to:
                'https://packaging-school-git-dev-packaging-school.vercel.app',
            }),
          });

          const ssoData = await ssoResponse.json();
          console.log('SSO response:', ssoData);
          console.log('SSO response status:', ssoResponse.status);
          console.log('SSO full response:', ssoResponse);

          if (ssoResponse.ok) {
            console.log('SSO URL generated successfully:', ssoData.url);
            console.log('Redirecting to:', ssoData.url);
            return { ...session, redirectTo: ssoData.url };
          } else {
            console.error('SSO generation failed:', ssoData.error);
            return session;
          }
        },
      });
    } catch (error) {
      console.error('Authentication callback error:', error);
      res.status(500).json({ error: 'Authentication callback failed' });
    }
  },
});
