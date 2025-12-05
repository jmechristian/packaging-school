import React, { useState, useEffect, useCallback } from 'react';
import MarqueeButton from './MarqueeButton';
import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import celebrateAnimation from '/public/confetti.json';
import booksAnimation from '/public/books.json';
import { getCoupons } from '../../helpers/api';
import { API, graphqlOperation } from 'aws-amplify';
import VideoPlayer from '../VideoPlayer';

const onUpdateCyberMondayCodeSubscription = /* GraphQL */ `
  subscription OnUpdateCyberMondayCode {
    onUpdateCyberMondayCode {
      id
      isUsed
    }
  }
`;

const CyberMonday = () => {
  const [isClaimed, setIsClaimed] = useState(false);
  const [remainingTime, setRemainingTime] = useState('00:00:00');
  const [coupons, setCoupons] = useState([]);
  const [todayCoupon, setTodayCoupon] = useState(null);
  const [showCopied, setShowCopied] = useState(false);

  // Function to fetch and set today's coupon based on UTC date
  const fetchAndSetTodayCoupon = useCallback(async () => {
    const coupons = await getCoupons();
    setCoupons(coupons);

    // Get today's date in UTC timezone in MM/DD/YYYY format
    const now = new Date();
    const utcFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'UTC',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    const parts = utcFormatter.formatToParts(now);
    const month = parts.find((p) => p.type === 'month').value;
    const day = parts.find((p) => p.type === 'day').value;
    const year = parts.find((p) => p.type === 'year').value;
    const formattedDate = `${month}/${day}/${year}`;

    // Also create a version without leading zeros for comparison
    const formattedDateNoPad = `${parseInt(month, 10)}/${parseInt(
      day,
      10
    )}/${year}`;

    // Find coupon that matches today's date (check both padded and non-padded formats)
    const today = coupons.find(
      (coupon) =>
        coupon.dayValid === formattedDate ||
        coupon.dayValid === formattedDateNoPad
    );
    setTodayCoupon(today);
    console.log('Today (UTC):', formattedDate, 'Coupon:', today);
    if (today && today.isUsed) {
      setIsClaimed(true);
    } else {
      setIsClaimed(false);
    }
  }, []);

  useEffect(() => {
    fetchAndSetTodayCoupon();
  }, [fetchAndSetTodayCoupon]);

  // Set up subscription for coupon updates
  useEffect(() => {
    if (!todayCoupon) return;

    const subscription = API.graphql(
      graphqlOperation(onUpdateCyberMondayCodeSubscription)
    ).subscribe({
      next: ({ value }) => {
        const update = value.data.onUpdateCyberMondayCode;

        // Check if this update is for today's coupon
        if (update.id === todayCoupon.id) {
          // Update the coupon in the coupons array (merge with existing data)
          setCoupons((prevCoupons) =>
            prevCoupons.map((coupon) =>
              coupon.id === update.id
                ? { ...coupon, isUsed: update.isUsed }
                : coupon
            )
          );

          // Update today's coupon (merge with existing data)
          setTodayCoupon((prev) => ({ ...prev, isUsed: update.isUsed }));

          // Update isClaimed status
          setIsClaimed(update.isUsed || false);
        }
      },
      error: (err) => {
        console.error('Subscription error:', err);
      },
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [todayCoupon]);

  useEffect(() => {
    const getNextResetTime = () => {
      const now = new Date();

      // Get current time in UTC
      const nowUTC = new Date(now.toISOString());

      // Create target time for 11:59 PM UTC today
      const targetUTC = new Date(
        Date.UTC(
          nowUTC.getUTCFullYear(),
          nowUTC.getUTCMonth(),
          nowUTC.getUTCDate(),
          23, // 11 PM
          59, // 59 minutes
          59, // 59 seconds
          999 // 999 milliseconds
        )
      );

      // If it's already past 11:59 PM UTC today, set target to 11:59 PM UTC tomorrow
      if (nowUTC >= targetUTC) {
        targetUTC.setUTCDate(targetUTC.getUTCDate() + 1);
      }

      return targetUTC.getTime() - nowUTC.getTime();
    };

    const updateCountdown = () => {
      const timeRemaining = getNextResetTime();

      if (timeRemaining <= 0) {
        // Day has reset - refetch coupons for the new day
        fetchAndSetTodayCoupon();
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
  }, [isClaimed, fetchAndSetTodayCoupon]);

  return (
    <div className='w-full flex flex-col gap-10 pt-20 overflow-hidden'>
      <div className='w-full max-w-6xl mx-auto'>
        <div className='flex flex-col gap-8'>
          <div className='flex flex-col justify-center items-center relative text-center max-w-4xl mx-auto gap-10'>
            <div className='w-48 h-48 absolute -top-12 lg:!top-2 -left-6 lg:!-left-16'>
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
            <div className='flex flex-wrap items-center justify-center relative font-oswald uppercase text-6xl lg:!text-7xl tracking-[-0.03em] gap-2 text-center font-base leading-[1em] px-4 lg:px-0'>
              10 Years of
              <span className='text-white bg-clemson px-4 pb-3 rounded-md font-medium mt-2'>
                Packaging Education
              </span>{' '}
              And{' '}
              <span className='text-clemson font-medium'>
                We&apos;re Just Getting Started
              </span>{' '}
            </div>
            <div className='text-xl lg:!text-3xl text-zinc-800 px-4 lg:!px-0 lg:!leading-[1.3em] mt-1'>
              For ten years, The Packaging School has empowered learners,
              creators, and industry leaders with accessible, world-class
              education. Join us and the 15,000+ learners as we shape the next
              decade of innovation, skills, and opportunity in packaging.
            </div>
          </div>
        </div>
      </div>
      <div className='w-full max-w-6xl mx-auto bg-zinc-900 rounded-[2.5rem] lg:!p-16 p-0 relative overflow-hidden lg:!mt-10'>
        {/* Spotlight gradient overlay */}
        <div
          className='absolute inset-0 pointer-events-none rounded-[2.5rem]'
          style={{
            background:
              'radial-gradient(ellipse 120% 80% at 50% 75%, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.12) 20%, rgba(255, 255, 255, 0.05) 42%, transparent 70%)',
          }}
        />
        {/* <div className='w-full flex flex-col gap-8 px-4 xl:px-0 items-center text-center relative z-10'>
          <div className='flex flex-col gap-8 items-center'>
            <div className='h2-base text-white'>
              1 code. <span className='text-clemson'>50% Off.</span>
              <span className='text-base-brand'> Every Day.</span>
            </div>
            <div className='text-white text-xl font-medium max-w-2xl'>
              Once per day, we release a 50% off code good for any certificate
              <sup>*</sup> or course. The first person to complete their
              purchase claims it—after that, it&apos;s gone until tomorrow.
            </div>
          </div>
          <div className='w-full flex flex-col items-center justify-center gap-2'>
            <MarqueeButton
              onClick={() => {
                if (!isClaimed && todayCoupon && todayCoupon.code) {
                  navigator.clipboard.writeText(todayCoupon.code);
                  setShowCopied(true);
                  setTimeout(() => {
                    setShowCopied(false);
                  }, 2000);
                }
              }}
            >
              {isClaimed || !todayCoupon
                ? 'No Code Remains'
                : 'Claim Your Code'}
            </MarqueeButton>
            {showCopied && (
              <div className='text-green-500 text-sm font-medium animate-fade-in'>
                Code copied!
              </div>
            )}
          </div>
          <div className='w-full h-px bg-gray-600'></div>
          <div className='flex flex-col gap-2 items-center'>
            <div className='text-gray-400  font-medium'>
              Today&apos;s Code Status
            </div>
            <div
              className={`text-4xl font-bold flex items-center gap-2 ${
                !todayCoupon
                  ? 'text-gray-500'
                  : isClaimed || todayCoupon.isUsed
                  ? 'text-red-500'
                  : 'text-green-500'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full animate-pulse ${
                  !todayCoupon
                    ? 'bg-gray-500'
                    : isClaimed || todayCoupon.isUsed
                    ? 'bg-red-500'
                    : 'bg-green-500'
                }`}
              ></div>{' '}
              {!todayCoupon
                ? 'Unavailable'
                : isClaimed || todayCoupon.isUsed
                ? 'Claimed'
                : 'Available'}
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
                  Once the daily coupon is gone, it&apos;s gone.
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
                If the day&apos;s coupon has been claimed, celebrate with us and
                watch our new 10-Year Anniversary video. Be sure to{' '}
                <span className='text-clemson font-bold'>
                  check back tomorrow
                </span>{' '}
                for the next code.
              </div>
            </div>
          </div>
        </div> */}
        {/* <div className=' text-white mt-6 mb-12 px-6'>
          *If you&apos;re applying to the Certificate of Packaging Science, be
          sure to email us at info@packagingschool.com after you apply to claim
          your coupon.
        </div> */}
        <VideoPlayer
          videoEmbedLink='https://youtu.be/IG8CPI5EM_4?si=848YCPfTPrnEDUwX'
          light={true}
        />
      </div>
      <div className='w-full max-w-6xl mx-auto'></div>
    </div>
  );
};

export default CyberMonday;
