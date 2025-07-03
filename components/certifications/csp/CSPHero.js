import React from 'react';
import { ArrowLongRightIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';

import VideoPlayer from '../../VideoPlayer';
import FadeIn from '../../../helpers/FadeIn';

const CSPHero = () => {
  const router = useRouter();

  return (
    <div className='w-full max-w-7xl mx-auto lg:!pr-6 xl:!pr-0'>
      <div className='grid gap-9 lg:gap-6 lg:grid-cols-2 overflow-hidden w-full h-full'>
        <div className='w-full h-full p-6 xl:!p-0 flex flex-col justify-center max-w-xl mx-auto'>
          <div className='flex flex-col gap-10'>
            <div>
              <FadeIn>
                <h1 className='text-4xl xl:!text-5xl  dark:text-white'>
                  Certificate of Sustainable Packaging (CSP)
                </h1>
              </FadeIn>
            </div>
            <div>
              <FadeIn>
                <p className='lg:!text-lg lg:!leading-normal font-greycliff text-slate-700 dark:text-gray-500 tracking-wide'>
                  Navigating the trade offs of sustainable packaging design is
                  no easy feat, that is why the Packaging School has developed a
                  program to empower industry professionals to navigate the
                  complexities of sustainable packaging design. The Certificate
                  of Sustainable Packaging equips companies with internal
                  champions, seasoned in the do’s and don’ts of sustainable
                  packaging, catalyzing a positive change in the realms of
                  sustainability, cost savings, and more.
                </p>
              </FadeIn>
            </div>
            <div>
              <FadeIn>
                <div className='flex flex-col md:flex-row items-center gap-6'>
                  <button
                    className='w-full md:!w-fit px-9 bg-clemson rounded-lg py-4 text-white font-semibold font-greycliff xl:!text-xl'
                    onClick={() =>
                      router.push(
                        'https://learn.packagingschool.com/enroll/2772370?price_id=3600658'
                      )
                    }
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
                    <div className='font-semibold xl:!text-xl font-greycliff dark:text-base-brand'>
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
        <div
          className='w-full bg-contain bg-center relative bg-no-repeat aspect-[4/3] flex justify-center items-center'
          style={{
            backgroundImage: `url('https://packschool.s3.amazonaws.com/csp-hero.png')`,
          }}
        >
          <div className='w-full max-w-[78%] mx-auto absolute -translate-x-1/2 left-1/2 xl:!left-1/2'>
            <VideoPlayer
              hideSupport={true}
              videoEmbedLink={
                'https://player.vimeo.com/video/888839253?h=c1a4d5982a&amp;badge=0&amp;autopause=0&amp;quality_selector=1&amp;player_id=0&amp;app_id=58479'
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CSPHero;
