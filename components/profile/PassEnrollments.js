import React from 'react';
import EnrollmentItem from './EnrollmentItem';

const PassEnrollments = ({ enrollments, courses }) => {
  return (
    <div className='flex flex-col gap-4'>
      {enrollments.length > 0 ? (
        enrollments.map((enrollment, index) => {
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
        })
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

export default PassEnrollments;
