import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
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
  getLucidMotorsLibrary,
  getDeviceType,
} from '../../helpers/api';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Disclosure } from '@headlessui/react';
import VideoPlayer from '../../components/VideoPlayer';

const LUCID_LIBRARY_PPTX_URL =
  'https://packschool.s3.us-east-1.amazonaws.com/Lucid+Motors_ppt.pptx';

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

const CourseCard = ({
  course,
  courseData: initialCourseData,
  searchQuery,
  page = '/lucid-motors',
  code = 'lucidlibrary',
}) => {
  const router = useRouter();
  const { awsUser, location } = useSelector((state) => state.auth);
  const deviceType = getDeviceType();
  const { navigateToThinkific } = useThinkificLink();
  const [courseData, setCourseData] = useState(initialCourseData || null);
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialCourseData) {
      if (searchQuery) {
        const matches = initialCourseData.title
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase());
        setIsVisible(!!matches);
      }
      return;
    }
    const fetchCourseData = async () => {
      const data = await getCourseByID(course);
      setCourseData(data);
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
  }, [course, searchQuery, initialCourseData]);

  if (!isVisible) return null;

  const orderHandler = async () => {
    setIsLoading(true);
    const enrollLink = `${courseData.link}?coupon=${code}`;
    const orderId = await createNewOrder({
      courseDescription: courseData.subheadline,
      courseDiscount: 100,
      courseImage: courseData.seoImage,
      courseName: courseData.title,
      courseLink: enrollLink,
      total: courseData.price,
      userID: awsUser ? awsUser.id : null,
      email: awsUser ? awsUser.email : null,
      name: awsUser ? awsUser.name : null,
      ipAddress: location.ip,
      country: location.country,
      device: deviceType,
      page,
    });

    if (awsUser && awsUser.name.includes(' ')) {
      navigateToThinkific(enrollLink, enrollLink);
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
              videoEmbedLink={courseData && courseData.preview}
              light
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
            className='w-full h-10 flex items-center justify-center bg-gray-900 text-white rounded-md cursor-pointer hover:bg-gray-700 transition-all duration-300'
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
              <div className='w-full h-10 flex items-center justify-center bg-gray-900 text-white rounded-md cursor-pointer hover:bg-gray-700 transition-all duration-300'>
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
  const allCourses = lib?.pschoolCourses?.items ?? lib?.pschoolCourses ?? [];
  const apcCourses = allCourses
    .filter((c) => c?.courseId && c.courseId.startsWith('APC'))
    .sort((a, b) => (a.courseId || '').localeCompare(b.courseId || ''));
  const nonApcCourses = allCourses
    .filter((c) => !c?.courseId || !c.courseId.startsWith('APC'))
    .sort((a, b) => (a.courseId || '').localeCompare(b.courseId || ''));

  const spcCourses =
    lib?.clientCourses?.items.sort((a, b) =>
      (a.courseId || '').localeCompare(b.courseId || ''),
    ) ?? [];

  const faqs = [
    {
      id: 1,
      question: 'Who is my Lucid Motors contact?',
      answer:
        'If you have any questions about the curriculum or how to navigate your learning journey, please reach out to brianmclaughlin@lucidmotors.com. ',
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
        'Each time you plan to enroll in a new course, come back to this page: packagingschool.com/lucid-motors. Be sure to bookmark it or save it as your homepage for easy access. This page will show the current quarter’s courses available for enrollment and allow you to preview upcoming quarters. ',
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
        <title>Lucid Motors | The Packaging School</title>
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
          <div className='w-full aspect-[16/9] overflow-hidden rounded-lg'>
            <iframe
              src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(LUCID_LIBRARY_PPTX_URL)}`}
              className='w-full h-full min-h-[240px]'
              frameBorder='0'
              allowFullScreen
              title='How to Access Your Library'
            />
          </div>
          <div
            className='w-full flex items-center justify-center py-4 gap-1 cursor-pointer'
            onClick={() => {
              window.open(`${lib.pdf}`, '_blank');
            }}
          >
            <div>Download as PDF</div>
            <MdDownloadForOffline className='text-gray-700' size={20} />
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
      <div className='w-full max-w-7xl mx-auto bg-black p-12 rounded-t-md flex flex-col gap-4'>
        <div className='w-full flex max-w-7xl mx-auto flex-col gap-4 items-start justify-start'>
          <h2 className='h2-base !font-light text-[#d7be96]'>
            Choose Your Path Forward.
          </h2>
          <div className='w-full flex  text-white gap-4 max-w-5xl text-2xl leading-normal mb-1'>
            Advance your expertise through three targeted learning pathways
            built to meet evolving customer needs and industry innovation, on a
            timeline that works for you.
          </div>
          <div className='grid lg:grid-cols-4 gap-2'>
            <a
              href='#track-1'
              className='bg-[#f4f4f5] text-black px-4 py-3 rounded-md font-semibold text-center hover:opacity-90 transition-opacity'
            >
              Track 1
            </a>
            <a
              href='#track-2'
              className='bg-[#f4f4f5] text-black px-4 py-3 rounded-md font-semibold text-center hover:opacity-90 transition-opacity'
            >
              Track 2
            </a>
            <a
              href='#track-3'
              className='bg-[#f4f4f5] text-black px-4 py-3 rounded-md font-semibold text-center hover:opacity-90 transition-opacity'
            >
              Track 3
            </a>
            <a
              href='#lotm'
              className='bg-[#f4f4f5] text-black px-4 py-3 rounded-md font-semibold text-center hover:opacity-90 transition-opacity'
            >
              Learning of the Month
            </a>
          </div>
        </div>
      </div>
      <div
        id='track-1'
        className='w-full max-w-7xl mx-auto bg-[#d7be96] text-black p-12 scroll-mt-24'
      >
        <div className='w-full flex max-w-7xl mx-auto flex-col gap-5 items-start justify-start'>
          <h4 className='h4-base text-black'>
            <span className='text-2xl font-extrabold text-white mr-1'>1.</span>{' '}
            Automotive Packaging Certificate Track
          </h4>
          <div className='w-full flex text-black max-w-7xl gap-4 mx-auto text-lg mb-1'>
            The first fully online academic program designed to equip you with
            the professional skills needed to succeed in the automotive
            packaging industry. Ideal for packaging and logistics professionals
            at automotive suppliers and OEMs, as well as sales, customer
            service, and packaging engineers who support industrial and
            automotive packaging solutions. Complete all ten courses and pass
            the final exam to earn your certification or choose individual
            courses that best align with your professional goals.
          </div>
        </div>
      </div>
      <div className='w-full max-w-7xl mx-auto bg-[#f0f0f0] p-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {apcCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course.id}
              courseData={course}
              searchQuery=''
            />
          ))}
          <CourseCard
            key='APC-00'
            course='APC-00'
            courseData={{
              id: 'APC-00',
              title: 'Automotive Packaging Certificate Bundle',
              subheadline:
                'Enroll in all 9 courses and pass the final exam (enroll separately) to earn your certification—the fastest way to get certified.',
              link: 'https://learn.packagingschool.com/enroll/623256',
              hours: '29',
              lessons: '151',
              videos: '10',
              price: '2400',
              seoImage:
                'https://files.cdn.thinkific.com/bundles/bundle_card_image_000/031/389/1735935575.original.jpg',
              slug: 'apc-bundle',
            }}
            searchQuery=''
          />
        </div>
      </div>
      <div
        id='track-2'
        className='w-full max-w-7xl mx-auto bg-[#d7be96] text-black p-12 scroll-mt-24'
      >
        <div className='w-full flex max-w-7xl mx-auto flex-col gap-5 items-start justify-start'>
          <h4 className='h4-base text-black'>
            <span className='text-2xl font-extrabold text-white mr-1'>2.</span>{' '}
            Certificate of Sustainable Packaging Track
          </h4>
          <div className='w-full flex text-black max-w-7xl gap-4 mx-auto text-lg mb-1'>
            The Certificate of Sustainable Packaging is an entirely online
            program designed to strengthen your knowledge of sustainability,
            materials innovation, and responsible packaging design. Ideal for
            professionals across packaging, logistics, sales, and engineering,
            this pathway equips you to drive more sustainable solutions in your
            organization. You can complete the full certificate by finishing all
            courses and the final project module or pick and choose individual
            courses that align with your interests and goals.
          </div>
        </div>
      </div>
      <div className='w-full max-w-7xl mx-auto bg-[#f0f0f0] p-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {spcCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course.id}
              courseData={course}
              searchQuery=''
            />
          ))}
          <CourseCard
            key='CSP-00'
            course='CSP-00'
            courseData={{
              id: 'CSP-00',
              title: 'Certificate of Sustainable Packaging Bundle',
              subheadline:
                'Enroll in all four courses and pass the final pitch (enroll separately) to earn your certification—the fastest way to get certified.',
              link: 'https://learn.packagingschool.com/enroll/3686568',
              hours: '10',
              lessons: '33',
              videos: '5',
              price: '2400',
              seoImage:
                'https://files.cdn.thinkific.com/bundles/bundle_card_image_000/358/972/1771518762.original.png',
              slug: 'csp-bundle',
            }}
            searchQuery=''
          />
        </div>
      </div>
      <div
        id='track-3'
        className='w-full max-w-7xl mx-auto bg-[#d7be96] text-black p-12 scroll-mt-24'
      >
        <div className='w-full flex max-w-7xl mx-auto flex-col gap-5 items-start justify-start'>
          <h4 className='h4-base text-black'>
            <span className='text-2xl font-extrabold text-white mr-1'>3.</span>{' '}
            Flexible Learning: Packaging Science and Electives
          </h4>
          <div className='w-full flex text-black max-w-7xl gap-4 mx-auto text-lg mb-1'>
            The Flexible Learning pathway gives you the freedom to choose
            courses that best fit your interests and professional goals. This
            includes additional electives as well as the full range of Packaging
            Science courses. You can complete all Packaging Science courses and
            the final exam to earn a certificate or pick and choose individual
            courses without committing to a full track.
          </div>
        </div>
      </div>
      <div className='w-full max-w-7xl mx-auto bg-[#f0f0f0] p-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {nonApcCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course.id}
              courseData={course}
              searchQuery=''
            />
          ))}
        </div>
      </div>
      {/* LOTM */}
      <div
        className='w-full max-w-7xl mx-auto flex flex-col gap-10 p-4 border-y border-gray-300 mt-12 scroll-mt-24'
        id='lotm'
      >
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
  const lib = await getLucidMotorsLibrary();
  const learningOfTheMonths = await getAllLearningOfTheMonths();
  return { props: { lib, learningOfTheMonths } };
};
