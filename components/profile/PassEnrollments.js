import React, { useState, useMemo } from 'react';
import EnrollmentItem from './EnrollmentItem';

const PassEnrollments = ({
  activeEnrollments,
  expiredEnrollments,
  courses,
  enrollmentsPerPage,
}) => {
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

  return (
    <div className='flex flex-col gap-4'>
      {/* Active Enrollments Section */}
      <div>
        <h3 className='h4-base text-gray-900 mb-4'>Active Courses</h3>
        {paginatedActiveEnrollments.map((enrollment, index) => {
          const matchedCourse =
            courses &&
            courses.find((course) => {
              return course.id === enrollment.course_id.toString();
            });
          return (
            <EnrollmentItem
              active={index === 0}
              key={enrollment.id}
              enrollment={enrollment}
              course={matchedCourse}
            />
          );
        })}
        {totalActivePages > 1 && (
          <PaginationControls
            currentPage={currentActivePage}
            totalPages={totalActivePages}
            onPageChange={setCurrentActivePage}
          />
        )}
      </div>

      {/* Expired Enrollments Section */}
      {expiredEnrollments.length > 0 && (
        <div className='mt-8'>
          <h3 className='h4-base text-gray-900 mb-4'>Expired Courses</h3>
          {paginatedExpiredEnrollments.map((enrollment, index) => {
            const matchedCourse =
              courses &&
              courses.find((course) => {
                return course.id === enrollment.course_id.toString();
              });
            return (
              <EnrollmentItem
                active={index === 0}
                key={enrollment.id}
                enrollment={enrollment}
                course={matchedCourse}
              />
            );
          })}
          {totalExpiredPages > 1 && (
            <PaginationControls
              currentPage={currentExpiredPage}
              totalPages={totalExpiredPages}
              onPageChange={setCurrentExpiredPage}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default PassEnrollments;
