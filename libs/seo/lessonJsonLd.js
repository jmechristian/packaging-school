const compact = (obj) =>
  Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => {
      if (v == null) return false;
      if (Array.isArray(v) && v.length === 0) return false;
      if (typeof v === 'string' && v.trim() === '') return false;
      return true;
    })
  );

export function buildLessonJsonLd(lesson, siteUrl) {
  if (!lesson || !lesson.slug) {
    return { article: null, breadcrumb: null };
  }

  const baseUrl = siteUrl || 'https://packagingschool.com';
  const url = `${baseUrl}/lessons/${lesson.slug}`;
  const image = lesson.seoImage ? [lesson.seoImage] : undefined;
  const published = lesson.backdate || lesson.updatedAt;
  const modified = lesson.updatedAt || lesson.backdate;
  const tags =
    lesson.tags?.items?.map((tagWrapper) => tagWrapper?.tags?.tag).filter(Boolean) ||
    [];

  const article = compact({
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    mainEntityOfPage: url,
    url,
    headline: lesson.title,
    description: lesson.subhead || lesson.content,
    image,
    author: lesson.author
      ? { '@type': 'Person', name: lesson.author }
      : { '@type': 'Organization', name: 'Packaging School' },
    publisher: {
      '@type': 'Organization',
      name: 'Packaging School',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/favicon.ico`,
      },
    },
    datePublished: published,
    dateModified: modified,
    articleSection: tags,
    keywords: tags.length ? tags.join(', ') : undefined,
    articleBody: lesson.content,
  });

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Lessons',
        item: `${baseUrl}/lessons`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: lesson.title,
        item: url,
      },
    ],
  };

  return { article, breadcrumb };
}
