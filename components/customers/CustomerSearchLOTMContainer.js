import { useState, useMemo, useEffect } from 'react';
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
import { useRouter } from 'next/router';
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
import WiredLessonCardToo from '../shared/WiredLessonCardToo';
import {
  registgerLessonClick,
  getAllLearningOfTheMonths,
} from '../../helpers/api';

const createDate = (date) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
};

const CustomerSearchLOTMContainer = () => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isActiveSearch, setIsActiveSearch] = useState(false);
  const [isSearchTerm, setIsSearchTerm] = useState('');
  const [allLessons, setAllLessons] = useState([]);
  const { location } = useSelector((state) => state.auth);
  // const { allLessons } = useSelector((state) => state.course_filter);

  useEffect(() => {
    const fetchLessons = async () => {
      const lessons = await getAllLearningOfTheMonths();
      console.log(lessons);
      setAllLessons(lessons);
    };
    fetchLessons();
  }, []);

  // const lessonsToShow = useMemo(() => {
  //   return (
  //     allLessons &&
  //     allLessons.filter(
  //       (o) =>
  //         o.title.toLowerCase().includes(isSearchTerm.toLowerCase()) ||
  //         o.subhead.toLowerCase().includes(isSearchTerm.toLowerCase())
  //     )
  //   );
  // }, [allLessons, isSearchTerm]);

  const lessonClickHandler = async () => {
    await registgerLessonClick(
      allLessons[0].id,
      router.asPath,
      location,
      'LIBRARY'
    );
    window.open(`/lessons/${allLessons[0].slug}`, '_blank');
  };

  return (
    allLessons &&
    allLessons.length > 0 && (
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
              {isSearchTerm.trim() === '' || allLessons.length === 0 ? (
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
                  {allLessons &&
                    allLessons.length > 0 &&
                    allLessons.map((link) => (
                      <WiredLessonCardToo
                        key={link.id}
                        id={link.id}
                        Icon={BookOpenIcon}
                        callout={createDate(link.createdAt)}
                        link_text={'View Lesson'}
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
                      allLessons && allLessons[0].seoImage
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
                </div>
              </div>
              <div className='w-full flex justify-center items-center px-6 py-5'>
                <motion.div className='flex flex-col gap-3'>
                  <motion.div className='font-semibold text-sm uppercase text-base-mid'>
                    {createDate(allLessons[0].createdAt)}
                  </motion.div>
                  <motion.div className='font-semibold text-2xl lg:text-3xl max-w-sm md:max-w-full tracking-tight leading-none'>
                    {allLessons[0].title}
                  </motion.div>
                  <motion.div className='leading-snug line-clamp-4 text-neutral-600 max-w-md md:max-w-full'>
                    {allLessons[0].subhead}
                  </motion.div>
                  <motion.div
                    className='bg-black text-white font-bold w-fit rounded-xl px-6 py-2 mt-2 cursor-pointer'
                    onClick={lessonClickHandler}
                  >
                    View Lesson
                  </motion.div>
                </motion.div>
              </div>
            </div>
            <div className='course-card-grid'>
              <WiredLessonCardToo
                key={allLessons[1].id}
                id={allLessons[1].id}
                Icon={BookOpenIcon}
                callout={createDate(allLessons[1].createdAt)}
                link_text={'View Lesson'}
              />

              <WiredLessonCardToo
                key={allLessons[2].id}
                id={allLessons[2].id}
                Icon={BookOpenIcon}
                callout={createDate(allLessons[2].createdAt)}
                link_text={'View Lesson'}
              />
              <WiredLessonCardToo
                key={allLessons[3].id}
                id={allLessons[3].id}
                Icon={BookOpenIcon}
                callout={createDate(allLessons[3].createdAt)}
                link_text={'View Lesson'}
              />
            </div>
          </div>
        )}

        {!isActiveSearch && isExpanded ? (
          <div className='course-card-grid'>
            {allLessons
              .slice(4)
              .filter((cou) => cou.type === 'LOTM')
              .map((cou) => (
                <WiredLessonCardToo
                  key={cou.id}
                  id={cou.id}
                  Icon={BookOpenIcon}
                  callout={createDate(cou.createdAt)}
                  link_text={'View Lesson'}
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
    )
  );
};

export default CustomerSearchLOTMContainer;
