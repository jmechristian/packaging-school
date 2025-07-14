import { handleLogin } from '@auth0/nextjs-auth0';

export default async function linkedinLogin(req, res) {
  const { returnTo } = req.query;

  return handleLogin(req, res, {
    authorizationParams: {
      connection: 'linkedin',
    },
    returnTo: returnTo || undefined,
  });
}
