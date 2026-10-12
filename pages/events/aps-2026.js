import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRightIcon,
  CalendarDaysIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MapPinIcon,
  PhotoIcon,
  PlayCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { AcademicCapIcon } from '@heroicons/react/24/solid';
import Meta from '../../components/shared/Meta';
import VideoPlayer from '../../components/VideoPlayer';
import { getAbContext, trackAbPurchaseIntent } from '../../libs/analytics';

const LOGO =
  'https://packschool.s3.us-east-1.amazonaws.com/AutoPackSummit+RGB+COLOR+on+Transparent+Back.png';
const META_IMAGE =
  'https://autopacksummitapp94b14feadba64f23aff0ed8deae77b99bc6-dev.s3.us-east-1.amazonaws.com/public/2026/Bella%20Luna%20Photos%20Greenville%20SC-73-1280.jpg';
const THANK_YOU_VIDEO = 'https://youtu.be/7yDlnQcywng?si=of1YfTWWXY_8ZG3k';
const COMPLETION_COURSE =
  'https://learn.packagingschool.com/enroll/3901872?price_id=4873642';
const ATTENDEE_COOKIE = 'aps2026_attendee';
const PAGE_SIZE = 20;

const emptyAttendee = { email: '', firstName: '', lastName: '' };

const readAttendee = () => {
  if (typeof document === 'undefined') return null;
  const row = document.cookie
    .split('; ')
    .find((item) => item.startsWith(`${ATTENDEE_COOKIE}=`));
  if (!row) return null;
  try {
    return JSON.parse(
      decodeURIComponent(row.slice(ATTENDEE_COOKIE.length + 1)),
    );
  } catch {
    return null;
  }
};

const writeAttendee = ({ email, firstName, lastName }) => {
  const value = encodeURIComponent(
    JSON.stringify({ email, firstName, lastName }),
  );
  document.cookie = `${ATTENDEE_COOKIE}=${value}; path=/; max-age=${60 * 60 * 24 * 30}; samesite=lax`;
};

const sendToCompletionCourse = async ({ email, firstName, lastName }) => {
  try {
    const abContext = getAbContext();
    trackAbPurchaseIntent({
      ...abContext,
      email,
      source: 'pre_thinkific_redirect',
      metadata: {
        email,
        liFatId: abContext.liFatId,
        courseLink: COMPLETION_COURSE,
      },
    });
  } catch (error) {
    console.warn(
      'Failed to record pre-redirect purchase intent:',
      error?.message,
    );
  }

  try {
    const res = await fetch('/api/generateJWT', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        first_name: firstName,
        last_name: lastName,
        return_to: COMPLETION_COURSE,
      }),
    });
    const data = await res.json();
    window.location.href = data.url || COMPLETION_COURSE;
  } catch (error) {
    console.error('Completion certificate SSO failed', error);
    window.location.href = COMPLETION_COURSE;
  }
};

const NAV = [
  { href: '#photos', label: 'Photos', icon: PhotoIcon },
  { href: '#presentations', label: 'Presentations', icon: PlayCircleIcon },
  { href: '#certificate', label: 'Certificate', icon: AcademicCapIcon },
  { href: '#next-year', label: '2027', icon: CalendarDaysIcon },
];

