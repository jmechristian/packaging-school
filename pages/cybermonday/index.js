import React from 'react';
import Meta from '../../components/shared/Meta';
import CyberMonday from '../../components/shared/CyberMonday';
import {
  buildHomeJsonLd,
  buildBreadcrumbJsonLd,
} from '../../libs/seo/organizationJsonLd';

const Page = () => {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://packagingschool.com';
  const { organization, website } = buildHomeJsonLd(siteUrl);
  const breadcrumb = buildBreadcrumbJsonLd(
    [{ name: 'Cyber Monday', path: '/cybermonday' }],
    siteUrl,
  );

  return (
    <>
      <Meta
        title='10 Days of Deals'
        description='10 Days of Deals'
        url='/cybermonday'
        structuredData={[organization, website, breadcrumb]}
      />
      <CyberMonday />
    </>
  );
};

export default Page;
