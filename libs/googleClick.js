// Google Ads click ids (gclid / gbraid / wbraid) have to outlive the 6-hour
// session cookie. A buyer often clicks an ad, leaves, and purchases on a later
// visit. The click id is stored for 90 days and copied onto later events.
// Purchase Confirmed's click-through window is 30 days, so a stored id is only
// eligible for upload when the click itself is still inside that window.

export const AB_GOOGLE_CLICK_COOKIE = 'ps_ab_google_click';
export const GOOGLE_CLICK_KEYS = ['gclid', 'gbraid', 'wbraid'];
export const GOOGLE_CLICK_MAX_AGE_SECONDS = 60 * 60 * 24 * 90;
export const GOOGLE_CLICK_LOOKBACK_MS = 30 * 24 * 60 * 60 * 1000;
const CLICK_FUTURE_GRACE_MS = 5 * 60 * 1000;

export function googleClickRecordFromSearch(params, capturedAt = new Date().toISOString()) {
  if (!params || typeof params.get !== 'function') return null;
  for (const key of GOOGLE_CLICK_KEYS) {
    const value = params.get(key);
    if (value) return { key, value: String(value), capturedAt };
  }
  return null;
}

export function parseGoogleClickRecord(raw, nowMs = Date.now()) {
  if (!raw) return null;

  let parsed = null;
  try {
    parsed = JSON.parse(raw);
  } catch {
    try {
      parsed = JSON.parse(decodeURIComponent(raw));
    } catch {
      return null;
    }
  }

  if (!parsed || typeof parsed !== 'object') return null;
  if (!GOOGLE_CLICK_KEYS.includes(parsed.key) || !parsed.value) return null;

  const capturedAtMs = Date.parse(parsed.capturedAt || '');
  if (!Number.isFinite(capturedAtMs)) return null;
  if (capturedAtMs > nowMs + CLICK_FUTURE_GRACE_MS) return null;
  if (nowMs - capturedAtMs > GOOGLE_CLICK_MAX_AGE_SECONDS * 1000) return null;

  return {
    key: parsed.key,
    value: String(parsed.value),
    capturedAt: new Date(capturedAtMs).toISOString(),
  };
}

// A click id already on this visit wins. Otherwise the stored click is attached
// along with the time it was first seen, so a later purchase can tell whether
// the click is still inside the Ads window.
export function mergeClickIds(clickIds, record) {
  const current =
    clickIds && typeof clickIds === 'object' && !Array.isArray(clickIds)
      ? { ...clickIds }
      : {};
  const hasGoogle = GOOGLE_CLICK_KEYS.some((key) => current[key]);

  if (hasGoogle) {
    if (
      record &&
      current[record.key] === record.value &&
      !current.googleClickCapturedAt &&
      record.capturedAt
    ) {
      current.googleClickCapturedAt = record.capturedAt;
    }
    return current;
  }

  if (!record?.key || !record?.value) {
    return Object.keys(current).length ? current : null;
  }

  return {
    ...current,
    [record.key]: record.value,
    ...(record.capturedAt ? { googleClickCapturedAt: record.capturedAt } : {}),
  };
}

function parseMetadata(raw) {
  if (!raw) return {};
  if (typeof raw === 'object') return raw;
  try {
    const first = JSON.parse(raw);
    if (typeof first === 'string') {
      try {
        const second = JSON.parse(first);
        return second && typeof second === 'object' ? second : {};
      } catch {
        return {};
      }
    }
    return first && typeof first === 'object' ? first : {};
  } catch {
    return {};
  }
}

function readClickId(metadata) {
  const meta = parseMetadata(metadata);
  let clickIds = meta.clickIds;
  if (typeof clickIds === 'string') {
    try {
      clickIds = JSON.parse(clickIds);
    } catch {
      clickIds = null;
    }
  }
  if (!clickIds || typeof clickIds !== 'object') return null;

  for (const key of GOOGLE_CLICK_KEYS) {
    if (clickIds[key]) {
      const capturedAtMs = Date.parse(clickIds.googleClickCapturedAt || '');
      return {
        key,
        value: String(clickIds[key]),
        capturedAtMs: Number.isFinite(capturedAtMs) ? capturedAtMs : null,
      };
    }
  }
  return null;
}

// Prefer the matched checkout intent. Otherwise take the newest click id at or
// before the purchase whose click time is still inside the 30-day Ads window.
export function pickGoogleClickId(events, { anchorMs, matchedIntentId } = {}) {
  const anchor = Number.isFinite(anchorMs) ? anchorMs : Date.now();
  const earliest = anchor - GOOGLE_CLICK_LOOKBACK_MS;

  const usable = (Array.isArray(events) ? events : []).filter((event) => {
    const ms = Date.parse(event?.createdAt || '');
    if (!Number.isFinite(ms)) return false;
    if (ms > anchor + CLICK_FUTURE_GRACE_MS) return false;
    const click = readClickId(event?.metadata);
    if (!click) return false;
    const clickMs = click.capturedAtMs || ms;
    return clickMs >= earliest && clickMs <= anchor + CLICK_FUTURE_GRACE_MS;
  });

  const ordered = [];
  if (matchedIntentId) {
    const intent = usable.find((event) => event?.id === matchedIntentId);
    if (intent) ordered.push(intent);
  }
  const rest = usable
    .filter((event) => event?.id !== matchedIntentId)
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
  ordered.push(...rest);

  const chosen = ordered[0];
  if (!chosen) return null;
  const click = readClickId(chosen.metadata);
  if (!click) return null;
  return {
    key: click.key,
    value: click.value,
    eventId: chosen.id || null,
    capturedAt: click.capturedAtMs ? new Date(click.capturedAtMs).toISOString() : chosen.createdAt,
  };
}
