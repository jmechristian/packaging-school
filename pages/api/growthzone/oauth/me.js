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

function trimSlash(value) {
  if (!value) return '';
  return String(value).replace(/\/+$/, '');
}

async function fetchJson(url, headers) {
  const response = await fetch(url, { method: 'GET', headers });
  const text = await response.text();
  let json;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = null;
  }
  return { response, text, json, url };
}

function pickUserInfo(raw) {
  const data = raw && typeof raw === 'object' ? raw : {};
  return {
    sub: data.sub ?? null,
    email: data.email ?? null,
    givenName: data.given_name ?? null,
    familyName: data.family_name ?? null,
    contactId: data.ContactId ?? null,
    issuer: data.iss ?? null,
    audience: data.aud ?? null,
  };
}

function pickAboutMe(raw) {
  const data = raw && typeof raw === 'object' ? raw : {};
  return {
    contactId: data.ContactId ?? null,
    name: data.Name ?? null,
    firstName: data.FirstName ?? null,
    lastName: data.LastName ?? null,
    tenantId: data.TenantId ?? null,
    tenantName: data.TenantName ?? null,
    tenantDomain: data.TenantDomain ?? null,
    currentOrganizationId: data.CurrentOrganizationId ?? null,
    currentOrganizationName: data.CurrentOrganizationName ?? null,
  };
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const baseUrl = trimSlash(process.env.GROWTHZONE_BASE_URL);
  if (!baseUrl) {
    return res.status(500).json({
      message: 'Missing GrowthZone environment variable',
      required: ['GROWTHZONE_BASE_URL'],
    });
  }

  const cookies = parseCookies(req.headers.cookie);
  const accessToken = cookies.growthzone_oauth_access_token;
  if (!accessToken) {
    return res.status(400).json({ message: 'No OAuth access token found in cookies.' });
  }

  const authHeader = { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' };

  try {
    const [userinfoRes, aboutMeRes] = await Promise.all([
      fetchJson(`${baseUrl}/oauth/userinfo`, authHeader),
      fetchJson(`${baseUrl}/api/login/aboutme`, authHeader),
    ]);

    const ok = userinfoRes.response.ok || aboutMeRes.response.ok;
    return res.status(ok ? 200 : aboutMeRes.response.status || userinfoRes.response.status).json({
      connected: true,
      userinfo: {
        status: userinfoRes.response.status,
        url: userinfoRes.url,
        data: pickUserInfo(userinfoRes.json),
      },
      aboutMe: {
        status: aboutMeRes.response.status,
        url: aboutMeRes.url,
        data: pickAboutMe(aboutMeRes.json),
      },
    });
  } catch (error) {
    return res.status(500).json({
      connected: true,
      message: error.message || 'Failed to query oauth me endpoints',
    });
  }
}
