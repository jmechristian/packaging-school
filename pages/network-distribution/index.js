import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useThinkificLink } from '../../hooks/useThinkificLink';
import { useUser } from '@auth0/nextjs-auth0/client';
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
  getLNetworkLibrary,
} from '../../helpers/api';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Disclosure } from '@headlessui/react';
import VideoPlayer from '../../components/VideoPlayer';
import EnrollmentRequestModal from '../../components/network-distribution/EnrollmentRequestModal';
import {
  clearEnrollResume,
  consumePendingEnrollCourse,
} from '../../components/network-distribution/EnrollmentAuthPanel';

const LUCID_LIBRARY_PPTX_URL =
  'https://packschool.s3.us-east-1.amazonaws.com/Network-Distribution.pptx';

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
    <div className='w-full h-full bg-[#EBEBEB] rounded-md pb-2 overflow-hidden'>
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
            className='w-full h-10 flex items-center justify-center bg-[#4261FF] text-white rounded-md cursor-pointer hover:bg-[#3450e0] transition-all duration-300'
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
  request,
  enrollmentLookup,
  onEnroll,
  onOpenCourse,
  onOpenDashboard,
}) => {
  const [courseData, setCourseData] = useState(initialCourseData || null);
  const [isVisible, setIsVisible] = useState(true);

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

  const enrolled = isCourseEnrolled(courseData, enrollmentLookup);
  const status = request?.status;
  const ctaLabel = enrolled
    ? 'Already Enrolled'
    : status === 'PENDING'
      ? 'Pending Approval'
      : status === 'APPROVED'
        ? 'Open Course'
        : 'Enroll in Course';

  const ctaClass = enrolled
    ? 'bg-[#4261FF] text-white cursor-pointer hover:bg-[#3450e0]'
    : status === 'PENDING'
      ? 'bg-gray-400 text-white cursor-not-allowed'
      : 'bg-[#4261FF] text-white cursor-pointer hover:bg-[#3450e0]';

  return (
    <div className='w-full h-full bg-[#EBEBEB] rounded-md pb-2 overflow-hidden'>
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
            className={`w-full h-10 flex items-center justify-center rounded-md font-medium transition-all duration-300 ${ctaClass}`}
            onClick={() => {
              if (!courseData || (status === 'PENDING' && !enrolled)) return;
              if (enrolled) {
                onOpenDashboard();
                return;
              }
              if (status === 'APPROVED') {
                onOpenCourse(courseData);
                return;
              }
              onEnroll(courseData);
            }}
          >
            {ctaLabel}
          </div>
        </div>
      </div>
    </div>
  );
};

const THINKIFIC_DASHBOARD =
  'https://learn.packagingschool.com/enrollments?role=admin';

const courseKey = (course) => course?.id || course?.courseId;

const findRequestForCourse = (requests, course) =>
  requests.find((item) => item.courseId === courseKey(course));

const normalizeName = (value) =>
  String(value || '')
    .trim()
    .toLowerCase();

const isCourseEnrolled = (course, enrollmentLookup) => {
  if (!course || !enrollmentLookup) return false;
  if (
    course.thinkificId &&
    enrollmentLookup.ids.has(String(course.thinkificId))
  ) {
    return true;
  }
  const title = normalizeName(course.title);
  return Boolean(title && enrollmentLookup.names.has(title));
};

const buildEnrollLink = (course, code = 'networklibrary') => {
  const link = String(course?.link || '')
    .replace(/^Link:\s*/i, '')
    .trim();
  if (!link) return null;
  if (link.includes('coupon=')) return link;
  return `${link}${link.includes('?') ? '&' : '?'}coupon=${code}`;
};

