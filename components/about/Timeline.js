import React from 'react';
import { useRouter } from 'next/router';

const timeline = [
  {
    name: 'Founded company',
    date: '2015',
  },
  {
    name: 'Clemson University Research Foundation',
    description:
      'Packaging School finalized our exclusive licensee of a professional packaging curriculum developed at Clemson University',
    date: '2016',
  },
  {
    name: 'Partner Educators',
    description: 'First published courses as an education partner for Sonoco',
    date: '2016',
  },
  {
    name: 'Partner Educators',
    description: 'Published courses as an education partner for UPM Raflatac',
    date: '2016',
  },
  {
    name: 'SC Commission on Higher Education',
    description:
      'Packaging School becomes a licensed postsecondary institution',
    date: '2017',
  },
  {
    name: 'Certificate of Packaging Science',
    description:
      'Twelve courses licensed through Clemson University were fully produced and published into a professional curriculum',
    date: '2017',
  },
  {
    name: 'Partner Educators',
    description:
      'Published courses as the education partner for the International Society of Beverage Technologists and the Beverage Institute by ISBT®',
    date: '2017',
  },
  {
    name: 'Beverage Academy',
    description:
      'Partnered with Beverage Institute by ISBT® to help them adapt to the educational needs of modern professionals—to take beverage training online.',
    date: '2017',
  },
  {
    name: 'Automotive Packaging Summit',
    link: '/events/aps-2024',
    description:
      'Inaugural event in October of 2017 at the Clemson ONE campus in downtown Greenville, SC. Today, APS attracts 400+ professionals from across the automotive industry to come together to learn and connect.',
    date: '2017',
  },
  {
    name: 'Clemson University Center for Corporate Learning',
    description:
      'Packaging School initiates a professional education agreement for a cohort based online learning program, two additional courses and the Package Development Plan (PDP) are created for the pending program.',
    date: '2017',
  },
  {
    name: 'Certificate of Mastery in Packaging Management',
    description:
      'Dr. Julie Suggs comes onboard as the Educational Director and leads the first cohort for The Certificate of Mastery in Packaging Management, CMPM is an official program offered by Clemson University.',
    date: '2018',
  },
  {
    name: 'Automotive Packaging Certificate',
    description:
      'APC development is commissioned and debuted at AutoPackSummit.com 2019',
    date: '2019',
  },
  {
    name: 'Partner Educators',
    description:
      'Private courses published as an education partner for Mondelez',
    date: '2019',
  },
  {
    name: 'Partner Educators',
    description:
      'Private courses published as an education partner for Pratt Industries',
    date: '2019',
  },
  {
    name: 'Award Winning',
    description:
      'Dr. Andrew Hurley is co-winner of Clemson University’s 2020 Ralph D. Elliott Award for Outstanding Service to Off-Campus, Distance and Continuing Education in creating The Packaging School.',
    date: '2020',
  },
  {
    name: 'Company Cohorts',
    description:
      'Adoption by Smurfit Kappa (Westrock) of CMPM cohorts for rising stars.',
    date: '2020',
  },
  {
    name: 'Partner Educators',
    description:
      'Published courses as the education partner for the  International Association of Diecutting and Diemaking and the Diecutting Academy with IADD.',
    date: '2021',
  },
  {
    name: 'Partner Educators',
    description:
      'Published courses as an education partner for Smurfit Kappa (Westrock).',
    date: '2021',
  },
  {
    name: 'Partner Educators',
    description:
      'Private courses published as an education partner for Colgate-Palmolive.',
    date: '2021',
  },
  {
    name: 'Partner Educators',
    description:
      'Private courses published as the education partner for LK Packaging.',
    date: '2022',
  },
  {
    name: 'Certificate of Sustainable Packaging',
    description:
      'CSP is launched based on industry demand to help navigate the complex trade-offs of materials, processes, and end of life scenarios using software tools specifically designed for the packaging industry.',
    date: '2023',
  },
  {
    name: 'Award Winning',
    description:
      'Nominated and awarded in two categories for learning advancements with our B2B custom services partner Colgate-Palmolive.',
    date: '2023',
  },
  {
    name: 'B2B Services',
    description: 'Packaging School Library debut with Unilever.',
    date: '2023',
  },
  {
    name: 'Partner Educators',
    description:
      'First published courses as an education partner for Milliken.',
    date: '2023',
  },
  {
    name: 'Partner Educators',
    description:
      'First published courses as the education partner for GreenBlue.org and Sustainable Packaging Coalition (SPC).',
    date: '2024',
  },
  {
    name: 'Government Contractor',
    description:
      'First US Federal customer via UEI, Cage Code, relevant Past Performance.',
    date: '2024',
  },
  {
    name: 'Publication',
    description: 'Dr Andrew Hurley presented at TEDxClemsonU.',
    date: '2024',
  },
  {
    name: 'B2B Services',
    description:
      'Packaging School Library debut with PDA, Packaging Distributors of America.',
    date: '2024',
  },
];

const Timeline = () => {
  const router = useRouter();
  return (
    <div className='mx-auto max-w-7xl px-6 lg:px-8 flex flex-col gap-16 py-32'>
      <div className='mx-auto max-w-2xl lg:mx-0'>
        <h2 className='text-3xl font-bold font-greycliff tracking-tight sm:text-4xl'>
          Our History
        </h2>
      </div>
      <div className='mx-auto grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-4'>
        {timeline.map((item) => (
          <div
            key={item.name}
            className={`${item.link ? 'cursor-pointer' : ''}`}
            onClick={() => item.link && router.push(item.link)}
          >
            <time
              dateTime={item.dateTime}
              className='flex items-center text-sm font-semibold leading-6 text-indigo-600'
            >
              <svg
                viewBox='0 0 4 4'
                className='mr-4 h-1 w-1 flex-none'
                aria-hidden='true'
              >
                <circle cx={2} cy={2} r={2} fill='currentColor' />
              </svg>
              {item.date}
              <div
                className='absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0'
                aria-hidden='true'
              />
            </time>
            <p className='mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900'>
              {item.name}
            </p>
            <p className='mt-1 text-base leading-7 text-gray-600'>
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
