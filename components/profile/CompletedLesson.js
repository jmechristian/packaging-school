import React, { useEffect, useState, useMemo } from 'react';
import { getLessonById } from '../../helpers/api';
import ProfileLessonItems from './ProfileLessonItems';

// Only fetch lesson details for display. Do NOT call refreshUser or mutate Redux user state.

const CompletedLesson = ({ lessons }) => {
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [completedLessons, setCompletedLessons] = useState([]);

  useEffect(() => {
    // Guard: Only fetch if lessons is a non-empty array
    if (!Array.isArray(lessons) || lessons.length === 0) return;
    const fetchLessons = async () => {
      setIsLoading(true);
      const lessonDataPromises = lessons.map((lesson) =>
        getLessonById(lesson.lessonId)
      );
      const fetchedLessons = await Promise.all(lessonDataPromises);
      setCompletedLessons(fetchedLessons);
      setIsLoading(false);
    };
    fetchLessons();
  }, [lessons]);

  const filteredLessons = useMemo(() => {
    return completedLessons.filter((lesson) =>
      lesson.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [completedLessons, search]);

  if (isLoading) {
    return (
      <div className='flex flex-col gap-4'>
        {/* Search Bar Skeleton */}
        <div className='flex items-center justify-between w-full border-b border-gray-300 pb-4'>
          <div className='flex items-center gap-2'>
            <div className='relative'>
              <div className='h-8 w-64 bg-gray-200 rounded-lg animate-pulse'></div>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <div className='h-4 w-24 bg-gray-200 rounded animate-pulse'></div>
          </div>
        </div>

        {/* 3 Column Grid Skeleton */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className='flex flex-col gap-3 p-4 border border-gray-200 rounded-lg'
            >
              {/* Image Skeleton */}
              <div className='w-full h-48 bg-gray-200 rounded-lg animate-pulse'></div>

              {/* Title Skeleton */}
              <div className='h-6 w-3/4 bg-gray-200 rounded animate-pulse'></div>

              {/* Description Skeleton */}
              <div className='space-y-2'>
                <div className='h-4 w-full bg-gray-200 rounded animate-pulse'></div>
                <div className='h-4 w-2/3 bg-gray-200 rounded animate-pulse'></div>
              </div>

              {/* Progress Bar Skeleton */}
              <div className='h-2 w-full bg-gray-200 rounded-full animate-pulse'></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-between w-full border-b border-gray-300 pb-4'>
        <div className='flex items-center gap-2'>
          <div className='relative'>
            <input
              type='text'
              placeholder='Search my courses'
              className='pl-8 pr-4 py-1 border border-gray-300 rounded-lg focus:border-clemson focus:ring-1 focus:ring-clemson w-64 text-sm placeholder:text-gray-400'
              onChange={(e) => setSearch(e.target.value)}
            />
            <svg
              className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <circle cx='11' cy='11' r='8' />
              <line x1='21' y1='21' x2='16.65' y2='16.65' />
            </svg>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <div className='text-sm text-gray-700 font-bold'>
            Completed: {completedLessons.length}
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {filteredLessons.map((lesson) => (
          <ProfileLessonItems key={lesson.id} lesson={lesson} />
        ))}
      </div>
    </div>
  );
};

export default CompletedLesson;
