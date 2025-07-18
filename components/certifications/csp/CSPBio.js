import React from 'react';
import NewCouseCard from '../../shared/NewCouseCard';
import { AcademicCapIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';
import FadeIn from '../../../helpers/FadeIn';
import { SectionHeading } from '../../shared/SectionHeading';

const CSPBio = () => {
  return (
    <div
      className='w-full h-full bg-base-mid dark:bg-dark-mid rounded-2xl shadow-xl max-w-7xl mx-auto scroll-mt-36'
      id='reviews'
    >
      <div className='w-full flex flex-col lg:flex-row justify-between items-center gap-9 py-12 px-6 lg:px-12'>
        <div className='flex flex-col gap-9 pt-6 lg:pt-0'>
          <FadeIn>
            <SectionHeading number='4' className={'text-white ring-white'}>
              Want more sustainability?
            </SectionHeading>
          </FadeIn>
          <div>
            <h2 className='text-3xl md:text-4xl text-white max-w-xl'>
              Ready to Take the Lead in Sustainability? Expand Your Expertise
              Now!
            </h2>
          </div>
          <div className='w-full max-w-2xl lg:text-lg text-white font-medium'>
            With over two decades of industry experience, Dr. Sandeep Kulkarni,
            founder and President of KoolEarth Solutions Inc., and an adjunct
            professor at the Packaging School, guides students through the
            comprehensive exploration of bioplastics, offering insights,
            strategies, and a forward-looking perspective on integrating
            bioplastics into current applications.
          </div>
        </div>
        <div>
          <NewCouseCard
            title={'Bioplastics for Packaging'}
            description={
              'An online course that provides an introduction to the area of bioplastics and offers guidance on the usage of these materials for packaging applications.'
            }
            background={
              'https://packschool.s3.us-east-1.amazonaws.com/bio-back.png'
            }
            link={
              'https://packagingschool.com/courses/intro-to-bioplastics-for-packaging'
            }
            link_text={'Select Course'}
            Icon={RocketLaunchIcon}
            callout={'Learning Boost'}
            video={'https://youtu.be/f0z17FbxJjU'}
          />
        </div>
      </div>
    </div>
  );
};

export default CSPBio;
