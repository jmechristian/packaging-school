import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CenteredTextHeader from '../components/layout/CenteredTextHeader';
import CMPMWrapperFree from '../components/forms/cmpm/CMPMWrapperFree';
import Meta from '../components/shared/Meta';
import { createFreeCmpmForm } from '../helpers/api';
import Loader from '../components/shared/Loader';

const Page = () => {
  const router = useRouter();
  const params = router.query ? router.query : null;
  const [formId, setFormId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const createNewForm = async () => {
      setIsLoading(true);
      const form = await createFreeCmpmForm();
      setFormId(form.id);
      router.push(`/forms/cmpm/${form.id}`);
      setIsLoading(false);
    };
    createNewForm();
  }, []);

  return (
    <>
      <Meta
        title={
          'Certificate of Mastery in Packaging Management Student Application'
        }
        description={
          'Stand out with a tangible solution for management and peers. Start below, share about you, and submit. Get a confirmation in 1-3 days. Excited to explore packaging opportunities together!'
        }
      />
      <div className='flex flex-col gap-16 md:gap-16'>
        <CenteredTextHeader
          headline='Certificate of Mastery in Packaging Management'
          heading='Student Application'
          subhead='Distinguish yourself from your colleagues by acquiring a tangible solution that can be presented to both management and peers. Take your first step below and tell us a little bit about yourself to proceed with your application. You will receive a confirmation email within 1-3 business days of your complete application submission. We are looking forward to getting to know you better and can not wait to share our perspective with you on how packaging is an awesome industry full of opportunity.'
        />
        {isLoading ? (
          <div className='flex justify-center items-center h-full'>
            <Loader />
          </div>
        ) : (
          <CMPMWrapperFree params={params} free={true} />
        )}
      </div>
    </>
  );
};

export default Page;
