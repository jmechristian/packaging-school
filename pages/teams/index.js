import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  AcademicCapIcon,
  BriefcaseIcon,
  LightBulbIcon,
  ClipboardDocumentCheckIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';
import Meta from '../../components/shared/Meta';
import { generateMetadata } from '../../libs/seo/generateMetadata';

const Teams = () => {
  const metadata = generateMetadata({
    pageType: 'STATIC',
    pathname: '/teams',
    title: 'Team Packaging Training & Corporate Programs | Packaging School',
    description:
      'Design a custom Packaging Library and team training program aligned to your roles, products, and business goals. Scale packaging expertise across global teams with structured, flexible learning pathways.',
  });

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://packagingschool.com';
  const pageUrl = `${siteUrl}/teams`;

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: metadata.title,
    description: metadata.description,
    url: pageUrl,
    inLanguage: 'en',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Packaging School',
      url: siteUrl,
    },
  };

  const corporateTrainingServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Corporate Packaging Training & Team Programs',
    description:
      'Custom packaging education programs and team training libraries for organizations that need to scale packaging knowledge across global teams.',
    provider: {
      '@type': 'Organization',
      name: 'Packaging School',
      url: siteUrl,
      logo: 'https://packschool.s3.us-east-1.amazonaws.com/ps-logo-square.svg',
    },
    areaServed: {
      '@type': 'Place',
      name: 'Global',
    },
    url: pageUrl,
    category: 'Professional education',
  };

  return (
    <>
      <Meta
        title={metadata.title}
        description={metadata.description}
        url='/teams'
        image='https://packschool.s3.us-east-1.amazonaws.com/team-seo.webp'
        structuredData={[webPageSchema, corporateTrainingServiceSchema]}
      />
      <div className='flex flex-col mx-auto max-w-7xl py-16'>
        <div className='w-full grid lg:grid-cols-12 gap-24 px-4 xl:px-0'>
          <div className='lg:col-span-6 flex flex-col gap-3'>
            <p className='inline-flex items-center rounded-full bg-clemson/10 px-3 py-1 text-[11px] font-semibold tracking-[0.2em] text-clemson uppercase w-fit'>
              Reach Goals Faster
            </p>
            <h1 className='h2-base mb-1.5 max-w-lg'>
              Team Training with The Packaging School
            </h1>
            <p className='text-lg text-gray-600'>
              Empower your workforce with a scalable, customizable Packaging
              Library built around your organization’s goals. Designed for
              employees at every level, it provides curated learning pathways
              aligned to specific roles, teams, and business priorities.
            </p>
            <p className='text-lg text-gray-600'>
              Access thousands of industry-relevant learning assets covering
              packaging materials, processes, and technologies — delivered
              through more than 4,000 short, practical lessons. Choose the
              courses that matter most to your organization to create a targeted
              training experience that is efficient, relevant, and immediately
              applicable on the job.
            </p>
          </div>
          <div className='lg:col-span-6'>
            <div
              className='w-full h-full rounded-lg bg-contain bg-center bg-no-repeat aspect-[16/9] border border-gray-400 shadow-lg'
              style={{
                backgroundImage: `url(https://packschool.s3.us-east-1.amazonaws.com/cummins-lib.png)`,
              }}
            ></div>
          </div>
        </div>

        <section className='w-full grid lg:grid-cols-12 gap-24 px-4 xl:px-0 lg:my-32 my-16'>
          <div className='lg:col-span-6 flex justify-center items-center'>
            <div className='w-full aspect-[794/720] rounded-lg border border-gray-400 shadow-lg'>
              <Image
                src='https://packschool.s3.us-east-1.amazonaws.com/teams-lib-optimize.gif'
                alt='Cummins Packaging Training Library'
                width={794}
                height={720}
              />
            </div>
          </div>
          <div className='lg:col-span-6 flex flex-col gap-6 w-full'>
            <h2 className='h3-base w-full max-w-2xl'>
              Build a Packaging Training Library Tailored to Your Team
            </h2>

            <div className='flex flex-col gap-3'>
              <div className='flex flex-col gap-5'>
                <div className='w-full'>
                  <p className='inline-flex items-center rounded-lg bg-clemson/70 px-3 py-1 text-[11px] font-semibold tracking-[0.2em] text-gray-700 uppercase w-fit'>
                    Select individual courses from respected programs such as:
                  </p>
                </div>
                <div className='grid grid-cols-2 gap-8 px-5'>
                  <div className='w-full flex items-center gap-5'>
                    <div className='w-40'>
                      <Link
                        href={'/certifications/get-to-know-cmpm'}
                        passHref
                        shallow
                      >
                        <Image
                          src={
                            'https://packschool.s3.amazonaws.com/cmpm-black.png'
                          }
                          className='group-hover:invert'
                          width={370}
                          height={114}
                          alt='Certificate of Packaging Management Logo'
                        />
                      </Link>
                    </div>
                  </div>
                  <div className='w-full flex items-center gap-5'>
                    <div className='w-40'>
                      <div className='flex  items-center hover:bg-black transition-all ease-in group cursor-pointer flex-1 p-3'>
                        <Link
                          href={'/certifications/get-to-know-cps'}
                          passHref
                          shallow
                        >
                          <Image
                            src={
                              'https://packschool.s3.amazonaws.com/cps-black.png'
                            }
                            width={430}
                            height={118}
                            alt='Certificate of Packaging Science Logo'
                            className='group-hover:invert'
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className='w-full flex items-center  gap-5'>
                    <div className='w-40'>
                      <Link
                        href={'/certifications/get-to-know-csp'}
                        passHref
                        shallow
                      >
                        <Image
                          src={
                            'https://packschool.s3.amazonaws.com/csp-black.png'
                          }
                          className='group-hover:invert'
                          width={310}
                          height={109}
                          alt='Certificate of Sustainable Packaging Logo'
                        />
                      </Link>
                    </div>
                  </div>
                  <div className='w-full flex items-center gap-5'>
                    <div className='w-40'>
                      <Link
                        href={'/certifications/get-to-know-apc'}
                        passHref
                        shallow
                      >
                        <Image
                          src={
                            'https://packschool.s3.amazonaws.com/aps-black.png'
                          }
                          className='group-hover:invert'
                          width={403}
                          height={109}
                          alt='Automotive Packaging Certificate Logo'
                        />
                      </Link>
                    </div>
                  </div>
                </div>
                <hr className='border-gray-300' />
                <div className='text-lg text-gray-600 leading-snug mt-2'>
                  You can also add electives or integrate your own internal
                  training content to create a unified learning experience
                  tailored to your organization.
                </div>
                <div className='text-lg text-gray-600 leading-snug'>
                  Custom libraries are streamlined and easy to navigate,
                  displaying only the courses your team needs—keeping training
                  focused, relevant, and efficient.
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className='pb-16'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            <div className='w-full rounded-lg overflow-hidden'>
              <Image
                src='https://packschool.s3.us-east-1.amazonaws.com/Cummins+testimonial+1.png'
                alt='Cummins Packaging Training Library Testimonial 1'
                width={600}
                height={600}
              />
            </div>
            <div className='w-full rounded-lg overflow-hidden'>
              <Image
                src='https://packschool.s3.us-east-1.amazonaws.com/Cummins_testimonial_2_edit.png'
                alt='Cummins Packaging Training Library Testimonial 2'
                width={600}
                height={600}
              />
            </div>
          </div>
        </section>
        <section className='py-16 bg-slate-900 rounded-t-2xl'>
          <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='max-w-3xl'>
              <h2 className='text-sm font-semibold tracking-[0.3em] text-clemson uppercase'>
                Key Benefits for Your Team
              </h2>
              <p className='mt-4 text-3xl sm:text-4xl font-semibold text-white leading-tight'>
                Build aligned, future‑ready packaging capability across your
                organization.
              </p>
              <p className='mt-4 text-slate-300 text-sm sm:text-base'>
                Combine structured learning paths with flexible, self‑paced
                content designed for real projects, real decisions, and real
                business outcomes.
              </p>
            </div>

            <div className='mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
              {/* Role-Aligned Learning */}
              <div className='group relative overflow-hidden rounded-2xl bg-slate-800/80 border border-slate-700/80 p-6 hover:border-clemson/80 hover:bg-slate-800 transition-colors'>
                <div className='flex items-center justify-between gap-3'>
                  <div className='inline-flex h-11 w-11 items-center justify-center rounded-xl bg-clemson/10 text-clemson group-hover:bg-clemson group-hover:text-white transition-colors'>
                    <BriefcaseIcon className='h-6 w-6' />
                  </div>
                  <span className='text-xs font-medium uppercase tracking-wide text-slate-400'>
                    Alignment
                  </span>
                </div>
                <h3 className='mt-4 text-base font-semibold text-white'>
                  Role‑Aligned Learning
                </h3>
                <p className='mt-2 text-sm text-slate-300'>
                  Tailor training to specific roles, responsibilities, and
                  strategic priorities so every learner sees a direct connection
                  to their day‑to‑day work.
                </p>
              </div>

              {/* Comprehensive Skill Building */}
              <div className='group relative overflow-hidden rounded-2xl bg-slate-800/80 border border-slate-700/80 p-6 hover:border-clemson/80 hover:bg-slate-800 transition-colors'>
                <div className='flex items-center justify-between gap-3'>
                  <div className='inline-flex h-11 w-11 items-center justify-center rounded-xl bg-clemson/10 text-clemson group-hover:bg-clemson group-hover:text-white transition-colors'>
                    <AcademicCapIcon className='h-6 w-6' />
                  </div>
                  <span className='text-xs font-medium uppercase tracking-wide text-slate-400'>
                    Depth
                  </span>
                </div>
                <h3 className='mt-4 text-base font-semibold text-white'>
                  Comprehensive Skill Building
                </h3>
                <p className='mt-2 text-sm text-slate-300'>
                  Develop technical expertise, business acumen, and
                  cross‑functional understanding in a single, cohesive learning
                  ecosystem.
                </p>
              </div>

              {/* Future-Ready Teams */}
              <div className='group relative overflow-hidden rounded-2xl bg-slate-800/80 border border-slate-700/80 p-6 hover:border-clemson/80 hover:bg-slate-800 transition-colors'>
                <div className='flex items-center justify-between gap-3'>
                  <div className='inline-flex h-11 w-11 items-center justify-center rounded-xl bg-clemson/10 text-clemson group-hover:bg-clemson group-hover:text-white transition-colors'>
                    <LightBulbIcon className='h-6 w-6' />
                  </div>
                  <span className='text-xs font-medium uppercase tracking-wide text-slate-400'>
                    Future‑Ready
                  </span>
                </div>
                <h3 className='mt-4 text-base font-semibold text-white'>
                  Future‑Ready Teams
                </h3>
                <p className='mt-2 text-sm text-slate-300'>
                  Keep your organization current on emerging materials,
                  technologies, regulations, and best practices in packaging.
                </p>
              </div>

              {/* Practical, Job-Ready Knowledge */}
              <div className='group relative overflow-hidden rounded-2xl bg-slate-800/80 border border-slate-700/80 p-6 hover:border-clemson/80 hover:bg-slate-800 transition-colors'>
                <div className='flex items-center justify-between gap-3'>
                  <div className='inline-flex h-11 w-11 items-center justify-center rounded-xl bg-clemson/10 text-clemson group-hover:bg-clemson group-hover:text-white transition-colors'>
                    <ClipboardDocumentCheckIcon className='h-6 w-6' />
                  </div>
                  <span className='text-xs font-medium uppercase tracking-wide text-slate-400'>
                    Applied
                  </span>
                </div>
                <h3 className='mt-4 text-base font-semibold text-white'>
                  Practical, Job‑Ready Knowledge
                </h3>
                <p className='mt-2 text-sm text-slate-300'>
                  Translate learning into action with concrete examples,
                  frameworks, and tools your team can apply immediately.
                </p>
              </div>

              {/* Flexible, Accessible Training */}
              <div className='group relative overflow-hidden rounded-2xl bg-slate-800/80 border border-slate-700/80 p-6 hover:border-clemson/80 hover:bg-slate-800 transition-colors'>
                <div className='flex items-center justify-between gap-3'>
                  <div className='inline-flex h-11 w-11 items-center justify-center rounded-xl bg-clemson/10 text-clemson group-hover:bg-clemson group-hover:text-white transition-colors'>
                    <DevicePhoneMobileIcon className='h-6 w-6' />
                  </div>
                  <span className='text-xs font-medium uppercase tracking-wide text-slate-400'>
                    Flexible
                  </span>
                </div>
                <h3 className='mt-4 text-base font-semibold text-white'>
                  Flexible, Accessible Training
                </h3>
                <p className='mt-2 text-sm text-slate-300'>
                  Deliver self‑paced online learning that fits busy schedules
                  across locations, time zones, and work styles.
                </p>
              </div>

              {/* Unified Organizational Knowledge */}
              <div className='group relative overflow-hidden rounded-2xl bg-slate-800/80 border border-slate-700/80 p-6 hover:border-clemson/80 hover:bg-slate-800 transition-colors'>
                <div className='flex items-center justify-between gap-3'>
                  <div className='inline-flex h-11 w-11 items-center justify-center rounded-xl bg-clemson/10 text-clemson group-hover:bg-clemson group-hover:text-white transition-colors'>
                    <GlobeAltIcon className='h-6 w-6' />
                  </div>
                  <span className='text-xs font-medium uppercase tracking-wide text-slate-400'>
                    Aligned
                  </span>
                </div>
                <h3 className='mt-4 text-base font-semibold text-white'>
                  Unified Organizational Knowledge
                </h3>
                <p className='mt-2 text-sm text-slate-300'>
                  Improve collaboration with shared terminology, frameworks, and
                  resources that connect engineering, marketing, operations, and
                  more.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className='mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-0'>
          <div className='relative overflow-hidden bg-gray-100/90 p-8 sm:p-10 lg:p-20 shadow-sm'>
            <div className='max-w-3xl mx-auto text-center'>
              <p className='inline-flex items-center rounded-full bg-white/70 px-3 py-1 text-[11px] font-semibold tracking-[0.2em] text-slate-500 uppercase'>
                Trusted by leading teams
              </p>
              <h3 className='mt-4 text-2xl sm:text-3xl font-semibold text-gray-900'>
                Corporate education partners to the world&apos;s most innovative
                organizations
              </h3>
              <p className='mt-6 text-sm sm:text-base text-slate-600'>
                Organizations that implement a Packaging Library strengthen
                technical expertise, improve cross‑functional alignment,
                accelerate onboarding, and scale packaging knowledge across
                global teams. With structured, team‑focused learning pathways,
                companies drive measurable capability growth while supporting
                continuous professional development.
              </p>
            </div>

            <div className='mt-10 mx-auto max-w-6xl grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 items-center gap-x-10 gap-y-10'>
              <img
                className='col-span-1 max-h-20 w-full object-contain grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition'
                src='https://packschool.s3.us-east-1.amazonaws.com/ul-black.png'
                alt='Unilever'
                width={400}
                height={400}
              />
              <img
                className='col-span-1 max-h-20 w-full object-contain grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition p-1'
                src='https://packschool.s3.us-east-1.amazonaws.com/cummins.png'
                alt='Cummins'
                width={400}
                height={400}
              />
              <img
                className='col-span-1 max-h-20 w-full object-contain grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition'
                src='https://packschool.s3.us-east-1.amazonaws.com/pda-new.png'
                alt='PDA'
                width={400}
                height={400}
              />
              <img
                className='col-span-1 max-h-20 w-full object-contain grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition'
                src='https://packschool.s3.us-east-1.amazonaws.com/dvi-new.png'
                alt='DVI'
                width={400}
                height={400}
              />
              <img
                className='col-span-1 max-h-20 w-full object-contain grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition'
                src='https://packschool.s3.us-east-1.amazonaws.com/clemson-cc.png'
                alt='Smurfit Westrock'
                width={400}
                height={400}
              />
              <img
                className='col-span-1 max-h-20 w-full object-contain grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition'
                src='https://packschool.s3.us-east-1.amazonaws.com/SPC.png'
                alt='Sustainable Packaging Coalition'
                width={400}
                height={400}
              />
              <img
                className='col-span-1 max-h-20 w-full object-contain grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition p-1'
                src='https://packschool.s3.us-east-1.amazonaws.com/swz-black.png'
                alt='Schwarz Partners'
                width={400}
                height={400}
              />
              <img
                className='col-span-1 max-h-20 w-full object-contain grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition p-1'
                src='https://packschool.s3.us-east-1.amazonaws.com/cd-black.png'
                alt='Church and Dwight'
                width={400}
                height={400}
              />
              <img
                className='col-span-1 max-h-20 w-full object-contain grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition'
                src='https://packschool.s3.us-east-1.amazonaws.com/pipline-black.png'
                alt='Pipeline Packaging'
                width={400}
                height={400}
              />
              <img
                className='col-span-1 max-h-20 w-full object-contain grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition'
                src='https://packschool.s3.us-east-1.amazonaws.com/hood-black.png'
                alt='Hood Containers'
                width={400}
                height={400}
              />
              <img
                className='col-span-1 max-h-20 p-2 w-full object-contain grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition'
                src='https://packschool.s3.us-east-1.amazonaws.com/lk-black.png'
                alt='LK Packaging'
                width={400}
                height={400}
              />
              <img
                className='col-span-1 max-h-20 w-full object-contain grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition'
                src='https://packschool.s3.us-east-1.amazonaws.com/lucid-black.png'
                alt='Lucid'
                width={400}
                height={400}
              />
            </div>
          </div>
        </section>
        <section className='py-12 sm:py-16 bg-slate-900 rounded-b-2xl'>
          <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
            <h2 className='text-2xl sm:text-3xl font-semibold text-white'>
              Ready to Build Training That Fits Your Team?
            </h2>
            <p className='mt-3 text-sm sm:text-base text-slate-300'>
              Contact{' '}
              <span className='font-semibold text-white'>Dr. Julie Suggs</span>,
              our Academy Director, to explore a tailored learning plan for your
              organization.
            </p>
            <p className='mt-1 text-sm text-slate-400'>
              Email:{' '}
              <a
                href='mailto:julie@packagingschool.com'
                className='text-clemson hover:text-clemson/80 font-medium underline-offset-2 hover:underline'
              >
                julie@packagingschool.com
              </a>
            </p>
            <div className='mt-6'>
              <a
                href='mailto:julie@packagingschool.com?subject=Team%20Training%20Inquiry'
                className='inline-flex items-center justify-center rounded-full bg-clemson px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-clemson/90 transition-colors'
              >
                Email Dr. Suggs to Get Started
              </a>
            </div>
          </div>
        </section>
        <section className='py-16'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            <div className='w-full rounded-lg overflow-hidden'>
              <Image
                src='https://packschool.s3.us-east-1.amazonaws.com/Cummins+testimonial+3.png'
                alt='Cummins Packaging Training Library Testimonial 3'
                width={600}
                height={600}
              />
            </div>
            <div className='w-full rounded-lg overflow-hidden'>
              <Image
                src='https://packschool.s3.us-east-1.amazonaws.com/Cummins+testimonial+4.png'
                alt='Cummins Packaging Training Library Testimonial 4'
                width={600}
                height={600}
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Teams;
