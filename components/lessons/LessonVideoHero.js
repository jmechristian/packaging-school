import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

/**
 * Hero component for VIDEO lessons: renders a static poster image for fast LCP,
 * then loads the video player only when the user clicks play.
 */
const LessonVideoHero = ({ posterUrl, videoEmbedLink, slug, videoLink }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!posterUrl || !videoEmbedLink) {
    return null;
  }

  return (
    <div className='w-full object-cover border-b border-b-gray-400 mb-5'>
      <div className='relative w-full aspect-[16/9] bg-black overflow-hidden'>
        {isPlaying ? (
          <ReactPlayer
            url={videoEmbedLink}
            width='100%'
            height='100%'
            controls
            light={false}
            playing={true}
          />
        ) : (
          <>
            <Image
              src={posterUrl}
              alt=''
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 960px'
              className='object-cover'
              priority
              fetchPriority='high'
            />
            <button
              type='button'
              onClick={() => setIsPlaying(true)}
              className='absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors cursor-pointer'
              aria-label='Play video'
            >
              <div className='w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-white/90 flex items-center justify-center hover:scale-110 transition-transform'>
                <svg
                  className='w-8 h-8 lg:w-10 lg:h-10 ml-1 text-gray-900'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                  aria-hidden
                >
                  <path d='M8 5v14l11-7z' />
                </svg>
              </div>
            </button>
          </>
        )}
      </div>
      {videoLink && (
        <div className='w-full py-2 flex items-center justify-center bg-base-dark'>
          <div className='text-white font-semibold'>
            Trouble viewing video? Try{' '}
            <Link
              href={`/alt/lessons/${slug}`}
              className='text-brand-yellow underline'
            >
              Alt Link 1
            </Link>
            ,{' '}
            <a href={videoLink} className='text-brand-yellow underline'>
              Alt Link 2
            </a>
            .
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonVideoHero;
