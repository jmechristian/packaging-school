import { handleLogin } from '@auth0/nextjs-auth0';

export default async function signup(req, res) {
  const { returnTo, login_hint } = req.query;

  return handleLogin(req, res, {
    authorizationParams: {
      screen_hint: 'signup',
      login_hint: login_hint || undefined,
    },
    returnTo: returnTo || undefined,
  });
}
