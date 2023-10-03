import React, { useState } from 'react';
import { CheckCircleIcon, LightBulbIcon } from '@heroicons/react/20/solid';

const IconLabel = ({ name, isComplete }) => {
  return (
    <div className='flex py-3 gap-1 items-start text-lg text-gray-700 dark:text-white/60 pl-0'>
      <LightBulbIcon
        className={`mr-4 h-7 w-7  md:flex-shrink-0 ${
          isComplete ? 'text-green-400' : 'text-yellow-500'
        } `}
        aria-hidden='true'
      />
      {name}
    </div>
  );
};

const items = [
  {
    name: 'Define carbon neutrality',
    isComplete: false,
  },
  {
    name: 'Examine carbon credits and offsets',
    isComplete: false,
  },
  {
    name: 'Summarize carbon trading',
    isComplete: false,
  },
  {
    name: 'Discuss examples of carbon offset in the industry',
    isComplete: false,
  },
];

const LearningObjectives = ({ objectives }) => {
  return (
    objectives && (
      <div className='flex flex-col gap-6'>
        <div className='text-clemson dark:text-white text-xl lg:text-2xl font-bold mt-3'>
          Learning Objectives
        </div>
        <ul role='list' className='divide-y divide-gray-200 p-0'>
          {objectives.map((obj) => (
            <li key={obj} className='list-none p-0'>
              <IconLabel name={obj} isComplete={false} />
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default LearningObjectives;
