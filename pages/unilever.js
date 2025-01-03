import React, { useState, useMemo } from 'react';
import WiredCourseCard from '../components/shared/WiredCourseCard';
import dynamic from 'next/dynamic';
import {
  MinusSmallIcon,
  PlusSmallIcon,
  ArrowTopRightOnSquareIcon,
  ArrowLongRightIcon,
  BookOpenIcon,
  AcademicCapIcon,
  ArchiveBoxIcon,
  BoltIcon,
  BriefcaseIcon,
  Cog6ToothIcon,
  SwatchIcon,
  TruckIcon,
  InformationCircleIcon,
  RocketLaunchIcon,
  SparklesIcon,
  SignalIcon,
  BookmarkSquareIcon,
} from '@heroicons/react/24/outline';
import { API } from 'aws-amplify';
import {
  ChevronRightIcon,
  FilmIcon,
  PlayCircleIcon,
  Square3Stack3DIcon,
  DocumentArrowDownIcon,
} from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';
import { Disclosure } from '@headlessui/react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

import Unilever from '../components/icons/Unilever';
import FullWidthDropDown from '../components/shared/FullWidthDropDown';
import NewCouseCard from '../components/shared/NewCouseCard';
import UnileverCourses from '../components/unilever/UnileverCourses';
import UnileverLessons from '../components/unilever/UnileverLessons';
import { getCustomer, listUnilevers } from '../src/graphql/queries';
import SPCLibraryModule from '../components/library/SPCLibraryModule';
import CustomerSearchLOTMContainer from '../components/customers/CustomerSearchLOTMContainer';
import CustomerSearchContainer from '../components/customers/CustomerSearchContainer';
import Head from 'next/head';
import WiredLessonCardToo from '../components/shared/WiredLessonCardToo';

