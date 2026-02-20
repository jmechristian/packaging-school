import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { MdVideocam, MdClose, MdHourglassEmpty } from 'react-icons/md';

const VideoPlayer = dynamic(
  () => import('../VideoPlayer').then((m) => m.default),
  { ssr: false }
);

const CertificateMobileCard = ({
  certificate,
  onRowClick,
  onApplyClick,
  isNavigating,
}) => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const applyLabel =
    certificate.abbreviation === 'CPS' || certificate.abbreviation === 'CMPM'
      ? 'Apply'
      : 'Enroll';
  const hasPreview = !!(certificate.video || certificate.preview);

  const handleClick = (e) => {
    if (e.target.closest('button') || e.target.closest('a')) return;
    onRowClick?.();
  };

  return (
    <>
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
        className={`flex justify-between gap-3 p-3 border-b border-slate-200 bg-clemson/5 ${
          isNavigating ? 'cursor-wait' : 'cursor-pointer active:bg-slate-100'
        }`}
      >
        <div className='min-w-0 flex-1'>
          <div className='text-xs font-mono text-slate-600 mb-0.5'>
            {certificate.courseId}
          </div>
          <div className='font-semibold text-slate-900 text-sm leading-tight'>
            {certificate.title}
            {certificate.abbreviation && (
              <span className='text-slate-500 font-normal'>
                {' '}({certificate.abbreviation})
              </span>
            )}
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
          ) : (
            <span className='w-8 h-8 flex-shrink-0' aria-hidden='true' />
          )}
          <div className='text-right'>
            <div className='font-semibold text-slate-900'>
              {certificate.price === 'FREE' ? 'Free' : `$${certificate.price}`}
            </div>
            {onApplyClick && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onApplyClick();
                }}
                className='text-xs font-medium text-base-brand hover:underline'
              >
                {applyLabel} Now
              </button>
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
                      videoEmbedLink={certificate.video || certificate.preview}
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

export default CertificateMobileCard;
