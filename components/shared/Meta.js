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
  const metaTitle = title || siteName;
  const metaDescription = description || '';

  // Always provide a concrete OG image so crawlers don't "infer" from random page images.
  // Replace with a proper share-sized PNG/JPG via the `image` prop when possible.
  const fallbackImage = '/favicon.png';
  const ogImageUrl = toAbsoluteUrl(image || fallbackImage, siteUrl);
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
      <meta
        key='viewport'
        name='viewport'
        content='width=device-width, initial-scale=1.0'
      />
      <title key='title'>{metaTitle}</title>
      {metaDescription && (
        <meta key='description' name='description' content={metaDescription} />
      )}
      {keywords && <meta name='keywords' content={keywords} />}
      <meta key='robots' name='robots' content='index, follow' />
      <meta
        key='google-site-verification'
        name='google-site-verification'
        content='0J1SRWS-xIM_nHRIochuPhFVG-Yfa3lPy3Y7qoAsx8Y'
      />

      {canonicalUrl && (
        <link key='canonical' rel='canonical' href={canonicalUrl} />
      )}

      {/* <!-- Open Graph / Facebook --> */}
      <meta key='og:type' property='og:type' content={type} />
      <meta key='og:title' property='og:title' content={metaTitle} />
      <meta
        key='og:description'
        property='og:description'
        content={metaDescription}
      />
      {canonicalUrl && (
        <meta key='og:url' property='og:url' content={canonicalUrl} />
      )}
      <meta key='og:site_name' property='og:site_name' content={siteName} />
      <meta key='og:image' property='og:image' content={ogImageUrl} />
      <meta
        key='og:image:secure_url'
        property='og:image:secure_url'
        content={ogImageUrl}
      />
      <meta key='og:image:alt' property='og:image:alt' content={metaTitle} />

      {/* Twitter */}
      <meta key='twitter:card' name='twitter:card' content={twitterCard} />
      <meta key='twitter:title' name='twitter:title' content={metaTitle} />
      <meta
        key='twitter:description'
        name='twitter:description'
        content={metaDescription}
      />
      <meta key='twitter:image' name='twitter:image' content={ogImageUrl} />
    </Head>
  );
};

export default Meta;
