import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import HoverCard from '../../components/shared/HoverCard';
import { RocketLaunchIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';

const CourseBottom = dynamic(
  () => import('../../components/courses/CourseBottom'),
  {
    ssr: false,
    loading: () => <div className='w-full h-64 bg-gray-100 animate-pulse' />,
  }
);
import { lMSCoursesBySlug, listLMSCourses } from '../../src/graphql/queries';
import { createCourseOutlineRequest } from '../../src/graphql/mutations';
import { getCourseInstructorsWithDetails } from '../../libs/courseInstructorsQuery';
import { API } from 'aws-amplify';
import Meta from '../../components/shared/Meta';
import { buildCourseJsonLd } from '../../libs/seo/courseJsonLd';
import { generateMetadata } from '../../libs/seo/generateMetadata';
import { updateCategoryMenu } from '../../data/CategoryMenu';
import Link from 'next/link';
import { useRouter } from 'next/router';
import VideoPlayerInView from '../../components/lessons/VideoPlayerInView';
import {
  createNewOrder,
  registgerCourseClick,
  getDeviceType,
} from '../../helpers/api';
import { useThinkificLink } from '../../hooks/useThinkificLink';
import {
  FilmIcon,
  ArrowDownTrayIcon,
  DocumentTextIcon,
  QuestionMarkCircleIcon,
  PhotoIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import {
  AcademicCapIcon,
  UserIcon,
  CalendarDaysIcon,
} from '@heroicons/react/24/solid';

const ADVISOR_CALENDAR_URL = 'https://calendar.app.google/qUZMKuFbF7NhpxgL8';

const LESSON_TYPE_ICONS = {
  VIDEO: FilmIcon,
  DOWNLOAD: ArrowDownTrayIcon,
  PDF: DocumentTextIcon,
  QUIZ: QuestionMarkCircleIcon,
  MULTIMEDIA: PhotoIcon,
};

const Page = ({ course }) => {
  const router = useRouter();
  const { location, awsUser } = useSelector((state) => state.auth);
  const { navigateToThinkific } = useThinkificLink();
  const [isLoading, setIsLoading] = useState(false);
  const [showFullOutline, setShowFullOutline] = useState(false);
  const deviceType = getDeviceType();
  // Use a stable base URL during SSR/SSG so OG tags are absolute and consistent.
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://packagingschool.com';

  const courseJsonLd = course ? buildCourseJsonLd(course, siteUrl) : null;
  const courseUrl = course?.slug ? `/courses/${course.slug}` : null;

  const metadata = course
    ? generateMetadata({
        pageType: 'COURSE',
        data: course,
        pathname: courseUrl,
      })
    : generateMetadata({ pageType: 'STATIC', pathname: '/courses' });

  const objectivesList = (() => {
    const raw = course?.objectives;
    if (Array.isArray(raw)) return raw;
    if (typeof raw === 'string') {
      try {
        return JSON.parse(raw);
      } catch {
        return [];
      }
    }
    return [];
  })();

  const createNewCourseOutlineRequest = async () => {
    await API.graphql({
      query: createCourseOutlineRequest,
      variables: {
        input: {
          email: awsUser?.email ?? null,
          name: awsUser?.name ?? null,
          ipAddress: location?.ip ?? null,
          country: location?.country ?? null,
          device: deviceType,
          page: router.asPath,
        },
      },
    });
  };

  const { lessonsCount, videosCount } = useMemo(() => {
    const outline = course?.courseOutline;
    if (!outline?.chapters?.edges) return { lessonsCount: 0, videosCount: 0 };
    let lessons = 0;
    let videos = 0;
    outline.chapters.edges.forEach(({ node: chapter }) => {
      chapter.lessons?.edges?.forEach(({ node: lesson }) => {
        lessons += 1;
        if (lesson.lessonType === 'VIDEO') videos += 1;
      });
    });
    return { lessonsCount: lessons, videosCount: videos };
  }, [course?.courseOutline]);

  const orderHandler = async (type) => {
    if (!course?.link) return;
    setIsLoading(true);
    try {
      await registgerCourseClick(
        course.id,
        router.asPath,
        location || { ip: null, country: null, lat: null, long: null },
        '',
        '',
      );
      const orderId = await createNewOrder({
        courseDescription: course.subheadline,
        courseDiscount: 0,
        courseImage: course.seoImage,
        courseName: course.title,
        courseLink:
          type === 'SUBSCRIPTION'
            ? course.subscriptionLink
            : type === 'TRIAL'
              ? `${course.link}?et=free_trial`
              : course.link,
        total:
          type === 'SUBSCRIPTION'
            ? course.subscriptionPrice
            : type === 'TRIAL'
              ? 0
              : course.price,
        userID: awsUser?.id ?? null,
        email: awsUser?.email ?? null,
        name: awsUser?.name ?? null,
        type,
      });
      const targetUrl =
        type === 'SUBSCRIPTION'
          ? course.subscriptionLink
          : type === 'TRIAL'
            ? `${course.link}?et=free_trial`
            : course.link;
      if (awsUser?.name?.includes(' ')) {
        await navigateToThinkific(targetUrl, targetUrl);
      } else {
        router.push(`/order/${orderId.id}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const trialLink = course?.link ? `${course.link}?et=free_trial` : null;

  if (!course) {
    return (
      <>
        <Meta
          title={metadata.title}
          description={metadata.description}
          url='/courses'
        />
        <div className='relative py-16' />
      </>
    );
  }
  return (
    <>
      <Meta
        title={metadata.title}
        description={metadata.description}
        image={course.seoImage}
        url={courseUrl}
        type='website'
        course={courseJsonLd?.course}
        breadcrumb={courseJsonLd?.breadcrumb}
      />
      <div className='grid lg:!grid-cols-12 gap-16 max-w-7xl mx-auto px-4 lg:!px-0 py-12 w-full'>
        <div className='lg:!col-span-8 w-full'>
          <div className='flex flex-col gap-7 w-full text-left'>
            <div className='w-full flex flex-col gap-3'>
              <nav
                className='w-full text-sm text-gray-600'
                aria-label='Breadcrumb'
              >
                <ol className='flex flex-wrap items-center gap-x-1 gap-y-1'>
                  <li>
                    <Link
                      href='/all_courses'
                      className='hover:text-gray-900 hover:underline'
                    >
                      All Courses
                    </Link>
                  </li>
                  {(course.categoryArray ?? [course.category].filter(Boolean))
                    .filter(Boolean)
                    .map((cat, i, arr) => (
                      <li key={cat} className='flex items-center gap-x-1'>
                        {i === 0 ? (
                          <span className='text-gray-400'>&gt;</span>
                        ) : (
                          <span className='text-gray-400 px-0.5'>|</span>
                        )}
                        <Link
                          href={`/courses/categories/${cat}`}
                          className='hover:text-gray-900 hover:underline'
                        >
                          {updateCategoryMenu.find((item) => item.value === cat)
                            ?.name ?? cat}
                        </Link>
                      </li>
                    ))}
                </ol>
              </nav>
              <div className='w-full'>
                <h1 className='h2-base'>{course.title}</h1>
              </div>
              <div className='w-full text-xl text-gray-600'>
                {course.subheadline}
              </div>
            </div>
            {course.preview && (
              <div className='w-full rounded-md overflow-hidden'>
                <VideoPlayerInView videoEmbedLink={course.preview} rounded />
              </div>
            )}
            <div className='w-full flex flex-col gap-4'>
              <h2 className='w-full h4-base border-y-2 border-y-gray-300 py-2'>
                What you will learn
              </h2>
              <div className='w-full  text-gray-600 leading-[1.5em]'>
                {course.what_learned}
              </div>
            </div>
            <div className='w-full flex flex-col gap-4'>
              <h2 className='w-full h4-base border-y-2 border-y-gray-300 py-2'>
                Course Objectives
              </h2>
              <div className='w-full flex flex-col gap-2 text-gray-600 leading-[1.5em]'>
                {objectivesList.map((objective, i) => {
                  const text =
                    typeof objective === 'string'
                      ? objective
                      : (objective?.objective ?? '');
                  return (
                    <div key={i} className='flex items-start gap-2'>
                      <span className='mt-0.5 shrink-0 text-gray-400'>
                        <svg
                          width='16'
                          height='16'
                          viewBox='0 0 16 16'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        >
                          <path d='M2 8l4 4 8-10' />
                        </svg>
                      </span>
                      <span>{text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className='w-full flex flex-col gap-4'>
              <h2 className='w-full h4-base border-y-2 border-y-gray-300 py-2'>
                Course Outline
              </h2>
              {course.courseOutline?.chapters?.edges ? (
                <div className='relative'>
                  <div
                    className={
                      showFullOutline
                        ? 'flex flex-col gap-6'
                        : 'flex flex-col gap-6 max-h-96 overflow-hidden'
                    }
                  >
                    {course.courseOutline.chapters.edges
                      .slice()
                      .sort((a, b) => a.node.position - b.node.position)
                      .map(({ node: chapter }, chapterIndex) => {
                        const chapterNum = chapterIndex + 1;
                        return (
                          <div key={chapter.id} className='flex flex-col gap-2'>
                            <h3 className='text-base font-semibold text-gray-900'>
                              {chapterNum}.0 {chapter.title}
                            </h3>
                            <ul className='flex flex-col gap-1.5 pl-2 border-l-2 border-gray-200'>
                              {(chapter.lessons?.edges ?? []).map(
                                ({ node: lesson }, lessonIndex) => {
                                  const IconComponent =
                                    LESSON_TYPE_ICONS[lesson.lessonType] ||
                                    DocumentTextIcon;
                                  return (
                                    <li
                                      key={lesson.id}
                                      className='flex items-center gap-2 text-sm text-gray-700'
                                    >
                                      <span className='text-gray-500 font-medium tabular-nums shrink-0'>
                                        {chapterNum}.{lessonIndex + 1}
                                      </span>
                                      <IconComponent className='w-4 h-4 shrink-0 text-gray-500' />
                                      <span>{lesson.title}</span>
                                      <span className='text-xs text-gray-400 capitalize'>
                                        ({lesson.lessonType?.toLowerCase()})
                                      </span>
                                    </li>
                                  );
                                },
                              )}
                            </ul>
                          </div>
                        );
                      })}
                  </div>
                  {!showFullOutline && (
                    <>
                      <div
                        className='absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-b from-transparent via-white/70 to-white pointer-events-none'
                        aria-hidden
                      />
                      {awsUser ? (
                        <div className='absolute bottom-3 left-0 right-0 z-10'>
                          <button
                            type='button'
                            onClick={async () => {
                              await createNewCourseOutlineRequest();
                              setShowFullOutline(true);
                            }}
                            className='w-full px-4 py-2.5 bg-clemson hover:bg-clemson-dark text-white font-semibold rounded-lg transition-colors text-sm shadow-md text-left'
                          >
                            Show Full Outline
                          </button>
                        </div>
                      ) : (
                        <Link
                          href={`/login?returnTo=${encodeURIComponent(router.asPath)}`}
                          className='absolute bottom-3 left-0 right-0 z-10'
                        >
                          <button
                            type='button'
                            className='w-full px-4 py-2.5 bg-clemson hover:bg-clemson-dark text-white font-semibold rounded-lg transition-colors text-sm shadow-md text-left'
                          >
                            Login or signup to view full curriculum
                          </button>
                        </Link>
                      )}
                    </>
                  )}
                </div>
              ) : (
                <p className='text-sm text-gray-500'>Outline not available</p>
              )}
            </div>
          </div>
        </div>
        <div className='lg:!col-span-4 w-full'>
          <div className='w-full bg-gray-200 rounded-md p-4 border border-gray-300 flex flex-col gap-4 sticky top-4 text-left'>
            {course.instructors?.length > 0 && (
              <div className='flex flex-col gap-3'>
                <div className='flex items-center gap-2'>
                  <UserIcon className='w-5 h-5 text-gray-700' />
                  <span className='text-sm font-semibold text-gray-900'>
                    Instructor{course.instructors.length > 1 ? 's' : ''}
                  </span>
                </div>
                {course.instructors.map((instructor) => (
                  <div
                    key={instructor.id}
                    className='flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity'
                    onClick={() =>
                      instructor.linkedIn &&
                      window.open(instructor.linkedIn, '_blank')
                    }
                  >
                    <div
                      className='w-10 h-10 bg-gray-300 rounded-full shrink-0'
                      style={{
                        backgroundImage: `url(${instructor.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                    <div className='flex flex-col min-w-0'>
                      <span className='text-sm font-medium text-gray-900'>
                        {instructor.name}
                      </span>
                      <span className='text-xs text-gray-600'>
                        {instructor.title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div
              className={`flex flex-col gap-3 ${course.instructors?.length ? 'border-t border-gray-300 pt-4' : ''}`}
            >
              <div className='flex items-center gap-2'>
                <AcademicCapIcon className='w-5 h-5 text-gray-700' />
                <span className='text-sm font-medium text-gray-900'>
                  {lessonsCount} Lessons
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <FilmIcon className='w-5 h-5 text-gray-700' />
                <span className='text-sm font-medium text-gray-900'>
                  {videosCount} Videos
                </span>
              </div>
              {course.hours && (
                <div className='flex items-center gap-2'>
                  <ClockIcon className='w-5 h-5 text-gray-700' />
                  <span className='text-sm font-medium text-gray-900'>
                    {course.hours} Hours
                  </span>
                </div>
              )}
            </div>
            {course.link && (
              <div className='flex flex-col gap-3 pt-4 border-t border-gray-300'>
                <div className='flex flex-col gap-2 p-4 rounded-lg border-2 border-clemson bg-white shadow-sm'>
                  <span className='text-sm font-semibold text-gray-900'>
                    Buy now
                  </span>
                  <span className='text-3xl font-bold text-gray-900'>
                    {course.price === 'FREE' ? 'Free' : `$${course.price}`}
                  </span>
                  <span className='text-xs text-gray-600'>3-Month Access</span>
                  <div className='flex flex-col gap-2'>
                    <button
                      type='button'
                      onClick={() => orderHandler('BUY')}
                      disabled={isLoading}
                      className='w-full bg-clemson hover:bg-clemson-dark text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                      {isLoading ? 'Loading...' : 'Buy now'}
                    </button>
                    {trialLink && (
                      <button
                        type='button'
                        onClick={() => orderHandler('TRIAL')}
                        disabled={isLoading}
                        className='w-full border-2 border-clemson text-clemson hover:bg-clemson hover:text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                      >
                        Free trial
                      </button>
                    )}
                  </div>
                </div>
                {course.subscriptionLink && course.subscriptionPrice && (
                  <div className='flex flex-col gap-2 p-3 rounded-lg border border-gray-200 bg-gray-50'>
                    <span className='text-xs font-medium text-gray-600'>
                      Or subscribe
                    </span>
                    <span className='text-2xl font-semibold text-gray-700'>
                      ${course.subscriptionPrice}
                    </span>
                    <span className='text-xs text-gray-500'>
                      per month for 6 months
                    </span>
                    <button
                      type='button'
                      onClick={() => orderHandler('SUBSCRIPTION')}
                      disabled={isLoading}
                      className='w-full border border-gray-400 text-gray-600 hover:bg-gray-300 hover:text-gray-900 font-medium py-2.5 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm'
                    >
                      Subscribe
                    </button>
                  </div>
                )}
              </div>
            )}
            {course.partOf && course.partOf.length > 0 && (
              <div className='flex flex-col gap-4 mt-2'>
                {course.partOf.includes('APC') && (
                  <HoverCard
                    title={'Automotive Packaging Certificate (APC)'}
                    href={'/certifications/get-to-know-apc'}
                    subtitle={`This course as part of the  Autmotive Packaging Certificate. Exploring distinctive aspects of automotive packaging, with exclusive content unmatched by any other.`}
                    Icon={RocketLaunchIcon}
                  />
                )}
                {course.partOf.includes('CPS') && (
                  <HoverCard
                    title={'Certificate of Packaging Science (CPS)'}
                    href={'/certifications/get-to-know-cps'}
                    subtitle={`This course as part of the  Certificate of Packaging Science, a comprehensive program covering all major aspects of packaging materials, processes, and design.`}
                    Icon={RocketLaunchIcon}
                  />
                )}
              </div>
            )}
            <div className='flex flex-col gap-3 p-4 rounded-lg border-2 border-clemson bg-clemson/5 w-full'>
              <CalendarDaysIcon className='w-8 h-8 text-clemson shrink-0' />
              <h3 className='text-base font-semibold text-gray-900 w-full'>
                Questions?
              </h3>
              <p className='text-sm text-gray-600 w-full'>
                Schedule a free 15-minute call with an Advisor.
              </p>
              <a
                href={ADVISOR_CALENDAR_URL}
                target='_blank'
                rel='noopener noreferrer'
                className='w-full px-4 py-2.5 bg-clemson hover:bg-clemson-dark text-white font-semibold rounded-lg transition-colors text-sm text-left block'
              >
                Schedule now
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full py-5'>
        <CourseBottom
          category={course && course.categoryArray}
          id={course && course.id}
        />
      </div>
    </>
  );
};

export default Page;

export async function getStaticPaths() {
  const res = await API.graphql({
    query: listLMSCourses,
    variables: { filter: { collection: { contains: 'null' } } },
  });
  const paths = res.data.listLMSCourses.items.map((course) => ({
    params: { uid: course.slug },
  }));

  // Important for social scrapers + SSG stability: don't serve a "fallback shell"
  // that lacks meta tags and can cause runtime errors during prerender.
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const slug = params.uid;
  const res = await API.graphql({
    query: lMSCoursesBySlug,
    variables: { slug: slug },
  });
  const course = res.data.lMSCoursesBySlug.items[0];

  if (!course) {
    return { notFound: true, revalidate: 60 };
  }

  const instructorsRes = await API.graphql({
    query: getCourseInstructorsWithDetails,
    variables: { lMSCourseId: course.id },
  });
  const instructors =
    instructorsRes.data?.courseInstructorsByLMSCourseId?.items
      ?.map((item) => item.instructor)
      .filter(Boolean) ?? [];

  let courseOutline = null;
  try {
    const graphqlRes = await fetch('https://api.thinkific.com/stable/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_THINKIFIC_PUBLIC_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query Course($courseId: ID!, $first: Int, $lessonsFirst: Int) {
            course(id: $courseId) {
              id
              curriculum {
                chaptersCount
                lessonsCount
                chapters(first: $first) {
                  edges {
                    node {
                      title
                      position
                      id
                      lessons(first: $lessonsFirst) {
                        edges {
                          node {
                            title
                            lessonType
                            id
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        `,
        variables: {
          courseId: course.thinkificId,
          first: 50,
          lessonsFirst: 50,
        },
      }),
    });
    if (graphqlRes.ok) {
      const json = await graphqlRes.json();
      if (!json.errors && json?.data?.course?.curriculum) {
        courseOutline = json.data.course.curriculum;
      }
    }
  } catch (err) {
    console.error('Error fetching course outline:', err.message);
  }

  return {
    props: { course: { ...course, instructors, courseOutline } },
    revalidate: 60 * 60 * 4,
  };
}
