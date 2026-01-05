import React from 'react';
import Head from 'next/head';

function toAbsoluteUrl(inputUrl, siteUrl) {
  if (!inputUrl) return null;
  if (typeof inputUrl !== 'string') return null;

  // Already absolute
  if (inputUrl.startsWith('http://') || inputUrl.startsWith('https://')) {
    return inputUrl;
  }

  // Protocol-relative
  if (inputUrl.startsWith('//')) {
    return `https:${inputUrl}`;
  }

  // Root-relative or relative paths
  const base = (siteUrl || '').replace(/\/+$/, '');
  const path = inputUrl.startsWith('/') ? inputUrl : `/${inputUrl}`;
  return base ? `${base}${path}` : path;
}

const Meta = ({
  title,
  image,
  description,
  keywords,
  course,
  breadcrumb,
  url,
  type = 'website',
  siteName = 'PackagingSchool.com',
}) => {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://packagingschool.com';
  const canonicalUrl = toAbsoluteUrl(url, siteUrl);
  const ogImageUrl = toAbsoluteUrl(image, siteUrl);
  const twitterCard = ogImageUrl ? 'summary_large_image' : 'summary';

  return (
    <Head>
      {breadcrumb && (
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
        />
      )}
      {course && (
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(course) }}
        />
      )}
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <title>{title}</title>
      {description && <meta name='description' content={description} />}
      {keywords && <meta name='keywords' content={keywords} />}
      <meta name='robots' content='index, follow' />
      <meta
        name='google-site-verification'
        content='0J1SRWS-xIM_nHRIochuPhFVG-Yfa3lPy3Y7qoAsx8Y'
      />

      {canonicalUrl && <link rel='canonical' href={canonicalUrl} />}

      {/* <!-- Open Graph / Facebook --> */}
      <meta property='og:type' content={type} />
      <meta property='og:title' content={title} />
      {description && <meta property='og:description' content={description} />}
      {canonicalUrl && <meta property='og:url' content={canonicalUrl} />}
      <meta property='og:site_name' content={siteName} />
      {ogImageUrl && (
        <>
          <meta property='og:image' content={ogImageUrl} />
          <meta property='og:image:secure_url' content={ogImageUrl} />
          <meta property='og:image:alt' content={title} />
        </>
      )}

      {/* Twitter */}
      <meta name='twitter:card' content={twitterCard} />
      <meta name='twitter:title' content={title} />
      {description && <meta name='twitter:description' content={description} />}
      {ogImageUrl && <meta name='twitter:image' content={ogImageUrl} />}
    </Head>
  );
};

export default Meta;
