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
  ArrowTurnRightUpIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import { MdCampaign, MdCelebration, Md3P } from 'react-icons/md';
import { Disclosure } from '@headlessui/react';
import LibraryLessonGrid from '../components/library/LibraryLessonGrid';
import LibraryCourseGrid from '../components/library/LibraryCourseGrid';
import FullWidthDropDown from '../components/shared/FullWidthDropDown';

import LibraryHeader from '../components/library/LibraryHeader';
import DemoOffering from '../components/library/DemoOffering';

const faqs = [
  {
    id: 1,
    question: 'What did the ocean say to the beach?',
    answer: 'Nothing, it just waved.',
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

const courses = [
  {
    id: 'bce3eca3-4f42-4571-b892-06adfc26ccbb',
    courseId: '255394df-4fa0-477d-b19a-a8e04837cdb4',
    clicks: 5,
    customerId: '84558b1f-359a-4551-8832-c6c570171163',
    createdAt: '2024-03-19T13:27:50.317Z',
    updatedAt: '2024-03-19T13:27:50.317Z',
  },
  {
    id: '302a13c3-6197-4175-b1b0-2e2aa29a0246',
    courseId: 'f2bd57ba-adbf-45ab-88f0-d68ac20c5b7e',
    clicks: 5,
    customerId: '84558b1f-359a-4551-8832-c6c570171163',
    createdAt: '2024-03-19T13:28:07.648Z',
    updatedAt: '2024-03-19T13:28:07.648Z',
  },
  {
    id: 'b665ad79-add7-4147-947e-86519ecd1881',
    courseId: '452ec0d8-7464-4bd6-bfc2-eab051a9b40b',
    clicks: 5,
    customerId: '84558b1f-359a-4551-8832-c6c570171163',
    createdAt: '2024-03-19T13:27:02.748Z',
    updatedAt: '2024-03-19T13:27:02.748Z',
  },

  {
    id: '55ee9368-7f26-461d-93e7-7d8759d5fdaa',
    courseId: 'f2fad11c-4548-41ea-b39d-be5a4913a4f5',
    clicks: 6,
    customerId: '84558b1f-359a-4551-8832-c6c570171163',
    createdAt: '2024-03-19T13:23:22.835Z',
    updatedAt: '2024-03-19T13:23:22.835Z',
  },
  {
    id: 'e878326f-cc1a-4ef7-a898-181b8dbb14a3',
    courseId: '4e32d164-d4d9-4ba2-bcc5-ce882df75b71',
    clicks: 6,
    customerId: '84558b1f-359a-4551-8832-c6c570171163',
    createdAt: '2024-03-19T13:26:19.647Z',
    updatedAt: '2024-03-19T13:26:19.647Z',
  },
  {
    id: '5b916486-5ead-48f6-83c3-f844161d5bd4',
    courseId: 'e39e127a-11bc-448d-a8c0-209b3abbfdb9',
    clicks: 6,
    customerId: '84558b1f-359a-4551-8832-c6c570171163',
    createdAt: '2024-03-19T13:25:59.231Z',
    updatedAt: '2024-03-19T13:25:59.231Z',
  },
  {
    id: '5feada8f-a146-4052-9a91-45639a84af94',
    courseId: '4e6c079e-b396-4762-8b7f-4fa4dea64969',
    clicks: 6,
    customerId: '84558b1f-359a-4551-8832-c6c570171163',
    createdAt: '2024-03-19T13:26:41.421Z',
    updatedAt: '2024-03-19T13:26:41.421Z',
  },
  {
    id: '5d6f97d6-a0d1-49ee-8aa6-96e629c4dff3',
    courseId: '5d84ef6e-3fa3-423d-8e33-67d32605cb93',
    clicks: 6,
    customerId: '84558b1f-359a-4551-8832-c6c570171163',
    createdAt: '2024-03-19T13:23:54.916Z',
    updatedAt: '2024-03-19T13:23:54.916Z',
  },
  {
    id: 'ae4e87b7-5c06-433f-b6a1-8e2b0de34f3c',
    courseId: '431ce262-cf48-4a7c-8ff1-2909f548149b',
    clicks: 7,
    customerId: '84558b1f-359a-4551-8832-c6c570171163',
    createdAt: '2024-03-19T13:22:23.500Z',
    updatedAt: '2024-03-19T13:22:23.500Z',
  },
  {
    id: 'eceb74bd-fdf2-452c-ac90-c657efcde79a',
    courseId: '2418801f-a352-4eae-a394-87a5c0c55f79',
    clicks: 8,
    customerId: '84558b1f-359a-4551-8832-c6c570171163',
    createdAt: '2024-03-19T13:21:54.747Z',
    updatedAt: '2024-03-19T13:21:54.747Z',
  },
  {
    id: 'c04ea148-efda-4335-b464-cf817e5ef428',
    courseId: '672c1d2b-ba6c-4e02-8c34-83e8c3e4f7b3',
    clicks: 9,
    customerId: '84558b1f-359a-4551-8832-c6c570171163',
    createdAt: '2024-03-19T13:21:36.185Z',
    updatedAt: '2024-03-19T13:21:36.185Z',
  },
  {
    id: '58507e27-d81c-4f1a-86d5-beb5e1a1fb74',
    courseId: 'ff174f01-5f76-486c-8d7a-849d6d3ff914',
    clicks: 10,
    customerId: '84558b1f-359a-4551-8832-c6c570171163',
    createdAt: '2024-03-19T13:00:05.750Z',
    updatedAt: '2024-03-19T13:00:05.750Z',
  },
];

const Page = ({ customer }) => {
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isForm, setIsForm] = useState('');
  const [isError, setError] = useState(false);

  const submitHandler = async () => {};

  return (
    <>
      <Head>
        <title>Packaging School | Acme</title>
        <meta name='robots' content='noindex,nofollow' />
      </Head>
      <div
        className='bg-brand-yellow/80 p-1.5 cursor-pointer'
        onClick={() =>
          window.open(
            'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ13gmFbYioAfeatuD9a7p7K7zmbPcBoIysUAlPb3hGoL0UqNdLogD7Mq_4e3m-YQhO6ubJxuv6E',
            '_blank'
          )
        }
      >
        <div className='flex items-center justify-center lg:max-w-3xl xl:max-w-7xl mx-auto gap-3'>
          <div>
            <div className='bg-white w-10 h-10 flex items-center justify-center border-2 border-black'>
              <div className='flex items-center justify-center'>
                <MdCampaign size={26} color='black' />
              </div>
            </div>
          </div>
          <div className='leading-tight font-semibold'>
            This library is for DEMO purposes only. If you&apos;d like to build
            your own library, click to schedule a free 15-min library
            consultation.
          </div>
        </div>
      </div>
      <div className='w-full max-w-7xl px-3 md:px-6 lg:px-0 flex flex-col gap-16 md:gap-32 py-10 md:py-16 lg:py-24 mx-auto'>
        <LibraryHeader
          header={'Welcome Your Members Here!'}
          displayName={'Acme'}
          email={'Bobbo@acme.com'}
          logo={'https://packschool.s3.amazonaws.com/fake-logo.png'}
          subhead={
            'Customize your library with your own content and build the optimal collection for your employees from our database of over 4,000 lessons. New content is added every month, keeping your team up-to-date with the latest trends and best practices to implement into your workflow.'
          }
          cta={
            <div className='flex items-center gap-2 mt-2'>
              <button className='bg-black hover:bg-base-dark cursor-pointer text-lg text-white px-3 py-2 flex items-center gap-2'>
                <Md3P
                  size={24}
                  color='white'
                  onClick={() =>
                    window.open(
                      'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ13gmFbYioAfeatuD9a7p7K7zmbPcBoIysUAlPb3hGoL0UqNdLogD7Mq_4e3m-YQhO6ubJxuv6E',
                      '_blank'
                    )
                  }
                />
                <span> Schedule a Free Consultation</span>
              </button>
            </div>
          }
        />
        <div className='flex flex-col gap-5'>
          <FullWidthDropDown
            title={'Your Company Knowledge Library Topics'}
            Icon={AcademicCapIcon}
            bg='bg-[#ea2d2d]'
            bgdark='bg-[#ea2d2d]'
            highlight={'bg-black'}
            content={<DemoOffering />}
            bgContent={'bg-neutral-200 border'}
            open={true}
          />
          <FullWidthDropDown
            title={'Packaging School Course Offerings'}
            Icon={AcademicCapIcon}
            // cash={true}
            bg='bg-base-mid'
            bgdark='bg-base-dark'
            content={<LibraryCourseGrid courses={courses} />}
            highlight={'bg-clemson'}
            bgContent={'bg-neutral-200 border'}
          />
          <FullWidthDropDown
            title={'Learning of the Month'}
            Icon={BookmarkSquareIcon}
            bg='bg-base-mid'
            bgdark='bg-base-dark'
            content={<LibraryLessonGrid />}
            highlight={'bg-clemson'}
            bgContent={'bg-neutral-200 border'}
          />
          <div className='bg-neutral-200 rounded-xl'>
            <div className='mx-auto max-w-7xl px-6 py-12 lg:px-16 flex flex-col gap-12'>
              {/* <div className='flex flex-col lg:flex-row items-center bg-neutral-100/80 rounded-2xl px-6 py-9 shadow'>
                <div className='flex flex-col gap-4 pb-10 max-w-sm h-full justify-center'>
                  <h2 className='text-xl lg:text-2xl font-bold leading-10 tracking-tight text-gray-900'>
                    Looking to Learn More?
                  </h2>
                  <p className='text-neutral-600'>
                    Any courses you are looking for? Fill out the suggestion
                    form to let us know the courses and topics you would like to
                    explore.
                  </p>
                </div>
                <div className='w-full h-full bg-white border border-neutral-400 rounded-xl overflow-hidden'>
                  <textarea
                    rows={5}
                    className='w-full h-full leading-tight border-none p-3 focus:ring-0 resize-none placeholder:text-sm placeholder:text-neutral-400'
                    name='unilever-request'
                    id='unilever-request'
                    value={isForm}
                    onChange={(e) => setIsForm(e.target.value)}
                    placeholder='Enter your suggestions.'
                  />
                  <div className='flex w-full justify-end pr-3 mb-2 gap-6'>
                    {isError ? (
                      <div>
                        <span className='text-sm text-red-500'>
                          Error sending form.
                        </span>
                      </div>
                    ) : (
                      <></>
                    )}
                    <button
                      className=' bg-base-brand hover:bg-base-dark cursor-pointer text-white text-sm px-2 py-1.5 rounded'
                      onClick={submitHandler}
                    >
                      <div className={isSending ? 'animate-pulse' : ''}>
                        {isSending ? 'Sending' : isSent ? 'Sent!' : 'Submit'}
                      </div>
                    </button>
                  </div>
                </div>
              </div> */}
              <div className='mx-auto divide-y divide-gray-900/10 w-full'>
                <h2 className='text-2xl font-bold leading-10 tracking-tight text-gray-900'>
                  Frequently asked questions
                </h2>
                <dl className='mt-10 space-y-6 divide-y divide-gray-900/10'>
                  {faqs.map((faq) => (
                    <Disclosure as='div' key={faq.question} className='pt-6'>
                      {({ open }) => (
                        <>
                          <dt>
                            <Disclosure.Button className='flex w-full items-start justify-between text-left text-gray-900'>
                              <span className='text-base font-semibold leading-7'>
                                {faq.question}
                              </span>
                              <span className='ml-6 flex h-7 items-center'>
                                {open ? (
                                  <MinusSmallIcon
                                    className='h-6 w-6'
                                    aria-hidden='true'
                                  />
                                ) : (
                                  <PlusSmallIcon
                                    className='h-6 w-6'
                                    aria-hidden='true'
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </dt>
                          <Disclosure.Panel as='dd' className='mt-2 pr-12'>
                            <p className='text-base leading-7 text-gray-600'>
                              {faq.answer}
                            </p>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const res = await API.graphql({
    query: getCustomer,
    variables: { id: 'f98b155b-b06b-4f5a-822f-ddf47bca0a30' },
  });
  const customer = res.data.getCustomer;

  return {
    props: { customer },
  };
}

export default Page;
