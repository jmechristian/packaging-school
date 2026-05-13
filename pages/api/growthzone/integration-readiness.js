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

function normalizeEmail(value) {
  return String(value || '').trim().toLowerCase();
}

function normalizeCertType(item) {
  return {
    certificationTypeId: item?.CertificationTypeId ?? item?.CertificationId ?? item?.Id ?? null,
    name: item?.Name ?? item?.CertificationName ?? '',
    code: item?.Code ?? '',
    totalEnrolled: item?.TotalEnrolled ?? 0,
    totalCompleted: item?.TotalCompleted ?? 0,
    totalComponents: item?.TotalComponents ?? 0,
    isActive: item?.IsActive ?? null,
  };
}

function normalizeContactCert(item) {
  return {
    certificationContactId: item?.CertificationContactId ?? null,
    certificationName: item?.CertificationName ?? item?.Name ?? '',
    status: item?.Status ?? null,
    statusText: item?.StatusText ?? '',
    startDate: item?.StartDate ?? null,
    completedDate: item?.CompletedDate ?? null,
    hoursEarned: item?.HoursEarned ?? 0,
    creditsEarned: item?.CreditsEarned ?? 0,
    percentage: item?.Percentage ?? '',
  };
}

function normalizeComponent(item, certificationTypeId) {
  return {
    certificationTypeId,
    certificationComponentId: item?.CertificationComponentId ?? null,
    certificationContactId: item?.CertificationContactId ?? null,
    type: item?.Type ?? '',
    certificationComponentTypeId: item?.CertificationComponentTypeId ?? null,
    code: item?.Code ?? '',
    name: item?.Name ?? '',
    description: item?.Description ?? null,
    objectives: Array.isArray(item?.Objectives) ? item.Objectives : [],
  };
}

