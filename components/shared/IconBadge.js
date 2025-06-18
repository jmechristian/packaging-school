import React from 'react';

const IconBadge = ({ icon: Icon, size = 24, className = '' }) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
    >
      <svg
        width={size}
        height={size}
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <circle
          cx='12'
          cy='12'
          r='11'
          fill='currentColor'
          className='text-clemson'
        />
        <circle
          cx='12'
          cy='12'
          r='10'
          stroke='currentColor'
          strokeWidth='1'
          className='text-gray-300 dark:text-gray-700'
        />
      </svg>
      <div className='absolute inset-0 flex items-center justify-center'>
        <Icon className='w-[40%] h-[40%] text-white' />
      </div>
    </div>
  );
};

export default IconBadge;
