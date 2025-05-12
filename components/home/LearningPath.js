import React from 'react';
import LessonSubscribe from '../shared/LessonSubscribe';
import FooterEmailSignup from '../../features/navigation/Footer/FooterEmailSignup';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import MiniProfile from '../profile/MiniProfile';
const LearningPath = () => {
  const router = useRouter();
  return (
    <div className='w-full flex flex-col gap-10'>
      <div className='w-full flex flex-col gap-5 justify-center items-center'>
        <div className='h2-base'>Maximize Your Packaging School Experience</div>
        <div className='text-xl text-center max-w-5xl mx-auto text-slate-600'>
          Unlock the full spectrum of Packaging School: explore personalized
          learning paths, free on-demand courses, free lessons and more. Log in
          daily to access new modules, resources, and tools to advance your
          packaging expertise.
        </div>
      </div>
      <div className='w-full grid lg:grid-cols-12 gap-4 max-w-7xl mx-auto'>
        <div className='w-full lg:col-span-8 bg-slate-600 h-[350px] rounded-lg overflow-hidden'>
          <div className='w-full h-full flex items-center justify-between'>
            <div className='flex flex-col gap-2.5 px-7'>
              <div className='text-white text-lg tracking-wide font-oswald uppercase font-medium bg-clemson px-2 py-1 rounded w-fit'>
                NEW!
              </div>
              <div className='text-white h3-base'>
                Introducing Learning Paths
              </div>
              <div className='text-gray-300 text-lg leading-tight'>
                Looking for a more guided experience? Our new Learning Paths
                help you follow a structured route toward a specific goal —
                completely free and totally optional. Whether you&apos;re a
                planner or a wanderer, the choice is yours.
              </div>
              <div
                className='text-clemson underline font-semibold cursor-pointer hover:text-clemson/80 transition-all duration-300'
                onClick={() => router.push('/paths')}
              >
                Start Your Path &rarr;
              </div>
            </div>
            <div
              className='w-fit h-full aspect-[1/1] bg-cover bg-center mt-16'
              style={{
                backgroundImage: `url(
                  https://packschool.s3.us-east-1.amazonaws.com/learning-paths.png
                )`,
              }}
            ></div>
          </div>
        </div>
        <div
          className='w-full lg:col-span-4 bg-gray-800 h-[350px] rounded-md bg-cover bg-bottom'
          style={{
            backgroundImage: `url(
            https://packschool.s3.us-east-1.amazonaws.com/pxp-hero.png
          )`,
          }}
        >
          <div className='flex flex-col gap-2.5 px-7 pt-7'>
            <div className='text-white text-lg tracking-wide font-oswald uppercase font-medium bg-brand-yellow py-1 px-2 rounded w-fit'>
              COMING SOON!
            </div>
            <div className='text-white h3-base'>Earn Experience Points</div>
            <div className='text-gray-300 text-lg leading-tight max-w-[270px]'>
              Introducing Pack Experience Points! Earn PXP by purchasing courses
              or completing free lessons. Level up, compete with fellow
              learners, and unlock cool perks as you progress.
            </div>
            <div
              className='text-clemson underline font-semibold cursor-pointer hover:text-clemson/80 transition-all duration-300'
              onClick={() => router.push('/pxp')}
            >
              Learn More About PXP &rarr;
            </div>
          </div>
        </div>
        <div className='w-full lg:col-span-4 bg-indigo-100 rounded-md p-6 flex items-center justify-center'>
          <div className='flex flex-col gap-4'>
            <div className='flex items-start  gap-3 relative'>
              <div>
                <div className='h-32 w-32 rounded-full bg-brand-yellow-light  z-10 overflow-hidden flex items-center justify-center'>
                  <div
                    className=' bg-contain bg-center w-[80%] h-[80%] z-20 bg-no-repeat'
                    style={{
                      backgroundImage: `url(https://packschool.s3.us-east-1.amazonaws.com/LOTM-Logo-Final_White.png)`,
                    }}
                  ></div>
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <div className='h3-base lg:leading-none text-gray-700'>
                  Free Monthly Lessons
                </div>
                <div className='text-lg text-gray-500 leading-snug'>
                  Receive a monthly dose of fresh insights across diverse
                  topics, delivered straight to your inbox.
                </div>
              </div>
            </div>

            <FooterEmailSignup sm />
          </div>
        </div>
        <div className='w-full lg:col-span-8 bg-base-brand h-[350px] rounded-lg overflow-hidden'>
          <div className='w-full h-full flex items-center justify-between'>
            <div className='flex flex-col gap-2.5 px-7 w-2/3'>
              <div className='text-white text-lg tracking-wide font-oswald uppercase font-medium bg-base-dark py-1 px-2 rounded w-fit'>
                UPGRADED!
              </div>
              <div className='text-brand-yellow-light h3-base'>
                Progress, Paths, and More—This Is Your New HQ
              </div>
              <div className='text-gray-100 text-lg leading-tight'>
                View your active courses, completed lessons, Pack XP, learning
                paths, and unlocked achievements—all in one place. Your
                dashboard is now your home base for leveling up and reaching
                your goals.
              </div>
              <div
                className='text-white underline font-semibold cursor-pointer hover:text-white/80 transition-all duration-300'
                onClick={() => router.push('/pxp')}
              >
                View Your Pack HQ &rarr;
              </div>
            </div>
            <div className='w-1/3 pr-6'>
              <MiniProfile />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPath;
