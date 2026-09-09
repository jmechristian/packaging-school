import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { MdPlayArrow, MdClose, MdVideocam } from 'react-icons/md';

const VideoPlayer = dynamic(
  () => import('../VideoPlayer').then((m) => m.default),
  { ssr: false },
);

const CatalogVideoPreview = ({
  seoImage,
  previewUrl,
  title,
  autoPlay = true,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [imgError, setImgError] = useState(false);
  const hasPreview = !!previewUrl;
  const hasImage = !!(seoImage && !imgError);

  return (
    <div
      className='relative w-full aspect-[16/9] bg-slate-200 overflow-hidden'
      onClick={(e) => {
        if (hasPreview) e.stopPropagation();
      }}
    >
      {isPlaying && hasPreview ? (
        <div className='absolute inset-0 bg-black'>
          <VideoPlayer
            videoEmbedLink={previewUrl}
            light={false}
            playing={autoPlay}
          />
          <button
            type='button'
            onClick={(e) => {
              e.stopPropagation();
              setIsPlaying(false);
            }}
            className='absolute top-2 right-2 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-black/70 hover:bg-black text-white transition-colors'
            aria-label='Close preview'
          >
            <MdClose size={18} />
          </button>
        </div>
      ) : (
        <>
          {hasImage ? (
            <img
              src={seoImage}
              alt={title ? `${title} preview` : 'Course preview'}
              className='absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]'
              onError={() => setImgError(true)}
            />
          ) : (
            <div className='absolute inset-0 bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center'>
              <MdVideocam size={36} className='text-white/70' />
            </div>
          )}
          {hasPreview && (
            <button
              type='button'
              onClick={(e) => {
                e.stopPropagation();
                setIsPlaying(true);
              }}
              className='absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/25 transition-colors group/play'
              aria-label={`Watch preview${title ? ` for ${title}` : ''}`}
            >
              <span className='flex items-center justify-center w-14 h-14 rounded-full bg-white/95 text-slate-900 shadow-lg transition-transform duration-200 group-hover/play:scale-110 group-hover:scale-105'>
                <MdPlayArrow size={32} className='ml-0.5' />
              </span>
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default CatalogVideoPreview;
