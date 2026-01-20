import Link from 'next/link';
import React from 'react';

const FooterLibrary = () => {
  return (
    <div className='flex flex-col gap-1 lg:gap-2 text-sm w-full'>
      <div className='font-extrabold text-sm uppercase tracking-widest dark:text-gray-200 font-greycliff'>
        Lessons
      </div>
      <div className='grid grid-cols-2 gap-y-1 gap-x-8 lg:gap-x-4 justify-between'>
        
          <p className='text-gray-600 dark:text-gray-500 w-fit'>
            <Link href={'/lessons'}>Lessons</Link>
          </p>
          <p className='text-gray-600 dark:text-gray-500 w-fit'>
            <Link href={'/glossary'}>Glossary</Link>
          </p>
        <div className='flex flex-col gap-1 col-span-2'>
          <p className='text-gray-600 dark:text-gray-500 w-fit'>
            <Link href={'/learning-of-the-month'}>Learning of the Month</Link>
          </p>
          {/* <p className='text-gray-600 dark:text-gray-500 w-fit'>
            <Link href={'/regulation-of-the-month'}>Regulation of the Month</Link>
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default FooterLibrary;
