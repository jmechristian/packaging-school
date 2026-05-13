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

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const cookies = parseCookies(req.headers.cookie);
  const accessToken = cookies.growthzone_oauth_access_token;
  const refreshToken = cookies.growthzone_oauth_refresh_token;
  const expiresAt = cookies.growthzone_oauth_expires_at || null;

  return res.status(200).json({
    connected: Boolean(accessToken),
    hasRefreshToken: Boolean(refreshToken),
    expiresAt,
  });
}
