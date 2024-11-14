import React, { Suspense, useMemo } from 'react';
import Image from 'next/image';
import {
  AcademicCapIcon,
  BoltIcon,
  RocketLaunchIcon,
  SparklesIcon,
  SignalIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline';
import { API } from 'aws-amplify';
import { useSelector } from 'react-redux';
import { getCustomer } from '../../src/graphql/queries';

import NewCouseCard from '../../components/shared/NewCouseCard';
import Marquee from '../../components/shared/Marquee';
import Link from 'next/link';
import Meta from '../../components/shared/Meta';

const Page = ({ customer }) => {
  const { allCourses } = useSelector((state) => state.course_filter);

  const initCourses = useMemo(() => {
    const filtered = customer.courses.items.map((c) => {
      const matchedCourse =
        allCourses && allCourses.find((ac) => ac.id === c.courseId);
      return {
        ...c,
        ...matchedCourse,
        targetedId: c.id,
      };
    });
    return filtered;
  }, [customer, allCourses]);

  return (
    <>
      <Meta
        title={'Packaging School Cyber Monday'}
        description={
          "Master more for less! Take advantage of 25% of all Courses and Certificate Programs (if applied by Dec 1). This is a great time to enroll in that program you've been eyeing all year!"
        }
        image={'https://packschool.s3.amazonaws.com/cybermonday-seoImage.webp'}
      />
      <div className='w-full mx-auto max-w-6xl rounded-b-xl lg:mt-6  bg-[#1b1b1b] shadow-lg'>
        <div>
          <Image
            alt='Cyber Monday Black Friday Sales 20 Percent Off All Courses and Certificates'
            src={'https://packschool.s3.amazonaws.com/Cyber-Monday_hero.png'}
            width={1200}
            height={608}
            layout='responsive'
          />
        </div>
        <div className='w-full mt-3'>
          <Marquee />
        </div>
        <div className='max-w-4xl mx-auto flex flex-col gap-10 items-center text-center pt-9 md:pt-20 pb-12 md:pb-28'>
          <div className='w-full md:w-fit text-xl md:text-2xl font-bold  bg-base-mid px-8 py-3 text-white'>
            November 24<sup>nd</sup> - December 1<sup>st</sup>
          </div>
          <div className='text-xl lg:text-3xl text-white leading-normal px-6 lg:px-0'>
            Master more for less! Take advantage of 25% of all Courses and
            Certificate Programs (if applied by Dec 1). This is a great time to
            enroll in that program you&apos;ve been eyeing all year!
          </div>
          <div className='text-white text-xl lg:text-3xl'>
            Use Code{' '}
            <span className='text-brand-yellow-light font-bold'>
              BLACKFRIDAY23
            </span>{' '}
            at Checkout
          </div>
        </div>
        <div className='flex flex-col bg-base-mid w-full pb-3 max-w-[1400px] mx-auto lg:rounded-t-xl shadow-lg'>
          <div className='max-w-7xl w-full mx-auto flex flex-col gap-4 py-16 md:py-28'>
            <div className='flex flex-col gap-3 justify-center text-center text-white mb-9 px-6 lg:px-0'>
              <h2 className='w-full font-bold text-3xl lg:text-4xl text-white text-center'>
                <span className='text-brand-yellow-light'>Comprehensive</span>{' '}
                Certificate Programs
              </h2>
              <div className='text-lg max-w-3xl mx-auto text-center'>
                Crafted for students aiming to stand out, these extensive
                certificate programs provide structured or self-paced guidance
                from top industry experts.
              </div>
            </div>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-9 pb-6 max-w-6xl mx-auto'>
              <NewCouseCard
                title={'Certificate of Mastery in Packaging Management'}
                description={
                  'A 12-week, PhD-led program teaching you the latest technologies accelerating the packaging field in the space of packaging development, material procurement, and organizational management.'
                }
                background={
                  'https://packschool.s3.amazonaws.com/cmpmSeoimage.png'
                }
                link={'/certificate-of-mastery-in-packaging-management'}
                link_text={'Apply Now'}
                Icon={RocketLaunchIcon}
                callout={'Must Apply by Dec 1'}
                video={
                  'https://www.youtube.com/embed/N_hYWvQO0Sg?si=RWxTsfNhkRZ9PuuJ'
                }
                id={'5654edad-872a-421e-91d9-63da243cce44'}
              />
              <NewCouseCard
                title={'Certificate of Packaging Science'}
                description={
                  'This Boot Camp will serve as an introduction to the packaging industry and provide the fundamental knowledge necessary to get you up to speed.'
                }
                background={
                  'https://packschool.s3.amazonaws.com/cpsSeoImage.png'
                }
                link={'/certificate-of-packaging-science-application'}
                link_text={'Apply Now'}
                Icon={RocketLaunchIcon}
                callout={'Must Apply by Dec 1'}
                video={'https://www.youtube.com/watch?v=ynDhF_jYZn8'}
                id={'5654edad-872a-421e-91d9-63da243cce44'}
              />
              <NewCouseCard
                title={'Automotive Packaging Certificate'}
                description={
                  'The first and only 100% online academic program that will enable you to develop the professional skill set you need to be successful in the automotive packaging field.'
                }
                background={
                  'https://packschool.s3.amazonaws.com/apsSeoimage.png'
                }
                link={'#'}
                link_text={'Enroll Now'}
                Icon={RocketLaunchIcon}
                callout={'Must Enroll by Dec 1'}
                video={'https://www.youtube.com/watch?v=ynDhF_jYZn8'}
                id={'5654edad-872a-421e-91d9-63da243cce44'}
              />
            </div>
          </div>
        </div>
        <div className='bg-neutral-100 pt-12 md:pt-24 pb-12 mb-24'>
          <div className='flex flex-col gap-3 justify-center mb-9'>
            <h2 className='w-full font-bold text-3xl lg:text-4xl px-6 lg:px-0 text-center'>
              <span className='text-clemson'>Industry Leading</span> Courses
            </h2>
            <div className='text-lg max-w-3xl mx-auto text-center'>
              Unparalleled in quality, these courses are meticulously designed
              by subject matter experts at the forefront of the industry.
            </div>
            <Suspense>
              <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-9 max-w-6xl mx-auto mt-9'>
                {allCourses &&
                  initCourses
                    .sort((a, b) => b.clicks - a.clicks)
                    .map((link) => (
                      <NewCouseCard
                        key={link.id}
                        title={link.title}
                        description={link.subheadline}
                        background={link.seoImage}
                        link={link.link}
                        link_text={'Select Course'}
                        Icon={SparklesIcon}
                        video={link.preview}
                        courseId={link.id}
                        targetedId={link.targetedId}
                        tracked={true}
                        clicks={link.clicks}
                      />
                    ))}
              </div>
            </Suspense>
            <div className='w-full flex justify-center items-center mt-12'>
              <div className='bg-clemson hover:bg-clemson-dark text-lg font-bold text-white px-6 py-3 rounded-lg shadow'>
                <Link href={'/all_courses'} passHref>
                  <a>View All Courses</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className='h-[1px] w-full rounded-b-xl mb-16'></div>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const res = await API.graphql({
    query: getCustomer,
    variables: { id: '5654edad-872a-421e-91d9-63da243cce44' },
  });
  const customer = res.data.getCustomer;

  return {
    props: { customer },
  };
}

export default Page;
