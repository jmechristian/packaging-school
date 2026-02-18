import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { createNewOrder } from '../../helpers/api';
import { useThinkificLink } from '../../hooks/useThinkificLink';
import '@jmechristian/ps-component-library/dist/style.css';

const CourseCard = dynamic(
  () =>
    import('@jmechristian/ps-component-library').then((m) => ({
      default: m.CourseCard,
    })),
  {
    ssr: false,
    loading: () => (
      <div className='flex flex-col gap-3 p-4 border border-gray-200 rounded-lg bg-white shadow animate-pulse'>
        <div className='w-full h-72 bg-gray-200 rounded-lg'></div>
        <div className='h-6 w-3/4 bg-gray-200 rounded'></div>
        <div className='space-y-2'>
          <div className='h-4 w-full bg-gray-200 rounded'></div>
          <div className='h-4 w-2/3 bg-gray-200 rounded'></div>
        </div>
      </div>
    ),
  }
);

const CustomerCourses = ({ courses, heading = 'ISBT® Courses' }) => {
  const router = useRouter();
  const { location, awsUser } = useSelector((state) => state.auth);
  const { navigateToThinkific } = useThinkificLink();

  const [search, setSearch] = useState('');

  if (!courses || courses.length === 0) return null;

  const filteredCourses = search.trim()
    ? courses.filter(
        (c) =>
          c.title?.toLowerCase().includes(search.toLowerCase()) ||
          c.subheadline?.toLowerCase().includes(search.toLowerCase())
      )
    : courses;

  const cardClickHandler = (id, slug, altLink, type) => {
    altLink
      ? router.push(altLink)
      : router.push(
          `/${type === 'COLLECTION' ? 'collections' : 'courses'}/${slug}`
        );
  };

  const orderHandler = async (course) => {
    const orderId = await createNewOrder({
      courseDescription: course.subheadline,
      courseDiscount: 0,
      courseImage: course.seoImage,
      courseName: course.title,
      courseLink: course.link,
      total: course.price,
      userID: awsUser ? awsUser.id : null,
      email: awsUser ? awsUser.email : null,
      name: awsUser ? awsUser.name : null,
    });

    if (awsUser && awsUser.name.includes(' ')) {
      navigateToThinkific(course.link, course.link);
    } else {
      router.push(`/order/${orderId.id}`);
    }
  };

  return (
    <div className='max-w-7xl w-full mx-auto flex flex-col gap-6 mt-3 px-3 xl:px-0'>
      <div className='flex flex-row items-center justify-between gap-4'>
        <div className='font-bold lg:text-3xl text-base-dark whitespace-nowrap'>{heading}</div>
        <div className='relative w-64'>
          <MagnifyingGlassIcon className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 stroke-gray-400 pointer-events-none' />
          <input
            type='text'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search courses…'
            className='w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-base-brand'
          />
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-0'>
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div key={course.id} className='animate-fadeIn'>
              <CourseCard
                course={course}
                cardClickHandler={() =>
                  cardClickHandler(
                    course.id,
                    course.slug,
                    course.altLink,
                    course.type
                  )
                }
                cardPurchaseHandler={() => orderHandler(course)}
              />
            </div>
          ))
        ) : (
          <div className='col-span-4 py-12 text-center text-gray-400 text-sm'>
            No courses match &ldquo;{search}&rdquo;
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerCourses;
