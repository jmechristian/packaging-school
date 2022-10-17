import React from 'react';
import { PrismicLink } from '@prismicio/react';
import {
  VideoCameraIcon,
  ArrowDownOnSquareIcon,
} from '@heroicons/react/24/outline';

const CourseItems = ({ infoSheet }) => {
  return infoSheet.url ? (
    <div className='border border-white max-w-fit'>
      <div className='py-5 px-5'>
        <div className='flex flex-col md:flex-row gap-4 lg:gap-6 justify-center text-white font-semibold'>
          {infoSheet.url && (
            <div className='flex gap-2 items-center'>
              <ArrowDownOnSquareIcon className='w-6 h-6 stroke-base-brand' />
              <PrismicLink field={infoSheet} className='font-medium uppercase'>
                Information Sheet
              </PrismicLink>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    ''
  );
};

export default CourseItems;
