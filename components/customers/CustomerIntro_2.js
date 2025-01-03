import React, { useState } from 'react';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';
import {
  ChevronRightIcon,
  FilmIcon,
  PlayCircleIcon,
  Square3Stack3DIcon,
  DocumentArrowDownIcon,
} from '@heroicons/react/24/solid';
import dynamic from 'next/dynamic';

import VideoPlayer from '../VideoPlayer';

const CustomerIntro_2 = () => {
  const [isMediaType, setIsMediaType] = useState('SLIDES');
  return (
    <div className='w-full h-full flex flex-col lg:flex-row lg:justify-between gap-12 pt-12 pb-20 lg:px-12 xl:px-0 lg:gap-16'>
      <div className='flex items-center'>
        <div className='w-full flex flex-col justify-center gap-6 lg:gap-5 lg:max-w-2xl'>
          <div className='w-full h-full flex lg:-mt-4'>
            <img
              src='https://packschool.s3.amazonaws.com/spc-project.png'
              alt='greenBlue logo'
              className='w-full h-auto'
            />
          </div>
          <div className='font-bold text-5xl xl:text-6xl'>
            <h1>Welcome, SPC Members</h1>
          </div>
          <div className='text-lg leading-snug'>
            Explore the SPC&apos;s Knowledge Library below. To learn how to make
            the most of your library, select your preferred instructional method
            to the right (advance through the slides or download them as a PDF).
            For additional assistance, feel free to contact us at{' '}
            <a
              href='mailto:education@greenblue.org'
              rel='noreferrer'
              target='_blank'
            >
              education@greenblue.org
            </a>
            .
          </div>
        </div>
      </div>
      <div className='flex flex-col justify-center items-center border rounded-xl h-full w-full max-w-[500px] lg:mt-9'>
        <div className='w-full aspect-[16/9] bg-neutral-700'>
          <iframe
            src='https://docs.google.com/presentation/d/15DjazbEB9njTkkU6z2EdTKCKsN5FtvWW4s10urJhT_M/embed?start=false&loop=false&delayms=3000'
            frameBorder='0'
            width='100%'
            height='100%'
            allowFullScreen
          ></iframe>
        </div>
        <div
          className='w-full flex items-center justify-center py-4 gap-1 cursor-pointer'
          onClick={() =>
            window.open(
              'https://packschool.s3.amazonaws.com/greenblue-instructions-v2.pdf',
              '_blank'
            )
          }
        >
          <div>
            <DocumentArrowDownIcon className='w-5 h-5' />
          </div>
          <div className='text-sm font-medium'>Download as PDF</div>
          {/* <div
            className='w-[56px] h-[56px] rounded-full bg-gb-green hover:bg-gb-gray shadow-md flex items-center justify-center'
            onClick={() => setIsMediaType('VIDEO')}
          >
            <div className='flex flex-col items-center justify-center'>
              <div>
                <FilmIcon className='w-5 h-5 fill-white' />
              </div>
              <div className='text-xs font-medium text-white'>Video</div>
            </div>
          </div> */}
          {/* <div
            className='w-[56px] h-[56px] rounded-full bg-gb-green hover:bg-gb-gray cursor-pointer shadow-md flex items-center justify-center'
            onClick={() => setIsMediaType('SLIDES')}
          >
            <div className='flex flex-col items-center justify-center'>
              <div>
                <Square3Stack3DIcon className='w-5 h-5 fill-white' />
              </div>
              <div className='text-xs font-medium text-white'>Slides</div>
            </div>
          </div>
          <div
            className='w-[56px] h-[56px] rounded-full bg-gb-green hover:bg-gb-gray cursor-pointer shadow-md flex items-center justify-center'
            onClick={() => setIsMediaType('PDF')}
          >
            <div className='flex flex-col items-center justify-center'>
              <div>
                <DocumentArrowDownIcon className='w-5 h-5 fill-white' />
              </div>
              <div className='text-xs font-medium text-white'>PDF</div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default CustomerIntro_2;
