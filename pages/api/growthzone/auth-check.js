function trimSlash(value) {
  if (!value) return '';
  return String(value).replace(/\/+$/, '');
}

async function requestWithTimeout(url, options, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed. Use GET.' });
  }

  const baseUrl = trimSlash(process.env.GROWTHZONE_BASE_URL);
  const apiKey = process.env.GROWTHZONE_API_KEY;
  const timeoutMs = Number(req.query?.timeoutMs) > 0 ? Number(req.query.timeoutMs) : 10000;

  if (!baseUrl || !apiKey) {
    return res.status(500).json({
      ok: false,
      message: 'Missing GrowthZone env config',
      requiredEnvVars: ['GROWTHZONE_BASE_URL', 'GROWTHZONE_API_KEY'],
    });
  }

  const url = `${baseUrl}/api/login/aboutme`;
  const startedAt = Date.now();

  try {
    const response = await requestWithTimeout(
      url,
      {
        method: 'GET',
        headers: {
          Authorization: `ApiKey ${apiKey}`,
          'Content-Type': 'application/json',
        },
      },
      timeoutMs
    );

    const elapsedMs = Date.now() - startedAt;
    const text = await response.text();

    let parsed;
    try {
      parsed = text ? JSON.parse(text) : null;
    } catch {
      parsed = null;
    }

    const aboutMe = parsed && typeof parsed === 'object' ? parsed : null;
    const tenant = aboutMe
      ? {
          tenantId: aboutMe.TenantId ?? null,
          tenantName: aboutMe.TenantName ?? null,
          tenantDomain: aboutMe.TenantDomain ?? null,
          contactId: aboutMe.ContactId ?? null,
          name: aboutMe.Name ?? null,
        }
      : null;

    return res.status(response.ok ? 200 : response.status).json({
      ok: response.ok,
      url,
      status: response.status,
      elapsedMs,
      tenant,
      responsePreview: text.slice(0, 500),
      hints: {
        authLikelyValid: response.status !== 401 && response.status !== 403,
        baseUrlLikelyValid: response.status !== 404,
      },
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      url,
      message: error?.name === 'AbortError' ? 'Auth check timed out' : error?.message || 'Auth check failed',
      elapsedMs: Date.now() - startedAt,
    });
  }
}
