import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { MdVideocam, MdClose, MdHourglassEmpty } from 'react-icons/md';
import {
  CourseDisabledCallout,
  CourseDisabledLabel,
  isCourseDisabled,
} from './CourseDisabledNotice';

const VideoPlayer = dynamic(
  () => import('../VideoPlayer').then((m) => m.default),
  { ssr: false }
);

const CourseMobileCard = ({
  course,
  onRowClick,
  onPurchase,
  isNavigating,
  hidePrice = false,
  disabledStyle = 'callout',
}) => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const hasPreview = !!(course.preview || course.video);
  const isDisabled = isCourseDisabled(course);
  const useLabel = isDisabled && disabledStyle === 'label';
  const reason = course.disabledReason?.trim();

  const handleClick = (e) => {
    if (e.target.closest('button') || e.target.closest('a')) return;
    onRowClick?.();
  };

  return (
    <>
      <div
        className={`border-b border-slate-200 ${useLabel ? 'bg-neutral-200' : ''}`}
      >
        {useLabel && reason ? (
          <div className='px-3 pt-2'>
            <CourseDisabledLabel reason={reason} />
          </div>
        ) : null}
      <div
        role='button'
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onRowClick?.();
          }
        }}
        aria-disabled={isDisabled || undefined}
        className={`flex justify-between gap-3 p-3 ${
          useLabel
            ? 'opacity-50 cursor-pointer'
            : isNavigating
              ? 'bg-slate-100 cursor-wait'
              : 'cursor-pointer active:bg-slate-50'
        }`}
      >
        <div className='min-w-0 flex-1'>
          {!useLabel && isDisabled ? (
            <div className='mb-1'>
              <CourseDisabledCallout reason={reason} />
            </div>
          ) : null}
          <div className={`text-xs font-mono mb-0.5 ${useLabel ? 'text-slate-400' : 'text-slate-600'}`}>
            {course.courseId}
          </div>
          <div className={`font-semibold text-sm leading-tight ${useLabel ? 'text-slate-500' : 'text-slate-900'}`}>
            {course.title}
          </div>
        </div>
        <div className='flex items-center gap-2 flex-shrink-0'>
          {isNavigating ? (
            <MdHourglassEmpty size={20} className='text-base-brand animate-pulse flex-shrink-0' />
          ) : hasPreview ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsVideoModalOpen(true);
              }}
              className='p-1.5 rounded hover:bg-slate-200 flex-shrink-0'
              aria-label='Watch preview'
            >
              <MdVideocam size={20} className='text-slate-600' />
            </button>
          ) : null}
          {!hidePrice && (
            <div className='text-right'>
              <div className='font-semibold text-slate-900'>
                {course.price === 'FREE' ? 'Free' : `$${course.price}`}
              </div>
              {isDisabled ? (
                <span className='text-xs font-medium text-slate-400'>
                  Unavailable
                </span>
              ) : (
                onPurchase &&
                course.price !== 'FREE' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPurchase();
                    }}
                    className='text-xs font-medium text-base-brand hover:underline'
                  >
                    Enroll
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </div>
      </div>
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

export default CourseMobileCard;
