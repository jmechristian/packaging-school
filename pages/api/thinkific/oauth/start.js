function normalizeSubdomain(raw) {
  return (raw || '').toString().trim().replace(/\.thinkific\.com$/i, '');
}

function normalizeIdentity(raw) {
  return raw === 'student' ? 'student' : 'admin';
}

function buildCookie(name, value, maxAgeSeconds) {
  return `${name}=${encodeURIComponent(value)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAgeSeconds}`;
}

export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const clientId = process.env.THINKIFIC_OAUTH_CLIENT_ID;
  const callbackUrl = process.env.THINKIFIC_OAUTH_CALLBACK_URL;
  const defaultSubdomain =
    process.env.NEXT_THINKIFIC_SUBDOMAIN || process.env.NEXT_PUBLIC_THINKIFIC_SUBDOMAIN;

  if (!clientId || !callbackUrl) {
    res.status(500).json({
      message: 'Missing OAuth environment variables',
      required: ['THINKIFIC_OAUTH_CLIENT_ID', 'THINKIFIC_OAUTH_CALLBACK_URL'],
    });
    return;
  }

  const subdomain = normalizeSubdomain(req.query.subdomain || defaultSubdomain);
  if (!subdomain) {
    res.status(400).json({ message: 'subdomain is required' });
    return;
  }

  const returnTo = req.query.returnTo?.toString() || '/sandbox/lessoncomplete';
  const identity = normalizeIdentity(req.query.identity);
  const state = `${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;

  const authorizeUrl = `https://${subdomain}.thinkific.com/oauth2/authorize?client_id=${encodeURIComponent(
    clientId
  )}&redirect_uri=${encodeURIComponent(
    callbackUrl
  )}&response_mode=query&response_type=code&state=${encodeURIComponent(state)}`;

  res.setHeader('Set-Cookie', [
    buildCookie(`thinkific_oauth_state_${identity}`, state, 600),
    buildCookie(`thinkific_oauth_subdomain_${identity}`, subdomain, 600),
    buildCookie(`thinkific_oauth_return_to_${identity}`, returnTo, 600),
    buildCookie('thinkific_oauth_identity_active', identity, 600),
  ]);

  res.redirect(authorizeUrl);
}
