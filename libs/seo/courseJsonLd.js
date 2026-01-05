// lib/seo/courseJsonLd.js

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

export function buildCourseJsonLd(course, siteUrl) {
  if (!course) {
    return { course: null, breadcrumb: null };
  }
  const url = `${siteUrl}/courses/${course.slug || course.id}`;
  const image = course.seoImage ? [course.seoImage] : undefined;

  // Offers (support one-time + subscription)
  const offers = [];

  const oneTimePrice = asNumber(course.price);
  if (oneTimePrice != null) {
    offers.push({
      '@type': 'Offer',
      url: course.stripeLink || course.link || url,
      price: String(oneTimePrice),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      category: 'OneTimePurchase',
    });
  }

  const subPrice = asNumber(course.subscriptionPrice);
  if (subPrice != null) {
    offers.push({
      '@type': 'Offer',
      url: course.subscriptionLink || course.link || url,
      price: String(subPrice),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      category: 'Subscription',
    });
  }

  // Optional preview video
  const video =
    typeof course.preview === 'string' && course.preview.includes('youtube.com')
      ? {
          '@type': 'VideoObject',
          name: `${course.title} – Course Preview`,
          description: course.shortDescription || course.subheadline,
          thumbnailUrl: image,
          uploadDate: course.createdAt,
          contentUrl: course.preview,
          embedUrl: course.preview.replace('watch?v=', 'embed/'),
        }
      : undefined;

  const courseJsonLd = compact({
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${url}#course`,
    url,
    name: course.title,
    description:
      course.shortDescription || course.subheadline || course.what_learned,
    image,
    about: [
      course.category,
      ...(course.categoryArray || []),
      ...(course.partOf || []),
    ].filter(Boolean),
    teaches: (course.objectives || []).filter(Boolean),
    provider: {
      '@type': 'Organization',
      name: 'Packaging School',
      url: siteUrl,
    },
    ...(offers.length
      ? { offers: offers.length === 1 ? offers[0] : offers }
      : {}),
    ...(course.hours
      ? { timeRequired: `PT${asNumber(course.hours) || course.hours}H` }
      : {}),
    ...(video ? { hasPart: video } : {}),
  });

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Courses',
        item: `${siteUrl}/courses`,
      },
      { '@type': 'ListItem', position: 3, name: course.title, item: url },
    ],
  };

  return {
    course: courseJsonLd,
    breadcrumb: breadcrumbJsonLd,
  };
}
