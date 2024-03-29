import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AllCourseBodyMobile from './AllCourseBodyMobile';
import AllCourseBodyDesktop from './AllCourseBodyDesktop';

const AllCourseBody = () => {
  const dispatch = useDispatch();
  const { selectedFilter, allCourses } = useSelector(
    (state) => state.course_filter
  );

  const coursesToShow = useMemo(() => {
    if (selectedFilter.name === 'All') {
      return allCourses;
    } else if (selectedFilter.name === 'Collections') {
      return allCourses.filter((o) => o.type === 'COLLECTION');
    } else if (selectedFilter.value === 'ELECTIVE') {
      return allCourses.filter((o) => o.type === 'ELECTIVE');
    } else {
      return allCourses.filter((o) =>
        o.categoryArray.includes(selectedFilter.value)
      );
    }
  }, [selectedFilter, allCourses]);

  return (
    <div className='bg-slate-100 dark:bg-dark-dark'>
      {allCourses && (
        <>
          <AllCourseBodyMobile coursesToShow={coursesToShow} />
          <AllCourseBodyDesktop coursesToShow={coursesToShow} />
        </>
      )}
    </div>
  );
};

export default AllCourseBody;
