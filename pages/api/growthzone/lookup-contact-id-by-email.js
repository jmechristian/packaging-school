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

function readResults(payload) {
  if (!payload || typeof payload !== 'object') return [];
  if (Array.isArray(payload.Results)) return payload.Results;
  if (Array.isArray(payload.results)) return payload.results;
  if (Array.isArray(payload)) return payload;
  return [];
}

function normalizeEmail(value) {
  return String(value || '').trim().toLowerCase();
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed. Use GET.' });
  }

  const baseUrl = trimSlash(process.env.GROWTHZONE_BASE_URL);
  const apiKey = process.env.GROWTHZONE_API_KEY;
  const timeoutMs = Number(req.query?.timeoutMs) > 0 ? Number(req.query.timeoutMs) : DEFAULT_TIMEOUT_MS;
  const email = String(req.query?.email || '').trim();
  const normalizedEmail = normalizeEmail(email);
  const top = Number(req.query?.top) > 0 ? Math.min(Number(req.query.top), 1000) : 500;
  const maxPages = Number(req.query?.maxPages) > 0 ? Math.min(Number(req.query.maxPages), 100) : 50;

  if (!baseUrl || !apiKey) {
    return res.status(500).json({
      message: 'Missing GrowthZone env config',
      requiredEnvVars: ['GROWTHZONE_BASE_URL', 'GROWTHZONE_API_KEY'],
    });
  }

  if (!normalizedEmail) {
    return res.status(400).json({
      ok: false,
      message: 'email is required',
      hint: 'Use /api/growthzone/lookup-contact-id-by-email?email=user@example.com',
    });
  }

  try {
    const endpointPatterns = [
      (skip) => `/api/contacts?$skip=${skip}&$top=${top}&$orderby=ContactId`,
      (skip) => `/api/contacts?skip=${skip}&take=${top}&orderBy=ContactId`,
    ];

    let selectedPattern = null;
    let totalAvailable = null;
    let fetchedCount = 0;
    let pagesFetched = 0;
    const matches = [];
    const endpointAttempts = [];

    for (let i = 0; i < endpointPatterns.length; i += 1) {
      const pattern = endpointPatterns[i];
      const first = await getJson({ baseUrl, apiKey, path: pattern(0), timeoutMs });
      endpointAttempts.push({
        url: first.url,
        status: first.status,
        ok: first.ok,
        responsePreview: first.text.slice(0, 160),
      });
      if (first.ok) {
        selectedPattern = pattern;
        totalAvailable = Number(first?.json?.TotalRecordAvailable);
        const firstRows = readResults(first.json);
        fetchedCount += firstRows.length;
        pagesFetched += 1;
        for (const item of firstRows) {
          if (normalizeEmail(item?.EmailAddress) === normalizedEmail) {
            matches.push({
              contactId: item?.ContactId ?? null,
              name: item?.Name ?? item?.ContactName ?? null,
              email: item?.EmailAddress ?? null,
            });
          }
        }
        break;
      }
    }

    if (!selectedPattern) {
      const firstFailed = endpointAttempts[0];
      return res.status(firstFailed?.status || 500).json({
        ok: false,
        message: 'Failed to query contacts',
        status: firstFailed?.status || 500,
        endpointAttempts,
      });
    }

    const targetTotal = Number.isFinite(totalAvailable) && totalAvailable > 0 ? totalAvailable : top;
    for (let skip = top; skip < targetTotal && pagesFetched < maxPages; skip += top) {
      const page = await getJson({ baseUrl, apiKey, path: selectedPattern(skip), timeoutMs });
      pagesFetched += 1;
      endpointAttempts.push({
        url: page.url,
        status: page.status,
        ok: page.ok,
        responsePreview: page.text.slice(0, 100),
      });
      if (!page.ok) break;

      const rows = readResults(page.json);
      if (rows.length === 0) break;
      fetchedCount += rows.length;

      for (const item of rows) {
        if (normalizeEmail(item?.EmailAddress) === normalizedEmail) {
          matches.push({
            contactId: item?.ContactId ?? null,
            name: item?.Name ?? item?.ContactName ?? null,
            email: item?.EmailAddress ?? null,
          });
        }
      }

      if (matches.length > 0) break;
    }

    return res.status(200).json({
      ok: true,
      checkedAt: new Date().toISOString(),
      email,
      endpoint: endpointAttempts[0]?.url || null,
      totalAvailable,
      totalFetched: fetchedCount,
      pagesFetched,
      matches,
      endpointAttempts,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error?.name === 'AbortError' ? 'Request timed out' : error?.message || 'Request failed',
    });
  }
}
