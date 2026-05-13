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

const GRAPHQL_URL = 'https://api.thinkific.com/stable/graphql';

const QUERY_ME = `
  query CurrentOAuthPrincipal {
    me {
      gid
      id
      email
      firstName
      lastName
      hasAdminRole
    }
  }
`;

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const cookies = parseCookies(req.headers.cookie);
  const identity = normalizeIdentity(req.query.identity);
  const accessToken = cookies[`thinkific_oauth_access_token_${identity}`];
  const subdomain = cookies[`thinkific_oauth_subdomain_live_${identity}`] || null;

  if (!accessToken) {
    res.status(400).json({ message: 'No OAuth access token found in cookies.' });
    return;
  }

  try {
    const response = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: QUERY_ME }),
    });
    const graphql = await response.json().catch(() => ({}));

    res.status(response.ok ? 200 : response.status).json({
      connected: true,
      identity,
      subdomain,
      httpStatus: response.status,
      me: graphql?.data?.me || null,
      graphql,
    });
  } catch (error) {
    res.status(500).json({
      connected: true,
      identity,
      subdomain,
      message: error.message || 'Failed to query me',
    });
  }
}
