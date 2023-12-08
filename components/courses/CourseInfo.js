import React, { useEffect, useState } from 'react';
import CTAButtonLarge from '../CTAButtonLarge';
import CTAButtonTrial from '../CTAButtonTrial';
import CourseCertificate from './CourseCertificate';
import VideoPlayer from '../VideoPlayer';
import { useSelector } from 'react-redux';

const CourseInfo = ({
  seoImage,
  price,
  link,
  trialLink,
  certification,
  embedid,
}) => {
  const { allCourses } = useSelector((state) => state.course_filter);

  return (
    <section>
      <div className='dark:bg-dark-mid bg-slate-200 shadow-lg rounded-md'>
        <div className='flex flex-col gap-4 border-b border-b-slate-200 dark:border-b-slate-700 p-4 md:p-6 pt-8 lg:pt-8 lg:p-8'>
          <div className='flex flex-col gap-10'>
            {embedid ? (
              <div className='block h-full max-w-md aspect-[16/9]'>
                <VideoPlayer videoEmbedLink={embedid} />
              </div>
            ) : (
              <div
                className='block h-full max-w-md aspect-[16/9] bg-cover bg-center'
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
              <div className='flex flex-col gap-2'>
                <div className='font-medium black__white font-greycliff text-lg'>
                  Future Proof Your Skill
                </div>
                <div className='font-semibold black__white text-5xl lg:text-6xl font-greycliff'>
                  {price === 'FREE' ? 'Free!' : `$${price}`}
                </div>
              </div>
              <div className='flex flex-col gap-4'>
                <CTAButtonLarge link={link} />
                <CTAButtonTrial link={trialLink} />
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-4  p-8'>
          <CourseCertificate certification={certification} />
        </div>
      </div>
    </section>
  );
};

export default CourseInfo;
