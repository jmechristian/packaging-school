import React from 'react';
import Image from "next/legacy/image";
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import PatternBackground from '../layout/PatternBackground';

const CareerHero = ({ title, subhead, altName, media }) => {
  return (
    <div className='relative pt-10'>
      <div className='py-12 sm:py-32'>
        <PatternBackground />
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl text-left md:text-center'>
            <h1 className='text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl font-greycliff'>
              {title}
            </h1>
            <p className='mt-4 md:mt-8 text-base md:text-xl leading-8 text-slate-900/60'>
              {subhead}
            </p>
            <div className='mt-10 flex flex-col md:flex-row gap-3 items-start md:items-center justify-center gap-x-6'>
              <a
                href='#'
                className='rounded-md bg-base-mid px-3.5 py-2.5 text-base md:text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                View Curriculum
              </a>
              <a
                href='#'
                className='text-sm lg:text-base font-semibold leading-6 text-slate-900'
              >
                Learn more about {altName}
                <span aria-hidden='true'>→</span>
              </a>
            </div>
          </div>
          <div className='mt-16 flow-root sm:mt-24'>
            <div className='-m-2 rounded-xl bg-slate-900/5 p-2 ring-1 ring-inset ring-slate-900/10 lg:-m-4 lg:rounded-2xl lg:p-4'>
              <Image
                src={media}
                alt='App screenshot'
                width={2432}
                height={1442}
                className='rounded-md shadow-2xl ring-1 ring-slate-900/10'
              />
            </div>
          </div>
        </div>
        <div className='absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]'>
          <svg
            className='relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]'
            viewBox='0 0 1155 678'
          >
            <path
              fill='url(#b9e4a85f-ccd5-4151-8e84-ab55c66e5aa1)'
              fillOpacity='.3'
              d='M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z'
            />
            <defs>
              <linearGradient
                id='b9e4a85f-ccd5-4151-8e84-ab55c66e5aa1'
                x1='1155.49'
                x2='-78.208'
                y1='.177'
                y2='474.645'
                gradientUnits='userSpaceOnUse'
              >
                <stop stopColor='#9089FC' />
                <stop offset={1} stopColor='#FF80B5' />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CareerHero;
