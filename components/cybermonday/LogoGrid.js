import React from 'react';

const LogoGrid = () => {
  return (
    <div className='w-full h-full bg-zinc-900 pt-12 pb-24'>
      <div className='flex flex-col items-center justify-center w-full h-full'>
        <h2 className='text-3xl font-semibold text-zinc-50'>
          Trusted by Leading Brands
        </h2>
        <div className='max-w-7xl mx-auto mt-10 grid grid-cols-3 items-center gap-x-4 gap-y-10  sm:grid-cols-3 lg:grid-cols-6 lg:mx-0 opacity-60'>
          <img
            className='col-span-2 max-h-28 w-full object-contain lg:col-span-1 p-1'
            src='https://packschool.s3.amazonaws.com/bmw.png'
            alt='BWM'
            width={400}
            height={400}
          />
          <img
            className='col-span-2 max-h-28 w-full object-contain lg:col-span-1'
            src='https://packschool.s3.amazonaws.com/starbucks-coffee-logo.png'
            alt='Starbucks'
            width={400}
            height={400}
          />
          <img
            className='col-span-2 max-h-28 w-full object-contain lg:col-span-1 invert p-4'
            src='https://packschool.s3.amazonaws.com/coke.png'
            alt='Coke'
            width={400}
            height={400}
          />
          <img
            className='col-span-2 max-h-28 w-full object-contain sm:col-start-2 lg:col-span-1 p-2'
            src='https://packschool.s3.us-east-1.amazonaws.com/sm-westrock-rev.png'
            alt='Smurfit Westrock'
            width={400}
            height={400}
          />
          <img
            className='col-span-2 col-start-2 max-h-28 w-full object-contain sm:col-start-auto lg:col-span-1 invert'
            src='https://packschool.s3.amazonaws.com/3m.png'
            alt='3M'
            width={400}
            height={400}
          />
          <img
            className='col-span-2 col-start-2 max-h-28 w-full object-contain sm:col-start-auto lg:col-span-1 invert p-5'
            src='https://packschool.s3.us-east-1.amazonaws.com/colgate-iso.png'
            alt='3M'
            width={400}
            height={400}
          />
        </div>
      </div>
    </div>
  );
};

export default LogoGrid;
