import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

export const TestimonialShuffle = () => {
  const [order, setOrder] = useState(['front', 'middle', 'back']);

  const handleShuffle = () => {
    const orderCopy = [...order];
    orderCopy.unshift(orderCopy.pop());
    setOrder(orderCopy);
  };

  return (
    <div className='grid place-content-center  text-slate-50 w-full '>
      <div className='relative -ml-[100px] h-[450px] w-[320px] md:-ml-[175px]'>
        <Card
          imgUrl='https://packschool.s3.us-east-1.amazonaws.com/gera-headshot.jpeg'
          testimonial='This rigorous coursework has deepened my understanding of packaging materials, design principles, sustainability practices and many more essential topics.'
          author='Saurabh G., Sr. Packaging Analyst @ Target'
          handleShuffle={handleShuffle}
          position={order[0]}
        />
        <Card
          imgUrl='https://packschool.s3.us-east-1.amazonaws.com/rafeal-r-headshot.png'
          testimonial={
            'Man, the The Packaging School (doesn&#39;t) play around. They truly are packing focused. My newly acquired Certificate of Packaging Science says it all.'
          }
          author='Rafael R., Sr. Packaging Engineer @ Primex'
          handleShuffle={handleShuffle}
          position={order[1]}
        />
        <Card
          imgUrl='https://packschool.s3.us-east-1.amazonaws.com/gislaine-headshot.jpeg'
          testimonial={
            'I&#39;m thrilled to announce, I&#39;ve successfully completed the 12-courses of The Packaging School Certification! This is a significant milestone in my career as a Packaging Engineer.'
          }
          author='Gislaine D., Packaging Engineering Leader @ Stabilus'
          handleShuffle={handleShuffle}
          position={order[2]}
        />
      </div>
    </div>
  );
};

const Card = ({ handleShuffle, testimonial, position, imgUrl, author }) => {
  const mousePosRef = useRef(0);
  const clickTimerRef = useRef(null);

  const onDragStart = (e) => {
    mousePosRef.current = e.clientX;
    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
      clickTimerRef.current = null;
    }
  };

  const onDragEnd = (e) => {
    const diff = mousePosRef.current - e.clientX;

    if (diff > 150) {
      handleShuffle();
    }

    mousePosRef.current = 0;
    clickTimerRef.current = setTimeout(() => {
      clickTimerRef.current = null;
    }, 100);
  };

  const handleClick = () => {
    if (!clickTimerRef.current && position === 'front') {
      handleShuffle();
    }
  };

  const x = position === 'front' ? '0%' : position === 'middle' ? '33%' : '66%';
  const rotateZ =
    position === 'front' ? '-6deg' : position === 'middle' ? '0deg' : '6deg';
  const zIndex = position === 'front' ? '2' : position === 'middle' ? '1' : '0';

  const draggable = position === 'front';

  return (
    <motion.div
      onClick={handleClick}
      style={{
        zIndex,
      }}
      animate={{ rotate: rotateZ, x }}
      drag
      dragElastic={0.35}
      dragListener={draggable}
      dragConstraints={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      transition={{
        duration: 0.35,
      }}
      className={`absolute left-0 top-0 grid h-[450px] w-[350px] select-none place-content-center space-y-6 border-2 border-slate-700 bg-slate-800/20 p-6 shadow-xl backdrop-blur-md ${
        draggable ? 'cursor-grab active:cursor-grabbing' : ''
      }`}
    >
      <img
        src={imgUrl}
        alt={`Image of ${author}`}
        className='pointer-events-none mx-auto h-32 w-32 rounded-full border-2 border-slate-700 bg-slate-200 object-cover'
      />
      <span
        className='text-center text-lg leading-snug text-slate-400'
        dangerouslySetInnerHTML={{ __html: `"${testimonial}"` }}
      />
      <span className='text-center text-sm font-medium text-indigo-400'>
        {author}
      </span>
    </motion.div>
  );
};

export default TestimonialShuffle;
