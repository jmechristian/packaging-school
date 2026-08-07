import React from 'react';
import PatternBackground from '../components/layout/PatternBackground';
import GradientCTA from '../components/GradientCTA';
import VideoPlayer from '../components/VideoPlayer';
import { ArrowRightCircleIcon } from '@heroicons/react/24/solid';
import { Disclosure } from '@headlessui/react';
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Meta from '../components/shared/Meta';
import {
  buildHomeJsonLd,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
} from '../libs/seo/organizationJsonLd';
import CertContextNav from '../components/certifications/CertContextNav';

const faqs = [
  {
    question: 'Yeah, we know our stuff, but how do we share it?',
    answer:
      "No problem! Our creative team can come to you to do any filming needed. We'll create custom graphics and downloads, then compile it all to bring your unique perspective to life in our Food Packaging Certificate.",
  },
  {
    question: 'How can I help make the Certificate?',
    answer:
      'Excellent question--you can sponsor the Food Packaging Certificate financially, or you can offer your expertise by being a subject matter expert.',
  },
  {
    question: "Do I get access to the Certificate once it's completed?",
    answer:
      'Absolutely! In fact, depending on how you are able to contribute, you will have access to licenses to educate your employees and your customers for no additional cost.',
  },
  {
    question: "I'm interested--what do I do now?",
    answer:
      "Very exciting! You'll want to talk to our Academic Director, Dr. Julie Suggs. She can answer any questions you may have and create a plan for us to partner! Email: julie@packagingschool.com",
  },
];

