import React from 'react';
import CardFilter from '../CardFilter';
import HomeCorporate from '../HomeCorporate';
import NewHomeTestimonials from '../NewHomeTestimonials';
import SelfPacedAccess from '../SelfPacedAccess';
import WhyPschool from '../../shared/WhyPschool';

const HomeVariantA = () => {
  return (
    <div className='w-full flex flex-col gap-16 lg:gap-20 relative py-16 lg:!py-24'>
      <SelfPacedAccess />
      <CardFilter />
      <WhyPschool />
      <div className='w-full h-px bg-clemson max-w-7xl mx-auto'></div>
      <NewHomeTestimonials />
      <div className='w-full h-px bg-clemson max-w-7xl mx-auto'></div>
      <HomeCorporate />
    </div>
  );
};

export default HomeVariantA;
