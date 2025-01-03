import { useState, useMemo } from 'react';
import { PlayIcon, ArrowLeftCircleIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import Image from "next/legacy/image";

const ScrollingCards = ({ testimonials }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSelectedVid, setIsSelectedVid] = useState('');

  return (
    <div className='relative'>
      <div className='px-4 pt-4 overflow-x-hidden relative'>
        {/* <div className='absolute top-0 bottom-0 left-0 w-24 z-10 bg-gradient-to-r from-neutral-200 to-transparent' /> */}

        <div className='flex items-center mb-4'>
          <TestimonialList
            list={testimonials.slice(0, 5)}
            duration={60}
            fn={() => setIsOpen(true)}
            setSelected={(val) => setIsSelectedVid(val)}
          />
          <TestimonialList
            list={testimonials.slice(0, 5)}
            duration={60}
            fn={() => setIsOpen(true)}
            setSelected={(val) => setIsSelectedVid(val)}
          />
          <TestimonialList
            list={testimonials.slice(0, 5)}
            duration={60}
            fn={() => setIsOpen(true)}
            setSelected={(val) => setIsSelectedVid(val)}
          />
        </div>

        {/* <div className='absolute top-0 bottom-0 right-0 w-24 z-10 bg-gradient-to-l from-neutral-200 to-transparent' /> */}
      </div>
    </div>
  );
};

const TestimonialList = ({
  list,
  reverse = false,
  duration = 50,
  fn,
  setSelected,
}) => {
  return (
    <motion.div
      initial={{ translateX: reverse ? '-100%' : '0%' }}
      animate={{ translateX: reverse ? '0%' : '-100%' }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
      className='flex gap-4 px-2'
    >
      {list.map((t) => {
        return (
          <div
            key={t.id}
            className='shrink-0 w-[300px] hover:bg-green-300 bg-white flex flex-col rounded-lg overflow-hidden group items-start relative ring-4 ring-black shadow-lg'
          >
            <div className='w-full aspect-[5/3] overflow-hidden  bg-black rounded-lg'>
              <Image
                width={430}
                height={430}
                alt={t.description}
                src={t.src}
                layout='responsive'
              />
            </div>
            <div className='flex flex-col px-3 py-6'>
              <span className='block font-semibold text-lg mb-2'>
                {t.title}
              </span>
              <span className='block leading-tight'>{t.description}</span>
            </div>
          </div>
        );
      })}
    </motion.div>
  );
};

export default ScrollingCards;
