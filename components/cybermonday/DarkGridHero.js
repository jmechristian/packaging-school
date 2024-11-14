import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';
import { TestimonialShuffle } from './TestimonialShuffle';
import { BrutalButton } from '@jmechristian/ps-component-library';

export const DarkGridHero = () => {
  return (
    <section className='relative overflow-hidden bg-zinc-900'>
      <Content />
      <Beams />
      <GradientGrid />
    </section>
  );
};

const Content = () => {
  return (
    <div className='relative z-20 mx-auto max-w-7xl grid grid-cols-1 py-24 md:grid-cols-2 md:py-24 gap-12'>
      <div className='flex flex-col items-center justify-start gap-3'>
        <motion.div
          initial={{
            y: 25,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            duration: 1.25,
            ease: 'easeInOut',
          }}
          className='relative'
        >
          <GlowingChip>Cyber Monday Exclusive 🎉</GlowingChip>
        </motion.div>
        <motion.h1
          initial={{
            y: 25,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            duration: 1.25,
            delay: 0.25,
            ease: 'easeInOut',
          }}
          className='mb-3 text-center text-3xl font-semibold leading-tight text-zinc-50 sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight lg:leading-tight tracking-tighter'
        >
          40% Off the Certificate of Packaging Science – Enroll Instantly, No
          Application Required!
        </motion.h1>
        <motion.p
          initial={{
            y: 25,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            duration: 1.25,
            delay: 0.5,
            ease: 'easeInOut',
          }}
          className='mb-9 max-w-2xl text-center text-base leading-relaxed text-zinc-400 sm:text-lg md:text-lg md:leading-relaxed'
        >
          Invest in yourself and stand out in the packaging industry with CPS
          certification. This Cyber Monday offer is available for a limited
          time, so enroll today and start your journey.
        </motion.p>
        <motion.div
          initial={{
            y: 25,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            duration: 1.25,
            delay: 0.75,
            ease: 'easeInOut',
          }}
          className='flex flex-col items-center gap-6 sm:flex-row'
        >
          {/* <SplashButton className='flex items-center gap-2'>
            Try it free
            <FiArrowRight />
          </SplashButton> */}
          <BrutalButton
            text='Enroll Now'
            textColor='text-white'
            link='/'
            background='bg-clemson'
          />
          <GhostButton className='rounded-md px-4 py-2 text-zinc-100'>
            Learn more
          </GhostButton>
        </motion.div>
      </div>
      <div className='flex flex-col items-center justify-center w-full'>
        <TestimonialShuffle />
      </div>
    </div>
  );
};

const GlowingChip = ({ children }) => {
  return (
    <span className='relative z-10 mb-4 inline-block rounded-full border border-zinc-700 bg-zinc-900/20 px-3 py-1.5 text-xs md:text-lg text-zinc-50 md:mb-0'>
      {children}
      <span className='absolute bottom-0 left-3 right-3 h-[1px] bg-gradient-to-r from-zinc-500/0 via-zinc-300 to-zinc-500/0' />
    </span>
  );
};

const SplashButton = ({ children, className, ...rest }) => {
  return (
    <button
      className={twMerge(
        'rounded-md bg-gradient-to-br from-clemson to-clemson-dark px-4 py-2 text-zinc-50 ring-2 ring-clemson/50 ring-offset-2 ring-offset-zinc-950 transition-all hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] active:ring-clemson/70',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

const GhostButton = ({ children, className, ...rest }) => {
  return (
    <button
      className={twMerge(
        'rounded-md px-4 py-2 text-zinc-100 transition-all hover:scale-[1.02] hover:bg-zinc-800 hover:text-zinc-50 active:scale-[0.98]',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

const Beams = () => {
  const { width } = useWindowSize();

  const numColumns = width ? Math.floor(width / GRID_BOX_SIZE) : 0;

  const placements = [
    {
      top: GRID_BOX_SIZE * 0,
      left: Math.floor(numColumns * 0.05) * GRID_BOX_SIZE,
      transition: {
        duration: 3.5,
        repeatDelay: 5,
        delay: 2,
      },
    },
    {
      top: GRID_BOX_SIZE * 12,
      left: Math.floor(numColumns * 0.15) * GRID_BOX_SIZE,
      transition: {
        duration: 3.5,
        repeatDelay: 10,
        delay: 4,
      },
    },
    {
      top: GRID_BOX_SIZE * 3,
      left: Math.floor(numColumns * 0.25) * GRID_BOX_SIZE,
    },
    {
      top: GRID_BOX_SIZE * 9,
      left: Math.floor(numColumns * 0.75) * GRID_BOX_SIZE,
      transition: {
        duration: 2,
        repeatDelay: 7.5,
        delay: 3.5,
      },
    },
    {
      top: 0,
      left: Math.floor(numColumns * 0.7) * GRID_BOX_SIZE,
      transition: {
        duration: 3,
        repeatDelay: 2,
        delay: 1,
      },
    },
    {
      top: GRID_BOX_SIZE * 2,
      left: Math.floor(numColumns * 1) * GRID_BOX_SIZE - GRID_BOX_SIZE,
      transition: {
        duration: 5,
        repeatDelay: 5,
        delay: 5,
      },
    },
  ];

  return (
    <>
      {placements.map((p, i) => (
        <Beam
          key={i}
          top={p.top}
          left={p.left - BEAM_WIDTH_OFFSET}
          transition={p.transition || {}}
        />
      ))}
    </>
  );
};

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
};

const Beam = ({ top, left, transition = {} }) => {
  return (
    <motion.div
      initial={{
        y: 0,
        opacity: 0,
      }}
      animate={{
        opacity: [0, 1, 0],
        y: 32 * 8,
      }}
      transition={{
        ease: 'easeInOut',
        duration: 3,
        repeat: Infinity,
        repeatDelay: 1.5,
        ...transition,
      }}
      style={{
        top,
        left,
      }}
      className='absolute z-10 h-[64px] w-[1px] bg-gradient-to-b from-blue-500/0 to-blue-500'
    />
  );
};

const GradientGrid = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 2.5,
        ease: 'easeInOut',
      }}
      className='absolute inset-0 z-0'
    >
      <div
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='rgb(30 58 138 / 0.5)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
        }}
        className='absolute inset-0 z-0'
      />
      <div className='absolute inset-0 z-10 bg-gradient-to-b from-zinc-900/0 to-zinc-900' />
    </motion.div>
  );
};

const GRID_BOX_SIZE = 32;
const BEAM_WIDTH_OFFSET = 1;