const APS2026 = ({ photos = [] }) => {
  const [page, setPage] = useState(1);
  const [activePhoto, setActivePhoto] = useState(null);
  const [accessOpen, setAccessOpen] = useState(false);
  const [attendee, setAttendee] = useState(emptyAttendee);
  const [accessError, setAccessError] = useState('');
  const [accessPending, setAccessPending] = useState(false);

  const pageCount = Math.ceil(photos.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const visiblePhotos = photos.slice(start, start + PAGE_SIZE);

  useEffect(() => {
    if (activePhoto === null) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') setActivePhoto(null);
      if (event.key === 'ArrowRight') {
        setActivePhoto((current) => (current + 1) % photos.length);
      }
      if (event.key === 'ArrowLeft') {
        setActivePhoto(
          (current) => (current - 1 + photos.length) % photos.length,
        );
      }
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [activePhoto, photos.length]);

  useEffect(() => {
    if (!accessOpen) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') setAccessOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [accessOpen]);

  const openCompletionAccess = () => {
    const saved = readAttendee();
    setAttendee(saved ? { ...emptyAttendee, ...saved } : emptyAttendee);
    setAccessError('');
    setAccessOpen(true);
  };

  const submitCompletionAccess = async (event) => {
    event.preventDefault();
    const email = attendee.email.trim().toLowerCase();
    const firstName = attendee.firstName.trim();
    const lastName = attendee.lastName.trim();
    if (!email.includes('@') || !firstName || !lastName) {
      setAccessError('Enter your email, first name, and last name.');
      return;
    }
    setAccessPending(true);
    setAccessError('');
    const next = { email, firstName, lastName };

    try {
      const response = await fetch('/api/events/aps-2026-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(next),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setAccessPending(false);
        setAccessError(
          data.message ||
            "That name and email aren't on the 2026 registration list.",
        );
        return;
      }
    } catch (error) {
      console.error('APS 2026 registration check failed', error);
      setAccessPending(false);
      setAccessError("We couldn't check the registration list. Try again.");
      return;
    }

    writeAttendee(next);
    await sendToCompletionCourse(next);
  };

  const goToPage = (nextPage) => {
    setPage(nextPage);
    document
      .getElementById('photos')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <Meta
        title='AutoPack Summit 2026'
        description='A look back at AutoPack Summit 2026 in Greenville: the connections from the floor and the education from the room.'
        image={META_IMAGE}
      />
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600&display=swap'
        />
      </Head>

      <div className='bg-white text-neutral-900'>
        <header className='mx-auto grid max-w-7xl items-center gap-10 px-5 pb-6 pt-10 lg:grid-cols-12 lg:gap-16 lg:pb-8 lg:pt-16 xl:px-0'>
          <div className='flex flex-col gap-5 lg:col-span-7'>
            <p className='text-xs font-semibold uppercase tracking-[0.16em] text-ap-blue'>
              AutoPack Summit 2026 · Media
            </p>
            <h1 className='font-oswald text-5xl font-medium uppercase leading-none tracking-tight text-neutral-900 md:text-6xl'>
              A look <span className='text-ap-darkblue'>back</span>
            </h1>
            <p className='max-w-xl text-lg leading-snug text-neutral-700'>
              The connections from the floor, and the education that came out of
              the room.
            </p>
            <div className='mt-2 flex flex-col gap-3 text-neutral-900 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2'>
              <p className='flex items-center gap-2 font-semibold'>
                <CalendarDaysIcon className='h-6 w-6' />
                September 30 – October 2, 2026
              </p>
              <p className='flex items-center gap-2 font-semibold'>
                <MapPinIcon className='h-6 w-6' />
                Hyatt Regency, Greenville SC
              </p>
            </div>
          </div>

          <div className='lg:col-span-5'>
            <div className='overflow-hidden rounded-2xl bg-amber-400'>
              <div className='flex items-center justify-center bg-white px-10 py-12'>
                <Image
                  src={LOGO}
                  alt='AutoPack Summit'
                  width={1900}
                  height={498}
                  className='h-auto w-full max-w-sm'
                  priority
                />
              </div>
              <div className='flex items-center justify-between gap-4 px-6 py-5'>
                <div>
                  <p className='text-xs font-semibold uppercase tracking-[0.16em]'>
                    Event site
                  </p>
                  <p className='font-oswald text-2xl uppercase leading-none'>
                    autopacksummit.com
                  </p>
                </div>
                <a
                  href='https://www.autopacksummit.com'
                  target='_blank'
                  rel='noreferrer'
                  className='inline-flex items-center gap-1 rounded-xl bg-neutral-900 px-4 py-2 text-sm font-semibold text-white'
                >
                  Visit
                  <ArrowRightIcon className='h-4 w-4' />
                </a>
              </div>
            </div>
          </div>
        </header>

        <div className='sticky top-[73px] z-30 border-b border-neutral-200 bg-white/95 backdrop-blur'>
          <nav
            aria-label='Media sections'
            className='mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 py-3 xl:px-0'
          >
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className='inline-flex shrink-0 items-center gap-2 rounded-xl bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-ap-yellow hover:text-neutral-900'
              >
                <item.icon className='h-5 w-5' />
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <section
          id='photos'
          className='scroll-mt-40 mx-auto max-w-7xl px-5 py-12 lg:py-16 xl:px-0'
        >
          <SectionHeading kicker='Photos' title='From the floor' />
          <div className='mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5 md:gap-3'>
            {visiblePhotos.map((photo, index) => (
              <button
                key={photo.id}
                type='button'
                onClick={() => setActivePhoto(start + index)}
                aria-label={`Open photo ${start + index + 1}`}
                className='relative aspect-square overflow-hidden bg-neutral-200'
              >
                <img
                  src={photo.src}
                  alt=''
                  className='h-full w-full object-cover'
                />
              </button>
            ))}
          </div>
          {pageCount > 1 && (
            <div className='mt-8 flex flex-wrap items-center justify-center gap-2'>
              {Array.from({ length: pageCount }, (_, index) => index + 1).map(
                (number) => (
                  <button
                    key={number}
                    type='button'
                    onClick={() => goToPage(number)}
                    aria-current={number === page ? 'page' : undefined}
                    className={`flex h-9 w-9 items-center justify-center text-sm font-semibold ${
                      number === page
                        ? 'bg-ap-yellow text-neutral-900'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                  >
                    {number}
                  </button>
                ),
              )}
            </div>
          )}
        </section>

        <section
          id='presentations'
          className='scroll-mt-40 mx-auto max-w-7xl px-5 pb-12 lg:pb-20 xl:px-0'
        >
          <div className='rounded-2xl bg-ap-darkblue px-6 py-10 text-white md:px-12 md:py-14'>
            <p className='text-xs font-semibold uppercase tracking-[0.16em] text-ap-yellow'>
              Presentations
            </p>
            <h2 className='mt-2 font-oswald text-4xl font-medium uppercase leading-none tracking-tight md:text-5xl'>
              Coming soon
            </h2>
          </div>
        </section>

        <section
          id='certificate'
          className='scroll-mt-40 mx-auto max-w-7xl px-5 pb-12 lg:pb-20 xl:px-0'
        >
          <div className='grid gap-4 lg:grid-cols-2'>
            <article className='flex flex-col rounded-2xl bg-ap-darkblue p-6 text-white md:p-8'>
              <span className='flex h-12 w-12 items-center justify-center rounded-xl bg-white/10'>
                <AcademicCapIcon className='h-7 w-7 text-ap-yellow' />
              </span>
              <p className='mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-ap-yellow'>
                Automotive Packaging Summit
              </p>
              <h2 className='mt-2 font-oswald text-3xl font-medium uppercase leading-none tracking-tight md:text-4xl'>
                Certificate of Completion
              </h2>
              <p className='mb-8 mt-4 max-w-xl text-lg leading-snug text-blue-100'>
                Attendees who meet the participation requirements receive a 2026
                Certificate of Attendance for professional development,
                reimbursement, or continuing education.
              </p>
              <button
                type='button'
                onClick={openCompletionAccess}
                className='mt-auto inline-flex w-fit items-center gap-2 rounded-xl bg-ap-yellow px-5 py-3 font-semibold text-neutral-900'
              >
                Get your certificate
                <ArrowRightIcon className='h-4 w-4' />
              </button>
            </article>

            <article className='flex flex-col rounded-2xl bg-amber-400 p-6 text-neutral-900 md:p-8'>
              <span className='flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-900'>
                <AcademicCapIcon className='h-7 w-7 text-white' />
              </span>
              <p className='mt-6 text-xs font-semibold uppercase tracking-[0.16em]'>
                Certificate
              </p>
              <h2 className='mt-2 font-oswald text-3xl font-medium uppercase leading-none tracking-tight md:text-4xl'>
                Automotive Packaging Certificate
              </h2>
              <p className='mt-4 mb-8 max-w-xl text-lg leading-snug'>
                The first 100% online academic program built for people who
                package parts, move them, and sell the systems around them.
              </p>
              <Link
                href='/certifications/get-to-know-apc'
                className='mt-auto inline-flex w-fit items-center gap-2 rounded-xl bg-neutral-900 px-5 py-3 font-semibold text-white'
              >
                View the certificate
                <ArrowRightIcon className='h-4 w-4' />
              </Link>
            </article>
          </div>
        </section>

        <section id='next-year' className='scroll-mt-40 bg-ap-darkblue'>
          <div className='mx-auto grid max-w-7xl items-center gap-8 px-5 py-14 lg:grid-cols-2 lg:gap-12 lg:py-16 xl:px-0'>
            <div className='text-white'>
              <p className='text-xs font-semibold uppercase tracking-[0.16em] text-ap-yellow'>
                Next year
              </p>
              <h2 className='mt-2 font-oswald text-4xl font-medium uppercase leading-none tracking-tight md:text-5xl'>
                October 18–20, 2027
              </h2>
              <p className='mt-4 max-w-xl text-lg leading-snug text-blue-100'>
                Monday, October 18 – Wednesday, October 20. Hyatt Regency,
                Greenville SC.
              </p>
              <a
                href='https://www.autopacksummit.com'
                target='_blank'
                rel='noreferrer'
                className='mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-neutral-900'
              >
                Event site
                <ArrowRightIcon className='h-4 w-4' />
              </a>
            </div>
            <div className='rounded-2xl bg-ap-yellow p-6 text-neutral-900 sm:p-8'>
              <div className='flex items-end justify-between gap-4'>
                <div className='flex items-end gap-4'>
                  <DateMark day='Mon' date='18' />
                  <span className='pb-1 font-oswald text-4xl leading-none'>
                    –
                  </span>
                  <DateMark day='Wed' date='20' />
                </div>
                <div className='border-l-2 border-black pl-5'>
                  <p className='font-oswald text-3xl uppercase leading-none'>
                    2027
                  </p>
                  <p className='mt-2 text-sm font-semibold leading-snug'>
                    Hyatt Regency
                    <br />
                    Greenville SC
                  </p>
                </div>
              </div>
              <NextYearCountdown />
            </div>
          </div>
        </section>

        <section
          id='thank-you'
          className='scroll-mt-40 mx-auto max-w-7xl px-5 py-16 lg:py-24 xl:px-0'
        >
          <div className='mx-auto max-w-3xl text-center'>
            <p className='text-xs font-semibold uppercase tracking-[0.16em] text-ap-blue'>
              Thank you
            </p>
            <h2 className='mt-2 font-oswald text-4xl font-medium uppercase leading-none tracking-tight md:text-5xl'>
              Thanks for being in the room
            </h2>
          </div>
          <div className='mx-auto mt-8 max-w-5xl overflow-hidden rounded-2xl bg-black'>
            <VideoPlayer videoEmbedLink={THANK_YOU_VIDEO} hideSupport />
          </div>
        </section>
      </div>

      {activePhoto !== null && (
        <div
          className='fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm'
          onClick={() => setActivePhoto(null)}
        >
          <div
            className='relative w-full max-w-5xl'
            onClick={(event) => event.stopPropagation()}
          >
            <div className='overflow-hidden bg-neutral-900'>
              <img
                src={photos[activePhoto].src}
                alt=''
                className='max-h-[80vh] w-full object-contain'
              />
              <button
                type='button'
                onClick={() => setActivePhoto(null)}
                className='absolute right-3 top-3 rounded-full bg-black/70 p-1.5 text-white'
                aria-label='Close photo'
              >
                <XMarkIcon className='h-5 w-5' />
              </button>
            </div>
            <button
              type='button'
              aria-label='Previous photo'
              onClick={() =>
                setActivePhoto(
                  (current) => (current - 1 + photos.length) % photos.length,
                )
              }
              className='absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2'
            >
              <ChevronLeftIcon className='h-6 w-6' />
            </button>
            <button
              type='button'
              aria-label='Next photo'
              onClick={() =>
                setActivePhoto((current) => (current + 1) % photos.length)
              }
              className='absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2'
            >
              <ChevronRightIcon className='h-6 w-6' />
            </button>
          </div>
        </div>
      )}

      {accessOpen && (
        <div
          className='fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm'
          onClick={() => setAccessOpen(false)}
        >
          <div
            className='relative w-full max-w-lg rounded-2xl bg-white p-6 md:p-8'
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type='button'
              onClick={() => setAccessOpen(false)}
              className='absolute right-4 top-4 rounded-full p-1 hover:bg-neutral-100'
              aria-label='Close'
            >
              <XMarkIcon className='h-6 w-6' />
            </button>
            <p className='text-xs font-semibold uppercase tracking-[0.16em] text-ap-blue'>
              Automotive Packaging Summit
            </p>
            <h2 className='mt-2 font-oswald text-3xl font-medium uppercase leading-none'>
              Certificate of Completion
            </h2>
            <form
              className='mt-6 flex flex-col gap-4'
              onSubmit={submitCompletionAccess}
            >
              <label className='block text-sm font-semibold'>
                Email
                <input
                  type='email'
                  name='email'
                  autoComplete='email'
                  required
                  value={attendee.email}
                  onChange={(event) =>
                    setAttendee((current) => ({
                      ...current,
                      email: event.target.value,
                    }))
                  }
                  className='mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 font-normal'
                />
              </label>
              <label className='block text-sm font-semibold'>
                First name
                <input
                  type='text'
                  name='given-name'
                  autoComplete='given-name'
                  required
                  value={attendee.firstName}
                  onChange={(event) =>
                    setAttendee((current) => ({
                      ...current,
                      firstName: event.target.value,
                    }))
                  }
                  className='mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 font-normal'
                />
              </label>
              <label className='block text-sm font-semibold'>
                Last name
                <input
                  type='text'
                  name='family-name'
                  autoComplete='family-name'
                  required
                  value={attendee.lastName}
                  onChange={(event) =>
                    setAttendee((current) => ({
                      ...current,
                      lastName: event.target.value,
                    }))
                  }
                  className='mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 font-normal'
                />
              </label>
              {accessError ? (
                <p className='text-sm text-ap-red'>{accessError}</p>
              ) : null}
              <button
                type='submit'
                disabled={accessPending}
                className='rounded-xl bg-ap-yellow px-4 py-3 font-semibold disabled:opacity-60'
              >
                {accessPending ? 'Signing you in…' : 'Continue'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

const SectionHeading = ({ kicker, title }) => (
  <div className='max-w-2xl'>
    <p className='text-xs font-semibold uppercase tracking-[0.16em] text-ap-blue'>
      {kicker}
    </p>
    <h2 className='mt-2 font-oswald text-4xl font-medium uppercase leading-none tracking-tight md:text-5xl'>
      {title}
    </h2>
  </div>
);

const EVENT_START = new Date(2027, 9, 18, 0, 0, 0);

const getCountdown = (target) => {
  const diff = Math.max(0, target.getTime() - Date.now());
  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    done: diff === 0,
  };
};

const CountdownUnit = ({ value, label }) => (
  <div className='flex flex-col'>
    <span className='font-oswald text-3xl font-medium tabular-nums leading-none text-neutral-900'>
      {String(value).padStart(2, '0')}
    </span>
    <span className='mt-1.5 text-xs font-medium uppercase tracking-wide text-neutral-700'>
      {label}
    </span>
  </div>
);

const NextYearCountdown = () => {
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    setCountdown(getCountdown(EVENT_START));
    const id = setInterval(() => {
      setCountdown(getCountdown(EVENT_START));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  if (!countdown || countdown.done) return null;

  return (
    <div className='mt-6 flex items-end gap-6 border-t border-neutral-900/20 pt-4'>
      <CountdownUnit value={countdown.days} label='Days' />
      <CountdownUnit value={countdown.hours} label='Hrs' />
      <CountdownUnit value={countdown.minutes} label='Min' />
      <CountdownUnit value={countdown.seconds} label='Sec' />
    </div>
  );
};

const DateMark = ({ day, date }) => (
  <div className='text-center'>
    <p className='text-xs font-semibold uppercase tracking-widest'>{day}</p>
    <p className='font-oswald text-5xl leading-none'>{date}</p>
  </div>
);

export async function getServerSideProps() {
  try {
    const { listAps2026Photos } = await import('../../helpers/aps2026Photos');
    const photos = await listAps2026Photos();
    return { props: { photos } };
  } catch (error) {
    console.error('APS 2026 photo list failed', error);
    return { props: { photos: [] } };
  }
}

export default APS2026;
