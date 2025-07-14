import { handleLogin } from '@auth0/nextjs-auth0';

export default async function passwordLogin(req, res) {
  const { email, returnTo } = req.query;

  return handleLogin(req, res, {
    authorizationParams: {
      connection: 'Username-Password-Authentication',
      login_hint: email || undefined,
    },
    returnTo: returnTo || undefined,
  });
}
