import React from 'react';
import PatternBackground from './PatternBackground';
import Image from "next/legacy/image";

const CenteredTextHeader = ({
  subhead,
  heading,
  headline,
  buttonText,
  buttonLink,
  secondaryText,
  secondaryLink,
  logo,
}) => {
  return (
    <div className='bg-white relative isolate'>
      <div className='px-6 lg:px-8'>
        <PatternBackground />
        <div className='mx-auto max-w-4xl pt-20 sm:pt-24 sm:pb-6'>
          {logo && (
            <div
              className='relative w-60 h-40 mx-auto bg-contain bg-no-repeat'
              style={{ backgroundImage: `url(${logo})` }}
            ></div>
          )}
          <div className='mb-8 flex justify-center'>
            {heading && (
              <div className='relative rounded-full py-1 px-6 leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20'>
                {heading}
              </div>
            )}
          </div>
          <div className='text-center'>
            <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl font-greycliff'>
              {headline}
            </h1>
            <p className='mt-6 text-sm md:text-lg leading-6 md:leading-8 text-gray-600'>
              {subhead}
            </p>
            {buttonText && (
              <div className='mt-10 flex items-center justify-center gap-x-6'>
                <a
                  href={buttonLink}
                  className='rounded-md bg-clemson px-4 py-3 text-lg  text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 font-greycliff font-bold'
                >
                  {buttonText}
                </a>
                <a
                  href={secondaryLink}
                  className='text-lg font-semibold leading-6 text-gray-900'
                >
                  {secondaryText} <span aria-hidden='true'>→</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CenteredTextHeader;
