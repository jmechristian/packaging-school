import Image from "next/legacy/image";
import React, { useMemo, useState } from 'react';
import { MdAccessTime, MdExtension } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';

import { setCategoryIcon } from '../../helpers/utils';
import VideoPlayer from '../VideoPlayer';

const CardThree = ({ id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const router = useRouter();

  const { allCourses } = useSelector((state) => state.course_filter);

  const cardLesson = useMemo(() => {
    return allCourses && allCourses.filter((c) => c.id === id);
  }, [id, allCourses]);

  return cardLesson ? (
    <motion.div
      className='w-[360px] h-[515px] bg-neutral-900 rounded-[22px] flex justify-center py-3 shadow-xl hover:shadow-2xl hover:scale-[102%] transition-all ease-in cursor-pointer'
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setIsPlaying(false);
      }}
      onClick={() =>
        router.push(`http://localhost:3000/sandbox/demo/${cardLesson[0].id}`)
      }
    >
      <div
        className={`w-[336px] h-full rounded-2xl ${
          cardLesson[0].partOf && cardLesson[0].partOf.includes('LEGENDARY')
            ? 'bg-yellow-100'
            : cardLesson[0].partOf && cardLesson[0].partOf.includes('EPIC')
            ? 'bg-gradient-to-b from-base-mid via-base-light to-white'
            : 'bg-white'
        }`}
      >
        <div
          className={`h-[77px]  rounded-t-xl flex items-center gap-3 ${
            cardLesson[0].partOf && cardLesson[0].partOf.includes('LEGENDARY')
              ? 'bg-clemson'
              : cardLesson[0].partOf && cardLesson[0].partOf.includes('EPIC')
              ? 'bg-base-mid'
              : 'bg-green-600'
          }`}
        >
          <div className='bg-neutral-900 -ml-2 h-full w-[73px] rounded-r-2xl flex items-center justify-center'>
            <div className='flex justify-center'>
              {cardLesson[0].partOf &&
              cardLesson[0].partOf.includes('LEGENDARY') ? (
                <Image
                  src={'https://packschool.s3.amazonaws.com/gold-diamon.png'}
                  alt='legendary'
                  width={45}
                  height={40}
                />
              ) : cardLesson[0].partOf &&
                cardLesson[0].partOf.includes('EPIC') ? (
                <Image
                  src={'https://packschool.s3.amazonaws.com/epics.png'}
                  alt='epic'
                  width={45}
                  height={40}
                />
              ) : (
                <Image
                  src={'https://packschool.s3.amazonaws.com/emerald-sm-2.png'}
                  alt='rare'
                  width={45}
                  height={40}
                />
              )}
            </div>
          </div>
          <div className='font-semibold text-xl text-white leading-none w-fit flex-1 pr-3'>
            {cardLesson[0].title}
          </div>
        </div>
        <div
          className='w-full h-auto aspect-[16/9] bg-cover bg-center relative'
          style={{
            backgroundImage: `url(${cardLesson[0].seoImage})`,
          }}
        >
          {cardLesson[0].preview && (
            <AnimatePresence>
              <motion.div
                className='absolute inset-0 z-10 bg-black/40 flex justify-center items-center opacity-0'
                initial={{ opacity: 0 }}
                animate={isHovering && { opacity: 1 }}
                exit={{ opacity: 0 }}
                key={isHovering}
              >
                {isHovering && isPlaying ? (
                  <motion.div className='aspect-[16/9] w-full h-auto relative z-[2] flex items-center justify-center bg-black transition-opacity ease-in'>
                    <VideoPlayer
                      videoEmbedLink={cardLesson[0].preview}
                      light={false}
                      playing={true}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    onClick={() => setIsPlaying(true)}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isHovering && { opacity: 1, scale: '100%' }}
                    exit={{ scale: 0, opacity: 0 }}
                    key={isHovering}
                    className='w-[36%] h-full bg-contain bg-center bg-no-repeat '
                    style={{
                      backgroundImage: `url('https://packschool.s3.amazonaws.com/play-sm-2.png')`,
                    }}
                  ></motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
        <div className='bg-white w-full font-bold h-[45px] rounded-xl ring-6 ring-neutral-900 relative'>
          <div className='w-full px-3 flex items-center justify-between h-full'>
            <div className='font-bold text-lg'>
              {cardLesson[0].price === 'FREE'
                ? 'FREE'
                : '$' + cardLesson[0].price}
            </div>
            <div className='flex gap-1.5 items-center w-fit'>
              {cardLesson[0].categoryArray.map((c) => setCategoryIcon(c))}
              <div className='flex justify-center items-center text-lg'>
                {cardLesson[0].hours} <MdAccessTime color='black' size={19} />
              </div>
            </div>
          </div>
        </div>
        <div className='leading-tight px-4 pt-6 line-clamp-6'>
          {cardLesson[0].subheadline}
        </div>
      </div>
    </motion.div>
  ) : (
    <div className=''>Loading</div>
  );
};

export default CardThree;
