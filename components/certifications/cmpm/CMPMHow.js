import React from 'react';
import Image from 'next/image';
import FadeIn from '../../../helpers/FadeIn';
import { SectionHeading } from '../../shared/SectionHeading';
import {
  ChatBubbleLeftRightIcon,
  LightBulbIcon,
  RssIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline';

const item = [
  {
    id: 1,
    icon: <LightBulbIcon className='w-8 h-8 stroke-slate-200' />,
    title: 'Weekly Updates with Dr. Suggs',
  },
  {
    id: 2,
    icon: <ChatBubbleLeftRightIcon className='w-8 h-8 stroke-slate-200' />,
    title: '1:1 Mentorship',
  },
  {
    id: 3,
    icon: <RssIcon className='w-8 h-8 stroke-slate-200' />,
    title: 'Open Communication',
  },
  {
    id: 4,
    icon: <TrophyIcon className='w-8 h-8 stroke-slate-200' />,
    title: 'Phd-Led Project',
  },
];

const CMPMHow = () => {
  return (
    <section id='how'>
      <div className='container-7xl flex flex-col  gap-16'>
        <FadeIn>
          <SectionHeading number='2'>How does it work?</SectionHeading>
        </FadeIn>
        <div className='grid md:grid-cols-2  gap-6 lg:gap-16'>
          <div className='flex flex-col gap-3'>
            <div className='w-full aspect-[3/4] lg:aspect-[4/3] relative rounded-lg max-w-md xl:max-w-xl mx-auto overflow-hidden'>
              <Image
                src='https://packschool.s3.amazonaws.com/JULIE-2018-sm.jpg'
                alt='Dr. Julie Suggs, Academic Director'
                fill
                sizes='(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 576px'
                className='object-cover object-center'
                loading='lazy'
              />
              <div className='absolute inset-0 bg-gradient-to-tr from-base-brand/80 to-clemson/40 z-5 rounded-lg'></div>
              <div className='absolute bottom-0 left-0 right-0 p-2'>
                <div className='grid grid-cols-2 lg:grid-cols-4 gap-2 w-full h-full text-center'>
                  {item.map((it) => (
                    <div
                      className='bg-white/40 flex flex-col px-2 gap-2 justify-center items-center backdrop-blur-sm shadow-sm w-full h-full aspect-[4/2] lg:aspect-[3/2] rounded-lg'
                      key={it.id}
                    >
                      <div>{it.icon}</div>
                      <div className=' text-slate-900 font-semibold leading-tight text-sm'>
                        {it.title}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className='absolute top-0 right-0 p-3'>
                <div className='flex flex-col leading-tight text-sm font-semibold text-white justify-end'>
                  <div>Dr. Julie Suggs</div>
                  <div>Academic Director</div>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-6'>
            <FadeIn>
              <div className='flex flex-col gap-9'>
                <div className='flex flex-col'>
                  <div className='font-bold text-4xl xl:text-5xl'>
                    <h2 className='dark:text-white'>12-weeks.</h2>
                  </div>
                  <div className='text-gray-500 font-bold text-4xl xl:text-5xl'>
                    PhD-Led.
                  </div>
                </div>
                <div className='text-lg dark:text-gray-500 max-w-prose'>
                  The Certificate of Mastery in Packaging Management is a
                  12-week program offered 5 times a year (spring, summer, fall
                  1, fall 2, and winter). To begin the process, simply complete
                  a brief application and submit the $25 application fee. If you
                  have any doubts or inquiries, Dr. Suggs, the program
                  instructor, is readily available for a call to address all
                  your questions and concerns.
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CMPMHow;
