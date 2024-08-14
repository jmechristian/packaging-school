import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { setColorByCategory } from '../../helpers/utils';
import { AcademicCapIcon } from '@heroicons/react/24/solid';
import { FiTarget } from 'react-icons/fi';
import {
  MdVideocam,
  MdLocalGroceryStore,
  MdInfo,
  MdZoomIn,
  Md360,
} from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { registerClick, registgerCourseClick } from '../../helpers/api';
import dynamic from 'next/dynamic';
const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });
import VideoPlayer from '../VideoPlayer';
import BrutalCircleIconTooltip from './BrutalCircleIconTooltip';
import { API } from 'aws-amplify';
import { getLMSCourse } from '../../src/graphql/queries';

const LMSCourseCard = ({ id, icons, coupon, courses, discount }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isCourse, setIsCourse] = useState([]);
  const [isBackgroundColor, setIsBackgroudColor] = useState('bg-clemson');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const { location } = useSelector((state) => state.auth);
  const { allCourses } = useSelector((state) => state.course_filter);
  const [isEntered, setIsEntered] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const getCourse = async () => {
      setIsLoading(true);
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
      setIsLoading(false);
    };

    id && getCourse();
  }, [id, courses]);

  const cardClickHandler = async () => {
    await registgerCourseClick(
      isCourse.id,
      router.asPath,
      location,
      isCourse.slug,
      'GRID'
    );

    isCourse.altLink
      ? window.open(isCourse.altLink, '_blank')
      : router.push(
          `/${
            isCourse.type && isCourse.type === 'COLLECTION'
              ? 'collections'
              : 'courses'
          }/${isCourse.slug}`
        );
  };

  const cardPurchaseHandler = async () => {
    await registgerCourseClick(
      isCourse.id,
      router.asPath,
      location,
      isCourse.link,
      'GRID'
    );
    coupon
      ? window.open(isCourse.link + `?${coupon}`, '_blank')
      : window.open(isCourse.link, '_blank');
  };

  function applyDiscount(originalPrice, discountPercentage) {
    // Calculate the discount amount
    const discountAmount = (originalPrice * discountPercentage) / 100;

    // Subtract the discount amount from the original price to get the discounted price
    const discountedPrice = originalPrice - discountAmount;

    return discountedPrice;
  }

  return (
    <div className='w-[281px] h-[405px] relative mx-auto overflow-hidden'>
      {isCourse ? (
        <>
          <motion.div
            className={` absolute transition-all group rounded-2xl border-2 overflow-hidden border-black  w-full h-full max-h-[520px] min-h-[405px] min-w-[281px] max-w-[360px] aspect-[360/520] p-2.5 ${isBackgroundColor}`}
            style={{ backfaceVisibility: 'hidden' }}
            transition={{ duration: 0.5 }}
            animate={{ rotateY: !isFlipped ? 0 : 180 }}
            initial={{ rotateY: 0 }}
            onMouseEnter={() => setIsEntered(true)}
            onMouseLeave={() => setIsEntered(false)}
          >
            {/* INNER CARD CONTAINER */}

            <div className='w-full h-full border-[3px] rounded-lg border-black relative bg-cover bg-top bg-no-repeat overflow-hidden'>
              {/* COURSE ID */}
              <motion.div
                initial={{ scale: 1 }}
                animate={isEntered ? { scale: 1.1 } : { scale: 1 }}
                className='bg-center bg-cover w-full h-full absolute z-[5]'
                style={{ backgroundImage: `url(${isCourse.seoImage})` }}
              ></motion.div>
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
                    <div className='w-full aspect-[16/9]'>
                      <ReactPlayer
                        url={isCourse.preview}
                        width={'100%'}
                        height={'100%'}
                        controls
                        light={true}
                        playing={true}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div className='w-full h-40 bg-gradient-to-b from-black/90 absolute inset-x-0 top-0 z-[8]'></div>
              <div className='w-full h-28 bg-gradient-to-t from-black/90 absolute inset-x-0 bottom-0 z-[8]'></div>
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
              <div
                className={`absolute z-20 right-0 left-0 bottom-0 w-full pb-1`}
              >
                <div className='flex items-end justify-between w-full px-1'>
                  {discount ? (
                    <div className='flex flex-col items-center'>
                      <div>
                        <div className='bg-black text-white font-bold px-2 py-1'>
                          <div className='text-xl'>
                            {'$'}
                            {parseInt(applyDiscount(isCourse.price, discount))}
                          </div>
                        </div>
                        <div className='line-through text-white text-center'>
                          {isCourse.price === 'FREE'
                            ? 'FREE'
                            : '$' + isCourse.price}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className='text-lg font-bold text-white tracking-tight'>
                      {isCourse.price === 'FREE'
                        ? 'FREE'
                        : '$' + isCourse.price}
                    </div>
                  )}

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
                        setIsFlipped(!isFlipped);
                      }}
                    >
                      <Md360 color='black' size={24} />
                    </BrutalCircleIconTooltip>
                    <BrutalCircleIconTooltip
                      tooltip={'Buy'}
                      bgColor={'bg-brand-green'}
                      fn={() => {
                        cardPurchaseHandler();
                      }}
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
                    {isCourse.price === 'FREE' ? 'FREE' : '$' + isCourse.price}
                  </div>
                  <div className='grid grid-cols-3 gap-1'>
                    <div></div>

                    <BrutalCircleIconTooltip
                      tooltip={'Flip'}
                      bgColor={'bg-white'}
                      bottom={true}
                      fn={() => {
                        setIsFlipped(!isFlipped);
                      }}
                    >
                      <Md360 color='black' size={24} />
                    </BrutalCircleIconTooltip>
                    <BrutalCircleIconTooltip
                      tooltip={'Buy'}
                      bgColor={'bg-brand-green'}
                      bottom={true}
                      fn={() => {
                        cardPurchaseHandler();
                      }}
                    >
                      <MdLocalGroceryStore color='black' size={24} />
                    </BrutalCircleIconTooltip>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default LMSCourseCard;
