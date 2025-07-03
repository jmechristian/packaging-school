import React from 'react';
import { SectionHeading } from '../../shared/SectionHeading';
import FadeIn from '../../../helpers/FadeIn';
import StatCard from '../../shared/StatCard';
import {
  DocumentPlusIcon,
  CalendarDaysIcon,
  MagnifyingGlassPlusIcon,
  RocketLaunchIcon,
} from '@heroicons/react/24/outline';

const CPSWhat = () => {
  return (
    <section className='py-32 container-7xl' id='about'>
      <div className='grid lg:grid-cols-2 gap-9 lg:gap-28 justify-end'>
        <div className='flex flex-col gap-9'>
          <FadeIn>
            <SectionHeading number='1'>What is CPS?</SectionHeading>
          </FadeIn>
          <h2 className='text-4xl lg:text-5xl max-w-2xl dark:text-white'>
            <FadeIn>Executive-level education done at your own pace.</FadeIn>
          </h2>
          <div>
            <p className='dark:text-gray-500 text-slate-700 text-xl font-greycliff tracking-wide'>
              The Certificate of Packaging Science offers a comprehensive
              program consisting of 12 courses that cover all major aspects of
              packaging materials, processes, and design. With 24/7 access for
              6-months, you can learn at your preferred pace. Our committed
              student services team is readily available to support you with any
              inquiries or issues throughout the duration of the certificate.
            </p>
          </div>
        </div>
        <div className='flex flex-col gap-9 lg:gap-12 justify-end'>
          <FadeIn>
            <div className='grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-9'>
              <StatCard stat='60' title='Certificate Hours' />
              <StatCard stat='12' title='Certificate Courses' />
              <StatCard stat='6' title={`CEU \nCredits`} />
              <StatCard
                stat={
                  <RocketLaunchIcon className='w-12 h-12 stroke-white dark:stroke-clemson' />
                }
                title='24/7 Online Access'
              />
              <StatCard
                stat={
                  <DocumentPlusIcon className='w-12 h-12 stroke-white dark:stroke-clemson' />
                }
                title='Application Required'
              />
              <StatCard
                stat={
                  <CalendarDaysIcon className='w-12 h-12 stroke-white dark:stroke-clemson' />
                }
                title='6 Months to Complete'
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default CPSWhat;
