const DEFAULT_TIMEOUT_MS = 10000;

const READ_ENDPOINTS = [
  '/api/mic/accountcertificationinfo',
  '/api/mic/certificationcatalog',
  '/api/mic/certificationoverview',
];

const WRITE_CANDIDATE_ENDPOINTS = [
  '/api/mic/certificationactivity',
  '/api/mic/certificationcontactactivity',
  '/api/mic/certificationprogresstracker',
  '/api/mic/certificationcontact',
  '/api/mic/certificationbulkentry',
  '/api/mic/certificationactivity/bulk',
];

function trimSlash(value) {
  if (!value) return '';
  return String(value).replace(/\/+$/, '');
}

function withQuery(path, query) {
  const queryString = new URLSearchParams(query).toString();
  return queryString ? `${path}?${queryString}` : path;
}

function getHeaders(apiKey) {
  return {
    'Content-Type': 'application/json',
    Authorization: `ApiKey ${apiKey}`,
  };
}

function getDiscoveryPayload(req) {
  const body = req.body || {};
  return {
    contactId: body.contactId ?? 0,
    certificationComponentId: body.certificationComponentId ?? 0,
    activityName: body.activityName ?? 'LMS completion test',
    creditsEarned: body.creditsEarned ?? 1,
    hoursEarned: body.hoursEarned ?? 1,
    completedDate: body.completedDate ?? new Date().toISOString(),
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

async function probeEndpoint({ baseUrl, apiKey, path, method, payload, timeoutMs }) {
  const url = `${baseUrl}${path}`;
  const startedAt = Date.now();
  try {
    const response = await requestWithTimeout(
      url,
      {
        method,
        headers: getHeaders(apiKey),
        ...(payload ? { body: JSON.stringify(payload) } : {}),
      },
      timeoutMs
    );
    const elapsedMs = Date.now() - startedAt;
    const text = await response.text();
    return {
      method,
      path,
      url,
      status: response.status,
      ok: response.ok,
      elapsedMs,
      responsePreview: text.slice(0, 500),
      hints: {
        methodLikelyAllowed: response.status !== 405,
        authLikelyValid: response.status !== 401 && response.status !== 403,
        routeLikelyExists: response.status !== 404,
      },
    };
  } catch (error) {
    return {
      method,
      path,
      url,
      status: null,
      ok: false,
      elapsedMs: Date.now() - startedAt,
      error: error?.name === 'AbortError' ? 'Request timed out' : error?.message || 'Request failed',
      hints: {
        methodLikelyAllowed: null,
        authLikelyValid: null,
        routeLikelyExists: null,
      },
    };
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      message: 'Method not allowed. Use POST.',
      hint: 'POST /api/growthzone/discover-ce with optional JSON body',
    });
  }

  const baseUrl = trimSlash(process.env.GROWTHZONE_BASE_URL);
  const apiKey = process.env.GROWTHZONE_API_KEY;

  if (!baseUrl || !apiKey) {
    return res.status(500).json({
      message: 'Missing GrowthZone env config',
      requiredEnvVars: ['GROWTHZONE_BASE_URL', 'GROWTHZONE_API_KEY'],
      example: {
        GROWTHZONE_BASE_URL: 'https://your-tenant-domain',
        GROWTHZONE_API_KEY: 'tenant_api_key',
      },
    });
  }

  const timeoutMs = Number(req.body?.timeoutMs) > 0 ? Number(req.body.timeoutMs) : DEFAULT_TIMEOUT_MS;
  const dryRun = req.body?.dryRun !== false;
  const payload = getDiscoveryPayload(req);
  const detailId = Number(req.body?.certificationTypeId) || 1;
  const contactId = Number(req.body?.certificationContactId) || 1;

  const readPaths = [
    ...READ_ENDPOINTS,
    withQuery(`/api/mic/certificationdetail/${detailId}`, {}),
    withQuery(`/api/mic/certificationprogresstracker/${contactId}`, {}),
  ];

  const readResults = await Promise.all(
    readPaths.map((path) => probeEndpoint({ baseUrl, apiKey, path, method: 'GET', timeoutMs }))
  );

  const writeMethods = dryRun ? ['OPTIONS'] : ['POST'];
  const writeResults = await Promise.all(
    WRITE_CANDIDATE_ENDPOINTS.flatMap((path) =>
      writeMethods.map((method) =>
        probeEndpoint({
          baseUrl,
          apiKey,
          path,
          method,
          payload: method === 'POST' ? payload : undefined,
          timeoutMs,
        })
      )
    )
  );

  const supportedWriteCandidates = writeResults.filter(
    (item) => item.status && item.status !== 404 && item.status !== 405
  );

  const result = {
    runMode: dryRun ? 'dry-run-options-probe' : 'post-payload-probe',
    baseUrl,
    checkedAt: new Date().toISOString(),
    notes: [
      'GET probes validate current MIC read-path accessibility.',
      dryRun
        ? 'Dry run uses OPTIONS to identify potentially writable paths without writing transcript data.'
        : 'POST run sends a lightweight test payload; use sandbox tenant contact IDs when possible.',
    ],
    payloadUsedForPost: dryRun ? null : payload,
    readResults,
    writeResults,
    supportedWriteCandidates,
    recommendedNextChecks: [
      'If cert write path returns 400/422 (not 404/405), inspect response body for required hierarchy fields.',
      'If write returns 401/403, verify tenant API key scope and whether OAuth2 is required for MIC writes.',
      'If no write route is found, check for tenant-specific bulk import endpoint or queue custom-field fallback.',
    ],
  };

  return res.status(200).json(result);
}
