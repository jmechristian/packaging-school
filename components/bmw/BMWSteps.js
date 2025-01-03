import Link from 'next/link';
import React from 'react';
import {
  PencilSquareIcon,
  BookOpenIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';

const BMWSteps = () => {
  return (
    (<div className='w-full h-full bg-white' id='start'>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 container-7xl gap-4'>
        <div className='border  border-gray-200 rounded-lg p-4 shadow-lg'>
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
        </div>
        <div className='border border-gray-200 rounded-lg p-4 shadow-lg'>
          <div className='bg-indigo-100 rounded-t-lg w-full aspect-[1/1]'>
            <div className='w-full h-full flex flex-col justify-between p-6'>
              <div className='flex justify-between items-center w-full'>
                <div className='text-6xl tracking-tighter font-bold text-white'>
                  02
                </div>
                <div className='w-12 h-12 bg-white rounded-full flex justify-center items-center'>
                  <BookOpenIcon className='w-8 h-8 stroke-gray-900' />
                </div>
              </div>
              <div className='text-5xl tracking-tighter font-bold text-gray-900'>
                Complete
                <br /> Training
              </div>
            </div>
          </div>
          <div className='px-4 py-6 border rounded-b-lg text-gray-600 text-center'>
            BMW will provide your
            <br /> onboarding link
          </div>
          <div className='w-full mt-6 bg-clemson  py-4 text-center rounded'>
            <Link href={'/sws-bmw-overview-training'} className='w-full'>
              
                Training Overview & FAQs
              
            </Link>
          </div>
        </div>
        <div className='aspect-[1/1] border shadow-lg  border-gray-200 rounded-lg p-4'>
          <div className='bg-orange-200 rounded-lg w-full aspect-[1/1]'>
            <div className='w-full h-full flex flex-col justify-between p-6'>
              <div className='flex justify-between items-center w-full'>
                <div className='text-6xl tracking-tighter font-bold text-white'>
                  03
                </div>
                <div className='w-12 h-12 bg-white rounded-full flex justify-center items-center'>
                  <AcademicCapIcon className='w-8 h-8 stroke-gray-900' />
                </div>
              </div>
              <div className='text-5xl tracking-tighter font-bold text-gray-900'>
                Complete
                <br /> Assignment
              </div>
            </div>
          </div>
          <div className='px-4 py-6 border rounded-b-lg text-gray-600 text-center'>
            The assignment is completed by
            <br /> the main supplier contact
          </div>
          <div className='px-4 py-4 mt-7 font-semibold text-gray-600 text-center'>
            The assignment will be part of the training
          </div>
        </div>
      </div>
    </div>)
  );
};

export default BMWSteps;
