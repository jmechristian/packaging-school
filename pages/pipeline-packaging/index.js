import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { useThinkificLink } from '../../hooks/useThinkificLink';
import { useRouter } from 'next/router';
import {
  MdSearch,
  MdOutlineTimer,
  MdOutlineBook,
  MdDownloadForOffline,
  MdOutlineBookmarkAdd,
} from 'react-icons/md';
import {
  getCourseByID,
  getAllLearningOfTheMonths,
  createNewOrder,
  getPipelineLibrary,
  getDeviceType,
} from '../../helpers/api';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Disclosure } from '@headlessui/react';
const ReactGoogleSlides = dynamic(() => import('react-google-slides'), {
  ssr: false,
});
import VideoPlayer from '../../components/VideoPlayer';

// Quarter unlock dates (quarters unlock at start of this date)
const Q2_START = new Date('2026-04-01');
const Q3_START = new Date('2026-07-01');
const Q4_START = new Date('2026-10-01');

const PIPELINE_QUARTERS = [
  {
    key: 'q1',
    title: 'Quarter 1: Foundations of Packaging',
    description:
      'Start your journey with the core principles of the packaging industry. These courses provide essential knowledge and a solid foundation for anyone new to packaging or looking to strengthen general competency.',
    courseIds: [
      'ff174f01-5f76-486c-8d7a-849d6d3ff914', // Packaging Foundations
      '78349554-27bf-4a86-b2e1-211afb3fa0cf', // Pressure-Sensitive Labels 101
    ],
    unlockDate: null, // Q1 is open from the start
    opensLabel: null,
  },
  {
    key: 'q2',
    title: 'Quarter 2: Materials & Processes',
    description:
      "Dive into the building blocks of packaging. Understand key materials, how they're used, and the production processes that bring packaging to life.",
    courseIds: [
      'f2fad11c-4548-41ea-b39d-be5a4913a4f5', // Polymers in Packaging
      '4e6c079e-b396-4762-8b7f-4fa4dea64969', // Glass & Metal Packaging
    ],
    unlockDate: Q2_START,
    opensLabel: 'April 1st 2026',
  },
  {
    key: 'q3',
    title: 'Quarter 3: Specialized Technical Knowledge',
    description:
      'Expand your technical expertise with focused, industry-specific courses that deepen your understanding of design, production, and material handling.',
    courseIds: [
      'f63dbfb7-6305-46bb-9845-cf7f17376491', // Introduction to Polymers and PET
      '2a6196ef-9e5d-4f8c-acb8-2892d3708060', // PET Industry Overview, Manufacture, and Properties
      '61f0df0d-f7db-4aa3-965e-1380e60ec92b', // Polymer to Preform
      '1dc2ecba-89ea-405f-b3dc-fb8a0f64cb55', // PET Preform to Bottle
      '3d20f52e-bb2c-403d-ace1-79cba15e8538', // Container Design and Development
      '95f76f6c-69bc-4fbd-901f-402a08fbd726', // Preform Design
      'ef3b8335-c72e-4670-aec9-6143d291cca3', // Barrier Container Technology
      'e482b49a-f451-42f7-b6fe-32341183c712', // PET Recycling
      'ee2f8da3-caca-4300-8e13-6aab4ee7bfb1', // Material Handling and Drying
      '06983941-9f1f-439b-b274-fe31bc32ce4f', // Blow Molding Processing
      'b5f23a45-d115-4958-bdb8-df64ceabdd15', // Preform Heating
    ],
    unlockDate: Q3_START,
    opensLabel: 'July 1st 2026',
  },
  {
    key: 'q4',
    title: 'Quarter 4: Sustainability & Innovation',
    description:
      'Prepare for the future of packaging by exploring sustainable solutions and emerging materials. Learn to design smarter and more forward-thinking packaging.',
    courseIds: [
      '73139212-0b15-4d96-9942-1757fa058fdf', // Sustainable Packaging
      'a8cced4f-d854-4bb5-9650-c55e686a6498', // Intro to Bioplastics for Packaging
    ],
    unlockDate: Q4_START,
    opensLabel: 'October 1st 2026',
  },
];

function isQuarterUnlocked(quarter, asOf = new Date()) {
  if (!quarter.unlockDate) return true; // Q1
  return asOf >= quarter.unlockDate;
}

function getTimeRemaining(targetDate) {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();
  if (diff <= 0)
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  const totalSeconds = Math.floor(diff / 1000);
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const totalHours = Math.floor(totalMinutes / 60);
  const hours = totalHours % 24;
  const days = Math.floor(totalHours / 24);
  return { days, hours, minutes, seconds, isPast: false };
}

