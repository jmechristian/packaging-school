import React from 'react';
import Link from 'next/link';

const FooterCerts = () => {
  return (
    <div className='flex flex-col gap-1.5 lg:gap-2 text-sm'>
      <div className='font-extrabold text-sm uppercase tracking-widest text-gray-200 font-greycliff'>
        Certifications
      </div>
      <Link href={'/certifications/get-to-know-cmpm'}>
        <p className='text-gray-500 cursor-pointer'>
          Certificate of Mastery in Packaging Management
        </p>
      </Link>
      <Link href={'/certifications/get-to-know-cps'}>
        <p className='text-gray-500'>Certificate of Packaging Science</p>
      </Link>
      <Link href={'/certifications/get-to-know-apc'}>
        <p className='text-gray-500'>Automotive Packaging Certificate</p>
      </Link>
    </div>
  );
};

export default FooterCerts;
