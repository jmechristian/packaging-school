import React from 'react';
import FadeIn from '../../../helpers/FadeIn';

import { ArrowLongRightIcon } from '@heroicons/react/24/outline';
import Image from 'next/legacy/image';

const WPO_LOGO =
  'https://packschool.s3.us-east-1.amazonaws.com/world-packaging-organisation-wpo-logo-vector.png';

const APCHero = ({ orderHandler }) => {
  return (
    <div
      id='cert-hero'
      className='grid items-center gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-12 xl:gap-14 overflow-hidden py-6 lg:py-10 container-7xl scroll-mt-24'
    >
      <div className='flex flex-col gap-9'>
        <div>
          <FadeIn>
            <h1 className='text-4xl xl:text-5xl leading-tight dark:text-white'>
              Automotive Packaging Certificate (APC)
            </h1>
          </FadeIn>
        </div>
        <div>
          <FadeIn>
            <p className='text-xl font-greycliff text-slate-700 dark:text-gray-500 tracking-wide'>
              The first and only 100% online academic program that will enable
              you to develop the professional skill set you need to be
              successful in the automotive packaging field. Ideal for packaging
              and logistics employees at automotive suppliers and OEMs, as well
              as sales, customer service and packaging engineers that work for
              or with packaging providers produce and supply industrial and
              automotive packaging.
            </p>
          </FadeIn>
        </div>
        <div>
          <FadeIn>
            <div className='flex flex-col md:flex-row items-center gap-6 mt-4'>
              <button
                className='w-full md:w-fit shrink-0 whitespace-nowrap px-9 bg-clemson rounded-lg py-4 text-white font-semibold font-greycliff text-xl'
                onClick={() => orderHandler()}
              >
                Enroll Now
              </button>
              <div
                className='flex gap-1.5 items-center cursor-pointer'
                onClick={() =>
                  window.open(
                    'https://calendar.app.google/qUZMKuFbF7NhpxgL8',
                    '_blank'
                  )
                }
              >
                <div className='font-semibold text-xl font-greycliff dark:text-base-brand'>
                  Schedule a FREE Live Demo
                </div>
                <div>
                  <ArrowLongRightIcon className='w-6 h-6 stroke-slate-900 dark:stroke-base-brand' />
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
      <div className='flex justify-center lg:justify-start'>
        <FadeIn>
          <div className='w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-white/10 dark:bg-dark-mid'>
            <div className='flex justify-center bg-slate-50 px-8 pt-8 pb-6 dark:bg-white'>
              {/* Source PNG is a wide canvas with the portrait mark centered. */}
              <div className='relative h-52 w-[8.4rem]'>
                <Image
                  src={WPO_LOGO}
                  alt='World Packaging Organisation'
                  layout='fill'
                  objectFit='cover'
                  objectPosition='center'
                />
              </div>
            </div>
            <div className='flex flex-col items-center gap-3 px-8 py-7 text-center'>
              <p className='text-xs font-bold uppercase tracking-[0.22em] text-clemson'>
                Internationally Recognized
              </p>
              <h2 className='text-xl font-semibold leading-snug text-slate-900 xl:text-2xl dark:text-white'>
                Officially Recognized by the World Packaging Organisation (WPO)
              </h2>
              <p className='font-greycliff text-base leading-relaxed text-slate-600 dark:text-gray-400'>
                Recognized for excellence in professional automotive packaging
                education.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default APCHero;
