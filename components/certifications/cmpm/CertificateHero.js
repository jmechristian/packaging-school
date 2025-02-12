import React from 'react';
import VideoPlayer from '../../VideoPlayer';
import FadeIn from '../../../helpers/FadeIn';
import CertHeroImage from '../../../slices/CertificateHero/components/CertHeroImage';
import Link from 'next/link';
import {
  ArrowLongRightIcon,
  BoltIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import CountdownTimer from '../../shared/CountdownTimer';

const CertificateHero = () => {
  const router = useRouter();
  return (
    <div className='flex flex-col gap-12 xl:gap-24 lg:flex-row items-center pt-6 md:pt-16 lg:pt-24 container-7xl text-center lg:text-left'>
      <div className='w-full max-w-sm md:max-w-md xl:max-w-2xl flex flex-col shadow-xl'>
        <div className='w-full h-full bg-brand-yellow-light rounded-t-xl px-6 pb-6'>
          <FadeIn>
            <div className='w-full h-full aspect-[16/9] mt-8 shadow-2xl'>
              <VideoPlayer
                videoEmbedLink={'https://youtu.be/N_hYWvQO0Sg'}
                light={true}
                hideSupport={true}
              />
            </div>
          </FadeIn>
        </div>
        <div className='flex flex-col gap-4 bg-black rounded-b-xl px-6 pt-7 pb-7 items-center'>
          <div className='font-bold text-white'>
            <span className=' text-white/50'>Deadline to Apply:</span> April
            3rd, 2025
          </div>
          <CountdownTimer />
        </div>
      </div>
      <div className='flex flex-col gap-6 xl:gap-9 flex-1'>
        <div>
          <FadeIn>
            <h1 className='text-4xl xl:text-5xl leading-tight dark:text-white'>
              Certificate of Mastery in Packaging Management (CMPM)
            </h1>
          </FadeIn>
        </div>

        <div>
          <FadeIn>
            <p className='text-lg xl:text-xl font-greycliff dark:text-gray-500 tracking-wide'>
              A 12-week, PhD-led certificate program ideal for ambitious
              professionals seeking to advance their career in the packaging
              industry and for companies actively seeking future leaders and
              rising stars to lead their teams.
            </p>
          </FadeIn>
        </div>

        <div>
          <FadeIn>
            <div className='flex flex-col xl:flex-row xl:items-center left-center gap-6 mt-4'>
              <button
                className='w-full md:w-fit px-6 bg-clemson rounded-lg py-4 text-white font-semibold font-greycliff text-xl'
                onClick={() =>
                  router.push('/certificate-of-mastery-in-packaging-management')
                }
              >
                Apply Now
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
    </div>
  );
};

export default CertificateHero;
