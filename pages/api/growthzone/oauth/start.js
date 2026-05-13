function trimSlash(value) {
  if (!value) return '';
  return String(value).replace(/\/+$/, '');
}

function buildCookie(name, value, maxAgeSeconds) {
  return `${name}=${encodeURIComponent(value)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAgeSeconds}`;
}

function inferCallbackUrl(req) {
  const proto = req.headers['x-forwarded-proto'] || 'http';
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  return `${proto}://${host}/api/growthzone/oauth/callback`;
}

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const baseUrl = trimSlash(process.env.GROWTHZONE_BASE_URL);
  const clientId = process.env.GROWTHZONE_CLIENT_ID;
  const callbackUrl = process.env.GROWTHZONE_OAUTH_CALLBACK_URL || inferCallbackUrl(req);

  if (!baseUrl || !clientId) {
    return res.status(500).json({
      message: 'Missing OAuth environment variables',
      required: ['GROWTHZONE_BASE_URL', 'GROWTHZONE_CLIENT_ID'],
      optional: ['GROWTHZONE_OAUTH_CALLBACK_URL'],
    });
  }

  const returnTo = req.query.returnTo?.toString() || '/sandbox/growthzone';
  const scope = req.query.scope?.toString() || 'email openid profile offline_access';
  const state = `${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;

  const authorizeUrl = `${baseUrl}/oauth/authorize?client_id=${encodeURIComponent(
    clientId
  )}&redirect_uri=${encodeURIComponent(callbackUrl)}&response_type=code&scope=${encodeURIComponent(
    scope
  )}&state=${encodeURIComponent(state)}`;

  res.setHeader('Set-Cookie', [
    buildCookie('growthzone_oauth_state', state, 600),
    buildCookie('growthzone_oauth_return_to', returnTo, 600),
    buildCookie('growthzone_oauth_callback_url', callbackUrl, 600),
  ]);

  return res.redirect(authorizeUrl);
}
