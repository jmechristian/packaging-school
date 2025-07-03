import React, { useState, useRef } from 'react';
import FadeIn from '../../../helpers/FadeIn';
import { SectionHeading } from '../../shared/SectionHeading';
import {
  ChatBubbleLeftRightIcon,
  MapIcon,
  BookOpenIcon,
  AcademicCapIcon,
  FireIcon,
  Cog6ToothIcon,
  CubeIcon,
  BuildingOffice2Icon,
  TruckIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import StatCard from '../../shared/StatCard';
import { useSelector } from 'react-redux';
import CourseCard from '../../course-card/CourseCard';
import { AnimatePresence, useInView, motion } from 'framer-motion';

const APCHow = () => {
  const { user } = useSelector((state) => state.auth);

  const imageRef = useRef(null);
  const isInView = useInView(imageRef);

  return (
    <section id='how'>
      <div className='container-7xl flex flex-col gap-12 lg:gap-24'>
        <div className='grid lg:grid-cols-2 gap-16 lg:gap-24'>
          <div className='flex flex-col gap-6 lg:gap-16'>
            <FadeIn>
              <SectionHeading number='2'>How does it work?</SectionHeading>
            </FadeIn>
            <FadeIn>
              <div className='flex flex-col gap-9'>
                <div className='flex flex-col'>
                  <div className='font-bold text-4xl lg:text-5xl'>
                    <h2 className='dark:text-white'>Be the Innovation.</h2>
                  </div>
                  <div className='text-gray-500 font-bold text-4xl lg:text-5xl'>
                    Master The Market.
                  </div>
                </div>
                <div className='text-xl text-gray-700 dark:text-gray-500 max-w-prose'>
                  Enroll at your convenience and enjoy{' '}
                  <span className='dark:text-white font-bold'>
                    uninterrupted 24/7 access
                  </span>
                  , allowing you to learn at your own pace for up to 6-months.
                </div>
                <div className='text-xl text-gray-700 dark:text-gray-500 max-w-prose'>
                  There is no school or program that enables professionals to
                  work within the field of Automotive Packaging. Use this
                  program for onboarding of new hires, as a resources for
                  current employees, for strategic launch preparations and as a
                  tool for continued education for your logistics, packaging and
                  quality teams.
                </div>
              </div>
            </FadeIn>
          </div>
          <FadeIn>
            <div
              className='w-full h-full justify-center items-center lg:pt-6 flex aspect-[5/4] relative'
              ref={imageRef}
            >
              <motion.div
                className='absolute -top-6 -left-4 lg:-left-10 lg:-top-8'
                animate={
                  isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
                }
                transition={{ delay: 0, ease: 'circIn' }}
              >
                <motion.div
                  className='absolute text-white font-semibold text-center text-sm lg:text-base xl:text-lg xl:leading-none lg:leading-none leading-none  w-24 lg:w-32 lg:h-32 h-24 rounded-full shadow-md bg-clemson z-20 flex flex-col gap-1 items-center justify-center'
                  animate={{ rotate: 360 * 1 }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                >
                  <motion.div>
                    <FireIcon className='w-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 h-8 stroke-white' />
                  </motion.div>
                  <motion.div className='mb-3 whitespace-pre-wrap'>
                    Limited {'\n'}Item!
                  </motion.div>
                </motion.div>
              </motion.div>
              <div className='flex w-full h-full flex-col gap-3'>
                <div
                  className='bg-cover bg-center w-full h-full rounded-lg'
                  style={{
                    backgroundImage: `url("https://packschool.s3.amazonaws.com/Workbook+Flip+Through.mov-low.gif")`,
                  }}
                ></div>
                <div>
                  <div className='text-slate-900 dark:text-white text-sm leading-tight'>
                    548 pages of actionable content to accelerate your retention
                    and mastery of the automotive packaging industry.
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
        <div className='flex flex-col gap-6'>
          <div className='font-semibold text-lg tracking-wide dark:text-white'>
            Curriculum Includes
          </div>
          <FadeIn>
            <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-9'>
              <StatCard
                stat={
                  <MapIcon className='w-12 h-12 stroke-white dark:stroke-clemson' />
                }
                title='Automotive Packaging Overview'
              />
              <StatCard
                stat={
                  <CubeIcon className='w-12 h-12 stroke-white dark:stroke-clemson' />
                }
                title='Returnable Packaging'
              />
              <StatCard
                stat={
                  <CubeIcon className='w-12 h-12 stroke-white dark:stroke-clemson' />
                }
                title={`Expendable packaging`}
              />
              <StatCard
                stat={
                  <CubeIcon className='w-12 h-12 stroke-white dark:stroke-clemson' />
                }
                title='Packaging distributors'
              />
              <StatCard
                stat={
                  <BuildingOffice2Icon className='w-12 h-12 stroke-white dark:stroke-clemson' />
                }
                title='Packaging operations at OEMs'
              />
              <StatCard
                stat={
                  <BuildingOffice2Icon className='w-12 h-12 stroke-white dark:stroke-clemson' />
                }
                title='Packaging operations at Tier 1s'
              />
              <StatCard
                stat={
                  <TruckIcon className='w-12 h-12 stroke-white dark:stroke-clemson' />
                }
                title='Transportation'
              />
              <StatCard
                stat={
                  <ExclamationTriangleIcon className='w-12 h-12 stroke-white dark:stroke-clemson' />
                }
                title={`Hazmat Packaging*`}
              />
            </div>
            <div className='mt-8 dark:text-gray-600 text-sm w-full text-right'>
              <sup>*</sup>Special thanks to Josh Galvarino. This exclusive
              program is self-paced and can be accessed anytime, anywhere.
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default APCHow;
