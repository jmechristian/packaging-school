import React, { useState } from 'react';
import { PrismicRichText } from '@prismicio/react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import RotatingCaret from '../RotatingCaret';

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
          <div className='pb-3 flex justify-between items-end'>
            <div className='font-semibold font-plex text-2xl black__white '>
              Course Objectives
            </div>
            <div
              className='flex gap-1 items-center'
              onClick={() => setShowObjectives(!showObjectives)}
            >
              <div className='text-base-brand'>View All Objectives</div>
              <RotatingCaret
                styling='h-7 w-7 fill-base-brand'
                open={showObjectives}
              />
            </div>
          </div>
          <AnimatePresence>
            <motion.div
              animate={
                showObjectives
                  ? {
                      height: '100%',
                    }
                  : { height: '300px' }
              }
              initial={{ height: '300px' }}
              className='overflow-hidden relative'
            >
              <motion.div className='flex flex-col gap-4 xl:grid xl:grid-cols-2 w-full relative overflow-hidden'>
                <motion.div className='flex flex-col gap-6'>
                  {firstHalf &&
                    firstHalf.map((item, i) => (
                      <motion.div className='flex gap-3 w-full' key={i}>
                        <motion.div>
                          <CheckBadgeIcon className='w-6 h-6 fill-base-brand' />
                        </motion.div>
                        <motion.div className='gray__white text-lg'>
                          {item.overview_items}
                        </motion.div>
                      </motion.div>
                    ))}
                </motion.div>
                <motion.div className='flex flex-col gap-6'>
                  {secondHalf &&
                    secondHalf.map((item, i) => (
                      <motion.div className='flex gap-3 w-full' key={i}>
                        <motion.div>
                          <CheckBadgeIcon className='w-6 h-6 fill-base-brand' />
                        </motion.div>
                        <motion.div className='gray__white text-lg'>
                          {item.overview_items}
                        </motion.div>
                      </motion.div>
                    ))}
                </motion.div>
              </motion.div>
              {!showObjectives && (
                <motion.div className='absolute -left-5 -right-5 bottom-0 top-0 bg-gradient-to-t from-dark via-dark/95 z-10'></motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
export default CourseObjectives;
