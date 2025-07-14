import { handleLogin } from '@auth0/nextjs-auth0';

export default async function appleLogin(req, res) {
  const { returnTo } = req.query;

  return handleLogin(req, res, {
    authorizationParams: {
      connection: 'apple',
    },
    returnTo: returnTo || undefined,
  });
}
