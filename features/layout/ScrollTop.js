import React, { useEffect, useState } from 'react';
import { ChevronUpIcon } from '@heroicons/react/24/outline';
import { motion, useScroll } from 'framer-motion';

const ScrollTop = () => {
  const [showTopButton, setShowTopButton] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.onChange(() => updateY());
  });

  const updateY = () => {
    if (scrollY.current > 10) {
      setShowTopButton(true);
    } else {
      setShowTopButton(false);
    }
  };

  const variants = {
    show: {
      opacity: 1,
      transition: {
        duration: 0.2,
        ease: 'easeInOut',
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <motion.div
      className='hidden md:block fixed z-50 md:right-5 md:bottom-5'
      variants={variants}
      initial={false}
      animate={showTopButton ? 'show' : 'hidden'}
    >
      <button
        className='bg-dark dark:bg-base-dark rounded-full w-9 h-9 md:w-12 md:h-12 flex justify-center items-center shadow-xl'
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }}
      >
        <div>
          <ChevronUpIcon className='h-5 w-5 stroke-white' />
        </div>
      </button>
    </motion.div>
  );
};

export default ScrollTop;
