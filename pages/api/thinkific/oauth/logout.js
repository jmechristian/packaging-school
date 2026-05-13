function expireCookie(name) {
  return `${name}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const cookiesToClear = [
    // Flow cookies
    'thinkific_oauth_identity_active',
    'thinkific_oauth_state_admin',
    'thinkific_oauth_subdomain_admin',
    'thinkific_oauth_return_to_admin',
    'thinkific_oauth_state_student',
    'thinkific_oauth_subdomain_student',
    'thinkific_oauth_return_to_student',
    // Token cookies
    'thinkific_oauth_access_token_admin',
    'thinkific_oauth_refresh_token_admin',
    'thinkific_oauth_subdomain_live_admin',
    'thinkific_oauth_expires_at_admin',
    'thinkific_oauth_access_token_student',
    'thinkific_oauth_refresh_token_student',
    'thinkific_oauth_subdomain_live_student',
    'thinkific_oauth_expires_at_student',
  ];

  res.setHeader('Set-Cookie', cookiesToClear.map(expireCookie));
  res.status(200).json({ success: true });
}
