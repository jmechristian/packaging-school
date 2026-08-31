const EXTERNAL_REDIRECT_PREFIX = '/api/auth/external-redirect?returnTo=';

function unwrapReturnToParam(value) {
  if (!value || typeof value !== 'string') return null;
  const marker = 'returnTo=';
  const idx = value.indexOf(marker);
  if (idx === -1) return null;
  const raw = value.slice(idx + marker.length).split('&')[0];
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

// Pull a Thinkific URL out of Auth0/legacy returnTo values. Auth0 itself
// should only ever see internal paths; this unwraps leftovers and the
// same-origin /api/auth/external-redirect?returnTo= handoff.
export function getLmsUrlFromReturnTo(returnTo) {
  if (!returnTo || typeof returnTo !== 'string') return null;

  if (returnTo.includes('/api/auth/external-redirect?returnTo=')) {
    const unwrapped = unwrapReturnToParam(returnTo);
    if (unwrapped) return unwrapped;
  }

  if (returnTo.includes('learn.packagingschool.com')) {
    if (returnTo.startsWith('http')) return returnTo;
    try {
      const url = new URL(returnTo, 'https://packagingschool.com');
      if (url.pathname === '/api/auth/external-redirect') {
        return unwrapReturnToParam(returnTo);
      }
    } catch {
      // fall through
    }
    return returnTo;
  }

  return null;
}

export function toAuth0CallbackReturnTo(returnTo) {
  const lmsUrl = getLmsUrlFromReturnTo(returnTo);
  if (lmsUrl) {
    return `${EXTERNAL_REDIRECT_PREFIX}${encodeURIComponent(lmsUrl)}`;
  }
  return returnTo || '/profile';
}

export function getPendingReturnToFromRequest(req) {
  const header = req?.headers?.cookie;
  if (!header) return null;
  const match = header
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith('pendingReturnTo='));
  if (!match) return null;
  const raw = match.slice('pendingReturnTo='.length);
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

export function pendingReturnToCookie(lmsUrl, { clear = false } = {}) {
  if (clear) {
    return 'pendingReturnTo=; Path=/; Max-Age=0; SameSite=Lax';
  }
  return `pendingReturnTo=${encodeURIComponent(
    lmsUrl,
  )}; Path=/; Max-Age=900; SameSite=Lax`;
}
