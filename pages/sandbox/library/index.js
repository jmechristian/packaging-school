import React, { useState } from 'react';
import Head from 'next/head';
import { API } from 'aws-amplify';
import { getCustomer } from '../../../src/graphql/queries';
import {
  MinusSmallIcon,
  PlusSmallIcon,
  BookmarkSquareIcon,
} from '@heroicons/react/24/outline';
import { HiAcademicCap } from 'react-icons/hi2';
import { Disclosure } from '@headlessui/react';
import { MdAutoStories } from 'react-icons/md';

import CustomerSearchContainer from '../../../components/customers/CustomerSearchContainer';
import BrutalFunctionButton from '../../../components/shared/BrutalFunctionButton';
import FullWidthDropDown from '../../../components/shared/FullWidthDropDown';
import CustomerSearchLOTMContainer from '../../../components/customers/CustomerSearchLOTMContainer';
import LibraryHeader from '../../../components/library/LibraryHeader';
import DemoOffering from '../../../components/library/DemoOffering';
import CustomerDropdown from '../../../components/customers/CustomerDropdown';
import StageOne from '../../../components/library/StageOne';

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

const courses = [
  {
    id: 'd2cef5c2-31f5-4e42-ba51-bfd9a5bc660a',
    courseId: '08fc6679-6728-43b7-977b-7d98ec04bfd5',
    clicks: 1,
    customerId: '84558b1f-359a-4551-8832-c6c570171163',
    createdAt: '2024-04-15T13:26:10.528Z',
    updatedAt: '2024-04-15T13:26:10.528Z',
  },
  {
    id: '908b2c57-c0fe-4716-b926-c92af86a539d',
    courseId: '0de2af71-d0f1-4ecc-a7d6-e0b235672ec9',
    clicks: 1,
    customerId: '84558b1f-359a-4551-8832-c6c570171163',
    createdAt: '2024-04-15T13:20:14.656Z',
    updatedAt: '2024-04-15T13:20:14.656Z',
  },
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
    id: '5e5d379b-e9df-4491-9c57-e4e924a36aff',
    courseId: '2a0796ab-7a60-455b-b6b2-f95697f1c338',
    clicks: 5,
    customerId: '84558b1f-359a-4551-8832-c6c570171163',
    createdAt: '2024-03-19T13:27:23.239Z',
    updatedAt: '2024-03-19T13:27:23.239Z',
  },
  {
    id: '8079d27e-992d-4024-8810-b1ed6f8ae5e6',
    courseId: '78349554-27bf-4a86-b2e1-211afb3fa0cf',
    clicks: 6,
    customerId: '84558b1f-359a-4551-8832-c6c570171163',
    createdAt: '2024-03-19T13:22:59.044Z',
    updatedAt: '2024-03-19T13:22:59.044Z',
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
  const [isStage, setIsStage] = useState(1);
  const [isTour, setIsTour] = useState(true);

  const submitHandler = async () => {};

  const forward = () => setIsStage((prevState) => prevState + 1);
  const cancel = () => {
    setIsStage(0);
    setIsTour(false);
  };

  return (
    <>
      <Head>
        <title>Packaging School | Acme</title>
        <meta name='robots' content='noindex,nofollow' />
      </Head>
      <div className='w-full relative'>
        {isTour ? (
          <div className='fixed inset-0 bg-black/50 z-30 flex justify-center items-center'>
            {isStage === 1 && (
              <div className='w-full max-w-2xl bg-white border-2 border-black p-10 flex flex-col gap-5 items-center'>
                <div className='h2-base'>Welcome to Your Library</div>
                <div className='text-center'>
                  Here, your employees can easily access all their custom
                  Packaging School content in one convenient place. Explore
                  tailored courses, resources, and materials designed to enhance
                  skills and knowledge in the packaging industry. Enjoy seamless
                  learning!
                </div>
                <div className='grid grid-cols-2 gap-5 items-center mt-5'>
                  <div className='w-fit cursor-pointer'>
                    <BrutalFunctionButton
                      text={'Skip Tour'}
                      background={'bg-neutral-400'}
                      textColor={'text-white/60'}
                      fn={() => cancel()}
                    />
                  </div>
                  <div className='w-full cursor-pointer'>
                    <BrutalFunctionButton
                      text={'Continue'}
                      background={'bg-clemson'}
                      textColor={'text-white'}
                      fn={() => forward()}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <></>
        )}
        <div className=' max-w-7xl mx-auto px-3 md:px-6 lg:px-0 flex flex-col gap-4 md:gap-24 py-5 md:py-6 lg:py-16 relative'>
          {isStage === 2 || isStage === 3 ? (
            <>
              <div className='absolute w-[1400px] z-40 bg-white left-1/2 -translate-x-1/2 py-10 -mt-10'>
                <div className='max-w-7xl mx-auto'>
                  <LibraryHeader
                    displayName={'Acme'}
                    email={'Bobbo@acme.com'}
                    logo={'https://packschool.s3.amazonaws.com/acme-logo.png'}
                  />
                </div>
                <div
                  className={`${
                    isStage === 3 ? 'left-1/2 top-full' : 'right-1/2 top-1/2'
                  } absolute w-full max-w-xl bg-white border-2 border-black p-10 flex flex-col gap-5 items-center`}
                >
                  <div className='h3-base'>Your Library, Your Branding</div>
                  <div className='text-center'>
                    Customize your library&apos;s branding and contact
                    information to reflect your unique identity and make it
                    easily recognizable to your employees.
                  </div>
                  <div className='grid grid-cols-2 gap-5 items-center mt-5'>
                    <div className='w-fit cursor-pointer'>
                      <BrutalFunctionButton
                        text={'Skip Tour'}
                        background={'bg-neutral-400'}
                        textColor={'text-white/60'}
                        fn={() => cancel()}
                      />
                    </div>
                    <div className='w-full cursor-pointer'>
                      <BrutalFunctionButton
                        text={'Continue'}
                        background={'bg-clemson'}
                        textColor={'text-white'}
                        fn={() => forward()}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <LibraryHeader
                displayName={'Acme'}
                email={'Bobbo@acme.com'}
                logo={'https://packschool.s3.amazonaws.com/acme-logo.png'}
              />
            </>
          ) : (
            <LibraryHeader
              displayName={'Acme'}
              email={'Bobbo@acme.com'}
              logo={'https://packschool.s3.amazonaws.com/acme-logo.png'}
            />
          )}

          <div className='flex flex-col gap-5'>
            <CustomerDropdown
              title={'Acme Knowledge Library Topics'}
              icon={<HiAcademicCap size={24} color='white' />}
              bg='bg-[#ea2d2d]'
              bgdark='bg-[#ea2d2d]'
              highlight={'bg-black'}
              content={<DemoOffering />}
              bgContent={'bg-white'}
              open={true}
            />
            <CustomerDropdown
              title={'Packaging School Course Offerings'}
              icon={<HiAcademicCap size={24} color='black' />}
              cash={true}
              bg='bg-base-mid'
              bgdark='bg-base-dark'
              content={
                <CustomerSearchContainer
                  reference={'ref=lt'}
                  courses={courses}
                  link_text={'Purchase Course'}
                />
              }
              highlight={'bg-clemson'}
              bgContent={'bg-neutral-200 border'}
            />
            <CustomerDropdown
              title={'Learning of the Month'}
              icon={<MdAutoStories size={20} color='black' />}
              bg='bg-base-mid'
              bgdark='bg-base-dark'
              content={<CustomerSearchLOTMContainer />}
              highlight={'bg-clemson'}
              bgContent={'bg-neutral-200 border'}
            />
            <div className='bg-neutral-200 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.20)]'>
              <div className='mx-auto max-w-7xl px-6 py-12 lg:px-16 lg:py-16 flex flex-col gap-16'>
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
                <div className='flex flex-col lg:flex-row items-center bg-neutral-100/80 px-9 py-12 shadow border border-black'>
                  <div className='flex flex-col gap-4 pb-10 max-w-sm h-full justify-center'>
                    <h2 className='text-xl lg:text-2xl font-bold leading-10 tracking-tight text-gray-900'>
                      Looking to Learn More?
                    </h2>
                    <p className='text-neutral-600'>
                      Any courses you are looking for? Fill out the suggestion
                      form to let us know the courses and topics you would like
                      to explore.
                    </p>
                  </div>
                  <div className='w-full h-full bg-white border border-neutral-400  overflow-hidden'>
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
                </div>
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
    variables: { id: 'fec13ccf-8b5c-497a-bccd-adb6d06820ea' },
  });
  const customer = res.data.getCustomer;

  return {
    props: { customer },
  };
}

export default Page;
