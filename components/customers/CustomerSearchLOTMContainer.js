import { useState, useMemo } from 'react';
import {
  ArrowTopRightOnSquareIcon,
  ArrowLongRightIcon,
  AcademicCapIcon,
  ArchiveBoxIcon,
  BoltIcon,
  BriefcaseIcon,
  Cog6ToothIcon,
  SwatchIcon,
  TruckIcon,
  InformationCircleIcon,
  RocketLaunchIcon,
  SparklesIcon,
  SignalIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import CourseCardVideoHeader from '../shared/CourseCardVideoHeader';
import NewCouseCard from '../shared/NewCouseCard';

import { motion, AnimatePresence } from 'framer-motion';
import {
  MagnifyingGlassIcon,
  ArrowsUpDownIcon,
  PlayCircleIcon,
  ChevronDoubleDownIcon,
  StarIcon,
  XMarkIcon,
  BoltIcon as Bolt,
} from '@heroicons/react/24/solid';

const createDate = (date) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
};

const CustomerSearchLOTMContainer = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isActiveSearch, setIsActiveSearch] = useState(false);
  const [isSearchTerm, setIsSearchTerm] = useState('');

  const { allLessons } = useSelector((state) => state.course_filter);

  const lessonsToShow = useMemo(() => {
    const lotm = [...allLessons]
      .filter((less) => less.type === 'LOTM')
      .sort((a, b) => {
        if (a.createdAt < b.createdAt) {
          return 1;
        }
        if (a.createdAt > b.createdAt) {
          return -1;
        }
      });

    return lotm.filter(
      (o) =>
        o.title.toLowerCase().includes(isSearchTerm.toLowerCase()) ||
        o.subhead.toLowerCase().includes(isSearchTerm.toLowerCase())
    );
  }, [allLessons, isSearchTerm]);

  return (
    <motion.section className='px-0 lg:px-6 w-full flex flex-col gap-12'>
      <div className='border-y border-y-neutral-400'>
        <div className='flex justify-between items-center py-3'>
          {isActiveSearch ? (
            <div className='w-full'>
              <input
                type='text'
                className='w-full bg-transparent border-none focus:border-none focus:ring-0 py-0 placeholder:text-neutral-400'
                autoFocus
                value={isSearchTerm}
                onChange={(e) => setIsSearchTerm(e.target.value)}
                id='search'
                name='search'
                placeholder='Enter search term'
              />
            </div>
          ) : (
            <div
              className='flex items-center gap-1.5 cursor-pointer'
              onClick={() => setIsActiveSearch(true)}
            >
              <div>
                <MagnifyingGlassIcon className='w-5 h-5 fill-neutral-500' />
              </div>
              <div className='uppercase text-sm text-neutral-500 text-small font-semibold'>
                Search
              </div>
            </div>
          )}

          <div className='flex items-center gap-1.5'>
            <div
              className={`uppercase text-sm text-neutral-500 text-small font-semibold ${
                isActiveSearch ? 'hidden' : 'block'
              }`}
            >
              Sort
            </div>
            {isActiveSearch ? (
              <div
                onClick={() => {
                  setIsActiveSearch(false);
                  setIsSearchTerm('');
                }}
              >
                <XMarkIcon className='w-5 h-5 fill-neutral-500' />
              </div>
            ) : (
              <div>
                <ArrowsUpDownIcon className='w-5 h-5 fill-neutral-500' />
              </div>
            )}
          </div>
        </div>
      </div>

      {isActiveSearch ? (
        <motion.div className='w-full flex items-center justify-center'>
          <div className='w-full h-full flex justify-center items-center'>
            {isSearchTerm.trim() === '' || lessonsToShow.length === 0 ? (
              <div className='flex flex-col items-center py-3'>
                <div className='font-bold text-neutral-800'>
                  No Results Found.
                </div>
                <div className='text-neutral-600 text-center'>
                  Please refine your search above.
                </div>
              </div>
            ) : (
              <div className='course-card-grid'>
                {lessonsToShow.map((link) => (
                  <NewCouseCard
                    key={link.title}
                    title={link.title}
                    description={link.subhead}
                    background={link.seoImage}
                    link={`/lessons/${link.slug}`}
                    link_text={'View Lesson'}
                    callout={createDate(link.createdAt)}
                    Icon={BookOpenIcon}
                  />
                ))}
              </div>
            )}
          </div>
        </motion.div>
      ) : (
        <div className='flex flex-col gap-12 justify-center items-center w-full max-w-[996px] mx-auto'>
          <div className='md:col-span-2 xl:col-span-3 grid overflow-hidden grid-cols-1 lg:grid-cols-2 bg-white rounded-xl shadow-lg max-w-[300px] md:max-w-none'>
            <div className='w-full rounded-xl flex items-center'>
              <div
                className='w-full aspect-[16/9] rounded-xl justify-center items-center flex bg-cover bg-center relative'
                style={{
                  backgroundImage: `url(${
                    lessonsToShow && lessonsToShow[0].seoImage
                  })`,
                }}
              >
                <motion.div className='absolute left-4 top-4 w-fit z-[2] bg-neutral-600/40 backdrop-blur-md rounded-xl px-2 py-1.5 shadow'>
                  <motion.div className='flex items-center gap-2'>
                    <motion.div>
                      <Bolt className='w-5 h-5 fill-white' />
                    </motion.div>
                    <motion.div className='text-white font-bold'>
                      Latest Release
                    </motion.div>
                  </motion.div>
                </motion.div>
                {/* <motion.div className='w-20 h-20 bg-white/40 backdrop-blur-lg hover:bg-clemson transition-colors ease-in rounded-full shadow-xl flex justify-center items-center cursor-pointer'>
                <PlayCircleIcon className='w-20 h-20' />
              </motion.div> */}
              </div>
            </div>
            <div className='w-full flex justify-center items-center px-6'>
              <motion.div className='flex flex-col gap-3 py-9 lg:py-12'>
                <motion.div className='font-semibold text-sm uppercase text-base-mid'>
                  {createDate(lessonsToShow[0].createdAt)}
                </motion.div>
                <motion.div className='font-semibold text-2xl lg:text-3xl max-w-sm md:max-w-full tracking-tight leading-none'>
                  {lessonsToShow[0].title}
                </motion.div>
                <motion.div className='leading-snug line-clamp-4 text-neutral-600 max-w-md md:max-w-full'>
                  {lessonsToShow[0].subhead}
                </motion.div>
                <motion.div
                  className='bg-black text-white font-bold w-fit rounded-xl px-6 py-2 mt-2 cursor-pointer'
                  onClick={() =>
                    window.open(`/lessons/${lessonsToShow[0].slug}`, '_blank')
                  }
                >
                  View Lesson
                </motion.div>
              </motion.div>
            </div>
          </div>
          <div className='course-card-grid'>
            <NewCouseCard
              title={lessonsToShow[1].title}
              description={lessonsToShow[1].subhead}
              background={lessonsToShow[1].seoImage}
              link={`/lessons/${lessonsToShow[1].slug}`}
              link_text={'View Lesson'}
              callout={createDate(lessonsToShow[1].createdAt)}
              Icon={BookOpenIcon}
            />
            <NewCouseCard
              title={lessonsToShow[2].title}
              description={lessonsToShow[2].subhead}
              background={lessonsToShow[2].seoImage}
              link={`/lessons/${lessonsToShow[2].slug}`}
              link_text={'View Lesson'}
              callout={createDate(lessonsToShow[2].createdAt)}
              Icon={BookOpenIcon}
            />
            <NewCouseCard
              title={lessonsToShow[3].title}
              description={lessonsToShow[3].subhead}
              background={lessonsToShow[3].seoImage}
              link={`/lessons/${lessonsToShow[3].slug}`}
              link_text={'View Lesson'}
              callout={createDate(lessonsToShow[3].createdAt)}
              Icon={BookOpenIcon}
            />
          </div>
        </div>
      )}

      {!isActiveSearch && isExpanded ? (
        <div className='course-card-grid'>
          {lessonsToShow
            .slice(4)
            .filter((cou) => cou.type === 'LOTM')
            .map((link) => (
              <NewCouseCard
                key={link.title}
                title={link.title}
                description={link.subhead}
                background={link.seoImage}
                link={`/lessons/${link.slug}`}
                link_text={'View Lesson'}
                callout={createDate(link.createdAt)}
                Icon={BookOpenIcon}
              />
            ))}
        </div>
      ) : (
        <div></div>
      )}

      {!isActiveSearch && (
        <div
          className='w-full flex justify-center mb-12'
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className='flex items-center gap-2 bg-clemson hover:bg-clemson-dark cursor-pointer text-white px-6 py-3 rounded-xl font-semibold shadow-md'>
            <div>{isExpanded ? 'Hide Courses' : 'Show All Lessons'}</div>
            <div>
              <ChevronDoubleDownIcon
                className={`w-5 h-5 fill-white transition-all ease-in ${
                  isExpanded ? 'rotate-180' : 'rotate-0'
                }`}
              />
            </div>
          </div>
        </div>
      )}
    </motion.section>
  );
};

export default CustomerSearchLOTMContainer;