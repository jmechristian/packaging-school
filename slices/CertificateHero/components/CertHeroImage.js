import React from 'react';
import Image from "next/legacy/image";
import { motion } from 'framer-motion';

const CertHeroImage = () => {
  const variants = {
    enter: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 1.2,
        staggerChildren: 0.2,
        type: 'spring',
        stiffness: 400,
        damping: 95,
        mass: 1,
        delay: 0.9,
      },
    },
    hidden: {
      opacity: 0,
      y: -100,
    },
  };

  const items = {
    enter: {
      opacity: 1,
      y: 0,
    },
    hidden: {
      opacity: 0,
      y: -50,
    },
  };

  return (
    <motion.div
      className='relative w-full h-full'
      variants={variants}
      initial='hidden'
      animate='enter'
    >
      <Image
        src='https://res.cloudinary.com/dno7xxmmy/image/upload/v1666575185/pschool/hero_main_s44ryh.png'
        width={750}
        height={750}
        layout='responsive'
        alt='cmpm'
      />
      <motion.div
        className='w-16 h-16 md:w-24 md:h-24 lg:w-20 lg:h-20 xl:w-24 xl:h-24 absolute top-4 md:top-6 right-12 md:right-20 xl:right-20 drop-shadow-lg z-10'
        variants={items}
      >
        <Image
          src='https://res.cloudinary.com/dno7xxmmy/image/upload/v1666573564/pschool/hero_icon_2_igxrji.svg'
          width={120}
          height={120}
          layout='responsive'
          alt='cmpm'
        />
      </motion.div>
      <motion.div
        className='w-10 h-10 md:w-16 md:h-16 lg:w-12 lg:h-12 xl:w-20 xl:h-20 absolute bottom-12 md:bottom-24 xl:bottom-28 left-9 md:left-16 lg:left-12 xl:left-9 drop-shadow-lg z-10'
        variants={items}
      >
        <Image
          src='https://res.cloudinary.com/dno7xxmmy/image/upload/v1666573564/pschool/hero_icon_1_keurts.svg'
          width={80}
          height={80}
          layout='responsive'
          alt='cmpm'
        />
      </motion.div>
      <motion.div
        className='w-20 h-20 md:w-32 md:h-32 lg:w-28 lg:h-28 xl:w-32 xl:h-32 absolute top-10 md:top-16 left-4 md:left-6 lg:left-0 xl:left-3 drop-shadow-lg z-10'
        variants={items}
      >
        <Image
          src='https://res.cloudinary.com/dno7xxmmy/image/upload/v1666573587/pschool/hero_callout_avhwcl.svg'
          width={80}
          height={80}
          layout='responsive'
          alt='cmpm'
        />
      </motion.div>
    </motion.div>
  );
};

export default CertHeroImage;