const CountdownTimer = ({ targetDate }) => {
  const [mounted, setMounted] = useState(false);
  const [remaining, setRemaining] = useState({
    isPast: false,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const targetTime = targetDate.getTime();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const tick = () => setRemaining(getTimeRemaining(new Date(targetTime)));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [mounted, targetTime]);

  if (!mounted) {
    return (
      <p className='mt-2 text-sm font-medium text-[#0063BE] tabular-nums min-h-[1.25rem]'>
        —
      </p>
    );
  }

  if (remaining.isPast) return null;

  const parts = [];
  if (remaining.days > 0)
    parts.push(`${remaining.days} day${remaining.days !== 1 ? 's' : ''}`);
  parts.push(`${String(remaining.hours).padStart(2, '0')}h`);
  parts.push(`${String(remaining.minutes).padStart(2, '0')}m`);
  parts.push(`${String(remaining.seconds).padStart(2, '0')}s`);

  return (
    <p className='mt-2 text-sm font-medium text-[#0063BE] tabular-nums'>
      {parts.join(' ')}
    </p>
  );
};

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
          <div className='font-semibold leading-tight text-[#D3382C] w-full h-16 mt-1 line-clamp-3  max-w-[90%]'>
            <span className='text-gray-700 leading-tight'>{lesson.title}</span>
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
            className='w-full h-10 flex items-center justify-center bg-gray-900 text-white rounded-md cursor-pointer hover:bg-[#D3382C] transition-all duration-300'
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
  const { awsUser, location } = useSelector((state) => state.auth);
  const deviceType = getDeviceType();
  const { navigateToThinkific } = useThinkificLink();
  const [courseData, setCourseData] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    const orderId = await createNewOrder({
      courseDescription: courseData.subheadline,
      courseDiscount: 100,
      courseImage: courseData.seoImage,
      courseName: courseData.title,
      courseLink: `${courseData.link}?coupon=pipelinepackaging`,
      total: courseData.price,
      userID: awsUser ? awsUser.id : null,
      email: awsUser ? awsUser.email : null,
      name: awsUser ? awsUser.name : null,
      ipAddress: location.ip,
      country: location.country,
      device: deviceType,
      page: '/pipeline-packaging',
    });

    if (awsUser && awsUser.name.includes(' ')) {
      navigateToThinkific(
        `${courseData.link}?coupon=pipelinepackaging`,
        `${courseData.link}?coupon=pipelinepackaging`,
      );
    } else {
      router.push(`/order/${orderId.id}`);
    }
  };

  return (
    <div className='w-full h-full bg-[#f4f4f5] rounded-md pb-2 overflow-hidden'>
      <div className='flex flex-col'>
        <div className='w-full aspect-[16/9] bg-black'>
          {courseData && courseData.preview ? (
            <VideoPlayer
              videoEmbedLink={courseData.preview}
              light={courseData.seoImage || true}
              playing={false}
            />
          ) : (
            <div
              className='w-full aspect-[16/9] bg-cover bg-center'
              style={{
                backgroundImage: `url(${courseData && courseData.seoImage})`,
              }}
            ></div>
          )}
        </div>
        <div className='w-full flex flex-col gap-2 px-3 py-2'>
          <div className='font-semibold leading-tight text-[#D3382C] w-full h-10 mt-1 line-clamp-2 max-w-[80%]'>
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
            className='w-full h-10 flex items-center justify-center bg-gray-900 text-white rounded-md cursor-pointer hover:bg-[#D3382C] transition-all duration-300'
            // onClick={() => {
            //   window.open(
            //     courseData && courseData.link + '?coupon=pipelinepackaging',
            //     '_blank'
            //   );
            // }}
            onClick={() => {
              orderHandler();
            }}
          >
            {isLoading ? (
              <div className='w-full h-10 flex items-center justify-center bg-gray-900 text-white rounded-md cursor-pointer hover:bg-[#D3382C] transition-all duration-300'>
                <MdOutlineTimer className='animate-spin mr-2' /> Preparing...
              </div>
            ) : (
              'Enroll in Course'
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Page = ({ lib, learningOfTheMonths }) => {
  const faqs = [
    {
      id: 1,
      question: 'Who is my Pipeline Packaging contact?',
      answer:
        'If you have any questions about the curriculum or how to navigate your learning journey, please reach out to jnicolli@pipelinepackaging.com.',
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
      answer:
        'Refer to the slide deck / PDF at the top of the page or email info@packagingschool.com.',
    },
    {
      id: 4,
      question: 'How do I access new courses each quarter?',
      answer:
        'Each time you plan to enroll in a new course, come back to this page: packagingschool.com/pipeline-packaging. Be sure to bookmark it or save it as your homepage for easy access. This page will show the current quarter’s courses available for enrollment and allow you to preview upcoming quarters. ',
    },
  ];

  const [learningOfTheMonthQuery, setLearningOfTheMonthQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [bookmarkHint, setBookmarkHint] = useState(null);

  const handleAddBookmark = () => {
    const title = document.title || 'Pipeline Packaging | The Packaging School';
    const url = typeof window !== 'undefined' ? window.location.href : '';

    if (typeof window === 'undefined') return;

    // Firefox (legacy): can add via sidebar
    if (window.sidebar && window.sidebar.addPanel) {
      try {
        window.sidebar.addPanel(title, url, '');
        return;
      } catch (e) {
        // fall through to hint
      }
    }

    // IE / legacy Edge: AddFavorite
    if (window.external && typeof window.external.AddFavorite !== 'undefined') {
      try {
        window.external.AddFavorite(url, title);
        return;
      } catch (e) {
        // fall through to hint
      }
    }

    // Chrome, Safari, modern Edge: no JS API; show keyboard shortcut
    const isMac =
      typeof navigator !== 'undefined' &&
      /Mac|iPod|iPhone|iPad/.test(navigator.platform);
    const shortcut = isMac ? 'Cmd+D' : 'Ctrl+D';
    setBookmarkHint(shortcut);
    setTimeout(() => setBookmarkHint(null), 4000);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Add filtering before pagination
  const filteredItems = learningOfTheMonths.filter(
    (lesson) =>
      lesson.title
        .toLowerCase()
        .includes(learningOfTheMonthQuery.toLowerCase()) ||
      lesson.subhead
        .toLowerCase()
        .includes(learningOfTheMonthQuery.toLowerCase()),
  );

  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  return (
    <div className='w-full flex flex-col lg:pt-10 pb-40'>
      <Head>
        <title>Pipeline Packaging | The Packaging School</title>
        <meta name='robots' content='noindex,nofollow' />
      </Head>
      <div className='w-full max-w-7xl mx-auto lg:grid lg:grid-cols-12 lg:items-center relative'>
        <button
          type='button'
          onClick={handleAddBookmark}
          className='absolute top-0 right-4 z-20 flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 bg-white/90 hover:bg-white hover:text-[#D3382C] shadow-sm border border-gray-200/80 transition-colors focus:outline-none focus:ring-2 focus:ring-[#D3382C] focus:ring-offset-1'
          title='Add this page to your bookmarks'
          aria-label='Add bookmark'
        >
          <MdOutlineBookmarkAdd size={22} />
          <span className='text-sm font-medium'>Add Bookmark</span>
        </button>
        {bookmarkHint && (
          <div
            className='absolute top-14 right-4 z-20 px-3 py-2 rounded-lg bg-gray-800 text-white text-sm shadow-lg fade-in'
            role='status'
            aria-live='polite'
          >
            Press{' '}
            <kbd className='font-mono font-semibold px-1.5 py-0.5 bg-gray-700 rounded'>
              {bookmarkHint}
            </kbd>{' '}
            to bookmark
          </div>
        )}
        <div
          className='rounded-lg h-[180px] lg:h-[240px] row-span-full col-start-1 col-span-9 lg:self-center flex items-center relative'
          style={{
            backgroundImage: `url(${lib.backgroundImage})`,
          }}
        >
          <div className='absolute inset-0 opacity-90'></div>
          <div className='w-full lg:w-1/2 flex justify-center items-center gap-5 px-10 relative z-10'>
            <div className='w-[300px] lg:w-[350px]'>
              <Image
                src={`${lib.logo}`}
                alt='pipeline-logo'
                width={500}
                height={192}
              />
            </div>
          </div>
        </div>
        <div className='w-full flex flex-col bg-[#f4f4f5] rounded-lg aspect-[16/9] row-span-full col-span-6 col-start-7 lg:self-end lg:absolute lg:top-[50%]'>
          <div className='w-full aspect-[16/9]'>
            <ReactGoogleSlides
              width={'100%'}
              height={'100%'}
              slidesLink={`${lib.slide}`}
              position={1}
              showControls
              loop
            />
            <div
              className='flex items-center gap-1 justify-center mt-2 cursor-pointer'
              onClick={() => {
                window.open(`${lib.pdf}`, '_blank');
              }}
            >
              <div className='text-gray-700'>Download as PDF</div>
              <MdDownloadForOffline className='text-gray-700' size={20} />
            </div>
          </div>
        </div>
      </div>
      <div className='w-full max-w-7xl mx-auto flex flex-col gap-10 pl-4 pr-4 lg:pr-0 lg:pl-5 pt-8 pb-8 border-b border-gray-300'>
        <div className='w-full flex flex-col gap-5 mt-10 lg:mt-0'>
          <div
            className='max-w-xl w-full text-gray-700 flex flex-col gap-2'
            dangerouslySetInnerHTML={{ __html: lib.description }}
          />
        </div>
      </div>
      <div className='w-full max-w-7xl mx-auto px-4 py-10 flex flex-col gap-4'>
        <div className='flex flex-col gap-1'>
          <h3
            className={`text-2xl font-semibold  text-[#D3382C] uppercase tracking-widest`}
          >
            Learn. Grow. Advance.
          </h3>
          <h2
            className={`text-5xl font-semibold tracking-tight text-[#0063BE]`}
          >
            One Quarter at a Time
          </h2>
        </div>
        <p className='max-w-5xl text-gray-600 text-lg'>
          Each quarter, team members will have access to carefully selected
          courses from our curriculum, giving them the opportunity to complete
          all 18 courses over the year.
        </p>
        <p className='max-w-5xl text-gray-600 text-lg'>
          The courses are organized into four progressive groups, each designed
          to build skills step by step—from foundational knowledge to advanced
          expertise.
        </p>
      </div>
      {(() => {
        const psCourses =
          lib?.pschoolCourses?.items ?? lib?.pschoolCourses ?? [];
        const findCourse = (courseId) =>
          psCourses.find(
            (c) => c?.id === courseId || c?.thinkificId === courseId,
          );
        return PIPELINE_QUARTERS.map((quarter) => {
          const unlocked = isQuarterUnlocked(quarter);
          // Always render from quarter config so every quarter shows its courses
          // (library may not include all, e.g. Q4); use library course id when present
          const courseIdsToShow = quarter.courseIds;
          return (
            <div
              key={quarter.key}
              className='w-full max-w-7xl mx-auto flex flex-col gap-6 p-5 border-b bg-gray-200 rounded-lg mb-10'
            >
              <div className='flex flex-col gap-2 px-2'>
                <h2 className='text-2xl font-semibold tracking-tight text-[#0063BE] mt-3'>
                  {quarter.title}
                </h2>
                <p className='text-gray-600 max-w-3xl text-lg'>
                  {quarter.description}
                </p>
              </div>
              <div className='relative'>
                <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8 p-4'>
                  {courseIdsToShow.map((courseId) => {
                    const fromLib = findCourse(courseId);
                    const idForFetch =
                      fromLib?.id ?? fromLib?.thinkificId ?? courseId;
                    return (
                      <CourseCard
                        key={idForFetch}
                        course={idForFetch}
                        searchQuery={''}
                      />
                    );
                  })}
                </div>
                {!unlocked && quarter.opensLabel && (
                  <div
                    className='absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-gray-900/50'
                    aria-hidden
                  >
                    <div className='rounded-2xl border border-white/20 bg-white/90 px-8 py-5 text-center shadow-lg'>
                      <p className='text-lg font-semibold text-gray-900'>
                        Coming soon
                      </p>
                      <p className='mt-1 text-sm text-gray-600'>
                        Enrollment opens {quarter.opensLabel}
                      </p>
                      <CountdownTimer targetDate={quarter.unlockDate} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        });
      })()}

      <div className='w-full max-w-7xl mx-auto flex flex-col gap-10 p-4 border-y border-gray-300'>
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
              className='pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D3382C] focus:border-transparent'
            />
            <MdSearch className='absolute left-3 text-gray-400 text-xl' />
          </div>
        </div>
      </div>
      <div className='w-full max-w-7xl mx-auto flex flex-col gap-10 p-5 border-y border-gray-300'>
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {currentItems.map((lesson) => (
            <LOTMCard key={lesson.id} lesson={lesson} />
          ))}
        </div>
        {totalPages > 1 && (
          <div className='flex justify-center items-center gap-4 mt-5'>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`flex items-center gap-1 ${
                currentPage === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:text-[#D3382C]'
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
                  : 'text-gray-700 hover:text-[#D3382C]'
              } transition-all duration-300`}
            >
              →
            </button>
          </div>
        )}
      </div>
      <div className='mx-auto divide-y divide-gray-900/10 w-full max-w-7xl bg-[#f4f4f5] rounded-lg p-10 mt-10'>
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
                          <MinusIcon className='h-6 w-6' aria-hidden='true' />
                        ) : (
                          <PlusIcon className='h-6 w-6' aria-hidden='true' />
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
  );
};

export default Page;

export const getServerSideProps = async () => {
  const lib = await getPipelineLibrary();
  const learningOfTheMonths = await getAllLearningOfTheMonths();
  return { props: { lib, learningOfTheMonths } };
};
