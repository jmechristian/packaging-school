import React, { useState } from 'react';
import { MdCalendarMonth, MdChatBubble, MdSchool } from 'react-icons/md';
import {
  AcademicCapIcon,
  BriefcaseIcon,
  UserGroupIcon,
  RocketLaunchIcon,
  SparklesIcon,
  UserIcon,
  BuildingOfficeIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import { createCMPMFormICPF } from '../../helpers/api';
import { useRouter } from 'next/router';
import Meta from '../../components/shared/Meta';

const ICPF = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const benefits = [
    {
      description:
        'Enrollment in the Certificate of Mastery in Packaging Management––a $7,000 Clemson University Center for Corporate Learning program––sponsored by ICPF',
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
    <>
      <Meta
        title='CMPM ICPF Scholarship'
        description='ICPF is awarding several FULL scholarships to the 12-week online Certificate of Mastery in Packaging Management program––a $7,000 value each.'
      />
      <div className='w-full grid grid-cols-1 md:grid-cols-6 gap-10 md:gap-24 py-10 lg:py-20 px-4 xl:px-0 max-w-7xl mx-auto'>
        <div className='md:col-span-4 flex flex-col gap-12 w-full'>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-3'>
              <div className='text-icpf-dark font-oswald uppercase text-lg'>
                Sept. 21, 2026 - Dec. 14, 2026
              </div>
            </div>
            <div className='h1-base'>
              Earn Your Certificate in Packaging Management
            </div>
          </div>

          <div className='flex flex-col gap-5 md:col-span-4'>
            <div className='text-xl leading-relaxed'>
              ICPF is awarding several FULL scholarships to the 12-week online
              Certificate of Mastery in Packaging Management program—a $7,000
              value each.
            </div>
            <div className='text-xl leading-relaxed'>
              Open to current students (age 18-25) who are studying business,
              supply chain, graphic communications, design, engineering,
              environmental science, chemistry, or a STEAM-related field at a
              college, university, trade/technical school, or community college.
              Interns at corrugated and other packaging companies are also
              eligible—email ICPF for details (csalaverria@icpfbox.org).
            </div>
          </div>
        </div>
        <div className='md:col-span-2'>
          <div className='flex flex-col gap-7'>
            <div className='w-full h-full max-w-[60%] mx-auto'>
              <Image
                src='https://packschool.s3.us-east-1.amazonaws.com/ICPF-Logo.png'
                alt='ICPF Logo'
                width={939}
                height={523}
              />
            </div>
            <div className='bg-icpf-light p-5 rounded-lg flex flex-col gap-4 md:col-span-2'>
              <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-0.5'>
                  <div className='text-lg font-bold'>CMPM Fall II</div>
                  <div>ICPF Sponsored Cohort</div>
                </div>
                <div className='flex items-center gap-1 py-3 border-y border-y-icpf-dark'>
                  <div className='text-xl'>
                    <MdCalendarMonth />
                  </div>
                  <div className='font-bold'>
                    Sept. 21, 2026 - Dec. 14, 2026
                  </div>
                </div>
                <div className='flex flex-col gap-0'>
                  <div className='text-lg font-bold'>Deadline</div>
                  <div>Sept. 9th, 2026</div>
                </div>
              </div>
              <div>
                <div
                  className='w-full rounded-lg bg-black hover:bg-black/80 transition-all duration-300 cursor-pointer text-white p-4'
                  onClick={async () => {
                    setIsLoading(true);
                    const form = await createCMPMFormICPF({
                      age: '',
                      addressExtra: '',
                      areaOfInterest: '',
                      background: '',
                      birthYear: '',
                      city: '',
                      cmpmGoals: '',
                      companyTitle: '',
                      companyName: '',
                      corrugatedImpact: '',
                      country: '',
                      credential: '',
                      credentialProgress: '',
                      credentialYear: '',
                      email: '',
                      firstName: '',
                      fullTime: false,
                      lastName: '',
                      linkedin: '',
                      moreAboutYou: '',
                      opportunities: false,
                      optOut: false,
                      organizations: '',
                      payment: '',
                      paymentConfirmation: 'WAIVED',
                      phone: '',
                      referral: '',
                      resume: '',
                      school: '',
                      schoolType: '',
                      sessionApplying: '',
                      state: '',
                      status: 'DRAFT',
                      streetAddress: '',
                      studying: '',
                      transcript: '',
                      whyPackaging: '',
                      yearGoals: '',
                      contactConsent: false,
                      videoLink: '',
                    });

                    router.push(`/forms/cmpm/icpf/${form.id}`);
                  }}
                >
                  <div className='text-center font-bold text-lg'>
                    {isLoading ? 'Preparing Application...' : 'Apply Now'}
                  </div>
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
        <div className='md:col-span-6 text-center border-b border-b-icpf-base pb-7'>
          <div className='h3-base'>
            What’s Included in the 12-Week CMPM Program
          </div>
        </div>
        <div className='md:col-span-4 flex flex-col gap-6'>
          <div className='h4-base flex items-center gap-2'>
            <div>
              <MdSchool />
            </div>
            <div>10 Online, Self-Paced Courses </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='bg-icpf-base/10 p-4 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center text-sm font-medium'>
              <div className='font-[500] text-slate-700 text-lg'>
                Global Competitive Landscape
              </div>
            </div>
            <div className='bg-icpf-base/10 p-4 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center text-sm font-medium'>
              <div className='font-[500] text-slate-700 text-lg'>
                Project Management Essentials
              </div>
            </div>
            <div className='bg-icpf-base/10 p-4 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center text-sm font-medium'>
              <div className='font-[500] text-slate-700 text-lg'>
                Regulations and Corporate Sustainability
              </div>
            </div>
            <div className='bg-icpf-base/10 p-4 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center text-sm font-medium'>
              <div className='font-[500] text-slate-700 text-lg'>
                Materials Management I
              </div>
            </div>
            <div className='bg-icpf-base/10 p-4 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center text-sm font-medium'>
              <div className='font-[500] text-slate-700 text-lg'>
                Materials Management II
              </div>
            </div>
            <div className='bg-icpf-base/10 p-4 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center text-sm font-medium'>
              <div className='font-[500] text-slate-700 text-lg'>
                Package Labeling and Finishing
              </div>
            </div>
            <div className='bg-icpf-base/10 p-4 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center text-sm font-medium'>
              <div className='font-[500] text-slate-700 text-lg'>
                Packaging Development Workflow
              </div>
            </div>
            <div className='bg-icpf-base/10 p-4 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center text-sm font-medium'>
              <div className='font-[500] text-slate-700 text-lg'>
                Capital Equipment and Manufacturing
              </div>
            </div>
            <div className='bg-icpf-base/10 p-4 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center text-sm font-medium'>
              <div className='font-[500] text-slate-700 text-lg'>
                Logistics and Supply Chain Management
              </div>
            </div>
            <div className='bg-icpf-base/10 p-4 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center text-sm font-medium'>
              <div className='font-[500] text-slate-700 text-lg'>
                Leveraging Human Factors in Packaging Design
              </div>
            </div>
          </div>
        </div>
        <div className='md:col-span-2 flex flex-col gap-4'>
          <div className='w-full h-full bg-icpf-dark text-white py-5 px-7 rounded-lg flex flex-col gap-2'>
            <div className='h4-base'>Packaging Development Plan (PDP)</div>
            <div className='leading-snug'>
              Apply what you learn by creating your own Packaging Development
              Plan using our guided template—customizable for real-world
              packaging projects across any industry.
            </div>
          </div>
          <div className='w-full h-full bg-icpf-base text-white py-5 px-7 rounded-lg flex flex-col gap-2'>
            <div className='flex items-center gap-2'>
              <div className='h4-base max-w-[80%]'>
                Weekly Office Hours with a PhD
              </div>
            </div>
            <div className='leading-snug'>
              Get personalized support during live, weekly office hours—ask
              questions, get feedback, and connect directly with program
              instructors.
            </div>
          </div>
        </div>
        <div className='md:col-span-6 border-y border-y-icpf-base py-7'>
          <div className='text-center flex flex-col gap-2'>
            <div className='text-lg font-bold'>
              Click{' '}
              <a
                href='https://packagingschool.com/certifications/get-to-know-cmpm'
                target='_blank'
                rel='noopener noreferrer'
              >
                HERE
              </a>{' '}
              to learn more about the CMPM program
            </div>
          </div>
        </div>
        <div className='md:col-span-6'>
          <div className='flex flex-col gap-4 max-w-5xl mx-auto'>
            <div className='h3-base'>Scholarship Criteria & Award Process</div>
            <div className='text-lg'>
              TPS and ICPF will collect and review applications for the CMPM
              SPRING 1 scholarship opportunity. It is important to note the
              following key ethical considerations for the scholarship:
            </div>
            <div className=''>
              <ul className='list-disc list-outside text-lg flex flex-col gap-4 pl-4'>
                <li>
                  Basic student information will be safeguarded and no sensitive
                  or financial based data will be sought or obtained through the
                  scholarship process.
                </li>
                <li>
                  The review committee will exercise fairness and objectivity in
                  evaluating applications based on the transparent criteria
                  listed below— removing all bias or favoritism from the
                  process.
                </li>
                <li>
                  The goal for ICPF in awarding these scholarships is to attract
                  and support promising students who are interested in
                  packaging, supply chain, and manufacturing, ultimately
                  building a stronger, more diverse talent pipeline for the
                  corrugated packaging industry.
                </li>
                <li>
                  The inaugural process will be managed and evaluated for
                  outcomes against the stated goal and adjusted in the future as
                  needed.
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
                  Open to current students (age 18+) who are studying business,
                  supply chain management, graphic communications/design,
                  engineering, environmental science, chemistry, or another
                  STEAM-related field.
                </li>
                <li>
                  Must have completed at least one year of undergraduate
                  coursework or between six months to one year of a successful
                  internship with a corrugated packaging manufacturer.
                </li>
                <li>
                  Must have demonstrated interest in the packaging, corrugated,
                  or paperboard industry (via coursework, internships, projects,
                  student organizations, etc.).
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
                      GPA, rigor of coursework, relevant classes
                    </td>
                  </tr>
                  <tr className='bg-gray-50'>
                    <td className='border border-gray-300 p-3 font-medium'>
                      Industry Alignment & Career Goals
                    </td>
                    <td className='border border-gray-300 p-3'>20%</td>
                    <td className='border border-gray-300 p-3'>
                      Demonstrated interest in packaging/supply chain
                    </td>
                  </tr>
                  <tr className='bg-white'>
                    <td className='border border-gray-300 p-3 font-medium'>
                      Leadership & Initiative
                    </td>
                    <td className='border border-gray-300 p-3'>10%</td>
                    <td className='border border-gray-300 p-3'>
                      Extracurriculars, campus involvement, student orgs,
                      competitions
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
                      goals
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ICPF;
