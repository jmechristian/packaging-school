import React, { useEffect, useState } from 'react';
import CTAButtonLarge from '../CTAButtonLarge';
import CTAButtonTrial from '../CTAButtonTrial';
import VideoPlayer from '../VideoPlayer';
import HoverCard from '../shared/HoverCard';
import { LuRocket } from 'react-icons/lu';
import { RocketLaunchIcon } from '@heroicons/react/24/outline';

const CCCourseInfo = ({
  seoImage,
  price,
  link,
  trialLink,
  certification,
  subscriptionLink,
  subscriptionPrice,
  embedid,
  partOf,
}) => {
  return (
    <section>
      <div className='dark:bg-dark-mid bg-slate-200 border-2 border-black shadow-[6px_6px_0px_rgba(0,0,0,0.20)]'>
        <div className='flex flex-col gap-4 border-b border-b-slate-200 dark:border-b-slate-700 p-4 md:p-6 pt-8 lg:pt-8 lg:p-8'>
          <div className='flex flex-col gap-10'>
            {embedid ? (
              <div className='block max-w-md aspect-[16/9]'>
                <VideoPlayer videoEmbedLink={embedid} hideSupport={true} />
              </div>
            ) : (
              <div
                className='block max-w-md aspect-[4/3] bg-contain bg-no-repeat bg-center'
                style={{
                  backgroundImage: `url(${
                    seoImage
                      ? seoImage
                      : 'https://packschool.s3.amazonaws.com/default-seo.png'
                  })`,
                }}
              ></div>
            )}
            <div className='flex flex-col gap-6'>
              <div className='flex flex-col gap-4'>
                <div className='h3-base'>Future Proof Your Skills</div>
                {subscriptionLink && subscriptionPrice ? (
                  <div className='grid grid-cols-2 border border-black'>
                    <div
                      className='w-full flex flex-col justify-center items-center border-l border-black p-5 gap-1.5 bg-white hover:bg-neutral-200 transition-all ease-in cursor-pointer'
                      onClick={() => window.open(`${link}`, '_blank')}
                    >
                      <div className='h4-base'>Buy Now</div>
                      <div className='h2-base'>${price}</div>
                      <div className='text-sm font-semibold text-neutral-500'>
                        6-Month Access
                      </div>
                      <div className='w-24 flex items-center justify-center bg-clemson border border-black mt-2'>
                        <div className='font-semibold py-1 cursor-pointer'>
                          Buy
                        </div>
                      </div>
                    </div>
                    <div
                      className='w-full flex flex-col justify-center items-center border-l border-black p-5 gap-1.5 bg-base-mid hover:bg-neutral-800 transition-all ease-in cursor-pointer'
                      onClick={() =>
                        window.open(`${subscriptionLink}`, '_blank')
                      }
                    >
                      <div className='h4-base text-white'>Subscribe</div>
                      <div className='h2-base text-white'>
                        ${subscriptionPrice}
                      </div>
                      <div className='text-sm font-semibold text-white'>
                        for 12 months
                      </div>
                      <div className='w-24 flex items-center justify-center bg-white border border-white mt-2'>
                        <div className='font-semibold py-1 cursor-pointer'>
                          Subscribe
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className='flex flex-col gap-4'>
                      <div className='font-semibold black__white text-5xl lg:text-6xl font-greycliff'>
                        {price === 'FREE' ? 'Free!' : `$${price}`}
                      </div>
                      <CTAButtonLarge link={link} />
                      <CTAButtonTrial link={trialLink} />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-4 p-4 xl:p-8'>
          {partOf && partOf.includes('APC') && (
            <HoverCard
              title={'Your Journey Starts Here'}
              href={'/certifications/get-to-know-apc'}
              subtitle={`This course as part of the  Autmotive Packaging Certificate. Exploring distinctive aspects of automotive packaging, with exclusive content unmatched by any other.`}
              Icon={LuRocket}
            />
          )}
          {partOf && partOf.includes('CPS') && (
            <HoverCard
              title={'Your Journey Starts Here'}
              href={'/certifications/get-to-know-cps'}
              subtitle={`This course as part of the  Certificate of Packaging Science, a comprehensive program covering all major aspects of packaging materials, processes, and design.`}
              Icon={LuRocket}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default CCCourseInfo;
