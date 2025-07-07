import Link from 'next/link';
import React from 'react';

const GradientCTA = ({
  headline,
  subheadline,
  buttonText,
  secondaryButtonText,
  buttonLink,
  secondaryButtonLink,
  awsUser,
  navigateToThinkific,
}) => {
  return (
    <div className='bg-gradient-to-tr from-clemson via-base-dark to-base-brand'>
      <div className='mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8'>
        <div className='flex flex-col gap-5'>
          <h2 className='text-3xl font-bold font-greycliff tracking-tight text-white lg:text-4xl xl:text-5xl'>
            {headline}
          </h2>
          <div className='font-medium text-xl lg:text-2xl xl:text-3xl leading-tight max-w-3xl text-white'>
            {subheadline}
          </div>
        </div>
        <div className='mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0'>
          {buttonLink &&
            (awsUser && awsUser.name.includes(' ') ? (
              <button
                onClick={() => navigateToThinkific(buttonLink, buttonLink)}
                className='rounded-md bg-clemson font-greycliff px-5 py-4 cursor-pointer text-base md:text-xl font-bold text-white shadow-sm hover:bg-clemson-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                {buttonText}
              </button>
            ) : (
              <Link
                href={buttonLink}
                className='rounded-md bg-clemson font-greycliff px-5 py-4 cursor-pointer text-base md:text-xl font-bold text-white shadow-sm hover:bg-clemson-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                {buttonText}
              </Link>
            ))}
          {secondaryButtonLink && (
            <Link
              href={secondaryButtonLink}
              className='text-base md:text-lg font-greycliff font-semibold cursor-pointer leading-6 text-white'
            >
              {secondaryButtonText} <span aria-hidden='true'>→</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default GradientCTA;