const supportLinks = [
  {
    name: 'Packaging Bootcamp 101',
    href: '#',
    description:
      'This Boot Camp will serve as an introduction to the packaging industry and provide the fundamental knowledge necessary to get you up to speed.',
    icon: ArchiveBoxIcon,
    background: 'https://packschool.s3.amazonaws.com/bootcamp101.png',
    video: 'https://www.youtube.com/watch?v=L4Q6sZlXoe4',
    featured: true,
  },
  {
    name: 'Corrugated Containers',
    href: '#',
    description:
      'An informative course with easy to digest information that will teach you the art and science of corrugated containers.',
    icon: ArchiveBoxIcon,
    background: 'https://packschool.s3.amazonaws.com/corrugated.png',
    video: 'https://www.youtube.com/watch?v=ABLmndzcET4',
    featured: true,
  },
  {
    name: 'Packaging Design Workflow',
    href: 'https://learn.packagingschool.com/enroll/36830',
    description:
      'A course that provides the complete pathway of the design process from concept to manufacturing.',
    icon: BriefcaseIcon,
    background: 'https://packschool.s3.amazonaws.com/design-workflow.png',
    video: 'https://www.youtube.com/watch?v=-5ubOGuqaGo',
  },
  {
    name: 'Sales Operations for Printing and Packaging Professionals',
    href: 'https://learn.packagingschool.com/enroll/1774194',
    description:
      'Are you ready to have your front line sales people be your most powerful source of sustainably sourced revenue?',
    icon: BriefcaseIcon,
    background: 'https://packschool.s3.amazonaws.com/sales-operations.png',
    light: false,
    video:
      'https://player.vimeo.com/video/648732063?h=0bbaabf710&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
  },
  {
    name: 'Packaging Foundations',
    href: 'https://learn.packagingschool.com/enroll/35691',
    description:
      'An essential introduction to the art, science, and business of packaging.',
    icon: Cog6ToothIcon,
    background: 'https://packschool.s3.amazonaws.com/foundations.png',
    video: 'https://www.youtube.com/watch?v=L4Q6sZlXoe4',
  },
  {
    name: 'Introduction to Corrugated Design',
    href: 'https://learn.packagingschool.com/enroll/1882214',
    description:
      'Learn the fundamentals of corrugated, how to identify corrugated board, and how to use it.',
    icon: SwatchIcon,
    background: 'https://packschool.s3.amazonaws.com/scates.png',
    light: false,
    video: 'https://vimeo.com/556386520/0c6c7f3c26',
  },
  {
    name: 'Packaging Printing',
    href: 'https://learn.packagingschool.com/enroll/36826',
    description:
      'This course provides an overview of different printing methods and ties in the graphic development workflow.',
    icon: SwatchIcon,
    background: 'https://packschool.s3.amazonaws.com/packageprinting.png',
    video: 'https://www.youtube.com/watch?v=2UZ5hWzYZ9A',
  },
  {
    name: 'Sustainable Packaging',
    href: 'https://learn.packagingschool.com/enroll/36829',
    description:
      'Have you ever wondered how grocery store produce ships from the farm to the grocery store?',
    icon: ArchiveBoxIcon,
    background: 'https://packschool.s3.amazonaws.com/demo-video.png',
    video: 'https://www.youtube.com/watch?v=ynDhF_jYZn8',
    featured: true,
  },
  {
    name: 'Paperboard Cartons',
    href: 'paperboard-cartons',
    description:
      'Explore the capabilities of paperboard cartons in this course, and comprehend why it’s widely used across the packaging industry.',
    icon: ArchiveBoxIcon,
    background: 'https://packschool.s3.amazonaws.com/paperboardcartons.png',
    video: 'https://www.youtube.com/watch?v=YZ5tmiPh1Tw',
  },
  {
    name: 'Flexographic Print Fundamentals',
    href: 'https://learn.packagingschool.com/enroll/210496',
    description:
      'Master how to produce and troubleshoot flexographic printing to produce high quality work.',
    icon: SwatchIcon,
    background: 'https://packschool.s3.amazonaws.com/flexographic.png',
    video: 'https://youtu.be/nfznWqSAH4w',
  },
  {
    name: 'Packaging Machinery',
    href: 'https://learn.packagingschool.com/enroll/36823',
    description:
      'An online course that provides a thorough look at the machinery used to produce high volumes of quality packages.',
    icon: Cog6ToothIcon,
    background: 'https://packschool.s3.amazonaws.com/packagemachinery.png',
    video: 'https://www.youtube.com/watch?v=uvbv2gkIcZc',
  },
  {
    name: 'Packaging Laws and Regulations',
    href: 'https://learn.packagingschool.com/enroll/36828',
    description:
      'In this course, we map out the major regulatory agencies such as FDA, EPA, USDA, CFR, ASTM, and ISO. ',
    icon: TruckIcon,
    background: 'https://packschool.s3.amazonaws.com/regluations.png',
    video: 'https://www.youtube.com/watch?v=t5onp2Ey8Gg',
  },
  {
    name: 'Pack Design Workshop',
    href: 'https://learn.packagingschool.com/enroll/2330944',
    description:
      'Students completing the workshop will design and improve a paperboard carton or corrugated container and learn how to price and order production samples of their packaging. ',
    icon: SwatchIcon,
    background: 'https://packschool.s3.amazonaws.com/packcdesigncamp-1.png',
    video: '',
  },
  {
    name: 'Distribution Packaging',
    href: 'https://learn.packagingschool.com/enroll/36827',
    description:
      'An essential course that provides a thorough teaching of the distribution process and how to ensure packages remain intact through the duration of each stage. ',
    icon: TruckIcon,
    background: 'https://packschool.s3.amazonaws.com/distribution.png',
    video: 'https://www.youtube.com/watch?v=VS-pa7eRowg',
  },
  {
    name: 'IADD Diecutting Academy: Diecutting 101',
    href: 'https://learn.packagingschool.com/enroll/761677',
    description:
      'Diecutting 101 covers the fundamentals of diecutting; starting with an overview of the practice of this fabrication process. ',
    icon: TruckIcon,
    light: false,
    background: 'https://packschool.s3.amazonaws.com/diecutting.png',
    video: 'https://player.vimeo.com/video/332036673',
  },
];

const faqs = [
  {
    id: 1,
    question: 'Who is my Unilever contact?',
    answer:
      'If you have any questions regarding curriculum, reach out to ruth.alvarez@unilever.com.',
  },
  {
    id: 2,
    question: 'What if I run into technical difficulties?',
    answer:
      'We are happy to help at the Packaging School—email info@packagingschool.com.',
  },
  {
    id: 3,
    question: 'How do I sign up?',
    answer: `Refer to the slide deck/PDF at the top of the page or email ruth.alvarez@unilever.com`,
  },
];

