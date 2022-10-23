import React, { useState } from 'react';
import { PrismicRichText } from '@prismicio/react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import RotatingCaret from '../RotatingCaret';
import CourseDetails from './CourseDetails';
import { delay } from 'lodash';

const CourseObjectives = ({ what, items }) => {
  const [showObjectives, setShowObjectives] = useState(false);

  const half = Math.ceil(items.length / 2);
  const firstHalf = items.slice(0, half);
  const secondHalf = items.slice(half);

  return (
    <div className='flex flex-col gap-12 lg:max-w-prose pb-16'>
      <div className='flex flex-col gap-4'>
        <div className='font-semibold font-plex text-2xl black__white '>
          What You Will Learn
        </div>
        <div className='gray__white text-lg'>
          <PrismicRichText field={what} />
        </div>
      </div>
      {items.length > 1 && (
        <div className='flex flex-col gap-6'>
          <div className='font-semibold font-plex text-2xl black__white border-b border-b-slate-900 dark:border-b-slate-500 pb-3 flex justify-between items-end'>
            <div>View Course Objectives</div>
            <button onClick={() => setShowObjectives(!showObjectives)}>
              <RotatingCaret
                open={showObjectives}
                styling='h-6 w-6 fill-slate-900 dark:fill-white'
              />
            </button>
          </div>
          <AnimatePresence>
            {showObjectives && (
              <motion.div
                animate={{
                  opacity: 1,
                }}
                initial={{ opacity: 0 }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.2 },
                }}
              >
                <div className='flex flex-col gap-4 xl:grid xl:grid-cols-2 w-full'>
                  <div className='flex flex-col gap-6'>
                    {firstHalf &&
                      firstHalf.map((item, i) => (
                        <div className='flex gap-3 w-full' key={i}>
                          <div>
                            <CheckBadgeIcon className='w-6 h-6 fill-base-brand' />
                          </div>
                          <div className='gray__white text-lg'>
                            {item.overview_items}
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className='flex flex-col gap-6'>
                    {secondHalf &&
                      secondHalf.map((item, i) => (
                        <div className='flex gap-3 w-full' key={i}>
                          <div>
                            <CheckBadgeIcon className='w-6 h-6 fill-base-brand' />
                          </div>
                          <div className='gray__white text-lg'>
                            {item.overview_items}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default CourseObjectives;
