import React from 'react';
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
    name: 'Beverage Academy',
    description:
      'Partnered with Beverage Institute by ISBT® to help them adapt to the educational needs of modern professionals—to take beverage training online.',
    date: '2017',
  },
  {
    name: 'Automotive Packaging Summit',
    description:
      '300+ professionals across automotive come together to learn and connect',
    date: '2017',
  },
  {
    name: 'Clemson University Center for Corporate Learning',
    description:
      'Packaging School initiates a professional education agreement for a cohort based online learning program, two additional courses and the Package Development Plan are created for the pending program.',
    date: '2017',
  },
  {
    name: 'Certificate of Mastery in Packaging Management',
    description:
      'Dr. Julie Suggs comes onboard as the Educational Director and leads the first cohort for The Certificate of Mastery in Packaging Management, an official program offered by Clemson University',
    date: '2018',
  },
  {
    name: 'Automotive Packaging Certificate',
    description:
      'APC development is commissioned and debuted at AutoPackSummit.com 2019',
    date: '2019',
  },
  {
    name: 'Hazmat Packaging Certificate',
    description: 'Specialized training in land, sea, air transport modes',
    date: '2020',
  },
  {
    name: 'Award Winning',
    description:
      'Dr. Andrew Hurley is co-winner of 2020 Ralph D. Elliott Award',
    date: '2020',
  },
];

const Timeline = () => {
  return (
    <div className='mx-auto max-w-7xl px-6 lg:px-8 flex flex-col gap-16 py-32'>
      <div className='mx-auto max-w-2xl lg:mx-0'>
        <h2 className='text-3xl font-bold font-greycliff tracking-tight sm:text-4xl'>
          Our History
        </h2>
      </div>
      <div className='mx-auto grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-4'>
        {timeline.map((item) => (
          <div key={item.name}>
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
