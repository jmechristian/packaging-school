const DEFAULT_TIMEOUT_MS = 10000;

function trimSlash(value) {
  if (!value) return '';
  return String(value).replace(/\/+$/, '');
}

function getHeaders(apiKey) {
  return {
    'Content-Type': 'application/json',
    Authorization: `ApiKey ${apiKey}`,
  };
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

async function getJson({ baseUrl, apiKey, path, timeoutMs }) {
  const url = `${baseUrl}${path}`;
  const response = await requestWithTimeout(
    url,
    { method: 'GET', headers: getHeaders(apiKey) },
    timeoutMs
  );
  const text = await response.text();
  let json;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = null;
  }
  return { url, status: response.status, ok: response.ok, json, text };
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed. Use GET.' });
  }

  const baseUrl = trimSlash(process.env.GROWTHZONE_BASE_URL);
  const apiKey = process.env.GROWTHZONE_API_KEY;
  const timeoutMs = Number(req.query?.timeoutMs) > 0 ? Number(req.query.timeoutMs) : DEFAULT_TIMEOUT_MS;
  const contactId = Number(req.query?.contactId);

  if (!baseUrl || !apiKey) {
    return res.status(500).json({
      message: 'Missing GrowthZone env config',
      requiredEnvVars: ['GROWTHZONE_BASE_URL', 'GROWTHZONE_API_KEY'],
    });
  }

  if (!Number.isFinite(contactId) || contactId <= 0) {
    return res.status(400).json({
      ok: false,
      message: 'contactId is required',
      hint: 'Use /api/growthzone/search-contacts?contactId=12345',
    });
  }

  try {
    const attempt = await getJson({
      baseUrl,
      apiKey,
      path: `/api/contactoverview/${contactId}`,
      timeoutMs,
    });

    if (!attempt.ok) {
      return res.status(attempt.status).json({
        ok: false,
        message: 'Contact lookup failed',
        status: attempt.status,
        endpoint: attempt.url,
        responsePreview: attempt.text.slice(0, 200),
      });
    }

    const root = attempt.json && typeof attempt.json === 'object' ? attempt.json : {};
    const row = {
      contactId: root?.ContactId ?? contactId,
      name: (() => {
        const fromParts = [root?.FirstName, root?.LastName].filter(Boolean).join(' ');
        return root?.Name ?? root?.ContactDisplayName ?? root?.DisplayName ?? fromParts ?? '';
      })(),
      email: root?.PrimaryEmailAddress ?? root?.Email ?? '',
    };

    return res.status(200).json({
      ok: true,
      checkedAt: new Date().toISOString(),
      baseUrl,
      contactId,
      contacts: [row],
      raw: root,
      endpoint: attempt.url,
      note: 'Using only /api/contactoverview/{contactid}.',
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error?.name === 'AbortError' ? 'Request timed out' : error?.message || 'Request failed',
    });
  }
}
