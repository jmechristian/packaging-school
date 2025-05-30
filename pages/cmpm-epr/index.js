'use client';
import React, { useState } from 'react';
import {
  MdCalendarToday,
  MdAddCall,
  MdOutlineVideoLibrary,
  MdEmojiEvents,
  MdPeopleAlt,
  MdCheck,
  MdCall,
} from 'react-icons/md';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Page = () => {
  const router = useRouter();
  const [isUS, setIsUS] = useState(true);
  return (
    <div className='w-full flex flex-col gap-10 py-10 max-w-7xl mx-auto'>
      <div className='w-full grid lg:grid-cols-12 gap-10 px-4 lg:px-0'>
        <div className='flex flex-col gap-10 col-span-8'>
          <div className='w-full h2-base max-w-4xl'>
            Resolve Your Extended Producer Responsibility (EPR) Challenges in 12
            Weeks —{' '}
            <span className='text-clemson'>
              Earn Clemson’s Certificate of Mastery in Packaging Management.
            </span>
          </div>
          <div className='w-full h-px bg-gray-600'></div>
          <div className='flex flex-col gap-10 w-full bg-slate-100 p-5 rounded-lg lg:hidden'>
            <div className='flex flex-col gap-2'>
              <div className='w-full flex items-center bg-black p-2.5 gap-1.5'>
                <div>
                  <MdCalendarToday color='white' size={20} />
                </div>
                <div className=' text-white font-semibold'>Program Dates</div>
              </div>
              <div className='flex flex-col gap-3'>
                <div className='flex items-center justify-between ml-2'>
                  <div className='font-semibold'>August 4 – October 27</div>
                  <div className='flex items-center gap-2'></div>
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <div className='w-full border-t border-gray-300 pt-2 border-dashed'></div>
                <div className='flex flex-col gap-2'>
                  <div className='w-full flex items-center gap-2'>
                    <div>
                      <MdAddCall color='#4b5563' size={20} />
                    </div>
                    <div className='font-semibold text-gray-600'>
                      Bi-Weekly Expert Calls
                    </div>
                  </div>
                </div>
                <div className='w-full border-t border-gray-300 pt-2 border-dashed'></div>
                <div className='flex flex-col gap-2'>
                  <div className='w-full flex items-center gap-2'>
                    <div>
                      <MdOutlineVideoLibrary color='#4b5563' size={20} />
                    </div>
                    <div className='font-semibold text-gray-600'>
                      On-Demand Resources
                    </div>
                  </div>
                </div>
                <div className='w-full border-t border-gray-300 pt-2 border-dashed'></div>
                <div className='flex flex-col gap-2'>
                  <div className='w-full flex items-start gap-2'>
                    <div>
                      <MdEmojiEvents color='#4b5563' size={20} />
                    </div>
                    <div className='font-semibold text-gray-600'>
                      Hands-On{' '}
                      <span
                        className='underline cursor-pointer'
                        onClick={() => {
                          window.open(
                            'https://packagingschool.com/packaging-development-plan-index',
                            '_blank'
                          );
                        }}
                      >
                        Packaging Development Plan
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <div className='w-full flex items-center bg-black p-2.5 gap-1.5'>
                <div>
                  <MdCalendarToday color='white' size={20} />
                </div>
                <div className=' text-white font-semibold'>
                  Who should enroll?
                </div>
              </div>
              <div>
                <ul className=' list-inside flex flex-col gap-2 divide-y divide-gray-300 divide-dashed ml-2'>
                  <li className='leading-tight pt-2'>
                    Brand Managers ready to lead packaging innovation
                  </li>
                  <li className='leading-tight pt-2'>
                    Procurement Specialists seeking compliance clarity
                  </li>
                  <li className='leading-tight pt-2'>
                    Packaging Engineers aiming to innovate and optimize
                  </li>
                  <li className='leading-tight pt-2'>
                    Sustainability Leaders tasked with meeting EPR requirements
                  </li>
                </ul>
              </div>
            </div>
            <div
              className='w-full flex text-lg items-center justify-center text-center bg-clemson py-4 text-white font-semibold rounded-lg cursor-pointer hover:bg-clemson/90 transition-all duration-300'
              onClick={() => {
                router.push('/certificate-of-mastery-in-packaging-management');
              }}
            >
              Apply Now
            </div>
            <div
              className='w-full flex items-center gap-3 cursor-pointer'
              onClick={() => {
                window.open(
                  'https://calendar.app.google/qUZMKuFbF7NhpxgL8',
                  '_blank'
                );
              }}
            >
              <div>
                <div className='w-10 h-10 rounded-full bg-black flex items-center justify-center'>
                  <MdCall color='white' size={20} />
                </div>
              </div>
              <div className='text-gray-600 text-sm'>
                <span className='font-semibold max-w-xs'>Questions? </span>
                Schedule a free call with one of our advisors to learn more.
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-5'>
            <div className='w-full h3-base text-base-brand'>
              Why This CMPM Update Matters
            </div>
            <div className='w-full flex flex-col gap-5'>
              <div className='w-full '>
                At the heart of our programs is education with intent—focused
                learning designed to equip you with the knowledge and skills you
                need to lead confidently in a rapidly changing regulatory
                landscape. Extended Producer Responsibility (EPR) regulations
                are reshaping packaging strategy across the United States and
                globe. As of May 2025, seven states in the United States
                (Oregon, Colorado, California, Maine, Minnesota, Maryland, and
                Washington) have passed EPR for packaging programs, and 60+
                nations{' '}
                <span
                  className='underline cursor-pointer'
                  onClick={() => {
                    window.open(
                      'https://packagingschool.com/lessons/extended-producer-responsibility-laws-for-packaging-around-the-world',
                      '_blank'
                    );
                  }}
                >
                  around the world
                </span>{' '}
                have programs or implementation plans in place.
              </div>
              <div className='w-full '>
                Deadlines are looming, and the packaging landscape is becoming
                more complex than ever. Whether you’re managing brands,
                procuring materials, or engineering packaging solutions, you
                need to stay ahead—not just to comply, but to lead.
              </div>
              <div className='w-full '>
                This specialized CMPM cohort is designed to deliver targeted
                insights and actionable strategies that will empower you to
                confidently navigate EPR programs and innovate with your
                packaging systems to stay compliant and win{' '}
                <span
                  className='underline cursor-pointer'
                  onClick={() => {
                    window.open(
                      'https://packagingschool.com/lessons/exploring-eco-modulated-fees-in-epr-for-packaging-in-the-usa',
                      '_blank'
                    );
                  }}
                >
                  ecomodulation bonuses
                </span>
                .
              </div>
              <div className='w-full flex flex-col items-center gap-3'>
                <div className='w-full aspect-[16/9] bg-black'>
                  {isUS ? (
                    <div className='w-full h-full relative flex items-center justify-center'>
                      <Image
                        src='https://packschool.s3.us-east-1.amazonaws.com/EPR_for_Packaging_in_the_US__2025-sm.png'
                        alt='EPR in the US'
                        fill
                        width={1368}
                        height={957}
                      />
                    </div>
                  ) : (
                    <div className='w-full h-full relative flex items-center justify-center'>
                      <Image
                        src='https://packschool.s3.us-east-1.amazonaws.com/EPR_for_Packaging_Around_World-sm.png'
                        alt='EPR around the world'
                        fill
                        width={1818}
                        height={958}
                      />
                    </div>
                  )}
                </div>
                <div className='w-full flex items-center gap-3 justify-center'>
                  <div
                    className={`text-gray-600 cursor-pointer hover:text-clemson transition-all duration-300 ${
                      isUS ? 'text-clemson underline' : ''
                    }`}
                    onClick={() => setIsUS(true)}
                  >
                    EPR in the US
                  </div>
                  <div className='text-gray-600'>|</div>
                  <div
                    className={`text-gray-600 cursor-pointer hover:text-clemson transition-all duration-300 ${
                      !isUS ? 'text-clemson underline' : ''
                    }`}
                    onClick={() => setIsUS(false)}
                  >
                    EPR around the world
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='w-full h-px bg-gray-600'></div>
          <div className='w-full flex flex-col gap-6'>
            <div className='w-full h3-base text-base-brand'>
              What You’ll Get
            </div>
            <div className='w-full flex flex-col lg:flex-row gap-6 lg:gap-10'>
              <div className='w-full flex gap-2 max-w-xs'>
                <div>
                  <MdCheck className='text-clemson' size={25} />
                </div>
                <div className='font-semibold text-gray-600'>
                  Bi-Weekly SME
                  <br /> Interaction Sessions
                </div>
              </div>
              <div className='w-full'>
                Connect live every two weeks with leading Subject Matter Experts
                who bring real-world experience and deep knowledge on packaging
                challenges—from regulatory compliance to material innovation.
                Ask questions, solve problems, and get tailored advice.
              </div>
            </div>
            <div className='w-full flex flex-col lg:flex-row gap-6 lg:gap-10'>
              <div className='w-full flex gap-2 max-w-xs'>
                <div>
                  <MdCheck className='text-clemson' size={25} />
                </div>
                <div className='font-semibold text-gray-600 max-w-xs'>
                  Guest Lectures by
                  <br /> Industry Leaders
                </div>
              </div>
              <div className='w-full'>
                Hear from experienced professionals and innovators in the
                packaging field. These sessions will feature a mix of live and
                pre-recorded lectures covering hot topics like EPR debates,
                sustainable materials, and cutting-edge packaging solutions
                designed to help you stay ahead of the curve.
              </div>
            </div>
            <div className='w-full flex flex-col lg:flex-row gap-6 lg:gap-10'>
              <div className='w-full flex gap-2 max-w-xs'>
                <div>
                  <MdCheck className='text-clemson' size={25} />
                </div>
                <div className='font-semibold text-gray-600 max-w-xs'>
                  Learning Hub
                </div>
              </div>
              <div className='w-full'>
                Access your course materials, session recordings, discussion
                forums, and input forms all in one place. Submit your questions
                before each SME call and influence the agenda with topics that
                matter most to you.
              </div>
            </div>
            <div className='w-full flex flex-col lg:flex-row gap-6 lg:gap-10'>
              <div className='w-full flex gap-2 max-w-xs'>
                <div>
                  <MdCheck className='text-clemson' size={25} />
                </div>
                <div className='font-semibold text-gray-600 max-w-xs'>
                  Practical PDP <br />
                  Deliverables & Solutions
                </div>
              </div>
              <div className='w-full'>
                Work on your Packaging Development Plan (PDP) with guided
                deliverables designed to help you craft actionable solutions for
                your EPR-related packaging challenges, including:
                <ul className='list-disc list-inside flex flex-col gap-2 divide-y divide-gray-300 divide-dashed ml-2'>
                  <li className='leading-tight pt-2'>
                    Tackling multi-layer foam alternatives
                  </li>
                  <li className='leading-tight pt-2'>
                    Moving away from Styrofoam and evaluating alternatives
                  </li>
                  <li className='leading-tight pt-2'>
                    Addressing colored plastics and compostable packaging
                  </li>
                  <li className='leading-tight pt-2'>
                    Managing glass weight requirements
                  </li>
                  <li className='leading-tight pt-2'>
                    Solving issues with adhesives and recyclable materials
                  </li>
                  <li className='leading-tight pt-2'>And much more!</li>
                </ul>
              </div>
            </div>
          </div>
          <div className='w-full h-px bg-gray-600'></div>
        </div>
        <div className='w-full lg:col-span-4 h-full relative hidden lg:flex flex-col gap-10'>
          <div className='flex flex-col gap-10 w-full bg-slate-100 p-5 rounded-lg sticky top-10'>
            <div className='flex flex-col gap-2'>
              <div className='w-full flex items-center bg-black p-2.5 gap-1.5'>
                <div>
                  <MdCalendarToday color='white' size={20} />
                </div>
                <div className=' text-white font-semibold'>Program Dates</div>
              </div>
              <div className='flex flex-col gap-3'>
                <div className='flex items-center justify-between ml-2'>
                  <div className='font-semibold'>August 4 – October 27</div>
                  <div className='flex items-center gap-2'></div>
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <div className='w-full border-t border-gray-300 pt-2 border-dashed'></div>
                <div className='flex flex-col gap-2'>
                  <div className='w-full flex items-center gap-2'>
                    <div>
                      <MdAddCall color='#4b5563' size={20} />
                    </div>
                    <div className='font-semibold text-gray-600'>
                      Bi-Weekly Expert Calls
                    </div>
                  </div>
                </div>
                <div className='w-full border-t border-gray-300 pt-2 border-dashed'></div>
                <div className='flex flex-col gap-2'>
                  <div className='w-full flex items-center gap-2'>
                    <div>
                      <MdOutlineVideoLibrary color='#4b5563' size={20} />
                    </div>
                    <div className='font-semibold text-gray-600'>
                      On-Demand Resources
                    </div>
                  </div>
                </div>
                <div className='w-full border-t border-gray-300 pt-2 border-dashed'></div>
                <div className='flex flex-col gap-2'>
                  <div className='w-full flex items-start gap-2'>
                    <div>
                      <MdEmojiEvents color='#4b5563' size={20} />
                    </div>
                    <div className='font-semibold text-gray-600'>
                      Hands-On{' '}
                      <span
                        className='underline cursor-pointer'
                        onClick={() => {
                          window.open(
                            'https://packagingschool.com/packaging-development-plan-index',
                            '_blank'
                          );
                        }}
                      >
                        Packaging Development Plan
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <div className='w-full flex items-center bg-black p-2.5 gap-1.5'>
                <div>
                  <MdCalendarToday color='white' size={20} />
                </div>
                <div className=' text-white font-semibold'>
                  Who should enroll?
                </div>
              </div>
              <div>
                <ul className=' list-inside flex flex-col gap-2 divide-y divide-gray-300 divide-dashed ml-2'>
                  <li className='leading-tight pt-2'>
                    Brand Managers ready to lead packaging innovation
                  </li>
                  <li className='leading-tight pt-2'>
                    Procurement Specialists seeking compliance clarity
                  </li>
                  <li className='leading-tight pt-2'>
                    Packaging Engineers aiming to innovate and optimize
                  </li>
                  <li className='leading-tight pt-2'>
                    Sustainability Leaders tasked with meeting EPR requirements
                  </li>
                </ul>
              </div>
            </div>
            <div
              className='w-full flex text-lg items-center justify-center text-center bg-clemson py-4 text-white font-semibold rounded-lg cursor-pointer hover:bg-clemson/90 transition-all duration-300'
              onClick={() => {
                router.push('/certificate-of-mastery-in-packaging-management');
              }}
            >
              Apply Now
            </div>
            <div
              className='w-full flex items-center gap-3 cursor-pointer'
              onClick={() => {
                window.open(
                  'https://calendar.app.google/qUZMKuFbF7NhpxgL8',
                  '_blank'
                );
              }}
            >
              <div>
                <div className='w-10 h-10 rounded-full bg-black flex items-center justify-center'>
                  <MdCall color='white' size={20} />
                </div>
              </div>
              <div className='text-gray-600 text-sm'>
                <span className='font-semibold max-w-xs'>Questions? </span>
                Schedule a free call with one of our advisors to learn more.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
