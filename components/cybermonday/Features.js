import React from 'react';
import { SpringCards } from './SpringCards';
import { BrutalButton } from '@jmechristian/ps-component-library';
const Features = () => {
  return (
    <div className='w-full py-24'>
      <div className='max-w-7xl mx-auto grid lg:grid-cols-2 place-items-center'>
        <div className='lg:col-span-1'>
          <SpringCards />
        </div>
        <div className='w-full flex flex-col gap-6 pl-24'>
          <h2 className='text-4xl font-semibold'>
            Become a Certified Packaging Specialist and Stand Out in the
            Industry
          </h2>
          <p className='text-lg  text-zinc-500'>
            Packaging is more than just design—it&apos;s strategy,
            sustainability, and science. The CPS certification by Packaging
            School is your opportunity to master these key areas and make an
            impact in your career. And today, it&apos;s more accessible than
            ever.
          </p>
          <div className='w-full flex'>
            <BrutalButton
              text='Enroll Now – No Application Required!'
              background='bg-clemson'
              link='/'
              textColor='text-black'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
