import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import VideoPlayer from '../VideoPlayer';
import Link from 'next/link';

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
];

export default function SalesHeroVideo() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    (<div className='bg-white'>
      <div className='relative isolate'>
        <div className='py-24 sm:py-32 lg:pb-40'>
          <div className='mx-auto max-w-7xl px-6 lg:px-8'>
            <div className='mx-auto max-w-3xl text-center'>
              <img
                className='w-44 lg:w-60 h-auto mx-auto mb-12'
                src='https://packschool.s3.amazonaws.com/sandler_ps-logo.png'
                alt='Sandler Sales Training'
              />
              <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl font-greycliff'>
                Great sales people aren’t born. They’re trained.
              </h1>
              <p className='mt-6 text-lg leading-8 text-gray-600'>
                This introductory course is designed to give a complete overview
                of the Sandler Selling System concepts as they apply to
                packaging sales, along with actionable steps that you or your
                team can implement from the first day to immediately start to
                improve performance.
              </p>
              <div className='mt-10 flex items-center justify-center gap-x-6'>
                <Link
                  href='/sales-bootcamp-registration-page'
                  className='rounded-md bg-clemson px-3.5 py-2.5 font-greycliff font-semibold text-white shadow-sm hover:bg-clemson-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                  
                    Get started Today
                  
                </Link>
                <a
                  href='https://packschool.s3.amazonaws.com/Sales-Bootcamp-Program-Outline.pdf'
                  target='_blank'
                  rel='noreferrer'
                  className='font-semibold font-greycliff leading-6 text-gray-900'
                >
                  Download Program Outline <span aria-hidden='true'>→</span>
                </a>
              </div>
            </div>
            <div className='mt-16 flow-root sm:mt-24'>
              <div className='-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4'>
                <div className='aspect-[16/9]'>
                  <VideoPlayer
                    hideSupport={true}
                    videoEmbedLink={
                      'https://player.vimeo.com/video/451535827?h=27b06b5bf3&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className='absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]'
          aria-hidden='true'
        >
          <div
            className='relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]'
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>
    </div>)
  );
}
