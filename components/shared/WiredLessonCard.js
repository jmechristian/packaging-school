import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { API } from 'aws-amplify';
import { getLesson } from '../../src/graphql/queries';
import { registgerLessonClick } from '../../helpers/api';

const WiredLessonCard = ({
  id,
  Icon,
  callout,
  link,
  targetedId,
  clicks,
  tracked,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHover, setIsHovered] = useState(false);
  const [isLesson, setIsLesson] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const lesson = await API.graphql({
        query: getLesson,
        variables: { id: id },
      });
      return { lesson };
    };

    getData()
      .then((res) => setIsLesson(res.lesson.data.getLesson))
      .then(() => setIsLoading(false));
  }, [id]);

  const cardClickHandler = async () => {
    await registgerLessonClick(isLesson.id, router.asPath, location);

    router.push(`/lessons/${isLesson.slug}`);
  };

  const { location } = useSelector((state) => state.auth);

  return (
    <motion.div className='w-full cursor-pointer' onClick={cardClickHandler}>
      {isLesson ? (
        <>
          <div className='w-full flex flex-col'>
            <div className='w-full aspect-[16/9] relative bg-gray-200 overflow-hidden'>
              {isLesson.seoImage && (
                <Image
                  src={isLesson.seoImage}
                  alt=''
                  fill
                  sizes='(max-width: 1024px) 100vw, 400px'
                  className='object-cover'
                  loading='lazy'
                />
              )}
            </div>
            <div className='font-semibold mt-3   text-gray-900 leading-tight'>
              {isLesson.title}
            </div>
            <div className=' text-gray-500 text-sm leading-tight line-clamp-4 mt-1.5'>
              {isLesson.subhead}
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </motion.div>
  );
};

export default WiredLessonCard;
