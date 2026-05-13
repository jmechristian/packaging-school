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
  if (Array.isArray(payload.Items)) return payload.Items;
  if (Array.isArray(payload)) return payload;
  return [];
}

function normalizeTrackingRow(item) {
  return {
    certificationContactId: item?.CertificationContactId ?? null,
    certificationTypeId: item?.CertificationTypeId ?? null,
    certificationName: item?.CertificationName ?? item?.Name ?? '',
    contactId: item?.ContactId ?? null,
    contactName: item?.ContactName ?? item?.Name ?? '',
    status: item?.Status ?? null,
    statusText: item?.StatusText ?? '',
    percentage: item?.Percentage ?? '',
    startDate: item?.StartDate ?? null,
    completedDate: item?.CompletedDate ?? null,
    hoursEarned: item?.HoursEarned ?? 0,
    creditsEarned: item?.CreditsEarned ?? 0,
  };
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed. Use GET.' });
  }

  const baseUrl = trimSlash(process.env.GROWTHZONE_BASE_URL);
  const apiKey = process.env.GROWTHZONE_API_KEY;
  const timeoutMs = Number(req.query?.timeoutMs) > 0 ? Number(req.query.timeoutMs) : DEFAULT_TIMEOUT_MS;
  const skip = Number(req.query?.skip) >= 0 ? Number(req.query.skip) : 0;
  const top = Number(req.query?.top) > 0 ? Math.min(Number(req.query.top), 1000) : 100;

  if (!baseUrl || !apiKey) {
    return res.status(500).json({
      message: 'Missing GrowthZone env config',
      requiredEnvVars: ['GROWTHZONE_BASE_URL', 'GROWTHZONE_API_KEY'],
    });
  }

  try {
    const attempts = await Promise.all([
      getJson({
        baseUrl,
        apiKey,
        path: `/api/certifications/contacts/?$skip=${skip}&$top=${top}`,
        timeoutMs,
      }),
      getJson({
        baseUrl,
        apiKey,
        path: `/api/certifications/contacts?$skip=${skip}&$top=${top}`,
        timeoutMs,
      }),
    ]);

    const chosen = attempts.find((attempt) => attempt.ok && readResults(attempt.json).length > 0) || attempts[0];
    if (!chosen.ok) {
      return res.status(chosen.status).json({
        ok: false,
        message: 'Failed to pull certificate tracking',
        sourceEndpoint: chosen.url,
        responsePreview: chosen.text.slice(0, 300),
      });
    }

    const rows = readResults(chosen.json).map(normalizeTrackingRow);

    return res.status(200).json({
      ok: true,
      checkedAt: new Date().toISOString(),
      sourceEndpoint: chosen.url,
      rows,
      endpointAttempts: attempts.map((attempt) => ({
        url: attempt.url,
        status: attempt.status,
        ok: attempt.ok,
        responsePreview: attempt.text.slice(0, 140),
      })),
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error?.name === 'AbortError' ? 'Request timed out' : error?.message || 'Request failed',
    });
  }
}
