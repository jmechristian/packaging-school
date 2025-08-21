import React from 'react';
import { MdArrowRight, MdLaunch } from 'react-icons/md';
const incentives = [
  {
    name: 'Research',
    imageSrc:
      'https://packagingschool.com/wp-content/uploads/2019/11/Packaging-School-RESEARCH.png',
    description:
      'Research programs that help brands develop attention grabbing packaging and lift sales on the shelf.',
  },
  {
    name: 'Design',
    imageSrc:
      'https://packagingschool.com/wp-content/uploads/2019/11/Packaging-School-DESIGN.png',
    description:
      'Enable students to work on real-life projects by developing your packaging in my laboratory.',
  },
  {
    name: 'Education',
    imageSrc:
      'https://packagingschool.com/wp-content/uploads/2019/11/Packaging-School-EDUCATION.png',
    description:
      'Teaching programs that offer a variety of Certificates, BS, MS, and PhD degrees.',
  },
];

const AndrewHero = () => {
  return (
    <main>
      <div className='relative isolate'>
        <svg
          className='absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]'
          aria-hidden='true'
        >
          <defs>
            <pattern
              id='1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84'
              width={200}
              height={200}
              x='50%'
              y={-1}
              patternUnits='userSpaceOnUse'
            >
              <path d='M.5 200V.5H200' fill='none' />
            </pattern>
          </defs>
          <svg x='50%' y={-1} className='overflow-visible fill-gray-50'>
            <path
              d='M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z'
              strokeWidth={0}
            />
          </svg>
          <rect
            width='100%'
            height='100%'
            strokeWidth={0}
            fill='url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)'
          />
        </svg>
        <div
          className='absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48'
          aria-hidden='true'
        >
          <div
            className='aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30'
            style={{
              clipPath:
                'polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)',
            }}
          />
        </div>
        <div className='overflow-hidden'>
          <div className='mx-auto max-w-7xl px-6 py-16 lg:py-24'>
            <div className='mx-auto grid grid-cols-1 lg:grid-cols-6 gap-20 items-center'>
              <div className='col-span-4'>
                <h1 className='  text-gray-900 h1-base'>
                  Meet Dr. Andrew Hurley.
                </h1>
                <div className=' mt-6 text-base-mid h3-base leading-relaxed lg:leading-relaxed lg:h3-base'>
                  Professor. Inventor. Researcher. Entrepreneur. This guy is
                  passionate about packaging.
                </div>
                <div className=' mt-6 text-lg lg:text-xl text-gray-600 leading-relaxed lg:leading-relaxed'>
                  This guy is passionate about packaging. Dr. Andrew Hurley is a
                  Professor of Food, Nutrition and Packaging Science at Clemson
                  University. Dr. Hurley chairs committees, guides students
                  through consumer packaged goods development, and supports
                  industries with their packaging R&D needs.
                </div>
                <div className='mt-10 flex items-center gap-x-6 w-full'>
                  <a
                    href='https://www.researchgate.net/profile/Rupert_Hurley'
                    className='rounded-md font-greycliff bg-clemson px-6 py-3 font-semibold text-white shadow-sm hover:bg-clemson-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer text-lg focus-visible:outline-clemson flex items-center gap-x-2'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Connect on LinkedIn{' '}
                    <MdLaunch className='w-7 h-7 text-white/50' />
                  </a>
                </div>
              </div>
              <div className='hidden lg:flex gap-8 w-full col-span-2'>
                <div
                  className='aspect-[4/5] bg-black w-full h-full rounded-lg bg-cover bg-center'
                  style={{
                    backgroundImage: `url('https://packschool.s3.us-east-1.amazonaws.com/post-cG9zdDo1ODU%3D-ANDREW-2018-sm.jpg')`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AndrewHero;
