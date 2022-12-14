import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MenuDropDownWrapper from '../MenuDropDownWrapper';
import CourseDropDownCallout from './CourseDropDownCallout';
import CourseDropDownCourses from './CourseDropDownCourses';
import { setMenuItem } from '../../navigationSlice';

const CourseDropDown = () => {
  const { menuItemOpen, menuItem } = useSelector((state) => state.nav);
  const dispatch = useDispatch();
  return (
    <>
      {menuItemOpen && menuItem === 'courses' && (
        <MenuDropDownWrapper>
          <div className='grid grid-cols-3 h-full overflow-hidden gap-10'>
            <CourseDropDownCourses />
            <CourseDropDownCallout />
          </div>
        </MenuDropDownWrapper>
      )}
      {menuItemOpen && menuItem === 'courses' && (
        <div
          className='fixed left-0 right-0 top-0 bottom-0 bg-slate-800/80 z-10 backdrop-blur-sm'
          onClick={() => dispatch(setMenuItem())}
        ></div>
      )}
    </>
  );
};

export default CourseDropDown;
