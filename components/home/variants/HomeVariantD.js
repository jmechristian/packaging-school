import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  PlayIcon,
  StarIcon,
} from '@heroicons/react/24/solid';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
  getAllLearningOfTheMonths,
  getAllTestimonials,
  getAuthors,
} from '../../../helpers/api';
import { trackAbLessonClick, trackAbMeetingClick } from '../../../libs/analytics';

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

const MEETING_URL = 'https://calendar.app.google/qUZMKuFbF7NhpxgL8';
const TEAMS_URL = '/teams';
const CATALOG_URL = '/all_courses';

const PROGRAMS = [
  {
    key: 'BOOTCAMP',
    title: 'Packaging Boot Camp (101)',
    href: 'https://packagingschool.com/courses/packaging-boot-camp-101',
    price: '$179',
    headerClass: 'bg-base-mid',
    priceClass: 'text-base-dark',
    badge: { label: 'Crash Course', className: 'bg-brand-indigo text-white' },
    highlight: false,
    bestFit: 'I need packaging basics in one day.',
    depth: '1-day orientation',
    included: 'Packaging Boot Camp',
    build: 'Foundational packaging language and context',
    access: 'Access to Boot Camp',
    credential: 'Course completion',
  },
  {
    key: 'CPS',
    title: 'Certificate of Packaging Science (CPS)',
    href: 'https://packagingschool.com/certifications/get-to-know-cps',
    price: '$2,400',
    headerClass: 'bg-base-dark',
    priceClass: 'text-base-dark',
    badge: { label: 'Self-paced Certificate', className: 'bg-base-brand text-white' },
    highlight: false,
    bestFit:
      'I want comprehensive packaging knowledge for my role, resume, or entry into the industry.',
    depth: 'Comprehensive professional certificate',
    included:
      'Boot Camp + 11 additional courses that expand each foundational section',
    build:
      'Broad fluency across materials, design, manufacturing, sustainability, logistics, and business',
    access: '6 months of access to the full Packaging School course catalog',
    credential: 'Packaging School Certificate of Packaging Science',
  },
  {
    key: 'CMPM',
    title: 'Certificate of Mastery in Packaging Management (CMPM)',
    href: 'https://packagingschool.com/certifications/get-to-know-cmpm',
    price: '$7,000',
    headerClass: 'bg-clemson',
    priceClass: 'text-clemson-dark',
    badge: { label: 'Premiere, all inclusive', className: 'bg-brand-yellow text-black' },
    highlight: true,
    bestFit:
      'I want the full certificate path plus professor guidance through a custom project for my job and/or portfolio.',
    depth: '12-week guided program, completed on your schedule',
    included: 'CPS + professor guidance through a custom project',
    build:
      'Applied packaging mastery through a custom job- or portfolio-based project',
    access: '12 months of access to the full Packaging School course catalog',
    credential:
      'Clemson University Certificate of Mastery in Packaging Management',
  },
];

const COMPARISON_ROWS = [
  { key: 'bestFit', label: 'Best Fit' },
  { key: 'depth', label: 'Program Depth' },
  { key: 'included', label: "What's Included" },
  { key: 'build', label: 'What You Build' },
  { key: 'access', label: 'Learning Access' },
  { key: 'credential', label: 'Credential' },
];

const CREDIBILITY_POINTS = [
  'SC Commission on Higher Education License #5400',
  '100% online learning',
  'Self-paced and guided certificate options',
  'Built for professionals, teams, and organizations across the packaging value chain',
];

const BUSINESS_IMPACT_POINTS = [
  'Reduce confusion between departments.',
  'Improve packaging conversations with suppliers and customers.',
  'Build stronger resumes and career mobility.',
  'Support better decisions in design, materials, cost, sustainability, and logistics.',
  'Create a shared packaging language across teams.',
];

const VALUE_CHAIN_ROLES = [
  'Packaging engineers',
  'Sales professionals',
  'Designers',
  'Marketers',
  'Procurement teams',
  'Operations leaders',
  'Sustainability professionals',
  'Entrepreneurs',
  'Students entering the industry',
];

const TEAM_USE_CASES = [
  'New hire onboarding',
  'Sales team education',
  'Packaging engineering support',
  'Procurement and supplier conversations',
  'Sustainability and materials alignment',
  'Brand and product education',
  'Cross-functional team development',
];

