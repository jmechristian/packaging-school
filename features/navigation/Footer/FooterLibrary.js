import Link from 'next/link';
import React from 'react';

const FooterLibrary = () => {
  return (
    <div className='flex flex-col gap-1 lg:gap-2 text-sm w-full'>
      <div className='font-extrabold text-sm uppercase tracking-widest dark:text-gray-200 font-greycliff'>
        Lessons
      </div>
      <div className='grid grid-cols-2 gap-y-1 gap-x-8 lg:gap-x-4 justify-between'>
        <div className='flex flex-col gap-1'>
          <p className='text-gray-600 dark:text-gray-500 w-fit'>
            <Link href={'/lessons'}>Learning of the Month</Link>
          </p>
          <p className='text-gray-600 dark:text-gray-500 w-fit'>
            <Link href={'/lessons'}>Regulation of the Month</Link>
          </p>
        </div>
        <div className='flex flex-col gap-1'>
          <p className='text-gray-600 dark:text-gray-500 w-fit'>
            <Link href={'/lessons'}>Articles</Link>
          </p>
          <p className='text-gray-600 dark:text-gray-500 w-fit'>
            <Link href={'/lessons'}>Glossary</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FooterLibrary;
