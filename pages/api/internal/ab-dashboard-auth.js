function buildCookie(name, value, maxAgeSeconds) {
  const secureFlag = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  return `${name}=${encodeURIComponent(value)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAgeSeconds}${secureFlag}`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const expectedPassword =
    process.env.INTERNAL_DASHBOARD_PASSWORD || process.env.AB_DASHBOARD_PASSWORD;
  if (!expectedPassword) {
    return res.status(500).json({ error: 'Dashboard password is not configured' });
  }

  const submittedPassword =
    typeof req.body?.password === 'string' ? req.body.password : '';

  if (!submittedPassword || submittedPassword !== expectedPassword) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  res.setHeader('Set-Cookie', buildCookie('ps_ab_dash_auth', expectedPassword, 60 * 60 * 24));
  return res.status(200).json({ success: true });
}