// Employer / partner logos. Add an `href` (destination) per entry if/when
// provided; tiles without one render as static (non-clickable) cards.
const PARTNER_LOGOS = [
  { name: 'BMW', logo: 'https://packschool.s3.amazonaws.com/bmw.png', href: '' },
  {
    name: 'Starbucks',
    logo: 'https://packschool.s3.amazonaws.com/starbucks-coffee-logo.png',
    href: '',
  },
  { name: 'Coca-Cola', logo: 'https://packschool.s3.amazonaws.com/coke.png', href: '' },
  {
    name: 'Smurfit Westrock',
    logo: 'https://packschool.s3.us-east-1.amazonaws.com/sm-westrock.png',
    href: '',
  },
  { name: '3M', logo: 'https://packschool.s3.amazonaws.com/3m.png', href: '' },
  {
    name: 'Colgate-Palmolive',
    logo: 'https://packschool.s3.amazonaws.com/colgate.png',
    href: '',
  },
  {
    name: 'Cummins',
    logo: 'https://packschool.s3.us-east-1.amazonaws.com/cummins.png',
    href: '',
  },
  {
    name: 'Sustainable Packaging Coalition',
    logo: 'https://packschool.s3.us-east-1.amazonaws.com/SPC.png',
    href: '',
  },
  {
    name: 'Unilever',
    logo: 'https://packschool.s3.us-east-1.amazonaws.com/ul-black.png',
    href: '',
  },
  {
    name: 'Church & Dwight',
    logo: 'https://packschool.s3.us-east-1.amazonaws.com/cd-black.png',
    href: '',
  },
];

const DEFAULT_AVATAR =
  'https://packschool.s3.amazonaws.com/avatar_default.jpeg';

const TESTIMONIAL_MAX_CHARS = 420;
const TESTIMONIAL_ROTATE_MS = 7000;

