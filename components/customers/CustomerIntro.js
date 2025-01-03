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

const CustomerIntro = ({ logo, name, link }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMediaType, setIsMediaType] = useState('VIDEO');
  return (
    <div className='w-full h-full grid md:grid-cols-2 gap-x-36 max-w-7xl mx-auto px-3 md:px-6 xl:px-0 py-12 md:py-16 '>
      <div className='flex flex-col gap-9 '>
        <div className='w-full h-full flex items-center justify-center'>
          <img src={logo} alt='isbt logo' className='w-full h-auto' />
        </div>
      </div>
      <div className='flex w-full flex-col gap-4 p-3 md:p-6 lg:p-0 lg:gap-x-16 rounded-xl border border-neutral-300 shadow-xl bg-neutral-100'>
        <div className='md:w-full aspect-[16/9] md:max-w-none max-w-xs mx-auto h-full flex items-center justify-center text-2xl'>
          <div className='w-full h-full '>
            <iframe
              src='https://docs.google.com/presentation/d/1frh5qJEeQQ-kMIKpSi3MHaamjPUlSHKCudoPHX8vDXs/embed?start=false&loop=false&delayms=3000'
              frameBorder='0'
              width='100%'
              height='100%'
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className='w-full flex max-w-xs md:max-w-none mx-auto flex-col items-center gap-3 cursor-pointer py-2 '>
          {/* <div className='justify-center items-center flex gap-1.5'>
                <div>
                  <InformationCircleIcon className='w-6 h-6 stroke-white' />
                </div>
                <div className='text-xl font-bold'>How to Use This Library</div>
              </div> */}
          <div className='text-sm mb-1 text-center max-w-sm'>
            Please choose your instruction method below. If you have any
            questions, please reach out to email@email.com
          </div>
          <div className='w-fit grid grid-cols-3 gap-x-7 overflow-hidden pb-3'>
            <div
              className='w-16 h-16 rounded-full bg-gb-green hover:bg-gb-gray shadow-md flex items-center justify-center'
              onClick={() => setIsMediaType('VIDEO')}
            >
              <div className='flex flex-col items-center justify-center'>
                <div>
                  <FilmIcon className='w-6 h-6 fill-white' />
                </div>
                <div className='text-xs font-bold text-white'>Video</div>
              </div>
            </div>
            <div
              className='w-16 h-16 rounded-full bg-gb-green hover:bg-gb-gray cursor-pointer shadow-md flex items-center justify-center'
              onClick={() => setIsMediaType('SLIDES')}
            >
              <div className='flex flex-col items-center justify-center'>
                <div>
                  <Square3Stack3DIcon className='w-6 h-6 fill-white' />
                </div>
                <div className='text-xs font-bold text-white'>Slides</div>
              </div>
            </div>
            <div
              className='w-16 h-16 rounded-full bg-gb-green hover:bg-gb-gray cursor-pointer shadow-md flex items-center justify-center'
              onClick={() => setIsMediaType('PDF')}
            >
              <div className='flex flex-col items-center justify-center'>
                <div>
                  <DocumentArrowDownIcon className='w-6 h-6 fill-white' />
                </div>
                <div className='text-xs font-bold text-white'>PDF</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerIntro;
