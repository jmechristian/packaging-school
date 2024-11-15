import React from 'react';
import CPSTestimonials from '../shared/CPSTestimonials';
const CyberTestimonials = () => {
  return (
    <div className='w-full h-full pb-24'>
      <div className='flex flex-col items-center justify-center w-full h-full gap-10'>
        <h2 className='text-2xl md:text-3xl font-semibold'>
          Trusted by Your Peers
        </h2>
        <CPSTestimonials />
      </div>
    </div>
  );
};

export default CyberTestimonials;
