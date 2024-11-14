import React from 'react';
import { DarkGridHero } from '../components/cybermonday/DarkGridHero';
import LogoGrid from '../components/cybermonday/LogoGrid';
import Features from '../components/cybermonday/Features';
import CyberTestimonials from '../components/cybermonday/CyberTestimonials';
import CyberCta from '../components/cybermonday/CyberCta';

const Page = () => {
  return (
    <>
      <DarkGridHero />
      <LogoGrid />
      <Features />
      <CyberTestimonials />
      <CyberCta />
    </>
  );
};

export default Page;
