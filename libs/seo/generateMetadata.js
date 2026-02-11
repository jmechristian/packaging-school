/**
 * Centralized metadata helper (Pages Router equivalent of generateMetadata).
 * Enforces length targets and provides fallbacks for all indexable pages.
 */

const SITE_NAME = 'Packaging School';
const DEFAULT_DESCRIPTION =
  'Explore packaging education at Packaging School.';

/** Truncate title to max chars, add ellipsis if truncated. Target 50-60 chars. */
export function truncateTitle(str, max = 60) {
  if (!str || typeof str !== 'string') return '';
  const trimmed = str.trim();
  if (trimmed.length <= max) return trimmed;
  return trimmed.slice(0, max - 1).trim() + '…';
}

/** Truncate meta description to max chars, add ellipsis if truncated. Target 120-155 chars. */
export function truncateDescription(str, max = 155) {
  if (!str || typeof str !== 'string') return '';
  const trimmed = str.trim();
  if (trimmed.length <= max) return trimmed;
  return trimmed.slice(0, max - 1).trim() + '…';
}

/**
 * Convert pathname to human-readable title.
 * /cmpm-vs-cps -> "CMPM vs CPS | Packaging School"
 * /about -> "About | Packaging School"
 */
export function pathnameToTitle(path) {
  if (!path || path === '/' || path === '') return SITE_NAME;

  const cleanPath = path.split('?')[0].split('#')[0].replace(/^\/|\/$/g, '');
  if (!cleanPath) return SITE_NAME;

  const segments = cleanPath.split('/').filter(Boolean);
  const lastSegment = segments[segments.length - 1] || '';

  const humanize = (str) => {
    return str
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  const pageTitle = humanize(lastSegment);
  return pageTitle ? `${pageTitle} | ${SITE_NAME}` : SITE_NAME;
}

/**
 * Generate metadata for a page.
 * @param {Object} opts
 * @param {string} opts.pageType - LESSON | COURSE | COLLECTION | PATH | LESSONS_INDEX | COURSES_INDEX | STATIC
 * @param {Object} opts.data - Page data (lesson, course, collection, path, career, etc.)
 * @param {string} opts.pathname - Current path (e.g. router.asPath)
 * @param {string} [opts.robots] - Override robots (e.g. "noindex, nofollow")
 * @param {string} [opts.title] - Direct title override (STATIC)
 * @param {string} [opts.description] - Direct description override (STATIC)
 */
export function generateMetadata(opts = {}) {
  const {
    pageType,
    data = {},
    pathname = '',
    robots = 'index, follow',
    title: titleOverride,
    description: descOverride,
  } = opts;

  const cleanPath = pathname ? pathname.split('?')[0].split('#')[0] : '';
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://packagingschool.com';
  const canonical = cleanPath ? `${siteUrl}${cleanPath.startsWith('/') ? '' : '/'}${cleanPath}` : siteUrl;

  let title = '';
  let description = '';

  switch (pageType) {
    case 'LESSON':
      title = data.title ? `${data.title} | ${SITE_NAME}` : pathnameToTitle(pathname);
      description = data.subhead || DEFAULT_DESCRIPTION;
      break;
    case 'COURSE':
      title = data.title ? `${data.title} | ${SITE_NAME}` : pathnameToTitle(pathname);
      description = data.subheadline || data.description || DEFAULT_DESCRIPTION;
      break;
    case 'COLLECTION':
      title = data.title ? `${data.title} | ${SITE_NAME}` : pathnameToTitle(pathname);
      description = data.description || DEFAULT_DESCRIPTION;
      break;
    case 'PATH':
      title = data.title ? `${data.title} | Learning Path | ${SITE_NAME}` : pathnameToTitle(pathname);
      description = data.description || DEFAULT_DESCRIPTION;
      break;
    case 'LESSONS_INDEX':
      title = `Lessons | ${SITE_NAME}`;
      description =
        'Browse the extensive catalog of Packaging School lessons covering Business, Design, Materials, Food and Beverage, Supply Chain, Automotive, and more.';
      break;
    case 'COURSES_INDEX':
      title = `Courses | ${SITE_NAME}`;
      description =
        'Explore Packaging School courses and certification programs for packaging professionals.';
      break;
    case 'CAREER':
      title = data.title ? `${data.title} | Careers | ${SITE_NAME}` : pathnameToTitle(pathname);
      description = data.subhead || DEFAULT_DESCRIPTION;
      break;
    case 'CATEGORY':
      title = data.name
        ? `${data.name} | Courses | ${SITE_NAME}`
        : pathnameToTitle(pathname);
      description = data.description || DEFAULT_DESCRIPTION;
      break;
    case 'STATIC':
    default:
      title = titleOverride || pathnameToTitle(pathname);
      description = descOverride || DEFAULT_DESCRIPTION;
      break;
  }

  return {
    title: truncateTitle(title) || SITE_NAME,
    description: truncateDescription(description) || truncateDescription(DEFAULT_DESCRIPTION),
    robots,
    canonical,
  };
}
