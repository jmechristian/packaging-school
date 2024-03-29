import React from 'react';
import {
  HandThumbUpIcon,
  CloudArrowUpIcon,
  AcademicCapIcon,
  LightBulbIcon,
  ArrowLongRightIcon,
  CubeTransparentIcon,
} from '@heroicons/react/20/solid';
import SimpleIntakeForm from '../layout/SimpleIntakeForm';

const PartnerBottom = () => {
  return (
    <div className='relative overflow-hidden bg-white px-6 sm:py-16 mb-8 lg:overflow-visible lg:px-0'>
      <div className='mx-auto grid max-w-2xl grid-cols-1 gap-y-8 gap-x-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10'>
        <div className='lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8'>
          <div className='lg:pr-4'>
            <div className='lg:max-w-lg'>
              <p className='text-base font-semibold leading-7 text-base-brand font-greycliff'>
                Get In Touch
              </p>
              <h1 className='mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl font-greycliff'>
                Better Together.
              </h1>
              <p className='mt-6 text-xl leading-8 text-slate-700'>
                Is there something on this page that intrigues you? Do you want
                to be contacted by one of our Packaging School educational
                specialists? Please fill out the form, and we&apos;ll reach out.
              </p>
            </div>
          </div>
        </div>
        <div className='md:-mt-12 md:-ml-12 md:p-12 scroll-pt-24 lg:sticky lg:top-24 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden'>
          <div className='w-full max-w-none rounded-xl py-3 bg-clemson shadow-lg ring-1 ring-slate-400/10 sm:w-[57rem] flex justify-start items-center'>
            <SimpleIntakeForm submit={(data) => console.log(data)} />
          </div>
        </div>
        <div className='lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8'>
          <div className='lg:pr-4'>
            <div className='max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg'>
              <ul role='list' className='space-y-8 text-gray-600'>
                <li className='flex gap-x-3'>
                  <CubeTransparentIcon
                    className='mt-1 h-5 w-5 flex-none text-clemson'
                    aria-hidden='true'
                  />
                  <span>
                    <strong className='font-semibold text-gray-900'>
                      Custom Course Development.
                    </strong>{' '}
                    Our instructional designers have decades of experience in
                    packaging and can work with your teams to develop courses
                    that educate your market, raise awareness, and provide a
                    pathway to sales.{' '}
                    <div
                      className='inline-flex items-center gap-1 ml-1 cursor-pointer'
                      onClick={() =>
                        window.open(
                          'https://packschool.s3.amazonaws.com/Docs/Packaging-School-CUSTOM-COURSES.pdf',
                          '_blank'
                        )
                      }
                    >
                      <div className='underline'>Download Info Sheet</div>
                      <div>
                        <ArrowLongRightIcon className='text-slate-900 w-5 h-5' />
                      </div>
                    </div>
                  </span>
                </li>
                <li className='flex gap-x-3'>
                  <AcademicCapIcon
                    className='mt-1 h-5 w-5 flex-none text-clemson'
                    aria-hidden='true'
                  />
                  <span>
                    <strong className='font-semibold text-gray-900'>
                      Continuing Education.
                    </strong>{' '}
                    Statistics show that an overwhelmingly high percentage of
                    employees would stay at their current job if their company
                    were to invest in their growth and development.{' '}
                    <div
                      className='inline-flex items-center gap-1 ml-1 cursor-pointer'
                      onClick={() =>
                        window.open(
                          'https://packschool.s3.amazonaws.com/Docs/Packaging-School-CONTINUING-EDUCATION.pdf',
                          '_blank'
                        )
                      }
                    >
                      <div className='underline'>Download Info Sheet</div>
                      <div>
                        <ArrowLongRightIcon className='text-slate-900 w-5 h-5' />
                      </div>
                    </div>
                  </span>
                </li>
                <li className='flex gap-x-3'>
                  <CloudArrowUpIcon
                    className='mt-1 h-5 w-5 flex-none text-clemson'
                    aria-hidden='true'
                  />
                  <span>
                    <strong className='font-semibold text-gray-900'>
                      Thought Leaders.
                    </strong>{' '}
                    We want to hear how you are improving our industry. There
                    may be opportunities for collaboration on sponsored
                    educational marketing of your brand in our existing courses.{' '}
                    <div
                      className='inline-flex items-center gap-1 ml-1 cursor-pointer'
                      onClick={() =>
                        window.open(
                          'https://packschool.s3.amazonaws.com/Docs/Packaging-School-THOUGHT-LEADERS.pdf',
                          '_blank'
                        )
                      }
                    >
                      <div className='underline'>Download Info Sheet</div>
                      <div>
                        <ArrowLongRightIcon className='text-slate-900 w-5 h-5' />
                      </div>
                    </div>
                  </span>
                </li>
                <li className='flex gap-x-3'>
                  <LightBulbIcon
                    className='mt-1 h-5 w-5 flex-none text-clemson'
                    aria-hidden='true'
                  />
                  <span>
                    <strong className='font-semibold text-gray-900'>
                      Sponsorships.
                    </strong>{' '}
                    To stay true to our mission of bridging the gap between
                    academia and industry, the Packaging School selects market
                    leaders in each area of instruction to provide their
                    expertise and make known their unique positioning.{' '}
                    <div
                      className='inline-flex items-center gap-1 ml-1 cursor-pointer'
                      onClick={() =>
                        window.open(
                          'https://packschool.s3.amazonaws.com/Docs/Packaging-School-SPONSORSHIPS-vv2.pdf',
                          '_blank'
                        )
                      }
                    >
                      <div className='underline'>Download Info Sheet</div>
                      <div>
                        <ArrowLongRightIcon className='text-slate-900 w-5 h-5' />
                      </div>
                    </div>
                  </span>
                </li>
                <li className='flex gap-x-3'>
                  <HandThumbUpIcon
                    className='mt-1 h-5 w-5 flex-none text-clemson'
                    aria-hidden='true'
                  />
                  <span>
                    <strong className='font-semibold text-gray-900'>
                      In-Person Training.
                    </strong>{' '}
                    Dr. Andrew Hurley speaks and moderates over a dozen
                    conferences and summits annually, delivers presentations
                    internationally and consults with many Fortune 100 firms. He
                    might be what you need at your next conference or training
                    event.{' '}
                    <div
                      className='inline-flex items-center gap-1 ml-1 cursor-pointer'
                      onClick={() =>
                        window.open(
                          'https://packschool.s3.amazonaws.com/Docs/Packaging-School-IN-PERSON-TRAINING.pdf',
                          '_blank'
                        )
                      }
                    >
                      <div className='underline'>Download Info Sheet</div>
                      <div>
                        <ArrowLongRightIcon className='text-slate-900 w-5 h-5' />
                      </div>
                    </div>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerBottom;
