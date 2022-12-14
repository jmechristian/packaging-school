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
      className='fixed z-50 right-5 bottom-9'
      variants={variants}
      initial={false}
      animate={showTopButton ? 'show' : 'hidden'}
    >
      <button
        className='bg-dark rounded-full w-12 lg:w-16 h-12 lg:h-16 flex justify-center items-center shadow-xl'
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
