import React from 'react';

const CourseCertificate = ({ certification }) => {
  return (
    <div className='flex flex-col gap-8'>
      <div className='text-white text-lg'>
        This course is part of the{' '}
        <span className='text-clemson font-bold cursor-pointer'>
          <a href={`/certifications/${certification.uid}`}>
            {certification.data.certificate_name}
          </a>
          .
        </span>
      </div>
      <div className='text-white text-lg'>
        Differientiate yourself from your peers with the comprehensive knowledge
        of a full certificate program.{' '}
        <a
          href={`/certifications/${certification.uid}`}
          className='cursor-pointer'
        >
          Enroll now!
        </a>
      </div>
    </div>
  );
};

export default CourseCertificate;