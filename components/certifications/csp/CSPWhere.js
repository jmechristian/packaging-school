import React from 'react';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

import { SectionHeading } from '../../shared/SectionHeading';

const CSPWhere = () => {
  return (
    <div className='container-7xl flex flex-col gap-9 scroll-mt-36' id='where'>
      <SectionHeading number='3'>Where do I start?</SectionHeading>
      <div className='flex flex-col lg:!grid-cols-5 xl:!grid xl:!grid-cols-5 gap-9 lg:!gap-16 overflow-hidden'>
        <div className='lg:!col-span-3 flex flex-col gap-6'>
          <h2 className='text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:!text-5xl'>
            Lead the Charge: Empower Progress through Sustainable Packaging
          </h2>
          <div className='flex flex-col'>
            <div className='mt-6 text-xl text-gray-700 dark:text-gray-500 lg:!max-w-prose'>
              Position yourself as the unparalleled knowledge leader within your
              company by mastering every facet of sustainable packaging. From
              inception to delivery, become the authority on best practices,
              ensuring a seamless journey that aligns with eco-friendly
              principles. Elevate your expertise and spearhead sustainable
              initiatives that make a lasting impact.
            </div>
            <div
              className='w-full md:w-fit py-2 md:pl-6 md:pr-9 !bg-base-brand cursor-pointer rounded-lg mt-9 flex gap-2 justify-center items-center'
              onClick={() =>
                window.open(
                  'https://calendar.app.google/qUZMKuFbF7NhpxgL8',
                  '_blank'
                )
              }
            >
              <div>
                <QuestionMarkCircleIcon className='w-9 h-9 fill-white/70' />
              </div>
              <div className='flex flex-col'>
                <div className='font-bold text-xl text-white'>
                  Questions about CSP?
                </div>
                <div className='text-white leading-tight'>
                  Schedule a FREE live demo today! (EST)
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-span-2 w-full h-full flex flex-col gap-4 md:!grid md:!grid-cols-2 md:!gap-6 xl:!flex xl:!flex-col xl:!gap-4'>
          <div className='rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 md:!flex md:!flex-col md:!justify-center lg:!py-12'>
            <div className='mx-auto max-w-xs px-8 flex flex-col gap-3'>
              <p className='flex items-baseline justify-center gap-x-2'>
                <span className='text-5xl font-bold tracking-tight text-gray-900 lg:!text-4xl'>
                  $2,400
                </span>
                <span className='text-sm font-semibold leading-6 tracking-wide text-gray-600'>
                  USD
                </span>
              </p>
              <Link
                href='https://learn.packagingschool.com/enroll/2772370?price_id=3600658'
                className='block w-full rounded-md bg-clemson px-3 py-3 text-center text-lg font-semibold text-white shadow-sm hover:bg-clemson-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clemson'
              >
                Enroll Now
              </Link>
              <p className='mt-6 text-xs leading-4 text-gray-600'>or</p>
              <p className='flex items-baseline justify-center gap-x-2'>
                <span className='text-5xl font-bold tracking-tight text-gray-900 lg:!text-3xl'>
                  6 Monthly Payments of $415
                </span>
              </p>
              <Link
                href='https://learn.packagingschool.com/enroll/2772370?price_id=4360274'
                className='block w-full rounded-md bg-clemson px-3 py-3 text-center text-lg font-semibold text-white shadow-sm hover:bg-clemson-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clemson'
              >
                Enroll Now
              </Link>

              <p className='mt-6 text-xs leading-4 text-gray-600'>
                Invoices and receipts available for easy company reimbursement
              </p>
            </div>
          </div>
          <div className='rounded-2xl bg-base-light py-12 ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col'>
            <div className='mx-auto max-w-xl px-8 flex flex-col gap-2'>
              <p className='font-bold text-lg'>Recommended Materials</p>
              <div>
                &rarr; Review of{' '}
                <span
                  className='underline cursor-pointer'
                  onClick={() =>
                    window.open('https://sdgs.un.org/goals', '_blank')
                  }
                >
                  https://sdgs.un.org/goals
                </span>
              </div>
              <div>&rarr; Access to printing and prototyping equipment</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CSPWhere;
