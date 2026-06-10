import React, { useEffect, useState } from 'react';
import { PlayIcon, StarIcon } from '@heroicons/react/24/solid';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { API } from 'aws-amplify';
import { useSelector } from 'react-redux';
import { listLMSCourses } from '../../../src/graphql/queries';
import {
  createNewOrder,
  getDeviceType,
  registgerCourseClick,
} from '../../../helpers/api';
import { useThinkificLink } from '../../../hooks/useThinkificLink';

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

const PROGRAMS = {
  BOOTCAMP: {
    href: 'https://packagingschool.com/courses/packaging-boot-camp-101',
    credential: 'Bootcamp',
    format: '100% online self-paced',
    commitment: '8 clockhours',
    access: 'Focused starter curriculum',
    price: '$179',
    details:
      'Foundational packaging principles to build practical fluency quickly.',
  },
  CPS: {
    href: 'https://packagingschool.com/certifications/get-to-know-cps',
    credential: 'Packaging School Certificate',
    format: '100% online self-paced',
    commitment: 'Flexible pacing',
    access: '6-months access to complete catalog',
    price: 'Certificate enrollment',
    details:
      'Comprehensive packaging curriculum with broad applicability across roles.',
  },
  CMPM: {
    href: 'https://packagingschool.com/certifications/get-to-know-cmpm',
    credential: 'Clemson University Certificate',
    format: '100% online with professor office hours',
    commitment: 'Professor-led 12-week program',
    access: '1-year access to complete catalog',
    price: 'Certificate enrollment',
    details: 'Custom project tailored to your focus with continuous feedback.',
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

const HomeVariantB = () => {
  const router = useRouter();
  const { awsUser, location } = useSelector((state) => state.auth);
  const { navigateToThinkific } = useThinkificLink();
  const [freeCourses, setFreeCourses] = useState([]);
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);
  const [catalogEstimate, setCatalogEstimate] = useState({
    count: 0,
    topics: [],
  });

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
      <section className='w-full max-w-7xl mx-auto px-4 lg:px-8 py-14 lg:py-20'>
        <h1 className='text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-slate-900 max-w-6xl text-center mx-auto'>
          Packaging is part of every business, but many people lack the skills
          to navigate its intricacies.
        </h1>
        <p className='mt-4 text-lg md:text-xl text-slate-700 max-w-5xl leading-relaxed text-center mx-auto'>
          By mastering the language of packaging, you can enhance your resume
          and open a world of opportunities.
        </p>

        <div className='mt-10 block sm:!hidden space-y-4'>
          {PROGRAM_COLUMNS.map((column) => {
            const program = PROGRAMS[column.key];
            return (
              <div
                key={column.key}
                className='rounded-xl border border-slate-200 shadow-sm bg-white overflow-hidden'
              >
                <div className='bg-slate-900 px-5 py-4'>
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
                      </div>
                    </div>
                  ))}
                  <div className='px-5 py-3.5 bg-emerald-100'>
                    <div className='text-xs font-semibold uppercase tracking-wide text-slate-600'>
                      Details
                    </div>
                    <div className='mt-1 text-sm text-slate-800 leading-relaxed'>
                      {column.highlightDetails ? (
                        <div className='flex items-start gap-2'>
                          <StarIcon className='w-4 h-4 text-amber-500 mt-0.5 shrink-0' />
                          <span>{program.details}</span>
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

        <div className='mt-10 overflow-x-auto border border-slate-200 rounded-xl shadow-sm bg-white hidden sm:!block'>
          <table className='w-full min-w-[980px] bg-white'>
            <thead>
              <tr className='bg-slate-900 text-white text-[15px]'>
                <th className='text-left px-5 py-4 font-semibold'>
                  Comparison
                </th>
                <th className='text-left px-5 py-4 font-semibold border-l border-slate-700'>
                  Packaging Boot Camp 101
                </th>
                <th className='text-left px-5 py-4 font-semibold border-l border-slate-700'>
                  Certificate of Packaging Science (CPS)
                </th>
                <th className='text-left px-5 py-4 font-semibold border-l border-slate-700'>
                  Certificate of Mastery in Packaging Management (CMPM)
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-slate-100 text-sm text-slate-700'>
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
                  <div className='flex items-start gap-2'>
                    <StarIcon className='w-4 h-4 text-amber-500 mt-0.5 shrink-0' />
                    <span>{PROGRAMS.CMPM.details}</span>
                  </div>
                </td>
              </tr>
              <tr className='odd:bg-white even:bg-slate-50/70'>
                <td className='px-5 py-4 font-semibold text-slate-900 bg-slate-50/70'>
                  Learn more
                </td>
                <td className='px-5 py-4 border-l border-slate-200'>
                  <a
                    href={PROGRAMS.BOOTCAMP.href}
                    className='text-clemson font-semibold hover:underline'
                  >
                    BOOTCAMP
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

        <div className='mt-8 w-full rounded-xl bg-slate-900 px-6 py-6 md:px-8 md:py-6 flex flex-col sm:!flex-row sm:!items-center sm:!justify-between gap-4'>
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
          >
            Schedule Free 15-Minute Call
          </a>
        </div>

        <div className='mt-14'>
          <h3 className='text-2xl md:text-3xl font-semibold text-slate-900 text-center'>
            Start with Free Courses
          </h3>
          <p className='mt-3 text-slate-600 text-center'>
            Explore free options and enroll directly.
          </p>

          {isLoadingCourses ? (
            <div className='mt-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6'>
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
            <div className='mt-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6'>
              {freeCourses.map((course) => (
                <div
                  key={course.id}
                  className='rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm'
                >
                  <div className='aspect-video bg-slate-100'>
                    {course.preview || course.demo ? (
                      <ReactPlayer
                        url={course.preview || course.demo}
                        width='100%'
                        height='100%'
                        controls
                        light={course.seoImage || true}
                      />
                    ) : (
                      <div
                        className='w-full h-full relative bg-cover bg-center'
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
                    <div className='mt-3 flex items-center justify-between text-sm'>
                      <span className='inline-flex items-center rounded-full bg-emerald-100 text-emerald-700 px-2.5 py-1 font-semibold'>
                        FREE
                      </span>
                      <span className='text-slate-600 font-medium'>
                        {course.hours || 'N/A'} hours
                      </span>
                    </div>
                    <p className='mt-3 text-sm text-slate-600'>
                      {course.subheadline ||
                        'Learn key packaging concepts and build practical skills.'}
                    </p>
                    <div className='mt-auto pt-4'>
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

        <div className='mt-14 rounded-2xl border border-slate-200 bg-slate-50 px-6 py-10 md:px-10 md:py-14 text-center'>
          <h3 className='text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-900 leading-tight'>
            Explore the Full Catalog
          </h3>
          <p className='mt-4 text-base md:text-lg text-slate-700 max-w-4xl mx-auto leading-relaxed'>
            Explore approximately {buildEstimatedCount(catalogEstimate.count)}{' '}
            courses across {formatTopics(catalogEstimate.topics)}.
          </p>
          <Link
            href='/all_courses'
            className='mt-7 inline-flex items-center justify-center rounded-md bg-clemson px-6 py-3 text-white text-sm md:text-base font-semibold hover:opacity-90 transition'
          >
            View All Courses
          </Link>
        </div>
      </section>
    </main>
  );
};

export default HomeVariantB;
