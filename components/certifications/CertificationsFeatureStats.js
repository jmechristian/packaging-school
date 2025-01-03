import React, { useRef } from 'react';
import { EyeIcon } from '@heroicons/react/24/outline';
import { useCycle } from 'framer-motion';
import CPSCourses from './CPSCourses';
import SlideUp from '../SlideUp';
import Image from "next/legacy/image";

const CertificationsFeatureStats = ({
  stats,
  courses,
  whoText,
  brochureLink,
  video,
}) => {
  const [open, cycleOpen] = useCycle(false, true);
  const scrollRef = useRef();

  return (
    <div className='relative'>
      <SlideUp open={open} cycle={cycleOpen} items={courses} />
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl sm:text-center'>
          <h2 className='text-lg font-bold leading-7 text-base-brand font-greycliff'>
            Elevate Your Career
          </h2>
          <p className='mt-2 text-3xl font-bold tracking-tight dark:text-white md:text-5xl font-greycliff'>
            Who Enrolls?
          </p>
          <p className='my-6 text-lg lg:text-xl leading-8 lg:leading-9 text-slate-500 dark:text-gray-300'>
            {whoText}
          </p>

          <p>
            <a
              href='#'
              className='text-base md:text-lg font-bold leading-6 font-greycliff text-clemson'
            >
              Download The Certificate Brochure{' '}
              <span aria-hidden='true'>→</span>
            </a>
          </p>
        </div>
        <div className='mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8'>
          <dl className='mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 dark:text-white sm:mt-20 sm:grid-cols-2 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-4'>
            {stats.map((stat) => (
              <div
                key={stat.id}
                className='flex flex-col gap-y-3 border-l border-slate-900 dark:border-white/10 pl-6'
              >
                <dt className='leading-6 font-semibold'>
                  {stat.link ? (
                    <button
                      className='text-base-brand flex items-center gap-2'
                      onClick={cycleOpen}
                    >
                      <div className='bg-clemson h-8 w-8 rounded-full flex items-center justify-center text-white'>
                        <EyeIcon className='w-5 h-5' />
                      </div>
                      {stat.name}
                    </button>
                  ) : (
                    stat.name
                  )}
                </dt>
                <dd className='order-first text-5xl font-greycliff font-bold tracking-tight'>
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <div className='relative overflow-hidden pt-16'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <Image
            src='https://tailwindui.com/img/component-images/dark-project-app-screenshot.png'
            alt='App screenshot'
            className='mb-[-12%] rounded-xl shadow-2xl ring-1 ring-white/10'
            width={2432}
            height={1442}
          />
          <div className='relative' aria-hidden='true'>
            <div className='absolute -inset-x-20 bottom-0 bg-gradient-to-t from-white dark:from-gray-900 pt-[7%]' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificationsFeatureStats;
