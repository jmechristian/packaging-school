import { handleLogin } from '@auth0/nextjs-auth0';

export default async function facebookLogin(req, res) {
  const { returnTo } = req.query;

  return handleLogin(req, res, {
    authorizationParams: {
      connection: 'facebook',
    },
    returnTo: returnTo || undefined,
  });
}
