import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import React, { useMemo, useEffect, useState, useRef } from 'react';
import { API } from 'aws-amplify';
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import lessonAnimation from '/public/lesson.json';

const LessonShareButtons = dynamic(
  () => import('../../components/lessons/LessonShareButtons'),
  { ssr: false },
);
import LessonQuiz from '../../components/lessons/LessonQuiz';
import LessonVideoHero from '../../components/lessons/LessonVideoHero';
import VideoPlayerInView from '../../components/lessons/VideoPlayerInView';

const VideoPlayer = dynamic(() => import('../../components/VideoPlayer'), {
  ssr: false,
});
import {
  registerCertificateClick,
  getDeviceType,
  registgerCourseClick,
  handleBookmarkAdd,
  handleBookmarkRemove,
  getCertificate,
  getCourse,
  getAWSUser,
} from '../../helpers/api';
import {
  listLessons,
  getCertificateObject,
  getLMSCourse,
} from '../../src/graphql/queries';
import { useDispatch, useSelector } from 'react-redux';
import { setAWSUser } from '../../features/auth/authslice';
import { toggleSignInModal } from '../../features/layout/layoutSlice';
import AuthorBlock from '../../components/shared/AuthorBlock';
import Meta from '../../components/shared/Meta';
import {
  MdBookmarkAdd,
  MdBookmark,
  MdBookmarkRemove,
  MdRocket,
  MdBolt,
} from 'react-icons/md';
import { MdExpandMore } from 'react-icons/md';
import WiredLessonCard from '../../components/shared/WiredLessonCard';
import LessonSubscribe from '../../components/shared/LessonSubscribe';
import { buildLessonJsonLd } from '../../libs/seo/lessonJsonLd';
import { generateMetadata } from '../../libs/seo/generateMetadata';
import { optimizeTiptapImages } from '../../libs/tiptapContent';

