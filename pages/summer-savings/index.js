import React from 'react';
import Link from 'next/link';
import Meta from '../../components/shared/Meta';

const steps = [
  {
    title: 'Purchase your first course',
    description:
      'Enroll in any course to unlock your free second course. This is your qualifying purchase.',
  },
  {
    title: 'Email us your details',
    description: (
      <>
        Send an email to{' '}
        <a
          href='mailto:info@packagingschool.com'
          className='font-semibold text-base-dark underline decoration-base-brand/40 underline-offset-2 hover:text-base-brand'
        >
          info@packagingschool.com
        </a>{' '}
        and include:
      </>
    ),
    bullets: [
      'The second course you would like to enroll in',
      'The intended participant (yourself or a colleague)',
      "Your colleague's name and email address (if applicable)",
    ],
  },
  {
    title: 'Get enrolled for free',
    description:
      'Once we receive your email, we’ll enroll the recipient in the second course at no additional cost.',
  },
];

const SummerSavings = () => {
  return (
    <>
      <Meta
        title='Summer Savings: A Second Course on Us'
        description='From June 25 through July 2, 2026, enroll in any Packaging School course and get a second course of equal or lesser value free. Learn more and claim your summer savings.'
        robots='noindex, nofollow'
        image='https://packschool.s3.us-east-1.amazonaws.com/Summer-School-Savings3.png'
      />
      <main className='bg-gradient-to-b from-base-light/40 via-white to-white py-12 sm:py-16'>
        <div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-8'>
            {/* Left column: marketing copy */}
            <div className='flex flex-col justify-center'>
              <span className='inline-flex w-fit items-center gap-2 rounded-full bg-brand-yellow px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-black'>
                June 25 – July 2, 2026
              </span>

              <h1 className='mt-4 text-4xl font-extrabold leading-tight tracking-tight text-dark sm:text-5xl'>
                Your Second Course is{' '}
                <span className='text-base-brand'>On Us</span>
              </h1>

              <p className='mt-3 text-lg leading-relaxed text-gray-600'>
                From June 25th through July 2nd, 2026, invest in your packaging
                career this summer and share the opportunity with a colleague—or
                deepen your own expertise with a second course. Purchase any
                course and unlock a second course of equal or lesser value,
                completely free.
              </p>

              <div className='mt-6'>
                <h2 className='text-sm font-bold uppercase tracking-widest text-base-dark'>
                  How it works
                </h2>
                <ol className='mt-3 space-y-4'>
                  {steps.map((step, index) => (
                    <li key={step.title} className='flex gap-4'>
                      <span className='flex h-9 w-9 flex-none items-center justify-center rounded-full bg-base-brand text-base font-bold text-white'>
                        {index + 1}
                      </span>
                      <div>
                        <h3 className='text-lg font-semibold text-dark'>
                          {step.title}
                        </h3>
                        <p className='mt-1 text-gray-600'>{step.description}</p>
                        {step.bullets && (
                          <ul className='mt-2 space-y-1.5'>
                            {step.bullets.map((bullet) => (
                              <li
                                key={bullet}
                                className='flex items-start gap-2 text-gray-600'
                              >
                                <span className='mt-2 h-1.5 w-1.5 flex-none rounded-full bg-base-brand' />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Right column: image + callout */}
            <div className='flex flex-col gap-4'>
              <div className='overflow-hidden rounded-2xl shadow-lg'>
                <img
                  src='https://packschool.s3.us-east-1.amazonaws.com/Summer-School-Savings3.png'
                  alt='Summer School Savings'
                  className='w-full'
                />
              </div>

              <div className='rounded-2xl border border-base-light bg-base-light/30 px-6 py-5 text-center'>
                <p className='text-lg font-semibold text-dark'>
                  Ready to get started?
                </p>
                <p className='mt-1 text-sm text-gray-600'>
                  Browse our full catalog and find the course that fits your
                  goals.
                </p>
                <Link
                  href='/all_courses'
                  className='mt-4 inline-flex items-center justify-center rounded-md bg-base-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-base-dark'
                >
                  Explore Courses
                </Link>
              </div>
            </div>
          </div>

          <p className='mt-8 text-black'>
            <span className='font-bold'>Please note:</span> The second course
            must be of equal or lesser value than the purchased course.
          </p>
        </div>
      </main>
    </>
  );
};

export default SummerSavings;
