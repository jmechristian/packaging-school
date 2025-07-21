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
import {
  MdCampaign,
  MdCelebration,
  Md3P,
  MdOutlineTimer,
  MdOutlineBook,
  MdDownloadForOffline,
  MdSearch,
} from 'react-icons/md';
import Image from 'next/image';
import { Disclosure } from '@headlessui/react';

import VideoPlayer from '../components/VideoPlayer';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useThinkificLink } from '../hooks/useThinkificLink';
import {
  getCourseByID,
  createNewOrder,
  acmeCourses,
  packagingSchoolCourses,
  getAllLearningOfTheMonths,
} from '../helpers/api';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
const ReactGoogleSlides = dynamic(() => import('react-google-slides'), {
  ssr: false,
});

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

const Page = ({ customer }) => {
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isForm, setIsForm] = useState('');
  const [isError, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [learningOfTheMonthQuery, setLearningOfTheMonthQuery] = useState('');
  const [learningOfTheMonths, setLearningOfTheMonths] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchLearningOfTheMonths = async () => {
      const data = await getAllLearningOfTheMonths();
      setLearningOfTheMonths(data);
    };
    fetchLearningOfTheMonths();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredItems = learningOfTheMonths.filter(
    (lesson) =>
      lesson.title
        .toLowerCase()
        .includes(learningOfTheMonthQuery.toLowerCase()) ||
      lesson.subhead
        .toLowerCase()
        .includes(learningOfTheMonthQuery.toLowerCase())
  );

  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const submitHandler = async () => {};

  const LOTMCard = ({ lesson }) => {
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    };

    return (
      <div className='w-full h-full bg-[#f4f4f5] rounded-md pb-2 overflow-hidden'>
        <div className='flex flex-col'>
          <div
            className='w-full aspect-[16/9] bg-black bg-cover bg-center'
            style={{
              backgroundImage: `url(${lesson.seoImage})`,
            }}
          ></div>
          <div className='w-full flex flex-col gap-2 px-3 py-2'>
            <div className='font-semibold leading-tight text-cummins-red w-full h-16 mt-1 line-clamp-3  max-w-[90%]'>
              <span className='text-gray-700 leading-tight'>
                {lesson.title}
              </span>
            </div>
            <div className='w-full h-7 border-y border-gray-300 flex items-center justify-between text-gray-700'>
              <div className='font-semibold text-xs'>
                {formatDate(lesson.createdAt)}
              </div>
              <div className='font-semibold flex items-center gap-1'>
                <MdOutlineTimer />
              </div>
            </div>
            <div className='text-xs text-gray-700 h-20 mb-2 line-clamp-5'>
              {lesson.subhead}
            </div>
            <div
              className='w-full h-10 flex items-center justify-center bg-gray-900 text-white rounded-md cursor-pointer hover:bg-cummins-red transition-all duration-300'
              onClick={() => {
                window.open(`/lessons/${lesson.slug}`, '_blank');
              }}
            >
              Read Lesson
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CourseCard = ({ course, searchQuery }) => {
    const router = useRouter();
    const { awsUser } = useSelector((state) => state.auth);
    const { navigateToThinkific } = useThinkificLink();
    const [courseData, setCourseData] = useState(null);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
      const fetchCourseData = async () => {
        const data = await getCourseByID(course);
        setCourseData(data);
        // Check if course matches search query
        if (searchQuery && data) {
          const matches = data.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
          setIsVisible(matches);
        } else {
          setIsVisible(true);
        }
      };
      fetchCourseData();
    }, [course, searchQuery]);

    if (!isVisible) return null;

    const orderHandler = async () => {
      const orderId = await createNewOrder({
        courseDescription: courseData.subheadline,
        courseDiscount: 0,
        courseImage: courseData.seoImage,
        courseName: courseData.title,
        courseLink: `${courseData.link}`,
        total: courseData.price,
        userID: awsUser ? awsUser.id : null,
        email: awsUser ? awsUser.email : null,
        name: awsUser ? awsUser.name : null,
      });

      if (awsUser && awsUser.name.includes(' ')) {
        navigateToThinkific(`${courseData.link}`, `${courseData.link}`);
      } else {
        router.push(`/order/${orderId.id}`);
      }
    };

    return (
      <div className='w-full h-full bg-[#f4f4f5] rounded-md pb-2 overflow-hidden'>
        <div className='flex flex-col'>
          {courseData && courseData.preview ? (
            <div className='w-full aspect-[16/9] bg-black'>
              <VideoPlayer
                videoEmbedLink={courseData && courseData.preview}
                light
              />
            </div>
          ) : (
            <div
              className='w-full aspect-[16/9] bg-cover bg-center'
              style={{
                backgroundImage: `url(${courseData && courseData.seoImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></div>
          )}
          <div className='w-full flex flex-col gap-2 px-3 py-2'>
            <div className='font-semibold leading-tight text-cummins-red w-full h-10 mt-1 line-clamp-2 max-w-[80%]'>
              {courseData && courseData.courseId}{' '}
              <span className='text-gray-700'>
                {courseData && courseData.title}
              </span>
            </div>
            <div className='w-full h-7 border-y border-gray-300 flex items-center justify-between text-sm text-gray-700'>
              <div className='flex items-center gap-1'>
                <div className='font-semibold line-through text-gray-400'>
                  ${courseData && courseData.price}
                </div>
                <div className='font-semibold'>$0</div>
              </div>

              <div className='font-semibold flex items-center gap-1'>
                {courseData && courseData.hours}
                <MdOutlineTimer /> / {courseData && courseData.lessons}{' '}
                <MdOutlineBook />
              </div>
            </div>
            <div className='text-xs text-gray-700 h-20 mb-2 line-clamp-5'>
              {courseData && courseData.shortDescription
                ? courseData.shortDescription
                : courseData && courseData.subheadline}
            </div>
            <div
              className='w-full h-10 flex items-center justify-center bg-gray-900 text-white rounded-md cursor-pointer hover:bg-cummins-red transition-all duration-300'
              // onClick={() => {
              //   window.open(
              //     courseData && courseData.link + '?coupon=cummins2025',
              //     '_blank'
              //   );
              // }}
              onClick={() => {
                orderHandler();
              }}
            >
              Begin Course
            </div>
          </div>
        </div>
      </div>
    );
  };

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
        <div className='flex items-center justify-center lg:justify-start md:!max-w-3xl lg:!max-w-7xl mx-auto gap-3'>
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
      <div className='w-full max-w-7xl mx-auto lg:!grid lg:!grid-cols-12 lg:!items-center relative py-10 px-4 xl:!px-0'>
        <div
          className='rounded-lg h-[180px] lg:!h-[240px] row-span-full col-start-1 col-span-9 lg:!self-center flex items-center relative'
          style={{
            backgroundImage: `url('https://packschool.s3.us-east-1.amazonaws.com/acme-white-solo.png')`,
            backgroundSize: '150px',
            backgroundRepeat: 'repeat',
          }}
        >
          <div className='absolute inset-0 bg-cummins-red opacity-[0.92] z-0'></div>
          <div className='absolute left-0 top-0 w-[85%] h-full bg-gradient-to-r from-cummins-red/90 via-cummins-red/90 to-transparent opacity-[0.92] z-5'></div>
          <div className='w-full lg:!w-1/2 flex justify-center items-center gap-5 px-10 relative z-10'>
            <div className='w-[180px] lg:!w-[220px]'>
              <Image
                src={
                  'https://packschool.s3.us-east-1.amazonaws.com/acme-white.png'
                }
                alt='acme-logo'
                width={522}
                height={214}
              />
            </div>
            <div className='text-white h2-base'>Welcome!</div>
          </div>
        </div>
        <div className='w-full flex flex-col bg-[#f4f4f5] rounded-lg aspect-[16/9] row-span-full col-span-6 col-start-7 lg:!self-end lg:!absolute lg:!top-[30%]'>
          <div className='w-full aspect-[16/9]'>
            <ReactGoogleSlides
              width={'100%'}
              height={'100%'}
              slidesLink={
                'https://docs.google.com/presentation/d/1njv_Q25JTyNzsDVjP7GqIq_U3Udfg7DSpgoBP-gqLWg/embed?start=false&loop=false&delayms=3000'
              }
              position={1}
              showControls
              loop
            />
            <div
              className='flex items-center gap-1 justify-center mt-2 cursor-pointer'
              onClick={() => {
                window.open(
                  'https://packschool.s3.us-east-1.amazonaws.com/Cummins-Library-Insturctions.pdf',
                  '_blank'
                );
              }}
            >
              <div className='text-gray-700'>Download as PDF</div>
              <MdDownloadForOffline className='text-gray-700' size={20} />
            </div>
          </div>
        </div>
      </div>
      <div className='w-full max-w-7xl mx-auto flex flex-col gap-10 pl-4 pr-4 lg:!pr-0 lg:!pl-0 pb-12 border-b border-gray-300 px-4 xl:!px-0'>
        <div className='w-full flex flex-col gap-5 mt-10 mb-5 lg:mt-0 px-6 xl:!px-0'>
          <div className='h3-base'>Welcome Your Members Here!</div>
          <div className='max-w-xl w-full text-gray-700 text-lg'>
            Customize your library with your own content and build the optimal
            collection for your employees from our database of over 4,000
            lessons. New content is added every month, keeping your team
            up-to-date with the latest trends and best practices to implement
            into your workflow.
          </div>
          <div className='flex items-center gap-2'>
            <button
              className='bg-slate-900 rounded-md hover:bg-clemson cursor-pointer text-lg text-white px-4 py-2 flex items-center gap-2'
              onClick={() =>
                window.open(
                  'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ13gmFbYioAfeatuD9a7p7K7zmbPcBoIysUAlPb3hGoL0UqNdLogD7Mq_4e3m-YQhO6ubJxuv6E',
                  '_blank'
                )
              }
            >
              <Md3P size={24} color='white' />
              <span> Schedule a Free Consultation</span>
            </button>
          </div>
        </div>
      </div>
      <div className='w-full max-w-7xl px-4 md:px-6 xl:!px-0 flex flex-col gap-16 py-5 mx-auto'>
        <div className='flex flex-col gap-5'>
          <div className='w-full max-w-7xl mx-auto flex flex-col gap-10 px-10 lg:!px-0 pb-5 border-b border-gray-300'>
            <div className='w-full flex flex-col lg:!flex-row items-center justify-between gap-5'>
              <div className='leading-snug max-w-lg w-full text-xl font-bold text-gray-700'>
                Your Company Knowledge Library Topics <br />
              </div>
              <div className='relative flex items-center'>
                <input
                  type='text'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder='Search courses...'
                  className='pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cummins-red focus:border-transparent'
                />
                <MdSearch className='absolute left-3 text-gray-400 text-xl' />
              </div>
            </div>
          </div>
          <div className='w-full max-w-7xl mx-auto lg:!mx-0 flex flex-col gap-10 px-10 pb-16 lg:!px-0 border-b border-gray-300'>
            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
              {acmeCourses.map((course) => (
                <CourseCard
                  key={course}
                  course={course}
                  searchQuery={searchQuery}
                />
              ))}
            </div>
          </div>
          <div className='w-full max-w-7xl mx-auto flex flex-col gap-10 px-10 lg:!px-0 pb-5 border-b border-gray-300'>
            <div className='w-full flex flex-col lg:!flex-row items-center justify-between gap-5'>
              <div className='leading-snug max-w-lg w-full text-xl font-bold text-gray-700'>
                Packaging School Course Offerings
              </div>
              <div className='relative flex items-center'>
                <input
                  type='text'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder='Search courses...'
                  className='pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cummins-red focus:border-transparent'
                />
                <MdSearch className='absolute left-3 text-gray-400 text-xl' />
              </div>
            </div>
          </div>
          <div className='w-full max-w-7xl mx-auto lg:!mx-0 flex flex-col gap-10 px-10 pb-5 lg:!px-0 border-b border-gray-300'>
            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
              {packagingSchoolCourses.map((course) => (
                <CourseCard
                  key={course}
                  course={course}
                  searchQuery={searchQuery}
                />
              ))}
            </div>
          </div>
          <div className='w-full max-w-7xl mx-auto flex flex-col gap-10 px-10 pt-5 pb-5 border-b border-gray-300'>
            <div className='w-full flex items-center justify-between'>
              <div className='leading-snug max-w-lg w-full text-xl font-bold text-gray-700'>
                Your Learning of the Month
              </div>
              <div className='relative flex items-center'>
                <input
                  type='text'
                  value={learningOfTheMonthQuery}
                  onChange={(e) => setLearningOfTheMonthQuery(e.target.value)}
                  placeholder='Search courses...'
                  className='pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cummins-red focus:border-transparent'
                />
                <MdSearch className='absolute left-3 text-gray-400 text-xl' />
              </div>
            </div>
          </div>
          <div className='w-full max-w-7xl mx-auto flex flex-col gap-10 px-10 pt-8 pb-8 border-b border-gray-300'>
            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
              {currentItems.map((lesson) => (
                <LOTMCard key={lesson.id} lesson={lesson} />
              ))}
            </div>
            {totalPages > 1 && (
              <div className='flex justify-center items-center gap-4 mt-8'>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className={`flex items-center gap-1 ${
                    currentPage === 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:text-cummins-red'
                  } transition-all duration-300`}
                >
                  ←
                </button>
                <span className='text-gray-700'>
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className={`flex items-center gap-1 ${
                    currentPage === totalPages
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:text-cummins-red'
                  } transition-all duration-300`}
                >
                  →
                </button>
              </div>
            )}
          </div>
          <div className='bg-neutral-200 rounded-xl'>
            <div className='mx-auto max-w-7xl px-6 py-12 lg:px-16 flex flex-col gap-12'>
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
