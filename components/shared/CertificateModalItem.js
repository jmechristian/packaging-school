import React from 'react';
import { useRouter } from 'next/router';
import { PlayCircleIcon } from '@heroicons/react/24/outline';
const CertificateModalItem = ({ certificate, onSelectCertificate }) => {
  const router = useRouter();
  return (
    <div
      key={certificate.id}
      className='border rounded-lg p-4 space-y-4 hover:shadow-md transition-shadow'
    >
      <div className='flex justify-between items-center border-b  border-gray-200 pb-3'>
        <div>
          <h3 className='text-lg font-semibold text-gray-900'>
            <span className='text-gray-500'>{certificate.abbreviation}</span>{' '}
            {certificate.title}
          </h3>
        </div>
        <button
          onClick={() => router.push(certificate.purchaseLink)}
          className='bg-clemson font-medium text-sm text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors'
        >
          Enroll Now
        </button>
      </div>
      <div>
        <p className='text-gray-600 text-sm border-b pb-2 border-gray-200 w-full'>
          {certificate.description}
        </p>
      </div>
      <div className='flex flex-col gap-2 lg:flex-row lg:!items-center lg:!justify-between bg-gray-100 p-3 rounded-lg'>
        <div className='flex w-full gap-2'>
          <p className='text-gray-600 text-sm font-bold'>
            {certificate.callout}
          </p>
          <p
            className='text-brand-indigo text-sm cursor-pointer'
            onClick={() => router.push(certificate.link)}
          >
            More Info
          </p>
        </div>
        <div className='flex w-full lg:!justify-center gap-2 text-sm font-bold text-gray-600'>
          {certificate.courses} Courses | {certificate.hours} Hours
        </div>
        <div className='w-full flex items-center gap-1 lg:!justify-end'>
          <div>
            <PlayCircleIcon className='w-5 h-5 text-brand-indigo' />
          </div>
          <div className='text-brand-indigo text-sm'>View Preview</div>
        </div>
      </div>
    </div>
  );
};

export default CertificateModalItem;
