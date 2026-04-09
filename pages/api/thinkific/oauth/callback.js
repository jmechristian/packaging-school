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

function buildCookie(name, value, maxAgeSeconds) {
  return `${name}=${encodeURIComponent(value)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAgeSeconds}`;
}

function expireCookie(name) {
  return `${name}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}

function normalizeIdentity(raw) {
  return raw === 'student' ? 'student' : 'admin';
}

async function exchangeAuthorizationCode({ subdomain, code, clientId, clientSecret }) {
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const response = await fetch(`https://${subdomain}.thinkific.com/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      grant_type: 'authorization_code',
      code,
    }),
  });
  const json = await response.json().catch(() => ({}));
  return { response, json };
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const clientId = process.env.THINKIFIC_OAUTH_CLIENT_ID;
  const clientSecret = process.env.THINKIFIC_OAUTH_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    res.status(500).json({
      message: 'Missing OAuth environment variables',
      required: ['THINKIFIC_OAUTH_CLIENT_ID', 'THINKIFIC_OAUTH_CLIENT_SECRET'],
    });
    return;
  }

  const { code, state } = req.query;
  const cookies = parseCookies(req.headers.cookie);
  const identity = normalizeIdentity(req.query.identity || cookies.thinkific_oauth_identity_active);
  const expectedState = cookies[`thinkific_oauth_state_${identity}`];
  const returnTo = cookies[`thinkific_oauth_return_to_${identity}`] || '/sandbox/lessoncomplete';
  const subdomainFromCookie = cookies[`thinkific_oauth_subdomain_${identity}`];
  const subdomainFromQuery = req.query.subdomain?.toString();
  const subdomain = (subdomainFromQuery || subdomainFromCookie || '')
    .replace(/\.thinkific\.com$/i, '')
    .trim();

  const clearFlowCookies = [
    expireCookie(`thinkific_oauth_state_${identity}`),
    expireCookie(`thinkific_oauth_subdomain_${identity}`),
    expireCookie(`thinkific_oauth_return_to_${identity}`),
    expireCookie('thinkific_oauth_identity_active'),
  ];

  if (!code || !state || !subdomain || state !== expectedState) {
    res.setHeader('Set-Cookie', clearFlowCookies);
    res.redirect(`${returnTo}?oauth=error&reason=invalid_callback`);
    return;
  }

  try {
    const { response, json } = await exchangeAuthorizationCode({
      subdomain,
      code: code.toString(),
      clientId,
      clientSecret,
    });

    if (!response.ok || !json?.access_token) {
      res.setHeader('Set-Cookie', clearFlowCookies);
      res.redirect(`${returnTo}?oauth=error&reason=token_exchange_failed`);
      return;
    }

    const ttl = Number(json.expires_in || 3600);
    const newCookies = [
      ...clearFlowCookies,
      buildCookie(`thinkific_oauth_access_token_${identity}`, json.access_token, ttl),
      buildCookie(
        `thinkific_oauth_refresh_token_${identity}`,
        json.refresh_token || '',
        60 * 60 * 24 * 30
      ),
      buildCookie(`thinkific_oauth_subdomain_live_${identity}`, subdomain, 60 * 60 * 24 * 30),
      buildCookie(
        `thinkific_oauth_expires_at_${identity}`,
        new Date(Date.now() + ttl * 1000).toISOString(),
        ttl
      ),
    ];

    res.setHeader('Set-Cookie', newCookies);
    res.redirect(
      `${returnTo}?oauth=connected&identity=${identity}&subdomain=${encodeURIComponent(
        subdomain
      )}`
    );
    return;
  } catch (error) {
    res.setHeader('Set-Cookie', clearFlowCookies);
    res.redirect(`${returnTo}?oauth=error&reason=exception`);
    return;
  }
}
