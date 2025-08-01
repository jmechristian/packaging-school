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
          <div className='text-lg'>
            ICPF is awarding several FULL scholarships to the 12-week online
            Certificate of Mastery in Packaging Management program—a $7,000
            value each.
          </div>
          <div className='text-lg'>
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
        <div
          className='w-full h-full flex items-center justify-center bg-contain bg-center bg-no-repeat'
          style={{
            backgroundImage:
              "url('https://packschool.s3.us-east-1.amazonaws.com/Unbox-potential-02.png')",
          }}
        ></div>
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
      <div className='md:col-span-6 bg-icpf-light/30 p-10 rounded-lg'>
        <div className='text-center flex flex-col gap-2'>
          <div className='text-lg font-bold'>
            For more information about the CMPM program, visit:
          </div>
          <div className='text-lg font-bold'>
            <a
              href='https://packagingschool.com/certifications/get-to-know-cmpm'
              target='_blank'
              rel='noopener noreferrer'
            >
              https://packagingschool.com/certifications/get-to-know-cmpm
            </a>
          </div>
        </div>
      </div>
      <div className='md:col-span-6'>
        <div className='flex flex-col gap-4 max-w-5xl mx-auto'>
          <div className='h3-base'>Scholarship Criteria & Award Process</div>
          <div className='text-lg'>
            TPS and ICPF will collect and review applications for the CMPM FALL
            2 scholarship opportunity. It is important to note, the following
            key ethical considerations for the scholarship:
          </div>
          <div className=''>
            <ul className='list-disc list-outside text-lg flex flex-col gap-4 pl-4'>
              <li>
                Basic student information will be safeguarded, and no sensitive
                or financial based data will be sought or obtained through the
                scholarship process.
              </li>
              <li>
                The review committee will exercise fairness and objectivity in
                evaluating applications based on the transparent criteria listed
                below— removing all bias or favoritism from the process.
              </li>
              <li>
                The goal for ICPF in awarding these scholarships is to attract
                and support promising students who are interested in packaging,
                supply chain, and manufacturing, ultimately building a stronger,
                more diverse talent pipeline for the corrugated packaging
                industry.
              </li>
              <li>
                The inaugural process will be managed and evaluated for outcomes
                against the stated goal, and adjusted in the future as needed.
              </li>
              <li>
                The review committee will avoid conflicts of interest, whereas
                no individuals involved in the selection process may benefit
                financially or personally based on these awards.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className='md:col-span-6'>
        <div className='flex flex-col gap-4 max-w-5xl mx-auto'>
          <div className='h3-base'>Eligibility Requirements (Minimum)</div>
          <div className=''>
            <ul className='list-disc list-outside text-lg flex flex-col gap-4 pl-4'>
              <li>
                Must be a current undergraduate student enrolled in a U.S. or
                Canadian college, university, technical school, or community
                college or be a current intern or apprentice at a corrugated
                packaging facility.
              </li>
              <li>
                Majoring in business, supply chain management,
                industrial/graphic design, engineering, environmental science,
                or packaging.
              </li>
              <li>
                Must have completed at least one year of undergraduate
                coursework or between six months to one year of a successful
                internship with a corrugated packaging manufacturer.
              </li>
              <li>
                Demonstrated interest in the packaging, corrugated, or
                paperboard industry (via coursework, internships, projects,
                student organizations, etc. ).
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className='md:col-span-6'>
        <div className='flex flex-col gap-4 max-w-5xl mx-auto'>
          <div className='h3-base'>Scholarship Evaluation Criteria</div>
          <div className='overflow-x-auto'>
            <table className='w-full border-collapse border border-gray-300'>
              <thead>
                <tr className='bg-icpf-light'>
                  <th className='border border-gray-300 p-3 text-left font-bold'>
                    Criteria
                  </th>
                  <th className='border border-gray-300 p-3 text-left font-bold'>
                    Weight (%)
                  </th>
                  <th className='border border-gray-300 p-3 text-left font-bold'>
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className='bg-white'>
                  <td className='border border-gray-300 p-3 font-medium'>
                    Academic Performance
                  </td>
                  <td className='border border-gray-300 p-3'>15%</td>
                  <td className='border border-gray-300 p-3'>
                    GPA, rigor of coursework, relevant classes.
                  </td>
                </tr>
                <tr className='bg-gray-50'>
                  <td className='border border-gray-300 p-3 font-medium'>
                    Industry Alignment & Career Goals
                  </td>
                  <td className='border border-gray-300 p-3'>20%</td>
                  <td className='border border-gray-300 p-3'>
                    Demonstrated interest in packaging/supply chain.
                  </td>
                </tr>
                <tr className='bg-white'>
                  <td className='border border-gray-300 p-3 font-medium'>
                    Leadership & Initiative
                  </td>
                  <td className='border border-gray-300 p-3'>10%</td>
                  <td className='border border-gray-300 p-3'>
                    Extracurriculars, campus involvement, student orgs,
                    competitions.
                  </td>
                </tr>
                <tr className='bg-gray-50'>
                  <td className='border border-gray-300 p-3 font-medium'>
                    Work Experience
                  </td>
                  <td className='border border-gray-300 p-3'>15%</td>
                  <td className='border border-gray-300 p-3'>
                    Internships, co-ops, or part-time roles
                  </td>
                </tr>
                <tr className='bg-white'>
                  <td className='border border-gray-300 p-3 font-medium'>
                    Personal Statement / Essay
                  </td>
                  <td className='border border-gray-300 p-3'>40%</td>
                  <td className='border border-gray-300 p-3'>
                    Motivation for pursuing CMPM, industry impact, and career
                    goals.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ICPF;
