import React from 'react';
import VideoPlayer from '../../components/VideoPlayer';
import CSPHero from '../../components/certifications/csp/CSPHero';
import CSPMissionStatement from '../../components/certifications/csp/CSPMissionStatement';
import CSPNav from '../../components/certifications/csp/CSPNav';
import CSPWhat from '../../components/certifications/csp/CSPWhat';
import CSPHow from '../../components/certifications/csp/CSPHow';
import CSPWhere from '../../components/certifications/csp/CSPWhere';
import CSPBio from '../../components/certifications/csp/CSPBio';
import Meta from '../../components/shared/Meta';

const Page = () => {
  return (
    <>
      <Meta
        title={'Certificate of Sustainable Packaging (CSP)'}
        description={
          'Master sustainable packaging with our certificate program: learn sustainability terms, UN goals, system creation, carbon footprint, neutrality via offsets, and LCA software usage for design.'
        }
        keywords={
          'sustainability terms, UN goals, system creation, carbon footprint, neutrality via offsets, LCA software'
        }
        image={'https://packschool.s3.amazonaws.com/csp-seoImage-1-sm.png'}
      />
      <div className='w-full h-full flex flex-col gap-12 lg:!gap-36 pt-6 md:!pt-20 pb-20 dark:bg-dark-dark'>
        <CSPHero />
        <CSPNav />
        <div className='flex flex-col gap-12 md:!gap-48'>
          <CSPWhat />
          {/* <CSPMissionStatement /> */}
          <CSPHow />
          <CSPWhere />
          <CSPBio />
        </div>
      </div>
    </>
  );
};

export default Page;
