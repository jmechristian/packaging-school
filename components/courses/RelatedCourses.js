import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  createNewOrder,
  getRelatedCourses,
  registgerCourseClick,
} from '../../helpers/api';
import { useSelector } from 'react-redux';
import { useThinkificLink } from '../../hooks/useThinkificLink';
import { CourseCard } from '@jmechristian/ps-component-library';
import '@jmechristian/ps-component-library/dist/style.css';

const RelatedCourses = ({ category, id }) => {
  const router = useRouter();
  const { location, awsUser } = useSelector((state) => state.auth);
  const { navigateToThinkific } = useThinkificLink();
  const desktopRef = useRef();
  const [width, setWidth] = useState(0);
  const [isRelated, setIsRelated] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(1);
  const [showArrowsUnderneath, setShowArrowsUnderneath] = useState(false);

  useEffect(() => {
    if (category && id) {
      getRelatedCourses(category[0], id).then((res) => {
        setIsRelated(res);
      });
    }
  }, [category, id]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setShowArrowsUnderneath(width < 1280); // Show underneath for all screens except xl
      if (width >= 1280) {
        // xl
        setCardsPerPage(4);
      } else if (width >= 1024) {
        // lg
        setCardsPerPage(3);
      } else if (width >= 768) {
        // md
        setCardsPerPage(2);
      } else {
        // mobile
        setCardsPerPage(1);
      }
    };

    handleResize(); // Initial call
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = isRelated ? Math.ceil(isRelated.length / cardsPerPage) : 0;

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  const getCurrentPageCourses = () => {
    if (!isRelated) return [];
    const start = currentPage * cardsPerPage;
    return isRelated.slice(start, start + cardsPerPage);
  };

  const NavigationButton = ({ direction, onClick, show }) => {
    if (!show) return null;

    const isLeft = direction === 'left';
    const mobileClasses = showArrowsUnderneath
      ? 'relative mx-2 mt-4'
      : `absolute ${
          isLeft ? '-left-12' : '-right-12'
        } top-1/2 -translate-y-1/2`;

    return (
      <button
        onClick={onClick}
        className={`${mobileClasses} z-50 hover:bg-white p-2 rounded-full`}
        aria-label={`${direction === 'left' ? 'Previous' : 'Next'} page`}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d={isLeft ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'}
          />
        </svg>
      </button>
    );
  };

  const orderHandler = async (courseData) => {
    const orderId = await createNewOrder({
      courseDescription: courseData.subheadline,
      courseDiscount: 0,
      courseImage: courseData.seoImage,
      courseName: courseData.title,
      courseLink: `${courseData.link}`,
      total: courseData.price,
      userID: awsUser ? awsUser.id : null,
      email: awsUser ? awsUser.email : null,
      name: awsUser ? awsUser.name : null,
    });

    if (awsUser && awsUser.name.includes(' ')) {
      navigateToThinkific(`${courseData.link}`, `${courseData.link}`);
    } else {
      router.push(`/order/${orderId.id}`);
    }
  };

  const cardClickHandler = async (id, slug, altlink, type) => {
    await registgerCourseClick(id, router.asPath, location, slug, 'RELATED');

    altlink
      ? router.push(altlink)
      : router.push(
          `/${
            type && type === 'COLLECTION' ? 'collections' : 'courses'
          }/${slug}`
        );
  };

  const cardPurchaseHandler = async (course) => {
    await registgerCourseClick(
      course.id,
      router.asPath,
      location,
      course.link,
      'RELATED'
    );

    await orderHandler(course);
  };

  return (
    <div className='relative max-w-7xl mx-auto' ref={desktopRef}>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 container-7xl gap-4 pt-1 pb-2'>
        {getCurrentPageCourses().map((course) => (
          <div key={course.id} className='inline-block'>
            <CourseCard
              course={course}
              cardClickHandler={() =>
                cardClickHandler(
                  course.id,
                  course.slug,
                  course.altLink,
                  course.type
                )
              }
              cardPurchaseHandler={() => cardPurchaseHandler(course)}
              // hideCallout={true}
            />
          </div>
        ))}
      </div>

      <div className={`flex ${showArrowsUnderneath ? 'justify-center' : ''}`}>
        <NavigationButton
          direction='left'
          onClick={handlePreviousPage}
          show={currentPage > 0}
        />
        <NavigationButton
          direction='right'
          onClick={handleNextPage}
          show={currentPage < totalPages - 1}
        />
      </div>
    </div>
  );
};

export default RelatedCourses;
