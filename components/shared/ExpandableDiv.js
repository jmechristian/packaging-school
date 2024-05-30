import React, { useState, useRef, useEffect } from 'react';
import { MdArrowDropDown } from 'react-icons/md';

const ExpandableDiv = ({ less }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      setIsOverflowing(contentRef.current.scrollHeight > 120);
    }
  }, [less]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className='col-span-5 content-center'>
      <div
        className={`overflow-hidden ${
          isExpanded ? 'max-h-none' : 'max-h-[120px]'
        }`}
        style={{ transition: 'max-height 0.3s ease' }}
      >
        <div
          ref={contentRef}
          className={`text-sm ${!isExpanded ? 'line-clamp-6' : ''}`}
        >
          {less.subhead}
        </div>
      </div>
      {isOverflowing && (
        <button
          onClick={toggleExpand}
          className={`focus:outline-none transition-all ease-in ${
            isExpanded ? 'rotate-180' : 'rotate-0'
          }`}
        >
          <MdArrowDropDown size={28} color='black' />
        </button>
      )}
    </div>
  );
};

export default ExpandableDiv;
