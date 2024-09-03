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
import { MdArrowCircleDown } from 'react-icons/md';

const ReactGoogleSlides = dynamic(() => import('react-google-slides'), {
  ssr: false,
});

const LibraryHeader = ({
  displayName,
  email,
  logo,
  slides,
  video,
  pdf,
  subhead,
}) => {
  const [isMediaType, setIsMediaType] = useState('SLIDES');
  return (
    <div className='w-full h-full flex flex-col md:items-center xl:flex-row lg:justify-between lg:items-center gap-12 lg:px-12 xl:px-0 xl:gap-16'>
      <div className='flex items-center w-full'>
        <div className='w-full flex flex-col md:items-center lg:items-start justify-center gap-5 xl:max-w-xl'>
          <div className='w-full h-full flex max-w-[200px] md:max-w-[220px]'>
            <img
              src={logo}
              alt={`${displayName} Logo`}
              className='w-full h-auto'
            />
          </div>
          <div>
            <h1 className='h2-base max-w-xl lg:max-w-full'>
              Welcome, {displayName} Members
            </h1>
          </div>
          {subhead ? (
            <div className='leading-snug w-full max-w-xl lg:max-w-full flex flex-col gap-3'>
              <div className='text-lg xl:text-xl leading-snug'>{subhead}</div>
            </div>
          ) : (
            <div className='leading-snug max-w-xl w-full'>
              Explore the {displayName} Knowledge Library below. To learn how to
              make the most of your library, select your preferred instructional
              method to the right (advance through the slides or download them
              as a PDF). For additional assistance, feel free to contact us at{' '}
              <a href={`mailto:${email}`} rel='noreferrer' target='_blank'>
                {email}
              </a>
              .
            </div>
          )}
        </div>
      </div>
      {/* HIDDEN COMPONENT */}
      <div className='hidden lg:flex gap-5 xl:hidden w-full h-full'>
        <div className='flex flex-col justify-center items-center border-2 border-black bg-white shadow-[6px_6px_0px_rgba(0,0,0,0.20)] h-full  w-[580px]'>
          <div className='w-[580px] aspect-[16/9]'>
            <ReactGoogleSlides
              width={'100%'}
              height={'100%'}
              slidesLink={
                slides
                  ? slides
                  : 'https://docs.google.com/presentation/d/1njv_Q25JTyNzsDVjP7GqIq_U3Udfg7DSpgoBP-gqLWg/edit?usp=sharing'
              }
              position={1}
              showControls
              loop
            />
          </div>
          {pdf ? (
            <div
              className='w-full flex items-center justify-center py-4 gap-1 cursor-pointer'
              onClick={() => {
                window.open(pdf, '_blank');
              }}
            >
              <div>
                <DocumentArrowDownIcon className='w-5 h-5' />
              </div>
              <div className='text-sm font-medium'>Download as PDF</div>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div>
          <div className='font-semibold px-5 py-5 bg-brand-yellow-light relative w-fit h-full'>
            <div className='relative z-10 pr-10 text-lg leading-snug'>
              Discover your library courses BELOW at the special discounted{' '}
              {displayName} rate of $75. If you have any questions, please reach
              out to <a href={`mailto:${email}`}>{email}</a>
            </div>
            <div className='absolute bottom-0 -right-10 opacity-30 z-0'>
              <MdArrowCircleDown className='w-40 h-40' color='white' />
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col justify-center items-center border-2 border-black bg-white shadow-[6px_6px_0px_rgba(0,0,0,0.20)] h-full w-full max-w-[580px] lg:hidden xl:flex'>
        <div className='w-full aspect-[16/9]'>
          <ReactGoogleSlides
            width={'100%'}
            height={'100%'}
            slidesLink={
              slides
                ? slides
                : 'https://docs.google.com/presentation/d/1njv_Q25JTyNzsDVjP7GqIq_U3Udfg7DSpgoBP-gqLWg/edit?usp=sharing'
            }
            position={1}
            showControls
            loop
          />
        </div>
        {pdf ? (
          <div
            className='w-full flex items-center justify-center py-4 gap-1 cursor-pointer'
            onClick={() => {
              window.open(pdf, '_blank');
            }}
          >
            <div>
              <DocumentArrowDownIcon className='w-5 h-5' />
            </div>
            <div className='text-sm font-medium'>Download as PDF</div>
          </div>
        ) : (
          <></>
        )}
        <div className='font-semibold px-5 py-5 bg-brand-yellow-light relative lg:hidden xl:block'>
          <div className='relative z-10 pr-10 leading-snug'>
            Discover your library courses BELOW at the special discounted{' '}
            {displayName} rate of $75. If you have any questions, please reach
            out to <a href={`mailto:${email}`}>{email}</a>
          </div>
          <div className='absolute inset-y-0 right-0 opacity-30 z-0'>
            <MdArrowCircleDown className='w-full h-full' color='white' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryHeader;
