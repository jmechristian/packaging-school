import React, { useId, useState, useEffect } from 'react';
import clsx from 'clsx';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/solid';
import Image from "next/legacy/image";
import FadeIn from '../../helpers/FadeIn';
import { AnimatePresence, motion } from 'framer-motion';

const delay = 7000;

export function GridPattern(props) {
  let patternId = useId();

  return (
    <svg aria-hidden='true' className='absolute inset-0 h-full w-full'>
      <defs>
        <pattern
          id={patternId}
          width='128'
          height='128'
          patternUnits='userSpaceOnUse'
          {...props}
        >
          <path d='M0 128V.5H128' fill='none' stroke='currentColor' />
        </pattern>
      </defs>
      <rect width='100%' height='100%' fill={`url(#${patternId})`} />
    </svg>
  );
}

const TestimonialSlider = ({ testimonials, type }) => {
  const timeoutRef = React.useRef(null);

  const [items, setItems] = useState(testimonials);
  const [isActive, setIsActive] = useState(0);
  const [number, setNumber] = useState(0);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    if (items.length > 0) {
      resetTimeout();
      timeoutRef.current = setTimeout(
        () =>
          setIsActive((prevIndex) =>
            prevIndex === items.length - 1 ? 0 : prevIndex + 1
          ),
        delay
      );
    }

    return () => {
      resetTimeout();
    };
  }, [isActive, items.length, testimonials]);

  return (
    <div className='relative mx-auto w-full max-w-2xl lg:max-w-7xl rounded-3xl gap-9 flex flex-col lg:flex-row px-6 xl:px-0'>
      <div className='w-full h-full lg:max-w-[50%] lg:pr-16'>
        <div className='flex flex-col gap-12 xl:mt-6'>
          <div className='bg-base-brand rounded-full flex gap-3 items-center w-fit p-3 bg-gradient-to-br from-clemson via-base-mid to-neutral-900 shadow-xl'>
            <div className='bg-white/50 backdrop-blur w-full rounded-full py-2 px-3 flex items-center shadow-lg'>
              <div
                className='w-16 h-16 rounded-full bg-base-light shadow-xl bg-cover bg-center'
                style={{
                  backgroundImage: `url('https://packschool.s3.amazonaws.com/trophy-7-iso.png')`,
                }}
              ></div>
              <div className='uppercase font-bold tracking-wide text-white px-3'>
                Success Unlocked!
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col'>
              <div className='font-bold text-4xl lg:text-5xl'>
                <h2 className='dark:text-white leading-none'>
                  <span className='text-base-mid'>
                    From Classroom to Career:
                  </span>{' '}
                  Student Success Stories
                </h2>
              </div>
            </div>
            <div className='text-xl text-neutral-700 dark:text-neutral-500 max-w-prose'>
              Empower yourself and your team to reach new heights with this
              unparalleled program, offering flexibility and depth, tailored to
              help you and your employees excel in your automotive packaging
              careers.
            </div>
          </div>
        </div>
      </div>
      <div className='w-full h-full bg-neutral-200 dark:bg-dark-mid py-6 lg:p-6 rounded-xl lg:max-w-[50%]'>
        <div className='relative flex flex-col items-center w-full mx-auto md:max-w-2xl md:px-16 lg:px-6 lg:max-w-6xl lg:py-16 px-6'>
          <AnimatePresence>
            <motion.div
              className={`w-full h-[420px] lg:h-[330px] flex justify-center items-center`}
              key={isActive}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, display: 'none' }}
            >
              <figure>
                <blockquote className='font-display text-xl xl:text-2xl font-medium leading-snug lg:leading-tight text-slate-900 dark:text-white sm:text-center line-clamp-[12]'>
                  {items.length > 0 && items[isActive].content}
                </blockquote>
                <figcaption className='mt-10 flex items-center sm:justify-center'>
                  {items.length > 0 && (
                    <div className='overflow-hidden rounded-full h-12 w-12 bg-slate-200  ring-2 ring-clemson'>
                      <Image
                        className='h-12 w-12 object-cover'
                        src={
                          items[isActive].headshot
                            ? items[isActive].headshot
                            : 'https://packschool.s3.amazonaws.com/academic-cap-sm.png'
                        }
                        alt={items[isActive].author}
                        width={48}
                        height={48}
                      />
                    </div>
                  )}
                  <div className='ml-4'>
                    <div className='text-base font-medium leading-6 tracking-tight text-slate-900 dark:text-clemson'>
                      {items.length > 0 && items[isActive].author ? (
                        items[isActive].author
                      ) : (
                        <></>
                      )}
                      {items.length > 0 &&
                      items[isActive].author &&
                      items[isActive].company
                        ? ', '
                        : ''}
                      {items.length > 0 && items[isActive].company ? (
                        items[isActive].company
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className='text-sm text-slate-600 dark:text-gray-500'>
                      {items.length > 0 && items[isActive].title ? (
                        items[isActive].title
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                </figcaption>
              </figure>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className='flex gap-2 items-center justify-center mt-6'>
          {items.length > 0 &&
            items.map((it, index) => (
              <div
                onClick={() => setIsActive(index)}
                className={`h-3 w-3 rounded-full transition-colors ease-in cursor-pointer ${
                  index === isActive
                    ? 'bg-neutral-900 dark:bg-base-brand'
                    : 'bg-white'
                }`}
                key={it.author}
              ></div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;
