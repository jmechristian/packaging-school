import React from 'react';
import WeekItem from './WeekItem';
import FadeIn from '../../../helpers/FadeIn';

const CertificateCirriculum = () => {
  return (
    <div className='container-7xl'>
      <FadeIn>
        <div className='flex flex-col gap-16'>
          <div className='lg:text-center text-4xl xl:text-5xl dark:text-white'>
            <h2 className='leading-tight font-bold'>
              Comprehensive Curriculum
            </h2>
          </div>
          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-9 overflow-hidden'>
            <div className='flex flex-col gap-9 w-full'>
              <WeekItem
                week={'1'}
                title='Global Competitive Landscape'
                content='Major companies, products and markets, including market share concentration, key success factors, current volumes and forecasts.'
              />
              <WeekItem
                week={'5'}
                title='Material Management II'
                content='Fundamental material properties of Glass, Metal, and Polymers converted to packaging solutions.'
              />
              <WeekItem
                week={'9'}
                title='Capital Equipment & Manufacturing'
                content='Packaging line optimization and basic production equipment types. Strategies to increase production efficiency.'
              />
            </div>
            <div className='flex flex-col gap-9 w-full'>
              <WeekItem
                week={'2'}
                title='Project Management Essentials'
                content='Core management skills such as project management, problem-solving, administrative and being financially savvy.'
              />
              <WeekItem
                week={'6'}
                title='Break'
                content="Catch your breath! You've been working hard."
              />
              <WeekItem
                week={'10'}
                title='Logistics & Supply Chain Management'
                content='Setting up a logistics plan, defining your distribution system, and developing test protocols to ensure successful and on-time delivery of your products.'
              />
            </div>
            <div className='flex flex-col gap-9 w-full'>
              <WeekItem
                week={'3'}
                title='Regulations & Corporate Sustainability'
                content='Introductions to the major regulatory agencies and applicable laws for packaging compliance in key industries.'
              />
              <WeekItem
                week={'7'}
                title='Package Labeling & Finishing'
                content='Core printing processes and finishing techniques employed to apply brand assets and required labeling to packaging.'
              />
              <WeekItem
                week={'11'}
                title='Leveraging Human Factors In Packaging'
                content='Triggers to influence perception, cognition, appeal and decision-making in your customers.'
              />
            </div>
            <div className='flex flex-col gap-9 w-full'>
              <WeekItem
                week={'4'}
                title='Material Management I'
                content='Fundamental material properties of Glass, Metal, and Polymers converted to packaging solutions.'
              />
              <WeekItem
                week={'8'}
                title='Packaging Development Workflow'
                content='Stakeholders and best practices of packaging development across functions: R&D, marketing, sales, procurement, legal, distribution, quality control, manufacturing, warehousing, point-of-sale, and end-user.'
              />
              <WeekItem
                week={'12'}
                title='Review & Final Exam'
                content='Review and test your knowledge on all that you have gleaned from the courses.'
              />
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};

export default CertificateCirriculum;
