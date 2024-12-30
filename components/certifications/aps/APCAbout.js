import React from 'react';
import { SectionHeading } from '../../shared/SectionHeading';
import FadeIn from '../../../helpers/FadeIn';
import StatCard from '../../shared/StatCard';
import {
  DocumentPlusIcon,
  AcademicCapIcon,
  BookOpenIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

const APCAbout = () => {
  return (
    <section className=' mt-12 container-7xl' id='about'>
      <div className='grid lg:grid-cols-2 gap-9 lg:gap-28 justify-end'>
        <div className='flex flex-col gap-9'>
          <FadeIn>
            <SectionHeading number='1'>What is APC?</SectionHeading>
          </FadeIn>
          <h2 className='text-4xl lg:text-5xl max-w-2xl dark:text-white'>
            <FadeIn>100% online, automotive packaging expertise.</FadeIn>
          </h2>
          <div className='space-y-9'>
            <p className='dark:text-gray-500 text-slate-700 text-xl font-greycliff tracking-wide'>
              Covering the unique landscape of automotive packaging - from
              returnable packaging systems through expendable case studies and
              applications, supplier databases, transportation, and unique SME
              feedback, there is no other program that provides this type of
              content.
            </p>
            <p className='dark:text-gray-500 text-slate-700 text-xl font-greycliff tracking-wide'>
              We visited leading experts at PakFab (Returnable Metal Packaging),
              Tree Brand Packaging (Expendable Packaging – Wood), NTIC Excor
              Zerust (Comprehensive Corrosion Control), and IPS (Packaging
              Distributor) to develop industry-specific education from the
              people who know it best.
            </p>
          </div>
        </div>
        <div className='flex flex-col gap-9 lg:gap-12 xl:justify-end'>
          <FadeIn>
            <div className='grid grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-9'>
              <StatCard stat='22' title='Certificate Hours' />
              <StatCard stat='10' title='Certificate Courses' />
              <StatCard stat='2' title={`CEU \nCredits`} />
              <StatCard
                stat={
                  <AcademicCapIcon className='w-12 h-12 stroke-white dark:stroke-clemson' />
                }
                title={`24/7 \nAccess`}
              />
              <StatCard
                stat={
                  <BookOpenIcon className='w-12 h-12 stroke-white dark:stroke-clemson' />
                }
                title='Companion Workbook'
              />
              <StatCard
                stat={
                  <Cog6ToothIcon className='w-12 h-12 stroke-white dark:stroke-clemson' />
                }
                title='Automotive Specific'
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default APCAbout;