const Page = ({ lib, learningOfTheMonths }) => {
  console.log(lib);
  const { user } = useUser();
  const { navigateToThinkific } = useThinkificLink();
  const [requests, setRequests] = useState([]);
  const [enrollmentLookup, setEnrollmentLookup] = useState({
    ids: new Set(),
    names: new Set(),
  });
  const [enrollCourse, setEnrollCourse] = useState(null);

  useEffect(() => {
    const saved = consumePendingEnrollCourse();
    if (saved) setEnrollCourse(saved);
  }, []);

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

  const cpsCourses = nonApcCourses
    .filter((c) => c?.courseId && c.courseId.startsWith('CPS'))
    .sort((a, b) => (a.courseId || '').localeCompare(b.courseId || ''));

  const faqs = [
    {
      id: 1,
      question: 'Who is my Network Distribution contact?',
      answer:
        'If you have any questions about the curriculum or how to navigate your learning journey, please reach out to opietersen@networkdistribution.com. ',
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
        'Refer to the slide deck / PDF at the top of the page or email opietersen@networkdistribution.com.',
    },
    {
      id: 4,
      question: 'How do I access new courses each quarter?',
      answer:
        'Each time you plan to enroll in a new course, come back to this page: packagingschool.com/network-distribution. Be sure to bookmark it or save it as your homepage for easy access. This page will show the current quarter’s courses available for enrollment and allow you to preview upcoming quarters. ',
    },
  ];

  const [learningOfTheMonthQuery, setLearningOfTheMonthQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [bookmarkHint, setBookmarkHint] = useState(null);

  const loadRequests = useCallback(async () => {
    if (!user?.email) {
      setRequests([]);
      return;
    }
    try {
      const response = await fetch(
        '/api/network-distribution/enrollment-requests?scope=mine',
      );
      const data = await response.json();
      setRequests(data.items || []);
    } catch (error) {
      console.error('Failed to load enrollment requests', error);
    }
  }, [user?.email]);

  const loadEnrollments = useCallback(async () => {
    if (!user?.email) {
      setEnrollmentLookup({ ids: new Set(), names: new Set() });
      return;
    }
    try {
      const response = await fetch(
        `/api/thinkific/get-enrollments?email=${encodeURIComponent(user.email)}`,
      );
      const data = await response.json();
      const items = (data.items || []).filter((item) => item.expired === false);
      setEnrollmentLookup({
        ids: new Set(items.map((item) => String(item.course_id))),
        names: new Set(items.map((item) => normalizeName(item.course_name))),
      });
    } catch (error) {
      console.error('Failed to load Thinkific enrollments', error);
      setEnrollmentLookup({ ids: new Set(), names: new Set() });
    }
  }, [user?.email]);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  useEffect(() => {
    loadEnrollments();
  }, [loadEnrollments]);

  const handleOpenDashboard = () => {
    navigateToThinkific(THINKIFIC_DASHBOARD, THINKIFIC_DASHBOARD);
  };

  const handleOpenCourse = (courseData) => {
    const enrollLink = buildEnrollLink(courseData);
    if (enrollLink) {
      navigateToThinkific(enrollLink, enrollLink);
    }
  };

  const handleAddBookmark = () => {
    const title =
      document.title || 'Network Distribution | The Packaging School';
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
        <title>Network Distribution | The Packaging School</title>
        <meta name='robots' content='noindex,nofollow' />
      </Head>
      <div className='w-full max-w-7xl mx-auto px-4 lg:px-0'>
        <div className='relative w-full overflow-hidden rounded-lg bg-[#0A1D3A]'>
          <Image
            src='/images/network-distribution-banner.png'
            alt='Network Distribution and Packaging Distributors of America'
            width={1024}
            height={267}
            className='w-full h-auto'
            priority
          />
          <button
            type='button'
            onClick={handleAddBookmark}
            className='absolute top-3 right-3 z-20 flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 bg-white/90 hover:bg-white hover:text-[#D3382C] shadow-sm border border-gray-200/80 transition-colors focus:outline-none focus:ring-2 focus:ring-[#D3382C] focus:ring-offset-1'
            title='Add this page to your bookmarks'
            aria-label='Add bookmark'
          >
            <MdOutlineBookmarkAdd size={22} />
            <span className='text-sm font-medium'>Add Bookmark</span>
          </button>
          {bookmarkHint && (
            <div
              className='absolute top-16 right-3 z-20 px-3 py-2 rounded-lg bg-gray-800 text-white text-sm shadow-lg fade-in'
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
      </div>
      <div className='w-full max-w-7xl mx-auto px-4 lg:px-0 pt-8 pb-8 border-b border-gray-300'>
        <div className='grid lg:grid-cols-2 gap-8 lg:gap-10 items-start'>
          <div
            className='w-full text-gray-700 flex flex-col gap-2'
            dangerouslySetInnerHTML={{ __html: lib.description }}
          />
          <div className='w-full flex flex-col bg-[#f4f4f5] rounded-lg'>
            <div className='w-full aspect-[16/9] overflow-hidden rounded-t-lg'>
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
      </div>
      <div className='w-full max-w-7xl mx-auto bg-[#0A1D3A] p-12 rounded-t-md flex flex-col gap-4'>
        <div className='w-full flex max-w-7xl mx-auto flex-col gap-4 items-start justify-start'>
          <h2 className='h1-base !font-light text-[#4261FF]'>
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
              className='bg-[#D2E5FF] text-black px-4 py-3 rounded-md font-semibold text-center hover:opacity-90 transition-opacity'
            >
              Track 1
            </a>
            <a
              href='#track-2'
              className='bg-[#D2E5FF] text-black px-4 py-3 rounded-md font-semibold text-center hover:opacity-90 transition-opacity'
            >
              Track 2
            </a>
            <a
              href='#track-3'
              className='bg-[#D2E5FF] text-black px-4 py-3 rounded-md font-semibold text-center hover:opacity-90 transition-opacity'
            >
              Track 3
            </a>
            <a
              href='#lotm'
              className='bg-[#D2E5FF] text-black px-4 py-3 rounded-md font-semibold text-center hover:opacity-90 transition-opacity'
            >
              Learning of the Month
            </a>
          </div>
        </div>
      </div>
      <div
        id='track-1'
        className='w-full max-w-7xl mx-auto bg-[#D2E5FF] text-black p-12 scroll-mt-24'
      >
        <div className='w-full flex max-w-7xl mx-auto flex-col gap-5 items-start justify-start'>
          <h4 className='h4-base text-[#0A1D3A]'>
            1. Certificate of Packaging Science (CPS) Track
          </h4>
          <div className='w-full flex text-black max-w-7xl gap-4 mx-auto text-lg mb-1'>
            A comprehensive 12-course professional certification program
            designed to build foundational and applied expertise across the
            packaging value chain. Topics include packaging materials, design,
            manufacturing, distribution, sustainability, and supply chain
            operations. The program culminates in a final certification exam
            validating mastery of core packaging competencies.
          </div>
        </div>
      </div>
      <div className='w-full max-w-7xl mx-auto bg-white p-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          <CourseCard
            key='CPS-00'
            course='CPS-00'
            courseData={{
              id: 'CPS-00',
              title: 'Certificate of Packaging Science Bundle',
              subheadline:
                'Enroll in all 12 courses and pass the final exam (enroll separately) to earn your certification—the fastest way to get certified.',
              link: 'https://learn.packagingschool.com/enroll/39015?price_id=39006&coupon=networklibrary',
              hours: '63',
              lessons: '643',
              videos: '10',
              price: '2400',
              seoImage:
                'https://files.cdn.thinkific.com/bundles/bundle_card_image_000/003/803/1507034685.original.jpg',
              slug: 'cps-bundle',
              thinkificBundleId: 3803,
            }}
            searchQuery=''
            request={findRequestForCourse(requests, { id: 'CPS-00' })}
            onEnroll={setEnrollCourse}
            onOpenCourse={handleOpenCourse}
            onOpenDashboard={handleOpenDashboard}
            enrollmentLookup={enrollmentLookup}
          />
          {cpsCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course.id}
              courseData={course}
              searchQuery=''
              request={findRequestForCourse(requests, course)}
              onEnroll={setEnrollCourse}
              onOpenCourse={handleOpenCourse}
              onOpenDashboard={handleOpenDashboard}
              enrollmentLookup={enrollmentLookup}
            />
          ))}
        </div>
      </div>
      <div
        id='track-2'
        className='w-full max-w-7xl mx-auto bg-[#D2E5FF] text-black p-12 scroll-mt-24'
      >
        <div className='w-full flex max-w-7xl mx-auto flex-col gap-5 items-start justify-start'>
          <h4 className='h4-base text-[#0A1D3A]'>
            2. Automotive Packaging Certificate Track (APC)
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
      <div className='w-full max-w-7xl mx-auto bg-white p-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          <CourseCard
            key='APC-00'
            course='APC-00'
            courseData={{
              id: 'APC-00',
              title: 'Automotive Packaging Certificate Bundle',
              subheadline:
                'Enroll in all 9 courses and pass the final exam (enroll separately) to earn your certification—the fastest way to get certified.',
              link: 'Link: https://packagingschool.com/enroll/623256?price_id=659662&coupon=networklibrary',
              hours: '29',
              lessons: '151',
              videos: '10',
              price: '2400',
              seoImage:
                'https://files.cdn.thinkific.com/bundles/bundle_card_image_000/031/389/1735935575.original.jpg',
              slug: 'apc-bundle',
              thinkificBundleId: 31389,
            }}
            searchQuery=''
            request={findRequestForCourse(requests, { id: 'APC-00' })}
            onEnroll={setEnrollCourse}
            onOpenCourse={handleOpenCourse}
            onOpenDashboard={handleOpenDashboard}
            enrollmentLookup={enrollmentLookup}
          />
          {apcCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course.id}
              courseData={course}
              searchQuery=''
              request={findRequestForCourse(requests, course)}
              onEnroll={setEnrollCourse}
              onOpenCourse={handleOpenCourse}
              onOpenDashboard={handleOpenDashboard}
              enrollmentLookup={enrollmentLookup}
            />
          ))}
        </div>
      </div>
      <div
        id='track-3'
        className='w-full max-w-7xl mx-auto bg-[#D2E5FF] text-black p-12 scroll-mt-24'
      >
        <div className='w-full flex max-w-7xl mx-auto flex-col gap-5 items-start justify-start'>
          <h4 className='h4-base text-[#0A1D3A]'>
            3. Certificate of Sustainable Packaging Track (CSP)
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
      <div className='w-full max-w-7xl mx-auto bg-white p-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          <CourseCard
            key='CSP-00'
            course='CSP-00'
            courseData={{
              id: 'CSP-00',
              title: 'Certificate of Sustainable Packaging Bundle',
              subheadline:
                'Enroll in all 5 courses and pass the final exam (enroll separately) to earn your certification—the fastest way to get certified.',
              link: 'https://lpackagingschool.com/enroll/3686568?price_id=4633347&coupon=networklibrary',
              hours: '17',
              lessons: '31',
              videos: '10',
              price: '2400',
              seoImage:
                'https://files.cdn.thinkific.com/bundles/bundle_card_image_000/358/972/1771518762.original.png',
              slug: 'csp-bundle',
              thinkificBundleId: 358972,
            }}
            searchQuery=''
            request={findRequestForCourse(requests, { id: 'CSP-00' })}
            onEnroll={setEnrollCourse}
            onOpenCourse={handleOpenCourse}
            onOpenDashboard={handleOpenDashboard}
            enrollmentLookup={enrollmentLookup}
          />
          {spcCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course.id}
              courseData={course}
              searchQuery=''
              request={findRequestForCourse(requests, course)}
              onEnroll={setEnrollCourse}
              onOpenCourse={handleOpenCourse}
              onOpenDashboard={handleOpenDashboard}
              enrollmentLookup={enrollmentLookup}
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
      <div className='mx-auto divide-y divide-gray-900/10 w-full max-w-7xl bg-[#D2E5FF] rounded-lg p-10 mt-10'>
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
      <EnrollmentRequestModal
        open={Boolean(enrollCourse)}
        course={enrollCourse}
        onClose={() => {
          clearEnrollResume();
          setEnrollCourse(null);
        }}
        onSubmitted={(item) => {
          if (item) {
            setRequests((prev) => {
              const without = prev.filter((req) => req.id !== item.id);
              return [item, ...without];
            });
          }
          loadRequests();
        }}
      />
    </div>
  );
};

export default Page;

export const getServerSideProps = async () => {
  const lib = await getLNetworkLibrary();
  const learningOfTheMonths = await getAllLearningOfTheMonths();
  return { props: { lib, learningOfTheMonths } };
};
