import React, { useState } from 'react';
import Head from 'next/head';
import { API } from 'aws-amplify';
import { getCustomer } from '../src/graphql/queries';
import {
  BoltIcon,
  MinusSmallIcon,
  PlusSmallIcon,
  AcademicCapIcon,
  BookmarkSquareIcon,
} from '@heroicons/react/24/outline';
import { Disclosure } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';

import CustomerIntro from '../components/customers/CustomerIntro';
import CustomerSearchContainer from '../components/customers/CustomerSearchContainer';
import FullWidthDropDown from '../components/shared/FullWidthDropDown';
import CustomerFeatures from '../components/customers/CustomerFeatures';
import CustomerIntro_2 from '../components/customers/CustomerIntro_2';
import { dummyData } from '../data/DummyData';
import CustomerSearchLOTMContainer from '../components/customers/CustomerSearchLOTMContainer';
import CustomerOfferings from '../components/customers/CustomerOfferings';

const faqs = [
  {
    id: 1,
    question: 'How do you make holy water?',
    answer:
      'You boil the hell out of it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.',
  },
  {
    id: 2,
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  {
    id: 3,
    question: 'What do you call someone with no body and no nose?',
    answer:
      'Nobody knows. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.',
  },
  {
    id: 4,
    question: 'Why do you never see elephants hiding in trees?',
    answer:
      "Because they're so good at it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
];

const Page = () => {
  // console.log(customer);

  const customer = {
    courses: {
      items: [
        {
          clicks: 2,
          courseId: '452ec0d8-7464-4bd6-bfc2-eab051a9b40b',
          customerId: 'fec13ccf-8b5c-497a-bccd-adb6d06820ea',
          id: '6d433368-3c27-4e47-8e19-bc4b7dec9447',
        },
        {
          clicks: 4,
          courseId: 'e39e127a-11bc-448d-a8c0-209b3abbfdb9',
          customerId: 'fec13ccf-8b5c-497a-bccd-adb6d06820ea',
          id: '67279e76-7fca-4c93-b14e-636ad7696b4b',
        },
        {
          clicks: 6,
          courseId: '4e6c079e-b396-4762-8b7f-4fa4dea64969',
          customerId: 'fec13ccf-8b5c-497a-bccd-adb6d06820ea',
          id: '29530305-8b13-455a-be1c-ab458ade011f',
        },
        {
          clicks: 12,
          courseId: 'ff174f01-5f76-486c-8d7a-849d6d3ff914',
          customerId: 'fec13ccf-8b5c-497a-bccd-adb6d06820ea',
          id: '9066dada-7a99-4115-9720-f1e8266e7fae',
        },
      ],
    },
    createdAt: '2023-12-12T15:05:36.899Z',
    displayName: 'GreenBlue',
    email: null,
    highlightColor: null,
    id: 'fec13ccf-8b5c-497a-bccd-adb6d06820ea',
    link: null,
    logo: null,
    offered: null,
    offerings: null,
    pdf: null,
    primaryColor: null,
    pscourses: {
      items: [],
    },
    slide: null,
    status: null,
    updatedAt: '2023-12-12T15:05:36.899Z',
    video: null,
  };

  return (
    <>
      <Head>
        <title>Packaging School | GreenBlue</title>
        <meta name='robots' content='noindex,nofollow' />
      </Head>
      <div className='w-full max-w-7xl px-3 md:px-6 lg:px-0 flex flex-col gap-4 md:gap-6 pb-3 md:pb-6 lg:pb-24 mx-auto'>
        {/* <CustomerIntro logo={'https://packschool.s3.amazonaws.com/GB_logo.png'} /> */}
        <CustomerIntro_2 />
        {/* <FullWidthDropDown
        title={'featured'}
        Icon={BoltIcon}
        bg='bg-gb-main'
        bgdark='bg-gradient-to-r from-gb-main to-gb-green'
        highlight={'bg-gb-green'}
        content={
          <CustomerFeatures courses={customer && customer.courses.items} />
        }
        open={true}
      /> */}
        <FullWidthDropDown
          title={'SPC Knowledge Library Topics'}
          Icon={AcademicCapIcon}
          bg='bg-gb-main'
          bgdark='bg-gradient-to-r from-gb-main to-gb-green'
          highlight={'bg-gb-green'}
          content={<CustomerOfferings reference={'coupon=greenblue'} />}
          bgContent={'bg-neutral-200 border'}
          open={true}
        />
        <FullWidthDropDown
          title={'Packaging School Course Offerings'}
          Icon={AcademicCapIcon}
          cash={true}
          bg='bg-base-mid'
          bgdark='bg-base-dark'
          content={
            <CustomerSearchContainer
              reference={'ref=ac65d9'}
              courses={customer && customer.courses.items}
              link_text={'Purchase Course'}
            />
          }
          highlight={'bg-clemson'}
          bgContent={'bg-neutral-200 border'}
        />
        <FullWidthDropDown
          title={'Learning of the Month'}
          Icon={BookmarkSquareIcon}
          bg='bg-base-mid'
          bgdark='bg-base-dark'
          content={<CustomerSearchLOTMContainer />}
          highlight={'bg-clemson'}
          bgContent={'bg-neutral-200 border'}
        />
      </div>
    </>
  );
};

// export async function getServerSideProps() {
//   const res = await API.graphql({
//     query: getCustomer,
//     variables: { id: 'fec13ccf-8b5c-497a-bccd-adb6d06820ea' },
//   });
//   const customer = res.data.getCustomer;

//   return {
//     props: { customer },
//   };
// }

export default Page;
