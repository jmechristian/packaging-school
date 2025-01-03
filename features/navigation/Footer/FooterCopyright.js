import React from 'react';
import Image from "next/legacy/image";

const FooterCopyright = () => {
  return (
    <div className='flex flex-col gap-8 lg:grid lg:grid-cols-12 lg:col-span-2 lg:items-center'>
      <div className='grid grid-cols-12 gap-4 overflow-hidden lg:col-span-8 md:items-center'>
        <div className='col-span-3 md:col-span-2 lg:col-span-1'>
          <Image
            src='https://res.cloudinary.com/dno7xxmmy/image/upload/v1667941998/pschool/packagingschool_logo_square-orange_d7dbzg.svg'
            alt='The Packaging School Logo'
            height='1121'
            width='1078'
            layout='responsive'
          />
        </div>
        <div className='flex flex-col gap-2 lg:gap-1 col-span-9'>
          <div className='dark:text-gray-300 text-xs'>
            South Carolina Commission on Higher Education License #5400
          </div>
          <div className='text-gray-600 dark:text-gray-500 text-xs'>
            Copyright © 2015-2022 The Packaging School, LLC. All Rights
            Reserved.
          </div>
        </div>
      </div>
      <div className='flex gap-3 text-xs text-gray-600 dark:text-gray-500 lg:col-span-4 lg:justify-end'>
        <div>
          <a
            href='https://library.packagingschool.com/articles/privacy-policy'
            target='_blank'
            rel='noreferrer'
          >
            Privacy Policy
          </a>
        </div>
        <div>
          <a
            href='https://library.packagingschool.com/articles/academic-policies-and-prodecures'
            target='_blank'
            rel='noreferrer'
          >
            Terms of Service
          </a>
        </div>
      </div>
    </div>
  );
};

export default FooterCopyright;
