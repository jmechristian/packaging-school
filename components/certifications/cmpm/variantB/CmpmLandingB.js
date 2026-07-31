import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  AcademicCapIcon,
  ArrowLongRightIcon,
  BeakerIcon,
  BriefcaseIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  CubeIcon,
  KeyIcon,
  MagnifyingGlassPlusIcon,
  TruckIcon,
  UserGroupIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Dialog } from '@headlessui/react';
import CountdownTimer from '../../../shared/CountdownTimer';
import VideoPlayer from '../../../VideoPlayer';
import { getCurrentCMPMSessions } from '../../../../helpers/api';
import {
  trackAbMeetingClick,
  trackAbNavNext,
  trackAbEngagement,
  withCmpmExperiment,
} from '../../../../libs/analytics';
import { CMPM_EXPERIMENT_KEY } from '../../../../libs/abVariant';
import TeamCohortForm from './TeamCohortForm';
import {
  APPLY_HREF,
  CATALOG_HREF,
  CLIENT_LOGOS,
  CLEMSON_LOGO,
  CONSULT_HREF,
  CURRICULUM_WEEKS,
  EXPLAINER_VIDEO,
  EXPLAINER_VIDEO_2,
  HERO_FRAMES,
  JULIE_IMAGE,
  PDP_QUOTE,
  PDP_SAMPLES,
  PDP_SPOTLIGHT_PDF,
  PROOF_LOGOS,
  PROOF_TESTIMONIALS,
  SECTION3_QUOTE,
  SPECIALIZATIONS,
} from './constants';

const PAGE_PATH = '/certifications/get-to-know-cmpm';

function formatSessionTitle(title) {
  return String(title || '').replace(/\bCMPM\b/g, 'Certificate of Mastery');
}

function isIcpfSession(session) {
  return String(session?.title || '').includes('ICPF');
}

function trackApply(source) {
  trackAbNavNext(
    withCmpmExperiment({
      experimentKey: CMPM_EXPERIMENT_KEY,
      pagePath: PAGE_PATH,
      nextPath: APPLY_HREF,
      source,
    }),
  );
}

function trackConsult(source) {
  trackAbMeetingClick(
    withCmpmExperiment({
      experimentKey: CMPM_EXPERIMENT_KEY,
      pagePath: PAGE_PATH,
      nextPath: CONSULT_HREF,
      source,
    }),
  );
}

function trackCatalogNav(source, nextPath) {
  trackAbNavNext(
    withCmpmExperiment({
      experimentKey: CMPM_EXPERIMENT_KEY,
      pagePath: PAGE_PATH,
      nextPath,
      source,
    }),
  );
}

function trackPdpEngagement(metric, source, metadata = {}) {
  trackAbEngagement(
    withCmpmExperiment({
      experimentKey: CMPM_EXPERIMENT_KEY,
      pagePath: PAGE_PATH,
      metric,
      value: 1,
      source,
      metadata,
    }),
  );
}

