import React from 'react';
import Staff from '../components/about/Staff';
import Mission from '../components/about/Mission';
import GradientCTA from '../components/GradientCTA';
import { Amplify, API } from 'aws-amplify';
import { listStaff } from '../src/graphql/queries';
import awsExports from '../src/aws-exports';
import Timeline from '../components/about/Timeline';
import Meta from '../components/shared/Meta';
import { generateMetadata } from '../libs/seo/generateMetadata';

Amplify.configure(awsExports);

const Page = ({ pageData }) => {
  const metadata = generateMetadata({
    pageType: 'STATIC',
    pathname: '/about',
    title: 'About Packaging School',
    description:
      'The Packaging School bridges the gap between academia and industry by partnering with companies, subject matter experts and associations to create a shared learning management system. Our expanded catalog connects knowledge-seekers with knowledge-providers in packaging and processing.',
  });

  return (
    <>
      <Meta
        title={metadata.title}
        description={metadata.description}
        url='/about'
        image='https://packschool.s3.amazonaws.com/about-seoImage.webp'
      />
      <Mission />
      <Staff staff={pageData.listStaff.items} />
      <Timeline />
      <GradientCTA
        headline='Ready to Elevate Your Career?'
        subheadline='Try a demo, risk-free.'
        buttonText='Get Started For Free'
        secondaryButtonText='Need More Info?'
        buttonLink={'/all_courses'}
      />
    </>
  );
};

export const getServerSideProps = async () => {
  const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT;
  const GRAPHQL_API_KEY = process.env.GRAPHQL_API_KEY;
  const res = await API.graphql({
    query: listStaff,
  });
  const pageData = res.data;

  // Pass data to the page via props
  return { props: { pageData } };
};

export default Page;
