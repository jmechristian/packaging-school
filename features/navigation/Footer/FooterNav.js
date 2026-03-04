import React from 'react';
import Link from 'next/link';

const FooterNav = () => {
  return (
    <div className='flex flex-col gap-1 lg:gap-2 text-sm w-full'>
      <div className='font-extrabold text-sm uppercase tracking-widest dark:text-gray-200 font-greycliff'>
        Company
      </div>
      <div className='grid grid-cols-2 gap-y-1 gap-x-8 lg:gap-x-4 justify-between'>
        <div className='flex flex-col gap-1'>
          <p className='text-gray-600 dark:text-gray-500 w-fit'>
            <Link href={'/about'}>About Us</Link>
          </p>
          <p className='text-gray-600 dark:text-gray-500 w-fit'>
            <Link href={'/teams'}>Team Learning</Link>
          </p>
          <p className='text-gray-600 dark:text-gray-500 w-fit'>
            <Link href={'https://packagingschool.printful.me/'}>
              Campus Store
            </Link>
          </p>
        </div>
        <div className='flex flex-col gap-1'>
          {/* <p className='text-gray-500 dark:text-gray-500 w-fit'>Campus Store</p> */}
          <p className='text-gray-600 dark:text-gray-500 w-fit'>
            <a
              href='mailto:info@packagingschool.com'
              target='_blank'
              rel='noreferrer'
            >
              Collaborate
            </a>
          </p>
          <p className='text-gray-600 dark:text-gray-500 w-fit'>
            <Link href={'/faq'}>Faqs</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FooterNav;
