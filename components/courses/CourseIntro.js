import React from 'react';
import Instructor from './Instructor';
import CourseItems from './CourseItems';
import CourseDetails from './CourseDetails';

import { setTextColor, setCategoryText } from '../../helpers/utils';
import { MdRocketLaunch } from 'react-icons/md';

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
  callout,
}) => {
  return (
    <div className='flex flex-col gap-4 md:gap-5 lg:max-w-prose'>
      {callout ? (
        <div className='bg-base-brand text-white px-3 py-3 leading-tight flex items-center justify-center w-full gap-3 rounded-md'>
          <div className='flex items-center justify-center gap-3'>
            <div className='w-10 h-10 bg-white/80 flex items-center justify-center'>
              <MdRocketLaunch className='text-base-brand' size={28} />
            </div>
            <div className='w-fit font-medium'>{callout}</div>
          </div>
        </div>
      ) : null}
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
