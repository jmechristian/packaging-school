import React from 'react';
import { ArrowLongRightIcon } from '@heroicons/react/24/outline';

const AllCourseHeader = () => {
  return (
    <div className='bg-slate-900 pt-20'>
      <div className='flex justify-center item-center w-full bg-bootcamp-mobile bg-cover bg-center'>
        <div className='flex flex-col gap-4 justify-center items-center text-center py-8 px-8'>
          <div className='text-white font-plex font-bold text-3xl'>
            New to Packaging? Start Here!
          </div>
          <div className='text-white'>
            Jumpstart your knowledge with a solid foundation in packaging
            basics.
          </div>
          <button>
            <div className='flex items-center gap-1 py-3 px-5 rounded-md shadow-lg bg-white'>
              <div className='text-slate-900 font-semibold uppercase text-sm'>
                Bootcamp 101
              </div>
              <ArrowLongRightIcon className='w-6 h-6 stroke-slate-900' />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllCourseHeader;