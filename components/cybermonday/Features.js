import React from 'react';
import { registerCyberMondayClick, getDeviceType } from '../../helpers/api';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { SpringCards } from './SpringCards';
import { BrutalButton } from '@jmechristian/ps-component-library';
const Features = () => {
  const { location } = useSelector((state) => state.auth);
  const router = useRouter();
  const deviceType = getDeviceType();

  const handleEnrollButtonClick = async () => {
    await registerCyberMondayClick({
      country: location.country,
      device: deviceType,
      ipAddress: location.ip,
      object: 'features-button',
    });
    router.push(
      'https://learn.packagingschool.com/enroll/39015?price_id=39006&coupon=cybermonday24'
    );
  };

  return (
    <div className='w-full py-24'>
      <div className='max-w-7xl mx-auto grid lg:grid-cols-2 place-items-center'>
        <div className='lg:col-span-1'>
          <SpringCards />
        </div>
        <div className='w-full flex flex-col gap-6 lg:pl-10 xl:pl-24 text-center lg:text-left py-16 lg:py-0 px-5 xl:px-0'>
          <h2 className='text-3xl md:text-4xl font-semibold'>
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
          <div className='w-full flex justify-center lg:justify-start'>
            <BrutalButton
              text='Reveal Your Offer'
              background='bg-clemson'
              link='https://learn.packagingschool.com/enroll/39015?price_id=39006&coupon=cybermonday24'
              textColor='text-black'
              clickFn={handleEnrollButtonClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
