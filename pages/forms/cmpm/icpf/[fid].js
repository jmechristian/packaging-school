import React from 'react';
import { getIcpfCmpmForm } from '../../../../src/graphql/queries';
import { API } from 'aws-amplify';
import CenteredTextHeader from '../../../../components/layout/CenteredTextHeader';
import CMPMWrapper from '../../../../components/forms/cmpm/icpf/CMPMWrapper';
import Head from 'next/head';

const Page = ({ pageData }) => {
  return (
    <>
      <Head>
        <title>Packaging School | CMPM Form</title>
        <meta name='robots' content='noindex,nofollow' />
      </Head>
      <div className='flex flex-col gap-16 md:gap-16'>
        <CenteredTextHeader
          headline='Certificate of Mastery in Packaging Management'
          heading='Sponsored by ICPF'
          subhead='Whether you’re pursuing a STEAM major or exploring how your skills apply across industries, this program introduces you to the corrugated and packaging space and equips you with hands-on, real-world experience that helps you stand out and prepare for career success. Fill out the form below to get started. You will receive a confirmation email within 1–3 business days of your complete application submission. We are looking forward to getting to know you better and cannot wait to share our perspective with you on how packaging is an awesome industry full of opportunity.'
        />
        <CMPMWrapper params={pageData.getIcpfCmpmForm} />
      </div>
    </>
  );
};

export const getServerSideProps = async ({ params }) => {
  const { fid } = params;

  const res = await API.graphql({
    query: getIcpfCmpmForm,
    variables: { id: fid },
  });
  const pageData = res.data;
  console.log(pageData);

  // Pass data to the page via props
  return { props: { pageData } };
};

export default Page;
