import React, { useState, useEffect } from 'react';
import MarqueeButton from '../../components/shared/MarqueeButton';

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
    <div className='w-full flex flex-col gap-10 py-16'>
      <div className='w-full max-w-7xl mx-auto bg-black rounded-[2.5rem] p-20'>
        <div className='w-full flex flex-col gap-10 px-4 xl:px-0 items-center text-center'>
          <div className='flex flex-col gap-8 items-center'>
            <div className='h1-base text-white'>
              One Code. <span className='text-clemson'>One Chance.</span>
              <span className='text-base-brand'> Seven Days.</span>
            </div>
            <div className='text-white text-xl font-medium max-w-2xl'>
              Once per day, we release a 50% off code good for any certificate
              or course. The first person to complete their purchase claims
              it—after that, it’s gone until tomorrow.
            </div>
          </div>
          <MarqueeButton>Claim Your Code</MarqueeButton>
          <div className='w-full h-px bg-gray-600'></div>
          <div className='flex flex-col gap-2 items-center'>
            <div className='text-gray-400 text-sm font-medium mt-2'>
              Code Status
            </div>
            <div
              className={`text-2xl font-bold flex items-center gap-2 ${
                isClaimed ? 'text-red-500' : 'text-green-500'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full ${
                  isClaimed ? 'bg-red-500' : 'bg-green-500'
                }`}
              ></div>{' '}
              {isClaimed ? 'Claimed' : 'Available'}
            </div>
            <div className='text-gray-400 text-sm font-medium mt-2'>
              Time Until Next Code
            </div>
            <div className='text-white text-2xl font-bold'>{remainingTime}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
