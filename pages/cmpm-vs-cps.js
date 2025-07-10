import { Fragment } from 'react';
import { CheckIcon, MinusIcon } from '@heroicons/react/20/solid';
import { Disclosure } from '@headlessui/react';
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline';
import GradientCTA from '../components/GradientCTA';
import Meta from '../components/shared/Meta';

const tiers = [
  {
    name: 'CPS',
    id: 'tier-CPS',
    href: '/certifications/get-to-know-cps',
    description: 'Quis suspendisse ut fermentum neque vivamus non tellus.',
    mostPopular: false,
  },
  {
    name: 'CMPM',
    id: 'tier-CMPM',
    href: '/certifications/get-to-know-cmpm',
    description: 'Quis eleifend a tincidunt pellentesque. A tempor in sed.',
    mostPopular: true,
  },
];
const sections = [
  {
    name: 'Features',
    features: [
      {
        name: 'Hosted By',
        tiers: {
          CPS: 'The Packaging School',
          CMPM: "Clemson University's Center for Corporate Learning",
        },
      },
      {
        name: 'Timeline',
        tiers: {
          CMPM: '3 months asynchronous with PhD instructor coaching and review',
          CPS: 'Up to 6 months asynchronous',
        },
      },
      {
        name: 'Organization',
        tiers: { CPS: 'Self-paced', CMPM: 'PhD Led' },
      },
      {
        name: 'Credits',
        tiers: { CMPM: '80 hours (8 credits)', CPS: '60 hours (6 credits)' },
      },
      {
        name: 'Instructor Access',
        tiers: {
          CMPM: 'PhD led, feedback, coaching, oversight, and weekly office hours',
          CPS: 'Email Access',
        },
      },
      {
        name: 'Instructor Access',
        tiers: {
          CMPM: 'PhD led, feedback, coaching, oversight, and weekly office hours',
          CPS: 'Completing one course a month is recommended',
        },
      },
    ],
  },
  {
    name: 'Courses',
    features: [
      {
        name: 'Packaging Foundations',
        tiers: {
          CMPM: true,
          CPS: true,
        },
      },
      {
        name: 'Paperboard Cartons',
        tiers: {
          CMPM: true,
          CPS: true,
        },
      },
      {
        name: 'Corrugate Containers',
        tiers: {
          CMPM: true,
          CPS: true,
        },
      },
      {
        name: 'Glass Packaging',
        tiers: {
          CMPM: true,
          CPS: true,
        },
      },
      {
        name: 'Metal Packaging',
        tiers: {
          CMPM: true,
          CPS: true,
        },
      },
      {
        name: 'Polymers in Packaging',
        tiers: {
          CMPM: true,
          CPS: true,
        },
      },
      {
        name: 'Packaging Machinery',
        tiers: {
          CMPM: true,
          CPS: true,
        },
      },
      {
        name: 'Packaging Printing',
        tiers: {
          CMPM: true,
          CPS: true,
        },
      },
      {
        name: 'Package Distribution',
        tiers: {
          CMPM: true,
          CPS: true,
        },
      },
      {
        name: 'Packaging Regulations',
        tiers: {
          CMPM: true,
          CPS: true,
        },
      },
      {
        name: 'Sustainable Packaging',
        tiers: {
          CMPM: true,
          CPS: true,
        },
      },
      {
        name: 'Packaging Design Workflow',
        tiers: {
          CMPM: true,
          CPS: true,
        },
      },
      {
        name: 'Project Management',
        tiers: {
          CMPM: true,
          CPS: false,
        },
      },
      {
        name: 'Human Factors',
        tiers: {
          CMPM: true,
          CPS: false,
        },
      },
      {
        name: 'Package Development Plan Project',
        tiers: {
          CMPM: true,
          CPS: false,
        },
      },
    ],
  },
];

