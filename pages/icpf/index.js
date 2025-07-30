import React from 'react';
import { MdCalendarMonth } from 'react-icons/md';
import {
  AcademicCapIcon,
  BriefcaseIcon,
  UserGroupIcon,
  RocketLaunchIcon,
  SparklesIcon,
  UserIcon,
  BuildingOfficeIcon,
} from '@heroicons/react/24/outline';

const ICPF = () => {
  const benefits = [
    {
      description:
        'Enrollment in the Certificate of Mastery in Packaging Management — a $7,000 Clemson University Center for Corporate Learning program - sponsored by ICPF',
      icon: AcademicCapIcon,
    },
    {
      description:
        'In-depth exposure to the corrugated sector and the broader packaging industry',
      icon: BuildingOfficeIcon,
    },
    {
      description:
        'Access to professional webinars featuring leaders in the corrugated industry',
      icon: UserGroupIcon,
    },
    {
      description: 'Real-world skills you can apply immediately',
      icon: RocketLaunchIcon,
    },
    {
      description: 'Personalized coaching and one-on-one mentorship',
      icon: UserIcon,
    },
    {
      description: 'Stronger network of peers and professionals in packaging',
      icon: BriefcaseIcon,
    },
    {
      description:
        'Resume-boosting credential that helps you stand out to employers',
      icon: SparklesIcon,
    },
  ];

  return (
    <div className='w-full grid grid-cols-1 md:grid-cols-6 gap-10 md:gap-24 py-10 lg:py-20 px-4 xl:px-0 max-w-7xl mx-auto'>
      <div className='md:col-span-4 flex flex-col gap-10 w-full'>
        <div className='flex flex-col gap-1.5'>
          <div className='flex items-center gap-3'>
            <div className='text-icpf-dark font-oswald uppercase text-lg'>
              Oct 27, 2025 - Jan 19, 2026
            </div>
          </div>
          <div className='h1-base'>
            Earn Your Certificate in Packaging Management
          </div>
        </div>

        <div className='flex flex-col gap-5 md:col-span-4'>
          <div className='text-lg lg:text-xl'>
            ICPF is awarding several FULL scholarships to the 12-week online
            Certificate of Mastery in Packaging Management program—a $7,000
            value each.
          </div>
          <div className='text-lg lg:text-xl'>
            Open to current students (age 18–25) who are studying business,
            supply chain, design, engineering, environmental science, or
            packaging at a college, university, trade/technical school, or
            community college. Interns at corrugated and other packaging
            companies are also eligible—email ICPF for details
            (csalaverria@icpfbox.org).
          </div>
        </div>
      </div>
      <div className='md:col-span-2'>
        <div>
          <div className='bg-icpf-light p-5 rounded-lg flex flex-col gap-4 md:col-span-2'>
            <div className='text-sm font-bold uppercase pb-2 border-b border-b-icpf-dark'>
              Details
            </div>
            <div className='flex flex-col gap-5'>
              <div className='flex flex-col gap-0.5'>
                <div className='text-lg font-bold'>CMPM Fall 2</div>
                <div>ICPF Sponsored Cohort</div>
              </div>
              <div className='flex items-center gap-1 py-3 border-y border-y-icpf-dark'>
                <div className='text-xl'>
                  <MdCalendarMonth />
                </div>
                <div className='font-bold'>Oct 27, 2025 - Jan 19, 2026</div>
              </div>
              <div className='flex flex-col gap-0.5'>
                <div className='text-lg font-bold'>Deadline</div>
                <div>Oct 25, 2025</div>
              </div>
            </div>
            <div>
              <div className='w-full rounded-lg bg-black hover:bg-black/80 transition-all duration-300 cursor-pointer text-white p-4 mt-2'>
                <div className='text-center font-bold text-lg'>Apply Now</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='md:col-span-2'>
        <div className='w-full h-full bg-yellow-400 flex items-center justify-center'>
          GRAPHIC?
        </div>
      </div>
      <div className='md:col-span-4'>
        <div className='flex flex-col gap-6'>
          <div className='h3-base'>What You&apos;ll Gain</div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div
                  key={index}
                  className='flex gap-4 p-5 bg-white rounded-lg shadow-sm border border-gray-100'
                >
                  <div className='flex-shrink-0'>
                    <IconComponent className='w-8 h-8 ' />
                  </div>
                  <div className='text-base '>{benefit.description}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className='md:col-span-6 text-center'>
        <div className='h3-base'>
          What’s Included in the 12-Week CMPM Program
        </div>
      </div>
      <div className='md:col-span-4 flex flex-col gap-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='bg-slate-100 p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-center text-center text-sm font-medium'>
            Global Competitive Landscape
          </div>
          <div className='bg-slate-100 p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-center text-center text-sm font-medium'>
            Project Management Essentials
          </div>
          <div className='bg-slate-100 p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-center text-center text-sm font-medium'>
            Regulations and Corporate Sustainability
          </div>
          <div className='bg-slate-100 p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-center text-center text-sm font-medium'>
            Materials Management I
          </div>
          <div className='bg-slate-100 p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-center text-center text-sm font-medium'>
            Materials Management II
          </div>
          <div className='bg-slate-100 p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-center text-center text-sm font-medium'>
            Package Labeling and Finishing
          </div>
          <div className='bg-slate-100 p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-center text-center text-sm font-medium'>
            Packaging Development Workflow
          </div>
          <div className='bg-slate-100 p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-center text-center text-sm font-medium'>
            Capital Equipment and Manufacturing
          </div>
          <div className='bg-slate-100 p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-center text-center text-sm font-medium'>
            Logistics and Supply Chain Management
          </div>
          <div className='bg-slate-100 p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-center text-center text-sm font-medium'>
            Leveraging Human Factors in Packaging Design
          </div>
        </div>
      </div>
      <div className='md:col-span-2 flex flex-col gap-4'>
        <div className='w-full h-full bg-yellow-400 flex items-center justify-center'>
          Packaging Development Plan (PDP)
        </div>
        <div className='w-full h-full bg-yellow-400 flex items-center justify-center'>
          Weekly Office Hours with a PhD
        </div>
      </div>
    </div>
  );
};

export default ICPF;
