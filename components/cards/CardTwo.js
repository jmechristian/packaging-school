import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FiMousePointer } from 'react-icons/fi';

const CardTwo = () => {
  return <TiltCard />;
};

const TiltCard = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ['17.5deg', '-17.5deg']
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ['-17.5deg', '17.5deg']
  );

  const handleMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: 'preserve-3d',
      }}
      className='relative w-[360px] h-[515px] rounded-3xl bg-neutral-900'
    >
      <div
        style={{
          transform: 'translateZ(75px)',
          transformStyle: 'preserve-3d',
        }}
        className='absolute inset-4 grid place-content-center rounded-xl bg-white shadow-lg'
      ></div>
    </motion.div>
  );
};

export default CardTwo;
