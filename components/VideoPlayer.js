import React, { useState } from 'react';
import dynamic from 'next/dynamic';
const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });
import {
  CursorArrowRaysIcon,
  FaceFrownIcon,
} from '@heroicons/react/24/outline';

const VideoPlayer = ({
  videoEmbedLink,
  light,
  rounded,
  playing,
  videoLink,
  hideSupport,
}) => {
  const [isError, setIsError] = useState(false);
  const [isBackup, setIsBackup] = useState(false);

  return (
    <div
      className={`relative w-full flex items-center justify-center bg-black ${
        rounded ? 'rounded-t-xl' : ''
      }`}
    >
      {/* {!hideSupport && (
        <div
          className='bg-base-brand cursor-pointer gap-1 px-2 pt-1 pb-2 flex items-center justify-center'
          onClick={() => setIsBackup(true)}
        >
          <div>
            <CursorArrowRaysIcon className='w-5 h-5 stroke-white' />
          </div>
          <div className='leading-none text-white font-medium text-center text-sm lg:text-base '>
            Trouble viewing the video?
          </div>
        </div>
      )} */}

      {/* {isError && !isBackup && (
        <div className='absolute inset-0 flex items-center justify-center bg-neutral-800'>
          <div
            className='flex items-center gap-2 justify-center w-fit px-3 py-2 rounded-xl bg-base-mid cursor-pointer hover:scale-105 hover:bg-base-dark transition-all ease-in'
            onClick={() => setIsBackup(true)}
          >
            
            <div className='text-white font-bold lg:text-lg'>Video Issues?</div>
          </div>
        </div>
      )} */}
      <div className='w-full aspect-[16/9]'>
        {/* {isBackup && videoLink ? (
          <ReactPlayer
            url={videoLink}
            width={'100%'}
            height={'100%'}
            controls
            light={light}
            playing={playing}
          />
        ) : isBackup && !videoLink ? (
          <div className='w-full h-full bg-clemson-dark flex items-center justify-center'>
            <div className='flex items-center gap-2'>
              <div>
                <FaceFrownIcon className='w-9 h-9 stroke-white' />
              </div>
              <div className='font-bold text-2xl text-white'>
                Your browser has blocked this media.
              </div>
            </div>
          </div>
        ) : ( */}
        <ReactPlayer
          url={videoEmbedLink}
          width={'100%'}
          height={'100%'}
          onError={() => setIsError(true)}
          controls
          light={true}
          playing={playing}
        />
        {/* )} */}
      </div>
    </div>
  );
};

export default VideoPlayer;
