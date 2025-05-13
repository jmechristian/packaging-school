import React, { useState, useMemo } from 'react';
import CourseItem from './CourseItem';
import { useRouter } from 'next/router';

const PaginationControls = ({ currentPage, totalPages, onPageChange }) => (
  <div className='flex items-center justify-center gap-2 mt-4'>
    <button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className='px-3 py-1 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50'
    >
      &lt;
    </button>

    {[...Array(totalPages)].map((_, index) => (
      <button
        key={index + 1}
        onClick={() => onPageChange(index + 1)}
        className={`px-3 py-1 rounded ${
          currentPage === index + 1
            ? 'bg-clemson text-white'
            : 'border border-gray-300 hover:bg-gray-50'
        }`}
      >
        {index + 1}
      </button>
    ))}

    <button
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className='px-3 py-1 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50'
    >
      &gt;
    </button>
  </div>
);

const NoPassEnrollments = ({
  activeEnrollments,
  expiredEnrollments,
  courses,
  enrollmentsPerPage,
  refreshUser,
}) => {
  const router = useRouter();
  const [currentActivePage, setCurrentActivePage] = useState(1);
  const [currentExpiredPage, setCurrentExpiredPage] = useState(1);

  const paginatedActiveEnrollments = useMemo(() => {
    const startIndex = (currentActivePage - 1) * enrollmentsPerPage;
    const endIndex = startIndex + enrollmentsPerPage;
    return activeEnrollments.slice(startIndex, endIndex);
  }, [activeEnrollments, currentActivePage, enrollmentsPerPage]);

  const paginatedExpiredEnrollments = useMemo(() => {
    const startIndex = (currentExpiredPage - 1) * enrollmentsPerPage;
    const endIndex = startIndex + enrollmentsPerPage;
    return expiredEnrollments.slice(startIndex, endIndex);
  }, [expiredEnrollments, currentExpiredPage, enrollmentsPerPage]);

  const totalActivePages = useMemo(() => {
    return Math.ceil(activeEnrollments.length / enrollmentsPerPage);
  }, [activeEnrollments, enrollmentsPerPage]);

  const totalExpiredPages = useMemo(() => {
    return Math.ceil(expiredEnrollments.length / enrollmentsPerPage);
  }, [expiredEnrollments, enrollmentsPerPage]);

  return (
    <div className='flex flex-col gap-4'>
      {activeEnrollments.length > 0 ? (
        <div className='grid grid-cols-3 gap-4 overflow-hidden'>
          {paginatedActiveEnrollments.map((enrollment, index) => {
            const matchedCourse = courses?.find(
              (course) => course.id === enrollment.course_id.toString()
            );
            return (
              <CourseItem
                active={index === 0}
                key={enrollment.id}
                enrollment={enrollment}
                course={matchedCourse}
                refreshUser={refreshUser}
              />
            );
          })}
          <div className='col-span-3'>
            {totalActivePages > 1 && (
              <PaginationControls
                currentPage={currentActivePage}
                totalPages={totalActivePages}
                onPageChange={setCurrentActivePage}
              />
            )}
          </div>
        </div>
      ) : (
        <div className='w-full flex flex-col gap-6 items-center justify-center min-h-[400px]'>
          <div className='text-gray-500 text-center max-w-xl'>
            You do not have any enrollments. Browse our courses and enroll in
            one today! Definitely not final language.
          </div>
          <div
            className='bg-clemson text-white rounded-lg px-4 py-2 cursor-pointer hover:bg-clemson-dark transition-colors duration-200'
            onClick={() => {
              router.push('/all_courses');
            }}
          >
            Browse Courses
          </div>
        </div>
      )}
    </div>
  );
};

export default NoPassEnrollments;
