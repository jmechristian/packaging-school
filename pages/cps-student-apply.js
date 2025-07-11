import React, { useEffect, useState } from 'react';
import CenteredTextHeader from '../components/layout/CenteredTextHeader';
import { useRouter } from 'next/router';
import CPSWrapperFree from '../components/forms/cps/CPSWrapperFree';
import Meta from '../components/shared/Meta';
import { createFreeCpsForm } from '../helpers/api';
import Loader from '../components/shared/Loader';

const Page = () => {
  const router = useRouter();
  const params = router.query ? router.query : null;
  const [formId, setFormId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const createNewForm = async () => {
      setIsLoading(true);
      const form = await createFreeCpsForm();
      setFormId(form.id);
      router.push(`/forms/cps/${form.id}`);
      setIsLoading(false);
    };
    createNewForm();
  }, []);

  return (
    <>
      <Meta
        title={'Certificate of Packaging Science Student Application'}
        description={
          'Boost your packaging career with 24/7 access to essential tools and content. Ideal for onboarding, career growth, and retention. Empower success now!'
        }
      />
      <div className='flex flex-col gap-16 md:gap-16'>
        <CenteredTextHeader
          headline='Certificate of Packaging Science'
          heading='Student Application'
          subhead='Empower yourself with the essential tools for success in the packaging profession, providing 24/7 access to review relevant content on-demand. Set your employees up for success, supporting their career advancement, and utilize this program for effective onboarding and retention strategies.'
        />
        {isLoading ? (
          <div className='flex justify-center items-center h-full'>
            <Loader />
          </div>
        ) : (
          <CPSWrapperFree params={params} free={true} />
        )}
      </div>
    </>
  );
};

export default Page;
