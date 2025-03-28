import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { API } from 'aws-amplify';
import { MdArrowDropDown, MdVideocam, MdCancel } from 'react-icons/md';
import { getLMSCourse } from '../../src/graphql/queries';
import VideoPlayer from '../VideoPlayer';
import { setColorByCategoryString } from '../../helpers/utils';
import BrutalCircleIconTooltip from './BrutalCircleIconTooltip';
import { registgerCourseClick } from '../../helpers/api';
import { useSelector } from 'react-redux';
import ExpandableDiv from './ExpandableDiv';

const LMCCourseTableItem = ({ course, id }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isCourse, setIsCourse] = useState(course ? course : undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isError, setIsError] = useState(false);

  const { location } = useSelector((state) => state.auth);

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
      } else {
        setIsError(true);
      }
      setIsLoading(false);
    };

    if (!course) {
      getCourse();
    }
  }, [id, course]);

  const setCategoryText = (cat) => {
    switch (cat) {
      case 'Materials':
        return 'Materials';
      case 'MATERIALS':
        return 'Materials';
      case 'Industry':
        return 'Industry';
      case 'INDUSTRY':
        return 'Industry';
      case 'Design':
        return 'Design';
      case 'DESIGN':
        return 'Design';
      case 'FOODANDBEVERAGE':
        return 'Food & Bev';
      case 'Food & Beverage':
        return 'Food & Bev';
      case 'Supply Chain & Logistics':
        return 'Supply Chain & Logistics';
      case 'SUPPLYCHAIN':
        return 'Supply Chain & Logistics';
      case 'Business':
        return 'Business';
      case 'BUSINESS':
        return 'Business';
      case 'AUTO':
        return 'Automotive';
    }
  };

  const cardClickHandler = async () => {
    setIsLoading(true);
    await registgerCourseClick(
      isCourse.id,
      router.asPath,
      location,
      isCourse.slug,
      'TABLE'
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
    setIsLoading(false);
  };

  return (
    isCourse && (
      <div
        className={`w-full border-2 border-black bg-base-brand bg-opacity-20 relative group hover:bg-opacity-40 transition-all ease-in ${
          isLoading ? 'ring-4 ring-clemson' : ''
        }`}
      >
        {/* VIDEO PLAYER */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div className='fixed w-screen h-screen inset-0 bg-black z-50 flex items-center justify-center'>
              <div className='w-full mx-auto max-w-7xl flex flex-col gap-5'>
                <div className='w-full aspect-[16/9] bg-white/50'>
                  <VideoPlayer
                    videoEmbedLink={isCourse.preview}
                    light={false}
                    playing={true}
                  />
                </div>
                <div
                  className='flex items-center justify-center gap-1 !cursor-pointer'
                  onClick={() => setIsPlaying(false)}
                >
                  <div>
                    <MdCancel size={18} color='white' />
                  </div>
                  <div className='text-white font-semibold text-center text-lg'>
                    Close
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* DESKTOP */}
        {/* MAIN */}

        <div className='hidden lg:grid lg:grid-cols-12 gap-3 divide-x-black w-full px-2 py-2 min-h-[90px]'>
          <div
            className='col-span-4 pl-2 content-center !cursor-pointer'
            onClick={cardClickHandler}
          >
            <div className='grid grid-cols-4'>
              <div className='col-span-1 text-xs content-center'>
                {isCourse.courseId}
              </div>
              <div className='col-span-3 flex flex-col gap-1'>
                <div className='flex items-center'>
                  {isCourse.categoryArray.map((cat, i) => (
                    <div
                      className='flex items-center pl-0.5 pr-0.5 first:pl-0'
                      key={cat}
                    >
                      <div className='text-xs font-semibold leading-tight text-neutral-500 '>
                        {setCategoryText(cat)}
                      </div>
                      {isCourse.categoryArray.length > 1 && i === 0 ? (
                        <div className='text-xs text-neutral-500'>/</div>
                      ) : (
                        <></>
                      )}
                    </div>
                  ))}
                </div>
                <div className='h4-base'>{isCourse.title}</div>
              </div>
            </div>
          </div>
          <div
            className='col-span-1 content-center cursor-pointer'
            onClick={cardClickHandler}
          >
            <div className='font-semibold text-sm'>
              {isCourse.price === 'FREE' ? 'Free' : '$' + isCourse.price}
            </div>
          </div>
          <div className='flex items-center gap-2 col-span-5 '>
            <ExpandableDiv content={isCourse.subheadline} />
          </div>

          <div className='col-span-2 content-center cursor-pointer'>
            <div className='grid grid-cols-3 w-full gap-3 text-center text-sm'>
              <div
                className='font-bold content-center'
                onClick={cardClickHandler}
              >
                {isCourse.hours}
              </div>
              <div
                className='font-bold content-center'
                onClick={cardClickHandler}
              >
                {isCourse.lessons}
              </div>
              {isCourse.preview ? (
                <div className='content-center mx-auto'>
                  <BrutalCircleIconTooltip
                    tooltip={'Preview'}
                    bgColor={'bg-white'}
                    fn={() => setIsPlaying(!isPlaying)}
                  >
                    <MdVideocam color='black' size={24} />
                  </BrutalCircleIconTooltip>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>

        {/* MOBILE */}
        {/* MAIN */}
        <div className='flex flex-col lg:hidden'>
          <div className='grid grid-cols-6 min-h-[68px] content-center'>
            <div className='col-span-1 text-xs content-center px-1'>
              {isCourse.courseId}
            </div>
            <div className='col-span-3 flex flex-col gap-0 py-1.5 content-center'>
              <div className='flex flex-col'>
                {isCourse.categoryArray.map((cat, i) => (
                  <div
                    className='flex items-center pl-0.5 pr-0.5 first:pl-0'
                    key={cat}
                  >
                    <div className='text-xs font-semibold leading-tight text-neutral-500 px-1'>
                      {setCategoryText(cat)}
                    </div>
                  </div>
                ))}
              </div>
              <div className='font-semibold tracking-[-0.01em] leading-tight px-1 text-sm md:text-base pr-6'>
                {isCourse.title}
              </div>
            </div>
            <div className='grid grid-cols-3 col-span-2 w-full content-center'>
              <div className='text-xs font-medium col-span-1'>
                {isCourse.hours}
              </div>
              <div className='text-xs font-medium col-span-1'>
                {isCourse.lessons}
              </div>
              <div className='text-xs font-medium col-span-1'>
                ${isCourse.price}
              </div>
            </div>
          </div>
          <AnimatePresence>
            {isOpen && (
              <motion.div>
                <div className='border-y-2 border-y-black bg-white p-2.5'>
                  <div className='text-sm leading-tight'>
                    {isCourse.subheadline}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* INFO BAR */}
          <div
            className={`w-full ${setColorByCategoryString(
              isCourse.categoryArray[0]
            )}`}
          >
            <div className='w-full flex justify-between items-center'>
              <div className='grid grid-cols-3 w-fit gap-5 content-center'>
                <div className='w-6 h-full border-r-2 border-t-2 border-black bg-white flex items-center justify-center'>
                  <div
                    className={`${isOpen ? 'rotate-180' : 'rotate-0'}`}
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <MdArrowDropDown size={20} />
                  </div>
                </div>
                <div className='text-sm text-white font-semibold content-center py-1'>
                  {isCourse.price === 'FREE' ? 'FREE' : `$${isCourse.price}`}
                </div>
              </div>
              <div className='flex items-center gap-5 mr-3'>
                {isCourse.preview ? (
                  <div
                    className='text-sm text-white/80 font-semibold text-right cursor-pointer'
                    onClick={() => {
                      setIsPlaying(true);
                    }}
                  >
                    Preview
                  </div>
                ) : (
                  <></>
                )}

                <div
                  className='text-sm text-white font-semibold text-right cursor-pointer'
                  onClick={cardClickHandler}
                >
                  View More
                </div>
              </div>
            </div>
          </div>
          {/* INFO */}
        </div>
      </div>
    )
  );
};

export default LMCCourseTableItem;
