import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { MdVideocam, MdClose, MdHourglassEmpty } from 'react-icons/md';
import SubheadlineCell from './SubheadlineCell';

const VideoPlayer = dynamic(
  () => import('../VideoPlayer').then((m) => m.default),
  { ssr: false }
);

const CourseTableRow = ({
  course,
  onRowClick,
  onPurchase,
  isNavigating,
}) => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const hasPreview = !!(course.preview || course.video);

  const handleRowClick = (e) => {
    if (e.target.closest('button') || e.target.closest('a')) return;
    onRowClick?.();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onRowClick?.();
    }
  };

  return (
    <>
      <tr
        className={`border-b border-slate-200 transition-colors group relative ${
          isNavigating ? 'bg-slate-100 cursor-wait' : 'hover:bg-slate-50 cursor-pointer'
        }`}
        onClick={handleRowClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role='button'
      >
        <td className={`sticky left-0 z-[1] px-2 sm:px-3 py-2.5 sm:py-3 text-xs font-mono text-slate-600 align-top whitespace-nowrap shadow-[2px_0_4px_-2px_rgba(0,0,0,0.08)] ${
          isNavigating ? 'bg-slate-100' : 'bg-white group-hover:bg-slate-50'
        }`}>
          {course.courseId}
        </td>
        <td className='px-2 sm:px-3 py-2.5 sm:py-3 align-top min-w-0'>
          <div className='font-semibold text-slate-900 text-sm sm:text-base leading-tight break-words'>{course.title}</div>
        </td>
        <SubheadlineCell content={course.subheadline || ''} className='py-2.5 sm:py-3' />
        <td className='px-2 sm:px-3 py-2.5 sm:py-3 text-sm font-medium align-top text-center'>
          {course.hours}
        </td>
        <td className='px-2 sm:px-3 py-2.5 sm:py-3 text-sm font-medium align-top text-center'>
          {course.lessons}
        </td>
        <td className={`px-0 py-2.5 sm:py-3 align-middle text-center overflow-hidden ${
          isNavigating ? 'bg-slate-100' : 'bg-white group-hover:bg-slate-50'
        }`}>
          <div className='flex items-center justify-center w-full'>
            {isNavigating ? (
              <MdHourglassEmpty size={18} className='text-base-brand animate-pulse' />
            ) : hasPreview ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsVideoModalOpen(true);
                }}
                className='p-1 rounded hover:bg-slate-200 transition-colors'
                aria-label='Watch preview'
              >
                <MdVideocam size={18} className='text-slate-600' />
              </button>
            ) : (
              <span className='w-8 h-8 flex-shrink-0' aria-hidden='true' />
            )}
          </div>
        </td>
        <td className='pl-2 pr-2 sm:pl-3 sm:pr-3 py-2.5 sm:py-3 align-top text-center min-w-0 overflow-hidden'>
          <div className='flex flex-col gap-0.5 items-center min-w-0'>
            <span className='text-sm sm:text-base font-semibold truncate'>
              {course.price === 'FREE' ? 'Free' : `$${course.price}`}
            </span>
            {onPurchase && course.price !== 'FREE' && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPurchase();
                }}
                className='text-xs font-medium text-base-brand hover:underline'
              >
                Enroll
              </button>
            )}
          </div>
        </td>
      </tr>
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {isVideoModalOpen && hasPreview && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4'
                onClick={() => setIsVideoModalOpen(false)}
              >
                <div
                  className='relative w-full max-w-4xl'
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className='aspect-video bg-black rounded-lg overflow-hidden'>
                    <VideoPlayer
                      videoEmbedLink={course.preview || course.video}
                      light={false}
                      playing={true}
                    />
                  </div>
                  <button
                    type='button'
                    onClick={() => setIsVideoModalOpen(false)}
                    className='absolute -top-10 right-0 flex items-center gap-2 px-4 py-2 rounded bg-white/10 hover:bg-white/20 text-white font-medium transition-colors'
                  >
                    <MdClose size={20} />
                    Close
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};

export default CourseTableRow;
