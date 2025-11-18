import React, { useState, useEffect } from 'react';
import MarqueeButton from '../../components/shared/MarqueeButton';
import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import celebrateAnimation from '/public/confetti.json';
import booksAnimation from '/public/books.json';

const Page = () => {
  const [isClaimed, setIsClaimed] = useState(false);
  const [remainingTime, setRemainingTime] = useState('00:00:00');

  useEffect(() => {
    const getNextResetTime = () => {
      const now = new Date();

      // Get current time in Eastern timezone
      const easternTime = new Date(
        now.toLocaleString('en-US', { timeZone: 'America/New_York' })
      );

      // Create target time for 9 AM Eastern today
      const targetTime = new Date(easternTime);
      targetTime.setHours(9, 0, 0, 0);

      // If it's already past 9 AM today, set target to 9 AM tomorrow
      if (easternTime >= targetTime) {
        targetTime.setDate(targetTime.getDate() + 1);
      }

      // Convert back to UTC for calculation
      const targetUTC = new Date(
        targetTime.toLocaleString('en-US', { timeZone: 'UTC' })
      );
      const nowUTC = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));

      return targetUTC.getTime() - nowUTC.getTime();
    };

    const updateCountdown = () => {
      const timeRemaining = getNextResetTime();

      if (timeRemaining <= 0) {
        // Reset the coupon
        setIsClaimed(false);
        setRemainingTime('00:00:00');
        return;
      }

      // Calculate hours, minutes, and seconds
      const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
      const minutes = Math.floor(
        (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

      // Format as HH:MM:SS
      const formattedTime = `${String(hours).padStart(2, '0')}:${String(
        minutes
      ).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      setRemainingTime(formattedTime);
    };

    // Update immediately
    updateCountdown();

    // Update every second
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [isClaimed]);

  return (
    <div className='w-full flex flex-col gap-16 py-20'>
      <div className='w-full max-w-6xl mx-auto'>
        <div className='flex flex-col gap-10'>
          <div className='flex flex-col justify-center items-center relative text-center max-w-4xl mx-auto gap-12'>
            <div className='w-48 h-48 absolute top-1 -left-16'>
              <Lottie
                animationData={celebrateAnimation}
                loop={true}
                className='w-full h-full'
              />
            </div>
            <div className='w-48 h-48 absolute bottom-[35%] -right-20'>
              <Lottie
                animationData={booksAnimation}
                loop={true}
                className='w-full h-full'
              />
            </div>
            <div className='flex flex-wrap items-center justify-center relative font-oswald uppercase text-7xl tracking-[-0.03em] gap-2 text-center font-base leading-[0.99em]'>
              Celebrating{' '}
              <span className='text-white bg-clemson px-4 pb-3 rounded-md font-medium mt-2'>
                10 Years
              </span>{' '}
              With{' '}
              <span className='text-clemson font-medium'>10 Days of Deals</span>{' '}
              at The Packaging School!
            </div>
            <div className='text-xl text-zinc-800'>
              Give yourself the gift of education this season! To celebrate our
              10-year anniversary, we’re launching 10 days of limited,
              first-come-first-serve coupons—a new one released every day. Will
              you be the first to snag it?
            </div>
          </div>
        </div>
      </div>
      <div className='w-full max-w-6xl mx-auto bg-zinc-900 rounded-[2.5rem] p-16 relative overflow-hidden'>
        {/* Spotlight gradient overlay */}
        <div
          className='absolute inset-0 pointer-events-none rounded-[2.5rem]'
          style={{
            background:
              'radial-gradient(ellipse 120% 80% at 50% 75%, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.12) 20%, rgba(255, 255, 255, 0.05) 40%, transparent 70%)',
          }}
        />
        <div className='w-full flex flex-col gap-8 px-4 xl:px-0 items-center text-center relative z-10'>
          <div className='flex flex-col gap-8 items-center'>
            <div className='h2-base text-white'>
              10 Codes. <span className='text-clemson'>50% Off.</span>
              <span className='text-base-brand'> 10 Days.</span>
            </div>
            <div className='text-white text-xl font-medium max-w-2xl'>
              Once per day, we release a 50% off code good for any certificate
              <sup>*</sup> or course. The first person to complete their
              purchase claims it—after that, it’s gone until tomorrow.
            </div>
          </div>
          <MarqueeButton>Claim Your Code</MarqueeButton>
          <div className='w-full h-px bg-gray-600'></div>
          <div className='flex flex-col gap-2 items-center'>
            <div className='text-gray-400  font-medium mt-4'>
              Today&apos;s Code Status
            </div>
            <div
              className={`text-4xl font-bold flex items-center gap-2 ${
                isClaimed ? 'text-red-500' : 'text-green-500'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full animate-pulse ${
                  isClaimed ? 'bg-red-500' : 'bg-green-500'
                }`}
              ></div>{' '}
              {isClaimed ? 'Claimed' : 'Available'}
            </div>
            <div className='text-gray-400  font-medium mt-4'>
              Time Until Next Code
            </div>
            <div className='text-white text-2xl font-bold'>{remainingTime}</div>
          </div>
          <div className='w-full h-px bg-gray-600'></div>
          <div className='grid lg:grid-cols-3 gap-8 w-full mt-4'>
            <div className='w-full h-full bg-gray-200 flex flex-col gap-4 p-6 rounded-2xl items-center text-center'>
              <div className='w-16 h-16 bg-clemson rounded-full flex items-center justify-center text-2xl font-bold text-white'>
                1
              </div>
              <div className='text-gray-800 text-lg font-medium leading-relaxed'>
                Check the website each day to check the status of that
                day&apos;s code.{' '}
                <span className='text-clemson font-bold'>
                  Once the daily coupon is gone, it’s gone.
                </span>
              </div>
            </div>
            <div className='w-full h-full bg-gray-200 flex flex-col gap-4 p-6 rounded-2xl items-center text-center'>
              <div className='w-16 h-16 bg-clemson rounded-full flex items-center justify-center text-2xl font-bold text-white'>
                2
              </div>
              <div className='text-gray-800 text-lg font-medium leading-relaxed'>
                This anniversary offer applies to{' '}
                <span className='text-clemson font-bold'>
                  all certificates<sup>*</sup> and courses
                </span>{' '}
                (except the Certificate of Mastery in Packaging Management
                program).
              </div>
            </div>
            <div className='w-full h-full bg-gray-200 flex flex-col gap-4 p-6 rounded-2xl items-center  text-center'>
              <div className='w-16 h-16 bg-clemson rounded-full flex items-center justify-center text-2xl font-bold text-white'>
                3
              </div>
              <div className='text-gray-800 text-lg font-medium leading-relaxed'>
                If day&apos;s coupon has been claimed, celebrate with us and
                watch our new 10-Year Anniversary video. Be sure to{' '}
                <span className='text-clemson font-bold'>
                  check back tomorrow
                </span>{' '}
                for the next code.
              </div>
            </div>
          </div>
        </div>
        <div className=' text-white text-center mt-8 px-6'>
          *If you’re applying to the Certificate of Packaging Science, be sure
          to email us at info@packagingschool.com after you apply to claim your
          coupon.
        </div>
      </div>
      <div className='w-full max-w-6xl mx-auto'></div>
    </div>
  );
};

export default Page;
