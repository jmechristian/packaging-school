import React, { useState } from 'react';

const FilterIconTooltip = ({ children, tooltip }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className='relative'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && tooltip && (
        <div className='absolute z-50 top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-1 text-xs font-medium text-white bg-slate-800 rounded shadow-lg whitespace-nowrap pointer-events-none'>
          {tooltip}
        </div>
      )}
      {children}
    </div>
  );
};

export default FilterIconTooltip;
