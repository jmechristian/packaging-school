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
  getPPCLibrary,
  getDeviceType,
} from '../../helpers/api';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Disclosure } from '@headlessui/react';
const ReactGoogleSlides = dynamic(() => import('react-google-slides'), {
  ssr: false,
});
import VideoPlayer from '../../components/VideoPlayer';

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
  console.log(lib);
  const faqs = [
    {
      id: 1,
      question: 'Who is my Paperboard Packaging Council contact?',
      answer:
        'If you have any questions about the curriculum or how to navigate your learning journey, please reach out to info@paperboardpackagingcouncil.com.',
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

  const psCourses = [
    '2781c8c6-482e-406f-bbab-01c73c66a5ce',
    '85fc42f0-1292-4ac2-8720-c33742578045',
    '2930bbef-bfa9-4b09-883c-461b7eb96067',
    'ff01c335-370e-42a8-b1cd-0d9c9f65e7c6',
    '287ec6de-23a7-436b-bfb8-6b2170045494',
    '73139212-0b15-4d96-9942-1757fa058fdf',
  ];

  const spcCourses = [
    '5fc017b2-2149-40d7-a6d2-272afad2c4e3',
    '13c3013a-a246-4a02-b974-9d2e6c2254df',
    '02a237f0-3709-4c3a-8e02-47e04d8f1977',
    'b8a62fef-5d63-4730-8cb5-0e0a9aec7486',
    '4f1fdc1d-2a88-4ac3-9bd6-4b46a7b6ae08',
    '93ed9ccc-f7ab-49eb-b186-279e607101bb',
    '8bc8c4ff-6c1d-40cd-9a2e-e9a71e826fa8',
    '83b10e68-0bb0-44e6-a746-cfca4cbbe56e',
    'e0dcbb7d-5a5a-4e36-a907-772a60766ccd',
    '6584feb9-665f-4ee8-9690-9a46e9fb7d41',
    '0f5cad69-68eb-4af0-9ee6-af91ab1c8c22',
    '97bd5164-0560-4116-a8a0-5f1e09c586ca',
  ];
  const [learningOfTheMonthQuery, setLearningOfTheMonthQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [bookmarkHint, setBookmarkHint] = useState(null);

  const handleAddBookmark = () => {
    const title = document.title || 'Pa | The Packaging School';
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
    <div className='w-full flex flex-col lg:pt-10 pb-40 gap-12'>
      <Head>
        <title>Paperboard Packaging Council | The Packaging School</title>
        <meta name='robots' content='noindex,nofollow' />
      </Head>
      <div className='w-full max-w-7xl mx-auto lg:grid lg:grid-cols-12 lg:items-center relative'>
        <div
          className='rounded-lg h-[180px] lg:h-[240px] row-span-full col-start-1 col-span-12 lg:self-center flex items-center justify-between relative px-12'
          style={{
            backgroundImage: `url(${lib.backgroundImage})`,
          }}
        >
          {/* <div className='absolute inset-0 opacity-90'></div> */}
          <div className='w-full lg:w-1/2 gap-5 relative z-10'>
            <div className='w-[300px] lg:w-[400px]'>
              <Image
                src={`${lib.logo}`}
                alt='pipeline-logo'
                width={500}
                height={192}
              />
            </div>
          </div>
          <button
            type='button'
            onClick={handleAddBookmark}
            className=' flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 bg-white/90 hover:bg-white hover:text-[#D3382C] shadow-sm border border-gray-200/80 transition-colors focus:outline-none focus:ring-2 focus:ring-[#D3382C] focus:ring-offset-1'
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
        </div>
        {/* <div className='w-full flex flex-col bg-[#f4f4f5] rounded-lg aspect-[16/9] row-span-full col-span-6 col-start-7 lg:self-end lg:absolute lg:top-[50%]'>
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
        </div> */}
      </div>
      {/* Intro */}
      <div className='w-full grid lg:grid-cols-2 gap-10 max-w-7xl mx-auto'>
        <div className='flex flex-col gap-2'>
          <div
            className='text-gray-700 max-w-xl w-full text-lg flex flex-col gap-2 leading-normal'
            dangerouslySetInnerHTML={{ __html: lib.description }}
          ></div>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='w-full aspect-[16/9] h-full'>
            <ReactGoogleSlides
              width={'100%'}
              height={'100%'}
              slidesLink={`${lib.slide}`}
              position={1}
              showControls
              loop
            />
          </div>
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
      {/* PPCU */}
      <div className='w-full max-w-7xl mx-auto flex flex-col bg-[#DDDDDD] rounded-xl overflow-hidden'>
        <div className='grid grid-cols-5 w-full rounded-t-xl overflow-hidden'>
          <div className='col-span-3 bg-black flex items-center gap-0'>
            <div className='py-4 px-6'>
              <div
                className='w-12 h-12 bg-contain bg-center bg-no-repeat'
                style={{
                  backgroundImage: `url('https://packschool.s3.us-east-1.amazonaws.com/ppc-box.png')`,
                }}
              ></div>
            </div>
            <div className='text-white text-xl font-bold -ml-2'>
              Paperboard Packaging Council University
            </div>
          </div>
          <div className='col-span-2 bg-[#00AE42]'></div>
        </div>
        <div className='w-full grid grid-cols-5 gap-10 p-12'>
          <div className='col-span-3 flex flex-col gap-7 justify-center'>
            <div className='h2-base'>Folding Carton Essentials</div>
            <div className='text-gray-700 leading-snug text-lg max-w-2xl'>
              This course explores sustainability in paperboard packaging,
              covering responsible forestry, eco-friendly design, recycling,
              composting, and regulations. Gain practical, real-world insight to
              understand, apply, and help communicate the industry’s strong
              sustainability story.
            </div>
            <div>
              <button className='bg-[#0071CE] text-white px-4 py-2 rounded-md text-lg font-semibold'>
                Enroll Now &rarr;
              </button>
            </div>
          </div>
          <div className='col-span-2'>
            <div
              className='aspect-[4/3] bg-cover bg-center'
              style={{
                backgroundImage: `url('https://packschool.s3.us-east-1.amazonaws.com/ppc-card-back.png')`,
              }}
            ></div>
          </div>
        </div>
      </div>
      {/* PS */}
      <div className='w-full max-w-7xl mx-auto flex flex-col bg-[#DDDDDD] rounded-xl overflow-hidden'>
        <div className='grid grid-cols-5 w-full rounded-t-xl overflow-hidden'>
          <div className='col-span-3 bg-black flex items-center gap-0'>
            <div className='py-4 px-6'>
              <div
                className='w-12 h-12 bg-contain bg-center bg-no-repeat'
                style={{
                  backgroundImage: `url('https://packschool.s3.us-east-1.amazonaws.com/PS+Square+TM+White.png')`,
                }}
              ></div>
            </div>
            <div className='text-white text-xl font-bold -ml-2'>
              Packaging School Courses
            </div>
          </div>
          <div className='col-span-2 bg-clemson'></div>
        </div>
        <div className='w-full p-12'>
          <div className='col-span-3 grid grid-cols-4 gap-8'>
            {psCourses.map((course) => (
              <CourseCard key={course} course={course} />
            ))}
          </div>
        </div>
      </div>
      {/* SPC */}
      <div className='w-full max-w-7xl mx-auto flex flex-col bg-[#DDDDDD] rounded-xl overflow-hidden'>
        <div className='grid grid-cols-5 w-full rounded-t-xl overflow-hidden'>
          <div className='col-span-3 bg-black flex items-center gap-0'>
            <div className='py-4 px-6'>
              <div
                className='w-12 h-12 bg-contain bg-center bg-no-repeat'
                style={{
                  backgroundImage: `url('https://packschool.s3.us-east-1.amazonaws.com/SPC-crop.png')`,
                }}
              ></div>
            </div>
            <div className='text-white text-xl font-bold -ml-2'>
              Sustainable Packaging Coalition (SPC) Courses
            </div>
          </div>
          <div className='col-span-2 bg-[#039fca]'></div>
        </div>
        <div className='w-full p-12'>
          <div className='col-span-3 grid grid-cols-4 gap-8'>
            {spcCourses.map((course) => (
              <CourseCard key={course} course={course} />
            ))}
          </div>
        </div>
      </div>
      {/* Learning of the Month */}
      <div className='w-full max-w-7xl mx-auto flex flex-col gap-5 p-4 border-y border-gray-300'>
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

      {/* FAQS */}
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
  const lib = await getPPCLibrary();
  const learningOfTheMonths = await getAllLearningOfTheMonths();
  return { props: { lib, learningOfTheMonths } };
};
