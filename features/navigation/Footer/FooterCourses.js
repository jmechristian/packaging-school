import React from 'react';
import Link from 'next/link';
import { categoryMenu } from '../../../data/CategoryMenu';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { setSelectedFilter } from '../../all_courses/courseFilterSlice';

const FooterCourses = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const footerLinkHandler = (name, value) => {
    console.log(name, value);
    dispatch(setSelectedFilter({ name, value }));
    router.push('/all_courses#courses');
  };

  return (
    (<div className='flex flex-col gap-1 lg:gap-2 text-sm w-full'>
      <div className='font-extrabold text-sm uppercase tracking-widest dark:text-gray-200 font-greycliff'>
        Courses
      </div>
      <div className='grid grid-cols-2 gap-y-1 gap-x-8 lg:gap-x-4 justify-between'>
        <div className='flex flex-col gap-1'>
          <Link className='w-fit' href='/all_courses' legacyBehavior>
            <div className='text-gray-500 dark:text-gray-500 cursor-pointer'>
              All Courses
            </div>
          </Link>
          <p
            className='text-gray-500 dark:text-gray-500 w-fit cursor-pointer'
            onClick={() =>
              footerLinkHandler(categoryMenu[1].name, categoryMenu[1].value)
            }
          >
            {categoryMenu[1].name}
          </p>
          <p
            className='text-gray-500 dark:text-gray-500 w-fit cursor-pointer'
            onClick={() =>
              footerLinkHandler(categoryMenu[2].name, categoryMenu[2].value)
            }
          >
            {categoryMenu[2].name}
          </p>
          <p
            className='text-gray-500 dark:text-gray-500 w-fit cursor-pointer'
            onClick={() =>
              footerLinkHandler(categoryMenu[3].name, categoryMenu[3].value)
            }
          >
            {categoryMenu[3].name}
          </p>
        </div>
        <div className='flex flex-col gap-1'>
          <p
            className='text-gray-500 dark:text-gray-500 w-fit cursor-pointer'
            onClick={() =>
              footerLinkHandler(categoryMenu[4].name, categoryMenu[4].value)
            }
          >
            {categoryMenu[4].name}
          </p>
          <p
            className='text-gray-500 dark:text-gray-500 w-fit cursor-pointer'
            onClick={() =>
              footerLinkHandler(categoryMenu[5].name, categoryMenu[5].value)
            }
          >
            {categoryMenu[5].name}
          </p>
          <p
            className='text-gray-500 dark:text-gray-500 w-fit cursor-pointer'
            onClick={() =>
              footerLinkHandler(categoryMenu[6].name, categoryMenu[6].value)
            }
          >
            {categoryMenu[6].name}
          </p>
        </div>
      </div>
    </div>)
  );
};

export default FooterCourses;
