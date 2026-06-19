import React, { useEffect, useRef, useState } from 'react';
import { PlayIcon, StarIcon } from '@heroicons/react/24/solid';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { API } from 'aws-amplify';
import { useSelector } from 'react-redux';
import { listLMSCourses } from '../../../src/graphql/queries';
import {
  createNewOrder,
  getAllLearningOfTheMonths,
  getAuthors,
  getDeviceType,
  registgerCourseClick,
} from '../../../helpers/api';
import { useThinkificLink } from '../../../hooks/useThinkificLink';
import {
  trackAbLessonClick,
  trackAbMeetingClick,
  trackAbPdfClick,
} from '../../../libs/analytics';

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

const PROGRAMS = {
  BOOTCAMP: {
    href: 'https://packagingschool.com/courses/packaging-boot-camp-101',
    credential: 'Certificate of Completion',
    format: '100% online self-paced',
    commitment: '8 clock hours',
    access: '3-month access',
    price: '$179',
    details:
      'Foundational packaging principles to build practical fluency quickly.',
  },
  CPS: {
    href: 'https://packagingschool.com/certifications/get-to-know-cps',
    credential: 'Packaging School Certificate',
    format: '100% online self-paced',
    commitment: '60 clock hours, flexible pacing over 6 months',
    access: '6-months access',
    price: 'Certificate enrollment',
    details:
      'Comprehensive packaging curriculum with broad applicability across roles.',
  },
  CMPM: {
    href: 'https://packagingschool.com/certifications/get-to-know-cmpm',
    credential: 'Clemson University Certificate',
    format: '100% online self-paced',
    commitment: '80 clock hours, 12 week instructor-led program',
    access: '1-year access',
    price: 'Certificate enrollment',
    details:
      'Comprehensive packaging curriculum with broad applicability across roles.',
  },
};

const PROGRAM_COLUMNS = [
  {
    key: 'BOOTCAMP',
    title: 'Packaging Boot Camp 101',
    ctaLabel: 'BOOTCAMP',
    highlightDetails: false,
  },
  {
    key: 'CPS',
    title: 'Certificate of Packaging Science (CPS)',
    ctaLabel: 'Learn more',
    highlightDetails: false,
  },
  {
    key: 'CMPM',
    title: 'Certificate of Mastery in Packaging Management (CMPM)',
    ctaLabel: 'Learn more',
    highlightDetails: true,
  },
];

const COMPARISON_ROWS = [
  { key: 'credential', label: 'Credential' },
  { key: 'format', label: 'Format' },
  { key: 'commitment', label: 'Commitment' },
  { key: 'access', label: 'Access' },
  { key: 'price', label: 'Price' },
];

const CATALOG_TOPIC_LABELS = {
  AUTO: 'Automotive',
  BUSINESS: 'Business',
  DESIGN: 'Design',
  FOODANDBEVERAGE: 'Food & Beverage',
  INDUSTRY: 'Industry',
  MATERIALS: 'Materials',
  SUPPLYCHAIN: 'Supply Chain & Logistics',
  SUSTAINABILITY: 'Sustainability',
  PACKAGINGBASICS: 'Packaging Basics',
  PACKAGINGSCIENCE: 'Packaging Science',
  PACKAGINGDESIGN: 'Packaging Design',
};

const CATALOG_TOPIC_ORDER = [
  'BUSINESS',
  'DESIGN',
  'MATERIALS',
  'FOODANDBEVERAGE',
  'SUPPLYCHAIN',
  'AUTO',
  'INDUSTRY',
  'SUSTAINABILITY',
  'PACKAGINGBASICS',
  'PACKAGINGSCIENCE',
  'PACKAGINGDESIGN',
];

const buildEstimatedCount = (count) => {
  if (!Number.isFinite(count) || count <= 0) return '100+';
  if (count < 15) return String(count);
  const rounded = Math.max(10, Math.floor(count / 5) * 5);
  return `${rounded}+`;
};

const formatTopics = (topics) => {
  if (!topics?.length) return 'Business, Design, Materials, and more';
  if (topics.length === 1) return topics[0];
  if (topics.length === 2) return `${topics[0]} and ${topics[1]}`;
  return `${topics.slice(0, -1).join(', ')}, and ${topics[topics.length - 1]}`;
};

const LESSON_BREAKPOINTS = {
  mobileMax: 767,
  tabletMax: 1023,
};

const getLessonCardsPerView = (width) => {
  if (width <= LESSON_BREAKPOINTS.mobileMax) return 1;
  if (width <= LESSON_BREAKPOINTS.tabletMax) return 2;
  return 3;
};

