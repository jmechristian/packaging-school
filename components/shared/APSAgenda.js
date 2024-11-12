import React, { useState } from 'react';
import { motion } from 'framer-motion';
import NewAgendaItem from './NewAgendaItem';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

const APSAgenda = ({ dayOne, dayTwo, dayThree, enabled }) => {
  const [expanded, setExpanded] = useState(true);
  return (
    <div className='w-full max-w-7xl mx-auto lg:px-0 pb-12'>
      <div className='w-full h-full border-2 border-neutral-900 bg-neutral-900 flex flex-col p-0.5 gap-1 '>
        <div className='w-full bg-neutral-800 rounded-t-lg'>
          <div className='w-full flex justify-between items-center px-5 py-4'>
            <div className='font-oswald uppercase text-white text-xl md:text-2xl tracking-wide'>
              <span className='text-ap-yellow'>Agenda</span> / 2024
            </div>
            <div className='flex gap-3 items-center h-full -mr-3 md:mr-0 bg-white/10 py-3 px-4 rounded-lg'>
              <div
                className={`cursor-pointer bg-gradient-to-r gap-2 from-ap-darkblue to-ap-yellow w-fit p-4 rounded-full md:rounded-lg flex items-center`}
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? (
                  <ChevronUpIcon className='w-5 h-5 stroke-white' />
                ) : (
                  <ChevronDownIcon className='w-5 h-5 stroke-white' />
                )}
              </div>
            </div>
          </div>
        </div>
        <motion.div
          className='flex flex-col'
          key={enabled}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div className='bg-black w-full px-6 py-4 flex'>
            <motion.div className='text-ap-yellow font-medium text-lg lg:text-xl font-oswald uppercase'>
              <span className='text-white'>Day One</span> Monday, October 21,
              2024
            </motion.div>
          </motion.div>
          {dayOne &&
            expanded &&
            dayOne.map((s) => (
              <motion.div className='w-full' key={s._id}>
                <NewAgendaItem
                  type={s.type}
                  title={s.name}
                  startTime={s.session_start}
                  endTime={s.session_end}
                  location={s.location}
                  speakers={s.speakers}
                  sponsors={s.sponsors}
                />
              </motion.div>
            ))}
          <motion.div className='bg-black w-full px-6 py-4 flex'>
            <motion.div className='text-ap-yellow font-medium text-lg lg:text-xl font-oswald uppercase'>
              <span className='text-white'>Day Two</span> Tuesday, October 22,
              2024
            </motion.div>
          </motion.div>
          {dayTwo &&
            expanded &&
            dayTwo.map((s) => (
              <motion.div className='w-full' key={s._id}>
                <NewAgendaItem
                  type={s.type}
                  title={s.name}
                  startTime={s.session_start}
                  endTime={s.session_end}
                  location={s.location}
                  speakers={s.speakers}
                  sponsors={s.sponsors}
                />
              </motion.div>
            ))}
          <motion.div className='bg-black w-full px-6 py-4 flex'>
            <motion.div className='text-ap-yellow font-medium text-lg lg:text-xl font-oswald uppercase'>
              <span className='text-white'>Day Three</span> Wednesday, October
              23, 2024
            </motion.div>
          </motion.div>
          {dayThree &&
            expanded &&
            dayThree.map((s) => (
              <motion.div className='w-full' key={s._id}>
                <NewAgendaItem
                  type={s.type}
                  title={s.name}
                  startTime={s.session_start}
                  endTime={s.session_end}
                  location={s.location}
                  speakers={s.speakers}
                  sponsors={s.sponsors}
                />
              </motion.div>
            ))}
        </motion.div>
      </div>
    </div>
  );
};

export default APSAgenda;
