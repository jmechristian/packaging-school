import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

export const CardShuffleHero = () => {
  const [order, setOrder] = useState(['front', 'middle', 'back']);

  const handleShuffle = () => {
    const orderCopy = [...order];
    orderCopy.unshift(orderCopy.pop());
    setOrder(orderCopy);
  };

  return (
    <section className='overflow-hidden bg-slate-900 px-8 py-24 text-slate-50'>
      <div className='mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 md:grid-cols-2 md:gap-8'>
        <div>
          <h3 className='text-5xl font-black leading-[1.25] md:text-7xl'>
            You don't know marketing
          </h3>
          <p className='mb-8 mt-4 text-lg text-slate-400'>
            ...but we're going to help. We send out weekly break downs of
            exactly what's working and what's not for the largest companies in
            the world. It's free.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className='flex items-center gap-2'
          >
            <input
              type='email'
              placeholder='Enter your email'
              className='w-full rounded border-transparent bg-slate-800 px-3 py-2 transition-colors focus:bg-slate-700 focus:outline-none'
            />
            <button className='whitespace-nowrap rounded bg-indigo-600 px-3 py-2 transition-transform hover:scale-[1.02] active:scale-[0.98]'>
              Join newsletter
            </button>
          </form>
        </div>
        <div className='relative h-[450px] w-[350px]'>
          <Card
            imgUrl='/imgs/head-shots/7.jpg'
            testimonial="I feel like I've learned as much from X as I did completing my masters. It's the first thing I read every morning."
            author='Jenn F. - Marketing Director @ Square'
            handleShuffle={handleShuffle}
            position={order[0]}
          />
          <Card
            imgUrl='/imgs/head-shots/8.jpg'
            testimonial="My boss thinks I know what I'm doing. Honestly, I just read this newsletter."
            author='Adrian Y. - Product Marketing @ Meta'
            handleShuffle={handleShuffle}
            position={order[1]}
          />
          <Card
            imgUrl='/imgs/head-shots/9.jpg'
            testimonial='Can not believe this is free. If X was $5,000 a month, it would be worth every penny. I plan to name my next child after X.'
            author='Devin R. - Growth Marketing Lead @ OpenAI'
            handleShuffle={handleShuffle}
            position={order[2]}
          />
        </div>
      </div>
    </section>
  );
};

const Card = ({ handleShuffle, testimonial, position, imgUrl, author }) => {
  const mousePosRef = useRef(0);

  const onDragStart = (e) => {
    mousePosRef.current = e.clientX;
  };

  const onDragEnd = (e) => {
    const diff = mousePosRef.current - e.clientX;

    if (diff > 150) {
      handleShuffle();
    }

    mousePosRef.current = 0;
  };

  const x = position === 'front' ? '0%' : position === 'middle' ? '33%' : '66%';
  const rotateZ =
    position === 'front' ? '-6deg' : position === 'middle' ? '0deg' : '6deg';
  const zIndex = position === 'front' ? '2' : position === 'middle' ? '1' : '0';

  const draggable = position === 'front';

  return (
    <motion.div
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
      className={`absolute left-0 top-0 grid h-[450px] w-[350px] select-none place-content-center space-y-6 rounded-2xl border-2 border-slate-700 bg-slate-800/20 p-6 shadow-xl backdrop-blur-md ${
        draggable ? 'cursor-grab active:cursor-grabbing' : ''
      }`}
    >
      <img
        src={imgUrl}
        alt={`Image of ${author}`}
        className='pointer-events-none mx-auto h-32 w-32 rounded-full border-2 border-slate-700 bg-slate-200 object-cover'
      />
      <span className='text-center text-lg italic text-slate-400'>
        "{testimonial}"
      </span>
      <span className='text-center text-sm font-medium text-indigo-400'>
        {author}
      </span>
    </motion.div>
  );
};

export default CardShuffleHero;
