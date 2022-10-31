import React from 'react';
import AllCourseMenu from './AllCourseMenu';
import AllCoursesCert from './AllCoursesCert';
import { useSelector } from 'react-redux';
import AllCourseCourses from './AllCourseCourses';
import AllCourseSearch from './AllCourseSearch';

const AllCourseBodyDesktop = ({ coursesToShow }) => {
  const { selectedFilter } = useSelector((state) => state.course_filter);
  return (
    <div className='w-full h-full relative hidden lg:flex gap-16 xl:gap-20 container__inner py-12'>
      <div className='w-1/3 xl:w-1/4'>
        <div className='w-full sticky top-32'>
          <AllCourseMenu />
        </div>
      </div>
      <div className='w-2/3 xl:w-3/4 flex flex-col gap-10'>
        <div className='flex flex-col gap-6'>
          <div className='lg:text-4xl font-plex font-bold xl:leading-tight '>
            <h1>Accelerate your career. Stand out from your peers.</h1>
          </div>
          <div className='w-full'>
            <AllCourseSearch />
          </div>
        </div>
        <AllCoursesCert />
        <AllCourseCourses
          coursesToShow={coursesToShow}
          selectedFilter={selectedFilter}
        />
      </div>
    </div>
  );
};

export default AllCourseBodyDesktop;
