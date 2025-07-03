import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';

const frequencies = [
  { value: 'monthly', label: 'Monthly', priceSuffix: '/month' },
  { value: 'full', label: 'Full', priceSuffix: 'in full' },
];
const tiers = [
  {
    name: 'Certificate of Packaging Science',
    id: 'tier-freelancer',
    href: '/certificate-of-packaging-science-application',
    price: { monthly: '$349', full: '$3,999' },
    description:
      'The Certificate of Packaging Science is a one year online program that teaches the materials, processes, and influences shaping the advancement of the industry.',
    features: [
      '6-months access',
      'Choose your own electives',
      '12 expert-led courses',
      'Instructor email access',
    ],
    mostPopular: false,
    bottom: 'Open enrollment. Apply anytime.',
  },
  {
    name: 'Certificate of Mastery in Packaging Management',
    id: 'tier-startup',
    href: '/certificate-of-mastery-in-packaging-management',
    price: { monthly: 'Multiple Options', full: '$7,000' },
    description:
      'An online executive education program that can level up your career in the space of packaging development, material procurement, and organizational management.',
    features: [
      '12-week structure',
      'Flexible lectures and 1:1 instructor coaching',
      'PhD Instructor-led project',
      'Practical knowledge and rigorous examination',
    ],
    mostPopular: true,

    bottom:
      'Application Required. Summer Session 2023: May 22 - Aug 11. Application deadline: May 5th',
  },
  {
    name: 'Automotive Packaging Certificate',
    id: 'tier-enterprise',
    href: 'https://learn.packagingschool.com/enroll/735516',
    price: { monthly: '$287', full: '$2,400' },
    description:
      'The first and only 100% online academic program that will enable you to develop the professional skill set you need to be successful in the automotive packaging field.',
    features: [
      'Returnable/ expendable packaging',
      'Packaging distributors',
      'Packaging ops for OEMs/ Tier 1s',
      'Transportation',
      'Hazmat packaging',
    ],
    mostPopular: false,
    bottom: 'Open enrollment. Apply anytime.',
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ChooseCert() {
  const [frequency, setFrequency] = useState(frequencies[1]);

  return (
    <div className='bg-white py-24 sm:py-32'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-3xl text-center'>
          <p className='mt-2 text-4xl font-bold tracking-tight font-greycliff text-gray-900 sm:text-5xl'>
            Find the Right Style and Pace to Achieve Your Learning Goals
          </p>
        </div>
        <p className='mx-auto mt-6 max-w-3xl text-center text-lg leading-8 text-slate-600'>
          Whatever the case, as the exclusive licensee of a professional
          packaging curriculum developed at Clemson University, The Packaging
          School will help raise your packaging IQ.
        </p>
        <div className='mt-16 flex justify-center'>
          <RadioGroup
            value={frequency}
            onChange={setFrequency}
            className='grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-slate-200'
          >
            <RadioGroup.Label className='sr-only'>
              Payment frequency
            </RadioGroup.Label>
            {frequencies.map((option) => (
              <RadioGroup.Option
                key={option.value}
                value={option}
                className={({ checked }) =>
                  classNames(
                    checked ? 'bg-base-mid text-white' : 'text-slate-500',
                    'cursor-pointer rounded-full py-1 px-2.5'
                  )
                }
              >
                <span>{option.label}</span>
              </RadioGroup.Option>
            ))}
          </RadioGroup>
        </div>
        <div className='isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={classNames(
                tier.mostPopular
                  ? 'ring-2 ring-clemson'
                  : 'ring-1 ring-slate-200',
                'rounded-3xl p-8 xl:p-10'
              )}
            >
              <div className='flex items-center justify-between gap-x-4'>
                <h3
                  id={tier.id}
                  className={classNames(
                    tier.mostPopular ? 'text-base-mid' : 'text-slate-900',
                    'text-xl md:text-2xl font-bold leading-8 font-greycliff'
                  )}
                >
                  {tier.name}
                </h3>
              </div>
              <p className='mt-4 leading-6 text-slate-600'>
                {tier.description}
              </p>
              <p className='mt-6 flex items-baseline gap-x-1'>
                <span className='text-4xl font-bold tracking-tight text-slate-900'>
                  {tier.price[frequency.value]}
                </span>
                <span className='font-semibold leading-6 text-slate-600'>
                  {frequency.priceSuffix}
                </span>
              </p>
              <a
                href={tier.href}
                aria-describedby={tier.id}
                className={classNames(
                  tier.mostPopular
                    ? 'bg-base-mid text-white shadow-sm hover:bg-base-brand'
                    : 'text-base-mid ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300',
                  ' font-greycliff mt-6 block rounded-md py-2 px-3 text-center font-bold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                )}
              >
                Enroll Now
              </a>
              <ul
                role='list'
                className='mt-8 space-y-3 leading-6 text-slate-600 xl:mt-10'
              >
                {tier.features.map((feature) => (
                  <li key={feature} className='flex gap-x-3'>
                    <CheckIcon
                      className='h-6 w-5 flex-none text-base-mid'
                      aria-hidden='true'
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className='bg-slate-200 p-3 text-slate-600 mt-8'>
                {tier.bottom && tier.bottom}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
