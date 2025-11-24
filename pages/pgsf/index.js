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
import Link from 'next/link';

const PGSF = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const benefits = [
    {
      description:
        'Access to industry-recognized certificates in packaging and graphics',
      icon: AcademicCapIcon,
    },
    {
      description:
        'Exposure to core areas of the packaging and graphics industries, from materials and printing to converting and sustainability',
      icon: BuildingOfficeIcon,
    },
    {
      description: 'Real-world skills you can apply immediately',
      icon: UserGroupIcon,
    },
    {
      description: 'Personalized coaching and one-on-one mentorship',
      icon: RocketLaunchIcon,
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
        title='Packaging School Certificate Scholarships Powered by PGSF'
        description='Industry-led scholarships to help you build your packaging career. Powered by PGSF.'
      />
      <div className='w-full grid grid-cols-1 md:grid-cols-6 gap-10 md:!gap-20 py-10 lg:py-20 px-4 xl:px-0 max-w-7xl mx-auto'>
        <div className='md:col-span-4 flex flex-col gap-12 w-full'>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-3'></div>
            <div className='h2-base'>
              Scholarships Now Available Through PGSF for Packaging School
              Programs
            </div>
          </div>

          <div className='flex flex-col gap-5 md:col-span-4'>
            <div className='text-xl leading-relaxed'>
              The Print and Graphics Scholarship Foundation (PGSF) has partnered
              with The Packaging School to expand access to high-quality
              education in packaging, printing, and graphic communications.
              Through this collaboration, eligible students can receive
              scholarships to complete Packaging School{' '}
              <a
                href='https://packagingschool.com/certifications'
                target='_blank'
                rel='noopener noreferrer'
              >
                certificate programs
              </a>
              , helping them build valuable skills that align with industry
              needs.
            </div>
            <div className='text-xl leading-relaxed'>
              PGSF, a nonprofit organization dedicated to supporting the next
              generation of graphic communication professionals, provides
              scholarships, grants, and educational resources to students across
              the United States. By partnering with The Packaging School, PGSF
              aims to strengthen the talent pipeline for the printing,
              packaging, and graphics sectors, ensuring that motivated students
              have the financial support and opportunities needed to launch
              successful careers.
            </div>
          </div>
        </div>
        <div className='md:col-span-2'>
          <div className='flex flex-col gap-16 border border-gray-300 rounded-lg p-6'>
            <div className='w-full h-full mx-auto relative mt-4'>
              <div className='absolute top-0 left-0 w-full h-full flex justify-center items-start'></div>
              <Image
                src='https://packschool.s3.us-east-1.amazonaws.com/logo-gpsfsd.png'
                alt='ICPF Logo'
                width={364}
                height={143}
              />
            </div>
            <div className='text-center text-lg font-bold bg-[#da5742] text-white p-6 rounded-lg'>
              <Link href={'/pgsf/apply'} className='text-white'>
                Apply Now
              </Link>
            </div>
          </div>
        </div>

        <div className='md:!col-span-6 bg-gray-100 p-10 rounded-lg'>
          <div className='!grid !grid-cols-2 md:!grid-cols-3 lg:!grid-cols-5 w-full gap-10 lg:gap-16 px-6 xl:px-0 max-w-7xl mx-auto'>
            <div className='flex justify-center items-center hover:bg-black transition-all ease-in group cursor-pointer flex-1 p-3'>
              <Link href={'/certifications/get-to-know-cmpm'} passHref shallow>
                <Image
                  src={'https://packschool.s3.amazonaws.com/cmpm-black.png'}
                  className='group-hover:invert'
                  width={370}
                  height={114}
                  alt='Certificate of Packaging Management Logo'
                />
              </Link>
            </div>
            <div className='flex justify-center items-center hover:bg-black transition-all ease-in group cursor-pointer flex-1 p-3'>
              <Link href={'/certifications/get-to-know-cps'} passHref shallow>
                <Image
                  src={'https://packschool.s3.amazonaws.com/cps-black.png'}
                  width={430}
                  height={118}
                  alt='Certificate of Packaging Science Logo'
                  className='group-hover:invert'
                />
              </Link>
            </div>
            <div className='flex justify-center items-center hover:bg-black transition-all ease-in group cursor-pointer flex-1 p-3'>
              <Link href={'/certifications/get-to-know-apc'} passHref shallow>
                <Image
                  src={'https://packschool.s3.amazonaws.com/aps-black.png'}
                  className='group-hover:invert'
                  width={403}
                  height={109}
                  alt='Automotive Packaging Certificate Logo'
                />
              </Link>
            </div>
            <div className='flex justify-center items-center hover:bg-black transition-all ease-in group cursor-pointer flex-1 p-3'>
              <Link href={'/certifications/get-to-know-csp'} passHref shallow>
                <Image
                  src={'https://packschool.s3.amazonaws.com/csp-black.png'}
                  className='group-hover:invert'
                  width={310}
                  height={109}
                  alt='Certificate of Sustainable Packaging Logo'
                />
              </Link>
            </div>
            <div className='flex justify-center items-center !col-span-2 md:!col-span-1 hover:bg-black transition-all ease-in group cursor-pointer flex-1 p-3'>
              <div className='w-1/2 md:!w-full mx-auto '>
                <Link href={'/food-packaging'} passHref shallow>
                  <Image
                    src={'https://packschool.s3.amazonaws.com/fpc-black.png'}
                    className='group-hover:invert'
                    width={429}
                    height={109}
                    alt='Food Packaging Certificate Logo'
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className='md:col-span-6'>
          <div className='h3-base w-full border-b border-gray-300 pb-4'>
            What You&apos;ll Gain
          </div>
        </div>
        <div className='md:col-span-2'>
          <div
            className='w-full aspect-[4/4] flex items-center justify-center bg-cover bg-bottom bg-no-repeat'
            style={{
              backgroundImage:
                "url('https://packschool.s3.us-east-1.amazonaws.com/pgsf-tall.png')",
            }}
          ></div>
        </div>
        <div className='md:col-span-4'>
          <div className='flex flex-col gap-6'>
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

        <div className='md:col-span-6 flex flex-col gap-4'>
          <div className='w-full bg-[#da5742]/30 text-black py-5 px-7 rounded-lg flex flex-col gap-2 justify-end'>
            <div className='text-xl font-semibold'>
              Certificate of Mastery in Packaging Management Deadline
            </div>
            <div className='leading-snug'>
              Apply by April 17 to be considered for a scholarship toward our
              Certificate of Mastery in Packaging Management or Certificate of
              Packaging Science programs.
            </div>
          </div>
        </div>

        <div className='md:col-span-6'>
          <div className='flex flex-col gap-4'>
            <div className='h3-base'>Scholarship Criteria & Award Process</div>
            <div className='text-lg'>
              TPS and PGSF will collect and review applications for scholarship
              opportunities to The Packaging School. Please note the following
              key ethical considerations for the scholarship:
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
                  listed below—removing all bias or favoritism from the process.
                </li>
                <li>
                  The goal for PGSF / TPS in awarding these scholarships is to
                  attract and support promising students who are passionate
                  about packaging, graphics, and related technologies—ultimately
                  building a stronger, more innovative, and diverse talent
                  pipeline for the packaging and printing industry.
                </li>
                <li>
                  The inaugural process will be managed and evaluated for
                  outcomes against the stated goal and adjusted in the future as
                  needed.
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='md:col-span-6'>
          <div className='flex flex-col gap-4'>
            <div className='h3-base'>Eligibility Requirements (Minimum)</div>
            <div className=''>
              <ul className='list-disc list-outside text-lg flex flex-col gap-4 pl-4'>
                <li>
                  Must be a current undergraduate student enrolled in a US
                  college, university, technical school, or community college,
                  or be a current intern at a packaging company.
                </li>
                <li>
                  Major in packaging, printing, or graphics-related disciplines.
                </li>
                <li>
                  Must have completed at least one semester (12 credits or more)
                  of undergraduate coursework.
                </li>
                <li>
                  Demonstrated interest in the printing, graphic communications,
                  or packaging industries (through coursework, internships,
                  projects, student organizations, or related experiences).
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='md:col-span-6'>
          <div className='flex flex-col gap-4'>
            <div className='h3-base'>Scholarship Evaluation Criteria</div>
            <div className='overflow-x-auto'>
              <table className='w-full border-collapse border border-gray-300'>
                <thead>
                  <tr className='bg-[#da5742]/30'>
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
                      Demonstrated interest in packaging, printing, and / or
                      graphics
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
                      Motivation for pursuing Packagingschool.com courses,
                      industry impact, and career goals
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

export default PGSF;
