import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import React, { useMemo, useEffect, useState, useRef } from 'react';
import { API } from 'aws-amplify';
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import lessonAnimation from '/public/lesson.json';
import confettiAnimation from '/public/Confetti2.json';

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
  enableBoosterFlow = false,
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
  const [boosterSaveResult, setBoosterSaveResult] = useState(null);
  const [wiredCourseNames, setWiredCourseNames] = useState([]);
  const [showDemoQuizUpsell, setShowDemoQuizUpsell] = useState(false);
  const [showUpsellCard, setShowUpsellCard] = useState(false);
  const [boosterLessonPercent, setBoosterLessonPercent] = useState(0);
  const [boosterLessonCourseTitle, setBoosterLessonCourseTitle] = useState('');
  const [boosterCourseCallout, setBoosterCourseCallout] = useState(null);
  const [leadFirstName, setLeadFirstName] = useState('');
  const [leadLastName, setLeadLastName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [popupFormError, setPopupFormError] = useState('');
  const wiredQuizRef = useRef(null);
  const wiredCourseIdsByLessonIdRef = useRef({});
  const wiredCourseDetailsByCourseIdRef = useRef({});
  const wiredTakeUrlsByLessonIdRef = useRef({});
  const wiredCheckoutUrlsByLessonIdRef = useRef({});

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
  const normalizedLeadEmail = String(leadEmail || '')
    .trim()
    .toLowerCase();
  const isLeadEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    normalizedLeadEmail,
  );
  const wiredCourseNamesText = useMemo(() => {
    if (!wiredCourseNames.length) return '';
    if (wiredCourseNames.length === 1) return wiredCourseNames[0];
    if (wiredCourseNames.length === 2) {
      return `${wiredCourseNames[0]} and ${wiredCourseNames[1]}`;
    }
    return wiredCourseNames.join(', ');
  }, [wiredCourseNames]);
  const boosterCourseTitle =
    boosterLessonCourseTitle || wiredCourseNames?.[0] || 'your Packaging School course';
  const boosterCourseDetail = boosterCourseCallout;

  const lessonJsonLd = lesson ? buildLessonJsonLd(lesson, siteUrl) : null;

  useEffect(() => {
    if (awsUser?.savedLessons && lesson?.id) {
      setIsSaved(awsUser.savedLessons.includes(lesson.id));
    }
  }, [awsUser, lesson]);

  useEffect(() => {
    const loggedInFirstName =
      user?.given_name || awsUser?.firstName || '';
    const loggedInLastName =
      user?.family_name || awsUser?.lastName || '';
    const loggedInEmail =
      user?.email || awsUser?.email || awsUser?.userName || '';
    if (loggedInFirstName) {
      setLeadFirstName((prev) => prev || String(loggedInFirstName).trim());
    }
    if (loggedInLastName) {
      setLeadLastName((prev) => prev || String(loggedInLastName).trim());
    }
    if (loggedInEmail) {
      setLeadEmail((prev) => prev || String(loggedInEmail).trim());
    }
  }, [
    awsUser?.email,
    awsUser?.firstName,
    awsUser?.lastName,
    awsUser?.userName,
    user?.email,
    user?.family_name,
    user?.given_name,
  ]);

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
          json?.courseIdsByLessonId &&
          typeof json.courseIdsByLessonId === 'object'
        ) {
          wiredCourseIdsByLessonIdRef.current = json.courseIdsByLessonId;
        }
        if (
          res.ok &&
          json?.courseDetailsByCourseId &&
          typeof json.courseDetailsByCourseId === 'object'
        ) {
          wiredCourseDetailsByCourseIdRef.current = json.courseDetailsByCourseId;
          const details = json.courseDetailsByCourseId;
          const mappedIds =
            json?.courseIdsByLessonId && typeof json.courseIdsByLessonId === 'object'
              ? json.courseIdsByLessonId
              : {};
          const firstCourseId = wiredLessonIds.find((id) => mappedIds[id]) || null;
          const primaryCourseId = firstCourseId ? mappedIds[firstCourseId] : null;
          const fallbackDetail = Object.values(details)[0] || null;
          setBoosterCourseCallout(
            (primaryCourseId && details[primaryCourseId]) || fallbackDetail || null,
          );
        }
        if (enableBoosterFlow && res.ok) {
          const courseIdsByLessonId =
            json?.courseIdsByLessonId &&
            typeof json.courseIdsByLessonId === 'object'
              ? json.courseIdsByLessonId
              : {};
          const primaryCourseId =
            (Array.isArray(json?.courseIds) && json.courseIds[0]) ||
            Object.values(courseIdsByLessonId)[0];

          if (primaryCourseId) {
            const lessonCountInCourse = wiredLessonIds.filter(
              (lessonId) => courseIdsByLessonId[lessonId] === primaryCourseId,
            ).length;
            const numerator = Math.max(1, lessonCountInCourse);
            const outlineRes = await fetch(
              `/api/thinkific/get-course-outline?id=${encodeURIComponent(
                primaryCourseId,
              )}`,
            );
            const outlineJson = await outlineRes.json().catch(() => ({}));
            const totalLessons = Number(
              outlineJson?.data?.course?.curriculum?.lessonsCount ||
                outlineJson?.data?.data?.course?.curriculum?.lessonsCount ||
                0,
            );
            const calcPercent =
              totalLessons > 0
                ? Math.max(
                    0,
                    Math.min(
                      100,
                      Math.round(((numerator / totalLessons) * 100 + Number.EPSILON) * 100) / 100,
                    ),
                  )
                : 0;
            setBoosterLessonPercent(calcPercent);
            setBoosterLessonCourseTitle(
              json?.results?.find((item) => item?.courseId === primaryCourseId)
                ?.courseName || json?.names?.[0] || '',
            );
          }
        }
        if (
          res.ok &&
          json?.takeUrlsByLessonId &&
          typeof json.takeUrlsByLessonId === 'object'
        ) {
          wiredTakeUrlsByLessonIdRef.current = json.takeUrlsByLessonId;
        }
        if (
          res.ok &&
          json?.checkoutUrlsByLessonId &&
          typeof json.checkoutUrlsByLessonId === 'object'
        ) {
          wiredCheckoutUrlsByLessonIdRef.current = json.checkoutUrlsByLessonId;
        }
      } catch {
        // Keep last successful names visible on transient failures.
      }
    };

    loadCourseNames();

    return () => {
      ignore = true;
    };
  }, [enableBoosterFlow, enableProgressTracking, wiredLessonIds, wiredLessonIdsKey]);

  useEffect(() => {
    if (!showDemoQuizUpsell) {
      setShowUpsellCard(false);
      return;
    }
    const timer = setTimeout(() => {
      setShowUpsellCard(true);
    }, 220);
    return () => clearTimeout(timer);
  }, [showDemoQuizUpsell]);

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

  const handleDemoQuizSubmit = async () => {
    setDemoQuizSubmitted(true);
    if (!isDemoQuizCorrect) return;
    setShowDemoQuizUpsell(true);
  };

  const handleContinueMyLearning = async () => {
    const firstName = String(leadFirstName || '').trim();
    const lastName = String(leadLastName || '').trim();
    const email = normalizedLeadEmail;

    if (enableBoosterFlow) {
      if (!user || !awsUser?.id) {
        setPopupFormError('Please log in to save your booster lesson progress.');
        window.location.href = `/api/auth/login?returnTo=${encodeURIComponent(
          router.asPath,
        )}`;
        return;
      }
    } else if (!firstName || !lastName || !isLeadEmailValid) {
      setPopupFormError('Enter first name, last name, and a valid email.');
      return;
    }
    setPopupFormError('');

    const firstCheckoutUrl = wiredLessonIds
      .map((id) => wiredCheckoutUrlsByLessonIdRef.current[id])
      .find(Boolean);
    const checkoutCtaUrl = firstCheckoutUrl
      ? `${firstCheckoutUrl}${
          firstCheckoutUrl.includes('?') ? '&' : '?'
        }et=free_trial`
      : null;

    let shouldNavigateToBoosterProfile = false;
    if (!wiredLessonIds.length) {
      if (enableBoosterFlow) {
        shouldNavigateToBoosterProfile = true;
      } else if (checkoutCtaUrl) {
        window.location.href = checkoutCtaUrl;
      }
      if (shouldNavigateToBoosterProfile) {
        router.push('/profile?tab=boosterProgress');
      }
      return;
    }

    setIsCompletingWiredLessons(true);
    try {
      if (enableBoosterFlow) {
        const response = await fetch('/api/booster/upsert-progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: awsUser.id,
            userEmail: user?.email || awsUser?.email || email,
            lessonIds: wiredLessonIds,
          }),
        });
        const body = await response.json().catch(() => ({ parseError: true }));
        setBoosterSaveResult({
          ok: response.ok,
          progressCount: Array.isArray(body?.progress) ? body.progress.length : 0,
          issuedCodes: Array.isArray(body?.issuedCodes) ? body.issuedCodes : [],
          body,
        });
        if (!response.ok) {
          setPopupFormError(
            body?.message || 'We could not save your booster progress right now.',
          );
          return;
        }
        shouldNavigateToBoosterProfile = true;
      } else {
        const results = [];
        for (const lessonId of wiredLessonIds) {
          const response = await fetch('/api/thinkific/mark-lesson-complete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              lessonId,
              email,
              useOAuth: true,
              oauthIdentity: 'student',
            }),
          });
          // eslint-disable-next-line no-await-in-loop
          const body = await response.json().catch(() => ({ parseError: true }));
          results.push({ ok: response.ok, body });
        }
        setBoosterSaveResult({
          ok: results.every((r) => r.ok),
          progressCount: results.length,
          issuedCodes: [],
          body: { results },
        });
      }
    } catch (error) {
      setBoosterSaveResult({
        ok: false,
        progressCount: 0,
        issuedCodes: [],
        body: { message: error?.message || String(error) },
      });
      if (enableBoosterFlow) {
        setPopupFormError(
          error?.message || 'We could not save your booster progress right now.',
        );
      }
    } finally {
      setIsCompletingWiredLessons(false);
      if (enableBoosterFlow && shouldNavigateToBoosterProfile) {
        router.push('/profile?tab=boosterProgress');
      } else if (checkoutCtaUrl) {
        window.location.href = checkoutCtaUrl;
      }
    }
  };

  const handleResetDemoQuiz = () => {
    setDemoQuizSelections({});
    setDemoQuizSubmitted(false);
    setBoosterSaveResult(null);
    setShowDemoQuizUpsell(false);
    setPopupFormError('');
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
            {enableBoosterFlow && (
              <div className='absolute inset-0 pointer-events-none opacity-95'>
                <Lottie
                  animationData={confettiAnimation}
                  loop={false}
                  autoplay
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            )}
            {enableBoosterFlow && (
              <div
                className='absolute inset-0 pointer-events-none opacity-70'
                style={{ transform: 'scale(1.2)' }}
              >
                <Lottie
                  animationData={confettiAnimation}
                  loop={false}
                  autoplay
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            )}
            <div
              className={`relative z-10 w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 lg:p-8 overflow-hidden transition-all duration-500 ease-out ${
                showUpsellCard
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-3 scale-[0.98]'
              }`}
            >
              <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-yellow/20 text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3'>
                <MdRocket size={16} />
                Lesson milestone
              </div>
              <h2 className='text-2xl lg:text-3xl font-bold leading-snug dark:text-white mb-3'>
                {enableBoosterFlow
                  ? `You've Completed ${boosterLessonPercent}% of the course`
                  : "You've Started the Course"}
              </h2>
              <p className='text-gray-700 dark:text-gray-200 text-base lg:text-lg mb-2'>
                {enableBoosterFlow
                  ? `Nice work - this lesson now counts toward ${boosterCourseTitle}.`
                  : 'Nice work - this lesson now counts toward your Packaging School course.'}
              </p>
              <p className='text-gray-600 dark:text-gray-300 mb-6'>
                {enableBoosterFlow
                  ? 'Keep the momentum going - complete more booster lessons, hit new percentage milestones, and unlock exclusive savings on this course.'
                  : 'Enter your name and email to save your progress and continue building toward certificate completion.'}
              </p>
              {enableBoosterFlow ? (
                <div
                  className={`mb-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900 px-4 py-3 text-sm ${
                    user && awsUser?.id ? '' : 'hidden'
                  }`}
                >
                  {user && awsUser?.id && (
                    <div className='text-gray-700 dark:text-gray-200'>
                      Saving progress for{' '}
                      <strong>{user?.email || awsUser?.email || awsUser?.name}</strong>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-3 mb-3'>
                    <input
                      type='text'
                      value={leadFirstName}
                      onChange={(e) => setLeadFirstName(e.target.value)}
                      placeholder='First name'
                      className='w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm lg:text-base'
                    />
                    <input
                      type='text'
                      value={leadLastName}
                      onChange={(e) => setLeadLastName(e.target.value)}
                      placeholder='Last name'
                      className='w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm lg:text-base'
                    />
                  </div>
                  <div className='mb-4'>
                    <input
                      type='email'
                      value={leadEmail}
                      onChange={(e) => setLeadEmail(e.target.value)}
                      placeholder='Email'
                      className='w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm lg:text-base'
                    />
                  </div>
                </>
              )}
              {popupFormError && (
                <div className='mb-4 text-sm font-medium text-red-700 dark:text-red-300'>
                  {popupFormError}
                </div>
              )}
              <div className='mb-6 text-sm'>
                {isCompletingWiredLessons ? (
                  <div className='text-gray-700 dark:text-gray-200'>
                    {enableBoosterFlow
                      ? 'Saving your booster lesson progress...'
                      : 'Saving your wired lesson completion to Thinkific...'}
                  </div>
                ) : boosterSaveResult ? (
                  <div className='text-gray-700 dark:text-gray-200'>
                    {boosterSaveResult.ok
                      ? `Progress saved for ${boosterSaveResult.progressCount} course(s).`
                      : 'We could not save progress right now. Please try again.'}
                    {boosterSaveResult.issuedCodes?.length > 0
                      ? ` ${boosterSaveResult.issuedCodes.length} milestone code(s) unlocked.`
                      : ''}
                  </div>
                ) : null}
              </div>
              {enableBoosterFlow && (
                <div className='mb-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/70 p-4'>
                  <div className='flex items-start gap-3'>
                    {boosterCourseDetail?.cardImageUrl ? (
                      <div className='w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-gray-200 dark:bg-gray-700'>
                        <Image
                          src={boosterCourseDetail.cardImageUrl}
                          alt={boosterCourseDetail?.name || 'Course image'}
                          width={80}
                          height={80}
                          className='w-full h-full object-cover'
                        />
                      </div>
                    ) : (
                      <div className='w-20 h-20 rounded-lg shrink-0 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs text-gray-600 dark:text-gray-300 font-semibold'>
                        Course
                      </div>
                    )}
                    <div className='min-w-0'>
                      <div className='text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1'>
                        {boosterCourseDetail?.name || boosterCourseTitle}
                      </div>
                      {boosterCourseDetail?.description && (
                        <p className='text-sm text-gray-700 dark:text-gray-300 line-clamp-3'>
                          {boosterCourseDetail.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {enableBoosterFlow ? (
                <div className='flex flex-col sm:flex-row gap-3'>
                  <button
                    type='button'
                    onClick={() => {
                      if (!user || !awsUser?.id) {
                        window.location.href = `/api/auth/login?returnTo=${encodeURIComponent(
                          router.asPath,
                        )}`;
                        return;
                      }
                      handleContinueMyLearning();
                    }}
                    disabled={isCompletingWiredLessons}
                    className='w-full inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm lg:text-base font-semibold bg-brand-yellow text-black hover:brightness-95 transition shadow-md disabled:opacity-60 disabled:cursor-not-allowed'
                  >
                    {user && awsUser?.id
                      ? 'View Booster Progress'
                      : 'Log In to Save Progress'}
                  </button>
                  <button
                    type='button'
                    onClick={() => setShowDemoQuizUpsell(false)}
                    className='inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm lg:text-base font-semibold border border-gray-300 dark:border-gray-600 dark:text-white'
                  >
                    Keep Reading This Lesson
                  </button>
                </div>
              ) : (
                <div className='flex flex-col sm:flex-row gap-3'>
                  <button
                    type='button'
                    onClick={handleContinueMyLearning}
                    className='inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm lg:text-base font-semibold bg-brand-yellow text-black hover:brightness-95 transition shadow-md'
                  >
                    Continue My Learning
                  </button>
                  <button
                    type='button'
                    onClick={() => setShowDemoQuizUpsell(false)}
                    className='inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm lg:text-base font-semibold border border-gray-300 dark:border-gray-600 dark:text-white'
                  >
                    Keep Reading This Lesson
                  </button>
                </div>
              )}
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
                    <button
                      type='button'
                      disabled={
                        !isDemoQuizComplete ||
                        isCompletingWiredLessons
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
                        {isDemoQuizCorrect
                            ? 'Correct. Nice work.'
                            : 'One or more answers are incorrect. Try again.'}
                      </div>
                    )}
                  </div>
                  {boosterSaveResult?.body && !boosterSaveResult.ok && (
                    <pre className='mt-2 p-3 rounded bg-gray-100 dark:bg-gray-900 text-xs overflow-auto'>
                      {JSON.stringify(boosterSaveResult.body, null, 2)}
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
