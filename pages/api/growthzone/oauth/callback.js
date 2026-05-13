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

function trimSlash(value) {
  if (!value) return '';
  return String(value).replace(/\/+$/, '');
}

async function exchangeAuthorizationCode({
  tokenUrl,
  code,
  clientId,
  clientSecret,
  redirectUri,
}) {
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: redirectUri,
  });
  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  });
  const text = await response.text();
  let json;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = null;
  }
  return { response, text, json };
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const baseUrl = trimSlash(process.env.GROWTHZONE_BASE_URL);
  const clientId = process.env.GROWTHZONE_CLIENT_ID;
  const clientSecret = process.env.GROWTHZONE_CLIENT_SECRET;

  if (!baseUrl || !clientId || !clientSecret) {
    return res.status(500).json({
      message: 'Missing OAuth environment variables',
      required: ['GROWTHZONE_BASE_URL', 'GROWTHZONE_CLIENT_ID', 'GROWTHZONE_CLIENT_SECRET'],
    });
  }

  const { code, state } = req.query;
  const cookies = parseCookies(req.headers.cookie);
  const expectedState = cookies.growthzone_oauth_state;
  const returnTo = cookies.growthzone_oauth_return_to || '/sandbox/growthzone';
  const callbackUrl = cookies.growthzone_oauth_callback_url;
  const tokenUrl = `${baseUrl}/oauth/token`;

  const clearFlowCookies = [
    expireCookie('growthzone_oauth_state'),
    expireCookie('growthzone_oauth_return_to'),
    expireCookie('growthzone_oauth_callback_url'),
  ];

  if (!code || !state || !expectedState || state.toString() !== expectedState || !callbackUrl) {
    res.setHeader('Set-Cookie', clearFlowCookies);
    return res.redirect(`${returnTo}?oauth=error&reason=invalid_callback`);
  }

  try {
    const { response, json } = await exchangeAuthorizationCode({
      tokenUrl,
      code: code.toString(),
      clientId,
      clientSecret,
      redirectUri: callbackUrl,
    });

    if (!response.ok || !json?.access_token) {
      res.setHeader('Set-Cookie', clearFlowCookies);
      return res.redirect(`${returnTo}?oauth=error&reason=token_exchange_failed`);
    }

    const ttl = Number(json.expires_in || 3600);
    const newCookies = [
      ...clearFlowCookies,
      buildCookie('growthzone_oauth_access_token', json.access_token, ttl),
      buildCookie('growthzone_oauth_refresh_token', json.refresh_token || '', 60 * 60 * 24 * 30),
      buildCookie(
        'growthzone_oauth_expires_at',
        new Date(Date.now() + ttl * 1000).toISOString(),
        ttl
      ),
    ];
    res.setHeader('Set-Cookie', newCookies);
    return res.redirect(`${returnTo}?oauth=connected`);
  } catch {
    res.setHeader('Set-Cookie', clearFlowCookies);
    return res.redirect(`${returnTo}?oauth=error&reason=exception`);
  }
}
