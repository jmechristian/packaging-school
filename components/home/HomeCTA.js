import React from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { toggleSignInModal } from '../../features/layout/layoutSlice';

const HomeCTA = () => {
  const dispatch = useDispatch();
  return (
    <div className='overflow-hidden bg-white py-32'>
      <div className='mx-auto max-w-7xl px-6 lg:flex lg:px-8'>
        <div className='mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8'>
          <div className='lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8'>
            <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-greycliff'>
              Not Sure Where to Start?
            </h2>
            <p className='mt-6 text-xl leading-8 text-gray-600'>
              Whether your a packaging professional or just a hobbyist looking
              for a project solution, Packaging School has the expertise
              required to get you to the finish line. Create your free account
              and use the search bar to find your solution.
            </p>
            <div className='mt-10 flex'>
              <div
                className='rounded-md bg-clemson font-greycliff px-4 py-2.5 font-bold text-white shadow-sm hover:bg-clemson-dark focus-visible:outline cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clemson text-lg'
                onClick={() => dispatch(toggleSignInModal())}
              >
                Create Your Free Account <span aria-hidden='true'>&rarr;</span>
              </div>
            </div>
          </div>
          <div className='flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents'>
            <div className='w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end'>
              <img
                src='https://packschool.s3.amazonaws.com/partner-1.jpeg'
                alt=''
                className='aspect-[7/5] w-[37rem] max-w-none rounded-2xl bg-gray-50 object-cover'
              />
            </div>
            <div className='contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8'>
              <div className='order-first flex w-64 flex-none justify-end self-end lg:w-auto'>
                <img
                  src='https://packschool.s3.amazonaws.com/food_packaging_hero-1024x412.webp'
                  alt=''
                  className='aspect-[4/3] w-[24rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover'
                />
              </div>
              <div className='flex w-96 flex-auto justify-end lg:w-auto lg:flex-none'>
                <img
                  src='https://apsmedia.s3.amazonaws.com/images/bg-color.png'
                  alt=''
                  className='aspect-[7/5] w-[37rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover'
                />
              </div>
              <div className='hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none'>
                <img
                  src='https://packschool.s3.amazonaws.com/chris-marsh-psgrad02.jpeg'
                  alt=''
                  className='aspect-[4/4] w-[24rem] max-w-none rounded-2xl bg-gray-50 object-cover'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCTA;
