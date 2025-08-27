import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import poofAnimation from '../../public/poof.json';

// Dynamic import Lottie to avoid SSR issues
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

const CMPMCard = () => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className='w-[360px] h-[515px] bg-gradient-to-bl from-base-dark to-base-light rounded-[22px] flex items-center justify-center py-3 shadow-xl transition-all ease-in relative overflow-hidden group hover:scale-105'
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='325'
        height='474'
        viewBox='0 0 325 474'
        fill='none'
        className='relative z-10 shadow-2xl fill-base-mid bg-cover'
      >
        <path d='M250 0H0V474H325V29.7532H266.304L250 0Z' />
      </svg>
    </div>
  );
};

export default CMPMCard;
