function expireCookie(name) {
  return `${name}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed. Use POST.' });
  }

  res.setHeader('Set-Cookie', [
    expireCookie('growthzone_oauth_access_token'),
    expireCookie('growthzone_oauth_refresh_token'),
    expireCookie('growthzone_oauth_expires_at'),
    expireCookie('growthzone_oauth_state'),
    expireCookie('growthzone_oauth_return_to'),
    expireCookie('growthzone_oauth_callback_url'),
  ]);

  return res.status(200).json({ ok: true, message: 'GrowthZone OAuth cookies cleared' });
}
