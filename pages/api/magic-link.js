import { handleLogin } from '@auth0/nextjs-auth0';

export default async function magicLink(req, res) {
  if (req.method !== 'GET') return res.status(405).end('Method Not Allowed');

  const email = req.query.email?.toString();
  const { returnTo, firstName, lastName } = req.query;

  if (!email) return res.status(400).end('Email is required');

  // Build state object with returnTo, firstName, and lastName
  // This will be encoded and passed through the OAuth state parameter
  const stateObj = {};
  if (returnTo) stateObj.returnTo = returnTo;
  if (firstName) stateObj.firstName = firstName;
  if (lastName) stateObj.lastName = lastName;

  // Encode state as base64 JSON - this will be decoded in the callback
  const encodedState = Buffer.from(JSON.stringify(stateObj)).toString('base64');

  await handleLogin(req, res, {
    authorizationParams: {
      connection: 'email',
      send: 'link',
      login_hint: email,
    },
    // Pass the encoded state through returnTo - the callback will extract it
    // We'll use a special returnTo that includes our state data
    returnTo: returnTo
      ? `${returnTo}?__state=${encodeURIComponent(encodedState)}`
      : `/?__state=${encodeURIComponent(encodedState)}`,
  });
}