function readComponentRows(payload) {
  const rows = readResults(payload);
  if (rows.some((row) => row && typeof row === 'object' && row.CertificationComponentId)) {
    return rows;
  }
  if (payload && typeof payload === 'object' && payload.CertificationComponentId) return [payload];

  const discovered = [];
  const stack = [payload];
  while (stack.length > 0) {
    const node = stack.pop();
    if (!node || typeof node !== 'object') continue;

    if (Array.isArray(node)) {
      for (const item of node) {
        if (item && typeof item === 'object' && item.CertificationComponentId) {
          discovered.push(item);
        } else if (item && typeof item === 'object') {
          stack.push(item);
        }
      }
      continue;
    }

    for (const value of Object.values(node)) {
      if (!value || typeof value !== 'object') continue;
      if (Array.isArray(value)) {
        for (const item of value) {
          if (item && typeof item === 'object' && item.CertificationComponentId) {
            discovered.push(item);
          } else if (item && typeof item === 'object') {
            stack.push(item);
          }
        }
      } else {
        if (value.CertificationComponentId) {
          discovered.push(value);
        } else {
          stack.push(value);
        }
      }
    }
  }

  return discovered;
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
  const certTypeIdFilter = Number(req.query?.certificationTypeId);

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
      hint: 'Use /api/growthzone/integration-readiness?email=user@example.com',
    });
  }

  try {
    const certAttempts = await Promise.all([
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
    ]);
    const certChosen = certAttempts.find((r) => r.ok && readResults(r.json).length > 0) || certAttempts[0];
    const certRows = readResults(certChosen.json).map(normalizeCertType);
    const filteredCertRows = Number.isFinite(certTypeIdFilter) && certTypeIdFilter > 0
      ? certRows.filter((row) => Number(row.certificationTypeId) === certTypeIdFilter)
      : certRows;

    const componentAttemptsByType = await Promise.all(
      filteredCertRows.map(async (cert) => {
        const id = cert.certificationTypeId;
        const attempts = await Promise.all([
          getJson({
            baseUrl,
            apiKey,
            path: `/api/certifications/certificationtypecomponents/${id}/`,
            timeoutMs,
          }),
          getJson({
            baseUrl,
            apiKey,
            path: `/api/certifications/certificationtypecomponents/${id}`,
            timeoutMs,
          }),
        ]);
        const chosen = attempts.find((r) => r.ok && readComponentRows(r.json).length > 0) || attempts[0];
        const rows = readComponentRows(chosen.json).map((item) => normalizeComponent(item, id));
        return {
          certificationTypeId: id,
          sourceEndpoint: chosen.url,
          status: chosen.status,
          rows,
          growthzoneRawText: chosen.text,
          attempts: attempts.map((attempt) => ({
            url: attempt.url,
            status: attempt.status,
            ok: attempt.ok,
            responsePreview: attempt.text.slice(0, 140),
          })),
        };
      })
    );

    const pageSize = 500;
    const firstContactsPage = await getJson({
      baseUrl,
      apiKey,
      path: `/api/contacts?$skip=0&$top=${pageSize}&$orderby=ContactId`,
      timeoutMs,
    });
    if (!firstContactsPage.ok) {
      return res.status(firstContactsPage.status).json({
        ok: false,
        message: 'Failed to read contacts for email lookup',
        endpoint: firstContactsPage.url,
        responsePreview: firstContactsPage.text.slice(0, 300),
      });
    }

    const totalAvailable = Number(firstContactsPage?.json?.TotalRecordAvailable) || 0;
    const matchedContacts = [];
    const contactsAttempts = [
      {
        url: firstContactsPage.url,
        status: firstContactsPage.status,
        ok: firstContactsPage.ok,
        responsePreview: firstContactsPage.text.slice(0, 160),
      },
    ];

    const scanRows = (rows) => {
      for (const row of rows) {
        if (normalizeEmail(row?.EmailAddress) === normalizedEmail) {
          matchedContacts.push({
            contactId: row?.ContactId ?? null,
            name: row?.Name ?? row?.ContactName ?? '',
            email: row?.EmailAddress ?? '',
          });
        }
      }
    };
    scanRows(readResults(firstContactsPage.json));

    for (let skip = pageSize; skip < totalAvailable && matchedContacts.length === 0; skip += pageSize) {
      const page = await getJson({
        baseUrl,
        apiKey,
        path: `/api/contacts?$skip=${skip}&$top=${pageSize}&$orderby=ContactId`,
        timeoutMs,
      });
      contactsAttempts.push({
        url: page.url,
        status: page.status,
        ok: page.ok,
        responsePreview: page.text.slice(0, 100),
      });
      if (!page.ok) break;
      scanRows(readResults(page.json));
    }

    const selectedContact = matchedContacts[0] || null;
    let contactCertsRaw = null;
    let contactCerts = [];
    let contactCertsEndpoint = null;
    let contactCertsStatus = null;

    if (selectedContact?.contactId) {
      const certsRes = await getJson({
        baseUrl,
        apiKey,
        path: `/api/contactoverview/${selectedContact.contactId}/certifications`,
        timeoutMs,
      });
      contactCertsRaw = certsRes.text;
      contactCertsEndpoint = certsRes.url;
      contactCertsStatus = certsRes.status;
      if (certsRes.ok) {
        contactCerts = readResults(certsRes.json).map(normalizeContactCert);
      }
    }

    return res.status(200).json({
      ok: true,
      checkedAt: new Date().toISOString(),
      email,
      certificationTypeIdFilter: Number.isFinite(certTypeIdFilter) ? certTypeIdFilter : null,
      certifications: {
        sourceEndpoint: certChosen.url,
        rows: filteredCertRows,
        attempts: certAttempts.map((attempt) => ({
          url: attempt.url,
          status: attempt.status,
          ok: attempt.ok,
          responsePreview: attempt.text.slice(0, 140),
        })),
      },
      certificationComponents: componentAttemptsByType,
      contactLookup: {
        totalAvailable,
        matchedContacts,
        selectedContact,
        attempts: contactsAttempts,
      },
      contactCertifications: {
        sourceEndpoint: contactCertsEndpoint,
        status: contactCertsStatus,
        rows: contactCerts,
        growthzoneRawText: contactCertsRaw,
      },
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error?.name === 'AbortError' ? 'Request timed out' : error?.message || 'Request failed',
    });
  }
}
