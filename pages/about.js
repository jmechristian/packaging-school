import React from 'react';
import Staff from '../components/about/Staff';
import Mission from '../components/about/Mission';
import TestimonialsCallout from '../components/about/TestimonialsCallout';
import GradientCTA from '../components/GradientCTA';
import Timeline from '../components/about/Timeline';
import Meta from '../components/shared/Meta';
import { generateMetadata } from '../libs/seo/generateMetadata';
import {
  buildHomeJsonLd,
  buildBreadcrumbJsonLd,
} from '../libs/seo/organizationJsonLd';
import { listStaff } from '../src/graphql/queries';

const Page = ({ pageData }) => {
  const metadata = generateMetadata({
    pageType: 'STATIC',
    pathname: '/about',
    title: 'About Packaging School',
    description:
      'The Packaging School bridges the gap between academia and industry by partnering with companies, subject matter experts and associations to create a shared learning management system. Our expanded catalog connects knowledge-seekers with knowledge-providers in packaging and processing.',
  });

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://packagingschool.com';
  const { organization, website } = buildHomeJsonLd(siteUrl);
  const breadcrumb = buildBreadcrumbJsonLd(
    [{ name: 'About', path: '/about' }],
    siteUrl,
  );

  return (
    <>
      <Meta
        title={metadata.title}
        description={metadata.description}
        url='/about'
        image='https://packschool.s3.us-east-1.amazonaws.com/Team+Photo+2025+APS+compressed.png'
        structuredData={[organization, website, breadcrumb]}
      />
      <Mission />
      <TestimonialsCallout />
      <Staff staff={pageData?.listStaff?.items ?? []} />
      <Timeline />
      <GradientCTA
        headline='Ready to Elevate Your Career?'
        subheadline='Try a demo, risk-free.'
        buttonText='Get Started For Free'
        secondaryButtonText='Need More Info?'
        buttonLink='/all_courses'
      />
    </>
  );
};

export const getServerSideProps = async ({ res }) => {
  const { Amplify, API } = await import('aws-amplify');
  const awsExports = (await import('../src/aws-exports')).default;
  Amplify.configure(awsExports);

  res.setHeader('Cache-Control', 'no-store, must-revalidate');

  try {
    const items = [];
    let nextToken = null;

    do {
      const response = await API.graphql({
        query: listStaff,
        variables: { limit: 100, nextToken },
      });
      items.push(...(response.data?.listStaff?.items ?? []));
      nextToken = response.data?.listStaff?.nextToken ?? null;
    } while (nextToken);

    return {
      props: { pageData: { listStaff: { items } } },
    };
  } catch (err) {
    console.error('getServerSideProps /about error:', err);
    return {
      props: { pageData: { listStaff: { items: [] } } },
    };
  }
};

export default Page;
