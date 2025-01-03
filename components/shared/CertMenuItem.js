import React from 'react';
import Link from 'next/link';
import {
  AcademicCapIcon,
  BeakerIcon,
  CakeIcon,
  CogIcon,
} from '@heroicons/react/24/solid';
import CertIcon from '../icons/CertIcon';
import { Popover } from '@headlessui/react';

const CertMenuItem = ({
  enroll,
  title,
  content,
  bgColor,
  icon,
  learnMore,
  apply,
  onClose,
  callout,
}) => {
  const setIcon = () => {
    switch (icon) {
      case 'academicCap':
        return <AcademicCapIcon className='w-6 h-6' />;
      case 'beaker':
        return <BeakerIcon className='w-6 h-6' />;
      case 'cog':
        return <CogIcon className='w-6 h-6' />;
      case 'food':
        return <CakeIcon className='w-6 h-6' />;
      default:
        return (
          <CertIcon className='w-6 h-6 stroke-2 stroke-white fill-transparent' />
        );
    }
  };

  return (
    (<div className='flex flex-col bg-white/70 dark:bg-dark-mid rounded-xl p-5 gap-4 h-full justify-between'>
      <div className='flex items-center justify-center h-full'>
        <div className='flex flex-col gap-3 h-full overflow-hidden'>
          <div className='flex gap-3 items-center w-full overflow-hidden'>
            <div>
              <div
                className={`w-12 h-12 ${bgColor} text-white rounded-full flex justify-center items-center`}
              >
                {setIcon()}
              </div>
            </div>
            <div className='font-semibold font-greycliff text-neutral-900 dark:text-white text-lg leading-tight'>
              {title}
            </div>
          </div>

          <div className='text-sm line-clamp-3 text-neutral-600 dark:text-neutral-400'>
            {content}
          </div>
        </div>
      </div>
      <div className='flex justify-between items-center flex-wrap gap-3 md:gap-1'>
        <div className='flex items-center gap-1 h-full'>
          {apply && (
            <div
              className='rounded-lg px-3 py-1.5 font-greycliff text-sm w-fit  text-clemson font-bold'
              onClick={() => onClose()}
            >
              <Link href={apply} legacyBehavior>{enroll ? 'Enroll Now' : 'Apply Now'}</Link>
            </div>
          )}
          {learnMore && (
            <div
              className='rounded-lg px-3 py-1.5 font-greycliff text-sm  text-neutral-500 font-semibold'
              onClick={() => onClose()}
            >
              <Link href={learnMore}>Learn More</Link>
            </div>
          )}
        </div>
        {callout && (
          <div className='bg-brand-red text-white font-semibold text-xs w-full md:w-fit   px-2 py-1 rounded'>
            {callout}
          </div>
        )}
      </div>
    </div>)
  );
};

export default CertMenuItem;
