import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
  HomeIcon,
  BookOpenIcon,
  AcademicCapIcon,
  MapIcon,
  ChatBubbleLeftRightIcon,
  CalendarDaysIcon,
} from '@heroicons/react/24/outline';
import Meta from '../components/shared/Meta';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import catAnimation from '/public/404-cat.json';

const ADVISOR_CALENDAR_URL = 'https://calendar.app.google/qUZMKuFbF7NhpxgL8';

const QUICK_LINKS = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Lessons', href: '/lessons', icon: BookOpenIcon },
  { name: 'Course Catalog', href: '/all_courses', icon: AcademicCapIcon },
  { name: 'Learning Paths', href: '/paths', icon: MapIcon },
  { name: 'Certifications', href: '/certifications', icon: AcademicCapIcon },
  { name: 'Contact', href: '/contact', icon: ChatBubbleLeftRightIcon },
];

export default function Custom404() {
  return (
    <>
      <Meta
        title='Packaging School | Not Found'
        description="Oops! The page you're looking for can't be found. Explore our site to find what you need or contact us for assistance."
        url='/404'
        image='https://packschool.s3.amazonaws.com/404-seoimage.webp'
      />
      <div className='w-full max-w-7xl mx-auto min-h-[70vh] flex flex-col lg:flex-row lg:min-h-0 py-20'>
        <div className='w-full lg:w-1/2 flex items-center py-12'>
          <div className='w-full max-w-xl aspect-square'>
            <Lottie
              animationData={catAnimation}
              loop={true}
              className='w-full h-full'
            />
          </div>
        </div>
        <div className='w-full lg:w-1/2 flex flex-col justify-center py-12 pl-6 lg:pl-12 lg:pr-16'>
          <div className='flex flex-col gap-6'>
            <div>
              <p className='uppercase tracking-widest text-sm font-semibold text-gray-500 dark:text-gray-400'>
                404 Page Not Found
              </p>
              <h1 className='mt-2 text-3xl lg:text-4xl xl:text-5xl font-bold font-greycliff text-gray-900 dark:text-white'>
                Looks like this page wandered off.
              </h1>
              <p className='mt-4 text-lg text-gray-600 dark:text-gray-400'>
                The link may be broken or the page may have moved. Here are some
                ways to get back on track:
              </p>
            </div>

            <div className='flex flex-col gap-4'>
              <h2 className='text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400'>
                Quick links
              </h2>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                {QUICK_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className='flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-clemson hover:bg-clemson/5 dark:hover:bg-clemson/10 transition-colors'
                  >
                    <link.icon className='w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0' />
                    <span className='font-medium text-gray-900 dark:text-white'>
                      {link.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className='mt-4 pt-6 border-t border-gray-200 dark:border-gray-700'>
              <a
                href={ADVISOR_CALENDAR_URL}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-3 px-5 py-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 hover:border-clemson hover:bg-clemson/5 dark:hover:bg-clemson/10 transition-colors group'
              >
                <CalendarDaysIcon className='w-6 h-6 text-clemson flex-shrink-0' />
                <div className='flex flex-col gap-0.5'>
                  <span className='font-semibold text-gray-900 dark:text-white group-hover:text-clemson transition-colors'>
                    Questions? Book a free 15-minute call with an Advisor
                  </span>
                  <span className='text-sm text-gray-500 dark:text-gray-400'>
                    Schedule a time that works for you
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
