import React, { useState } from 'react';
import {
  LockClosedIcon,
  LockOpenIcon,
  ArrowRightIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import { ThumbnailGallery } from '@jmechristian/ps-component-library';
import '@jmechristian/ps-component-library/dist/style.css';

const APSImageGallery = ({
  images,
  unlockHandler,
  validatePasswordHandler,
  downloadHandler,
  isLocked,
  isUnlocking,
}) => {
  return (
    <div className='w-full max-w-7xl mx-auto lg:px-0 pb-12'>
      <div className='w-full h-full border-2 border-neutral-900 bg-neutral-900 flex flex-col p-0.5 gap-1 '>
        <div className='w-full bg-neutral-800 rounded-t-lg'>
          <div className='w-full flex justify-between items-center px-5 py-4'>
            <div className='font-oswald uppercase text-white text-xl md:text-2xl tracking-wide'>
              <span className='text-ap-yellow'>Photos</span> / 2024
            </div>
            <div className='flex gap-3 items-center h-full -mr-3 md:mr-0 bg-white/10 py-3 px-4 rounded-lg'>
              <div className='flex flex-col gap-0'>
                <div className='text-white font-semibold'>
                  Want to Add Your Photos?
                </div>
                <div className='text-white/50 text-sm'>
                  Valid registration email required.
                </div>
              </div>
              <div
                className={`cursor-pointer bg-gradient-to-r gap-2 from-ap-darkblue to-ap-yellow w-fit p-4 rounded-full md:py-2 md:px-6 md:rounded-lg flex items-center`}
                onClick={unlockHandler}
              >
                <div className='w-5 h-5'>
                  {isLocked ? (
                    <LockClosedIcon className='w-5 h-5 stroke-white' />
                  ) : (
                    <PlusIcon className='w-5 h-5 stroke-white' />
                  )}
                </div>
                <div className='text-white font-semibold hidden md:block'>
                  {isLocked ? 'Unlock' : 'Unlocked!'}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full rounded-b-xl pb-6 relative bg-neutral-900 flex flex-col lg:flex-row items-center cursor-pointer'>
          <div className='w-full h-full'>
            <ThumbnailGallery
              images={images}
              dark={true}
              download={!isLocked}
              downloadHandler={(image) => downloadHandler(image)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default APSImageGallery;
