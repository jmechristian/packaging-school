import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { GoArrowLeft, GoArrowRight } from 'react-icons/go';
import BrutalCourseCard from '../components/shared/BrutalCourseCard';
import Meta from '../components/shared/Meta';

const cpsIds = [
  'ff174f01-5f76-486c-8d7a-849d6d3ff914',
  '672c1d2b-ba6c-4e02-8c34-83e8c3e4f7b3',
  '2418801f-a352-4eae-a394-87a5c0c55f79',
  '4e6c079e-b396-4762-8b7f-4fa4dea64969',
  'f2fad11c-4548-41ea-b39d-be5a4913a4f5',
  '452ec0d8-7464-4bd6-bfc2-eab051a9b40b',
  '431ce262-cf48-4a7c-8ff1-2909f548149b',
  '5d84ef6e-3fa3-423d-8e33-67d32605cb93',
  'f2bd57ba-adbf-45ab-88f0-d68ac20c5b7e',
  '73139212-0b15-4d96-9942-1757fa058fdf',
  'e39e127a-11bc-448d-a8c0-209b3abbfdb9',
  '4e32d164-d4d9-4ba2-bcc5-ce882df75b71',
];

const Page = () => {
  const [isIndex, setIsIndex] = useState(0);
  const [isLocation, setIsLocation] = useState(null);
  const router = useRouter();
  const { location } = useSelector((state) => state.auth);

  return (
    <>
      <Meta
        title={'Packaging School | Mexico Student Discount'}
        description={
          'Unbox your potention with 60% OFF select Packaging School Courses'
        }
        image={'https://packschool.s3.amazonaws.com/firework-box-2-logo.webp'}
        keywords={
          'packaging, online education, Mexico, student, design, materials, business'
        }
      />
      <div className='max-w-6xl mx-auto pb-16'>
        {!location || !location.country ? (
          <div className='flex flex-col gap-6 py-10 md:py-16 w-full'>
            <div className='w-1/4 h-16 bg-neutral-300 animate-pulse rounded-lg'></div>
            <div className='w-2/3 h-24 bg-neutral-300 animate-pulse rounded-lg'></div>
            <div className='w-2/3 h-24 bg-neutral-300 animate-pulse rounded-lg'></div>
            <div className='w-2/3 h-24 bg-neutral-300 animate-pulse rounded-lg'></div>
            <div className='w-2/3 h-24 bg-neutral-300 animate-pulse rounded-lg'></div>
          </div>
        ) : location && location.country === 'MX' ? (
          <>
            <div className='flex flex-col gap-12 py-10 md:py-16 w-full  border-b-black border-b-2'>
              <div className='flex flex-col gap-5 px-5 xl:px-0'>
                <div className='bg-brand-red border-black border-2 text-white font-bold px-4 py-2 rounded-lg w-fit shadow-[4px_4px_0px_black] lg:text-lg'>
                  Limited Time!
                </div>
                <div className='text-5xl lg:max-w-3xl lg:text-7xl font-medium tracking-tighter lg:leading-[1.0em]'>
                  Unbox Your Potential: Dive into Expert-Crafted Courses at{' '}
                  <span className='text-base-brand font-bold'>
                    60% OFF!<sup className='-mt-3'>*</sup>
                  </span>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-10 py-10 px-5 xl:px-0 border-b-2 border-b-black'>
              <div className='flex flex-col gap-5'>
                <div className='text-2xl'>
                  <h3>Certificate of Packaging Science Core Courses</h3>
                </div>
                <div className=' max-w-4xl w-full'>
                  The Certificate of Packaging Science offers a comprehensive
                  program consisting of 12 courses that cover all major aspects
                  of packaging materials, processes, and design. Interested in a
                  structured, comprehensive learning program over the next 12
                  months?{' '}
                  <span
                    className='underline text-base-mid font-semibold'
                    onClick={() =>
                      window.open(
                        'https://packagingschool.com/certificate-of-packaging-science-application',
                        '_blank'
                      )
                    }
                  >
                    Apply now!
                  </span>{' '}
                  Looking to just get a jump start? Puchase an individual course
                  below.
                </div>
                <div className='md:grid md:grid-cols-2 xl:grid-cols-3 gap-10 w-fit hidden mt-7'>
                  {cpsIds.map((id) => (
                    <div key={id}>
                      <BrutalCourseCard
                        id={id}
                        discount={0.6}
                        coupon={'mexicosite2024'}
                      />
                    </div>
                  ))}
                </div>
                <div className='flex w-full gap-5 pt-5 pb-3 md:hidden'>
                  <BrutalCourseCard
                    id={cpsIds[isIndex]}
                    discount={0.6}
                    coupon={'mexicosite2024'}
                  />
                </div>
                <div className='flex w-full justify-between items-center md:hidden'>
                  <div className='grid h-14 w-14 place-content-center text-3xl transition-colors hover:bg-black hover:text-white'>
                    <GoArrowLeft
                      onClick={() => {
                        if (isIndex != 0) {
                          setIsIndex((prevValue) => prevValue - 1);
                        }
                      }}
                    />
                  </div>
                  <div>{isIndex + 1 + '/' + cpsIds.length}</div>
                  <button
                    onClick={() => {
                      if (isIndex < cpsIds.length - 1) {
                        setIsIndex((prevValue) => prevValue + 1);
                      }
                    }}
                    className='grid h-14 w-14 place-content-center text-3xl transition-colors hover:bg-black hover:text-white'
                  >
                    <GoArrowRight />
                  </button>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-10 pt-16 pb-16 px-5 xl:px-0 border-b-2 border-b-black'>
              <div className='flex flex-col lg:flex-row lg:justify-between lg:items-center gap-5'>
                <div className='flex flex-col gap-6 w-full max-w-xl'>
                  <div className='text-4xl'>
                    <h3>
                      Building a solid packaging foundation. Master the
                      essentials to elevate your designs.
                    </h3>
                  </div>
                  <div className='max-w-4xl'>
                    Dive into our Packaging 101 Boot Camp, designed to fit
                    seamlessly into your busy schedule. Spanning 20 workdays,
                    this course demands less than 20 minutes of your day to
                    unlock a comprehensive understanding of packaging
                    fundamentals. Through eight hours of rich educational
                    content, engaging activities, and invaluable cheat sheets,
                    you&apos;ll emerge with a robust foundation tailored for
                    success. Whether you&apos;re in marketing, sales,
                    procurement, legal, distribution, quality control,
                    manufacturing, or warehousing, this course addresses the
                    distinct packaging requirements of various departments. By
                    the end, you&apos;ll gain the critical thinking skills
                    essential for a successful role in the packaging development
                    process, ready to meet and exceed the unique demands of your
                    field.
                  </div>
                </div>
                <div>
                  <BrutalCourseCard
                    id={'fef1f2a6-b9b9-4619-9900-c677f91681c7'}
                    discount={0.6}
                    coupon={'mexicosite2024'}
                  />
                </div>
              </div>
            </div>
            <div className='text-sm mt-6 pb-6 border-b-2 border-black'>
              *<span className='font-bold'>Course Enrollment Disclaimer:</span>{' '}
              Please be advised that all course orders are contingent upon the
              terms outlined in the enrollment agreement, including but not
              limited to, the verification of the student&apos;s location. We
              reserve the right to cancel any order that does not comply with
              these requirements. It is the responsibility of the student to
              ensure that their location aligns with the geographical and
              regulatory requirements stipulated in the enrollment agreement.
            </div>
          </>
        ) : (
          <>
            <div className='flex flex-col gap-12 py-10 md:py-16 w-full  border-b-black border-b-2 px-4 lg:px-0'>
              <div className='flex flex-col gap-5 px-5 xl:px-0'>
                <div className='bg-brand-red border-black border-2 text-white font-bold px-4 py-2 rounded-lg w-fit shadow-[4px_4px_0px_black] lg:text-lg'>
                  Help!
                </div>
                <div className='text-5xl lg:max-w-4xl lg:text-7xl font-medium tracking-tighter lg:leading-[1.0em]'>
                  You have reached this page in error. Please head to our{' '}
                  <span
                    className='text-base-brand font-bold cursor-pointer'
                    onClick={() => router.push('/all_courses')}
                  >
                    Courses
                  </span>{' '}
                  page for expert-crafted education.
                </div>
              </div>
            </div>
            <div className='text-sm mt-6 pb-6 border-b-2 border-black px-6 xl:px-0'>
              Can&apos;t find what you are looking for? Please reach out to
              info@packagingschool.com for questions, concerns, or lets us know
              what you&apos;d like to learn.
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Page;
