import React from 'react';
import HomeVariantB from './HomeVariantB';

const HomeVariantC = () => {
  return (
    <HomeVariantB
      columnCallouts={{
        BOOTCAMP: {
          label: 'Crash Course',
          className: 'bg-brand-indigo text-white',
        },
        CPS: {
          label: 'Self-paced Certificate',
          className: 'bg-base-brand text-white',
        },
        CMPM: {
          label: 'Premiere, all inclusive',
          className: 'bg-brand-yellow text-black',
        },
      }}
      cmpmFormatCallout='Optional professor office hours'
      cmpmDetailsCallout='Includes custom project tailored to your focus with continuous feedback.'
      secondaryCallout={{
        className: 'bg-base-brand',
        title: 'Accomplish your packaging goals in just 12 weeks',
        description:
          'Get a quick, side-by-side overview of our programs so you can compare options and choose the best fit.',
        ctaLabel: 'Download curriculum',
        href: 'https://packschool.s3.us-east-1.amazonaws.com/PS-One-Pager-61726.pdf',
        newTab: true,
        buttonClassName: 'bg-black text-white',
      }}
      lessonsSection={{
        title: 'Get Started Learning for Free',
        description:
          'Explore our expansive free library of lessons and discover practical packaging insights you can apply right away.',
      }}
    />
  );
};

export default HomeVariantC;
