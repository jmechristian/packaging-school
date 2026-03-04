import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  truncateTitle,
  truncateDescription,
} from '../../libs/seo/generateMetadata';

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
  structuredData,
  url,
  type = 'website',
  siteName = 'PackagingSchool.com',
  robots = 'index, follow',
  preloadImage,
}) => {
  const router = useRouter();
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://packagingschool.com';
  const resolvedPath = url || router?.asPath || null;
  const canonicalPath = resolvedPath
    ? resolvedPath.split('?')[0].split('#')[0]
    : null;
  const canonicalUrl = toAbsoluteUrl(canonicalPath, siteUrl);
  const metaTitle = truncateTitle(title || siteName) || siteName;
  const metaDescription = truncateDescription(description || '');

  // Default OG image for pages that don't pass `image`. Use a generic site image, not
  // a course/certificate-specific card. Pass the `image` prop on each page for correct
  // social previews (e.g. course/certificate/collection image).
  const DEFAULT_OG_IMAGE = '/default-seo.jpg';
  const ogImageUrl = toAbsoluteUrl(image || DEFAULT_OG_IMAGE, siteUrl);
  const twitterCard = ogImageUrl ? 'summary_large_image' : 'summary';

  const additionalSchemas = Array.isArray(structuredData)
    ? structuredData.filter(Boolean)
    : structuredData
      ? [structuredData]
      : [];

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
      {additionalSchemas.map((schema, idx) => (
        <script
          // eslint-disable-next-line react/no-array-index-key
          key={`structured-data-${idx}`}
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
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
      <meta key='robots' name='robots' content={robots} />
      <meta
        key='google-site-verification'
        name='google-site-verification'
        content='0J1SRWS-xIM_nHRIochuPhFVG-Yfa3lPy3Y7qoAsx8Y'
      />

      {canonicalUrl && (
        <link key='canonical' rel='canonical' href={canonicalUrl} />
      )}

      {preloadImage && (
        <link
          key='preload-lcp'
          rel='preload'
          as='image'
          href={toAbsoluteUrl(preloadImage, siteUrl)}
          fetchpriority='high'
        />
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