const truncateText = (text, max = TESTIMONIAL_MAX_CHARS) => {
  const clean = String(text || '').trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max).replace(/\s+\S*$/, '').trimEnd()}…`;
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
      // fall through to token parsing
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

const SpeakWithHuman = ({
  source,
  label = 'Speak With a Human',
  className = 'bg-clemson text-white hover:bg-clemson-dark',
}) => (
  <a
    href={MEETING_URL}
    target='_blank'
    rel='noreferrer'
    onClick={() => {
      trackAbMeetingClick({
        pagePath: '/',
        nextPath: MEETING_URL,
        source,
      });
    }}
    className={`inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm md:text-base font-semibold shadow-sm transition hover:shadow-md ${className}`}
  >
    {label}
    <ArrowRightIcon className='h-4 w-4' />
  </a>
);

const HomeVariantD = () => {
  const [lotmLessons, setLotmLessons] = useState([]);
  const [lotmAuthorNames, setLotmAuthorNames] = useState({});
  const [isLoadingLessons, setIsLoadingLessons] = useState(true);
  const [lessonCardsPerView, setLessonCardsPerView] = useState(3);
  const [lessonCarouselPage, setLessonCarouselPage] = useState(0);
  const lessonTouchStartRef = useRef({ x: 0, y: 0 });

  const [testimonials, setTestimonials] = useState([]);
  const [isLoadingTestimonials, setIsLoadingTestimonials] = useState(true);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [isTestimonialPaused, setIsTestimonialPaused] = useState(false);
  const testimonialTouchStartRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const getLessons = async () => {
      setIsLoadingLessons(true);
      try {
        const items = await getAllLearningOfTheMonths();
        const sorted = [...items]
          .filter((item) => item?.id && item?.slug)
          .sort(
            (a, b) =>
              parseLessonTimestamp(getLessonSortDate(b)) -
              parseLessonTimestamp(getLessonSortDate(a)),
          )
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
        setIsLoadingLessons(false);
      }
    };

    getLessons();
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const syncCardsPerView = () => {
      setLessonCardsPerView(getLessonCardsPerView(window.innerWidth));
    };

    syncCardsPerView();
    window.addEventListener('resize', syncCardsPerView);
    return () => window.removeEventListener('resize', syncCardsPerView);
  }, []);

  useEffect(() => {
    const getTestimonials = async () => {
      setIsLoadingTestimonials(true);
      try {
        const items = (await getAllTestimonials()) || [];
        // Show every testimonial, unfiltered.
        setTestimonials(items);
      } catch (error) {
        console.error('Error loading testimonials:', error);
        setTestimonials([]);
      } finally {
        setIsLoadingTestimonials(false);
      }
    };

    getTestimonials();
  }, []);

  const testimonialCount = testimonials.length;

  useEffect(() => {
    setTestimonialIndex((previous) =>
      testimonialCount === 0 ? 0 : previous % testimonialCount,
    );
  }, [testimonialCount]);

  useEffect(() => {
    if (isTestimonialPaused || testimonialCount <= 1) return undefined;
    const timer = window.setInterval(() => {
      setTestimonialIndex((previous) => (previous + 1) % testimonialCount);
    }, TESTIMONIAL_ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [isTestimonialPaused, testimonialCount]);

  const activeTestimonial = useMemo(
    () => (testimonialCount ? testimonials[testimonialIndex % testimonialCount] : null),
    [testimonials, testimonialIndex, testimonialCount],
  );

  const goToPreviousTestimonial = () => {
    if (testimonialCount <= 1) return;
    setTestimonialIndex((previous) =>
      previous === 0 ? testimonialCount - 1 : previous - 1,
    );
  };

  const goToNextTestimonial = () => {
    if (testimonialCount <= 1) return;
    setTestimonialIndex((previous) => (previous + 1) % testimonialCount);
  };

  const handleTestimonialTouchStart = (event) => {
    const touch = event.touches?.[0];
    if (!touch) return;
    testimonialTouchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTestimonialTouchEnd = (event) => {
    if (testimonialCount <= 1) return;
    const touch = event.changedTouches?.[0];
    if (!touch) return;
    const deltaX = touch.clientX - testimonialTouchStartRef.current.x;
    const deltaY = touch.clientY - testimonialTouchStartRef.current.y;
    if (Math.abs(deltaX) < 50 || Math.abs(deltaX) < Math.abs(deltaY)) return;
    if (deltaX < 0) {
      goToNextTestimonial();
    } else {
      goToPreviousTestimonial();
    }
  };

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

    if (
      Math.abs(deltaX) < minSwipeDistance ||
      Math.abs(deltaX) < Math.abs(deltaY)
    ) {
      return;
    }

    if (deltaX < 0) {
      goToNextLessonPage();
    } else {
      goToPreviousLessonPage();
    }
  };

  const lessonGridClass =
    lessonCardsPerView === 1
      ? 'grid-cols-1'
      : lessonCardsPerView === 2
        ? 'grid-cols-2'
        : 'grid-cols-3';

  return (
    <main className='w-full bg-white'>
      {/* Hero */}
      <section className='relative overflow-hidden bg-dark'>
        <div
          className='pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-base-brand/30 blur-3xl'
          aria-hidden='true'
        />
        <div
          className='pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-clemson/20 blur-3xl'
          aria-hidden='true'
        />
        <div className='relative mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-28 text-center'>
          <span className='inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs md:text-sm font-semibold uppercase tracking-wide text-base-light ring-1 ring-inset ring-white/15'>
            <StarIcon className='h-4 w-4 text-brand-yellow' />
            Powered by Clemson University packaging expertise
          </span>
          <h1 className='mx-auto mt-8 max-w-4xl text-4xl font-semibold leading-[1.08] text-white md:text-5xl lg:text-6xl'>
            Learn the Language of Packaging.{' '}
            <span className='text-brand-yellow'>
              Make Better Packaging Decisions.
            </span>
          </h1>
          <p className='mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-300 md:text-xl'>
            Packaging touches every business, but most professionals and teams
            lack a shared understanding of materials, design, sustainability,
            supply chain, and packaging decisions. Packaging School gives
            individuals and organizations a practical online path to build
            packaging fluency, earn credible credentials, and make better
            packaging decisions with confidence.
          </p>
          <div className='mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row'>
            <SpeakWithHuman source='variant_d_hero' />
            <Link
              href='#programs'
              className='inline-flex items-center justify-center gap-2 rounded-lg bg-white/10 px-6 py-3 text-sm md:text-base font-semibold text-white ring-1 ring-inset ring-white/20 transition hover:bg-white/15'
            >
              Compare learning paths
            </Link>
          </div>
        </div>
      </section>

      {/* Credibility strip */}
      <section className='bg-base-light'>
        <div className='mx-auto max-w-6xl px-4 py-10 lg:px-8'>
          <ul className='mx-auto flex w-fit flex-col items-start gap-y-4 lg:w-auto lg:flex-row lg:flex-wrap lg:items-center lg:justify-center lg:gap-x-3 lg:gap-y-3'>
            {CREDIBILITY_POINTS.map((point, index) => (
              <li key={point} className='flex items-center'>
                {index > 0 ? (
                  <span
                    aria-hidden='true'
                    className='mr-3 hidden h-5 w-px bg-base-dark/25 lg:block'
                  />
                ) : null}
                <span className='flex items-center gap-2.5'>
                  <CheckCircleIcon className='h-5 w-5 shrink-0 text-base-mid' />
                  <span className='text-sm md:text-base font-medium text-base-dark-highlight'>
                    {point}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Program comparison */}
      <section id='programs' className='mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-24'>
        <div className='mx-auto max-w-3xl text-center'>
          <h2 className='text-3xl font-semibold leading-tight text-slate-900 md:text-4xl'>
            Choose the Packaging Learning Path That Fits Your Goal
          </h2>
          <p className='mt-5 text-base leading-relaxed text-slate-600 md:text-lg'>
            All programs are 100% online and completed on your schedule. Start
            with a one-day orientation, build comprehensive packaging fluency, or
            choose the full certificate path with professor guidance through a
            custom project.
          </p>
        </div>

        {/* Mobile: stacked cards */}
        <div className='mt-12 space-y-6 lg:hidden'>
          {PROGRAMS.map((program) => (
            <div
              key={program.key}
              className={`overflow-hidden rounded-2xl border bg-white shadow-sm ${
                program.highlight
                  ? 'border-clemson ring-2 ring-clemson'
                  : 'border-slate-200'
              }`}
            >
              <div className={`px-5 py-5 ${program.headerClass}`}>
                {program.badge ? (
                  <span
                    className={`mb-2 inline-flex items-center rounded-md px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${program.badge.className}`}
                  >
                    {program.badge.label}
                  </span>
                ) : null}
                <h3 className='text-lg font-semibold leading-snug text-white'>
                  {program.title}
                </h3>
              </div>
              <div className='divide-y divide-slate-100'>
                {COMPARISON_ROWS.map((row) => (
                  <div key={row.key} className='px-5 py-3.5'>
                    <div className='text-xs font-semibold uppercase tracking-wide text-slate-500'>
                      {row.label}
                    </div>
                    <div className='mt-1 text-sm leading-relaxed text-slate-800'>
                      {program[row.key]}
                    </div>
                  </div>
                ))}
                <div className='flex items-center justify-between px-5 py-4'>
                  <span className={`text-2xl font-bold ${program.priceClass}`}>
                    {program.price}
                  </span>
                  <a
                    href={program.href}
                    className='inline-flex items-center gap-1 text-sm font-semibold text-clemson hover:underline'
                  >
                    Learn more
                    <ArrowRightIcon className='h-3.5 w-3.5' />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: comparison table */}
        <div className='mt-14 hidden overflow-hidden rounded-2xl border border-slate-200 shadow-sm lg:block'>
          <table className='w-full bg-white'>
            <thead>
              <tr className='align-top'>
                <th className='w-56 bg-white px-6 py-6 text-left align-bottom'>
                  <span className='text-sm font-semibold uppercase tracking-wide text-slate-400'>
                    Compare programs
                  </span>
                </th>
                {PROGRAMS.map((program) => (
                  <th
                    key={program.key}
                    className={`px-6 py-6 text-left align-top ${program.headerClass} ${
                      program.highlight ? 'ring-2 ring-inset ring-clemson' : ''
                    }`}
                  >
                    {program.badge ? (
                      <span
                        className={`mb-2 inline-flex items-center rounded-md px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${program.badge.className}`}
                      >
                        {program.badge.label}
                      </span>
                    ) : null}
                    <div className='text-lg font-semibold leading-snug text-white'>
                      {program.title}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className='divide-y divide-slate-100 text-sm text-slate-700'>
              {COMPARISON_ROWS.map((row) => (
                <tr key={row.key} className='odd:bg-white even:bg-slate-50/70'>
                  <td className='bg-slate-50/70 px-6 py-4 align-top text-sm font-semibold text-slate-900'>
                    {row.label}
                  </td>
                  {PROGRAMS.map((program) => (
                    <td
                      key={program.key}
                      className={`border-l border-slate-200 px-6 py-4 align-top leading-relaxed ${
                        program.highlight ? 'bg-clemson/5' : ''
                      }`}
                    >
                      {program[row.key]}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className='bg-slate-50/70 px-6 py-5 align-top text-sm font-semibold text-slate-900'>
                  Enrollment
                </td>
                {PROGRAMS.map((program) => (
                  <td
                    key={program.key}
                    className={`border-l border-slate-200 px-6 py-5 align-top ${
                      program.highlight ? 'bg-clemson/5' : ''
                    }`}
                  >
                    <div className={`text-2xl font-bold ${program.priceClass}`}>
                      {program.price}
                    </div>
                    <a
                      href={program.href}
                      className='mt-2 inline-flex items-center gap-1 text-sm font-semibold text-clemson hover:underline'
                    >
                      Learn more
                      <ArrowRightIcon className='h-3.5 w-3.5' />
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Still not sure callout */}
        <div className='mt-10 flex flex-col items-center justify-between gap-5 rounded-2xl bg-base-dark px-6 py-7 md:flex-row md:px-9'>
          <div>
            <h3 className='text-xl font-semibold text-white md:text-2xl'>
              Still not sure which path fits your goal?
            </h3>
            <p className='mt-1 text-sm text-base-light md:text-base'>
              Speak with a human and we&apos;ll help you choose the best-fit
              program.
            </p>
          </div>
          <SpeakWithHuman
            source='variant_d_programs'
            className='shrink-0 bg-brand-yellow text-dark hover:bg-brand-yellow-light'
          />
        </div>
      </section>

      {/* Packaging decisions affect the business */}
      <section className='bg-base-dark-highlight'>
        <div className='mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-24'>
          <div className='grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center'>
            <div>
              <h2 className='text-3xl font-semibold leading-tight text-white md:text-4xl'>
                Packaging Decisions Affect Every Part of the Business
              </h2>
              <p className='mt-5 text-base leading-relaxed text-slate-300 md:text-lg'>
                Packaging is not only a container. It influences product
                protection, cost, sustainability, manufacturing, logistics,
                point-of-sale presentation, customer experience, and regulatory
                expectations. When teams understand packaging, they make better
                decisions across the entire value chain.
              </p>
              <div className='mt-8'>
                <SpeakWithHuman
                  source='variant_d_business_impact'
                  label='Talk Through Your Goals'
                />
              </div>
            </div>
            <ul className='space-y-4'>
              {BUSINESS_IMPACT_POINTS.map((point) => (
                <li
                  key={point}
                  className='flex items-start gap-3 rounded-xl bg-white/5 px-5 py-4 ring-1 ring-inset ring-white/10'
                >
                  <CheckCircleIcon className='mt-0.5 h-6 w-6 shrink-0 text-brand-green' />
                  <span className='text-base font-medium text-white'>
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Built for the real packaging value chain */}
      <section className='mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-24'>
        <div className='mx-auto max-w-3xl text-center'>
          <h2 className='text-3xl font-semibold leading-tight text-slate-900 md:text-4xl'>
            Built for the Real Packaging Value Chain
          </h2>
          <p className='mt-5 text-base leading-relaxed text-slate-600 md:text-lg'>
            Packaging School programs are designed for professionals who need
            practical packaging knowledge they can apply at work. Learners come
            from brands, suppliers, manufacturers, retailers, startups, agencies,
            universities, logistics organizations, and teams across the packaging
            value chain.
          </p>
        </div>

        <div className='mt-10 flex flex-wrap justify-center gap-3'>
          {VALUE_CHAIN_ROLES.map((role, index) => {
            const chipColors = [
              'bg-base-light text-base-dark',
              'bg-brand-indigo-light/25 text-brand-indigo',
              'bg-clemson/15 text-clemson-dark',
              'bg-brand-green/15 text-base-dark-highlight',
            ];
            return (
              <span
                key={role}
                className={`rounded-full px-4 py-2 text-sm font-semibold ${chipColors[index % chipColors.length]}`}
              >
                {role}
              </span>
            );
          })}
        </div>

        {/* Social validation: employer logos + testimonials */}
        <div className='mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14'>
          {/* Employer logos */}
          <div>
            <h3 className='text-center text-sm font-semibold uppercase tracking-wide text-slate-500 lg:text-left'>
              Learners come from leading organizations
            </h3>
            <div className='mt-5 grid grid-cols-2 gap-x-2 gap-y-1'>
              {PARTNER_LOGOS.map((logo) => {
                const tileClass =
                  'group flex h-28 items-center justify-center px-3 transition';
                const inner = logo.logo ? (
                  <img
                    src={logo.logo}
                    alt={logo.name}
                    className='max-h-20 max-w-[85%] object-contain grayscale opacity-80 transition group-hover:opacity-100'
                  />
                ) : (
                  <span className='text-center text-sm font-semibold text-slate-400'>
                    {logo.name}
                  </span>
                );
                return logo.href ? (
                  <a
                    key={logo.name}
                    href={logo.href}
                    target='_blank'
                    rel='noreferrer'
                    className={tileClass}
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={logo.name} className={tileClass}>
                    {inner}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Testimonials slideshow */}
          <div>
            <h3 className='text-center text-sm font-semibold uppercase tracking-wide text-slate-500 lg:text-left'>
              What our learners say
            </h3>
            <div
              className='mt-5'
              onMouseEnter={() => setIsTestimonialPaused(true)}
              onMouseLeave={() => setIsTestimonialPaused(false)}
              onTouchStart={handleTestimonialTouchStart}
              onTouchEnd={handleTestimonialTouchEnd}
            >
              {isLoadingTestimonials ? (
                <div className='flex h-[440px] flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm'>
                  <div className='h-5 w-28 animate-pulse rounded bg-slate-200' />
                  <div className='mt-5 space-y-3'>
                    <div className='h-4 w-full animate-pulse rounded bg-slate-200' />
                    <div className='h-4 w-11/12 animate-pulse rounded bg-slate-200' />
                    <div className='h-4 w-10/12 animate-pulse rounded bg-slate-200' />
                    <div className='h-4 w-9/12 animate-pulse rounded bg-slate-200' />
                  </div>
                  <div className='mt-auto flex items-center gap-3 border-t border-slate-100 pt-5'>
                    <div className='h-11 w-11 animate-pulse rounded-full bg-slate-200' />
                    <div className='space-y-2'>
                      <div className='h-4 w-32 animate-pulse rounded bg-slate-200' />
                      <div className='h-3 w-40 animate-pulse rounded bg-slate-200' />
                    </div>
                  </div>
                </div>
              ) : activeTestimonial ? (
                <figure className='flex h-[440px] flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm'>
                  <span
                    aria-hidden='true'
                    className='font-oswald text-5xl leading-none text-base-light'
                  >
                    &ldquo;
                  </span>
                  <blockquote className='mt-2 grow overflow-hidden text-base leading-relaxed text-slate-700'>
                    {truncateText(activeTestimonial.content)}
                  </blockquote>
                  <figcaption className='mt-5 flex items-center gap-3 border-t border-slate-100 pt-5'>
                    <div
                      className='h-11 w-11 shrink-0 rounded-full border border-slate-200 bg-cover bg-center'
                      style={{
                        backgroundImage: `url(${activeTestimonial.headshot || DEFAULT_AVATAR})`,
                      }}
                    />
                    <div className='min-w-0'>
                      <div className='truncate font-semibold text-slate-900'>
                        {activeTestimonial.author}
                      </div>
                      <div className='truncate text-sm text-slate-600'>
                        {[activeTestimonial.title, activeTestimonial.company]
                          .filter(Boolean)
                          .join(', ')}
                      </div>
                    </div>
                  </figcaption>
                </figure>
              ) : (
                <div className='flex h-[440px] items-center justify-center rounded-2xl border border-slate-200 bg-white p-7 text-sm text-slate-500 shadow-sm'>
                  Testimonials are on the way.
                </div>
              )}

              {testimonialCount > 1 ? (
                <div className='mt-5 flex items-center justify-center gap-4'>
                  <button
                    type='button'
                    onClick={goToPreviousTestimonial}
                    aria-label='Previous testimonial'
                    className='inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-600 transition hover:bg-slate-50'
                  >
                    <ChevronLeftIcon className='h-4 w-4' />
                  </button>
                  <span className='text-sm font-medium tabular-nums text-slate-500'>
                    {(testimonialIndex % testimonialCount) + 1} / {testimonialCount}
                  </span>
                  <button
                    type='button'
                    onClick={goToNextTestimonial}
                    aria-label='Next testimonial'
                    className='inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-600 transition hover:bg-slate-50'
                  >
                    <ChevronRightIcon className='h-4 w-4' />
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* Teams */}
      <section className='bg-brand-indigo'>
        <div className='mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20'>
          <div className='grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center'>
            <div>
              <h2 className='text-3xl font-semibold leading-tight text-white md:text-4xl'>
                Training More Than One Person?
              </h2>
              <p className='mt-5 text-base leading-relaxed text-indigo-100 md:text-lg'>
                Give your team a shared packaging language without building
                internal curriculum from scratch. Packaging School supports team
                learning for onboarding, sales enablement, packaging development,
                sustainability alignment, procurement, operations, and
                cross-functional collaboration.
              </p>
              <div className='mt-8'>
                <Link
                  href={TEAMS_URL}
                  className='inline-flex items-center justify-center gap-2 rounded-lg bg-brand-yellow px-6 py-3 text-sm md:text-base font-semibold text-dark shadow-sm transition hover:bg-brand-yellow-light'
                >
                  Request Team Learning Options
                  <ArrowRightIcon className='h-4 w-4' />
                </Link>
              </div>
            </div>
            <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
              {TEAM_USE_CASES.map((useCase) => (
                <div
                  key={useCase}
                  className='flex items-start gap-2.5 rounded-xl bg-white/10 px-4 py-3.5 ring-1 ring-inset ring-white/15'
                >
                  <CheckCircleIcon className='mt-0.5 h-5 w-5 shrink-0 text-brand-yellow' />
                  <span className='text-sm font-medium text-white'>
                    {useCase}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Free lessons (LOTM) */}
      <section className='mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-24'>
        <div className='mx-auto max-w-3xl text-center'>
          <h2 className='text-3xl font-semibold leading-tight text-slate-900 md:text-4xl'>
            Want to Try Packaging School First?
          </h2>
          <p className='mt-5 text-base leading-relaxed text-slate-600 md:text-lg'>
            Start with free packaging learning resources, explore the course
            catalog, and then choose the certificate path that fits your career,
            team, or organization.
          </p>
        </div>

        {isLoadingLessons ? (
          <div className={`mt-12 grid gap-6 ${lessonGridClass}`}>
            {Array.from({ length: lessonCardsPerView }).map((_, i) => (
              <div
                key={i}
                className='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'
              >
                <div className='aspect-video animate-pulse bg-slate-200' />
                <div className='space-y-3 p-5'>
                  <div className='h-4 w-1/3 animate-pulse rounded bg-slate-200' />
                  <div className='h-6 w-11/12 animate-pulse rounded bg-slate-200' />
                  <div className='h-4 w-2/3 animate-pulse rounded bg-slate-200' />
                  <div className='h-10 w-32 animate-pulse rounded bg-slate-200' />
                </div>
              </div>
            ))}
          </div>
        ) : lotmLessons.length ? (
          <div onTouchStart={handleLessonTouchStart} onTouchEnd={handleLessonTouchEnd}>
            <div
              className={`mt-12 grid gap-6 transition-all duration-300 ${lessonGridClass}`}
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
                const isVideo =
                  String(lesson?.mediaType || '').toUpperCase() === 'VIDEO' &&
                  Boolean(lesson?.media);

                return (
                  <article
                    key={lesson.id}
                    className='flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md'
                  >
                    <div className='relative w-full overflow-hidden bg-slate-100 pt-[56.25%]'>
                      {isVideo ? (
                        <ReactPlayer
                          url={lesson.media}
                          width='100%'
                          height='100%'
                          className='absolute inset-0'
                          style={{ position: 'absolute', inset: 0 }}
                          controls
                          light={lesson.seoImage || true}
                          playIcon={
                            <div className='flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow'>
                              <PlayIcon className='ml-0.5 h-6 w-6 text-slate-900' />
                            </div>
                          }
                        />
                      ) : (
                        <Link href={lessonHref} className='absolute inset-0 block'>
                          {lesson.seoImage ? (
                            <div
                              className='h-full w-full bg-cover bg-center'
                              style={{
                                backgroundImage: `url(${lesson.seoImage})`,
                              }}
                            />
                          ) : (
                            <div className='flex h-full w-full items-center justify-center bg-base-light'>
                              <span className='font-oswald text-lg font-semibold text-base-dark'>
                                Packaging School
                              </span>
                            </div>
                          )}
                        </Link>
                      )}
                    </div>
                    <div className='flex grow flex-col p-5'>
                      {lessonDate ? (
                        <p className='text-xs font-medium uppercase tracking-wide text-slate-500'>
                          {lessonDate}
                        </p>
                      ) : null}
                      <h3 className='mt-1 text-lg font-semibold leading-snug text-slate-900'>
                        <Link
                          href={lessonHref}
                          className='transition hover:text-base-mid'
                        >
                          {lesson.title}
                        </Link>
                      </h3>
                      <p className='mt-2 text-sm text-slate-600'>
                        By {authorName}
                      </p>
                      {lessonTags.length ? (
                        <div className='mt-3 flex flex-wrap gap-2'>
                          {lessonTags.map((tag) => (
                            <span
                              key={`${lesson.id}-${tag}`}
                              className='inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600'
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      ) : null}
                      <p className='mt-3 grow text-sm leading-relaxed text-slate-700'>
                        {lesson.subhead ||
                          'Read this free lesson from our library.'}
                      </p>
                      <Link
                        href={lessonHref}
                        onClick={() => {
                          trackAbLessonClick({
                            pagePath: '/',
                            nextPath: lessonHref,
                            source: 'variant_d_free_lessons',
                            metadata: {
                              lessonId: lesson.id,
                              lessonSlug: lesson.slug,
                            },
                          });
                        }}
                        className='mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-dark px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-dark-mid sm:w-auto'
                      >
                        Read more
                        <ArrowRightIcon className='h-3.5 w-3.5' />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>

            {lessonPageCount > 1 ? (
              <div className='mt-8 flex items-center justify-between gap-4'>
                <button
                  type='button'
                  onClick={goToPreviousLessonPage}
                  className='inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50'
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
                          ? 'bg-base-mid'
                          : 'bg-slate-300 hover:bg-slate-400'
                      }`}
                    />
                  ))}
                </div>
                <button
                  type='button'
                  onClick={goToNextLessonPage}
                  className='inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50'
                >
                  Next
                </button>
              </div>
            ) : null}
          </div>
        ) : null}

        {/* Explore the catalog */}
        <div className='mt-16 flex flex-col items-center justify-between gap-6 rounded-2xl bg-base-light px-6 py-10 md:flex-row md:px-10'>
          <div>
            <h3 className='text-2xl font-semibold leading-tight text-base-dark-highlight md:text-3xl'>
              Explore the Course Catalog
            </h3>
            <p className='mt-3 text-base leading-relaxed text-base-dark'>
              Certificate students receive full course catalog access during
              their enrollment period.
            </p>
          </div>
          <Link
            href={CATALOG_URL}
            className='inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-base-dark px-6 py-3 text-sm md:text-base font-semibold text-white shadow-sm transition hover:bg-base-mid'
          >
            Browse the Catalog
            <ArrowRightIcon className='h-4 w-4' />
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className='relative overflow-hidden bg-dark'>
        <div
          className='pointer-events-none absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-clemson/20 blur-3xl'
          aria-hidden='true'
        />
        <div className='relative mx-auto max-w-4xl px-4 py-20 text-center lg:px-8'>
          <h2 className='text-3xl font-semibold leading-tight text-white md:text-4xl'>
            Still Deciding Which Program Is Right?
          </h2>
          <p className='mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg'>
            You do not have to choose alone. Speak with a real human about your
            goals, role, team, timeline, and budget, and we will help you choose
            the best-fit packaging learning path.
          </p>
          <div className='mt-9 flex justify-center'>
            <SpeakWithHuman source='variant_d_final' />
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomeVariantD;
