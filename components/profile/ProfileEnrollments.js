import React, { useState, useEffect, useMemo } from 'react';
import { MdBolt } from 'react-icons/md';
import EnrollmentItem from './EnrollmentItem';

const ProfileEnrollments = ({ email, courses }) => {
  console.log(courses);
  const [enrollments, setEnrollments] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const enrollmentsPerPage = 7;

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        setLoading(true);
        const enrollments = await fetch(
          `/api/thinkific/get-enrollments?email=${email}`
        );
        const data = await enrollments.json();
        console.log(data);
        setEnrollments(data);
      } catch (error) {
        console.error('Error fetching enrollments:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEnrollments();
  }, [email]);

  const filteredEnrollments = useMemo(() => {
    if (!enrollments.items) return [];
    return enrollments.items.filter((enrollment) =>
      enrollment.course_name.toLowerCase().includes(search.toLowerCase())
    );
  }, [enrollments, search]);

  const activeEnrollments = useMemo(() => {
    return filteredEnrollments
      .filter((enrollment) => enrollment.expired === false)
      .sort((a, b) => b.percentage_completed - a.percentage_completed);
  }, [filteredEnrollments]);

  const expiredEnrollments = useMemo(() => {
    return filteredEnrollments.filter(
      (enrollment) => enrollment.expired === true
    );
  }, [filteredEnrollments]);

  const completedEnrollments = useMemo(() => {
    return filteredEnrollments.filter(
      (enrollment) => enrollment.completed === true
    );
  }, [filteredEnrollments]);

  const paginatedEnrollments = useMemo(() => {
    const startIndex = (currentPage - 1) * enrollmentsPerPage;
    const endIndex = startIndex + enrollmentsPerPage;
    return activeEnrollments.slice(startIndex, endIndex);
  }, [activeEnrollments, currentPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(activeEnrollments.length / enrollmentsPerPage);
  }, [activeEnrollments]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return (
      <div className='flex flex-col gap-4 bg-white rounded-lg p-6 w-full animate-pulse'>
        <div className='flex items-end justify-between w-full border-b border-gray-300 pb-4'>
          <div className='h-8 w-48 bg-gray-200 rounded'></div>
          <div className='h-8 w-64 bg-gray-200 rounded'></div>
        </div>
        <div className='flex items-end justify-between w-full border-b border-gray-300 pb-4'>
          <div className='h-8 w-36 bg-gray-200 rounded'></div>
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className='h-24 w-full bg-gray-200 rounded'></div>
        ))}
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-4  bg-white rounded-lg p-6 w-full'>
      <div className='flex items-center justify-between w-full border-b border-gray-300 pb-4'>
        <div className='h4-base text-gray-900'>
          Enrollments: {enrollments.items && enrollments.items.length} Total
        </div>
        <div className='flex items-center bg-yellow-300 rounded-lg py-1.5 px-3 border-4 border-yellow-200'>
          <div>
            <MdBolt size={20} />
          </div>
          <div className='text-sm text-gray-900 font-bold'>
            PackPass(TM) ACTIVE
          </div>
        </div>
      </div>
      <div className='flex items-center justify-between w-full border-b border-gray-300 pb-4'>
        <div className='flex items-center gap-2'>
          <div className='relative'>
            <input
              type='text'
              placeholder='Search my courses'
              className='pl-8 pr-4 py-1 border border-gray-300 rounded-lg focus:border-clemson focus:ring-1 focus:ring-clemson w-64 text-sm placeholder:text-gray-400'
              onChange={handleSearch}
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
          <div className='flex items-center gap-2 font-bold'>
            <div className='text-xs text-gray-500'>
              Active: {activeEnrollments.length}
            </div>
            <div className='text-xs text-gray-500'>
              Expired: {expiredEnrollments.length}
            </div>
            <div className='text-xs text-gray-500'>
              Completed: {completedEnrollments.length}
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        {enrollments.items &&
          paginatedEnrollments.map((enrollment, index) => {
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

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className='flex items-center justify-center gap-2 mt-4'>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className='px-3 py-1 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50'
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
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
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className='px-3 py-1 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50'
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileEnrollments;
