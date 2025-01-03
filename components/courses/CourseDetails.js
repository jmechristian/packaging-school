import React from 'react';
import {
  ClockIcon,
  AcademicCapIcon,
  FilmIcon,
} from '@heroicons/react/24/outline';

const CourseDetails = ({ hours, lessons, videos }) => {
  return (
    <div className='flex flex-col md:!flex-row gap-3'>
      <div className='flex gap-2'>
        <ClockIcon className='w-6 h-6 stroke-base-dark dark:stroke-base-brand' />
        <div className='dark:text-base-brand text-base-dark'>{hours} Hours</div>
      </div>
      <div className='flex gap-2'>
        <AcademicCapIcon className='w-6 h-6 stroke-base-dark dark:stroke-base-brand' />
        <div className='dark:text-base-brand text-base-dark'>
          {lessons} Lessons
        </div>
      </div>
      {/* <div className='flex gap-2'>
        <FilmIcon className='w-6 h-6 stroke-base-dark dark:stroke-base-brand' />
        <div className='dark:text-base-brand text-base-dark'>
          {videos} Videos
        </div>
      </div> */}
    </div>
  );
};

export default CourseDetails;
