import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { MdApps, MdDehaze, MdSort, MdOutlineSearch } from 'react-icons/md';
import { IoMdPricetags } from 'react-icons/io';
import { AnimatePresence, motion } from 'framer-motion';
import LessonTableItem from '../../components/shared/LessonTableItem';
import {
  ContentScroller,
  MobileSwipeableContent,
} from '@jmechristian/ps-component-library';
import '@jmechristian/ps-component-library/dist/style.css';
import { API } from 'aws-amplify';
import LessonCardItem from '../../components/shared/LessonCardItem';
import FeaturedLesson from '../../components/shared/FeaturedLesson';
import Pagination from '../../components/shared/Pagination';
import {
  getAllPublishedLessons,
  fetchAllIndexes,
  registerIndexClick,
  getDeviceType,
} from '../../helpers/api';

const Page = () => {
  const { location } = useSelector((state) => state.auth);
  const router = useRouter();
  const deviceType = getDeviceType();
  const [isSearchTerm, setIsSearchTerm] = useState('');
  const [isFilter, setIsFilter] = useState(false);
  const [isFilters, setIsFilters] = useState([]);
  const [openSort, setOpenSort] = useState(false);
  const [isTable, setIsTable] = useState(false);
  const [isLessons, setIsLessons] = useState([]);
  const [isTags, setIsTags] = useState([]);
  const [isIndexes, setIsIndexes] = useState([]);
  const [isCurrentPage, setIsCurrentPage] = useState(1);

  const pageSize = 24;

  const lessonTop = useRef();

  const getLessonsQuery = /* GraphQL */ `
    query MyQuery {
      listLessons(limit: 1500, filter: { status: { eq: "PUBLISHED" } }) {
        items {
          author
          backdate
          content
          createdAt
          id
          objectives
          screengrab
          seoImage
          slug
          tags {
            items {
              tags {
                id
                tag
              }
            }
          }
          title
          type
          subhead
        }
      }
    }
  `;

  const getTagQuery = /* GraphQL */ `
    query MyQuery {
      listTags {
        items {
          tag
          lesson {
            items {
              id
            }
          }
          id
        }
      }
    }
  `;

  useEffect(() => {
    const getLessons = async () => {
      const lessons = await getAllPublishedLessons();
      setIsLessons(lessons);
    };

    const getTags = async () => {
      const tags = await API.graphql({
        query: getTagQuery,
      });
      setIsTags(tags.data.listTags.items);
    };

    const getIndexes = async () => {
      const indexes = await fetchAllIndexes();
      const publishedIndexes = indexes
        .filter((index) => index.status === 'PUBLISHED')
        .map((index) => ({
          id: index.id,
          title: JSON.parse(index.content).title,
          description: JSON.parse(index.content).description,
          hero: index.seoImage, // Replace with your placeholder URL
          link: `/${index.slug}`,
          video: index.video || '', // Assuming video is a field in the index
          authors: [
            {
              name: 'Mitch',
              picture:
                'https://packschool.s3.amazonaws.com/mitch-headshot-sm.png',
            },
          ],
          createdAt: index.updatedAt ? index.updatedAt : index.createdAt,
        }));
      setIsIndexes(publishedIndexes);
    };

    getLessons();
    getTags();
    getIndexes();
  }, []);

  function parseDate(dateString) {
    return new Date(dateString);
  }

  const sortedLessons = useMemo(() => {
    return (
      isLessons.length > 0 &&
      isLessons.sort((a, b) => {
        const dateA = a.backdate
          ? parseDate(a.backdate)
          : parseDate(a.createdAt);
        const dateB = b.backdate
          ? parseDate(b.backdate)
          : parseDate(b.createdAt);
        return dateB - dateA;
      })
    );
  }, [isLessons]);

  const filteredLessons = useMemo(() => {
    if (isFilters.length === 0 && sortedLessons) {
      return sortedLessons;
    }

    if (isFilters.length > 0 && sortedLessons) {
      return sortedLessons.filter((less) =>
        less.tags.items.some((t) => isFilters.includes(t.tags.tag))
      );
    }
  }, [sortedLessons, isFilters]);

  const lessonsToShow = useMemo(() => {
    if (!isSearchTerm && filteredLessons) {
      return filteredLessons;
    }

    if (isSearchTerm && filteredLessons) {
      return filteredLessons.filter(
        (cour) =>
          cour.title.toLowerCase().includes(isSearchTerm.toLowerCase()) ||
          cour.subhead.toLowerCase().includes(isSearchTerm.toLowerCase()) ||
          (cour.content &&
            cour.content.toLowerCase().includes(isSearchTerm.toLowerCase()))
      );
    }
  }, [isSearchTerm, filteredLessons]);

  const getItemLength = (tag) => {
    const items = sortedLessons.filter((less) =>
      less.tags.items.some((t) => t.tags.tag === tag)
    );

    return items.length.toString();
  };

  const isInFilterArray = (tag) => {
    return isFilters.includes(tag);
  };

  const tagFilterHandler = (tag) => {
    if (isInFilterArray(tag)) {
      setIsFilters(isFilters.filter((t) => t != tag));
    }

    if (!isInFilterArray(tag)) setIsFilters((prevState) => [...prevState, tag]);
  };

  const GFG = (array, currentPage, pageSize) => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return array.slice(startIndex, endIndex);
  };

  const handleHeroButtonClick = async (item) => {
    await registerIndexClick({
      country: location.country,
      device: deviceType,
      ipAddress: location.ip,
      page: item.title,
      type: 'INDEX',
    });
    router.push(item.link);
  };

  const paginatedItems = useMemo(() => {
    if (lessonsToShow) {
      const currentPageData = GFG(lessonsToShow, isCurrentPage, pageSize);
      return currentPageData;
    }
  }, [lessonsToShow, isCurrentPage]);

  return (
    <div className='container-base px-3 xl:px-0 flex flex-col gap-16'>
      <div className='flex flex-col gap-10 lg:!gap-16'>
        <div className='block lg:hidden'>
          <MobileSwipeableContent
            headline='Content Indices'
            subheadline='Explore expertly curated collections of research and best practices, offering deep insights into key topics shaping the packaging industry—designed to inspire innovation and elevate your expertise.'
            content={isIndexes}
            clickHandler={(item) => handleHeroButtonClick(item)}
          />
        </div>
        <div className='hidden lg:block'>
          <ContentScroller
            headline='Content Indices'
            subheadline='Explore expertly curated collections of research and best practices, offering deep insights into key topics shaping the packaging industry—designed to inspire innovation and elevate your expertise.'
            content={isIndexes}
            clickHandler={(item) => handleHeroButtonClick(item)}
          />
        </div>
      </div>
      <div className='w-full flex flex-col gap-5'>
        {/* HEADING */}
        <div
          className='w-full pb-5 border-b border-b-gray-300 flex justify-between items-center scroll-mt-6'
          ref={lessonTop}
        >
          <div className='h3-base'>Browse Lesson Library</div>
          {/* <div className='grid grid-cols-2 w-fit'>
            <div
              className={`w-10 h-10 ${
                isTable ? 'bg-black' : 'bg-neutral-300'
              } flex items-center justify-center cursor-pointer`}
              onClick={() => setIsTable(true)}
            >
              <MdDehaze color={isTable ? 'white' : 'gray'} size={24} />
            </div>
            <div
              className={`w-10 h-10 ${
                isTable ? 'bg-neutral-300' : 'bg-black'
              } flex items-center justify-center cursor-pointer`}
              onClick={() => setIsTable(false)}
            >
              <MdApps color={isTable ? 'gray' : 'white'} size={24} />
            </div>
          </div> */}
        </div>
        {/* SEARCH - FILTER */}
        <div className='!grid !grid-cols-3 lg:mb-3 gap-2.5'>
          {/* SEARCH */}
          <div className='w-full !col-span-3 lg:!col-span-2 border border-black p-1'>
            <div className='flex gap-2 items-center'>
              <input
                type='text'
                className='w-full flex border-none ring-0 focus:ring-0'
                placeholder='Search Lessons'
                value={isSearchTerm}
                onChange={(e) => setIsSearchTerm(e.target.value)}
              />
              <div>
                <MdOutlineSearch size={28} />
              </div>
            </div>
          </div>
          <div className='!col-span-3 lg:!col-span-1 flex justify-end gap-5 relative w-full'>
            {/* FILTER */}
            <AnimatePresence>
              {isFilter && (
                <motion.div className='w-[400px] absolute top-full right-0 mt-2.5 bg-black px-5 py-4 z-40'>
                  <div className='flex flex-col gap-5'>
                    <div className='flex flex-col gap-0.5'>
                      <div className='flex justify-between items-center w-full  border-b border-b-white pb-3'>
                        <div className='text-white  font-semibold'>
                          Filter by Tag
                        </div>
                        <div
                          className='bg-white px-2 py-1.5 text-xs font-medium cursor-pointer'
                          onClick={() => {
                            setIsFilter(false);
                          }}
                        >
                          Close
                        </div>
                      </div>
                      <div className='flex flex-wrap gap-1.5 mt-2'>
                        {isTags &&
                          isTags
                            .sort(
                              (a, b) =>
                                b.lesson.items.length - a.lesson.items.length
                            )
                            .map((t) => (
                              <div
                                key={t.id}
                                className={`text-xs uppercase font-semibold border ${
                                  isInFilterArray(t.tag)
                                    ? 'bg-white/50 border-amber-400 text-white'
                                    : 'border-black bg-white'
                                } hover:bg-clemson transition-colors ease-in  px-1.5 py-1 cursor-pointer`}
                                onClick={() => tagFilterHandler(t.tag)}
                              >
                                {t.tag} &#40;{getItemLength(t.tag)}&#41;
                              </div>
                            ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              {/* SORT */}
            </AnimatePresence>
            {/* CLEAR */}
            {isFilters.length > 0 ? (
              <div
                className='h-full flex justify-center text-center leading-tight items-center px-4 text-red-600 cursor-pointer'
                onClick={() => setIsFilters([])}
              >
                Clear Filters
              </div>
            ) : (
              <></>
            )}
            {/* FILTER BUTTON */}
            <div
              className={`border-black border cursor-pointer h-full flex gap-1 px-5 py-2 w-full md:w-48 justify-center items-center transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 shadow-[2px_2px_0px_black] hover:shadow-[6px_6px_0px_black] ${
                !isFilter && isFilters.length > 0
                  ? 'bg-brand-indigo text-white'
                  : 'bg-white'
              }`}
              onClick={() => {
                setOpenSort(false);
                setIsFilter(!isFilter);
              }}
            >
              <IoMdPricetags size={24} />
              <div className='font-semibold'>Tags</div>
            </div>
          </div>
        </div>
        {/* LESSONS */}
        {paginatedItems && paginatedItems.length > 0 && isTable ? (
          <div className='flex flex-col gap-2'>
            {paginatedItems.map((less) => (
              <LessonTableItem less={less} key={less.id} />
            ))}
          </div>
        ) : paginatedItems && paginatedItems.length > 0 && !isTable ? (
          <div className='!grid md:!grid-cols-2 lg:!grid-cols-3 gap-2 lg:!gap-5'>
            {paginatedItems.map((less) => (
              <LessonCardItem less={less} key={less.id} />
            ))}
          </div>
        ) : (
          <div className='w-full text-center animate-pulse'>
            Gathering Intel...
          </div>
        )}
        <div className='w-full flex flex-wrap justify-center items-center gap-1 mt-3'>
          <Pagination
            totalItems={lessonsToShow && lessonsToShow.length}
            itemsPerPage={pageSize}
            currentPage={isCurrentPage}
            onPageChange={(page) => {
              setIsCurrentPage(page);
              lessonTop.current?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
