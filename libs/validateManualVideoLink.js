const ALLOWED_HOSTS = [
  'youtube.com',
  'youtu.be',
  'vimeo.com',
  'drive.google.com',
  'docs.google.com',
  'dropbox.com',
  'dropboxusercontent.com',
  'onedrive.live.com',
  '1drv.ms',
  'sharepoint.com',
  'loom.com',
  'wetransfer.com',
  'we.tl',
  'box.com',
  'icloud.com',
  'streamable.com',
  'frame.io',
];

const BLOCKED_PROTOCOLS = ['javascript:', 'data:', 'file:', 'vbscript:', 'blob:'];

const isAllowedHost = (hostname) => {
  const host = hostname.toLowerCase().replace(/^www\./, '');
  return ALLOWED_HOSTS.some(
    (allowed) => host === allowed || host.endsWith(`.${allowed}`)
  );
};

/**
 * Basic safety checks for user-provided video links.
 * Returns true when valid, or an error message string when invalid.
 * Empty values are treated as valid (presence is validated separately).
 */
export const validateManualVideoLink = (value) => {
  if (value == null || String(value).trim() === '') {
    return true;
  }

  const trimmed = String(value).trim();
  const lower = trimmed.toLowerCase();

  if (BLOCKED_PROTOCOLS.some((protocol) => lower.startsWith(protocol))) {
    return 'This link type is not allowed. Please use an https:// link.';
  }

  let parsed;
  try {
    parsed = new URL(trimmed);
  } catch {
    return 'Please enter a valid URL (including https://).';
  }

  if (parsed.protocol !== 'https:') {
    return 'Only https:// links are allowed.';
  }

  if (!isAllowedHost(parsed.hostname)) {
    return 'Please use a link from a supported host (YouTube, Vimeo, Google Drive, Dropbox, OneDrive, Loom, WeTransfer, Box, iCloud, or Streamable).';
  }

  return true;
};

export const MANUAL_VIDEO_LINK_HOSTS = ALLOWED_HOSTS;
