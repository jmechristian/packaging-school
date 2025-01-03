import React from 'react';
import VideoPlayer from '../VideoPlayer';
import Link from 'next/link';

const VideoHero = ({ videoUrl, videoLink, slug }) => {
  return (
    (<div>
      <div className='max-w-7xl mx-auto object-cover border border-neutral-500 mt-3'>
        {videoLink && (
          <div className='w-full py-2 flex items-center justify-center bg-base-dark'>
            <div className='text-white font-semibold'>
              Trouble viewing video? Try{' '}
              <Link href={`/alt/lessons/${slug}`} className='text-brand-yellow underline'>
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

        {/* <video
          className='w-full h-full'
          controls
          controlsList='nodownload'
          autoPlay
          playsInline
        >
          <source src={videoUrl} type='video/mp4'></source>
        </video> */}
        <VideoPlayer light={false} videoEmbedLink={videoUrl} />
      </div>
    </div>)
  );
};

export default VideoHero;