const parseLessonTimestamp = (dateValue) => {
  if (!dateValue) return 0;
  const parsed = new Date(dateValue).getTime();
  return Number.isFinite(parsed) ? parsed : 0;
};

const getLessonSortDate = (lesson) => lesson?.backdate || lesson?.createdAt || null;

const formatLessonDate = (dateValue) => {
  if (!dateValue) return '';
  const parsed = new Date(dateValue);
  if (!Number.isFinite(parsed.getTime())) return '';
  return parsed.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const UUID_REGEX =
  /[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/gi;

const isUuid = (value) =>
  typeof value === 'string' &&
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value.trim(),
  );

const extractAuthorTokens = (rawAuthor) => {
  if (!rawAuthor) return [];

  if (Array.isArray(rawAuthor)) {
    return rawAuthor.map((value) => String(value || '').trim()).filter(Boolean);
  }

  if (typeof rawAuthor === 'string') {
    const trimmed = rawAuthor.trim();
    if (!trimmed) return [];

    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed.map((value) => String(value || '').trim()).filter(Boolean);
      }
    } catch {
      // fall through
    }

    const matches = trimmed.match(UUID_REGEX);
    if (matches?.length) {
      return Array.from(new Set(matches.map((value) => value.trim())));
    }

    return trimmed
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean);
  }

  return [String(rawAuthor).trim()].filter(Boolean);
};

const resolveLessonAuthorLabel = (rawAuthor, authorNameMap) => {
  const tokens = extractAuthorTokens(rawAuthor);
  if (!tokens.length) return 'Packaging School';

  const names = tokens
    .map((token) => {
      if (authorNameMap[token]) return authorNameMap[token];
      if (!isUuid(token)) return token;
      return null;
    })
    .filter(Boolean);

  if (!names.length) return 'Packaging School';
  return Array.from(new Set(names)).join(', ');
};