const Index = () => {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://packagingschool.com';
  const { organization, website } = buildHomeJsonLd(siteUrl);
  const breadcrumb = buildBreadcrumbJsonLd(
    [{ name: 'Food Packaging Certificate', path: '/food-packaging' }],
    siteUrl,
  );
  const faqJsonLd = buildFaqJsonLd(faqs);

  return (
    <>
      <Meta
        title={'Food Packaging Certificate'}
        description={
          'Boost your brand by sponsoring our project! Partner with us to enrich food packaging pros with deep industry insights. Spotlight your brand, establish your leaders as experts.'
        }
        image={'https://packschool.s3.amazonaws.com/fpc-seoImage.webp'}
        url='/food-packaging'
        structuredData={[organization, website, breadcrumb, faqJsonLd]}
      />
      <CertContextNav active='food' />
      <PatternBackground />
      {/* Hero section */}
      <div id='cert-hero' className='pt-14 scroll-mt-24'>
        <div className='mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8'>
          <div className='mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8'>
            <h1 className='max-w-2xl text-4xl font-bold tracking-tight font-greycliff text-gray-900 sm:text-6xl lg:col-span-2 xl:col-auto'>
              Be a thought leader in the Food Packaging Space
            </h1>
            <div className='mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1'>
              <p className='text-lg md:text-xl text-gray-500 md:leading-9'>
                Promote Your Brand, Educate The World. Through your sponsorship
                you will support hundreds of food packaging professionals better
                understand the industry and the value you provide. Your company
                is front and center. Your leaders are the subject-matter
                experts.
              </p>
              <div className='flex gap-1 items-center mt-6 md:mt-12'>
                <p className='font-greycliff font-bold text-lg md:text-2xl'>
                  <Link href='/forms/food-packaging-sponsor-form'>
                    Sponsor this Certificate
                  </Link>
                </p>
                <div>
                  <ArrowRightCircleIcon className='w-7 h-7 text-clemson' />
                </div>
              </div>
            </div>
            <img
              src='https://packschool.s3.amazonaws.com/food_packaging_hero-1024x412.webp'
              alt='Food Packaging Certificate'
              className='mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36'
            />
          </div>
        </div>
      </div>

      <div className='mx-auto max-w-7xl px-6 py-16 sm:py-16 lg:px-8 text-center'>
        <p className='mt-2 text-2xl font-greycliff font-bold tracking-tight text-gray-900 sm:text-5xl mb-9'>
          Shine a Light on Your Brand
        </p>
        <div className='w-full h-full aspect-[16/9]'>
          <VideoPlayer
            hideSupport={true}
            videoEmbedLink='https://player.vimeo.com/video/712102606?h=853f79b7c0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
            className='w-full'
            light='https://packschool.s3.amazonaws.com/certifications/food-placeholder.png'
          />
        </div>
      </div>

      <div className='bg-white'>
        <div className='mx-auto max-w-7xl px-6 py-16 sm:py-16 lg:py-16 lg:px-8'>
          <div className='mx-auto max-w-4xl divide-y divide-gray-900/10'>
            <h2 className='text-3xl font-bold leading-10 tracking-tight text-gray-900'>
              Frequently asked questions
            </h2>
            <dl className='mt-10 space-y-6 divide-y divide-gray-900/10'>
              {faqs.map((faq) => (
                <Disclosure as='div' key={faq.question} className='pt-6'>
                  {({ open }) => (
                    <>
                      <dt>
                        <Disclosure.Button className='flex w-full items-start justify-between text-left text-gray-900'>
                          <span className='text-lg font-semibold leading-7'>
                            {faq.question}
                          </span>
                          <span className='ml-6 flex h-7 items-center'>
                            {open ? (
                              <MinusSmallIcon
                                className='h-6 w-6'
                                aria-hidden='true'
                              />
                            ) : (
                              <PlusSmallIcon
                                className='h-6 w-6'
                                aria-hidden='true'
                              />
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
        </div>
      </div>

      <div className='bg-white pt-24 pb-16 sm:pt-32 sm:pb-24 xl:pb-32'>
        <div className='bg-base-dark pb-20 sm:pb-24 xl:pb-0'>
          <div className='mx-auto flex max-w-7xl flex-col items-center gap-y-10 gap-x-8 px-6 sm:gap-y-8 lg:px-8 xl:flex-row xl:items-stretch'>
            <div className='-mt-8 w-full max-w-2xl xl:-mb-8 xl:w-96 xl:flex-none'>
              <div className='relative aspect-[3/3] md:aspect-[2/3] h-full md:-mx-8 xl:mx-0 xl:aspect-auto'>
                <img
                  className='absolute inset-0 h-full w-full rounded-2xl bg-base-mid object-cover shadow-2xl'
                  src='https://packschool.s3.amazonaws.com/Dr-Andrew-Hurley-Packaging-School-2048x2048.jpeg'
                  alt=''
                />
              </div>
            </div>
            <div className='w-full max-w-2xl xl:max-w-none xl:flex-auto xl:py-24 xl:px-16'>
              <figure className='relative isolate pt-6 sm:pt-12'>
                <svg
                  viewBox='0 0 162 128'
                  fill='none'
                  aria-hidden='true'
                  className='absolute top-0 left-0 -z-10 h-32 stroke-white/20'
                >
                  <path
                    id='b56e9dab-6ccb-4d32-ad02-6b4bb5d9bbeb'
                    d='M65.5697 118.507L65.8918 118.89C68.9503 116.314 71.367 113.253 73.1386 109.71C74.9162 106.155 75.8027 102.28 75.8027 98.0919C75.8027 94.237 75.16 90.6155 73.8708 87.2314C72.5851 83.8565 70.8137 80.9533 68.553 78.5292C66.4529 76.1079 63.9476 74.2482 61.0407 72.9536C58.2795 71.4949 55.276 70.767 52.0386 70.767C48.9935 70.767 46.4686 71.1668 44.4872 71.9924L44.4799 71.9955L44.4726 71.9988C42.7101 72.7999 41.1035 73.6831 39.6544 74.6492C38.2407 75.5916 36.8279 76.455 35.4159 77.2394L35.4047 77.2457L35.3938 77.2525C34.2318 77.9787 32.6713 78.3634 30.6736 78.3634C29.0405 78.3634 27.5131 77.2868 26.1274 74.8257C24.7483 72.2185 24.0519 69.2166 24.0519 65.8071C24.0519 60.0311 25.3782 54.4081 28.0373 48.9335C30.703 43.4454 34.3114 38.345 38.8667 33.6325C43.5812 28.761 49.0045 24.5159 55.1389 20.8979C60.1667 18.0071 65.4966 15.6179 71.1291 13.7305C73.8626 12.8145 75.8027 10.2968 75.8027 7.38572C75.8027 3.6497 72.6341 0.62247 68.8814 1.1527C61.1635 2.2432 53.7398 4.41426 46.6119 7.66522C37.5369 11.6459 29.5729 17.0612 22.7236 23.9105C16.0322 30.6019 10.618 38.4859 6.47981 47.558L6.47976 47.558L6.47682 47.5647C2.4901 56.6544 0.5 66.6148 0.5 77.4391C0.5 84.2996 1.61702 90.7679 3.85425 96.8404L3.8558 96.8445C6.08991 102.749 9.12394 108.02 12.959 112.654L12.959 112.654L12.9646 112.661C16.8027 117.138 21.2829 120.739 26.4034 123.459L26.4033 123.459L26.4144 123.465C31.5505 126.033 37.0873 127.316 43.0178 127.316C47.5035 127.316 51.6783 126.595 55.5376 125.148L55.5376 125.148L55.5477 125.144C59.5516 123.542 63.0052 121.456 65.9019 118.881L65.5697 118.507Z'
                  />
                  <use href='#b56e9dab-6ccb-4d32-ad02-6b4bb5d9bbeb' x={86} />
                </svg>
                <blockquote className='text-xl font-semibold leading-8 text-white sm:text-2xl sm:leading-9'>
                  <p>
                    There are so many companies innovating in the packaging
                    industry, but countless industry pros don’t know who they
                    are or what they are contributing. Since 2015, we’ve been
                    highlighting these companies and providing much-needed
                    education within the industry.
                  </p>
                  <p></p>
                </blockquote>
                <figcaption className='mt-8 text-base'>
                  <div className='font-semibold text-white'>
                    Dr. Andrew Hurley
                  </div>
                  <div className='mt-1 text-gray-400'>
                    Founder of The Packaging School
                  </div>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>

      <div className='bg-white'>
        <div className='py-24 px-6 sm:px-6 sm:py-36 lg:px-8'>
          <div className='mx-auto max-w-2xl text-center'>
            <h2 className='text-3xl font-greycliff font-bold tracking-tight text-gray-900 sm:text-5xl'>
              Interested In Sponsoring? Questions?
            </h2>
            <p className='mx-auto mt-6 max-w-xl text-xl leading-8 text-gray-600'>
              Leave your mark on the packaging industry. Click below to apply or
              reach out to our Academic Director Dr. Julie Suggs
            </p>
            <div className='mt-10 flex items-center justify-center gap-x-6'>
              <div className='rounded-md bg-base-mid px-3.5 py-2.5 text-lg font-greycliff font-bold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-base-mid'>
                <Link href='/forms/food-packaging-sponsor-form'>
                  Get started
                </Link>
              </div>
              <div className='flex items-center gap-1 text-lg font-bold font-greycliff leading-6 text-gray-900'>
                <Link href='mailto:julie@packagingschool.com'>Contact Us</Link>
                <span aria-hidden='true'>
                  <Link href='mailto:julie@packagingschool.com'>→</Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <GradientCTA
        headline='Ready to Elevate Your Career?'
        subheadline='Try a demo, risk-free.'
        buttonText='Get Started For Free'
        secondaryButtonText='Need More Info?'
      />
    </>
  );
};

export default Index;
