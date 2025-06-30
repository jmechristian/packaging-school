import { autocomplete } from '@algolia/autocomplete-js';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import React, { createElement, Fragment, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import CertIcon from '../icons/CertIcon';
import CourseIcon from '../icons/CourseIcon';
import WorkshopIcon from '../icons/WorkshopIcon';
import { useRouter } from 'next/router';

const tags = [
  {
    value: 'sustainability',
  },
  {
    value: 'plastic',
  },
  {
    value: 'cardboard',
  },
  {
    value: 'prototyping',
  },
  {
    value: 'packaging design',
  },
];

const cirriculum = [
  {
    title: 'Certificate of Certificate of Mastery in Packaging Management',
    subtitle:
      "Conducted in collaboration with Clemson University's Center for Corporate Learning, this 12-week, PhD-Led certificate program is perfect for ambitious professionals seeking to advance their career in the packaging industry and for companies actively seeking future leaders and rising stars to lead their teams.",
    link: '/certifications/get-to-know-cmpm',
    type: 'CERTIFICATE',
    icon: (
      <CertIcon className='w-9 h-9 fill-transparent stroke-gray-400 stroke-2' />
    ),
  },
  {
    title: 'Automotive Packaging Certificate',
    subtitle:
      'Learn the unique landscape of automotive packaging - from returnable packaging systems through expendable case studies and applications, supplier databases, transportation, and unique SME feedback, there is no other program that provides this type of content.',
    link: '/certifications/get-to-know-apc',
    type: 'CERTIFICATE',
    icon: (
      <CertIcon className='w-9 h-9 fill-transparent stroke-gray-400 stroke-2' />
    ),
  },
  {
    title: 'Packaging Foundations',
    subtitle:
      'An essential introduction to the art, science, and business of packaging. After taking this course, you will have the thought process required of a successful stakeholder in the packaging development process.',
    link: '/courses/packaging-foundations',
    type: 'COURSE',
    icon: (
      <CourseIcon className='w-9 h-9 fill-transparent stroke-gray-400 stroke-2' />
    ),
  },
  {
    title: 'Pack Design Workshop',
    subtitle:
      'Master the fundamentals of packaging design in this immersive, online workshop. Work through the design process from ideation to building your own digital prototypes.',
    link: 'https://library.packagingschool.com/packdesign-workshop',
    type: 'WORKSHOP',
    icon: (
      <WorkshopIcon className='w-9 h-9 fill-transparent stroke-gray-400 stroke-2' />
    ),
  },
];

export function Autocomplete(props) {
  const containerRef = useRef(null);
  const panelRootRef = useRef(null);
  const rootRef = useRef(null);

  const router = useRouter();

  const clear = () => {
    rootRef.current = root;

    panelRootRef.current?.unmount();
    panelRootRef.current = createRoot(root);
  };

  useEffect(() => {
    if (!containerRef.current) {
      return undefined;
    }

    const search = autocomplete({
      container: containerRef.current,
      placeholder: 'Search...',
      openOnFocus: true,
      classNames: {
        input: 'md:px-4 md:mx-4 text-gray-700 dark:text-gray-700 w-40',
      },
      insights: true,
      renderer: { createElement, Fragment, render: () => {} },
      render({ children, state, elements }, root) {
        if (!panelRootRef.current || rootRef.current !== root) {
          rootRef.current = root;

          panelRootRef.current?.unmount();
          panelRootRef.current = createRoot(root);
        }

        panelRootRef.current.render(
          <div className='flex flex-col lg:!grid lg:!grid-cols-2 bg-white text-slate-700 relative z-[1000]'>
            <div className='py-3'>
              {!state.query ? (
                elements.querySuggestionsPlugin
              ) : (
                <div className='flex flex-col gap-3 h-full max-h-[660px] overflow-y-scroll overflow-x-hidden'>
                  {elements.CERTIFICATES && (
                    <div className='flex flex-col gap-2'>
                      <div className='w-full bg-gray-200 py-1.5 px-3 text-gray-600 uppercase text-sm font-semibold'>
                        Certificates
                      </div>
                      <div>{elements.CERTIFICATES}</div>
                    </div>
                  )}
                  <div className='flex flex-col gap-2'>
                    <div className='w-full bg-slate-200 py-1.5 px-3 text-slate-600 uppercase text-sm font-semibold'>
                      Courses
                    </div>
                    <div>{elements.COURSES}</div>
                  </div>
                  {elements.LESSONS && (
                    <div className='flex flex-col gap-2'>
                      <div className='w-full bg-slate-200 py-1.5 px-3 text-slate-600 uppercase text-sm font-semibold'>
                        Learning of the Month
                      </div>
                      <div>{elements.LESSONS}</div>
                    </div>
                  )}
                  <div className='flex flex-col gap-2'>
                    <div className='w-full bg-slate-200 py-1.5 px-3 text-slate-600 uppercase text-sm font-semibold'>
                      Library
                    </div>
                    <div>{elements.LIBRARY}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      },
      ...props,
    });

    return () => {
      search.destroy();
    };
  }, [props]);

  return <div ref={containerRef} className='w-full flex items-center' />;
}
