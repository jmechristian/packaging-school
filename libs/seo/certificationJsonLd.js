const asNumber = (val) => {
  if (val == null) return undefined;
  const n = Number(String(val).replace(/[^\d.]/g, ''));
  return Number.isFinite(n) ? n : undefined;
};

const compact = (obj) =>
  Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => {
      if (v == null) return false;
      if (Array.isArray(v) && v.length === 0) return false;
      if (typeof v === 'string' && v.trim() === '') return false;
      return true;
    })
  );

const toAbsoluteUrl = (inputUrl, siteUrl) => {
  if (!inputUrl) return null;
  if (typeof inputUrl !== 'string') return null;
  if (inputUrl.startsWith('http://') || inputUrl.startsWith('https://')) {
    return inputUrl;
  }
  const base = (siteUrl || '').replace(/\/+$/, '');
  const path = inputUrl.startsWith('/') ? inputUrl : `/${inputUrl}`;
  return base ? `${base}${path}` : path;
};

export function buildCertificationJsonLd(cert, siteUrl) {
  if (!cert) return { credential: null, breadcrumb: null };
  const baseUrl = siteUrl || 'https://packagingschool.com';
  const link = cert.link || cert.applicationLink || cert.purchaseLink;
  const url = toAbsoluteUrl(link, baseUrl) || `${baseUrl}/certifications`;
  const image = cert.seoImage ? [cert.seoImage] : undefined;

  const offers = [];
  const oneTimePrice = asNumber(cert.price);
  if (oneTimePrice != null) {
    offers.push({
      '@type': 'Offer',
      url,
      price: String(oneTimePrice),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    });
  }

  const credential = compact({
    '@context': 'https://schema.org',
    '@type': 'EducationalOccupationalCredential',
    '@id': `${url}#credential`,
    url,
    name: cert.title,
    description: cert.description || cert.callout,
    image,
    educationalLevel: cert.category?.items
      ?.map((c) => c?.category?.name || c?.category?.value)
      .filter(Boolean),
    timeRequired: cert.hours ? `PT${cert.hours}H` : undefined,
    offers: offers.length === 1 ? offers[0] : offers.length ? offers : undefined,
    provider: {
      '@type': 'Organization',
      name: 'Packaging School',
      url: baseUrl,
    },
    applicationContact: cert.applicationLink
      ? toAbsoluteUrl(cert.applicationLink, baseUrl)
      : undefined,
  });

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Certifications',
        item: `${baseUrl}/certifications`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: cert.title,
        item: url,
      },
    ],
  };

  return { credential, breadcrumb };
}
