import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import CourseCard from '../course-card/CourseCard';
import { useSelector } from 'react-redux';
import Scroller from '../Scroller';
import Link from 'next/link';
import { toggleSignInModal } from '../../features/layout/layoutSlice';
import { getCoursesByCategory } from '../../helpers/api';

const HomeFree = () => {
  const dispatch = useDispatch();
  const [freeCourses, setFreeCourses] = useState([]);

  const { user } = useSelector((state) => state.auth);
  const scrollRef = useRef();

  useEffect(() => {
    const getFreeCourses = async () => {
      const courses = await getCoursesByCategory('FREE');
      setFreeCourses(courses);
    };
    getFreeCourses();
  }, [setFreeCourses]);

  return (
    <div className='relative lg:overflow-hidden flex flex-col bg-gray-100 rounded-lg lg:items-start gap-9 py-12 lg:max-w-7xl lg:mx-auto w-full'>
      <div className='absolute lg:hidden top-0 bottom-0 right-0 w-6 z-10 bg-gradient-to-l from-gray-200 via-gray-200' />
      <div className='flex w-full flex-col lg:flex-row lg:justify-between gap-3'>
        <div className='flex flex-row justify-between w-full items-center  px-6'>
          <div className='flex flex-col gap-3'>
            <div className='text-lg text-center lg:!text-left gap-2 flex flex-col'>
              <div className='font-greycliff font-bold text-2xl md:text-3xl'>
                Get Started for Free Today!
              </div>
              <div className='text-gray-600'>
                <span
                  className='underline font-semibold text-gray-700 cursor-pointer'
                  onClick={() => dispatch(toggleSignInModal())}
                >
                  Create Your Free Account
                </span>{' '}
                and take your first step to becoming a knowledge leader.
              </div>
            </div>
          </div>
          <div
            className='bg-white border border-gray-600 rounded-lg p-3 cursor-pointer font-greycliff hidden lg:block font-semibold'
            onClick={() => dispatch(toggleSignInModal())}
          >
            Create Free Account
          </div>
        </div>
      </div>
      <div className='lg:grid grid-cols-4 gap-4 hidden px-6'>
        {freeCourses &&
          freeCourses.map((course, i) => (
            <div key={course.id} className='inline-block'>
              <CourseCard
                courseId={course.id}
                title={course.title}
                desc={course.subheadline}
                video={course.preview}
                hours={course.hours}
                lessons={course.lessons}
                price={course.price}
                slug={course.slug}
                category={course.category}
                savedCourses={user?.savedCourses}
              />
            </div>
          ))}
      </div>
      <div className='lg:hidden block'>
        <Scroller rows='2' scroll={scrollRef}>
          {freeCourses &&
            freeCourses.map((course, i) => (
              <div key={course.id} className='inline-block'>
                <CourseCard
                  courseId={course.id}
                  title={course.title}
                  desc={course.subheadline}
                  video={course.preview}
                  hours={course.hours}
                  lessons={course.lessons}
                  price={course.price}
                  slug={course.slug}
                  category={course.category}
                  savedCourses={user?.savedCourses}
                />
              </div>
            ))}
        </Scroller>
      </div>
      <div className='flex w-full text-gray-700 flex-col gap-1 items-center lg:text-center mt-3 font-bold font-greycliff text-xl'>
        <Link href='/all_courses'>Explore All Courses</Link>
      </div>
    </div>
  );
};

export default HomeFree;
