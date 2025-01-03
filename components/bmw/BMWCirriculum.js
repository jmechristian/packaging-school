import React from 'react';
import {
  PencilSquareIcon,
  BookOpenIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

const BMWCirriculum = () => {
  return (
    (<div className='border  border-gray-200 rounded-lg p-4 shadow-lg'>
      <div className='bg-base-light rounded-t-lg w-full aspect-[1/1]'>
        <div className='w-full h-full flex flex-col justify-between p-6'>
          <div className='flex justify-between items-center w-full'>
            <div className='text-6xl tracking-tighter font-bold text-white'>
              01
            </div>
            <div className='w-12 h-12 bg-white rounded-full flex justify-center items-center'>
              <PencilSquareIcon className='w-8 h-8 stroke-gray-900' />
            </div>
          </div>
          <div className='text-5xl tracking-tighter font-bold text-gray-800'>
            Take
            <br /> Survey
          </div>
        </div>
      </div>
      <div className='px-4 py-6 border rounded-b-lg text-gray-600 text-center'>
        To be completed by the
        <br /> initial supplier contact
      </div>
      <div className='w-full mt-6 bg-clemson  py-4 text-center rounded'>
        <Link href={'/sws-bmw-start-survey'} className='w-full'>
          
            Start Here: Survey
          
        </Link>
      </div>
    </div>)
  );
};

export default BMWCirriculum;
