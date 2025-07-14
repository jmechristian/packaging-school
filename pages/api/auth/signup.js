import { handleLogin } from '@auth0/nextjs-auth0';

export default async function signup(req, res) {
  const { returnTo } = req.query;

  return handleLogin(req, res, {
    authorizationParams: {
      screen_hint: 'signup',
    },
    returnTo: returnTo || undefined,
  });
}
