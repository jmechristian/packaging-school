import React from 'react';

import FadeIn from '../../../helpers/FadeIn';
import { SectionHeading } from '../../shared/SectionHeading';
import CSPCard from './CSPCard';

const CSPHow = () => {
  return (
    <section
      id='how'
      className='max-w-7xl mx-auto w-full flex flex-col gap-16 scroll-mt-36'
    >
      <div className='flex flex-col gap-9 col-span-3 max-w-4xl mx-auto  p-6 lg:!px-0'>
        <FadeIn>
          <SectionHeading number='2'>How Does it Work?</SectionHeading>
        </FadeIn>
        <h2 className='text-3xl lg:!text-4xl  dark:text-white'>
          <FadeIn>A Dynamic Online Learning Experience</FadeIn>
        </h2>
        <div className='flex flex-col gap-9'>
          <p className='dark:text-gray-500 text-slate-700 text-lg leading-normal font-greycliff tracking-wide'>
            Instruction will consist of online pre-recorded lectures,
            presentations, downloadable PDFs, practical exercises/assignments,
            knowledge checks, discussion, and surveys. While everything is
            online, housed within a learning management system, online office
            hours will be provided upon request.
          </p>
        </div>
      </div>
      <CSPCard />
    </section>
  );
};

export default CSPHow;