const Page = ({
  lesson,
  enableProgressTracking = false,
  enableDemoQuiz = false,
}) => {
  const normalizeWiredLessonIds = (raw) => {
    if (Array.isArray(raw)) {
      return raw.map((id) => String(id || '').trim()).filter(Boolean);
    }
    if (typeof raw === 'string') {
      const s = raw.trim();
      if (!s) return [];
      try {
        const parsed = JSON.parse(s);
        if (Array.isArray(parsed)) {
          return parsed.map((id) => String(id || '').trim()).filter(Boolean);
        }
      } catch {
        // fall through and treat as comma-separated string
      }
      return s
        .split(',')
        .map((id) => id.trim())
        .filter(Boolean);
    }
    return [];
  };
  const router = useRouter();
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://packagingschool.com';
  const shareUrl = lesson?.slug
    ? `${siteUrl}/lessons/${lesson.slug}`
    : `${siteUrl}${router.asPath}`;
  const deviceType = getDeviceType();
  const { location, awsUser } = useSelector((state) => state.auth);
  const newDate =
    lesson &&
    new Date(
      lesson.backdate ? lesson.backdate : lesson.updatedAt,
    ).toLocaleDateString('en-US');
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isSaved, setIsSaved] = useState(false);
  const [isFeaturedCourse, setIsFeaturedCourse] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isFeaturedCard, setIsFeaturedCard] = useState(null);
  const [demoQuizSelections, setDemoQuizSelections] = useState({});
  const [demoQuizSubmitted, setDemoQuizSubmitted] = useState(false);
  const [isCompletingWiredLessons, setIsCompletingWiredLessons] =
    useState(false);
  const [wiredCompletionResults, setWiredCompletionResults] = useState([]);
  const [wiredCourseNames, setWiredCourseNames] = useState([]);
  const [showDemoQuizUpsell, setShowDemoQuizUpsell] = useState(false);
  const [quizEmail, setQuizEmail] = useState('');
  const [oauthPrincipalEmail, setOauthPrincipalEmail] = useState('');
  const wiredQuizRef = useRef(null);
  const wiredTakeUrlsByLessonIdRef = useRef({});

  const wiredQuestions = Array.isArray(lesson?.wiredQuestions)
    ? lesson.wiredQuestions
    : [];
  const wiredLessonIds = useMemo(
    () => normalizeWiredLessonIds(lesson?.wiredLessonId),
    [lesson?.wiredLessonId],
  );
  const wiredLessonIdsKey = wiredLessonIds.join('|');
  const isWiredDemo = Boolean(
    enableDemoQuiz && lesson?.wired && wiredQuestions.length > 0,
  );
  const isDemoQuizUnlocked = true;
  const answeredQuestionCount = Object.keys(demoQuizSelections).length;
  const isDemoQuizComplete =
    wiredQuestions.length > 0 &&
    answeredQuestionCount === wiredQuestions.length;
  const isDemoQuizCorrect =
    wiredQuestions.length > 0 &&
    wiredQuestions.every(
      (question, idx) =>
        String(demoQuizSelections[idx] || '').trim() ===
        String(question?.correctAnswer || '').trim(),
    );
  const hasOauthPrincipalEmail = Boolean(
    String(oauthPrincipalEmail || '').trim(),
  );
  const normalizedQuizEmail = String(quizEmail || '')
    .trim()
    .toLowerCase();
  const isQuizEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    normalizedQuizEmail,
  );
  const wiredCompletionSucceededCount = wiredCompletionResults.filter(
    (result) => result?.ok,
  ).length;
  const wiredCourseNamesText = useMemo(() => {
    if (!wiredCourseNames.length) return '';
    if (wiredCourseNames.length === 1) return wiredCourseNames[0];
    if (wiredCourseNames.length === 2) {
      return `${wiredCourseNames[0]} and ${wiredCourseNames[1]}`;
    }
    return wiredCourseNames.join(', ');
  }, [wiredCourseNames]);

  const lessonJsonLd = lesson ? buildLessonJsonLd(lesson, siteUrl) : null;

  useEffect(() => {
    if (awsUser?.savedLessons && lesson?.id) {
      setIsSaved(awsUser.savedLessons.includes(lesson.id));
    }
  }, [awsUser, lesson]);

  useEffect(() => {
    const loggedInEmail =
      user?.email || awsUser?.email || awsUser?.userName || '';
    if (loggedInEmail) {
      setQuizEmail(String(loggedInEmail).trim());
    }
  }, [awsUser?.email, awsUser?.userName, user?.email]);

  const tryPopulateQuizEmailFromOauth = async () => {
    try {
      const res = await fetch('/api/thinkific/oauth/me?identity=student');
      const json = await res.json().catch(() => ({}));
      const oauthEmail = String(json?.me?.email || '').trim();
      if (!oauthEmail) return false;

      setOauthPrincipalEmail(oauthEmail);
      setQuizEmail((prev) => (String(prev || '').trim() ? prev : oauthEmail));
      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    if (!isWiredDemo || !isDemoQuizUnlocked || normalizedQuizEmail) return;

    let cancelled = false;
    let timerId;

    const attemptPopulate = async () => {
      const found = await tryPopulateQuizEmailFromOauth();
      if (found && !cancelled && timerId) {
        window.clearInterval(timerId);
      }
    };

    attemptPopulate();
    timerId = window.setInterval(attemptPopulate, 3000);
    return () => {
      cancelled = true;
      if (timerId) {
        window.clearInterval(timerId);
      }
    };
  }, [isDemoQuizUnlocked, isWiredDemo, normalizedQuizEmail]);

  useEffect(() => {
    if (!enableProgressTracking || !wiredLessonIds.length) return;

    let ignore = false;
    const loadCourseNames = async () => {
      try {
        const res = await fetch('/api/thinkific/get-lesson-course-names', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lessonIds: wiredLessonIds }),
        });
        const json = await res.json().catch(() => ({}));
        if (ignore) return;
        if (res.ok && Array.isArray(json?.names) && json.names.length > 0) {
          setWiredCourseNames(json.names);
        }
        if (
          res.ok &&
          json?.takeUrlsByLessonId &&
          typeof json.takeUrlsByLessonId === 'object'
        ) {
          wiredTakeUrlsByLessonIdRef.current = json.takeUrlsByLessonId;
        }
      } catch {
        // Keep last successful names visible on transient failures.
      }
    };

    loadCourseNames();

    return () => {
      ignore = true;
    };
  }, [enableProgressTracking, wiredLessonIds, wiredLessonIdsKey]);

  const handleStartOauthTest = () => {
    if (typeof window === 'undefined') return;
    const sub = 'packagingschool';
    const returnTo = window.location.pathname;
    window.location.href = `/api/thinkific/oauth/start?subdomain=${encodeURIComponent(
      sub,
    )}&identity=student&returnTo=${encodeURIComponent(returnTo)}`;
  };

  useEffect(() => {
    const getFeaturedCard = async (type, id) => {
      if (type === 'CERT') {
        const featuredCard = await API.graphql({
          query: getCertificateObject,
          variables: {
            id: id,
          },
        });
        setIsFeaturedCard({
          type: 'CERT',
          obj: featuredCard.data.getCertificateObject,
        });
      } else if (type === 'COURSE') {
        const featuredCard = await API.graphql({
          query: getLMSCourse,
          variables: {
            id: id,
          },
        });
        setIsFeaturedCard({
          type: 'COURSE',
          obj: featuredCard.data.getLMSCourse,
        });
      }
    };

    let featuredData;
    if (lesson && lesson.featured) {
      try {
        featuredData = JSON.parse(lesson.featured);
      } catch (e) {
        featuredData = lesson.featured;
      }
    } else {
      featuredData = null;
      console.log('No lesson or featured data available');
    }

    if (lesson && featuredData && typeof featuredData === 'object') {
      getFeaturedCard(featuredData.type, featuredData.id);
    } else if (lesson && featuredData && typeof featuredData === 'string') {
      getFeaturedCard('COURSE', featuredData);
    }
  }, [lesson]);

  const sortedSources = useMemo(() => {
    if (lesson && lesson.sources.items) {
      const sorted =
        lesson &&
        lesson.sources.items &&
        lesson.sources.items.sort(function (a, b) {
          return a.position - b.position;
        });

      const chunkSize = sorted && sorted.length / 2;
      const chunks = [];

      for (let i = 0; i < sorted.length; i += chunkSize) {
        const chunk = sorted.slice(i, i + chunkSize);
        chunks.push(chunk);
      }

      return chunks;
    } else return null;
  }, [lesson]);

  const contentWithImagePriority = useMemo(
    () => optimizeTiptapImages(lesson?.content, { prioritizeFirstImage: true }),
    [lesson?.content],
  );

  const actionClickHandler = () => {
    if (user) {
      window.open(lesson.actionLink);
    } else {
      dispatch(toggleSignInModal());
    }
  };

  const handleCertClick = async (abbreviation, link) => {
    const data = {
      country: location.country,
      ipAddress: location.ipAddress,
      device: deviceType,
      object: abbreviation,
      page: router.asPath,
      type: 'CERTIFICATE-VIEW',
    };
    await registerCertificateClick(data);
    router.push(link);
  };

  const handleCourseClick = async (id, slug, altLink, type) => {
    await registgerCourseClick(
      id,
      router.asPath,
      location,
      slug,
      'COURSE-VIEW',
    );
    altLink
      ? router.push(altLink)
      : router.push(
          `/${
            type && type === 'COLLECTION' ? 'collections' : 'courses'
          }/${slug}`,
        );
  };

  const refreshUser = async () => {
    const dbUser = await getAWSUser(user.email);
    if (dbUser) {
      dispatch(setAWSUser(dbUser));
    }
  };

  const getFeaturedCard = async ({ featured }) => {
    if (featured && featured.type === 'COURSE') {
      const course = await getCourse(featured.id);
      setIsFeaturedCard(course);
    } else if (featured && featured.type === 'CERT') {
      const cert = await getCertificate(featured.id);
      setIsFeaturedCard(cert);
    }
  };

  useEffect(() => {
    if (lesson && lesson.featured) {
      getFeaturedCard(lesson.featured);
    }
  }, [lesson]);

  useEffect(() => {
    if (!isDemoQuizUnlocked) {
      setDemoQuizSelections({});
      setDemoQuizSubmitted(false);
      setIsCompletingWiredLessons(false);
      setWiredCompletionResults([]);
      setShowDemoQuizUpsell(false);
    }
  }, [isDemoQuizUnlocked]);

  const handleDemoQuizSubmit = async () => {
    setDemoQuizSubmitted(true);
    if (!isQuizEmailValid) return;
    if (!isDemoQuizCorrect) return;

    setShowDemoQuizUpsell(true);

    if (!wiredLessonIds.length) {
      setWiredCompletionResults([
        {
          lessonId: null,
          ok: true,
          note: 'No wiredLessonId values configured on this lesson.',
        },
      ]);
      return;
    }

    setIsCompletingWiredLessons(true);
    try {
      const results = [];
      for (const lessonId of wiredLessonIds) {
        const response = await fetch('/api/thinkific/mark-lesson-complete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            lessonId,
            email: normalizedQuizEmail,
            useOAuth: true,
            oauthIdentity: 'student',
          }),
        });
        const body = await response.json().catch(() => ({ parseError: true }));
        results.push({
          lessonId,
          httpStatus: response.status,
          ok: response.ok,
          body,
        });
      }
      setWiredCompletionResults(results);
    } catch (error) {
      setWiredCompletionResults([
        {
          lessonId: null,
          ok: false,
          message: error?.message || String(error),
        },
      ]);
    } finally {
      setIsCompletingWiredLessons(false);
    }
  };

  const handleResetDemoQuiz = () => {
    setDemoQuizSelections({});
    setDemoQuizSubmitted(false);
    setWiredCompletionResults([]);
    setShowDemoQuizUpsell(false);
  };

  const handleBookmarkToggle = async () => {
    if (!awsUser || !lesson?.id) {
      dispatch(toggleSignInModal());
      return;
    }

    try {
      const newSavedLessons = isSaved
        ? awsUser.savedLessons.filter((id) => id !== lesson.id)
        : [...(awsUser.savedLessons || []), lesson.id];

      await handleBookmarkAdd(newSavedLessons, awsUser.id);
      setIsSaved(!isSaved);
      await refreshUser();
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      // Revert the UI state if the API call fails
      setIsSaved(isSaved);
    }
  };

  const metadata = lesson
    ? generateMetadata({
        pageType: 'LESSON',
        data: lesson,
        pathname: `/lessons/${lesson.slug}`,
      })
    : null;

  return (
    lesson && (
      <>
        <Meta
          title={metadata.title}
          description={metadata.description}
          image={lesson.seoImage}
          url={`/lessons/${lesson.slug}`}
          type='article'
          preloadImage={
            (lesson.mediaType === 'VIDEO' || lesson.mediaType === 'IMAGE') &&
            lesson.seoImage
              ? lesson.seoImage
              : undefined
          }
          structuredData={[
            lessonJsonLd?.breadcrumb,
            lessonJsonLd?.article,
          ].filter(Boolean)}
        />
        {enableDemoQuiz && showDemoQuizUpsell && (
          <div className='fixed inset-0 z-[80] bg-black/60 backdrop-blur-[2px] flex items-center justify-center p-4'>
            <div className='w-full max-w-2xl bg-white dark:bg-base-dark rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 lg:p-8'>
              <div className='text-xs lg:text-sm font-semibold tracking-[0.08em] uppercase text-brand-yellow mb-2'>
                Milestone unlocked
              </div>
              <h2 className='text-2xl lg:text-3xl font-bold leading-tight dark:text-white mb-3'>
                You&apos;ve completed 10% of the Certificate of Sustainable
                Packaging.
              </h2>
              <p className='text-gray-700 dark:text-gray-200 text-base lg:text-lg mb-2'>
                You&apos;re building real momentum. Enroll in the full
                certificate to keep this progress, deepen your packaging
                sustainability expertise, and earn a credential that strengthens
                your resume and LinkedIn profile.
              </p>
              <p className='text-gray-600 dark:text-gray-300 mb-6'>
                Turn this first win into a complete career-ready achievement.
              </p>
              <div className='mb-6 text-sm'>
                {isCompletingWiredLessons ? (
                  <div className='text-gray-700 dark:text-gray-200'>
                    Saving your wired lesson completion to Thinkific...
                  </div>
                ) : wiredCompletionResults.length > 0 ? (
                  <div className='text-gray-700 dark:text-gray-200'>
                    Thinkific completion calls succeeded for{' '}
                    <strong>
                      {wiredCompletionSucceededCount}/
                      {wiredCompletionResults.length}
                    </strong>{' '}
                    lesson IDs.
                  </div>
                ) : (
                  <div className='text-gray-700 dark:text-gray-200'>
                    Completion will be saved to Thinkific for your wired lesson
                    IDs.
                  </div>
                )}
              </div>

              <div className='flex flex-col sm:flex-row gap-3'>
                <Link
                  href='/certifications/get-to-know-csp'
                  className='inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm lg:text-base font-semibold bg-brand-yellow text-black hover:brightness-95 transition'
                >
                  Continue to Full Certificate
                </Link>
                <button
                  type='button'
                  onClick={() => setShowDemoQuizUpsell(false)}
                  className='inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm lg:text-base font-semibold border border-gray-300 dark:border-gray-600 dark:text-white'
                >
                  Keep Reading This Lesson
                </button>
              </div>
            </div>
          </div>
        )}
        <div className='w-full max-w-7xl mx-auto py-10 lg:py-16 flex flex-col px-4 lg:px-0'>
          <div className='w-full grid grid-cols-12 gap-4 lg:gap-10 relative'>
            <div className='absolute top-0 -left-16 !hidden lg:!flex h-full w-fit'>
              <div className='flex flex-col gap-2 w-fit sticky top-32 h-screen'>
                {isSaved ? (
                  <div
                    className='flex gap-2 items-center cursor-pointer relative w-full'
                    onClick={handleBookmarkToggle}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    {isHovering && (
                      <div className='absolute top-0 -left-16 w-fit text-xs text-white bg-black/90 flex items-center justify-center p-1 rounded'>
                        Bookmark
                      </div>
                    )}
                    <MdBookmarkRemove size={40} color='gray' />
                  </div>
                ) : (
                  <div
                    className='flex gap-2 items-center cursor-pointer relative w-full'
                    onClick={handleBookmarkToggle}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    {isHovering && (
                      <div className='absolute top-0 -left-16 w-fit text-xs text-white bg-black/90 flex items-center justify-center p-1 rounded'>
                        Bookmark
                      </div>
                    )}
                    <MdBookmarkAdd size={40} color='green' />
                  </div>
                )}
                <LessonShareButtons
                  shareUrl={shareUrl}
                  lesson={lesson}
                  size={40}
                />
              </div>
            </div>
            <div className='col-span-12 lg:!col-span-9 flex flex-col gap-6 lg:gap-10'>
              <div className='w-full flex flex-col gap-5 lg:!gap-9 max-w-4xl'>
                <h1 className='text-4xl lg:!text-5xl font-medium font-oswald dark:text-white'>
                  {lesson.title}
                </h1>
                <div className=' text-gray-500 text-xl'>{lesson.subhead}</div>
              </div>
              {lesson.mediaType === 'IMAGE' &&
                (lesson.seoImage || lesson.media) && (
                  <div className='w-full aspect-[16/9] relative border-b border-b-gray-400 mb-5 overflow-hidden'>
                    <Image
                      src={lesson.seoImage || lesson.media}
                      alt=''
                      fill
                      sizes='(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 960px'
                      className='object-cover'
                      priority
                      fetchPriority='high'
                    />
                  </div>
                )}
              {lesson.mediaType === 'VIDEO' &&
                (lesson.seoImage ? (
                  <LessonVideoHero
                    posterUrl={lesson.seoImage}
                    videoEmbedLink={lesson.media}
                    slug={lesson.slug}
                    videoLink={lesson.videoLink}
                  />
                ) : (
                  <div className='w-full object-cover border-b border-b-gray-400 mb-5'>
                    <div className='w-full h-full'>
                      <VideoPlayerInView
                        videoEmbedLink={lesson.media}
                        playing={false}
                      />
                    </div>
                    {lesson.videoLink && (
                      <div className='w-full py-2 flex items-center justify-center bg-base-dark'>
                        <div className='text-white font-semibold'>
                          Trouble viewing video? Try{' '}
                          <Link
                            href={`/alt/lessons/${lesson.slug}`}
                            className='text-brand-yellow underline'
                          >
                            Alt Link 1
                          </Link>
                          ,{' '}
                          <a
                            href={lesson.videoLink}
                            className='text-brand-yellow underline'
                          >
                            Alt Link 2
                          </a>
                          .
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              {enableProgressTracking && (
                <div>
                  <div className='w-full border border-brand-yellow/50 bg-white dark:bg-base-dark rounded-xl px-4 lg:px-5 py-3 flex items-center gap-4 lg:gap-5 shadow-md'>
                    <div className='hidden sm:block w-24 h-24 lg:w-28 lg:h-28 shrink-0'>
                      <Lottie
                        animationData={lessonAnimation}
                        loop={true}
                        autoplay={true}
                        className='w-full h-full'
                      />
                    </div>
                    <div className='flex-1'>
                      <div className='text-base lg:text-lg font-bold text-black dark:text-white leading-tight'>
                        {wiredCourseNames.length ? (
                          <>
                            This lesson is a part of{' '}
                            <span className='text-clemson leading-none'>
                              {wiredCourseNamesText}
                            </span>
                            .
                          </>
                        ) : (
                          'This lesson is a part of our course credits track.'
                        )}
                      </div>
                      <div className='text-base lg:text-lg text-gray-800 dark:text-gray-100 mt-2'>
                        Complete the short assessment below to earn credit
                        toward the full course.
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div
                dangerouslySetInnerHTML={{ __html: contentWithImagePriority }}
                className='tiptap lg:text-lg'
              />
              {isWiredDemo && (
                <div
                  ref={wiredQuizRef}
                  className='w-full border border-sky-200 dark:border-sky-700 rounded-xl p-6 lg:p-7 flex flex-col gap-5 bg-sky-50 dark:bg-sky-950/40'
                >
                  <h2 className='text-xl lg:text-2xl font-semibold dark:text-white'>
                    Lesson Quiz
                  </h2>

                  <div>
                    <div className='flex flex-col gap-5'>
                      {wiredQuestions.map((question, questionIndex) => (
                        <div
                          key={`wired-question-${questionIndex}`}
                          className='flex flex-col gap-3'
                        >
                          <div className='text-base lg:text-lg font-medium dark:text-white'>
                            {questionIndex + 1}. {question.question}
                          </div>
                          <div className='flex flex-col gap-2'>
                            {(question.options || []).map((option) => (
                              <label
                                key={`${questionIndex}-${option}`}
                                className='flex items-center gap-3 text-sm lg:text-base dark:text-gray-100'
                              >
                                <input
                                  type='radio'
                                  name={`wired-quiz-answer-${questionIndex}`}
                                  value={option}
                                  checked={
                                    demoQuizSelections[questionIndex] === option
                                  }
                                  onChange={(e) =>
                                    setDemoQuizSelections((prev) => ({
                                      ...prev,
                                      [questionIndex]: e.target.value,
                                    }))
                                  }
                                />
                                <span>{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className='flex items-center gap-3'>
                    <div className='flex-1 min-w-[220px] flex flex-col gap-2'>
                      {hasOauthPrincipalEmail ? (
                        <div className='px-4 py-3 rounded-lg border border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/30 text-sm lg:text-base text-green-900 dark:text-green-100'>
                          {oauthPrincipalEmail}
                        </div>
                      ) : (
                        <>
                          <input
                            type='email'
                            value={quizEmail}
                            onChange={(e) => setQuizEmail(e.target.value)}
                            placeholder='Email required to save progress'
                            className='w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm lg:text-base'
                          />
                          <div className='text-xs lg:text-sm text-gray-700 dark:text-gray-200'>
                            Already a learner?{' '}
                            <button
                              type='button'
                              onClick={handleStartOauthTest}
                              className='underline text-blue-700 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-200 font-semibold'
                            >
                              Log in to complete
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                    <button
                      type='button'
                      disabled={
                        !isDemoQuizUnlocked ||
                        !isDemoQuizComplete ||
                        isCompletingWiredLessons ||
                        !isQuizEmailValid
                      }
                      onClick={handleDemoQuizSubmit}
                      className='px-5 py-3 rounded-lg text-base font-semibold bg-black text-white disabled:opacity-50 disabled:cursor-not-allowed dark:bg-white dark:text-black'
                    >
                      {isCompletingWiredLessons
                        ? 'Saving completion...'
                        : 'Submit answers'}
                    </button>
                    {demoQuizSubmitted && !isDemoQuizCorrect && (
                      <button
                        type='button'
                        onClick={handleResetDemoQuiz}
                        aria-label='Reset quiz'
                        title='Reset quiz'
                        className='h-11 w-11 inline-flex items-center justify-center rounded-lg text-xl font-semibold border border-gray-300 dark:border-gray-600 dark:text-white'
                      >
                        ↺
                      </button>
                    )}
                    {demoQuizSubmitted && (
                      <div
                        className={`text-sm font-medium ${
                          isDemoQuizCorrect
                            ? 'text-green-700 dark:text-green-300'
                            : 'text-red-700 dark:text-red-300'
                        }`}
                      >
                        {!isQuizEmailValid
                          ? 'Enter a valid email to save progress.'
                          : isDemoQuizCorrect
                            ? 'Correct. Nice work.'
                            : 'One or more answers are incorrect. Try again.'}
                      </div>
                    )}
                  </div>
                  {!!wiredCompletionResults.length && (
                    <pre className='mt-2 p-3 rounded bg-gray-100 dark:bg-gray-900 text-xs overflow-auto'>
                      {JSON.stringify(wiredCompletionResults, null, 2)}
                    </pre>
                  )}
                </div>
              )}
              {lesson.analysis && awsUser && (
                <div className='w-full'>
                  <LessonQuiz analysis={lesson.analysis} lessonId={lesson.id} />
                </div>
              )}
            </div>
            <div className='col-span-12 lg:col-span-3 border-l-0 lg:border-l border-l-gray-400 lg:!pl-4'>
              <div className='w-full flex flex-col'>
                <div className='flex flex-col gap-5 px-4 lg:px-0'>
                  <div className='text-sm text-gray-700'>{newDate}</div>
                  {lesson.author && (
                    <div className='flex flex-col w-full gap-3 '>
                      {lesson.author.map((a) => (
                        <div key={a} className='w-fit'>
                          <AuthorBlock id={a} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className='flex flex-col gap-5 py-5 px-4 lg:px-0'>
                  <div className='grid grid-cols-3 gap-2 w-fit lg:hidden'>
                    {isSaved ? (
                      <div
                        className='flex gap-2 items-center cursor-pointer'
                        onClick={handleBookmarkToggle}
                      >
                        <MdBookmarkRemove size={32} color='gray' />
                      </div>
                    ) : (
                      <div
                        className='flex gap-2 items-center cursor-pointer'
                        onClick={handleBookmarkToggle}
                      >
                        <MdBookmarkAdd size={32} color='green' />
                      </div>
                    )}
                    <LessonShareButtons
                      shareUrl={shareUrl}
                      lesson={lesson}
                      size={32}
                    />
                  </div>
                  {lesson.analysis && (
                    <div className='flex flex-col gap-0'>
                      <div className='font-bold text-sm'>
                        Estimated Reading Time
                      </div>
                      <div className='italic text-sm'>
                        {lesson.analysis.readingTime} minutes
                      </div>
                    </div>
                  )}
                  {lesson.tags &&
                    lesson.tags.items &&
                    lesson.tags.items.length > 0 && (
                      <div className='flex flex-col gap-2'>
                        <div className='font-bold text-sm'>Tags</div>
                        <div className='text-sm flex flex-wrap gap-1'>
                          {lesson.tags.items.map((tag) => (
                            <div
                              key={tag.tags.tag}
                              className='bg-gray-900 text-white px-1.5 py-0.5 rounded'
                            >
                              {tag.tags.tag}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              </div>
              <div className='w-full border-b border-b-gray-400 py-2'></div>
              <div className='flex flex-col gap-5 py-5 px-4 lg:px-0'>
                <div className='flex flex-col gap-3 bg-brand-yellow/20 dark:bg-base-mid dark:text-white px-3 py-4 lg:rounded'>
                  <div className='flex items-center gap-0'>
                    <div>
                      <MdBolt size={22} color='black' />
                    </div>
                    <div>
                      <div className='font-bold'>Expand Your Knowledge</div>
                    </div>
                  </div>
                  {isFeaturedCard && isFeaturedCard.type === 'COURSE' ? (
                    <div className='w-full flex flex-col gap-2'>
                      <VideoPlayerInView
                        videoEmbedLink={isFeaturedCard.obj.preview}
                        light={false}
                        playing={true}
                      />
                      <div className='font-bold text-sm'>
                        {isFeaturedCard.obj.title}
                      </div>
                      <div className='text-xs'>
                        {isFeaturedCard.obj.subheadline}
                      </div>
                      <div
                        className='w-full flex justify-end text-sm font-bold gap-3 text-clemson-dark cursor-pointer'
                        onClick={() => {
                          handleCourseClick(
                            isFeaturedCard.obj.id,
                            isFeaturedCard.obj.slug,
                            isFeaturedCard.obj.altLink,
                            isFeaturedCard.obj.type,
                          );
                        }}
                      >
                        Get Started &rarr;
                      </div>
                    </div>
                  ) : isFeaturedCard && isFeaturedCard.type === 'CERT' ? (
                    <div className='w-full flex flex-col gap-3'>
                      <div className='w-full aspect-[4/3] relative bg-black overflow-hidden'>
                        {isFeaturedCard.obj.seoImage && (
                          <Image
                            src={isFeaturedCard.obj.seoImage}
                            alt=''
                            fill
                            sizes='(max-width: 1024px) 100vw, 400px'
                            className='object-cover'
                            loading='lazy'
                          />
                        )}
                      </div>
                      <div className='font-bold text-sm'>
                        {isFeaturedCard.obj.title}
                      </div>
                      <div className='text-xs'>
                        {isFeaturedCard.obj.description}
                      </div>
                      <div
                        className='w-full flex justify-end text-sm font-bold gap-3 text-clemson-dark cursor-pointer'
                        onClick={() => {
                          handleCertClick(
                            isFeaturedCard.obj.abbreviation,
                            isFeaturedCard.obj.link,
                          );
                        }}
                      >
                        Get Started &rarr;
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className='w-full border-b border-b-gray-400 pt-2'></div>

              <div className='flex flex-col py-5 gap-3 w-full px-4 lg:px-0'>
                <div className='font-bold text-sm'>Related Lessons</div>
                <div className='flex flex-col gap-5'>
                  {lesson.related && lesson.related.length > 0 ? (
                    lesson.related.map((cou) => (
                      <div className='w-full' key={cou}>
                        <WiredLessonCard
                          key={cou}
                          id={cou}
                          external={true}
                          reference={`/lessons/${cou}`}
                        />
                      </div>
                    ))
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className='w-full border-b border-b-gray-400 pt-2'></div>
              <div className='flex flex-col gap-5 py-5 mt-3 px-4 lg:px-0'>
                <LessonSubscribe />
              </div>
            </div>
            <div className='col-span-full overflow-hidden'>
              {lesson.sources && sortedSources && sortedSources.length > 0 && (
                <div className='hidden lg:flex flex-col gap-3 border-t border-t-black dark:border-t-white pt-6'>
                  <div className='font-bold dark:text-white'>Sources</div>
                  <div className='grid lg:grid-cols-2 dark:text-white gap-3 text-xs'>
                    <div className='flex flex-col gap-3'>
                      {sortedSources[0].map((sou) => (
                        <div className='flex gap-1' key={sou.id}>
                          <div>
                            <sup>{sou.position}</sup>
                          </div>
                          <div className='break-all w-full'>
                            <a href={sou.link}>{sou.name}</a>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className='flex flex-col gap-3'>
                      {sortedSources[1].map((sou) => (
                        <div className='flex gap-1' key={sou.id}>
                          <div>
                            <sup>{sou.position}</sup>
                          </div>
                          <div className='break-all w-full'>
                            <a href={sou.link}>{sou.name}</a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    )
  );
};

export async function getStaticPaths() {
  const res = await API.graphql({
    query: listLessons,
  });
  const paths = res.data.listLessons.items
    .filter((it) => it.status != 'DRAFT')
    .map((lesson) => ({
      params: { id: lesson.slug },
    }));

  // Important for social scrapers (LinkedIn, etc): ensure the first request
  // returns fully-rendered HTML with OG tags, not a JS-driven fallback.
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const { id } = params;

  const getLesson = /* GraphQL */ `
    query MyQuery($slug: String!) {
      lessonsBySlug(slug: $slug) {
        items {
          id
          links {
            items {
              name
              link
              lessonLinksId
            }
          }
          learningPaths {
            items {
              learningPathLessonsId
            }
          }
          analysis {
            id
            quizCorrectAnswer
            quizOptions
            quizQuestion
            readingTime
          }
          author
          videoLink
          backdate
          media
          mediaType
          content
          objectives
          seoImage
          slides
          slug
          actionCTA
          actionLink
          actionSubhead
          actionExample
          actionLinkTitle
          tags {
            items {
              tags {
                tag
              }
            }
          }
          sources {
            items {
              name
              link
              lessonSourcesId
              position
            }
          }
          subhead
          title
          featured
          related
          type
          updatedAt
        }
      }
    }
  `;

  const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT;
  const GRAPHQL_API_KEY = process.env.GRAPHQL_API_KEY;

  const variables = {
    slug: id, // key is "input" based on the mutation above
  };

  const res = await API.graphql({ query: getLesson, variables: variables });
  const lesson = res.data.lessonsBySlug.items[0];

  if (!lesson) {
    return { notFound: true, revalidate: 60 };
  }

  return { props: { lesson }, revalidate: 10 };
}

export default Page;