const faqs = [
  {
    question:
      'What is the difference between the Certificate of Mastery in Packaging Management and the Certificate of Packaging Science?',
    answer:
      'The Certificate of Mastery in Packaging Management is an online, interactive teaching series that guides organization leaders through a process of designing effective packaging systems. The teachings enable students to realize their creativity, actualize cost-savings for their company, and develop complete packaging systems. Throughout the business quarter, students complete ten online courses and a packaging development plan, which applies the teachings of the courses to a current work project. The lessons within each course are on-demand, which means students can log in and learn at the time that best suits their schedule. This program has 80 hours of content, 10 courses, and 8 CEUs (continuing education units). The cost is $7,000, since it is instructor-led, but payment plans are available. \nThe Certificate of Packaging Science is a one-year, online program that teaches the materials, processes, and influences shaping the advancement of the industry. From design conception to production to end-of-life, students will learn how to speak the language of packaging and utilize it as a key differentiator for them and their company. This program has 60 hours of content, 12 courses, and 6 CEUs. The cost is $3,999 or $349/month for 12 monthly payments.',
  },
  {
    question: 'What does it take to earn the Certificate of Packaging Science?',
    answer:
      'Composed of 12 courses, students will develop a comprehensive understanding of the industry, materials, processes, and development strategies.',
  },
  {
    question: 'What will the Certificate of Packaging Science do for me?',
    answer:
      'You will learn the knowledge necessary to have a holistic understanding of packaging. This intelligence will open up opportunities for you to advance into new packaging fields. Discover applications for innovation in your packaging career.',
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Example() {
  return (
    <>
      <Meta
        title={'CMPM vs. CPS'}
        description={
          'Compare out two most popular comprehensive certificate programs developed by the leaders in packaging education.'
        }
      />
      <div className='bg-white pt-32 sm:pt-48 relative isolate'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-4xl text-center'>
            <p className='mt-2 text-2xl font-greycliff md:text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl'>
              Certificate of Mastery in Packaging Management (CMPM) and the
              Certificate of Packaging Science (CPS)
            </p>
          </div>
          <p className='mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600'>
            A side-by-side comparison.
          </p>

          {/* xs to lg */}
          <div className='mx-auto mt-12 max-w-md space-y-8 sm:mt-16 lg:hidden'>
            {tiers.map((tier) => (
              <section
                key={tier.id}
                className={classNames(
                  tier.mostPopular
                    ? 'rounded-xl bg-gray-400/5 ring-1 ring-inset ring-gray-200'
                    : 'rounded-xl ring-1 ring-inset ring-gray-200',
                  'p-8'
                )}
              >
                <h3
                  id={tier.id}
                  className='text-xl font-semibold leading-6 text-gray-900'
                >
                  {tier.name}
                </h3>
                <p className='mt-2 flex items-baseline gap-x-1 text-gray-900'>
                  <span className='text-4xl font-bold'>
                    {tier.priceMonthly}
                  </span>
                </p>
                <a
                  href={tier.href}
                  aria-describedby={tier.id}
                  className={classNames(
                    tier.mostPopular
                      ? 'bg-slate-600 text-white hover:bg-slate-500'
                      : 'text-slate-600 ring-1 ring-inset ring-slate-200 hover:ring-slate-300',
                    'mt-8 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600'
                  )}
                >
                  View Certificate
                </a>
                <ul
                  role='list'
                  className='mt-10 space-y-4 text-sm leading-6 text-gray-900'
                >
                  {sections.map((section) => (
                    <li key={section.name}>
                      <ul role='list' className='space-y-4'>
                        {section.features.map((feature) =>
                          feature.tiers[tier.name] ? (
                            <li key={feature.name} className='flex gap-x-3'>
                              <CheckIcon
                                className='h-6 w-5 flex-none text-indigo-600'
                                aria-hidden='true'
                              />
                              <span>
                                {feature.name}{' '}
                                {typeof feature.tiers[tier.name] ===
                                'string' ? (
                                  <span className='text-sm leading-6 text-gray-500'>
                                    ({feature.tiers[tier.name]})
                                  </span>
                                ) : null}
                              </span>
                            </li>
                          ) : null
                        )}
                      </ul>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          {/* lg+ */}
          <div className='isolate mt-20 hidden lg:block'>
            <div className='relative -mx-8'>
              <table className='w-full table-fixed border-separate border-spacing-x-8 text-left'>
                <caption className='sr-only'>Pricing plan comparison</caption>
                <colgroup>
                  <col className='w-1/4' />
                  <col className='w-1/2' />
                  <col className='w-1/2 bg-slate-200 rounded-lg' />
                </colgroup>
                <thead>
                  <tr>
                    <td />
                    {tiers.map((tier) => (
                      <th
                        key={tier.id}
                        scope='col'
                        className='px-6 pt-6 xl:px-8 xl:pt-8'
                      >
                        <div className='text-2xl text-center font-semibold leading-7 text-gray-900'>
                          {tier.name}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope='row'>
                      <span className='sr-only'>Compare</span>
                    </th>
                    {tiers.map((tier) => (
                      <td key={tier.id} className='px-6 py-2 xl:px-8 w-1/2'>
                        <a
                          href={tier.href}
                          className={classNames(
                            tier.mostPopular
                              ? 'bg-base-brand text-white hover:bg-slate-500'
                              : 'text-base-brand ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300',
                            'mt-8 block rounded-md py-3 px-4 text-center text-lg font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600 w-full'
                          )}
                        >
                          View Certificate
                        </a>
                      </td>
                    ))}
                  </tr>
                  {sections.map((section, sectionIdx) => (
                    <Fragment key={section.name}>
                      <tr>
                        <th
                          scope='colgroup'
                          colSpan={4}
                          className={classNames(
                            sectionIdx === 0 ? 'pt-8' : 'pt-16',
                            'pb-4 text-sm font-semibold leading-6 text-gray-900'
                          )}
                        >
                          {section.name}
                          <div className='absolute inset-x-8 mt-4 h-px bg-gray-900/10' />
                        </th>
                      </tr>
                      {section.features.map((feature) => (
                        <tr key={feature.name}>
                          <th className='py-4 text-sm font-normal leading-6 text-gray-900'>
                            {feature.name}
                            <div className='absolute inset-x-8 mt-4 h-px bg-gray-900/5' />
                          </th>
                          {tiers.map((tier) => (
                            <td key={tier.id} className='py-4 px-6 xl:px-8'>
                              {typeof feature.tiers[tier.name] === 'string' ? (
                                <div className='text-center text-sm leading-6 text-gray-500'>
                                  {feature.tiers[tier.name]}
                                </div>
                              ) : (
                                <>
                                  {feature.tiers[tier.name] === true ? (
                                    <CheckIcon
                                      className='mx-auto h-5 w-5 text-slate-600'
                                      aria-hidden='true'
                                    />
                                  ) : (
                                    <MinusIcon
                                      className='mx-auto h-5 w-5 text-gray-400'
                                      aria-hidden='true'
                                    />
                                  )}

                                  <span className='sr-only'>
                                    {feature.tiers[tier.name] === true
                                      ? 'Included'
                                      : 'Not included'}{' '}
                                    in {tier.name}
                                  </span>
                                </>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className='bg-white'>
          <div className='mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:py-40 lg:px-8'>
            <div className='mx-auto max-w-7xl divide-y divide-gray-900/10'>
              <h2 className='text-2xl font-bold leading-10 tracking-tight font-greycliff text-gray-900'>
                Frequently asked questions
              </h2>
              <dl className='mt-10 space-y-6 divide-y divide-gray-900/10'>
                {faqs.map((faq) => (
                  <Disclosure as='div' key={faq.question} className='pt-6'>
                    {({ open }) => (
                      <>
                        <dt>
                          <Disclosure.Button className='flex w-full items-start justify-between text-left text-gray-900'>
                            <span className='text-lg font-semibold leading-7 font-greycliff'>
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
        <GradientCTA
          headline='Ready to Elevate Your Career?'
          subheadline='Try a demo, risk-free.'
          buttonText='Get Started For Free'
          secondaryButtonText='Need More Info?'
        />
      </div>
    </>
  );
}
