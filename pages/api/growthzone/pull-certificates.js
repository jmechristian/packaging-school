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

function asArray(value) {
  if (Array.isArray(value)) return value;
  if (value && typeof value === 'object' && Array.isArray(value.Results)) return value.Results;
  return [];
}

function normalizeCert(item) {
  return {
    certificationTypeId:
      item?.CertificationTypeId ?? item?.CertificationId ?? item?.Id ?? item?.id ?? null,
    name: item?.Name ?? item?.CertificationName ?? item?.Title ?? '',
    code: item?.Code ?? item?.CertificationCode ?? '',
    category: item?.CategoryName ?? item?.Category ?? '',
    isActive:
      item?.IsActive ??
      item?.Active ??
      (item?.Status ? String(item.Status).toLowerCase() === 'active' : null),
    version: item?.Version ?? '',
    totalEnrolled: item?.TotalEnrolled ?? item?.EnrollmentCount ?? 0,
    totalCompleted: item?.TotalCompleted ?? item?.CompletedCount ?? 0,
    totalComponents: item?.TotalComponents ?? item?.ComponentCount ?? 0,
  };
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed. Use GET.' });
  }

  const baseUrl = trimSlash(process.env.GROWTHZONE_BASE_URL);
  const apiKey = process.env.GROWTHZONE_API_KEY;
  const timeoutMs = Number(req.query?.timeoutMs) > 0 ? Number(req.query.timeoutMs) : DEFAULT_TIMEOUT_MS;

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
        path: '/api/certifications/typelist/?$skip=0&$top=100',
        timeoutMs,
      }),
      getJson({
        baseUrl,
        apiKey,
        path: '/api/certifications/typelist?$skip=0&$top=100',
        timeoutMs,
      }),
      getJson({ baseUrl, apiKey, path: '/api/mic/certifications', timeoutMs }),
      getJson({ baseUrl, apiKey, path: '/api/mic/certificationcatalog', timeoutMs }),
    ]);

    const chosen = attempts.find((attempt) => attempt.ok && asArray(attempt.json).length > 0) || attempts[0];
    if (!chosen.ok) {
      return res.status(chosen.status).json({
        ok: false,
        message: 'Failed to pull certificates',
        status: chosen.status,
        responsePreview: chosen.text.slice(0, 500),
      });
    }

    const rows = asArray(chosen.json).map(normalizeCert);

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
