import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { API } from 'aws-amplify';
import { getLMSCourse, getLesson } from '../../src/graphql/queries';
import { PlayCircleIcon } from '@heroicons/react/24/solid';

import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from 'react-device-detect';

import VideoPlayer from '../VideoPlayer';
import { registgerLessonClick } from '../../helpers/api';

const WiredLessonCardToo = ({
  id,
  external,
  reference,
  Icon,
  callout,
  link_text,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHover, setIsHovered] = useState(false);
  const [isLesson, setIsLesson] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const { location } = useSelector((state) => state.auth);

  useEffect(() => {
    const getCurrentCourse = async () => {
      const res = await API.graphql({
        query: getLesson,
        variables: { id: id },
      });
      if (res.data.getLesson) {
        setIsLesson(res.data.getLesson);
      }
    };

    id && getCurrentCourse();
  }, [id]);

  const cardClickHandler = async () => {
    await registgerLessonClick(isLesson.id, router.asPath, location, 'LIBRARY');

    !external
      ? router.push(`/lessons/${isLesson.slug}`)
      : reference
      ? window.open(isLesson.link + `${reference}`, '_blank')
      : window.open(isLesson.link, '_blank');
  };

  return isLesson ? (
    <motion.div
      className='w-full min-h-[270px] max-h-[455px] max-w-[300px] rounded-lg shadow-xl bg-cover bg-bottom bg-opacity-60 relative bg-black'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div className='absolute z-[1] left-0 right-0 bottom-0 top-1/3 bg-gradient-to-t from-neutral-900 via-neutral-500 rounded-b-lg'></motion.div>
      <motion.div
        className='absolute z-0 left-0 right-0 top-0 bottom-0 bg-black rounded-t-lg bg-cover bg-center bg-no-repeat w-full h-auto'
        style={{
          backgroundImage: `url(${isLesson.seoImage})`,
        }}
      >
        <img
          src={isLesson.seoImage}
          alt={isLesson.subhead}
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
      <div
        className='w-full h-auto aspect-[16/9] relative z-10 bg-center bg-contain'
        style={{ backgroundImage: `url(${isLesson.seoImage})` }}
      ></div>

      <motion.div className='flex flex-col justify-center items-center h-[225px]'>
        <motion.div className='mt-6 h-full min-h-[185px] bg-white/90 backdrop-blur shadow-lg rounded-b-lg mx-2 rounded-lg mb-4 relative z-[2] flex flex-col flex-1 '>
          <motion.div className='flex flex-col gap-3 h-full pt-4'>
            <motion.div className='font-semibold text-lg tracking-tight leading-none px-3 text-neutral-900'>
              {isLesson.title}
            </motion.div>
            <motion.div className='text-sm leading-tight px-3 line-clamp-6 text-neutral-600'>
              {isLesson.subhead}
            </motion.div>
          </motion.div>
        </motion.div>
        <motion.div
          className='bg-black w-full rounded-b-lg z-10 relative text-center cursor-pointer'
          onClick={cardClickHandler}
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

export default WiredLessonCardToo;