const Page = ({ customer }) => {
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isForm, setIsForm] = useState('');
  const [isError, setError] = useState(false);

  const router = useRouter();
  const createDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
  };

  const submitHandler = async () => {
    setIsSending(true);
    const res = await fetch('/api/send-unilever-suggestion-form', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        suggestion: isForm,
      }),
    });

    if (res.status === 200) {
      setIsSending(false);
      setIsSent(true);
      setIsForm('');
    } else {
      setIsSending(false);
      setError(true);
    }
  };

  const pagePath = useMemo(() => {
    return router.asPath;
  }, [router]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMediaType, setIsMediaType] = useState('VIDEO');

  const { allLessons } = useSelector((state) => state.course_filter);

  const latestLesson = useMemo(() => {
    const lotm =
      allLessons &&
      [...allLessons]
        .filter((less) => less.type === 'LOTM')
        .sort((a, b) => {
          if (a.createdAt < b.createdAt) {
            return 1;
          }
          if (a.createdAt > b.createdAt) {
            return -1;
          }
        });
    return lotm;
  }, [allLessons]);

  const HighlightContent = ({ link }) => {
    return (
      <motion.div className='px-0 lg:px-6 w-fit mx-auto grid gap-12 md:gap-6 lg:gap-16 md:grid-cols-2 lg:grid-cols-3 md:pb-10 py-9 overflow-hidden'>
        <WiredCourseCard
          id={'a6769066-eda9-4f8f-aee9-579482d87ce0'}
          external={true}
          link_text={'Select Course'}
          Icon={AcademicCapIcon}
          callout={'Unilever Developed'}
        />
        <WiredCourseCard
          id={'ff174f01-5f76-486c-8d7a-849d6d3ff914'}
          external={true}
          Icon={AcademicCapIcon}
          callout={'Packaging School Course'}
        />
        <WiredLessonCardToo
          id={latestLesson && latestLesson[0].id}
          Icon={SignalIcon}
          callout={'Latest Lesson'}
          link_text={'View Lesson'}
        />
        {/* <NewCouseCard
        title={latestLesson && latestLesson[0].title}
        description={latestLesson && latestLesson[0].subhead}
        background={latestLesson && latestLesson[0].seoImage}
        link={`/lessons/${latestLesson && latestLesson[0].slug}`}
        link_text={'View Lesson'}
        Icon={SignalIcon}
        callout={'Latest Lesson'}
      /> */}
      </motion.div>
    );
  };

  const LessonContent = () => {
    return (
      <UnileverLessons
        id={'84558b1f-359a-4551-8832-c6c570171163'}
        supportLinks={
          allLessons &&
          allLessons
            .filter((less) => less.type === 'LOTM')
            .sort((a, b) => {
              if (a.createdAt < b.createdAt) {
                return 1;
              }
              if (a.createdAt > b.createdAt) {
                return -1;
              }
            })
        }
      />
    );
  };

  return (
    <>
      <Head>
        <title>Packaging School | Unilever</title>
        <meta name='robots' content='noindex,nofollow' />
      </Head>
      <div className='w-full max-w-7xl px-3 md:px-6 lg:px-0 flex flex-col gap-4 md:gap-6 py-3 md:py-6 lg:py-9 mx-auto'>
        {/* MAIN */}
        <div className='w-full bg-unilever-blue h-full rounded-lg pt-6 shadow-xl'>
          <div className='grid md:grid-cols-5 gap-4 md:gap-9 lg:max-w-6xl lg:mx-auto overflow-hidden w-full h-full'>
            <div className='flex justify-center w-full items-center md:col-span-2 lg:col-span-2'>
              <div>
                <Unilever style={'w-40 lg:w-72 p-3 h-full fill-white'} />
              </div>
            </div>
            <div className='flex w-full flex-col gap-4 p-3 md:p-6 lg:p-9 md:col-span-3 lg:col-span-3 lg:gap-x-16'>
              <div className='md:w-full  aspect-[16/9] md:max-w-none max-w-xs mx-auto bg-indigo-300 h-full flex items-center justify-center text-2xl'>
                <div className='w-full h-full '>
                  <iframe
                    src='https://docs.google.com/presentation/d/1frh5qJEeQQ-kMIKpSi3MHaamjPUlSHKCudoPHX8vDXs/embed?start=false&loop=false&delayms=3000'
                    frameBorder='0'
                    width='100%'
                    height='100%'
                    allowFullScreen
                  ></iframe>
                </div>
              </div>

              <div className='w-full flex max-w-xs md:max-w-none mx-auto flex-col items-center gap-2 bg-unilever-lightblue  shadow text-white rounded-lg py-4 cursor-pointer'>
                <div className='text-sm mb-1'>
                  Please choose your instruction method below.
                </div>
                <div className='w-fit grid grid-cols-2 gap-x-7 overflow-hidden'>
                  <div
                    className='w-16 h-16 rounded-full bg-unilever-blue hover:bg-unilever-darkblue cursor-pointer shadow-md flex items-center justify-center'
                    onClick={() => setIsMediaType('SLIDES')}
                  >
                    <div className='flex flex-col items-center justify-center'>
                      <div>
                        <Square3Stack3DIcon className='w-6 h-6 fill-white/80' />
                      </div>
                      <div className='text-xs font-bold text-white/80'>
                        Slides
                      </div>
                    </div>
                  </div>
                  <div
                    className='w-16 h-16 rounded-full bg-unilever-blue hover:bg-unilever-darkblue cursor-pointer shadow-md flex items-center justify-center'
                    onClick={() =>
                      window.open(
                        'https://packschool.s3.amazonaws.com/unilever-instructions-20240205.pdf',
                        '_blank'
                      )
                    }
                  >
                    <div className='flex flex-col items-center justify-center'>
                      <div>
                        <DocumentArrowDownIcon className='w-6 h-6 fill-white/80' />
                      </div>
                      <div className='text-xs font-bold text-white/80'>PDF</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='text-center text-white pt-6 md:pt-12'>
            <div className=' bg-black/40 rounded-lg py-4 px-6 w-full justify-center mx-auto flex items-center gap-3'>
              <div>
                <InformationCircleIcon className='w-8 h-8 md:w-6 md:h-6 stroke-white' />
              </div>
              <div className='text-left leading-tight text-sm md:text-base'>
                Find your library of courses below. If you have any questions,
                please reach out to{' '}
                <a
                  href='mailto:ruth.alvarez@unilever.com'
                  className='underline'
                >
                  ruth.alvarez@unilever.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* HIGHLIGHT */}

        {/* <FullWidthDropDown
          title={'featured'}
          Icon={BoltIcon}
          bg='bg-unilever-blue'
          bgdark='bg-unilever-darkblue'
          highlight={'bg-unilever-lightblue'}
          content={<HighlightContent />}
          open={true}
        /> */}

        {/* COURSES */}

        <FullWidthDropDown
          title={'Unilever Course Offerings'}
          Icon={AcademicCapIcon}
          bg='bg-unilever-blue'
          bgdark='bg-unilever-darkblue'
          content={
            <UnileverCourses
              supportLinks={supportLinks}
              id={'84558b1f-359a-4551-8832-c6c570171163'}
              courses={customer && customer.courses.items}
            />
          }
          highlight={'bg-unilever-lightblue'}
          bgContent={'bg-neutral-200 border'}
          open={true}
        />

        <FullWidthDropDown
          title={'Sustainable Packaging Coalition (SPC) Library Topics'}
          Icon={AcademicCapIcon}
          bg='bg-base-mid'
          bgdark='bg-base-dark'
          content={
            <SPCLibraryModule
              reference={'coupon=unileverspc'}
              path={pagePath}
            />
          }
          highlight={'bg-clemson'}
          bgContent={'bg-neutral-200 border'}
        />
        <FullWidthDropDown
          title={'Packaging School Course Offerings'}
          Icon={AcademicCapIcon}
          bg='bg-base-mid'
          bgdark='bg-base-dark'
          content={
            <CustomerSearchContainer
              reference={'coupon=ultps'}
              courses={customer && customer.courses.items}
              link_text='Select Course'
            />
          }
          highlight={'bg-clemson'}
          bgContent={'bg-neutral-200 border'}
        />

        {/* LOTM */}
        <FullWidthDropDown
          title={'Learning of the Month'}
          Icon={BookmarkSquareIcon}
          bg='bg-base-mid'
          bgdark='bg-base-dark'
          content={<CustomerSearchLOTMContainer />}
          highlight={'bg-clemson'}
          bgContent={'bg-neutral-200 border'}
        />

        <div className='bg-neutral-200 rounded-xl'>
          <div className='mx-auto max-w-7xl px-6 py-12 lg:px-16 flex flex-col gap-12'>
            <div className='flex flex-col lg:flex-row items-center bg-neutral-100/80 rounded-2xl px-6 py-9 shadow'>
              <div className='flex flex-col gap-4 pb-10 max-w-sm h-full justify-center'>
                <h2 className='text-xl lg:text-2xl font-bold leading-10 tracking-tight text-gray-900'>
                  Looking to Learn More?
                </h2>
                <p className='text-neutral-600'>
                  Any courses you are looking for? Fill out the suggestion form
                  to let us know the courses and topics you would like to
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
            </div>
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
    </>
  );
};

export async function getServerSideProps() {
  const res = await API.graphql({
    query: getCustomer,
    variables: { id: '84558b1f-359a-4551-8832-c6c570171163' },
  });
  const customer = res.data.getCustomer;

  return {
    props: { customer },
  };
}

export default Page;
