import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { API } from 'aws-amplify';
import { getLMSCourse, getLesson } from '../../src/graphql/queries';
import { PlayCircleIcon } from '@heroicons/react/24/solid';
import { useThinkificLink } from '../../hooks/useThinkificLink';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from 'react-device-detect';

import VideoPlayer from '../VideoPlayer';
import { createNewOrder, registgerCourseClick } from '../../helpers/api';

const WiredCourseCard = ({
  id,
  external,
  reference,
  Icon,
  callout,
  link_text,
  coupon,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHover, setIsHovered] = useState(false);
  const [isLesson, setIsLesson] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { navigateToThinkific } = useThinkificLink();
  const { location, awsUser } = useSelector((state) => state.auth);

  useEffect(() => {
    const getCurrentCourse = async () => {
      const res = await API.graphql({
        query: getLMSCourse,
        variables: { id: id },
      });
      if (res.data.getLMSCourse) {
        setIsLesson(res.data.getLMSCourse);
      }
    };

    id && getCurrentCourse();
  }, [id]);

  const orderHandler = async (course) => {
    const orderId = await createNewOrder({
      courseDescription: course.subheadline,
      courseDiscount: 100,
      courseImage: course.seoImage,
      courseName: course.title,
      courseLink: reference ? `${course.link}?${reference}` : course.link,
      total: course.price,
      userID: awsUser ? awsUser.id : null,
      email: awsUser ? awsUser.email : null,
      name: awsUser ? awsUser.name : null,
    });

    if (awsUser && awsUser.name.includes(' ')) {
      navigateToThinkific(
        reference ? `${course.link}?${reference}` : course.link,
        reference ? `${course.link}?${reference}` : course.link
      );
    } else {
      router.push(`/order/${orderId.id}`);
    }
  };

  const cardClickHandler = async () => {
    await registgerCourseClick(
      isLesson.id,
      router.asPath,
      location,
      isLesson.link,
      'LIBRARY'
    );

    !external && !reference
      ? router.push(`/courses/${isLesson.slug}`)
      : reference
      ? orderHandler(isLesson)
      : // window.open(isLesson.link + `?${reference}`, '_blank')
        window.open(isLesson.link, '_blank');
  };

  return isLesson ? (
    <motion.div
      className='w-full min-h-[270px] max-h-[455px] max-w-[300px] rounded-lg shadow-xl bg-cover bg-bottom bg-opacity-60 relative bg-black'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div className='absolute z-[1] left-0 right-0 bottom-0 top-1/3 bg-gradient-to-t from-neutral-900 via-neutral-500 rounded-b-lg'></motion.div>
      <motion.div
        className='absolute z-0 left-0 right-0 top-0 bottom-1/3 bg-black rounded-t-lg bg-cover bg-center bg-no-repeat w-full h-auto'
        style={{
          backgroundImage: `url(${isLesson.seoImage})`,
        }}
      >
        <img
          src={isLesson.seoImage}
          alt={isLesson.subheadline}
          className='opacity-0'
        />
      </motion.div>
      {callout && (
        <motion.div className='w-full justify-center items-center gap-1.5 h-12 backdrop-blur text-center border-b border-b-neutral-200 rounded-t-lg flex relative z-[2] bg-neutral-800/40'>
          <motion.div>
            <Icon className='w-5 h-5 stroke-white' />
          </motion.div>
          <motion.div className=' font-bold text-white '>{callout}</motion.div>
        </motion.div>
      )}
      {isPlaying ? (
        <motion.div className='aspect-[16/9] w-full h-auto relative z-[2] flex items-center justify-center bg-black transition-opacity ease-in'>
          <VideoPlayer
            videoEmbedLink={isLesson.preview}
            light={false}
            playing={true}
          />
        </motion.div>
      ) : isMobile ? (
        <motion.div
          className='aspect-[16/9] w-full h-auto relative z-[2] flex items-center justify-center '
          onClick={isLesson.preview ? () => setIsPlaying(true) : () => {}}
        >
          {isLesson.preview && (
            <motion.div className='w-20 h-20 bg-white/40 backdrop-blur-lg hover:bg-clemson transition-colors ease-in rounded-full shadow-xl flex justify-center items-center cursor-pointer'>
              <PlayCircleIcon className='w-20 h-20' />
            </motion.div>
          )}
        </motion.div>
      ) : (
        <motion.div
          className='aspect-[16/9] w-full h-auto relative z-[2] flex items-center justify-center '
          onClick={isLesson.preview ? () => setIsPlaying(true) : () => {}}
        >
          {isLesson.preview && isHover && (
            <motion.div className='w-20 h-20 bg-white/40 backdrop-blur-lg hover:bg-clemson transition-colors ease-in rounded-full shadow-xl flex justify-center items-center cursor-pointer'>
              <PlayCircleIcon className='w-20 h-20' />
            </motion.div>
          )}
        </motion.div>
      )}
      <motion.div className='flex flex-col justify-center items-center h-[225px]'>
        <motion.div className='mt-6 h-full min-h-[180px] bg-white/90 backdrop-blur shadow-lg rounded-b-lg mx-2 rounded-lg mb-4 relative z-[2] flex flex-col flex-1'>
          <motion.div className='w-full h-10 bg-gradient-to-t from-white/80 absolute bottom-0'></motion.div>
          <motion.div className='flex flex-col gap-3 h-full pt-3'>
            <motion.div className='font-semibold text-lg tracking-tight leading-none px-3 text-neutral-900'>
              {isLesson.title}
            </motion.div>
            <motion.div
              className='text-sm leading-tight px-3 pb-6 mb-4 text-neutral-600 overflow-x-scroll'
              id='scrollers'
            >
              {isLesson.subheadline}
            </motion.div>
          </motion.div>
        </motion.div>
        <motion.div
          className='bg-black w-full rounded-b-lg z-10 relative text-center cursor-pointer'
          onClick={
            isLesson.altLink
              ? window.open(isLesson.altLink, '_blank')
              : cardClickHandler
          }
        >
          <div className='text-white font-bold px-6 py-3'>
            {link_text ? link_text : 'Select Course'}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  ) : (
    <motion.div className='w-full min-h-[230px] max-h-[455px] max-w-[300px] rounded-lg shadow-xl bg-cover bg-bottom relative bg-neutral-200 flex flex-col gap-3 p-6'>
      <div className='w-full h-auto aspect-[4/3] rounded-xl bg-neutral-300 animate-pulse'></div>
      <div className='w-full h-3 rounded-2xl bg-neutral-300 animate-pulse'></div>
      <div className='w-full h-2 rounded-2xl bg-neutral-300 animate-pulse'></div>
      <div className='w-full h-2 rounded-2xl bg-neutral-300 animate-pulse'></div>
      <div className='w-full h-2 rounded-2xl bg-neutral-300 animate-pulse'></div>
      <div className='w-full h-2 rounded-2xl bg-neutral-300 animate-pulse'></div>
      <div className='w-full mt-4 h-6 rounded-2xl bg-neutral-300 animate-pulse'></div>
    </motion.div>
  );
};

export default WiredCourseCard;
