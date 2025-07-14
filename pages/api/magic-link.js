import { handleLogin } from '@auth0/nextjs-auth0';

export default async function magicLink(req, res) {
  if (req.method !== 'GET') return res.status(405).end('Method Not Allowed');

  const email = req.query.email?.toString();
  const { returnTo } = req.query;

  if (!email) return res.status(400).end('Email is required');

  await handleLogin(req, res, {
    authorizationParams: {
      connection: 'email',
      send: 'link',
      login_hint: email,
    },
    returnTo: returnTo || undefined,
  });
}
