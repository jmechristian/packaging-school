import React from 'react';
import TourAccordian from './TourAccordian';

export const TourModal = ({ onClose }) => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center'>
      <div className='bg-white dark:bg-dark-dark rounded-lg px-8 py-8 max-w-5xl w-full relative'>
        <div className='absolute top-3 right-3 flex justify-end'>
          <button
            className='bg-slate-200 rounded-md px-4 py-1 text-sm text-slate-600'
            onClick={onClose}
          >
            Skip Tour
          </button>
        </div>
        <div className='flex flex-col gap-8'>
          <div className='flex flex-col gap-2'>
            <div className='h3-base'>
              Your Path to New Skills — Now Streamlined
            </div>
            <div className='text-xl text-gray-500 max-w-2xl'>
              Easily access your courses, lessons, and new learning features —
              your professional growth starts here
            </div>
          </div>
          <TourAccordian />
        </div>
      </div>
    </div>
  );
};
