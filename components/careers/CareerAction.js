import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/20/solid';
import { Disclosure, Transition } from '@headlessui/react';
import Link from 'next/link';

const tiers = [
  {
    name: 'Certificates',
    id: 'tier-startup',
    href: '#',
    features: [
      'Certificate of Mastery in Packaging Management',
      'Certificate of Packaging Science',
      'Automotive Packaging Certificate',
    ],
    mostPopular: true,
  },
  {
    name: 'Courses',
    id: 'tier-enterprise',
    href: '#',
    features: [
      'Core Courses',
      'Elective Courses',
      'Free Courses',
      'Beverage Courses',
    ],
    mostPopular: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const CareerAction = ({
  freeCopy,
  electiveCopy,
  cpsCopy,
  coreCopy,
  cmpmCopy,
  beverageCopy,
  apcCopy,
}) => {
  return (
    (<div className='bg-gray-900 py-16 sm:py-28'>
      <div className='mx-auto max-w-6xl px-6 lg:px-8'>
        <div className='mx-auto max-w-4xl text-center'>
          <h2 className='text-base md:text-lg font-semibold leading-7 text-base-brand font-greycliff'>
            Expert-Led Curriculum
          </h2>
          <p className='mt-2 text-4xl font-semibold tracking-tight max-w-3xl mx-auto text-white sm:text-5xl font-greycliff'>
            How can the Packaging School Elevate my Career?
          </p>
        </div>
        <div className='isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2'>
          {/* Second Box */}
          <div className='bg-white/5 ring-2 ring-base-mid rounded-3xl p-8 xl:p-10 flex flex-col justify-between'>
            <div className='flex flex-col'>
              <div className='flex items-center justify-between gap-x-4'>
                <h3 className='text-xl md:text-2xl font-greycliff font-semibold leading-8 text-white'>
                  Certificates
                </h3>
                <p className='rounded-full bg-base-mid py-1 px-2.5 text-xs font-semibold leading-5 text-white'>
                  Most Extensive
                </p>
              </div>

              <div
                role='list'
                className='mt-8 space-y-3 text-sm leading-6 text-gray-300 xl:mt-10'
              >
                <div className='flex flex-col gap-4'>
                  <Disclosure>
                    <Disclosure.Button>
                      <div className='flex gap-2'>
                        <div>
                          <PlusIcon className='w-7 h-7 text-clemson' />
                        </div>
                        <div className='text-base md:text-lg text-left'>
                          Certificate of Mastery in Packaging Management
                        </div>
                      </div>
                    </Disclosure.Button>

                    <Transition
                      enter='transition duration-100 ease-out'
                      enterFrom='transform scale-95 opacity-0'
                      enterTo='transform scale-100 opacity-100'
                      leave='transition duration-75 ease-out'
                      leaveFrom='transform scale-100 opacity-100'
                      leaveTo='transform scale-95 opacity-0'
                    >
                      <Disclosure.Panel>
                        <div className='w-full h-full bg-gray-700 text-base md:text-lg py-6 px-6 rounded-lg my-2'>
                          {cmpmCopy}
                        </div>
                      </Disclosure.Panel>
                    </Transition>
                  </Disclosure>
                  <Disclosure>
                    <Disclosure.Button>
                      <div className='flex gap-2'>
                        <div>
                          <PlusIcon className='w-7 h-7 text-clemson' />
                        </div>
                        <div className='text-base md:text-lg text-left'>
                          Certificate of Packaging Science
                        </div>
                      </div>
                    </Disclosure.Button>

                    <Transition
                      enter='transition duration-100 ease-out'
                      enterFrom='transform scale-95 opacity-0'
                      enterTo='transform scale-100 opacity-100'
                      leave='transition duration-75 ease-out'
                      leaveFrom='transform scale-100 opacity-100'
                      leaveTo='transform scale-95 opacity-0'
                    >
                      <Disclosure.Panel>
                        <div className='w-full h-full bg-gray-700 text-base md:text-lg py-6 px-6 rounded-lg my-2'>
                          {cpsCopy}
                        </div>
                      </Disclosure.Panel>
                    </Transition>
                  </Disclosure>
                  <Disclosure>
                    <Disclosure.Button>
                      <div className='flex gap-2'>
                        <div>
                          <PlusIcon className='w-7 h-7 text-clemson' />
                        </div>
                        <div className='text-base md:text-lg text-left'>
                          Automotive Packaging Certificate
                        </div>
                      </div>
                    </Disclosure.Button>

                    <Transition
                      enter='transition duration-100 ease-out'
                      enterFrom='transform scale-95 opacity-0'
                      enterTo='transform scale-100 opacity-100'
                      leave='transition duration-75 ease-out'
                      leaveFrom='transform scale-100 opacity-100'
                      leaveTo='transform scale-95 opacity-0'
                    >
                      <Disclosure.Panel>
                        <div className='w-full h-full bg-gray-700 text-base md:text-lg py-6 px-6 rounded-lg my-2'>
                          {apcCopy}
                        </div>
                      </Disclosure.Panel>
                    </Transition>
                  </Disclosure>
                </div>
              </div>
            </div>

            <Link
              href='/certificates'
              aria-describedby='Certificate of Mastery in Packaging Management'
              // : 'bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white'
              className='bg-base-mid text-white shadow-sm hover:bg-base-dark focus-visible:outline-base-mid mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
              legacyBehavior>
              <div className='bg-base-mid text-white shadow-sm hover:bg-base-dark focus-visible:outline-base-mid mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'>
                View Certificates
              </div>
            </Link>
          </div>

          {/* Second Box */}
          <div className='bg-white/5 ring-1 ring-white/10 rounded-3xl p-8 xl:p-10 flex flex-col justify-between'>
            <div className='flex flex-col'>
              <div className='flex items-center justify-between gap-x-4'>
                <h3 className='text-xl md:text-2xl font-greycliff font-semibold leading-8 text-white'>
                  Courses
                </h3>
              </div>

              <div
                role='list'
                className='mt-8 space-y-3 text-sm leading-6 text-gray-300 xl:mt-10'
              >
                {/* {tier.features.map((feature) => ( */}
                <div className='flex flex-col gap-4'>
                  <Disclosure>
                    <Disclosure.Button>
                      <div className='flex gap-2'>
                        <div>
                          <PlusIcon className='w-7 h-7 text-clemson' />
                        </div>
                        <div className='text-base md:text-lg text-left'>
                          Core Courses
                        </div>
                      </div>
                    </Disclosure.Button>

                    <Transition
                      enter='transition duration-100 ease-out'
                      enterFrom='transform scale-95 opacity-0'
                      enterTo='transform scale-100 opacity-100'
                      leave='transition duration-75 ease-out'
                      leaveFrom='transform scale-100 opacity-100'
                      leaveTo='transform scale-95 opacity-0'
                    >
                      <Disclosure.Panel>
                        <div className='w-full h-full bg-gray-700 text-base md:text-lg py-6 px-6 rounded-lg my-2'>
                          {coreCopy}
                        </div>
                      </Disclosure.Panel>
                    </Transition>
                  </Disclosure>
                  <Disclosure>
                    <Disclosure.Button>
                      <div className='flex gap-2'>
                        <div>
                          <PlusIcon className='w-7 h-7 text-clemson' />
                        </div>
                        <div className='text-base md:text-lg text-left'>
                          Elective Courses
                        </div>
                      </div>
                    </Disclosure.Button>

                    <Transition
                      enter='transition duration-100 ease-out'
                      enterFrom='transform scale-95 opacity-0'
                      enterTo='transform scale-100 opacity-100'
                      leave='transition duration-75 ease-out'
                      leaveFrom='transform scale-100 opacity-100'
                      leaveTo='transform scale-95 opacity-0'
                    >
                      <Disclosure.Panel>
                        <div className='w-full h-full bg-gray-700 text-base md:text-lg py-6 px-6 rounded-lg my-2'>
                          {electiveCopy}
                        </div>
                      </Disclosure.Panel>
                    </Transition>
                  </Disclosure>
                  <Disclosure>
                    <Disclosure.Button>
                      <div className='flex gap-2'>
                        <div>
                          <PlusIcon className='w-7 h-7 text-clemson' />
                        </div>
                        <div className='text-base md:text-lg text-left'>
                          Free Courses
                        </div>
                      </div>
                    </Disclosure.Button>

                    <Transition
                      enter='transition duration-100 ease-out'
                      enterFrom='transform scale-95 opacity-0'
                      enterTo='transform scale-100 opacity-100'
                      leave='transition duration-75 ease-out'
                      leaveFrom='transform scale-100 opacity-100'
                      leaveTo='transform scale-95 opacity-0'
                    >
                      <Disclosure.Panel>
                        <div className='w-full h-full bg-gray-700 text-base md:text-lg py-6 px-6 rounded-lg my-2'>
                          {freeCopy}
                        </div>
                      </Disclosure.Panel>
                    </Transition>
                  </Disclosure>
                  <Disclosure>
                    <Disclosure.Button>
                      <div className='flex gap-2'>
                        <div>
                          <PlusIcon className='w-7 h-7 text-clemson' />
                        </div>
                        <div className='text-base md:text-lg text-left'>
                          Beverage Courses
                        </div>
                      </div>
                    </Disclosure.Button>

                    <Transition
                      enter='transition duration-100 ease-out'
                      enterFrom='transform scale-95 opacity-0'
                      enterTo='transform scale-100 opacity-100'
                      leave='transition duration-75 ease-out'
                      leaveFrom='transform scale-100 opacity-100'
                      leaveTo='transform scale-95 opacity-0'
                    >
                      <Disclosure.Panel>
                        <div className='w-full h-full bg-gray-700 text-base md:text-lg py-6 px-6 rounded-lg my-2'>
                          {beverageCopy}
                        </div>
                      </Disclosure.Panel>
                    </Transition>
                  </Disclosure>
                </div>
                {/* ))} */}
              </div>
            </div>
            <div className=''>
              <Link
                href='/all_courses'
                aria-describedby='Certificate of Mastery in Packaging Management'
                legacyBehavior>
                <div className='bg-white/10 cursor-pointer text-white hover:bg-white/20 focus-visible:outline-white bg-base-mid shadow-sm hover:bg-indigo-400 mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'>
                  View Courses
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>)
  );
};

export default CareerAction;
