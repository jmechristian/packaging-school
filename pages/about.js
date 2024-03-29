import React from 'react';
import Head from 'next/head';
import Staff from '../components/about/Staff';
import Mission from '../components/about/Mission';
import GradientCTA from '../components/GradientCTA';
import { Amplify, API } from 'aws-amplify';
import { listStaff } from '../src/graphql/queries';
import awsExports from '../src/aws-exports';
import Timeline from '../components/about/Timeline';
import Meta from '../components/shared/Meta';
Amplify.configure(awsExports);

const Page = ({ pageData }) => {
  return (
    <>
      <Meta
        title={'About Packaging School'}
        description={
          'The Packaging School bridges the gap between academia and industry by partnering with companies, subject matter experts and associations to create a shared learning management system. Our expanded catalog will enable knowledge-seekers to connect with knowledge-providers in all facets of packaging and processing.'
        }
        image={'https://packschool.s3.amazonaws.com/about-seoImage.webp'}
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
