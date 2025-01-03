import React from 'react';
import CourseMenuWrapper from '../../../../../../components/lms/shared/courseMenu/CourseMenuWrapper';
import Image from "next/legacy/image";
import { useRouter } from 'next/router';
import VideoBody from '../../../../../../components/lms/video/VideoBody';
import Lottie from 'lottie-react';
import bonusAnimation from '../../../../../../bonus.json';
import ActivitySteps from '../../../../../../components/lms/shared/ActivitySteps';

const Page = () => {
  const router = useRouter();

  return (
    <div className='w-full h-full bg-white dark:bg-dark-mid dark:text-white relative lg:mb-16'>
      <div className='dark:bg-dark-dark bg-neutral-100 max-w-6xl mx-auto w-full py-16'>
        <div className='grid lg:grid-cols-12 gap-24 px-6 lg:px-12'>
          <div className='flex flex-col gap-6 lg:col-span-7'>
            <h2 className='text-5xl'>Student Assignment:</h2>
            <div className='text-3xl dark:text-neutral-400'>
              Market Research Elemental Analysis with Branding Enhancement
            </div>
            <div className='flex flex-col gap-2'>
              <div className='text-clemson font-bold text-2xl mt-6'>
                Objective:
              </div>
              <div className='dark:text-white text-lg'>
                In this assignment, you will update a market research elemental
                analysis by incorporating branding elements, including your
                logo, product name, style guide, and a specific font. The goal
                is to create six visually appealing panels that align with your
                brand’s identity and market requirements. Additionally, you will
                share a screenshot of your work and provide a written
                explanation below.
              </div>
            </div>
          </div>
          <div className='hidden lg:col-span-5 lg:flex justify-center items-start mr-12'>
            <Lottie animationData={bonusAnimation} loop={false} />
          </div>
          <div className='bg-neutral-700 w-full h-full p-6 lg:p-12 rounded-lg lg:col-span-12'>
            <ActivitySteps />
          </div>
          <div className='flex flex-col gap-6 lg:col-span-7'>
            <h2 className='text-5xl mt-6'>Bonus Content:</h2>
            <div className='text-2xl dark:text-neutral-400'>
              Now that you are ready to create your very own unique style guide,
              take a look at how{' '}
              <span className='font-bold text-clemson'>Walmart</span> and{' '}
              <span className='font-bold text-clemson'>Cabela&apos;s</span>{' '}
              handle their corporate identity and brand standards.
            </div>
          </div>
          <div className='lg:col-span-5 flex justify-center items-center py-12'>
            <div className='relative'>
              <div className='absolute -inset-3 rounded-lg bg-gradient-to-r from-clemson dark:from-base-brand dark:via-base-light via-orange-500 to-clemson-dark dark:to-base-mid opacity-75 blur'></div>
              <div className='relative flex h-60 w-72 p-9 items-center justify-center rounded-lg bg-white dark:bg-slate-900 text-slate-300'>
                <Image
                  src={
                    'https://packschool.s3.amazonaws.com/Brand_Guide_Covers.png'
                  }
                  width={552}
                  height={285}
                  alt='Brand Guide Covers'
                />
              </div>
            </div>
          </div>
          <div className='lg:col-span-12'>
            <div className='flex flex-col gap-6  max-w-2xl mx-auto w-full'>
              <div
                className='w-full flex justify-between items-center shadow-lg bg-white dark:bg-neutral-700 rounded-lg px-6 py-6'
                onClick={() =>
                  router.push(
                    'https://import.cdn.thinkific.com/2896/CabelasStyleGuide-1507035919260.pdf'
                  )
                }
              >
                <div className='flex flex-col'>
                  <div className='font-bold text-lg'>
                    Cabela&apos;s Style Guide
                  </div>
                  <div className='text-sm text-neutral-400'>4.44 MB</div>
                </div>
                <div className='w-40 text-center text-sm font-bold bg-base-brand hover:bg-base-mid px-2 py-2 cursor-pointer rounded-lg shadow-lg'>
                  DOWNLOAD
                </div>
              </div>
              <div className='w-full flex justify-between items-center shadow-lg bg-white dark:bg-neutral-700 rounded-lg px-6 py-6'>
                <div className='flex flex-col'>
                  <div className='font-bold text-lg'>
                    Walmart&apos;s Style Guide
                  </div>
                  <div className='text-sm text-neutral-400'>4.57 MB</div>
                </div>
                <div
                  className='w-40 text-center text-sm font-bold bg-base-brand hover:bg-base-mid px-2 py-2 cursor-pointer rounded-lg shadow-lg'
                  onClick={() =>
                    router.push(
                      'https://import.cdn.thinkific.com/2896/WalmartStyleGuide-1507035919258.pdf'
                    )
                  }
                >
                  DOWNLOAD
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <VideoBody
        title='Conclusion & Bonus Content'
        id={'CPS-12.07'}
        nextLesson={'Return Home'}
        nextLessonLink={''}
      />
      <CourseMenuWrapper />
    </div>
  );
};

export default Page;
