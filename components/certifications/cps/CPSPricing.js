import React, { useState, useEffect } from 'react';
import { CheckIcon, QuestionMarkCircleIcon } from '@heroicons/react/20/solid';
import {
  RocketLaunchIcon,
  DocumentPlusIcon,
  CalendarDaysIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import StatCard from '../../shared/StatCard';
import { useSelector } from 'react-redux';
import { useThinkificLink } from '../../../hooks/useThinkificLink';
import { useRouter } from 'next/router';
import { createNewOrder } from '../../../helpers/api';

const CPSPricing = ({ cert, type }) => {
  const router = useRouter();
  const { navigateToThinkific } = useThinkificLink();
  const { awsUser } = useSelector((state) => state.auth);

  const orderHandler = async (cert, type) => {
    const orderId = await createNewOrder({
      courseDescription: cert.description,
      courseDiscount: 0,
      courseImage: cert.seoImage,
      courseName: cert.title,
      courseLink:
        type === 'SUBSCRIPTION'
          ? `${cert.subscriptionLink}`
          : `${cert.purchaseLink}`,
      total: type === 'SUBSCRIPTION' ? cert.subscriptionPrice : cert.price,
      userID: awsUser ? awsUser.id : null,
      email: awsUser ? awsUser.email : null,
      name: awsUser ? awsUser.name : null,
      type: type === 'SUBSCRIPTION' ? 'SUBSCRIPTION' : 'BUY',
    });

    if (awsUser && awsUser.name.includes(' ')) {
      navigateToThinkific(
        type === 'SUBSCRIPTION'
          ? `${cert.subscriptionLink}`
          : `${cert.purchaseLink}`,
        type === 'SUBSCRIPTION'
          ? `${cert.subscriptionLink}`
          : `${cert.purchaseLink}`
      );
    } else {
      router.push(`/order/${orderId.id}`);
    }
  };
  return (
    <div>
      <div className='mx-auto'>
        <h2 className='text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl'>
          Future Proof Your Skills
        </h2>
        <div className='mt-6 text-xl text-gray-700 dark:text-gray-500 max-w-prose'>
          To start your journey,{' '}
          <span className='font-bold dark:text-white'>
            please fill out the short application form and submit your $25
            application fee.
          </span>{' '}
          If you have any inquiries, a counselor is available to schedule a call
          with you to address all your questions and concerns. Click below to
          get started.
        </div>
        <div
          className='w-full lg:w-fit py-2 lg:pl-6 lg:pr-9 bg-base-brand cursor-pointer rounded-lg mt-9 flex gap-2 items-center'
          onClick={() =>
            window.open(
              'https://calendar.app.google/qUZMKuFbF7NhpxgL8',
              '_blank'
            )
          }
        >
          <div>
            <QuestionMarkCircleIcon className='w-16 h-16 fill-white/70' />
          </div>
          <div className='flex flex-col'>
            <div className='font-bold text-xl text-white'>
              Questions about CPS?
            </div>
            <div className='text-white leading-tight'>
              Schedule a FREE live demo today! (EST)
            </div>
          </div>
        </div>
      </div>
      <div className='mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 lg:mx-0 lg:flex lg:max-w-none lg:items-center'>
        <div className='p-8 sm:p-10 lg:flex-col h-full lg:!justify-center'>
          <div className='lg:grid lg:grid-cols-3 mt-6 flex flex-col gap-6'>
            <StatCard
              stat={
                <RocketLaunchIcon className='w-12 h-12 stroke-white dark:stroke-clemson' />
              }
              title='24/7 Online Access'
            />
            <StatCard
              stat={
                <DocumentPlusIcon className='w-12 h-12 stroke-white dark:stroke-clemson' />
              }
              title='Choose Your Own Elective'
            />
            <StatCard
              stat={
                <CalendarDaysIcon className='w-12 h-12 stroke-white dark:stroke-clemson' />
              }
              title='6-Months to Complete'
            />
            <div className='col-span-3 dark:text-white lg:text-lg'>
              Become a packaging professional, or deepen your mastery of the
              industry. Learn the science, technology, art, language, math, and
              business of packaging at your own pace.
            </div>
          </div>
        </div>
        <div className='-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0'>
          <div className='rounded-2xl bg-gray-50 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16'>
            <div className='mx-auto max-w-xs px-8'>
              <p className='text-base font-semibold text-gray-600'>
                Payment Plans are Available
              </p>
              <p className='mt-6 flex items-baseline justify-center gap-x-2'>
                <span className='text-5xl font-bold tracking-tight text-gray-900'>
                  $2,400
                </span>
                <span className='text-sm font-semibold leading-6 tracking-wide text-gray-600'>
                  USD
                </span>
              </p>
              <button
                onClick={() => orderHandler(cert)}
                className='mt-10 block w-full rounded-md bg-clemson px-3 py-3 text-center text-lg font-semibold text-white shadow-sm hover:bg-clemson-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clemson'
              >
                Enroll Now
              </button>
              <p className='my-3 text-sm font-semibold leading-6 tracking-wide text-gray-600'>
                or
              </p>
              <p className=' flex items-baseline justify-center gap-x-2'>
                <span className='text-2xl font-bold tracking-tight text-gray-900'>
                  6 Monthly Payments of $415
                </span>
              </p>
              <button
                onClick={() => orderHandler(cert, 'SUBSCRIPTION')}
                className='mt-10 block w-full rounded-md bg-clemson px-3 py-3 text-center text-lg font-semibold text-white shadow-sm hover:bg-clemson-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clemson'
              >
                Enroll Now
              </button>

              <p className='mt-6 text-xs leading-4 text-gray-600'>
                Invoices and receipts available for easy company reimbursement
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CPSPricing;
