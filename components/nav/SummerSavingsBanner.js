import React from 'react';
import Link from 'next/link';
import { trackAbPromoClick } from '../../libs/analytics';

const BANNER_SRC =
  'https://packschool.s3.us-east-1.amazonaws.com/Summer-School-Savings-V2-banner5.png';

const SummerSavingsBanner = ({ embedded = false }) => {
  const handleClick = () => {
    trackAbPromoClick({
      pagePath: typeof window !== 'undefined' ? window.location.pathname : null,
      nextPath: '/summer-savings',
      source: 'summer_savings_banner',
      metadata: { promo: 'summer_school_savings' },
    });
  };

  const wrapperClass = embedded
    ? 'w-full'
    : 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-0 pt-3';

  return (
    <div className='w-full'>
      <div className={wrapperClass}>
        <Link href='/summer-savings' className='block' onClick={handleClick}>
          <img
            src={BANNER_SRC}
            alt='Summer School Savings - now through July 2, 2026'
            className='w-full h-auto rounded-lg'
          />
        </Link>
      </div>
    </div>
  );
};

export default SummerSavingsBanner;
