import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { getCoursesByCategory } from '../../../helpers/api';
import { useSelector } from 'react-redux';
import { H2, H4 } from '@jmechristian/ps-component-library';
import {
  MdOutlineSearch,
  MdAutoStories,
  MdEmojiEvents,
  MdScience,
  MdSort,
  MdArrowBack,
  MdCached,
} from 'react-icons/md';
import { EyeIcon } from '@heroicons/react/24/solid';

import LMCCourseTableItem from '../../../components/shared/LMCCourseTableItem';

const Page = () => {
  const router = useRouter();
  const { cat } = router.query;
  const { location } = useSelector((state) => state.auth);

  const [isSearchTerm, setIsSearchTerm] = useState('');
  const [isCourses, setIsCourses] = useState([]);
  const [isSort, setIsSort] = useState({ value: 'title', direction: 'ASC' });

  const sortedCourses = useMemo(() => {
    if (isSort.value === 'title' && isSort.direction === 'ASC') {
      return (
        isCourses &&
        [...isCourses].sort((a, b) => a.title.localeCompare(b.title))
      );
    }

    if (isSort.value === 'title' && isSort.direction === 'DSC') {
      return (
        isCourses &&
        [...isCourses].sort((a, b) => b.title.localeCompare(a.title))
      );
    }

    if (isSort.value === 'category' && isSort.direction === 'ASC') {
      return (
        isCourses &&
        [...isCourses].sort((a, b) =>
          a.categoryArray[0].localeCompare(b.categoryArray[0])
        )
      );
    }

    if (isSort.value === 'category' && isSort.direction === 'DSC') {
      return (
        isCourses &&
        [...isCourses].sort((a, b) =>
          b.categoryArray[0].localeCompare(a.categoryArray[0])
        )
      );
    }

    if (isSort.value === 'course id' && isSort.direction === 'ASC') {
      return (
        isCourses &&
        [...isCourses].sort((a, b) => a.courseId.localeCompare(b.courseId))
      );
    }

    if (isSort.value === 'course id' && isSort.direction === 'DSC') {
      return (
        isCourses &&
        [...isCourses].sort((a, b) => b.courseId.localeCompare(a.courseId))
      );
    }

    if (isSort.value === 'lessons' && isSort.direction === 'DSC') {
      return isCourses && [...isCourses].sort((a, b) => b.lessons - a.lessons);
    }

    if (isSort.value === 'lessons' && isSort.direction === 'ASC') {
      return isCourses && [...isCourses].sort((a, b) => a.lessons - b.lessons);
    }

    if (isSort.value === 'hours' && isSort.direction === 'ASC') {
      return (
        isCourses &&
        [...isCourses].sort((a, b) => parseFloat(a.hours) - parseFloat(b.hours))
      );
    }

    if (isSort.value === 'hours' && isSort.direction === 'DSC') {
      return (
        isCourses &&
        [...isCourses].sort((a, b) => parseFloat(b.hours) - parseFloat(a.hours))
      );
    }

    if (isSort.value === 'price' && isSort.direction === 'ASC') {
      return (
        isCourses &&
        [...isCourses].sort((a, b) => parseInt(a.price) - parseInt(b.price))
      );
    }

    if (isSort.value === 'price' && isSort.direction === 'DSC') {
      return (
        isCourses &&
        [...isCourses].sort((a, b) => parseInt(b.price) - parseInt(a.price))
      );
    }
  }, [isCourses, isSort]);

  const sortedAndSearchedCourses = useMemo(() => {
    if (!isSearchTerm && sortedCourses) {
      return sortedCourses;
    }

    if (isSearchTerm && sortedCourses) {
      return sortedCourses.filter(
        (cour) =>
          cour.title.toLowerCase().includes(isSearchTerm.toLowerCase()) ||
          cour.subheadline.toLowerCase().includes(isSearchTerm.toLowerCase()) ||
          (cour.what_learned &&
            cour.what_learned
              .toLowerCase()
              .includes(isSearchTerm.toLowerCase()))
      );
    }
  }, [isSearchTerm, sortedCourses]);

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await getCoursesByCategory(cat.toUpperCase());
      setIsCourses(res);
    };
    fetchCourses();
  }, [cat]);

  return sortedAndSearchedCourses.length > 0 ? (
    <div className='max-w-7xl mx-auto py-12 flex flex-col'>
      <h2 className='mb-9 capitalize h2-base'>{cat} Courses</h2>
      <div className='grid grid-cols-3 border-b-2 border-b-black pb-6 gap-2.5'>
        {/* SEARCH */}
        <div className='w-full col-span-3 lg:col-span-2 border-2 border-black p-1'>
          <div className='flex gap-2 items-center'>
            <input
              type='text'
              className='w-full flex border-none ring-0 focus:ring-0'
              placeholder='Search Courses'
              value={isSearchTerm}
              onChange={(e) => setIsSearchTerm(e.target.value)}
            />
            <div>
              <MdOutlineSearch size={28} />
            </div>
          </div>
        </div>
        <div className='w-full col-span-3 lg:col-span-1 content-center'>
          <div
            className='flex gap-1 w-full items-center justify-end hover:underline'
            onClick={() => router.push('/all_courses')}
          >
            <div>
              <EyeIcon className='w-5 h-5 cursor-pointer' />
            </div>
            <div className='text-sm font-semibold cursor-pointer hover:underline'>
              View All Courses
            </div>
          </div>
        </div>
      </div>
      <div className='hidden lg:grid lg:grid-cols-12 content-center gap-5 divide-x-black w-full mt-10 mb-2'>
        <div className='col-span-4'>
          <div className='grid grid-cols-4'>
            <div
              className={`${
                isSort.value === 'course id' ? 'underline' : ''
              } cursor-pointer col-span-1 text-sm font-semibold`}
              onClick={() =>
                setIsSort({
                  value: 'course id',
                  direction: isSort.direction === 'ASC' ? 'DSC' : 'ASC',
                })
              }
            >
              Course Id
            </div>
            <div className='text-sm font-semibold col-span-3'>
              <div>
                <span
                  className={`${
                    isSort.value === 'category' ? 'underline' : ''
                  } cursor-pointer`}
                  onClick={() =>
                    setIsSort({
                      value: 'category',
                      direction: isSort.direction === 'ASC' ? 'DSC' : 'ASC',
                    })
                  }
                >
                  Category
                </span>{' '}
                /{' '}
                <span
                  className={`${
                    isSort.value === 'title' ? 'underline' : ''
                  } cursor-pointer`}
                  onClick={() =>
                    setIsSort({
                      value: 'title',
                      direction: isSort.direction === 'ASC' ? 'DSC' : 'ASC',
                    })
                  }
                >
                  Title
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className='col-span-1'>
          <div className='text-sm font-semibold cursor-pointer'>
            <div
              className={`${
                isSort.value === 'price' ? 'underline' : ''
              } cursor-pointer`}
              onClick={() =>
                setIsSort({
                  value: 'price',
                  direction: isSort.direction === 'ASC' ? 'DSC' : 'ASC',
                })
              }
            >
              Price
            </div>
          </div>
        </div>
        <div className='col-span-5'>
          <div className='text-sm font-semibold'>
            <div>Description</div>
          </div>
        </div>
        <div className='col-span-2'>
          <div className='grid grid-cols-3 w-full gap-3 text-center'>
            <div className='text-sm font-semibold cursor-pointer'>
              <div
                className={`${
                  isSort.value === 'hours' ? 'underline' : ''
                } cursor-pointer`}
                onClick={() =>
                  setIsSort({
                    value: 'hours',
                    direction: isSort.direction === 'ASC' ? 'DSC' : 'ASC',
                  })
                }
              >
                Hours
              </div>
            </div>
            <div className='text-sm font-semibold cursor-pointer'>
              <div
                className={`${
                  isSort.value === 'lessons' ? 'underline' : ''
                } cursor-pointer`}
                onClick={() =>
                  setIsSort({
                    value: 'lessons',
                    direction: isSort.direction === 'ASC' ? 'DSC' : 'ASC',
                  })
                }
              >
                Lessons
              </div>
            </div>

            <div className='text-sm font-semibold'>
              <div className='lg:hidden xl:block'>Preview</div>
            </div>
            <div className='text-sm font-semibold'></div>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-0'>
        <div className='grid lg:hidden grid-cols-6 content-center gap-5 divide-x-black w-full px-2 py-2'>
          <div
            className={`${
              isSort.value === 'course id' ? 'underline' : ''
            } cursor-pointer col-span-1 text-xs font-semibold`}
            onClick={() =>
              setIsSort({
                value: 'course id',
                direction: isSort.direction === 'ASC' ? 'DSC' : 'ASC',
              })
            }
          >
            Id
          </div>
          <div className='text-xs font-semibold col-span-2'>
            <span
              className={`${
                isSort.value === 'category' ? 'underline' : ''
              } cursor-pointer `}
              onClick={() =>
                setIsSort({
                  value: 'category',
                  direction: isSort.direction === 'ASC' ? 'DSC' : 'ASC',
                })
              }
            >
              Category
            </span>{' '}
            /{' '}
            <span
              className={`${
                isSort.value === 'title' ? 'underline' : ''
              } cursor-pointer`}
              onClick={() =>
                setIsSort({
                  value: 'title',
                  direction: isSort.direction === 'ASC' ? 'DSC' : 'ASC',
                })
              }
            >
              Title
            </span>
          </div>
          <div className='col-span-3 w-full grid grid-cols-3 content-center text-right'>
            <div
              className={`${
                isSort.value === 'hours' ? 'underline' : ''
              } cursor-pointer col-span-1 text-xs font-semibold`}
              onClick={() =>
                setIsSort({
                  value: 'hours',
                  direction: isSort.direction === 'ASC' ? 'DSC' : 'ASC',
                })
              }
            >
              Hours
            </div>
            <div
              className={`${
                isSort.value === 'lessons' ? 'underline' : ''
              } cursor-pointer col-span-1 text-xs font-semibold`}
              onClick={() =>
                setIsSort({
                  value: 'lessons',
                  direction: isSort.direction === 'ASC' ? 'DSC' : 'ASC',
                })
              }
            >
              Lessons
            </div>
            <div
              className={`${
                isSort.value === 'price' ? 'underline' : ''
              } cursor-pointer col-span-1 text-xs font-semibold`}
              onClick={() =>
                setIsSort({
                  value: 'price',
                  direction: isSort.direction === 'ASC' ? 'DSC' : 'ASC',
                })
              }
            >
              Price
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-1.5'>
          {sortedAndSearchedCourses.map((course, i) => (
            <LMCCourseTableItem course={course} key={course.id} />
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div className='max-w-7xl mx-auto py-16 flex flex-col gap-5'>
      <h2 className='mb-9 capitalize h2-base'>{cat} Courses</h2>
      <div className='flex flex-col gap-3 w-full max-w-5xl border-2 border-black p-10 items-center'>
        <H4 textColor='text-black'>No courses found</H4>
        <div
          className='flex items-center font-semibold text-white hover:bg-clemson-dark w-fit gap-2 py-2 px-4 border-2 border-black bg-clemson cursor-pointer'
          onClick={() => setIsSearchTerm('')}
        >
          <div>
            <MdCached size={20} />
          </div>
          <div className='cursor-pointer'>Reset</div>
        </div>
      </div>
    </div>
  );
};

export default Page;
