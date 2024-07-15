import React from 'react';
import Instructor from './Instructor';
import CourseItems from './CourseItems';
import CourseDetails from './CourseDetails';

import { setTextColor, setCategoryText } from '../../helpers/utils';

const CCCourseIntro = ({
  id,
  category,
  categoryArray,
  title,
  instructor,
  subtitle,
  infoSheet,
  hours,
  lessons,
  videos,
}) => {
  return (
    <div className='flex flex-col gap-4 md:gap-5 lg:max-w-prose'>
      <div className='w-full bg-green-600 p-3 flex items-center gap-2 border-2 border-black'>
        <div className='flex flex-col gap-1'></div>
        <div className='text-white font-semibold'>
          Sign up between now and July 31 (start date Aug. 1)—only 10 spots
          available
        </div>
      </div>
      <div className='flex flex-wrap flex-row gap-3'>
        <div className='flex flex-wrap items-center gap-3'>
          <div className='bg-base-dark max-w-fit rounded-md'>
            <div className=' text-white text-xs lg:text-sm flex py-1 px-3'>
              {id}
            </div>
          </div>
          {categoryArray.map((cat, i) => (
            <div
              className={` ${setTextColor(cat)} max-w-fit rounded-md`}
              key={i}
            >
              <div className=' text-xs lg:text-sm flex py-1 px-3'>
                {setCategoryText(cat)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <div className='hero__headline black__white mb-3 leading-tight'>
          <h1>{title}</h1>
        </div>
        <CourseDetails hours={hours} lessons={lessons} videos={videos} />
        <div className='text-slate-700 dark:text-gray-400 text-lg'>
          {subtitle}
        </div>
      </div>
      <div className='grid grid-cols-5 w-full mt-3 max-w-sm'>
        <div
          className='col-span-2 bg-top bg-contain bg-no-repeat w-full h-full'
          style={{
            backgroundImage:
              "url('https://packschool.s3.amazonaws.com/sustainable-packaging-Podcast-logo-2022.png')",
          }}
        ></div>
        <div className='col-span-3 flex flex-col gap-0'>
          <div className='font-semibold leading-snug'>
            Cory Connors, Sustainable Packaging Consultant
          </div>
          <div>Landsberg Orora</div>
          <div>Portland, Oregon </div>
          <div className='cursor-pointer font-semibold underline'>
            Corygated.com
          </div>
        </div>
      </div>
      {/* <Instructor instructor={instructor} /> */}

      {/* <CourseItems infoSheet={infoSheet} /> */}
    </div>
  );
};

export default CCCourseIntro;
