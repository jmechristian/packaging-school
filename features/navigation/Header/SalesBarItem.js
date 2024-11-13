import React from 'react';
import { useRouter } from 'next/router';
import {
  AcademicCapIcon,
  BoltIcon,
  BookmarkIcon,
  BookmarkSquareIcon,
} from '@heroicons/react/24/solid';
import { useSelector } from 'react-redux';
import { API } from 'aws-amplify';
import {
  createCourseClick,
  createLessonClick,
  createSalesBar,
  createSalesbarClick,
} from '../../../src/graphql/mutations';

const SalesBarItem = ({ link, icon, text, zIdx }) => {
  const router = useRouter();

  const { location } = useSelector((state) => state.auth);

  const setIcon = (icon) => {
    switch (icon) {
      case 'ARTICLE':
        return <BookmarkIcon className='w-5 h-5 fill-amber-400' />;
      case 'COURSE':
        return <AcademicCapIcon className='w-5 h-5 fill-amber-400' />;
      case 'NEWS':
        return <BoltIcon className='w-5 h-5 fill-amber-400' />;
      default:
        return <BoltIcon className='w-5 h-5 fill-amber-400' />;
    }
  };

  const clickHandler = async () => {
    await API.graphql({
      query: createSalesbarClick,
      variables: {
        input: {
          country: location.country,
          ipAddress: location.ip,
          link: link,
          page: router.asPath,
        },
      },
    });

    router.push(link);
  };

  return (
    <div className='flex items-center gap-2 lg:gap-1' onClick={clickHandler}>
      <div>{setIcon(icon)}</div>
      <div className='text-white text-xs md:!text-base leading-none'>
        {text}
      </div>
    </div>
  );
};

export default SalesBarItem;
