import React from 'react';
import FooterEmailSignup from '../../features/navigation/Footer/FooterEmailSignup';

const LessonSubscribe = () => {
  return (
    <div className='flex flex-col bg-base-brand/20 p-3 rounded gap-4'>
      <div className='flex items-start justify-between relative'>
        <div className='hidden lg:flex'>
          <div className='h-24 w-24 rounded-full bg-brand-yellow-light absolute -top-7 -left-0.5 z-10 overflow-hidden flex items-center justify-center'>
            <div
              className=' bg-contain bg-center absolute w-[80%] h-[80%] z-20 bg-no-repeat'
              style={{
                backgroundImage: `url(https://packschool.s3.us-east-1.amazonaws.com/LOTM-Logo-Final_White.png)`,
              }}
            ></div>
          </div>
        </div>

        <div className='font-light font-oswald uppercase text-brand-dark text-3xl lg:max-w-[150px] leading-none'>
          Knowledge is{' '}
          <span className='font-bold'>
            <span className='text-clemson'>Free!</span>
          </span>
        </div>
      </div>
      <div className='text-sm text-gray-700 leading-snug'>
        Receive a monthly dose of fresh insights across diverse topics,
        delivered straight to your inbox.
      </div>
      <FooterEmailSignup sm />
    </div>
  );
};

export default LessonSubscribe;
