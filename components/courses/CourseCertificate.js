import React from 'react';
import { LightBulbIcon } from '@heroicons/react/24/solid';

const CourseCertificate = ({ certification }) => {
  return (
    <div className='flex flex-col gap-8'>
      {certification[0].certificate_link.data ? (
        <>
          <div className='flex gap-2 items-center'>
            <div>
              <LightBulbIcon className='h-9 w-9 fill-base-brand' />
            </div>
            <div className='black__white text-lg'>
              This course is part of the{' '}
              <span className='text-clemson font-bold cursor-pointer'>
                <a
                  href={`/certifications/${certification[0].certificate_link.uid}`}
                >
                  {certification[0].certificate_link.data.certificate_name}
                </a>
                .
              </span>
            </div>
          </div>

          <div className='black__white text-lg'>
            Differentiate yourself from your peers with the comprehensive
            knowledge of a full certificate program.{' '}
            <a
              href={`/certifications/${certification[0].certificate_link.data.uid}`}
              className='cursor-pointer'
            >
              <u>Enroll now!</u>
            </a>
          </div>
        </>
      ) : (
        <div className='black__white text-lg'>
          Differientiate yourself from your peers with the comprehensive
          knowledge of a full certificate program.{' '}
          <a href='/certifications' className='cursor-pointer'>
            <u>Enroll now!</u>
          </a>
        </div>
      )}
    </div>
  );
};

export default CourseCertificate;
