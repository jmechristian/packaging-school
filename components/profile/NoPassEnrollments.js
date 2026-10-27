import React, { useState, useMemo } from 'react';
import CourseItem from './CourseItem';
import { useRouter } from 'next/router';

const getPageWindow = (currentPage, totalPages) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = new Set([1, totalPages, currentPage - 1, currentPage, currentPage + 1]);
  if (currentPage <= 3) {
    pages.add(2);
    pages.add(3);
    pages.add(4);
  }
  if (currentPage >= totalPages - 2) {
    pages.add(totalPages - 1);
    pages.add(totalPages - 2);
    pages.add(totalPages - 3);
  }

  return [...pages]
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);
};

const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
  const pages = getPageWindow(currentPage, totalPages);

  return (
    <div className='flex items-center justify-center gap-2 flex-wrap'>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className='px-3 py-1 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50'
      >
        &lt;
      </button>

      {pages.map((page, index) => {
        const previous = pages[index - 1];
        const showGap = previous && page - previous > 1;
        return (
          <React.Fragment key={page}>
            {showGap && <span className='px-1 text-gray-400'>…</span>}
            <button
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 rounded ${
                currentPage === page
                  ? 'bg-clemson text-white'
                  : 'border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          </React.Fragment>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className='px-3 py-1 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50'
      >
        &gt;
      </button>
    </div>
  );
};

const NoPassEnrollments = ({
  navigateToThinkific,
  activeEnrollments,
  expiredEnrollments,
  courses,
  enrollmentsPerPage,
  refreshUser,
}) => {
  const router = useRouter();
  const [currentActivePage, setCurrentActivePage] = useState(1);
  const [currentExpiredPage, setCurrentExpiredPage] = useState(1);
  const listKey = `${enrollmentsPerPage}:${(activeEnrollments || [])
    .map((enrollment) => enrollment.id)
    .join(',')}`;
  const [listKeyForPage, setListKeyForPage] = useState(listKey);

  if (listKey !== listKeyForPage) {
    setListKeyForPage(listKey);
    setCurrentActivePage(1);
  }

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

  const rangeStart =
    activeEnrollments.length === 0
      ? 0
      : (currentActivePage - 1) * enrollmentsPerPage + 1;
  const rangeEnd = Math.min(
    currentActivePage * enrollmentsPerPage,
    activeEnrollments.length
  );

  const renderPager = (className = '') => (
    <div
      className={`col-span-full flex flex-col items-center justify-between gap-3 sm:flex-row ${className}`}
    >
      <div className='text-xs text-gray-500'>
        Showing {rangeStart}–{rangeEnd} of {activeEnrollments.length}
      </div>
      {totalActivePages > 1 && (
        <PaginationControls
          currentPage={currentActivePage}
          totalPages={totalActivePages}
          onPageChange={setCurrentActivePage}
        />
      )}
    </div>
  );

  return (
    <div className='flex flex-col gap-4'>
      {activeEnrollments.length > 0 ? (
        <div className='grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          <div className='col-span-full flex justify-center'>
            <div
              className='bg-slate-100 w-full p-3 rounded cursor-pointer hover:bg-slate-200 transition-colors duration-200 text-sm text-center'
              onClick={() => {
                navigateToThinkific(
                  'https://learn.packagingschool.com/enrollments?role=classic',
                  'https://learn.packagingschool.com/enrollments?role=classic'
                );
              }}
            >
              Trouble accessing your courses? Try Classic View.
            </div>
          </div>
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
                navigateToThinkific={navigateToThinkific}
              />
            );
          })}
          {renderPager('pt-2')}
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
