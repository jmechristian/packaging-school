import React from 'react';
import Instructor from './Instructor';
import CourseItems from './CourseItems';
import CourseDetails from './CourseDetails';

import { setTextColor, setCategoryText } from '../../helpers/utils';

const CourseIntro = ({
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
      <div className='flex flex-row gap-3'>
        <div className='bg-base-dark max-w-fit rounded-md'>
          <div className=' text-white text-xs lg:text-sm flex py-1 px-3'>
            {id}
          </div>
        </div>
        <div className='flex items-center gap-3'>
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
        <div className='hero__headline black__white mb-3'>
          <h1>{title}</h1>
        </div>
        <div className='text-slate-700 dark:text-gray-400 text-lg'>
          {subtitle}
        </div>
      </div>
      {/* <Instructor instructor={instructor} /> */}
      <CourseDetails hours={hours} lessons={lessons} videos={videos} />
      <CourseItems infoSheet={infoSheet} />
    </div>
  );
};

export default CourseIntro;
