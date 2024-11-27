import React from 'react';

const Mission = () => {
  return (
    <div className='mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8'>
      <div className='mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8'>
        <h1 className='max-w-2xl text-4xl font-bold font-greycliff tracking-tight text-gray-900 sm:text-5xl lg:col-span-2 xl:col-auto'>
          Our mission is to provide accessible and applicable online education
          to a global audience by training the leaders of tomorrow in the art
          and science of packaging.
        </h1>
        <div className='mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1'>
          <p className='text-lg leading-8 text-gray-600'>
            The Packaging School bridges the gap between academia and industry
            by partnering with companies, subject matter experts and
            associations to create a shared learning management system. Our
            expanded catalog will enable knowledge-seekers to connect with
            knowledge-providers in all facets of packaging and processing.
          </p>
          <a
            href='mailto:info@packagingschool.com?subject=Get%20in%20touch%20with%20the%20Packaging%20School'
            className='mt-4 w-1/2 text-center font-bold inline-block bg-clemson px-4 py-2 text-white hover:bg-clemson/80'
          >
            Contact Us
          </a>
        </div>
        <img
          src='https://packschool.s3.amazonaws.com/partner-3.webp'
          alt=''
          className='mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36'
        />
      </div>
    </div>
  );
};

export default Mission;
