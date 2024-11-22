import React from 'react';
import { MdMap } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import ShimmerCard from './ShimmerCard';
import { BrutalButton } from '@jmechristian/ps-component-library';
import { registerCyberMondayClick, getDeviceType } from '../../helpers/api';
const CyberCta = () => {
  const { location } = useSelector((state) => state.auth);
  const router = useRouter();
  const deviceType = getDeviceType();

  const handleCtaButtonClick = async () => {
    await registerCyberMondayClick({
      country: location.country,
      device: deviceType,
      ipAddress: location.ip,
      object: 'bottom-cta-button',
    });
    router.push(
      'https://learn.packagingschool.com/enroll/39015?price_id=39006&coupon=cybermonday24'
    );
  };

  const handleShimmerCardClick = async () => {
    await registerCyberMondayClick({
      country: location.country,
      device: deviceType,
      ipAddress: location.ip,
      object: `bottom-cta-shimmer`,
    });
    router.push(
      'https://learn.packagingschool.com/enroll/39015?price_id=39006&coupon=cybermonday24'
    );
  };

  return (
    <div className='w-full h-full bg-zinc-900 py-32'>
      <div className='grid lg:grid-cols-2 lg:max-w-7xl mx-auto px-5 xl:px-0 gap-10 md:gap-20 lg:gap-8 xl:gap-20 md:max-w-2xl'>
        <div className='flex flex-col justify-center w-full gap-5'>
          <div className='flex items-center gap-2'>
            <div>
              <MdMap color='#ffbe21' size={28} />
            </div>
            <div className='text-brand-yellow text-lg font-semibold uppercase'>
              Your Path Starts Here
            </div>
          </div>
          <h2 className='text-3xl lg:text-2xl md:text-4xl font-semibold text-zinc-50'>
            Seize this limited-time chance to step into a future of endless
            opportunities in packaging with the Certificate of Packaging
            Science.
          </h2>
          <p className='text-zinc-400'>
            Begin your journey to becoming a Certified Packaging Specialist
            today. This is more than a certification – it’s an opportunity to
            master the science and strategy of packaging, connect with industry
            experts, and gain a credential that sets you apart. Now’s your
            moment to invest in your career and step confidently into the future
            of packaging.
          </p>
          <div className='w-full flex'>
            <BrutalButton
              text='Reveal Your Offer'
              background='bg-clemson'
              link='https://learn.packagingschool.com/enroll/39015?price_id=39006&coupon=cybermonday24'
              textColor='text-white'
              clickFn={handleCtaButtonClick}
            />
          </div>
        </div>
        <div className='flex flex-col gap-5'>
          <ShimmerCard
            headline='1. Enroll'
            subheadline='What is the process to get them in the system?'
            background='bg-brand-yellow'
            isHovering={true}
            clickFn={handleShimmerCardClick}
          />
          <ShimmerCard
            headline='2. Learn'
            subheadline='13 courses that cover all major aspects of packaging materials, processes, and design.'
            background='bg-neutral-800'
            textColor='text-neutral-500'
          />
          <ShimmerCard
            headline='3. Excel'
            subheadline='Time to update that LinkedIn profile! Show off your new CPS certificate and shine.'
            background='bg-neutral-800'
            textColor='text-neutral-500'
          />
        </div>
      </div>
    </div>
  );
};

export default CyberCta;
