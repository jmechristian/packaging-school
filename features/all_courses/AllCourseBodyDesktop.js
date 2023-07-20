import React from 'react';
import AllCourseMenu from './AllCourseMenu';
import AllCourseCert from './AllCourseCert';
import { useSelector } from 'react-redux';
import AllCourseCourses from './AllCourseCourses';
import AllCourseSearch from './AllCourseSearch';

const AllCourseBodyDesktop = ({ coursesToShow }) => {
  const { selectedFilter } = useSelector((state) => state.course_filter);
  return (
    <div className='w-full h-full relative hidden lg:flex gap-16 container-7xl py-20'>
      <div className='w-fit'>
        <div className='w-full sticky top-32'>
          <AllCourseMenu />
        </div>
      </div>
      <div className='flex max-w-4xl flex-col gap-10'>
        <AllCourseCert />
        <AllCourseCourses
          coursesToShow={coursesToShow}
          selectedFilter={selectedFilter}
        />
      </div>
    </div>
  );
};

export default AllCourseBodyDesktop;
