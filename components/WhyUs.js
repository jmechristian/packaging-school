import React from 'react';
import DoubleTestimonial from './DoubleTestimonial';
import VideoPlayer from './VideoPlayer';
import Link from 'next/link';

const WhyUs = () => {
  return (
    (<div className='py-16 md:py-24'>
      <div className='mx-auto max-w-7xl sm:px-6 lg:px-8'>
        <div className='mx-auto flex max-w-2xl flex-col gap-16 bg-white/5 py-16 px-6 ring-1 ring-white/10 sm:rounded-3xl sm:p-8 lg:mx-0 lg:max-w-none lg:flex-row lg:items-center lg:py-20 xl:gap-x-20 xl:px-20'>
          <div className='w-full flex-auto'>
            <h2 className='text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl font-greycliff'>
              Learn the language of packaging and discover its opportunities.
            </h2>
            <p className='mt-6 text-lg leading-8 text-slate-500'>
              The Packaging School has assembled thousands of learning assets
              for you. We’ve broken down complex ideas into easy to understand
              concepts. We help you see the why behind packaging wins and
              losses. Like air and water packaging surrounds us and will be a
              key to sustainability. Check out the example video here, and then
              come take a journey of discovery with us..
            </p>
            <div className='mt-10 flex cursor-pointer'>
              <Link
                href='/about'
                className='text-lg font-greycliff font-bold leading-6 text-clemson'>
                Why Choose Us? <span aria-hidden='true'>&rarr;</span>

              </Link>
            </div>
          </div>
          <div className='w-full h-full aspect-[16/9]'>
            <VideoPlayer videoEmbedLink='https://www.youtube.com/embed/9bmHX0h6jJw' />
          </div>
        </div>
      </div>
    </div>)
  );
};

export default WhyUs;
