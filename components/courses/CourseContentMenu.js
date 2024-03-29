import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { useRouter } from 'next/router';

const CourseContentMenu = ({ link, trialLink }) => {
  const [showBuyButtons, setShowBuyButtons] = useState(false);
  const [width, setWidth] = useState(0);
  const { scrollY } = useScroll();
  const wrapperRef = useRef();
  const router = useRouter();

  useEffect(() => {
    return scrollY.onChange(() => updateY());
  });

  const updateY = () => {
    if (scrollY.current > 10) {
      setShowBuyButtons(true);
    } else {
      setShowBuyButtons(false);
    }
  };

  const linkHandler = (where) => {
    router.push(where);
  };

  useEffect(() => {
    setWidth(wrapperRef.current.offsetWidth);
  }, [wrapperRef]);

  const variants = {
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.2,
        ease: 'easeInOut',
      },
    },
    hidden: {
      x: -width,
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <motion.div
      className='fixed z-50 left-0 bottom-9 py-2 md:py-3 bg-slate-200/40 backdrop-blur-sm rounded-r-lg shadow-lg'
      ref={wrapperRef}
      variants={variants}
      initial='hidden'
      animate={showBuyButtons ? 'show' : 'hidden'}
    >
      <div className='flex px-4 md:px-5 gap-3 md:5'>
        <button
          className='bg-white border border-clemson py-1.5 rounded-md shadow'
          onClick={() => window.open(trialLink, '_blank')}
        >
          <div className='text-sm md:text-lg font-semibold text-clemson px-3 w-24 md:w-40'>
            Free Trial
          </div>
        </button>
        <button
          className='bg-clemson py-1.5 lg:py-2 rounded-md shadow'
          onClick={() => window.open(link, '_blank')}
        >
          <div className='text-sm md:text-lg font-semibold text-white px-3 w-24 md:w-40'>
            Enroll Now
          </div>
        </button>
      </div>
    </motion.div>
  );
};

export default CourseContentMenu;
