import React, { useState } from 'react';
import {
  ComputerDesktopIcon,
  ChatBubbleLeftEllipsisIcon,
  HandRaisedIcon,
  CodeBracketIcon,
  BoltIcon,
  ArrowUpRightIcon,
  ArrowSmallRightIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline';
import { Disclosure, Dialog } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import Image from "next/legacy/image";
import { useRouter } from 'next/router';

import ClassPackForm from '../components/forms/ClassPackForm';
import Meta from '../components/shared/Meta';

const Page = () => {
  const [isHover, setIsHover] = useState(false);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const classPackHandler = () => {
    fetch('/api/checkout_sessions', {
      method: 'POST',
    });
  };

  return (<>
    <Meta
      title={'Pack Design Workshop for Educators'}
      description={
        'Immerse in our online workshop to master packaging design fundamentals, from research to digital prototypes. Gain hands-on experience and skills.'
      }
      image={
        'https://packschool.s3.amazonaws.com/packdesignworkshopeducators-seoImage.webp'
      }
    />
    <div className='w-full h-full xl:py-12 p-3 md:p-6 relative'>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className='relative z-[100] w-full'
      >
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div className='fixed inset-0 bg-black/70' aria-hidden='true' />
        <div
          className='fixed right-3 lg:right-6 lg:top-6 top-3 lg:w-12 lg:h-12 w-7 h-7 shadow-sm text-white lg:text-2xl rounded-full flex items-center justify-center cursor-pointer bg-clemson z-[110]'
          onClick={() => setIsOpen(false)}
        >
          X
        </div>
        {/* Full-screen container to center the panel */}
        <div className='fixed inset-0 flex w-screen items-center justify-center p-4'>
          {/* The actual dialog panel  */}
          <Dialog.Panel className='mx-auto w-full max-w-3xl rounded-lg bg-white'>
            <Dialog.Title>
              <div className='bg-neutral-100 p-6 lg:p-12 flex flex-col lg:flex-row gap-6 justify-center items-center rounded-lg'>
                <div className='flex flex-col gap-3 justify-center items-center'>
                  <div className='font-etna text-xl text-center lg:text-3xl'>
                    Questions? Speak to one of our counselors.
                  </div>
                </div>
              </div>
            </Dialog.Title>

            <ClassPackForm />
          </Dialog.Panel>
        </div>
      </Dialog>
      <div className='max-w-7xl mx-auto flex flex-col gap-20'>
        <div className='grid lg:grid-cols-2 w-full gap-4 overflow-hidden'>
          <div className='flex flex-col gap-4 '>
            <div className='flex flex-col gap-12 lg:gap-20 bg-base-light rounded-xl px-6 md:px-9 lg:px-9 py-9'>
              <div className='flex flex-col gap-3'>
                <div className='flex flex-wrap gap-x-6 gap-y-3 mb-3'>
                  <div className='flex gap-1 items-center'>
                    <div>
                      <BoltIcon className='w-5 h-5 stroke-neutral-500' />
                    </div>
                    <div className='font-medium text-slate-900 text-sm'>
                      Newly Released!
                    </div>
                  </div>
                  <div className='flex gap-1 items-center'>
                    <div>
                      <ComputerDesktopIcon className='w-5 h-5 stroke-neutral-500' />
                    </div>
                    <div className='font-medium text-slate-900 text-sm'>
                      Online
                    </div>
                  </div>
                  <div className='flex gap-1 items-center'>
                    <div>
                      <HandRaisedIcon className='w-5 h-5 stroke-neutral-500' />
                    </div>
                    <div className='font-medium text-slate-900 text-sm'>
                      Hands-On
                    </div>
                  </div>
                  <div className='flex gap-1 items-center'>
                    <div>
                      <CodeBracketIcon className='w-5 h-5 stroke-neutral-500' />
                    </div>
                    <div className='font-medium text-slate-900 text-sm'>
                      Software Provided
                    </div>
                  </div>
                </div>
                <div className='text-4xl lg:text-6xl font-semibold tracking-tight max-w-sm'>
                  Pack Design Workshop for Educators
                </div>
                <div className='text-lg  text-neutral-600'>
                  <span className='font-medium'>$399 / License</span>
                </div>
              </div>
              <div>
                <p className='leading-normal text-lg'>
                  Master the fundamentals of packaging design in this
                  immersive, online workshop. Work through the design process
                  from research to building your own digital prototypes.
                  Completing this workshop will give you a solid foundation of
                  the box design process as well as some hands-on software
                  training that will allow you to directly apply your newfound
                  knowledge to the packaging challenges that packaging
                  professionals face every day.
                </p>
              </div>
            </div>
            <div
              className='flex flex-col lg:flex-row gap-4 w-full h-full cursor-pointer'
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
            >
              <div
                className=' bg-base-dark rounded-xl w-full h-full flex py-9 lg:p-6 items-center justify-center'
                onClick={() =>
                  window.open(
                    'https://buy.stripe.com/5kA5lg9g29HG6JOfYY',
                    '_blank'
                  )
                }
              >
                <div className='flex flex-col gap-1 items-center'>
                  <div className='font-etna text-center text-3xl md:text-4xl leading-none text-clemson'>
                    Be a Packaging Hero!
                  </div>
                  <div className='text-white leading-tight text-center px-6'>
                    Purchase a Class Pack<sup>*</sup> of licenses today.
                  </div>
                </div>
              </div>
              <div
                className={`bg-clemson rounded-xl h-full w-full pr-1.5 lg:max-w-[20%] lg:aspect-[1/1] flex justify-center items-center`}
                onClick={() =>
                  window.open(
                    'https://buy.stripe.com/5kA5lg9g29HG6JOfYY',
                    '_blank'
                  )
                }
              >
                <div>
                  <ArrowSmallRightIcon
                    className={`stroke-white stroke-4 transition-all ease-in w-24 h-24 ${
                      isHover ? 'scale-125' : ''
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='flex justify-center md:justify-end items-center bg-neutral-800 rounded-xl'>
            <div className='object-fit w-full h-full'>
              <Image
                src='https://packschool.s3.amazonaws.com/packtest.png'
                className='w-full h-full object-fit'
                alt='Packaging Design Workshop'
                layout='responsive'
                width={632}
                height={699}
              />
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 border-t border-t-neutral-600 pt-10 overflow-hidden md:px-9 lg:px-6'>
          <div className='text-3xl lg:text-4xl font-bold tracking-tight max-w-sm font-etna'>
            Who is this workshop intended for?
          </div>
          <div className='flex flex-col gap-6'>
            <div className='text-lg lg:text-xl leading-normal'>
              This program is ideal for anyone with a group of students who
              want to learn about designing a package. Order a class set
              <sup>*</sup> of licenses for your students and take advantage of
              the educator discount!<sup>**</sup>
            </div>
            <div className='text-lg lg:text-xl leading-normal'>
              Educators of all varieties can easily use this in their
              classroom settings: after-school programs, camps, exceptional
              student projects, homeschooling, and even traditional high
              school or community college classrooms. This course is easily
              adaptable for individual or group work.
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-12 lg:col-span-2 bg-neutral-100 rounded-lg px-6 py-12 overflow-hidden'>
          <div className='text-3xl lg:text-4xl font-bold font-etna tracking-tight max-w-sm md:col-span-2 lg:col-span-5 xl:col-span-1'>
            Course Objectives
          </div>
          <div className='border px-3 py-6 text-lg bg-white shadow-lg'>
            <span className='font-bold text-clemson'>Research</span>{' '}
            competitive packaging in your market category.
          </div>
          <div className='p-3 text-lg border px-3 py-6  bg-white shadow-lg'>
            <span className='font-bold text-clemson'>Develop</span> prototypes
            through ideation and experimentation.
          </div>
          <div className='p-3 text-lg border px-3 py-6  bg-white shadow-lg'>
            <span className='font-bold text-clemson'>Create</span> a strong
            package by applying design theories and techniques.
          </div>
          <div className='p-3 text-lg border px-3 py-6  bg-white shadow-lg'>
            <span className='font-bold text-clemson'>Generate</span> a digital
            prototype of your package design.
          </div>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 border-t border-t-neutral-600 pt-10 overflow-hidden'>
          <div className='text-3xl lg:text-4xl font-bold tracking-tight max-w-sm font-etna'>
            Syllabus
          </div>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:col-span-2'>
            <div>
              <Disclosure>
                {({ open }) => (
                  /* Use the `open` state to conditionally change the direction of an icon. */
                  (<>
                    <Disclosure.Button className='bg-base-mid grid grid-cols-6 rounded-t-lg w-full p-3'>
                      <div className='col-span-5  text-left text-white  text-xl'>
                        <span className='text-orange-300 font-bold font-sans tracking-tighter mr-1'>
                          01
                        </span>{' '}
                        Welcome
                      </div>
                      <div className='col-span-1 flex justify-end'>
                        <ChevronRightIcon
                          className={
                            open
                              ? 'rotate-90 transform w-6 h-6 text-right fill-white'
                              : 'w-6 h-6 text-right fill-white'
                          }
                        />
                      </div>
                    </Disclosure.Button>
                    <Disclosure.Panel className='border rounded-b-lg'>
                      <ul className='py-3'>
                        <li className='ml-9 py-1 list-disc'>
                          Navigating the Course
                        </li>
                        <li className='ml-9 py-1 list-disc'>
                          Course Introduction and the Design Process
                        </li>
                        <li className='ml-9 py-1 list-disc'>
                          Project and Schedule Review
                        </li>
                        <li className='ml-9 py-1 list-disc'>Survey</li>
                      </ul>
                    </Disclosure.Panel>
                  </>)
                )}
              </Disclosure>
            </div>
            <div>
              <Disclosure>
                {({ open }) => (
                  /* Use the `open` state to conditionally change the direction of an icon. */
                  (<>
                    <Disclosure.Button className='bg-base-mid grid grid-cols-6 rounded-t-lg w-full p-3'>
                      <div className='col-span-5  text-left text-white text-xl'>
                        <span className='text-orange-300 font-bold font-sans tracking-tighter mr-1'>
                          02
                        </span>{' '}
                        Market Research
                      </div>
                      <div className='col-span-1 flex justify-end'>
                        <ChevronRightIcon
                          className={
                            open
                              ? 'rotate-90 transform w-6 h-6 text-right fill-white'
                              : 'w-6 h-6 text-right fill-white'
                          }
                        />
                      </div>
                    </Disclosure.Button>
                    <Disclosure.Panel className='border rounded-b-lg'>
                      <ul className='py-4'>
                        <li className='ml-9 py-1 list-disc'>Retail Audit</li>
                        <li className='ml-9 py-1 list-disc'>
                          Elemental Analysis
                        </li>
                        <li className='ml-9 py-1 list-disc'>Regulations</li>
                      </ul>
                    </Disclosure.Panel>
                  </>)
                )}
              </Disclosure>
            </div>
            <div>
              <Disclosure>
                {({ open }) => (
                  /* Use the `open` state to conditionally change the direction of an icon. */
                  (<>
                    <Disclosure.Button className='bg-base-mid grid grid-cols-6 rounded-t-lg w-full p-3'>
                      <div className='col-span-5  text-left text-white text-xl'>
                        <span className='text-orange-300 font-bold font-sans tracking-tighter mr-1'>
                          03
                        </span>{' '}
                        Brainstorm & Ideation
                      </div>
                      <div className='col-span-1 flex justify-end'>
                        <ChevronRightIcon
                          className={
                            open
                              ? 'rotate-90 transform w-6 h-6 text-right fill-white'
                              : 'w-6 h-6 text-right fill-white'
                          }
                        />
                      </div>
                    </Disclosure.Button>
                    <Disclosure.Panel className='border rounded-b-lg'>
                      <ul className='py-4'>
                        <li className='ml-9 py-1 list-disc'>
                          50 Ideas Ledger
                        </li>
                        <li className='ml-9 py-1 list-disc'>
                          Brainstorming Methods
                        </li>
                        <li className='ml-9 py-1 list-disc'>Ideation</li>
                        <li className='ml-9 py-1 list-disc'>Prototyping</li>
                      </ul>
                    </Disclosure.Panel>
                  </>)
                )}
              </Disclosure>
            </div>
            <div>
              <Disclosure>
                {({ open }) => (
                  /* Use the `open` state to conditionally change the direction of an icon. */
                  (<>
                    <Disclosure.Button className='bg-base-mid grid grid-cols-6 rounded-t-lg w-full p-3'>
                      <div className='col-span-5  text-left text-white text-xl'>
                        <span className='text-orange-300 font-bold font-sans tracking-tighter mr-1'>
                          04
                        </span>{' '}
                        Design Factors
                      </div>
                      <div className='col-span-1 flex justify-end'>
                        <ChevronRightIcon
                          className={
                            open
                              ? 'rotate-90 transform w-6 h-6 text-right fill-white'
                              : 'w-6 h-6 text-right fill-white'
                          }
                        />
                      </div>
                    </Disclosure.Button>
                    <Disclosure.Panel className='border rounded-b-lg'>
                      <ul className='py-4'>
                        <li className='ml-9 py-1 list-disc'>Appearance</li>
                        <li className='ml-9 py-1 list-disc'>Visual</li>
                        <li className='ml-9 py-1 list-disc'>Placement</li>
                        <li className='ml-9 py-1 list-disc'>Connection</li>
                        <li className='ml-9 py-1 list-disc'>Simplicity</li>
                        <li className='ml-9 py-1 list-disc'>Ergonomics</li>
                      </ul>
                    </Disclosure.Panel>
                  </>)
                )}
              </Disclosure>
            </div>
            <div>
              <Disclosure>
                {({ open }) => (
                  /* Use the `open` state to conditionally change the direction of an icon. */
                  (<>
                    <Disclosure.Button className='bg-base-mid grid grid-cols-6 rounded-t-lg w-full p-3'>
                      <div className='col-span-5  text-left text-white text-xl'>
                        <span className='text-orange-300 font-bold font-sans tracking-tighter mr-1'>
                          05
                        </span>{' '}
                        Digital Prototype
                      </div>
                      <div className='col-span-1 flex justify-end'>
                        <ChevronRightIcon
                          className={
                            open
                              ? 'rotate-90 transform w-6 h-6 text-right fill-white'
                              : 'w-6 h-6 text-right fill-white'
                          }
                        />
                      </div>
                    </Disclosure.Button>
                    <Disclosure.Panel className='border rounded-b-lg'>
                      <ul className='py-4'>
                        <li className='ml-9 py-1 list-disc'>
                          Design Software Tutorial
                        </li>
                        <li className='ml-9 py-1 list-disc'>
                          Prototype Setup
                        </li>
                        <li className='ml-9 py-1 list-disc'>
                          Graphics and Text
                        </li>
                        <li className='ml-9 py-1 list-disc'>
                          Create and Save a Virtual Prototype
                        </li>
                        <li className='ml-9 py-1 list-disc'>
                          Resources for Printing
                        </li>
                      </ul>
                    </Disclosure.Panel>
                  </>)
                )}
              </Disclosure>
            </div>
            <div>
              <Disclosure>
                {({ open }) => (
                  /* Use the `open` state to conditionally change the direction of an icon. */
                  (<>
                    <Disclosure.Button className='bg-base-mid grid grid-cols-6 rounded-t-lg w-full p-3'>
                      <div className='col-span-5  text-left text-white text-xl'>
                        <span className='text-orange-300 font-bold font-sans tracking-tighter mr-1'>
                          06
                        </span>{' '}
                        Conclusion
                      </div>
                      <div className='col-span-1 flex justify-end'>
                        <ChevronRightIcon
                          className={
                            open
                              ? 'rotate-90 transform w-6 h-6 text-right fill-white'
                              : 'w-6 h-6 text-right fill-white'
                          }
                        />
                      </div>
                    </Disclosure.Button>
                    <Disclosure.Panel className='border rounded-b-lg'>
                      <ul className='py-4'>
                        <li className='ml-9 py-1 list-disc'>
                          Course Summary
                        </li>
                        <li className='ml-9 py-1 list-disc'>Final Survey</li>
                        <li className='ml-9 py-1 list-disc'>
                          How to Print Your Certificate of Completion
                        </li>
                      </ul>
                    </Disclosure.Panel>
                  </>)
                )}
              </Disclosure>
            </div>
          </div>
        </div>
        <div className=' bg-gradient-to-tr from-base-brand via-base-mid to-clemson rounded-xl'>
          <div className='mx-auto max-w-7xl px-6 text-center lg:text-left py-12 lg:py-20 flex flex-col gap-12 lg:flex-row items-center justify-center lg:justify-between w-full lg:px-16'>
            <h2 className='text-4xl font-bold  text-white sm:text-5xl font-etna'>
              Ready to get hands-on?
              <br />
              Purchase your Class Pack today!
            </h2>
            <div className='flex flex-col justify-center items-center gap-3 '>
              <div
                className='aspect-[1/1] w-40 bg-white ring-clemson ring-4 rounded-lg shadow-lg bg-contain bg-center cursor-pointer'
                style={{
                  backgroundImage: `url('https://packschool.s3.amazonaws.com/teachqr.png')`,
                }}
                onClick={() =>
                  window.open(
                    'https://buy.stripe.com/5kA5lg9g29HG6JOfYY',
                    '_blank'
                  )
                }
              ></div>
              <div className='text-sm text-white cursor-pointer'>
                Click or Scan
              </div>
            </div>
          </div>
        </div>
        <div className='bg-neutral-100 p-12 flex flex-col lg:flex-row gap-6 justify-center items-center rounded-lg'>
          <div className='flex flex-col gap-3 justify-center items-center'>
            <div className='font-etna text-3xl'>
              Questions? Speak to one of our counselors.
            </div>
            <div className='text-lg'>
              Fill out the required form to get more information regarding
              Class Packs.
            </div>
            <div
              className='bg-base-brand font-bold text-white text-lg rounded-lg py-4 px-6 mt-2 cursor-pointer'
              onClick={() => setIsOpen(true)}
            >
              <div>Get More Info</div>
            </div>
          </div>
        </div>
        <div className='text-sm text-neutral-600 flex flex-col gap-3'>
          <div>
            *Educator discount applied to a minimum of 30 licenses. If you
            need fewer than that, please order through our{' '}
            <a
              href='https://library.packagingschool.com/packdesign-workshop'
              target='_blank'
              rel='noreferrer'
              className='underline'
            >
              {' '}
              non-educator website.
            </a>
          </div>
          <div>
            **Discounts do not stack; only one discount will be applied to
            your purchase. If a coupon code from an event is entered into the
            educator discount form, the greater discount will be applied.
          </div>
        </div>
      </div>
    </div>
  </>);
};

export default Page;
