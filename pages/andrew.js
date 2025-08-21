import React from 'react';
import AndrewHero from '../components/andrew/AndrewHero';
import AndrewAbout from '../components/andrew/AndrewAbout';
import AndrewVideo from '../components/andrew/AndrewVideo';
import GradientCTA from '../components/GradientCTA';
import Meta from '../components/shared/Meta';
import { MdLaunch } from 'react-icons/md';

const Page = () => {
  return (
    <>
      <Meta
        title={'Meet Dr. Andrew Hurley | Packaging Expert'}
        description={
          'Dr. Andrew Hurley is a Professor of Food, Nutrition and Packaging Science at Clemson University. Andrew chairs the curriculum committee, manages an internationally recognized consumer behavior research program, and has delivered over 100 presentations on package design globally.'
        }
      />
      <AndrewHero />
      <AndrewAbout />
      <AndrewVideo />
      <div className='bg-white dark:bg-gray-900'>
        <div className='px-6 py-24 sm:py-32 lg:px-8'>
          <div className='mx-auto max-w-2xl text-center'>
            <div className='h2-base'>
              Ready to Work Together? Let&apos;s Connect.
            </div>
            <p className='mx-auto mt-6 max-w-xl text-lg text-pretty text-gray-600 dark:text-gray-300'>
              Let’s move from ideas to action. Connect via email now to explore
              how our collaboration can create lasting impact.
            </p>
            <div className='mt-10 flex items-center gap-x-6 w-full justify-center'>
              <a
                href="mailto:me@drandrewhurley.com?subject=Let's%20Work%20Together"
                className='rounded-md font-greycliff bg-clemson px-6 py-3 font-semibold text-white shadow-sm hover:bg-clemson-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer text-lg focus-visible:outline-clemson flex items-center gap-x-2'
                target='_blank'
                rel='noopener noreferrer'
              >
                Connect on LinkedIn{' '}
                <MdLaunch className='w-7 h-7 text-white/50' />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
