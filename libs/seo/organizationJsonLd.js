const compact = (obj) =>
  Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => {
      if (v == null) return false;
      if (Array.isArray(v) && v.length === 0) return false;
      if (typeof v === 'string' && v.trim() === '') return false;
      return true;
    })
  );

const SOCIAL_LINKS = [
  'https://www.facebook.com/packagingschool/',
  'https://twitter.com/PackagingSchool',
  'https://www.linkedin.com/school/the-packaging-school-llc',
  'https://www.youtube.com/packagingschool',
  'https://www.instagram.com/packagingschool/',
  'https://www.tiktok.com/@thepackagingschool',
];

export function buildHomeJsonLd(siteUrl) {
  const baseUrl = siteUrl || 'https://packagingschool.com';

  const organization = compact({
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${baseUrl}/#organization`,
    name: 'Packaging School',
    alternateName: 'The Packaging School',
    url: baseUrl,
    logo: `${baseUrl}/logos/logo-sq-wh.svg`,
    image: `${baseUrl}/default-seo.jpg`,
    description:
      'The Packaging School brings together the business, art, and science of packaging so you can lead projects, optimize supply chains, increase margins, and develop sustainable solutions.',
    telephone: '+1-864-412-5000',
    email: 'info@packagingschool.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Greenville',
      addressRegion: 'SC',
      addressCountry: 'US',
    },
    sameAs: SOCIAL_LINKS,
  });

  const website = compact({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    url: baseUrl,
    name: 'Packaging School',
    publisher: { '@id': `${baseUrl}/#organization` },
  });

  return { organization, website };
}

/**
 * Build a simple BreadcrumbList schema for a static page.
 * @param {Array<{ name: string, path?: string }>} crumbs - trail after Home, e.g. [{ name: 'About', path: '/about' }]
 * @param {string} siteUrl
 */
export function buildBreadcrumbJsonLd(crumbs, siteUrl) {
  const baseUrl = siteUrl || 'https://packagingschool.com';
  const items = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
    ...(crumbs || []).map((crumb, idx) => ({
      '@type': 'ListItem',
      position: idx + 2,
      name: crumb.name,
      item: crumb.path ? `${baseUrl}${crumb.path}` : undefined,
    })),
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}

/**
 * Build an ItemList schema from a flat list of { name, url } entries.
 * Intended for lightweight listing pages (e.g. /all_courses) where full item
 * detail is fetched client-side but crawlers still benefit from a real list.
 * @param {Array<{ name: string, url: string }>} items
 * @param {string} siteUrl
 * @param {{ name?: string }} [opts]
 */
export function buildItemListJsonLd(items, siteUrl, opts = {}) {
  const baseUrl = siteUrl || 'https://packagingschool.com';
  const validItems = (items || []).filter((item) => item?.name && item?.url);
  if (!validItems.length) return null;

  const toAbsoluteUrl = (url) =>
    url.startsWith('http')
      ? url
      : `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;

  return compact({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: opts.name,
    numberOfItems: validItems.length,
    itemListElement: validItems.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      url: toAbsoluteUrl(item.url),
    })),
  });
}

const stripHtml = (value) =>
  value
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

/**
 * Build a FAQPage schema from a flat list of { question, answer } entries.
 * Only string answers are included (JSX/rich-text-as-elements answers are
 * skipped); HTML markup within string answers is stripped down to plain text.
 * @param {Array<{ question: string, answer: string }>} faqs
 */
export function buildFaqJsonLd(faqs) {
  const validFaqs = (faqs || []).filter(
    (faq) =>
      faq?.question &&
      typeof faq.question === 'string' &&
      faq?.answer &&
      typeof faq.answer === 'string',
  );
  if (!validFaqs.length) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: validFaqs.map((faq) => ({
      '@type': 'Question',
      name: stripHtml(faq.question),
      acceptedAnswer: {
        '@type': 'Answer',
        text: stripHtml(faq.answer),
      },
    })),
  };
}
