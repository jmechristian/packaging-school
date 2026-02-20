import React, { useState, useRef, useLayoutEffect } from 'react';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';

const LINE_HEIGHT = 20;
const COLLAPSED_LINES = 2;
const COLLAPSED_HEIGHT = LINE_HEIGHT * COLLAPSED_LINES;

const SubheadlineCell = ({ content, className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const wrapperRef = useRef(null);

  // useLayoutEffect runs before paint so "Show more" button appears without CLS
  useLayoutEffect(() => {
    if (!content || !wrapperRef.current) return;
    const el = wrapperRef.current;
    setIsOverflowing(el.scrollHeight > COLLAPSED_HEIGHT);
  }, [content]);

  return (
    <td className={`px-2 sm:px-3 py-2 align-top min-w-0 overflow-hidden ${className}`}>
      <div className='flex items-start gap-2'>
        <div
          ref={wrapperRef}
          className='text-sm text-slate-700 leading-5 overflow-hidden transition-[max-height] duration-200 ease-out'
          style={{
            maxHeight: isExpanded ? 'none' : `${COLLAPSED_HEIGHT}px`,
            minHeight: !isExpanded ? `${COLLAPSED_HEIGHT}px` : undefined,
          }}
        >
          {content}
        </div>
        {isOverflowing && (
          <button
            type='button'
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className='flex items-center gap-1 flex-shrink-0 text-slate-500 hover:text-slate-700 text-xs font-medium focus:outline-none py-0.5'
            aria-label={isExpanded ? 'Show less' : 'Show more'}
          >
            {isExpanded ? (
              <>
                <MdExpandLess size={18} />
                <span>Show less</span>
              </>
            ) : (
              <>
                <MdExpandMore size={18} />
                <span>Show more</span>
              </>
            )}
          </button>
        )}
      </div>
    </td>
  );
};

export default SubheadlineCell;
