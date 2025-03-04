import React, { useEffect, useMemo, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { MdArrowOutward, MdSearch } from 'react-icons/md';
import Pagination from '../shared/Pagination';
import LMSCourseCard from '../shared/LMSCourseCard';

const LibraryCourseGrid = ({ courses, coupon, discount }) => {
  const [isSearchTerm, setIsSearchTerm] = useState('');
  const { allCourses } = useSelector((state) => state.course_filter);

  const initCourses = useMemo(() => {
    const filtered =
      courses &&
      courses.map((c) => {
        const matchedCourse =
          allCourses && allCourses.find((ac) => ac.id === c.courseId);
        return {
          ...c,
          ...matchedCourse,
          targetedId: c.id,
        };
      });
    return filtered;
  }, [courses, allCourses]);

  const coursesToShow = useMemo(() => {
    if (!isSearchTerm) {
      return initCourses;
    }

    if (isSearchTerm) {
      return initCourses
        .sort((a, b) => a.courseId.localeCompare(b.courseId))
        .filter(
          (o) =>
            o.title.toLowerCase().includes(isSearchTerm.toLowerCase()) ||
            o.subheadline.toLowerCase().includes(isSearchTerm.toLowerCase())
        );
    }
  }, [initCourses, isSearchTerm]);

  return (
    <div className='w-full flex flex-col gap-10'>
      <div className='flex justify-end items-center gap-1 py-2 border-y border-y-black'>
        <div className='flex justify-end items-center w-full'>
          <input
            type='text'
            value={isSearchTerm}
            className='w-full max-w-[50%] bg-transparent focus:ring-0 border-0 text-right placeholder:text-sm placeholder:text-neutral-400'
            placeholder='Search the available Lesson Library'
            onChange={(e) => setIsSearchTerm(e.target.value)}
          />
          <div>
            <MdSearch size={24} color='black' />
          </div>
        </div>
      </div>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10'>
        {initCourses ? (
          coursesToShow
            .sort((a, b) => a.courseId.localeCompare(b.courseId))
            .map((cou) => (
              <div key={cou.id}>
                <LMSCourseCard
                  id={cou.id}
                  coupon={coupon}
                  discount={discount}
                />
              </div>
            ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default LibraryCourseGrid;
