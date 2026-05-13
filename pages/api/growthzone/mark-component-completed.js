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

async function fetchJson(url, options, timeoutMs) {
  const response = await requestWithTimeout(url, options, timeoutMs);
  const text = await response.text();
  let json;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = null;
  }
  return { response, text, json };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed. Use POST.' });
  }

  const baseUrl = trimSlash(process.env.GROWTHZONE_BASE_URL);
  const apiKey = process.env.GROWTHZONE_API_KEY;
  const timeoutMs = Number(req.body?.timeoutMs) > 0 ? Number(req.body.timeoutMs) : DEFAULT_TIMEOUT_MS;
  const certificationContactId = Number(req.body?.certificationContactId);
  const certificationComponentId = Number(req.body?.certificationComponentId);

  if (!baseUrl || !apiKey) {
    return res.status(500).json({
      message: 'Missing GrowthZone env config',
      requiredEnvVars: ['GROWTHZONE_BASE_URL', 'GROWTHZONE_API_KEY'],
    });
  }

  if (!Number.isFinite(certificationContactId) || certificationContactId <= 0) {
    return res.status(400).json({
      ok: false,
      message: 'certificationContactId is required',
    });
  }

  if (!Number.isFinite(certificationComponentId) || certificationComponentId <= 0) {
    return res.status(400).json({
      ok: false,
      message: 'certificationComponentId is required',
    });
  }

  const progressPath = `/api/certifications/progress/${certificationContactId}/?$skip=0&$top=50`;
  const savePath = `/api/certifications/saveprogress/${certificationContactId}/`;
  const progressUrl = `${baseUrl}${progressPath}`;
  const saveUrl = `${baseUrl}${savePath}`;
  const nowIso = new Date().toISOString();

  try {
    const progressRes = await fetchJson(
      progressUrl,
      {
        method: 'GET',
        headers: getHeaders(apiKey),
      },
      timeoutMs
    );

    if (!progressRes.response.ok || !progressRes.json || typeof progressRes.json !== 'object') {
      return res.status(progressRes.response.status || 500).json({
        ok: false,
        checkedAt: new Date().toISOString(),
        message: 'Failed to load progress model before save',
        sourceEndpoint: progressUrl,
        status: progressRes.response.status,
        growthzoneRawText: progressRes.text,
        growthzoneRawObject: progressRes.json,
      });
    }

    const model = progressRes.json;
    const items = Array.isArray(model.ListViewItems) ? model.ListViewItems : [];
    const targetItem = items.find(
      (item) => Number(item?.CertificationComponentId) === certificationComponentId
    );

    if (!targetItem) {
      return res.status(404).json({
        ok: false,
        checkedAt: new Date().toISOString(),
        message: 'Component not found in progress model for this certificationContactId',
        sourceEndpoint: progressUrl,
        certificationContactId,
        certificationComponentId,
        availableComponentIds: items.map((item) => item?.CertificationComponentId).filter(Boolean),
        growthzoneRawText: progressRes.text,
      });
    }
    const beforeState = {
      certificationContactActivityId: targetItem?.CertificationContactActivityId ?? null,
      completed: Boolean(targetItem?.Completed),
      activityDate: targetItem?.ActivityDate ?? null,
      creditsEarned: targetItem?.CreditsEarned ?? null,
      hoursEarned: targetItem?.HoursEarned ?? null,
    };

    const updatedItem = {
      ...targetItem,
      Completed: true,
      CompletedChanged: true,
      ActivityDate: nowIso,
    };
    if (req.body?.creditsEarned !== undefined && req.body?.creditsEarned !== null) {
      updatedItem.CreditsEarned = Number(req.body.creditsEarned);
    }
    if (req.body?.hoursEarned !== undefined && req.body?.hoursEarned !== null) {
      updatedItem.HoursEarned = Number(req.body.hoursEarned);
    }

    const updatedItems = items.map((item) =>
      Number(item?.CertificationComponentId) === certificationComponentId ? updatedItem : item
    );
    const updatedModel = {
      ...model,
      forceSave: false,
      ListViewItems: updatedItems,
    };
    const savePayload = {
      ListViewPages: {
        0: updatedModel,
      },
      ...updatedModel,
    };

    const saveRes = await fetchJson(
      saveUrl,
      {
        method: 'POST',
        headers: getHeaders(apiKey),
        body: JSON.stringify(savePayload),
      },
      timeoutMs
    );

    let afterState = null;
    let afterProgressRawText = null;
    if (saveRes.response.ok) {
      const verifyRes = await fetchJson(
        progressUrl,
        {
          method: 'GET',
          headers: getHeaders(apiKey),
        },
        timeoutMs
      );
      afterProgressRawText = verifyRes.text;
      const verifyItems = Array.isArray(verifyRes?.json?.ListViewItems) ? verifyRes.json.ListViewItems : [];
      const verifyItem = verifyItems.find(
        (item) => Number(item?.CertificationComponentId) === certificationComponentId
      );
      if (verifyItem) {
        afterState = {
          certificationContactActivityId: verifyItem?.CertificationContactActivityId ?? null,
          completed: Boolean(verifyItem?.Completed),
          activityDate: verifyItem?.ActivityDate ?? null,
          creditsEarned: verifyItem?.CreditsEarned ?? null,
          hoursEarned: verifyItem?.HoursEarned ?? null,
        };
      }
    }

    const changed = Boolean(
      afterState &&
        (beforeState.completed !== afterState.completed ||
          beforeState.certificationContactActivityId !== afterState.certificationContactActivityId ||
          beforeState.activityDate !== afterState.activityDate ||
          beforeState.creditsEarned !== afterState.creditsEarned ||
          beforeState.hoursEarned !== afterState.hoursEarned)
    );

    return res.status(saveRes.response.ok ? 200 : saveRes.response.status).json({
      ok: saveRes.response.ok,
      checkedAt: new Date().toISOString(),
      sourceEndpoint: saveUrl,
      status: saveRes.response.status,
      growthzoneRawText: saveRes.text,
      growthzoneRawObject: saveRes.json,
      progressSourceEndpoint: progressUrl,
      progressRawText: progressRes.text,
      beforeState,
      afterState,
      changed,
      afterProgressRawText,
      payloadSent: savePayload,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      sourceEndpoint: saveUrl,
      message: error?.name === 'AbortError' ? 'Request timed out' : error?.message || 'Request failed',
    });
  }
}
