import React from 'react';
import Script from 'next/script';
import Image from "next/legacy/image";
import CourseCard from '../components/course-card/CourseCard';
import Meta from '../components/shared/Meta';

const Page = () => {
  return (
    <>
      <Meta
        title={'Packing School | AICC'}
        description={
          'While many are away from friends and classrooms, The Packaging School and AICC have come together to bridge the gap between on-campus and at-home packaging education.'
        }
      />
      <div className='container-7xl py-20'>
        <div className='flex flex-col gap-16'>
          <div className='grid lg:grid-cols-12'>
            <div className='py-9 flex flex-col gap-6 lg:col-span-7 max-w-prose'>
              <div className='flex gap-6 items-center mb-6'>
                <div className='h-auto w-24 md:w-48'>
                  <Image
                    src={
                      'https://packschool.s3.amazonaws.com/AICC-Header-logo.png'
                    }
                    width={589}
                    height={328}
                    layout='responsive'
                    alt='AICC'
                  />
                </div>
                <div className='h-auto w-20 md:w-40'>
                  <Image
                    src={
                      'https://packschool.s3.amazonaws.com/PS_com+LOGO+Transparent.png'
                    }
                    width={901}
                    height={844}
                    layout='responsive'
                    alt='Packaging School'
                  />
                </div>
              </div>
              <h2 className='text-5xl font-bold'>Bridging a Physical Gap</h2>
              <p className='text-gray-700 text-lg my-1.5'>
                While many are away from friends and classrooms, The Packaging
                School and AICC have come together to bridge the gap between
                on-campus and at-home packaging education.
              </p>
              <p className='text-gray-700 text-lg my-1.5'>
                If you are a student or a faculty member of higher education
                studying wood, paper, or packaging; you qualify for FREE online
                courses:
              </p>
            </div>
            <div className='lg:col-span-5 py-9'>
              <div className='bg-gray-100 p-6 rounded-lg shadow-md'>
                <div class='_form_6'></div>
                <Script
                  src='https://packagingschool42200.activehosted.com/f/embed.php?id=6'
                  type='text/javascript'
                  charset='utf-8'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
