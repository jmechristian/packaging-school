import React from 'react';
import { DarkGridHero } from '../components/cybermonday/DarkGridHero';
import LogoGrid from '../components/cybermonday/LogoGrid';
import Features from '../components/cybermonday/Features';
import CyberTestimonials from '../components/cybermonday/CyberTestimonials';
import CyberCta from '../components/cybermonday/CyberCta';
import Meta from '../components/shared/Meta';

const Page = () => {
  return (
    <>
      <Meta
        title='Cyber Monday Exclusive! The Certificate of Packaging Science'
        description='Unmatched savings on the Certificate of Packaging Science – Enroll Instantly, No Application Required!'
        image='https://packmedia54032-staging.s3.amazonaws.com/public/all-courses-seoimagewebp'
      />
      <DarkGridHero />
      <LogoGrid />
      <Features />
      <div className='w-full h-full overflow-hidden'>
        <CyberTestimonials />
      </div>
      <CyberCta />
    </>
  );
};

export default Page;
