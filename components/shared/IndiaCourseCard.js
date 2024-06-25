import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { setColorByCategory } from '../../helpers/utils';
import { AcademicCapIcon } from '@heroicons/react/24/solid';
import { FiTarget } from 'react-icons/fi';
import { MdVideocam, MdLocalGroceryStore, Md360 } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { registgerIndiaCourseClick } from '../../helpers/api';

import VideoPlayer from '../VideoPlayer';
import BrutalCircleIconTooltip from './BrutalCircleIconTooltip';
import { API } from 'aws-amplify';
import { getLMSCourse } from '../../src/graphql/queries';

const IndiaCourseCard = ({ course, id, icons, coupon, paymentLink }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isCourse, setIsCourse] = useState(course ? course : undefined);
  const [isBackgroundColor, setIsBackgroudColor] = useState('bg-clemson');
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRate, setIsRate] = useState(83.5);
  const { location } = useSelector((state) => state.auth);

  const router = useRouter();

  useEffect(() => {
    const getCourse = async () => {
      const course = await API.graphql({
        query: getLMSCourse,
        variables: {
          id: id,
        },
      });
      if (course.data.getLMSCourse) {
        setIsCourse(course.data.getLMSCourse);
        setIsBackgroudColor(
          setColorByCategory(course.data.getLMSCourse.categoryArray)
        );
      } else {
        setIsError(true);
      }
    };

    if (course) {
      setIsLoading(true);
      setIsCourse(course);
      setIsBackgroudColor(setColorByCategory(course.categoryArray));
      setIsLoading(false);
    }

    if (!course && id) {
      setIsLoading(true);
      getCourse();
      setIsLoading(false);
    }

    // if (!course || !id) {
    //   return;
    // }
  }, [id, course]);

  function convertAndDiscount(
    amountUSD,
    discountPercentage,
    conversionRate = 83.62
  ) {
    // Apply discount
    let discountedAmount = amountUSD - amountUSD * (discountPercentage / 100);

    // Convert to INR
    let amountINR = discountedAmount * conversionRate;

    // Round to 2 decimal places
    amountINR = amountINR.toFixed(2);

    return amountINR;
  }

  // Example usage
  let amountUSD = isCourse && isCourse.price;
  let discountPercentage = 85;
  let conversionRate = isRate; // 1 USD = 82 INR
  let amountINR = convertAndDiscount(
    amountUSD,
    discountPercentage,
    conversionRate
  );

  const ogPriceConverted = convertAndDiscount(
    isCourse && isCourse.price,
    0,
    isRate
  );

  const cardClickHandler = async () => {
    await registgerIndiaCourseClick(
      isCourse.id,
      router.asPath,
      location,
      isCourse.slug,
      'CLICK'
    );

    router.push(`/courses/${isCourse.slug}`);
  };

  const cardFlipHandler = async () => {
    await registgerIndiaCourseClick(
      isCourse.id,
      router.asPath,
      location,
      isCourse.slug,
      'FLIP'
    );
  };

  const cardPurchaseHandler = async () => {
    await registgerIndiaCourseClick(
      isCourse.id,
      router.asPath,
      location,
      isCourse.stripeLink,
      'PURCHASE'
    );
    window.open(isCourse.stripeLink, '_blank');
  };

  return !isCourse || isLoading ? (
    <div className='w-[281px] h-[405px] relative mx-auto border-2 border-neutral-400 bg-neutral-200 rounded-2xl'>
      <div className='w-full h-full flex flex-col justify-between animate-pulse'>
        <div className='flex flex-col p-3 gap-1'>
          <div className='w-40 h-5 rounded-lg bg-neutral-300'></div>
          <div className='w-40 h-5 rounded-lg bg-neutral-300'></div>
          <div className='w-40 h-5 rounded-lg bg-neutral-300'></div>
        </div>
        <div className='flex w-full justify-between items-end p-3'>
          <div className='w-24 h-16 rounded-lg bg-neutral-300'></div>
          <div className='grid grid-cols-3 gap-2'>
            <div className='w-10 h-10 rounded-full bg-neutral-300'></div>
            <div className='w-full h-full rounded-full bg-neutral-300'></div>
            <div className='w-full h-full rounded-full bg-neutral-300'></div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <AnimatePresence>
      <motion.div
        animate={isLoading ? { opacity: 0 } : { opacity: 1 }}
        transition={{ ease: 'circOut', duration: 1 }}
        className='w-[281px] h-[405px] relative mx-auto'
      >
        {/* FRONT */}
        {/* OUTER CARD CONTAINER */}
        <motion.div
          className={` absolute transition-all group rounded-2xl border-2 overflow-hidden border-black ${isBackgroundColor} shadow-[0px_9px_0px_rgba(0,0,0,0.20)]  hover:shadow-[0px_12px_0px_rgba(0,0,0,0.15)] w-full h-full max-h-[520px] min-h-[405px] min-w-[281px] max-w-[360px] aspect-[360/520] p-2.5`}
          style={{ backfaceVisibility: 'hidden' }}
          transition={{ duration: 0.5 }}
          animate={{ rotateY: !isFlipped ? 0 : 180 }}
          initial={{ rotateY: 0 }}
        >
          {/* INNER CARD CONTAINER */}
          <div
            className='w-full h-full border-[3px] rounded-lg border-black relative bg-cover bg-top bg-no-repeat overflow-hidden'
            style={{ backgroundImage: `url(${isCourse.seoImage})` }}
          >
            {/* COURSE ID */}
            <div
              className='absolute right-0 top-1 py1 px-1.5 text-xs text-white z-10 cursor-pointer'
              onClick={cardClickHandler}
            >
              {isCourse.courseId}
            </div>
            {/* VIDEO */}
            {isPlaying && (
              <div className='w-full h-full absolute z-10 inset-0 bg-black'>
                <div className='w-full h-full relative flex items-center justify-center'>
                  <div
                    className='w-6 rounded-full bg-white/70 h-6 flex items-center cursor-pointer justify-center absolute top-1 right-1 z-30'
                    onClick={() => setIsPlaying(false)}
                  >
                    X
                  </div>
                  <VideoPlayer
                    videoEmbedLink={isCourse.preview}
                    light={false}
                    playing={true}
                  />
                </div>
              </div>
            )}
            <div className='w-full h-48 bg-gradient-to-b from-black/80 absolute inset-x-0 top-0 z-0'></div>
            <div className='w-full h-28 bg-gradient-to-t from-black/80 absolute inset-x-0 bottom-0 z-0'></div>
            {/* CONTENT */}
            <div
              className='flex flex-col gap-1.5 max-w-[160px] absolute z-20 top-3 cursor-pointer left-3 w-fit'
              onClick={cardClickHandler}
            >
              <div className='text-xl leading-none font-semibold text-white tracking-tight '>
                {isCourse.title}
              </div>
              <div className='flex items-center gap-2.5'>
                <div className='text-white uppercase text-xs font-medium bg-base-mid px-1'>
                  {isCourse.hours} Hours
                </div>
                <div className='text-white uppercase text-xs font-medium bg-base-mid px-1'>
                  {isCourse.lessons} Lessons
                </div>
              </div>
            </div>
            {/* BOTTOM */}
            <div className={`absolute z-20 right-0 left-0 bottom-0 p-1`}>
              <div className='flex items-end justify-between'>
                <div
                  className='flex flex-col gap-0 bg-black p-2 justify-center items-center cursor-pointer'
                  onClick={() => cardPurchaseHandler()}
                >
                  <div className='text-sm line-through text-white'>
                    ₹{ogPriceConverted}
                  </div>
                  <div className='h4-base text-amber-300'>
                    {isCourse.price === 'FREE' ? 'FREE' : '₹' + amountINR}
                    <sup>*</sup>
                  </div>
                </div>
                <div className='grid grid-cols-3 gap-1'>
                  {isCourse.preview ? (
                    <BrutalCircleIconTooltip
                      tooltip={'Preview'}
                      bgColor={'bg-white'}
                      fn={() => setIsPlaying(!isPlaying)}
                    >
                      <MdVideocam color='black' size={24} />
                    </BrutalCircleIconTooltip>
                  ) : (
                    <div></div>
                  )}

                  <BrutalCircleIconTooltip
                    tooltip={'Flip'}
                    bgColor={'bg-white'}
                    fn={() => {
                      cardFlipHandler();
                      setIsFlipped(!isFlipped);
                    }}
                  >
                    <Md360 color='black' size={24} />
                  </BrutalCircleIconTooltip>
                  <BrutalCircleIconTooltip
                    tooltip={'Buy'}
                    bgColor={'bg-brand-green'}
                    fn={() => cardPurchaseHandler()}
                  >
                    <MdLocalGroceryStore color='black' size={24} />
                  </BrutalCircleIconTooltip>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* BACK */}
        {/* OUTER CARD CONTAINER */}
        <motion.div
          className={`absolute transition-all hover:scale-105 ease-in group rounded-2xl border-2 overflow-hidden border-black ${isBackgroundColor} shadow-[0px_9px_0px_rgba(0,0,0,0.20)]  hover:shadow-[0px_12px_0px_rgba(0,0,0,0.15)] w-full h-full max-h-[520px] min-h-[405px] min-w-[281px] max-w-[360px] aspect-[360/520] p-2.5`}
          style={{ backfaceVisibility: 'hidden' }}
          transition={{ duration: 0.5 }}
          animate={{ rotateY: !isFlipped ? 180 : 0 }}
          initial={{ rotateY: 180 }}
        >
          {/* INNER CARD CONTAINER */}
          <div
            className={`w-full h-full border-[3px] rounded-lg bg-white/80 border-black relative overflow-y-scroll`}
            id='scrollers'
          >
            {/* CONTENT */}
            <div className='flex flex-col gap-4 absolute z-20 top-3 left-3 w-fit pr-3 pb-5 mt-16'>
              <div className='leading-none font-semibold text-black tracking-tight'>
                {isCourse.subheadline}
              </div>
              {isCourse.objectives ? (
                <div className='flex flex-col gap-3'>
                  <div className='border-y-2 border-y-black py-1.5 '>
                    <div className='flex items-center gap-1'>
                      <div className='bg-white rounded-full'>
                        <FiTarget />
                      </div>
                      <div className='text-sm font-semibold'>
                        Course Objectives
                      </div>
                    </div>
                  </div>
                  <div>
                    {isCourse.objectives.map((obj, i) => (
                      <div
                        className='text-xs border-b-2 border-b-black border-dotted last:border-b-0 leading-tight py-2'
                        key={i}
                      >
                        {obj}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <></>
              )}
              {isCourse.what_learned ? (
                <div className='flex flex-col gap-3'>
                  <div className='border-y-2 border-y-black py-1.5 '>
                    <div className='flex items-center gap-1.5'>
                      <div>
                        <AcademicCapIcon className='w-5 h-5 fill-black' />
                      </div>
                      <div className='text-sm font-semibold'>
                        What You&apos;ll Learn
                      </div>
                    </div>
                  </div>
                  <div className='text-sm leading-tight'>
                    {isCourse.what_learned}
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
            {/* BOTTOM */}
            <div className={`sticky z-20 right-0 left-0 top-0 p-1`}>
              <div className='w-full h-28 bg-gradient-to-t from-black/80 absolute inset-x-0 bottom-0 z-0'></div>
              <div className='flex items-center justify-between relative z-10'>
                <div className='pl-3 text-lg font-bold text-white tracking-tight'>
                  {isCourse.price === 'FREE' ? 'FREE' : '₹' + amountINR}
                </div>
                <div className='grid grid-cols-3 gap-1'>
                  <div></div>

                  <BrutalCircleIconTooltip
                    tooltip={'Flip'}
                    bgColor={'bg-white'}
                    fn={() => {
                      setIsFlipped(!isFlipped);
                    }}
                  >
                    <Md360 color='black' size={24} />
                  </BrutalCircleIconTooltip>
                  <BrutalCircleIconTooltip
                    tooltip={'Buy'}
                    bgColor={'bg-brand-green'}
                    fn={() => cardPurchaseHandler()}
                  >
                    <MdLocalGroceryStore color='black' size={24} />
                  </BrutalCircleIconTooltip>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default IndiaCourseCard;
