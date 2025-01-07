import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, animate, useScroll } from 'framer-motion';
import { getCPSCourses } from '../../helpers/api';
import { useSelector } from 'react-redux';
import LMSCourseCard from '../shared/LMSCourseCard';
import { CourseCard } from '@jmechristian/ps-component-library';
import '@jmechristian/ps-component-library/dist/style.css';

const RelatedCourses = ({ category, id }) => {
  const desktopRef = useRef();
  const scrollRef = useRef();
  const [width, setWidth] = useState(0);
  const [isRelated, setIsRelated] = useState(null);

  const { user } = useSelector((state) => state.auth);

  const dragX = useMotionValue(0);

  useEffect(() => {
    const getRelatedCourses = async () => {
      const courses = await getCPSCourses();
      setIsRelated(
        courses.filter((c) => c.category === category && c.id != id)
      );
    };
    getRelatedCourses();

    setWidth(desktopRef.current.offsetWidth - desktopRef.current.scrollWidth);
  }, [category, id]);

  const resetDrag = () => {
    animate(dragX, 0);
  };

  const resetScroll = () => {
    scrollRef.current.scrollTo(0, 0);
    console.log(scrollRef.current);
  };

  const cardClickHandler = (id, slug, altLink, type) => {
    console.log(id, slug, altLink, type);
  };

  const cardPurchaseHandler = (id, link) => {
    console.log(id, link);
  };

  return (
    <div ref={desktopRef}>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 container-7xl gap-5 lg:gap-10'>
        {isRelated &&
          isRelated.slice(0, 8).map((course, i) => (
            <div key={course.id}>
              <CourseCard
                course={course}
                cardClickHandler={cardClickHandler}
                cardPurchaseHandler={cardPurchaseHandler}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default RelatedCourses;
