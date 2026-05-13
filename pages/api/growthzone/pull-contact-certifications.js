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

function toArray(payload) {
  if (Array.isArray(payload)) return payload;
  if (payload && typeof payload === 'object' && Array.isArray(payload.Results)) return payload.Results;
  if (payload && typeof payload === 'object' && Array.isArray(payload.Items)) return payload.Items;
  return [];
}

function normalizeCertification(item) {
  return {
    certificationTypeId: item?.CertificationTypeId ?? item?.Id ?? null,
    certificationContactId: item?.CertificationContactId ?? null,
    name: item?.CertificationName ?? item?.Name ?? '',
    status: item?.Status ?? null,
    percentComplete: item?.PercentComplete ?? item?.Percentage ?? null,
    hoursEarned: item?.HoursEarned ?? null,
    creditsEarned: item?.CreditsEarned ?? null,
    startDate: item?.StartDate ?? null,
    completedDate: item?.CompletedDate ?? null,
  };
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
      message: 'contactId query param is required',
      hint: 'Use /api/growthzone/pull-contact-certifications?contactId=12345',
    });
  }

  try {
    const attempts = await Promise.all([
      getJson({
        baseUrl,
        apiKey,
        path: `/api/contactoverview/${contactId}/certifications`,
        timeoutMs,
      }),
      getJson({
        baseUrl,
        apiKey,
        path: `/api/mic/contactoverview/${contactId}/certifications`,
        timeoutMs,
      }),
      getJson({
        baseUrl,
        apiKey,
        path: `/api/contacts/OrgGeneral/${contactId}`,
        timeoutMs,
      }),
    ]);

    const chosen =
      attempts.find((attempt) => attempt.ok && toArray(attempt.json).length > 0) ||
      attempts.find((attempt) => attempt.ok && attempt.json && typeof attempt.json === 'object') ||
      attempts[0];

    let certifications = [];
    if (Array.isArray(chosen.json)) {
      certifications = chosen.json.map(normalizeCertification);
    } else if (chosen.json && typeof chosen.json === 'object' && Array.isArray(chosen.json.Certifications)) {
      certifications = chosen.json.Certifications.map(normalizeCertification);
    } else if (chosen.json && typeof chosen.json === 'object' && Array.isArray(chosen.json.Items)) {
      certifications = chosen.json.Items.map(normalizeCertification);
    }

    return res.status(chosen.ok ? 200 : chosen.status).json({
      ok: chosen.ok,
      checkedAt: new Date().toISOString(),
      contactId,
      sourceEndpoint: chosen.url,
      growthzoneRawText: chosen.text,
      growthzoneRawObject: chosen.json,
      certifications,
      endpointAttempts: attempts.map((attempt) => ({
        url: attempt.url,
        status: attempt.status,
        ok: attempt.ok,
        responsePreview: attempt.text.slice(0, 180),
      })),
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error?.name === 'AbortError' ? 'Request timed out' : error?.message || 'Request failed',
    });
  }
}
