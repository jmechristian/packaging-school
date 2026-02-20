import React from 'react';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';

const SortableTableHeader = ({ label, sortKey, currentSort, direction, onClick, align = 'left', className = '' }) => {
  const isActive = currentSort === sortKey;

  return (
    <th
      className={`px-2 sm:px-3 py-2 cursor-pointer select-none hover:bg-slate-100 transition-colors text-xs sm:text-sm ${
        align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left'
      } ${className}`}
      onClick={onClick}
    >
      <div className={`flex items-center gap-1 font-semibold text-sm ${
        align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : ''
      }`}>
        {isActive && (
          <div className='flex flex-col -m-0.5'>
            <MdExpandLess
              size={16}
              color={direction === 'ASC' ? 'currentColor' : '#9ca3af'}
            />
            <MdExpandMore
              size={16}
              color={direction === 'DSC' ? 'currentColor' : '#9ca3af'}
              className='-mt-2'
            />
          </div>
        )}
        <span className='capitalize'>{label}</span>
      </div>
    </th>
  );
};

export default SortableTableHeader;
