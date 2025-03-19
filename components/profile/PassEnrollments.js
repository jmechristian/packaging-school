import React, { useState, useMemo, useEffect } from 'react';
import EnrollmentItem from './EnrollmentItem';
import { expireEnrollment, updateAWSUser } from '../../helpers/api';
import { useSelector } from 'react-redux';

const PassEnrollments = ({
  activeEnrollments,
  expiredEnrollments,
  courses,
  enrollmentsPerPage,
  enrollments,
  refreshEnrollments,
}) => {
  const { awsUser } = useSelector((state) => state.auth);
  const [currentActivePage, setCurrentActivePage] = useState(1);
  const [currentExpiredPage, setCurrentExpiredPage] = useState(1);
  const [isValid, setIsValid] = useState(false);
  useEffect(() => {
    if (activeEnrollments.length > 1) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [activeEnrollments]);

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

  const handleEnrollmentClick = async (enrollmentId) => {
    try {
      // Expire all enrollments except the selected one
      const expirePromises = enrollments.items
        .filter((enrollment) => enrollment.id !== enrollmentId)
        .map((enrollment) => expireEnrollment(enrollment.id));

      await Promise.all(expirePromises);

      // Update AWS user with all access settings
      await updateAWSUser({
        id: awsUser.id,
        allAccess: true,
        allAccessStartDate: new Date().toISOString(),
      });

      // Update local state to show valid enrollment
      setIsValid(true);
      refreshEnrollments();
    } catch (error) {
      console.error('Error handling enrollment selection:', error);
      // You may want to add error handling UI here
    }
  };

  return (
    <>
      {isValid ? (
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
          </div>

          {/* Expired Enrollments Section */}
          {expiredEnrollments.length > 0 && (
            <div className='mt-8'>
              <h3 className='h4-base text-gray-900 mb-4'>Expired Courses</h3>
              <div className='flex flex-col gap-4'>
                {paginatedExpiredEnrollments.map((enrollment, index) => {
                  const matchedCourse =
                    courses &&
                    courses.find((course) => {
                      return course.id === enrollment.course_id.toString();
                    });
                  return (
                    <EnrollmentItem
                      key={enrollment.id}
                      enrollment={enrollment}
                      course={matchedCourse}
                    />
                  );
                })}
              </div>
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
      ) : (
        <div className='flex flex-col gap-4'>
          <div className='h4-base text-gray-900 mb-4 leading-6'>
            Choose your current enrollment: This will be your active course.
            This is placeholder instructions/ UI, but it is live. This will
            unenroll you from every other enrollment.
          </div>
          <div className='flex flex-col gap-4'>
            {enrollments.items.map((enrollment) => (
              <div
                key={enrollment.id}
                className='flex items-center gap-2 hover:bg-gray-200 cursor-pointer p-2'
                onClick={() => handleEnrollmentClick(enrollment.id)}
              >
                <div className='flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 '>
                  <div>+</div>
                </div>
                <div>{enrollment.course_name}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default PassEnrollments;