const HomeVariantB = ({
  columnCallouts = {},
  cmpmFormatCallout = null,
  cmpmDetailsCallout = null,
  secondaryCallout = null,
  lessonsSection = null,
}) => {
  const getCalloutConfig = (columnKey) => {
    const raw = columnCallouts[columnKey];
    if (!raw) return null;
    if (typeof raw === 'string') {
      return {
        label: raw,
        className: 'bg-clemson text-white',
      };
    }
    if (typeof raw === 'object' && raw.label) {
      return {
        label: raw.label,
        className: raw.className || 'bg-clemson text-white',
      };
    }
    return null;
  };
  const router = useRouter();
  const { awsUser, location } = useSelector((state) => state.auth);
  const { navigateToThinkific } = useThinkificLink();
  const [freeCourses, setFreeCourses] = useState([]);
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);
  const [catalogEstimate, setCatalogEstimate] = useState({
    count: 0,
    topics: [],
  });
  const [lotmLessons, setLotmLessons] = useState([]);
  const [lotmAuthorNames, setLotmAuthorNames] = useState({});
  const [isLoadingLotmLessons, setIsLoadingLotmLessons] = useState(
    Boolean(lessonsSection),
  );
  const [lessonCardsPerView, setLessonCardsPerView] = useState(3);
  const [lessonCarouselPage, setLessonCarouselPage] = useState(0);
  const lessonTouchStartRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const normalizeFreeCourse = (course) => {
      const rawPrice = String(course?.price ?? '')
        .trim()
        .toLowerCase();
      if (rawPrice === 'free') return true;
      if (rawPrice === '$0') return true;
      const numeric = Number(rawPrice.replace(/[^0-9.-]/g, ''));
      return Number.isFinite(numeric) && numeric === 0;
    };

    const getFreeCourses = async () => {
      setIsLoadingCourses(true);
      try {
        const res = await API.graphql({
          query: listLMSCourses,
          variables: {
            filter: {
              and: [{ type: { ne: 'CUSTOMER' } }, { type: { ne: 'HIDDEN' } }],
            },
            limit: 500,
          },
        });

        const items = res?.data?.listLMSCourses?.items || [];
        const normalized = items
          .filter(normalizeFreeCourse)
          .sort((a, b) => (a?.title || '').localeCompare(b?.title || ''))
          .slice(0, 4);
        setFreeCourses(normalized);

        const catalogItems = items.filter(Boolean);
        const courseOnlyItems = catalogItems.filter((item) => {
          const type = String(item?.type || '').toUpperCase();
          return type !== 'COLLECTION' && type !== 'COLLECTIONS';
        });
        const relevantItems = courseOnlyItems.length
          ? courseOnlyItems
          : catalogItems;

        const topicSet = new Set();
        relevantItems.forEach((item) => {
          (item?.categoryArray || []).forEach((rawCat) => {
            const cat = String(rawCat || '').toUpperCase();
            if (CATALOG_TOPIC_LABELS[cat]) topicSet.add(cat);
          });
        });

        const orderedTopics = CATALOG_TOPIC_ORDER.filter((cat) =>
          topicSet.has(cat),
        ).map((cat) => CATALOG_TOPIC_LABELS[cat]);

        setCatalogEstimate({
          count: relevantItems.length,
          topics: orderedTopics.slice(0, 7),
        });
      } catch (error) {
        console.error('Error loading free courses:', error);
        setFreeCourses([]);
        setCatalogEstimate({
          count: 0,
          topics: [],
        });
      } finally {
        setIsLoadingCourses(false);
      }
    };

    getFreeCourses();
  }, []);

  useEffect(() => {
    if (!lessonsSection) return;

    const getLessons = async () => {
      setIsLoadingLotmLessons(true);
      try {
        const items = await getAllLearningOfTheMonths();
        const sorted = [...items]
          .filter((item) => item?.id && item?.slug)
          .sort((a, b) => {
            const aDate = parseLessonTimestamp(getLessonSortDate(a));
            const bDate = parseLessonTimestamp(getLessonSortDate(b));
            return bDate - aDate;
          })
          .slice(0, 24);
        setLotmLessons(sorted);

        const authorIds = [
          ...new Set(
            sorted.flatMap((item) =>
              extractAuthorTokens(item?.author).filter((token) => isUuid(token)),
            ),
          ),
        ];
        if (authorIds.length) {
          const resolvedAuthors = await Promise.all(
            authorIds.map(async (authorId) => {
              try {
                const data = await getAuthors(authorId);
                return [authorId, data?.getAuthor?.name || null];
              } catch (error) {
                console.warn('Error loading lesson author:', authorId, error);
                return [authorId, null];
              }
            }),
          );

          setLotmAuthorNames(
            resolvedAuthors.reduce((acc, [authorId, name]) => {
              if (name) acc[authorId] = name;
              return acc;
            }, {}),
          );
        } else {
          setLotmAuthorNames({});
        }
      } catch (error) {
        console.error('Error loading LOTM lessons:', error);
        setLotmLessons([]);
        setLotmAuthorNames({});
      } finally {
        setIsLoadingLotmLessons(false);
      }
    };

    getLessons();
  }, [lessonsSection]);

  useEffect(() => {
    if (!lessonsSection || typeof window === 'undefined') return;

    const syncCardsPerView = () => {
      setLessonCardsPerView(getLessonCardsPerView(window.innerWidth));
    };

    syncCardsPerView();
    window.addEventListener('resize', syncCardsPerView);
    return () => window.removeEventListener('resize', syncCardsPerView);
  }, [lessonsSection]);

  const lessonPageCount = Math.max(
    1,
    Math.ceil((lotmLessons.length || 0) / lessonCardsPerView),
  );
  const currentLessonPage = lessonCarouselPage % lessonPageCount;
  const lessonPageStart = currentLessonPage * lessonCardsPerView;
  const visibleLessons = lotmLessons.slice(
    lessonPageStart,
    lessonPageStart + lessonCardsPerView,
  );

  useEffect(() => {
    setLessonCarouselPage((previous) => {
      if (lessonPageCount <= 1) return 0;
      return previous >= lessonPageCount ? 0 : previous;
    });
  }, [lessonPageCount]);

  const goToPreviousLessonPage = () => {
    setLessonCarouselPage((previous) =>
      previous === 0 ? lessonPageCount - 1 : previous - 1,
    );
  };

  const goToNextLessonPage = () => {
    setLessonCarouselPage((previous) => (previous + 1) % lessonPageCount);
  };

  const handleLessonTouchStart = (event) => {
    if (lessonCardsPerView !== 1) return;
    const touch = event.touches?.[0];
    if (!touch) return;
    lessonTouchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleLessonTouchEnd = (event) => {
    if (lessonCardsPerView !== 1 || lessonPageCount <= 1) return;
    const touch = event.changedTouches?.[0];
    if (!touch) return;

    const deltaX = touch.clientX - lessonTouchStartRef.current.x;
    const deltaY = touch.clientY - lessonTouchStartRef.current.y;
    const minSwipeDistance = 50;

    // Ignore short or mostly vertical gestures.
    if (Math.abs(deltaX) < minSwipeDistance || Math.abs(deltaX) < Math.abs(deltaY)) {
      return;
    }

    if (deltaX < 0) {
      goToNextLessonPage();
    } else {
      goToPreviousLessonPage();
    }
  };

  const handleOrderCourse = async (course) => {
    const safeLocation = {
      ip: location?.ip || '',
      country: location?.country || '',
      lat: location?.lat || '',
      long: location?.long || '',
    };

    await registgerCourseClick(
      course.id,
      router.asPath,
      safeLocation,
      course.link,
      'HOME',
    );

    const order = await createNewOrder({
      courseDescription: course.subheadline,
      courseDiscount: 0,
      courseImage: course.seoImage,
      courseName: course.title,
      courseLink: course.link,
      total: 0,
      userID: awsUser ? awsUser.id : null,
      email: awsUser ? awsUser.email : null,
      name: awsUser ? awsUser.name : null,
      ipAddress: safeLocation.ip,
      country: safeLocation.country,
      device: getDeviceType(),
      page: '/',
    });

    if (awsUser && awsUser.name && awsUser.name.includes(' ')) {
      navigateToThinkific(course.link, course.link);
    } else if (order?.id) {
      router.push(`/order/${order.id}`);
    }
  };

  return (
    <main className='w-full bg-white'>
      <section className='w-full max-w-7xl mx-auto px-4 lg:px-8 py-16 lg:py-24'>
        <h1 className='text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.1] text-slate-900 max-w-5xl text-center mx-auto'>
          Packaging is part of every business, but many people lack the skills
          to navigate its intricacies.
        </h1>
        <p className='mt-6 text-lg md:text-2xl text-slate-700 max-w-4xl leading-relaxed text-center mx-auto'>
          By mastering the language of packaging, you can enhance your resume
          and open a world of opportunities.
        </p>

        <div className='mt-12 block sm:!hidden space-y-5'>
          {PROGRAM_COLUMNS.map((column) => {
            const program = PROGRAMS[column.key];
            return (
              <div
                key={column.key}
                className='rounded-xl border border-slate-200 shadow-sm bg-white overflow-hidden'
              >
                <div className='bg-slate-900 px-5 py-4'>
                  {getCalloutConfig(column.key) ? (
                    <div className='mb-2'>
                      <span
                        className={`inline-flex items-center rounded-md px-2.5 py-1 text-[11px] uppercase tracking-wide font-semibold ${getCalloutConfig(column.key).className}`}
                      >
                        {getCalloutConfig(column.key).label}
                      </span>
                    </div>
                  ) : null}
                  <h3 className='text-white text-base font-semibold leading-snug'>
                    {column.title}
                  </h3>
                </div>
                <div className='divide-y divide-slate-100'>
                  {COMPARISON_ROWS.map((row, index) => (
                    <div
                      key={row.key}
                      className={`px-5 py-3.5 ${
                        index % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'
                      }`}
                    >
                      <div className='text-xs font-semibold uppercase tracking-wide text-slate-500'>
                        {row.label}
                      </div>
                      <div className='mt-1 text-sm text-slate-800 leading-relaxed'>
                        {program[row.key]}
                        {column.key === 'CMPM' &&
                        row.key === 'format' &&
                        cmpmFormatCallout ? (
                          <div className='mt-2 block'>
                            <span className='inline-flex items-center gap-1.5 rounded-md bg-violet-100 px-2 py-1 text-xs font-semibold text-violet-700'>
                              <StarIcon className='w-3.5 h-3.5 text-violet-700 shrink-0' />
                              {cmpmFormatCallout}
                            </span>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ))}
                  <div className='px-5 py-3.5 bg-emerald-100'>
                    <div className='text-xs font-semibold uppercase tracking-wide text-slate-600'>
                      Details
                    </div>
                    <div className='mt-1 text-sm text-slate-800 leading-relaxed'>
                        {column.highlightDetails ? (
                        <div>
                          <div>{program.details}</div>
                          {cmpmDetailsCallout ? (
                            <div className='mt-2 block'>
                              <span className='inline-flex items-center gap-1.5 rounded-md bg-violet-100 px-2 py-1 text-xs font-semibold text-violet-700'>
                                <StarIcon className='w-3.5 h-3.5 text-violet-700 shrink-0' />
                                {cmpmDetailsCallout}
                              </span>
                            </div>
                          ) : null}
                        </div>
                      ) : (
                        program.details
                      )}
                    </div>
                  </div>
                  <div className='px-5 py-3.5 bg-white'>
                    <div className='text-xs font-semibold uppercase tracking-wide text-slate-500'>
                      Learn more
                    </div>
                    <a
                      href={program.href}
                      className='mt-1 inline-block text-clemson font-semibold hover:underline text-sm'
                    >
                      {column.ctaLabel}
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className='mt-20 overflow-x-auto rounded-xl shadow-sm bg-white hidden sm:!block'>
          <table className='w-full min-w-[980px] bg-white'>
            <thead>
              <tr className='text-white text-[15px]'>
                <th className='text-left px-5 py-4 font-semibold align-top bg-transparent'>
                  <span className='sr-only'>Row labels</span>
                </th>
                {PROGRAM_COLUMNS.map((column, index) => (
                  <th
                    key={column.key}
                    className={`text-left px-6 py-6 font-semibold align-top bg-slate-900 ${
                      index === 0
                        ? 'rounded-tl-xl'
                        : 'border-l border-slate-700'
                    }`}
                  >
                    {getCalloutConfig(column.key) ? (
                      <div className='mb-2'>
                        <span
                          className={`inline-flex items-center rounded-md px-2.5 py-1 text-[11px] uppercase tracking-wide font-semibold ${getCalloutConfig(column.key).className}`}
                        >
                          {getCalloutConfig(column.key).label}
                        </span>
                      </div>
                    ) : null}
                    <div className='text-xl'>{column.title}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className='divide-y divide-slate-100 text-sm text-slate-700 border border-slate-200'>
              <tr className='odd:bg-white even:bg-slate-50/70'>
                <td className='px-5 py-4 font-semibold text-slate-900 bg-slate-50/70'>
                  Credential
                </td>
                <td className='px-5 py-4 border-l border-slate-200'>
                  {PROGRAMS.BOOTCAMP.credential}
                </td>
                <td className='px-5 py-4 border-l border-slate-200'>
                  {PROGRAMS.CPS.credential}
                </td>
                <td className='px-5 py-4 border-l border-slate-200'>
                  {PROGRAMS.CMPM.credential}
                </td>
              </tr>
              <tr className='odd:bg-white even:bg-slate-50/70'>
                <td className='px-5 py-4 font-semibold text-slate-900 bg-slate-50/70'>
                  Format
                </td>
                <td className='px-5 py-4 border-l border-slate-200'>
                  {PROGRAMS.BOOTCAMP.format}
                </td>
                <td className='px-5 py-4 border-l border-slate-200'>
                  {PROGRAMS.CPS.format}
                </td>
                <td className='px-5 py-4 border-l border-slate-200'>
                  {PROGRAMS.CMPM.format}
                  {cmpmFormatCallout ? (
                    <div className='mt-2 block'>
                      <span className='inline-flex items-center gap-1.5 rounded-md bg-violet-100 px-2 py-1 text-xs font-semibold text-violet-700'>
                        <StarIcon className='w-3.5 h-3.5 text-violet-700 shrink-0' />
                        {cmpmFormatCallout}
                      </span>
                    </div>
                  ) : null}
                </td>
              </tr>
              <tr className='odd:bg-white even:bg-slate-50/70'>
                <td className='px-5 py-4 font-semibold text-slate-900 bg-slate-50/70'>
                  Commitment
                </td>
                <td className='px-5 py-4 border-l border-slate-200'>
                  {PROGRAMS.BOOTCAMP.commitment}
                </td>
                <td className='px-5 py-4 border-l border-slate-200'>
                  {PROGRAMS.CPS.commitment}
                </td>
                <td className='px-5 py-4 border-l border-slate-200'>
                  {PROGRAMS.CMPM.commitment}
                </td>
              </tr>
              <tr className='odd:bg-white even:bg-slate-50/70'>
                <td className='px-5 py-4 font-semibold text-slate-900 bg-slate-50/70'>
                  Access
                </td>
                <td className='px-5 py-4 border-l border-slate-200'>
                  {PROGRAMS.BOOTCAMP.access}
                </td>
                <td className='px-5 py-4 border-l border-slate-200'>
                  {PROGRAMS.CPS.access}
                </td>
                <td className='px-5 py-4 border-l border-slate-200'>
                  {PROGRAMS.CMPM.access}
                </td>
              </tr>
              <tr className='odd:bg-white even:bg-slate-50/70'>
                <td className='px-5 py-4 font-semibold text-slate-900 bg-slate-50/70'>
                  Price
                </td>
                <td className='px-5 py-4 border-l border-slate-200'>
                  {PROGRAMS.BOOTCAMP.price}
                </td>
                <td className='px-5 py-4 border-l border-slate-200'>
                  {PROGRAMS.CPS.price}
                </td>
                <td className='px-5 py-4 border-l border-slate-200'>
                  {PROGRAMS.CMPM.price}
                </td>
              </tr>
              <tr>
                <td className='px-5 py-4 font-semibold text-slate-900 bg-emerald-100'>
                  Details
                </td>
                <td className='px-5 py-4 border-l border-slate-200 bg-emerald-100'>
                  {PROGRAMS.BOOTCAMP.details}
                </td>
                <td className='px-5 py-4 border-l border-slate-200 bg-emerald-100'>
                  {PROGRAMS.CPS.details}
                </td>
                <td className='px-5 py-4 border-l border-slate-200 bg-emerald-100'>
                  <div>{PROGRAMS.CMPM.details}</div>
                  {cmpmDetailsCallout ? (
                    <div className='mt-2 block'>
                      <span className='inline-flex items-center gap-1.5 rounded-md bg-violet-100 px-2 py-1 text-xs font-semibold text-violet-700'>
                        <StarIcon className='w-3.5 h-3.5 text-violet-700 shrink-0' />
                        {cmpmDetailsCallout}
                      </span>
                    </div>
                  ) : null}
                </td>
              </tr>
              <tr className='odd:bg-white even:bg-slate-50/70'>
                <td
                  aria-hidden='true'
                  className='relative p-0 bg-white border-transparent !border-0'
                >
                  <span className='pointer-events-none absolute -inset-px bg-white' />
                </td>
                <td className='px-5 py-4 border-l border-slate-200'>
                  <a
                    href={PROGRAMS.BOOTCAMP.href}
                    className='text-clemson font-semibold hover:underline'
                  >
                    Learn more
                  </a>
                </td>
                <td className='px-5 py-4 border-l border-slate-200'>
                  <a
                    href={PROGRAMS.CPS.href}
                    className='text-clemson font-semibold hover:underline'
                  >
                    Learn more
                  </a>
                </td>
                <td className='px-5 py-4 border-l border-slate-200'>
                  <a
                    href={PROGRAMS.CMPM.href}
                    className='text-clemson font-semibold hover:underline'
                  >
                    Learn more
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className='mt-12 w-full rounded-xl bg-slate-900 px-6 py-7 md:px-8 md:py-7 flex flex-col sm:!flex-row sm:!items-center sm:!justify-between gap-5'>
          <div className='space-y-1'>
            <h3 className='text-white text-xl md:text-2xl font-semibold leading-tight'>
              Speak with a real human about your best-fit path.
            </h3>
            <p className='text-slate-200 text-sm md:text-base'>
              Schedule a free 15-minute call with one of our live counselors.
            </p>
          </div>
          <a
            href='https://calendar.app.google/qUZMKuFbF7NhpxgL8'
            target='_blank'
            rel='noreferrer'
            className='inline-flex items-center justify-center rounded-md bg-clemson px-5 py-2.5 text-white text-sm font-semibold hover:opacity-90 transition whitespace-nowrap shrink-0 w-full sm:!w-auto'
            onClick={() => {
              trackAbMeetingClick({
                pagePath: '/',
                nextPath: 'https://calendar.app.google/qUZMKuFbF7NhpxgL8',
                source: 'homepage_primary_callout',
              });
            }}
          >
            Schedule Free 15-Minute Call
          </a>
        </div>

        {secondaryCallout ? (
          <div
            className={`mt-6 w-full rounded-xl px-6 py-7 md:px-8 md:py-7 flex flex-col sm:!flex-row sm:!items-center sm:!justify-between gap-5 ${
              secondaryCallout.className || 'bg-base-brand'
            }`}
          >
            <div className='space-y-1'>
              <h3 className='text-white text-xl md:text-2xl font-semibold leading-tight'>
                {secondaryCallout.title}
              </h3>
              {secondaryCallout.description ? (
                <p className='text-white/90 text-sm md:text-base'>
                  {secondaryCallout.description}
                </p>
              ) : null}
            </div>
            <a
              href={secondaryCallout.href}
              target={secondaryCallout.newTab ? '_blank' : undefined}
              rel={secondaryCallout.newTab ? 'noreferrer' : undefined}
              className={`inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold hover:opacity-90 transition whitespace-nowrap shrink-0 w-full sm:!w-auto ${
                secondaryCallout.buttonClassName || 'bg-white text-clemson'
              }`}
              onClick={() => {
                trackAbPdfClick({
                  pagePath: '/',
                  nextPath: secondaryCallout.href,
                  source: 'homepage_secondary_callout',
                });
              }}
            >
              {secondaryCallout.ctaLabel}
            </a>
          </div>
        ) : null}

        {lessonsSection ? (
          <div className='mt-12'>
            <h3 className='text-2xl md:text-3xl font-semibold text-slate-900 text-center'>
              {lessonsSection.title || 'Get Started Learning for Free'}
            </h3>
            <p className='mt-3 text-slate-600 text-center max-w-3xl mx-auto'>
              {lessonsSection.description ||
                'Explore our expansive free library of lessons and start learning on your schedule.'}
            </p>

            {isLoadingLotmLessons ? (
              <div
                className={`mt-10 grid gap-5 ${
                  lessonCardsPerView === 1
                    ? 'grid-cols-1'
                    : lessonCardsPerView === 2
                      ? 'grid-cols-2'
                      : 'grid-cols-3'
                }`}
              >
                {Array.from({ length: lessonCardsPerView }).map((_, i) => (
                  <div
                    key={i}
                    className='rounded-xl border border-slate-200 bg-white shadow-sm animate-pulse overflow-hidden'
                  >
                    <div className='aspect-video bg-slate-200' />
                    <div className='p-5 space-y-3'>
                      <div className='h-6 bg-slate-200 rounded w-11/12' />
                      <div className='h-4 bg-slate-200 rounded w-1/3' />
                      <div className='h-6 bg-slate-200 rounded w-2/3' />
                      <div className='h-4 bg-slate-200 rounded w-full' />
                      <div className='h-4 bg-slate-200 rounded w-5/6' />
                      <div className='h-10 bg-slate-200 rounded w-32' />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div onTouchStart={handleLessonTouchStart} onTouchEnd={handleLessonTouchEnd}>
                <div
                  className={`mt-10 grid gap-5 transition-all duration-300 ${
                    lessonCardsPerView === 1
                      ? 'grid-cols-1'
                      : lessonCardsPerView === 2
                        ? 'grid-cols-2'
                        : 'grid-cols-3'
                  }`}
                >
                  {visibleLessons.map((lesson) => {
                  const lessonHref = `/lessons/${lesson.slug}`;
                  const authorName = resolveLessonAuthorLabel(
                    lesson.author,
                    lotmAuthorNames,
                  );
                  const lessonDate = formatLessonDate(getLessonSortDate(lesson));
                  const lessonTags = (lesson?.tags?.items || [])
                    .map((entry) => entry?.tags?.tag)
                    .filter(Boolean)
                    .slice(0, 3);

                    return (
                      <article
                        key={lesson.id}
                        className='rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col'
                      >
                        <Link href={lessonHref} className='block'>
                          <div className='aspect-video bg-slate-100'>
                            {lesson.seoImage ? (
                              <div
                                className='h-full w-full bg-cover bg-center'
                                style={{ backgroundImage: `url(${lesson.seoImage})` }}
                              />
                            ) : null}
                          </div>
                        </Link>
                        <div className='p-5 flex flex-col grow'>
                          {lessonDate ? (
                            <p className='text-xs font-medium uppercase tracking-wide text-slate-500'>
                              {lessonDate}
                            </p>
                          ) : null}
                          <h4 className='text-lg font-semibold leading-snug text-slate-900'>
                            {lesson.title}
                          </h4>
                          <p className='mt-2 text-sm text-slate-600'>
                            By {authorName}
                          </p>
                          {lessonTags.length ? (
                            <div className='mt-3 flex flex-wrap gap-2'>
                              {lessonTags.map((tag) => (
                                <span
                                  key={`${lesson.id}-${tag}`}
                                className='inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700'
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          ) : null}
                          <p className='mt-3 text-sm leading-relaxed text-slate-700 grow'>
                            {lesson.subhead ||
                              'Read this free lesson from our library.'}
                          </p>
                          <Link
                            href={lessonHref}
                            onClick={() => {
                              trackAbLessonClick({
                                pagePath: '/',
                                nextPath: lessonHref,
                                source: 'homepage_free_lessons',
                                metadata: {
                                  lessonId: lesson.id,
                                  lessonSlug: lesson.slug,
                                },
                              });
                            }}
                            className='mt-5 inline-flex items-center justify-center rounded-md bg-black px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition w-full sm:w-auto'
                          >
                            Read more
                          </Link>
                        </div>
                      </article>
                    );
                  })}
                </div>

                <div className='mt-6 flex items-center justify-between gap-4'>
                  <button
                    type='button'
                    onClick={goToPreviousLessonPage}
                    disabled={lessonPageCount <= 1}
                    className='inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition disabled:opacity-40 disabled:cursor-not-allowed'
                  >
                    Previous
                  </button>

                  <div className='flex items-center gap-2'>
                    {Array.from({ length: lessonPageCount }).map((_, idx) => (
                      <button
                        key={idx}
                        type='button'
                        onClick={() => setLessonCarouselPage(idx)}
                        aria-label={`Go to lesson page ${idx + 1}`}
                        className={`h-2.5 w-2.5 rounded-full transition ${
                          idx === currentLessonPage
                            ? 'bg-black'
                            : 'bg-slate-300 hover:bg-slate-400'
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    type='button'
                    onClick={goToNextLessonPage}
                    disabled={lessonPageCount <= 1}
                    className='inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition disabled:opacity-40 disabled:cursor-not-allowed'
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : null}

        <div className='mt-16'>
          <h3 className='text-2xl md:text-3xl font-semibold text-slate-900 text-center'>
            Start with Free Courses
          </h3>
          <p className='mt-3 text-slate-600 text-center'>
            Explore free options and enroll directly.
          </p>

          {isLoadingCourses ? (
            <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6'>
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className='rounded-xl border border-slate-200 bg-white p-5 space-y-4 animate-pulse'
                >
                  <div className='aspect-video bg-slate-200 rounded-md'></div>
                  <div className='h-5 bg-slate-200 rounded w-3/4'></div>
                  <div className='h-4 bg-slate-200 rounded w-1/3'></div>
                  <div className='h-4 bg-slate-200 rounded w-full'></div>
                  <div className='h-10 bg-slate-200 rounded'></div>
                </div>
              ))}
            </div>
          ) : (
            <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6'>
              {freeCourses.map((course) => (
                <div
                  key={course.id}
                  className='rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm'
                >
                  <div className='relative w-full pt-[56.25%] bg-slate-100 overflow-hidden'>
                    {course.preview || course.demo ? (
                      <ReactPlayer
                        url={course.preview || course.demo}
                        width='100%'
                        height='100%'
                        className='absolute inset-0'
                        style={{ position: 'absolute', inset: 0 }}
                        controls
                        light={course.seoImage || false}
                      />
                    ) : (
                      <div
                        className='absolute inset-0 bg-cover bg-center'
                        style={{
                          backgroundImage: course.seoImage
                            ? `url(${course.seoImage})`
                            : 'none',
                        }}
                      >
                        <div className='absolute inset-0 bg-black/25 flex items-center justify-center'>
                          <div className='w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow'>
                            <PlayIcon className='w-5 h-5 text-slate-900 ml-0.5' />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className='p-5 h-[300px] flex flex-col'>
                    <h4 className='text-base font-semibold text-slate-900 leading-tight min-h-[42px]'>
                      {course.title}
                    </h4>
                    <div className='mt-4 flex items-center justify-between text-sm'>
                      <span className='inline-flex items-center rounded-full bg-emerald-100 text-emerald-700 px-2.5 py-1 font-semibold'>
                        FREE
                      </span>
                      <span className='text-slate-600 font-medium'>
                        {course.hours || 'N/A'} hours
                      </span>
                    </div>
                    <p className='mt-4 text-sm text-slate-600'>
                      {course.subheadline ||
                        'Learn key packaging concepts and build practical skills.'}
                    </p>
                    <div className='mt-auto pt-5'>
                      <button
                        onClick={() => handleOrderCourse(course)}
                        className='w-full inline-flex items-center justify-center rounded-md bg-clemson px-4 py-2.5 text-white text-sm font-semibold hover:opacity-90 transition'
                      >
                        Enroll Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className='mt-16 rounded-2xl border border-slate-200 bg-slate-50 px-6 py-12 md:px-10 md:py-16 text-center'>
          <h3 className='text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-900 leading-tight'>
            Explore the Full Catalog
          </h3>
          <p className='mt-5 text-base md:text-lg text-slate-700 max-w-4xl mx-auto leading-relaxed'>
            Explore approximately {buildEstimatedCount(catalogEstimate.count)}{' '}
            courses across {formatTopics(catalogEstimate.topics)}.
          </p>
          <Link
            href='/all_courses'
            className='mt-8 inline-flex items-center justify-center rounded-md bg-clemson px-6 py-3 text-white text-sm md:text-base font-semibold hover:opacity-90 transition'
          >
            View All Courses
          </Link>
        </div>
      </section>
    </main>
  );
};

export default HomeVariantB;
