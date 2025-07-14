import { handleLogin } from '@auth0/nextjs-auth0';

export default async function googleLogin(req, res) {
  const { returnTo } = req.query;

  return handleLogin(req, res, {
    authorizationParams: {
      connection: 'google-oauth2',
    },
    returnTo: returnTo || undefined,
  });
}
