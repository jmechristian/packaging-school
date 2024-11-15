import React from 'react';
import { MdMap } from 'react-icons/md';
import ShimmerCard from './ShimmerCard';
import { BrutalButton } from '@jmechristian/ps-component-library';

const CyberCta = () => {
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
            40% Off CPS Certification, No Application required. Seize this
            limited-time chance to step into a future of endless opportunities
            in packaging.
          </h2>
          <p className='text-zinc-400'>
            Begin your journey to becoming a Certified Packaging Specialist
            today. This is more than a certification – it’s an opportunity to
            master the science and strategy of packaging, connect with industry
            experts, and gain a credential that sets you apart. With 40% off and
            no application needed, now’s your moment to invest in your career
            and step confidently into the future of packaging.
          </p>
          <div className='w-full flex'>
            <BrutalButton
              text='Save $1600 – No Application Required!'
              background='bg-clemson'
              link='https://learn.packagingschool.com/enroll/39015?price_id=39006&coupon=cybermonday24'
              textColor='text-white'
            />
          </div>
        </div>
        <div className='flex flex-col gap-5'>
          <ShimmerCard
            headline='1. Enroll'
            subheadline='What is the process to get them in the system?'
            background='bg-brand-yellow'
            isHovering={true}
            clickFn={() => {
              window.location.href =
                'https://learn.packagingschool.com/enroll/39015?price_id=39006&coupon=cybermonday24';
            }}
          />
          <ShimmerCard
            headline='2. Learn'
            subheadline='We should tell them what to expect, sucinctly and clearly.'
            background='bg-neutral-800'
            textColor='text-neutral-500'
          />
          <ShimmerCard
            headline='3. Excel'
            subheadline='Show off to your peers and strap in. Something.'
            background='bg-neutral-800'
            textColor='text-neutral-500'
          />
        </div>
      </div>
    </div>
  );
};

export default CyberCta;