function formatDate(dateString) {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function CmpmLandingB() {
  const [teamOpen, setTeamOpen] = useState(false);
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [latestSession, setLatestSession] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const all = await getCurrentCMPMSessions();
        if (cancelled) return;
        const open = (Array.isArray(all) ? all : []).filter(
          (session) => !isIcpfSession(session),
        );
        setSessions(open);
        setLatestSession(open[0] || null);
      } catch (err) {
        console.warn('CMPM sessions fetch failed:', err?.message);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setHeroIndex((i) => (i + 1) % HERO_FRAMES.length);
    }, 5200);
    return () => window.clearInterval(id);
  }, []);

  const openTeam = (source) => {
    trackAbEngagement(
      withCmpmExperiment({
        experimentKey: CMPM_EXPERIMENT_KEY,
        pagePath: PAGE_PATH,
        metric: 'team_cohort_open',
        value: 1,
        source,
      }),
    );
    setTeamOpen(true);
  };

  return (
    <div className='bg-white text-slate-900'>
      <Hero
        frameIndex={heroIndex}
        onSelectFrame={setHeroIndex}
        onApply={() => trackApply('cmpm_b_hero_apply')}
        onConsult={() => trackConsult('cmpm_b_hero_consult')}
      />
      <LogoStrip />
      <TheProject />
      <WhoItsFor onRequestTeam={() => openTeam('cmpm_b_section3_team')} />
      <ProgramCurriculum />
      <Proof
        spotlightOpen={spotlightOpen}
        onToggleSpotlight={() => setSpotlightOpen((v) => !v)}
      />
      <CohortsEnroll
        latestSession={latestSession}
        sessions={sessions}
        onApply={() => trackApply('cmpm_b_section6_apply')}
        onConsult={() => trackConsult('cmpm_b_section6_consult')}
        onRequestTeam={() => openTeam('cmpm_b_section6_team')}
      />
      <Factbook />
      <TeamCohortForm open={teamOpen} onClose={() => setTeamOpen(false)} />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Section 1 — Hero                                                           */
/* -------------------------------------------------------------------------- */

function Hero({ frameIndex, onSelectFrame, onApply, onConsult }) {
  return (
    <section className='relative overflow-hidden bg-gradient-to-br from-dark via-base-dark-highlight to-base-dark text-white'>
      <div className='pointer-events-none absolute inset-0 opacity-40'>
        <div className='absolute -left-24 top-10 h-72 w-72 rounded-full bg-clemson/30 blur-3xl' />
        <div className='absolute bottom-0 right-0 h-96 w-96 rounded-full bg-base-brand/40 blur-3xl' />
      </div>

      <div className='relative mx-auto grid max-w-7xl gap-8 px-6 py-14 md:py-20 lg:grid-cols-2 lg:items-center lg:gap-12 lg:py-20'>
        <div className='flex flex-col gap-5'>
          <p className='text-xs font-semibold uppercase tracking-[0.18em] text-clemson'>
            Certificate of Mastery in Packaging Management
          </p>
          <h1 className='font-greycliff text-4xl font-semibold leading-tight tracking-tight md:text-5xl xl:text-[3.25rem]'>
            Clemson University Certificate. PhD-Led. Built for Your Success.
          </h1>
          <p className='max-w-xl text-lg leading-relaxed text-white/85 md:text-xl'>
            In 12 weeks—even while working full-time—you&apos;ll walk away with
            a credential and a completed project that proves it.
          </p>

          <div className='rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm md:p-5'>
            {/* <p className='text-sm font-semibold uppercase tracking-wide text-clemson'>
              Project callout
            </p> */}
            <p className='mt-2 text-base leading-relaxed text-white md:text-lg'>
              1:1 PhD mentorship on your own project—improve a real job function
              or sharpen your portfolio toward your biggest career goal.
            </p>
          </div>

          <p className='text-base text-white/80'>
            Complete the program and enjoy access to our full course library for
            the rest of the year—personalized just for you.
          </p>

          <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
            <Link
              href={APPLY_HREF}
              onClick={onApply}
              className='inline-flex items-center justify-center rounded-lg bg-clemson px-6 py-3.5 text-center text-lg font-semibold text-white transition hover:bg-clemson-dark'
            >
              Apply Now
            </Link>
            <a
              href={CONSULT_HREF}
              target='_blank'
              rel='noreferrer'
              onClick={onConsult}
              className='inline-flex items-center justify-center gap-1.5 rounded-lg border border-white/30 bg-white/5 px-6 py-3.5 text-center text-lg font-semibold text-white transition hover:bg-white/10'
            >
              Schedule a Free Consultation
              <ArrowLongRightIcon className='h-5 w-5' />
            </a>
          </div>

          <p className='text-xs text-white/55'>
            Packaging School is Licensed (#5400) by the SC Commission on Higher
            Education
          </p>
        </div>

        {/* Hero visual carousel — CMPM graduates with certificates */}
        <div className='relative mx-auto w-full lg:w-[74%]'>
          <div className='relative aspect-[500/629] overflow-hidden rounded-2xl bg-base-dark shadow-2xl'>
            {HERO_FRAMES.map((f, i) => (
              <div
                key={f.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                  i === frameIndex ? 'opacity-100' : 'opacity-0'
                }`}
                aria-hidden={i !== frameIndex}
              >
                <Image
                  src={f.src}
                  alt={f.alt}
                  fill
                  priority={i === 0}
                  sizes='(max-width: 1024px) 100vw, 560px'
                  className='object-cover object-center'
                />
              </div>
            ))}
            <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-dark/35 via-transparent to-transparent' />
          </div>
          <div className='mt-4 flex items-center justify-center gap-2.5'>
            {HERO_FRAMES.map((f, i) => (
              <button
                key={f.id}
                type='button'
                aria-label={`Show graduate photo ${i + 1}`}
                onClick={() => onSelectFrame(i)}
                className={`h-3 rounded-full ring-1 ring-white/40 transition-all ${
                  i === frameIndex
                    ? 'w-9 bg-clemson ring-clemson'
                    : 'w-3 bg-white/75 hover:bg-white'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function LogoStrip() {
  return (
    <div className='border-b border-slate-200 bg-slate-50'>
      <div className='mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-3 gap-y-3 px-6 py-6 md:gap-x-5'>
        {CLIENT_LOGOS.map((logo) => (
          <div
            key={logo.name}
            className='flex h-16 w-32 items-center justify-center grayscale opacity-70 md:h-20 md:w-36'
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo.logo}
              alt={logo.name}
              className='max-h-14 max-w-full object-contain md:max-h-16'
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Section 2 — The Project                                                    */
/* -------------------------------------------------------------------------- */

function TheProject() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [loaded, setLoaded] = useState({});
  const total = PDP_SAMPLES.length;
  const currentReady = Boolean(loaded[slideIndex]);

  const goPrev = (tracked = true) => {
    if (tracked) {
      trackPdpEngagement('pdp_carousel_prev', 'cmpm_b_pdp_prev', {
        fromSlide: slideIndex + 1,
      });
    }
    setSlideIndex((i) => (i - 1 + total) % total);
  };
  const goNext = (tracked = true) => {
    if (tracked) {
      trackPdpEngagement('pdp_carousel_next', 'cmpm_b_pdp_next', {
        fromSlide: slideIndex + 1,
      });
    }
    setSlideIndex((i) => (i + 1) % total);
  };
  const goToSlide = (i) => {
    if (i === slideIndex) return;
    trackPdpEngagement('pdp_carousel_slide', `cmpm_b_pdp_slide_${i + 1}`, {
      slide: i + 1,
      fromSlide: slideIndex + 1,
    });
    setSlideIndex(i);
  };
  const openLightbox = () => {
    trackPdpEngagement('pdp_carousel_enlarge', 'cmpm_b_pdp_enlarge', {
      slide: slideIndex + 1,
    });
    setLightboxOpen(true);
  };

  const markLoaded = (i) => {
    setLoaded((prev) => (prev[i] ? prev : { ...prev, [i]: true }));
  };

  useEffect(() => {
    if (!lightboxOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') goPrev(false);
      if (e.key === 'ArrowRight') goNext(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxOpen, slideIndex]);

  return (
    <section className='mx-auto max-w-7xl px-6 py-14 md:py-20'>
      <div className='grid items-center gap-8 lg:grid-cols-2 lg:gap-12'>
        <div className='max-w-xl self-center'>
          <p className='text-xs font-semibold uppercase tracking-[0.18em] text-base-mid'>
            The Project
          </p>
          <h2 className='mt-3 font-greycliff text-3xl font-semibold tracking-tight md:text-4xl'>
            Your Package Development Plan
          </h2>
          <p className='mt-4 text-lg leading-relaxed text-slate-600'>
            Every Certificate of Mastery student builds a{' '}
            <span className='font-semibold text-slate-900'>
              Package Development Plan (PDP)
            </span>
            —a real deliverable, not a case study. You&apos;ll work 1-on-1 with
            a PhD mentor who pushes you to apply what you&apos;re learning
            directly to your own goals, whether that&apos;s a live
            responsibility at work or the portfolio that moves your career
            forward.
          </p>
        </div>

        <div className='self-center'>
          <div className='relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm'>
            {PDP_SAMPLES.map((item, i) => (
              <div
                key={item.src}
                className={`absolute inset-0 transition-opacity duration-300 ease-out ${
                  i === slideIndex && currentReady ? 'opacity-100' : 'opacity-0'
                }`}
                aria-hidden={i !== slideIndex}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes='(max-width: 1024px) 100vw, 50vw'
                  className='object-cover object-top'
                  priority={i <= 1}
                  onLoadingComplete={() => markLoaded(i)}
                />
              </div>
            ))}
            {!currentReady ? (
              <div
                className='absolute inset-0 z-[5] flex items-center justify-center bg-slate-100'
                aria-hidden='true'
              >
                <div className='h-full w-full animate-pulse bg-gradient-to-r from-slate-100 via-slate-200/80 to-slate-100' />
              </div>
            ) : null}
            <button
              type='button'
              onClick={openLightbox}
              className='absolute inset-0 z-10 flex items-end justify-end p-3'
              aria-label='Enlarge project example'
            >
              <span className='inline-flex items-center gap-1.5 rounded-lg bg-black/65 px-2.5 py-1.5 text-xs font-semibold text-white transition hover:bg-black/80'>
                <MagnifyingGlassPlusIcon className='h-4 w-4' />
                Enlarge
              </span>
            </button>
          </div>

          <div className='mt-4 flex items-center justify-center gap-4'>
            <button
              type='button'
              onClick={() => goPrev(true)}
              className='inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:bg-slate-50'
              aria-label='Previous project example'
            >
              <ChevronLeftIcon className='h-5 w-5' />
            </button>
            <div className='flex items-center gap-2'>
              {PDP_SAMPLES.map((item, i) => (
                <button
                  key={item.src}
                  type='button'
                  onClick={() => goToSlide(i)}
                  aria-label={`Show project example ${i + 1}`}
                  aria-current={i === slideIndex ? 'true' : undefined}
                  className={`h-2.5 rounded-full transition ${
                    i === slideIndex
                      ? 'w-6 bg-clemson'
                      : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
            <button
              type='button'
              onClick={() => goNext(true)}
              className='inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:bg-slate-50'
              aria-label='Next project example'
            >
              <ChevronRightIcon className='h-5 w-5' />
            </button>
          </div>
          <p className='mt-3 text-center text-xs font-medium uppercase tracking-[0.14em] text-slate-400'>
            Samples from PDP projects · {slideIndex + 1} of {total}
          </p>
        </div>
      </div>

      <blockquote className='mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 px-6 py-7 md:px-10 md:py-9'>
        <p className='font-greycliff text-lg leading-relaxed text-slate-800 md:text-xl'>
          &ldquo;{PDP_QUOTE.body}&rdquo;
        </p>
        <footer className='mt-5 text-sm font-semibold text-slate-900'>
          {PDP_QUOTE.author}
          <span className='font-normal text-slate-500'>
            {' '}
            — {PDP_QUOTE.role}
          </span>
        </footer>
      </blockquote>

      <Dialog
        open={lightboxOpen}
        onClose={setLightboxOpen}
        className='relative z-50'
      >
        <div className='fixed inset-0 bg-black/80' aria-hidden='true' />
        <div className='fixed inset-0 flex items-center justify-center p-4 md:p-8'>
          <Dialog.Panel className='relative flex max-h-full w-full max-w-6xl flex-col'>
            <div className='mb-3 flex items-center justify-between gap-3 text-white'>
              <Dialog.Title className='text-sm font-semibold'>
                Student Package Development Plan · {slideIndex + 1} of {total}
              </Dialog.Title>
              <button
                type='button'
                onClick={() => setLightboxOpen(false)}
                className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20'
                aria-label='Close enlarged view'
              >
                <XMarkIcon className='h-6 w-6' />
              </button>
            </div>
            <div className='relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-black shadow-2xl'>
              {PDP_SAMPLES.map((item, i) => (
                <div
                  key={`lb-${item.src}`}
                  className={`absolute inset-0 transition-opacity duration-300 ease-out ${
                    i === slideIndex && currentReady
                      ? 'opacity-100'
                      : 'opacity-0'
                  }`}
                  aria-hidden={i !== slideIndex}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes='100vw'
                    className='object-contain'
                    onLoadingComplete={() => markLoaded(i)}
                  />
                </div>
              ))}
              {!currentReady ? (
                <div
                  className='absolute inset-0 animate-pulse bg-slate-800'
                  aria-hidden='true'
                />
              ) : null}
            </div>
            <div className='mt-4 flex items-center justify-center gap-4'>
              <button
                type='button'
                onClick={() => goPrev(true)}
                className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20'
                aria-label='Previous project example'
              >
                <ChevronLeftIcon className='h-5 w-5' />
              </button>
              <button
                type='button'
                onClick={() => goNext(true)}
                className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20'
                aria-label='Next project example'
              >
                <ChevronRightIcon className='h-5 w-5' />
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Section 3 — Who It's For                                                   */
/* -------------------------------------------------------------------------- */

function WhoItsFor({ onRequestTeam }) {
  return (
    <section className='bg-slate-50'>
      <div className='mx-auto max-w-7xl px-6 py-14 md:py-20'>
        <div className='max-w-3xl'>
          <p className='text-xs font-semibold uppercase tracking-[0.18em] text-base-mid'>
            Who It&apos;s For
          </p>
          <h2 className='mt-3 font-greycliff text-3xl font-semibold tracking-tight md:text-4xl'>
            One certificate. Two ways to use it.
          </h2>
          <p className='mt-4 text-lg text-slate-600'>
            However you choose to use it, you&apos;ll learn the language of
            packaging—the vocabulary that lets you speak with authority across
            packaging materials, processes, and technologies.
          </p>
        </div>

        <div className='mt-8 grid gap-6 lg:grid-cols-2 lg:gap-8'>
          {/* Individual column */}
          <div className='flex flex-col gap-5'>
            <p className='text-sm font-semibold uppercase tracking-wide text-slate-500'>
              Individual
            </p>
            <div className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8'>
              <div className='flex items-start gap-3'>
                <BriefcaseIcon className='mt-1 h-7 w-7 shrink-0 text-clemson' />
                <div>
                  <h3 className='font-greycliff text-xl font-bold'>
                    If you have a responsibility at work
                  </h3>
                  <p className='mt-3 leading-relaxed text-slate-600'>
                    Use your PDP to optimize, create, or hone the exact task in
                    front of you—development, sourcing, sustainability, supply
                    chain, whatever it is—with 1-on-1 PhD mentorship pushing you
                    the whole way.
                  </p>
                </div>
              </div>
            </div>
            <div className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8'>
              <div className='flex items-start gap-3'>
                <AcademicCapIcon className='mt-1 h-7 w-7 shrink-0 text-base-brand' />
                <div>
                  <h3 className='font-greycliff text-xl font-bold'>
                    If you want to invest in yourself
                  </h3>
                  <p className='mt-3 leading-relaxed text-slate-600'>
                    Use the same framework to build a portfolio project in the
                    industry or sector of your choice, proving you command the
                    materials, processes, and technologies of packaging—with
                    1-on-1 PhD mentorship—and walk away with both a credential
                    and a body of work you can point to.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Team column */}
          <div className='flex flex-col gap-5 rounded-2xl bg-base-dark p-6 text-white shadow-lg md:p-8 lg:min-h-full'>
            <p className='text-sm font-semibold uppercase tracking-wide text-clemson'>
              Team
            </p>
            <div className='flex items-start gap-3'>
              <UserGroupIcon className='mt-1 h-7 w-7 shrink-0 text-clemson' />
              <div>
                <h3 className='font-greycliff text-xl font-bold md:text-2xl'>
                  Bringing a team?
                </h3>
                <p className='mt-3 leading-relaxed text-white/85'>
                  R&amp;D, procurement, and logistics each touch packaging—but
                  rarely speak the same language about it. Enroll one person
                  from each function in a private Certificate of Mastery cohort,
                  and together they become your in-house packaging team: R&amp;D
                  speaking materials and design, procurement speaking sourcing
                  and cost, logistics speaking supply chain and compliance—all
                  fluent, all aligned, all in 12 weeks.
                </p>
              </div>
            </div>

            <div className='mt-2 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between'>
              <FunctionChip icon={BeakerIcon} label='R&D' />
              <FunctionChip icon={CubeIcon} label='Procurement' />
              <FunctionChip icon={TruckIcon} label='Logistics' />
              <div className='hidden items-center text-clemson sm:flex'>
                <ArrowLongRightIcon className='h-6 w-6' />
              </div>
              <div className='rounded-lg bg-white/10 px-4 py-3 text-center text-sm font-semibold sm:text-left'>
                In-House Packaging Team
              </div>
            </div>

            <button
              type='button'
              onClick={onRequestTeam}
              className='mt-auto inline-flex w-full items-center justify-center rounded-lg bg-clemson px-5 py-3.5 font-semibold text-white transition hover:bg-clemson-dark sm:w-fit'
            >
              Request a Team Cohort
            </button>
          </div>
        </div>

        {/* Pull-quote */}
        <blockquote className='mt-8 border-l-4 border-clemson bg-white px-6 py-5 shadow-sm md:px-8'>
          <p className='text-lg leading-relaxed text-slate-700 md:text-xl'>
            &ldquo;{SECTION3_QUOTE.body}&rdquo;
          </p>
          <footer className='mt-4 text-sm font-semibold text-slate-900'>
            {SECTION3_QUOTE.author}
            <span className='font-normal text-slate-500'>
              {' '}
              · {SECTION3_QUOTE.role}
            </span>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}

function FunctionChip({ icon: Icon, label }) {
  return (
    <div className='flex items-center gap-2 rounded-lg bg-white/10 px-4 py-3'>
      <Icon className='h-5 w-5 text-clemson' />
      <span className='text-sm font-semibold'>{label}</span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Section 4 — Program & Curriculum                                           */
/* -------------------------------------------------------------------------- */

function ProgramCurriculum() {
  return (
    <section className='mx-auto max-w-7xl px-6 py-14 md:py-20'>
      <div className='max-w-3xl'>
        <p className='text-xs font-semibold uppercase tracking-[0.18em] text-base-mid'>
          Program &amp; Curriculum
        </p>
        <h2 className='mt-3 font-greycliff text-3xl font-semibold tracking-tight md:text-4xl'>
          Executive-level education, designed to be agile.
        </h2>
        <p className='mt-4 text-lg text-slate-600'>
          You&apos;ll walk away with a tangible deliverable you can present to
          management and peers: your PDP, applied directly to your own
          organization&apos;s—or your own portfolio&apos;s—projects.
        </p>
      </div>

      {/* Stats */}
      <div className='mt-8 grid grid-cols-2 gap-4 md:grid-cols-4'>
        {[
          { value: '14', label: 'Courses' },
          { value: '80', label: 'Hours' },
          { value: '12', label: 'Weeks' },
          { value: '5', label: 'Cohorts / year' },
        ].map((stat) => (
          <div
            key={stat.label}
            className='rounded-xl border border-slate-200 bg-white px-5 py-6 text-center shadow-sm'
          >
            <div className='font-greycliff text-4xl font-bold text-base-dark'>
              {stat.value}
            </div>
            <div className='mt-1 text-sm font-semibold text-slate-500'>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Catalog unlock diagram */}
      <div className='mt-8 rounded-2xl bg-gradient-to-br from-base-dark to-base-brand p-6 text-white md:p-8'>
        <div className='flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-8'>
          <div className='flex shrink-0 flex-col items-center gap-3 text-center'>
            <div className='flex h-20 w-20 items-center justify-center rounded-full bg-clemson shadow-lg'>
              <KeyIcon className='h-10 w-10 text-white' />
            </div>
            <p className='font-semibold'>Certificate of Mastery Completion</p>
            {/* <p className='text-xs text-white/70'>Your key</p> */}
          </div>
          <ArrowLongRightIcon className='mx-auto hidden h-8 w-8 shrink-0 text-clemson lg:block' />
          <div className='flex-1'>
            <h3 className='font-greycliff text-2xl font-bold md:text-3xl'>
              Access the Entire Library with the Certificate
            </h3>
            <p className='mt-3 max-w-2xl leading-relaxed text-white/85'>
              Finish the Certificate of Mastery and get free access to our full
              course library for the rest of the year—no extra charge,
              personalized just for you. Work through enough of any one
              specialization&apos;s courses, and you can complete that
              certificate too.
            </p>
            <div className='mt-5 flex flex-wrap items-center gap-2'>
              {SPECIALIZATIONS.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => trackCatalogNav(item.source, item.href)}
                  className='rounded-full bg-white/10 px-3 py-1.5 text-sm transition hover:bg-white/20'
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <Link
              href={CATALOG_HREF}
              onClick={() =>
                trackCatalogNav('cmpm_b_view_catalog', CATALOG_HREF)
              }
              className='mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-clemson transition hover:text-white'
            >
              View the entire catalog
              <ArrowLongRightIcon className='h-4 w-4' />
            </Link>
          </div>
        </div>
      </div>

      {/* Curriculum grid */}
      <div className='mt-10'>
        <h3 className='font-greycliff text-2xl font-bold md:text-3xl'>
          Week-by-week curriculum
        </h3>
        <div className='mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {CURRICULUM_WEEKS.map((week) => (
            <div
              key={week.week}
              className='rounded-xl border border-slate-200 bg-white p-5 shadow-sm'
            >
              <p className='text-xs font-semibold uppercase tracking-wide text-clemson'>
                Week {week.week}
              </p>
              <h4 className='mt-2 font-greycliff text-lg font-bold leading-snug'>
                {week.title}
              </h4>
              <p className='mt-2 text-sm leading-relaxed text-slate-600'>
                {week.content}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Instructor + video — each on its own row */}
      <div className='mt-10 flex flex-col gap-10'>
        <div className='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
          <div className='flex flex-col md:flex-row'>
            <div className='relative min-h-64 w-full shrink-0 overflow-hidden sm:min-h-72 md:min-h-0 md:w-72 md:self-stretch lg:w-80'>
              <Image
                src={JULIE_IMAGE}
                alt='Dr. Julie Suggs, Academic Director'
                fill
                sizes='(max-width: 768px) 100vw, 320px'
                className='object-cover object-center'
              />
            </div>
            <div className='flex flex-1 flex-col justify-center p-6 md:p-8 lg:px-10 lg:py-9'>
              <p className='text-xs font-semibold uppercase tracking-wide text-base-mid'>
                Academic Director
              </p>
              <h3 className='mt-1 font-greycliff text-2xl font-semibold md:text-3xl'>
                Dr. Julie Suggs
              </h3>
              <p className='mt-4 max-w-2xl leading-relaxed text-slate-600'>
                Dr. Julie Suggs, Academic Director, holds a PhD in Food
                Technology and leads the Certificate of Mastery program. She has
                taught and mentored students across every level—from C-suite
                executives and directors to mid-management professionals and
                highly ambitious students early in their careers. Dr. Suggs is
                passionate about creating a hands-on, inclusive learning
                environment where students work through real-world packaging
                challenges, build lasting professional confidence, and leave
                with skills they can apply immediately in their careers.
              </p>
            </div>
          </div>
        </div>

        <div className='w-full'>
          <div className='text-center'>
            <h3 className='font-greycliff text-2xl font-semibold md:text-3xl'>
              Everything you need to know about the Certificate of Mastery
            </h3>
          </div>
          <div className='mt-6 grid gap-4 md:grid-cols-2 md:gap-6'>
            <div className='overflow-hidden rounded-2xl shadow-lg'>
              <VideoPlayer
                videoEmbedLink={EXPLAINER_VIDEO}
                light={true}
                hideSupport={true}
              />
            </div>
            <div className='overflow-hidden rounded-2xl shadow-lg'>
              <VideoPlayer
                videoEmbedLink={EXPLAINER_VIDEO_2}
                light={true}
                hideSupport={true}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Section 5 — Proof                                                          */
/* -------------------------------------------------------------------------- */

function Proof({ spotlightOpen, onToggleSpotlight }) {
  return (
    <section className='bg-slate-50'>
      <div className='mx-auto max-w-7xl px-6 py-14 md:py-20'>
        <div className='max-w-3xl'>
          <p className='text-xs font-semibold uppercase tracking-[0.18em] text-base-mid'>
            Proof
          </p>
          <h2 className='mt-3 font-greycliff text-3xl font-semibold tracking-tight md:text-4xl'>
            Trusted by packaging leaders
          </h2>
        </div>

        <div className='mt-8 flex flex-wrap items-center justify-start gap-x-8 gap-y-6 md:gap-x-12'>
          {PROOF_LOGOS.map((logo) => (
            <div
              key={`proof-${logo.name}`}
              className='flex h-20 w-20 items-center justify-center md:h-24 md:w-24'
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.logo}
                alt={logo.name}
                className='max-h-full max-w-full object-contain'
              />
            </div>
          ))}
        </div>

        <div className='mt-8 grid gap-6 md:grid-cols-2'>
          {PROOF_TESTIMONIALS.map((t) => (
            <blockquote
              key={t.author}
              className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-7'
            >
              <p className='text-base leading-relaxed text-slate-700'>
                &ldquo;{t.body}&rdquo;
              </p>
              <footer className='mt-5 text-sm font-semibold text-slate-900'>
                {t.author}
                <span className='block font-normal text-slate-500'>
                  {t.role}
                </span>
              </footer>
            </blockquote>
          ))}
        </div>

        {/* Inline expandable PDP Alumni Spotlight (replaces pop-up gate) */}
        <div className='mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
          <button
            type='button'
            onClick={onToggleSpotlight}
            className='flex w-full items-center justify-between gap-4 px-6 py-5 text-left hover:bg-slate-50 md:px-8'
          >
            <div>
              <p className='text-xs font-semibold uppercase tracking-wide text-clemson'>
                PDP Alumni Spotlight
              </p>
              <p className='mt-1 font-greycliff text-xl font-bold'>
                See real Package Development Plans from alumni
              </p>
            </div>
            <ChevronDownIcon
              className={`h-6 w-6 shrink-0 text-slate-500 transition ${
                spotlightOpen ? 'rotate-180' : ''
              }`}
            />
          </button>
          {spotlightOpen ? (
            <div className='border-t border-slate-200 px-6 py-6 md:px-8'>
              <p className='text-slate-600'>
                Browse the alumni PDP spotlight PDF—real deliverables built
                under 1:1 PhD mentorship.
              </p>
              <a
                href={PDP_SPOTLIGHT_PDF}
                target='_blank'
                rel='noreferrer'
                className='mt-4 inline-flex items-center gap-2 rounded-lg bg-base-dark px-5 py-3 font-semibold text-white hover:bg-base-dark-highlight'
              >
                Open PDP Spotlight PDF
                <ArrowLongRightIcon className='h-5 w-5' />
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Section 6 — Cohorts & Enroll                                               */
/* -------------------------------------------------------------------------- */

function CohortsEnroll({
  latestSession,
  sessions,
  onApply,
  onConsult,
  onRequestTeam,
}) {
  return (
    <section id='enroll' className='mx-auto max-w-7xl px-6 py-14 md:py-20'>
      <div className='max-w-3xl'>
        <p className='text-xs font-semibold uppercase tracking-[0.18em] text-base-mid'>
          Cohorts &amp; Enroll
        </p>
        <h2 className='mt-3 font-greycliff text-3xl font-semibold tracking-tight md:text-4xl'>
          Future-proof your skills—starting with your next cohort.
        </h2>
      </div>

      {/* Countdown — soonest future deadline from CMPM sessions */}
      {latestSession ? (
        <div className='mt-8 overflow-hidden rounded-2xl bg-dark px-6 py-7 text-white md:px-10'>
          <div className='flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between'>
            <div>
              <p className='text-sm font-semibold uppercase tracking-wide text-clemson'>
                Application deadline
              </p>
              <p className='mt-2 font-greycliff text-2xl font-bold md:text-3xl'>
                {formatSessionTitle(latestSession.title)}
              </p>
              <p className='mt-1 text-white/70'>
                Apply by {formatDate(latestSession.deadline)} · Cohort{' '}
                {formatDate(latestSession.startDate)} –{' '}
                {formatDate(latestSession.endDate)}
              </p>
            </div>
            <div className='flex w-full max-w-md items-center gap-3 rounded-xl bg-black/40 px-4 py-4'>
              <div className='flex shrink-0 items-center justify-center text-clemson'>
                <ClockIcon className='h-10 w-10' aria-hidden='true' />
              </div>
              <div className='min-w-0 flex-1'>
                <CountdownTimer deadline={latestSession.deadline} />
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* Cohort calendar — show all open future sessions */}
      <div className='mt-8'>
        <div className='flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between'>
          <h3 className='font-greycliff text-2xl font-bold'>Cohort calendar</h3>
        </div>
        <div className='mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'>
          {sessions.length ? (
            sessions.map((session) => (
              <div
                key={`${session.title}-${session.deadline}`}
                className='flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm'
              >
                <p className='text-sm font-semibold uppercase tracking-wide text-base-mid'>
                  {formatSessionTitle(session.title)}
                </p>
                <p className='mt-3 text-base font-semibold leading-snug text-slate-900'>
                  {formatDate(session.startDate)} –{' '}
                  {formatDate(session.endDate)}
                </p>
                <p className='mt-2 text-sm text-slate-600'>
                  Deadline {formatDate(session.deadline)}
                </p>
                <Link
                  href={APPLY_HREF}
                  onClick={onApply}
                  className='mt-auto pt-5 text-base font-semibold text-clemson hover:text-clemson-dark'
                >
                  Apply Now →
                </Link>
              </div>
            ))
          ) : (
            <p className='col-span-full text-slate-500'>
              Loading open cohorts…
            </p>
          )}
        </div>
      </div>

      {/* Pricing */}
      <div className='mt-8 grid gap-6 lg:grid-cols-3'>
        <div className='rounded-2xl border border-slate-200 bg-white p-7 shadow-sm lg:col-span-2'>
          <p className='text-sm font-semibold uppercase tracking-wide text-slate-500'>
            Investment
          </p>
          <p className='mt-2 font-greycliff text-5xl font-bold text-slate-900'>
            $7,000
            <span className='ml-2 text-lg font-semibold text-slate-500'>
              USD
            </span>
          </p>
          <ul className='mt-6 space-y-3 text-slate-600'>
            <li className='flex gap-2'>
              <CheckCircleIcon className='mt-0.5 h-5 w-5 shrink-0 text-brand-green' />
              Payment plans available
            </li>
            <li className='flex gap-2'>
              <CheckCircleIcon className='mt-0.5 h-5 w-5 shrink-0 text-brand-green' />
              Invoices and receipts provided for company reimbursement
            </li>
            <li className='flex gap-2'>
              <CheckCircleIcon className='mt-0.5 h-5 w-5 shrink-0 text-brand-green' />
              $25 application fee, credited toward tuition upon enrollment
            </li>
          </ul>
        </div>
        <div className='flex flex-col justify-center gap-3 rounded-2xl bg-base-dark p-7 text-white'>
          <Link
            href={APPLY_HREF}
            onClick={onApply}
            className='inline-flex items-center justify-center rounded-lg bg-clemson px-5 py-3.5 text-center font-semibold hover:bg-clemson-dark'
          >
            Apply Now
          </Link>
          <button
            type='button'
            onClick={onRequestTeam}
            className='inline-flex items-center justify-center rounded-lg border border-white/30 bg-white/5 px-5 py-3.5 font-semibold hover:bg-white/10'
          >
            Request a Team Cohort
          </button>
          <a
            href={CONSULT_HREF}
            target='_blank'
            rel='noreferrer'
            onClick={onConsult}
            className='inline-flex items-center justify-center gap-1 px-5 py-2 text-center text-sm font-semibold text-white/80 hover:text-white'
          >
            Schedule a Free Consultation
            <ArrowLongRightIcon className='h-4 w-4' />
          </a>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Program Factbook                                                           */
/* -------------------------------------------------------------------------- */

function Factbook() {
  const items = [
    {
      title: 'CEU Eligibility',
      body: 'Certificate of Mastery is CEU-eligible, offering 8 CEUs upon completion.',
    },
    {
      title: 'Employer Recognition',
      body: (
        <>
          We are licensed by the South Carolina Commission on Higher Education.
          If you&apos;re seeking specific reimbursement language for your
          organization, reach out to{' '}
          <a
            href='mailto:info@packagingschool.com'
            className='font-semibold text-base-brand underline'
          >
            info@packagingschool.com
          </a>{' '}
          and we can help you prepare that request.
        </>
      ),
    },
    {
      title: 'Credential Recognition',
      body: "The Certificate of Mastery is a line on your resume—it's issued by Clemson University's Center for Corporate Learning.",
    },
    {
      title: 'Certificate of Mastery vs. CPS',
      body: (
        <div className='space-y-3'>
          <p>
            <strong>CPS</strong> (Certificate of Packaging Science) is the
            language of packaging—the core knowledge needed to speak and
            understand the industry, covered in 12 foundational courses over up
            to 6 months, self-paced, with email-based instructor access. All of
            CPS is included in Certificate of Mastery.
          </p>
          <p>
            <strong>Certificate of Mastery</strong> is for someone who wants to
            apply that language to a real project or portfolio—and because what
            you&apos;re trying to do has likely never been done exactly that way
            before, you&apos;ll work one-on-one with a dedicated PhD professor
            who provides weekly office hours, personalized feedback, and
            coaching throughout the three-month program (80 hours across 14
            courses, including Project Management, Human Factors, and the
            capstone Packaging Development Plan).
          </p>
          <p>
            CPS is a Packaging School credential; Certificate of Mastery is a
            Clemson University credential and requires a higher price point.
          </p>
        </div>
      ),
    },
    {
      title: 'Alumni & Faculty Network',
      body: 'A private Packaging School Alumni Network—a living community connecting Packaging School Faculty and Packaging School Certificate grads across companies for peer advice, referrals, and hiring.',
    },
  ];

  return (
    <section className='border-t border-slate-200 bg-white'>
      <div className='mx-auto max-w-7xl px-6 py-14 md:py-20'>
        <div className='flex flex-col gap-6 md:flex-row md:items-end md:justify-between'>
          <div>
            <p className='text-xs font-semibold uppercase tracking-[0.18em] text-base-mid'>
              Program Factbook
            </p>
            <h2 className='mt-3 font-greycliff text-3xl font-semibold tracking-tight'>
              Details decision-makers ask for
            </h2>
          </div>
          <div className='flex items-center gap-3'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={CLEMSON_LOGO} alt='Clemson CCL' className='h-12 w-auto' />
          </div>
        </div>

        <dl className='mt-8 divide-y divide-slate-200 border-y border-slate-200'>
          {items.map((item) => (
            <div
              key={item.title}
              className='grid gap-3 py-5 md:grid-cols-12 md:gap-8'
            >
              <dt className='font-greycliff text-lg font-bold text-slate-900 md:col-span-4'>
                {item.title}
              </dt>
              <dd className='text-slate-600 leading-relaxed md:col-span-8'>
                {item.body}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
