function parseCookies(cookieHeader) {
  const out = {};
  (cookieHeader || '')
    .split(';')
    .map((v) => v.trim())
    .filter(Boolean)
    .forEach((part) => {
      const idx = part.indexOf('=');
      if (idx === -1) return;
      const key = part.slice(0, idx);
      const value = part.slice(idx + 1);
      out[key] = decodeURIComponent(value);
    });
  return out;
}

function normalizeIdentity(raw) {
  return raw === 'student' ? 'student' : 'admin';
}

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const c = parseCookies(req.headers.cookie);
  const identity = normalizeIdentity(req.query.identity);
  const accessToken = c[`thinkific_oauth_access_token_${identity}`];
  const refreshToken = c[`thinkific_oauth_refresh_token_${identity}`];
  const subdomain = c[`thinkific_oauth_subdomain_live_${identity}`] || null;
  const expiresAt = c[`thinkific_oauth_expires_at_${identity}`] || null;

  return res.status(200).json({
    identity,
    connected: Boolean(accessToken),
    hasRefreshToken: Boolean(refreshToken),
    subdomain,
    expiresAt,
  });
}
