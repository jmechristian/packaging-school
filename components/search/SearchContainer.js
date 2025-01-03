import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { useRouter } from 'next/router';
import '@algolia/autocomplete-theme-classic';
import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches';
import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions';
import {
  ArrowLeftOnRectangleIcon,
  FaceSmileIcon,
  RocketLaunchIcon,
  AcademicCapIcon,
  ScaleIcon,
} from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';
import { closeSearch } from '../../features/navigation/navigationSlice';
import CertIcon from '../icons/CertIcon';
import CourseIcon from '../icons/CourseIcon';
import WorkshopIcon from '../icons/WorkshopIcon';
import Link from 'next/link';
import {
  Hits,
  InfiniteHits,
  Index,
  InstantSearch,
  SearchBox,
  Highlight,
  Configure,
} from 'react-instantsearch-hooks-web';
import LotmIcon from '../icons/LotmIcon';

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY
);

export function ProductItem({ hit }) {
  const dispatch = useDispatch();
  return (
    (<div className='flex justify-between items-center w-full'>
      <Link
        href={`/articles/${hit.slug}`}
        passHref
        className='aa-ItemLink hover:bg-slate-700 cursor-pointer w-full'
        onClick={() => dispatch(closeSearch())}>

        <div className='font-greycliff font-semibold leading-snug  dark:text-white w-full'>
          <Highlight hit={hit} attribute='title' />
        </div>

      </Link>
    </div>)
  );
}

export function CertItem({ hit }) {
  return (
    <a
      href={hit.slug}
      className='w-full !grid group cursor-pointer bg-white dark:bg-black transition-all ease-in hover:bg-base-light/50 rounded-xl border border-neutral-400 dark:border-neutral-600 shadow hover:shadow-xl overflow-hidden'
    >
      <div className='w-full !flex !flex-col'>
        <div className='w-full !flex items-center gap-3 md:gap-5 border-b border-b-neutral-400 md:border-0'>
          <div
            className='aspect-[1/1] md:!aspect-[3/5] w-full !max-w-[90px] md:!max-w-[120px] md:!max-h-[120px] bg-black bg-cover bg-center group-hover:scale-110  transition-all ease-in '
            style={{ backgroundImage: `url(${hit.seoImage})` }}
          ></div>
          <div className='flex flex-col md:flex-row !h-[90px] md:!h-[120px] py-1.5 justify-between items-center w-full'>
            <div className='flex flex-col gap-2 w-full'>
              <div className='font-greycliff font-semibold leading-tight lg:text-lg dark:text-white pr-3'>
                <Highlight hit={hit} attribute='title' />
              </div>
              <div className='!aa-ItemTitle text-xs leading-snug dark:text-white/60 max-w-md hidden md:block'>
                <Highlight hit={hit} attribute='subheadline' />
              </div>
            </div>
            <div className='!flex md:!flex-col md:!items-center justify-end gap-1.5 pr-2 w-full md:w-fit'>
              {/* <div className='w-8 h-8 rounded-full bg-base-mid flex items-center justify-center shadow border border-0.5 border-black/50'>
                <FaceSmileIcon className='w-5 h-5 stroke-white' />
              </div>
              <div className='w-8 h-8 rounded-full bg-clemson flex items-center justify-center shadow border border-0.5 border-black/50'>
                <RocketLaunchIcon className='w-5 h-5 stroke-white' />
              </div> */}
            </div>
          </div>
        </div>
        {/* HIDDEN MD */}
        <div className='w-full !flex !flex-col h-full px-3 py-4 bg-neutral-100 dark:bg-black md:!hidden'>
          <div className='font-greycliff font-semibold leading-snug lg:text-lg dark:text-white hidden'>
            <Highlight hit={hit} attribute='title' />
          </div>
          <div className='!aa-ItemTitle text-xs leading-snug dark:text-white/60'>
            <Highlight hit={hit} attribute='subheadline' />
          </div>
        </div>
      </div>
    </a>
  );
}

export function CourseItem({ hit }) {
  const dispatch = useDispatch();

  return (
    (<Link
      passHref
      href={hit.altLink ? hit.altLink : `/courses/${hit.slug}`}
      className='w-full grid group cursor-pointer bg-white dark:bg-black transition-all ease-in hover:bg-base-light/50 rounded-xl border border-neutral-400 dark:border-neutral-600 shadow hover:shadow-xl overflow-hidden'
      onClick={() => dispatch(closeSearch())}>

      <div className='w-full flex flex-col lg:!h-[120px]'>
        <div className='w-full flex items-center gap-3 md:gap-5 border-b border-b-neutral-400 md:border-0'>
          <div
            className='aspect-[1/1] md:!aspect-[3/5] w-full !max-w-[100px] md:!max-w-[120px] md:!max-h-[120px] bg-black bg-cover bg-center group-hover:scale-110  transition-all ease-in '
            style={{ backgroundImage: `url(${hit.seoImage})` }}
          ></div>
          <div className='flex flex-col md:flex-row h-[100px] md:h-[120px] py-1.5 justify-between items-center w-full'>
            <div className='flex flex-col gap-1 w-full'>
              <div className='font-greycliff font-semibold leading-tight text-sm lg:text-lg dark:text-white pr-3'>
                <Highlight hit={hit} attribute='title' />
              </div>
              <div className='aa-ItemTitle text-xs leading-snug dark:text-white/60 max-w-lg hidden md:block'>
                <Highlight hit={hit} attribute='subheadline' />
              </div>
            </div>
            <div className='flex items-end flex-col gap-1 pr-2'>
              {/* <div className='w-8 h-8 rounded-full bg-base-mid flex items-center justify-center shadow border border-0.5 border-black/50'>
                <FaceSmileIcon className='w-5 h-5 stroke-white' />
              </div>
              <div className='w-8 h-8 rounded-full bg-clemson flex items-center justify-center shadow border border-0.5 border-black/50'>
                <RocketLaunchIcon className='w-5 h-5 stroke-white' />
              </div> */}
              {/* <div className='w-8 h-8 rounded-full bg-brand-red flex items-center justify-center shadow border border-0.5 border-black/50'>
                <AcademicCapIcon className='w-5 h-5 stroke-white' />
              </div>
              <div className='w-8 h-8 rounded-full bg-green-600 flex items-center justify-center shadow border border-0.5 border-black/50'>
                <ScaleIcon className='w-5 h-5 stroke-white' />
              </div> */}
            </div>
          </div>
        </div>
        {/* HIDDEN MD */}
        <div className='w-full flex flex-col px-3 py-4 bg-neutral-100 dark:bg-black md:hidden'>
          <div className='font-greycliff font-semibold leading-snug lg:text-lg dark:text-white hidden'>
            <Highlight hit={hit} attribute='title' />
          </div>
          <div className='aa-ItemTitle text-xs leading-snug dark:text-white/60'>
            <Highlight hit={hit} attribute='subheadline' />
          </div>
        </div>
      </div>

    </Link>)
  );
}

export function LOTMItem({ hit }) {
  const dispatch = useDispatch();

  return (
    (<Link
      passHref
      href={hit.type === 'INDEX' ? `/${hit.slug}` : `/lessons/${hit.slug}`}
      className='w-full grid group cursor-pointer bg-white dark:bg-black transition-all ease-in hover:bg-base-light/50 rounded-xl border border-neutral-400 dark:border-neutral-600 shadow hover:shadow-xl overflow-hidden'
      onClick={() => dispatch(closeSearch())}>

      <div className='w-full flex flex-col lg:!h-[120px]'>
        <div className='w-full flex items-center gap-3 md:gap-5 border-b border-b-neutral-400 md:border-0'>
          <div
            className='aspect-[1/1] md:!aspect-[3/5] w-full !max-w-[90px] md:!max-w-[120px] md:!max-h-[120px] bg-black bg-cover bg-center group-hover:scale-110  transition-all ease-in '
            style={{
              backgroundImage: `url(${
                hit.screengrab ? hit.screengrab : hit.seoImage
              })`,
            }}
          ></div>
          <div className='flex flex-col md:flex-row h-[90px] md:h-[120px] py-1.5 justify-between items-center w-full'>
            <div className='flex flex-col gap-2 w-full'>
              <div className='font-greycliff font-semibold leading-tight lg:text-lg dark:text-white pr-3'>
                <Highlight hit={hit} attribute='title' />
              </div>
              <div className='aa-ItemTitle text-xs leading-snug dark:text-white/60 max-w-lg hidden md:block line-clamp-3'>
                <Highlight
                  hit={hit}
                  attribute='subhead'
                  classNames={{ root: 'line-clamp-3' }}
                />
              </div>
            </div>
          </div>
        </div>
        {/* HIDDEN MD */}
        <div className='w-full flex flex-col px-3 py-4 bg-neutral-100 dark:bg-black md:hidden'>
          <div className='font-greycliff font-semibold leading-snug lg:text-lg dark:text-white hidden'>
            <Highlight hit={hit} attribute='title' />
          </div>
          <div className='aa-ItemTitle text-xs leading-snug dark:text-white/60 line-clamp-3'>
            <Highlight hit={hit} attribute='subhead' />
          </div>
        </div>
      </div>

    </Link>)
  );
}

const SearchContainer = () => {
  const dispatch = useDispatch();
  const router = useRouter();

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
    {
      value: 'packaging solution',
    },
    {
      value: 'design a box',
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
        <CertIcon className='w-9 h-9 fill-transparent stroke-slate-400 stroke-2' />
      ),
    },
    {
      title: 'Automotive Packaging Certificate',
      subtitle:
        'Learn the unique landscape of automotive packaging - from returnable packaging systems through expendable case studies and applications, supplier databases, transportation, and unique SME feedback, there is no other program that provides this type of content.',
      link: '/certifications/get-to-know-apc',
      type: 'CERTIFICATE',
      icon: (
        <CertIcon className='w-9 h-9 fill-transparent stroke-slate-400 stroke-2' />
      ),
    },
    {
      title: 'Packaging Foundations',
      subtitle:
        'An essential introduction to the art, science, and business of packaging. After taking this course, you will have the thought process required of a successful stakeholder in the packaging development process.',
      link: '/courses/packaging-foundations',
      type: 'COURSE',
      icon: (
        <CourseIcon className='w-9 h-9 fill-transparent stroke-slate-400 stroke-2' />
      ),
    },
    {
      title: 'Pack Design Workshop',
      subtitle:
        'Master the fundamentals of packaging design in this immersive, online workshop. Work through the design process from ideation to building your own digital prototypes.',
      link: 'https://library.packagingschool.com/packdesign-workshop',
      type: 'WORKSHOP',
      icon: (
        <WorkshopIcon className='w-9 h-9 fill-transparent stroke-slate-400 stroke-2' />
      ),
    },
  ];

  const recentSearchesPlugin = createLocalStorageRecentSearchesPlugin({
    key: 'RECENT_SEARCH',
    limit: 5,
  });

  const querySuggestionsPlugin = createQuerySuggestionsPlugin({
    searchClient,
    indexName: 'COURSES_query_suggestions',
    getSearchParams() {
      return {
        hitsPerPage: 12,
      };
    },
  });

  return (
    <div className='fixed inset-0 bg-black/60 dark:bg-white/30 backdrop-blur-sm z-[110]'>
      <div
        className='absolute inset-0'
        onClick={() => dispatch(closeSearch())}
      ></div>
      {/* <div
        className='absolute right-6 top-6 cursor-pointer z-[80]'
        onClick={() => dispatch(closeSearch())}
      >
        <XMarkIcon className='md:w-10 md:h-10 h-6 w-6 text-white' />
      </div> */}
      <div className='dark:bg-black fixed max-w-7xl z-[115] max-h-[92vh] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 max-auto bg-base-light w-full h-full lg:rounded-xl lg:max-w-7xl lg:mx-auto  grid lg:grid-cols-3 gap-6 lg:gap-8 p-3 pt-4 md:p-9'>
        <div
          className='z-10 col-span-1 w-full lg:!col-span-2 p-3 lg:p-6 flex flex-col overflow-y-scroll relative bg-white dark:bg-dark-mid rounded-xl shadow lg:shadow-xl'
          id='scrollers'
        >
          <InstantSearch
            searchClient={searchClient}
            indexName='COURSES'
            insights={true}
          >
            <div className='w-full flex flex-col gap-6 mt-3'>
              <div className='flex flex-1 w-full items-center gap-1.5'>
                <SearchBox
                  classNames={{
                    root: 'w-full',
                    input:
                      'w-full md:text-lg font-medium md:py-4 md:px-5 rounded shadow-md border-neutral-300 placeholder:text-neutral-400 dark:bg-neutral-600',
                    submitIcon: 'hidden',
                    resetIcon: 'hidden',
                  }}
                  placeholder='Search Certificates, Courses, and Lessons'
                />
                <div
                  className='w-9 h-full flex items-center justify-center rounded-xl cursor-pointer'
                  onClick={() => dispatch(closeSearch())}
                >
                  <div>
                    <ArrowLeftOnRectangleIcon className='w-7 h-7 stroke-black dark:stroke-white' />
                  </div>
                </div>
              </div>

              <div className='flex flex-col gap-6'>
                <div className='flex flex-col gap-4'>
                  <Index indexName='CERTIFICATES'>
                    <div className='w-full bg-black  text-white text-sm font-bold font-greycliff px-3 lg:px-6 py-1.5 leading-snug'>
                      CERTIFICATES
                    </div>
                    <Hits
                      hitComponent={CertItem}
                      classNames={{ list: 'flex flex-col gap-3 justify-start' }}
                    />
                  </Index>
                </div>

                <Index indexName='COURSES'>
                  <Configure hitsPerPage={5} />
                  <div className='w-full bg-black text-white text-sm font-bold font-greycliff px-6 py-1.5'>
                    COURSES
                  </div>
                  <InfiniteHits
                    hitComponent={CourseItem}
                    showPrevious={false}
                    classNames={{
                      list: 'flex flex-col gap-3',
                      loadMore:
                        'rounded p-2 bg-base-mid text-white border border-black font-bold text-sm w-full mt-4',
                    }}
                  />
                  {/* <InfiniteHits
                    hitComponent={CourseItem}
                    showPrevious={false}
                    classNames={{
                      list: 'flex flex-col gap-4',
                      loadMore:
                        'rounded-xl px-3 py-2 bg-clemson text-white font-bold text-sm w-full mt-4',
                    }}
                  /> */}
                </Index>
                <Index indexName='LESSONS'>
                  <Configure hitsPerPage={5} filters='status:PUBLISHED' />
                  <div className='w-full bg-black text-white text-sm font-bold font-greycliff px-4 py-1.5'>
                    LESSONS
                  </div>
                  <InfiniteHits
                    hitComponent={LOTMItem}
                    showPrevious={false}
                    classNames={{
                      list: 'flex flex-col gap-3',
                      loadMore:
                        'rounded p-2 bg-base-mid text-white border border-black font-bold text-sm w-full mt-4',
                    }}
                  />
                </Index>
              </div>

              {/* <Index indexName='LIBRARY'>
                <div className='w-full bg-black text-white text-sm font-bold font-greycliff px-6 py-1.5'>
                  LIBRARY
                </div>
                <Hits
                  hitComponent={ProductItem}
                  classNames={{ list: 'flex flex-col gap-6 w-full' }}
                />
              </Index> */}
            </div>
          </InstantSearch>
        </div>
        <div className='hidden lg:block lg:col-span-1'>
          <div className='flex flex-col gap-9  dark:bg-black/70 bg-slate-100 rounded-xl p-5'>
            <div className='row-span-2 flex flex-col gap-3'>
              <div className='font-greycliff font-semibold text-slate-500 dark:text-clemson text-lg'>
                Popular Content
              </div>
              <hr />
              <div className='flex flex-col gap-6 w-full mt-3'>
                {cirriculum.map((item) => (
                  <div
                    className='flex gap-3 items-start cursor-pointer'
                    key={item.link}
                    onClick={() => {
                      router.push(item.link);
                      dispatch(closeSearch());
                    }}
                  >
                    <div className='mt-1'>
                      {/* <div className='w-10 h-10 auto bg-slate-400' /> */}
                      {item.icon}
                    </div>
                    <div className='flex flex-col gap-1'>
                      <div className='font-semibold font-greycliff leading-tight dark:text-white'>
                        {item.title}
                      </div>
                      <div className='text-sm line-clamp-2 text-slate-600 dark:text-white/40'>
                        {item.subtitle}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* <div className='px-6 flex flex-col gap-3 overflow-hidden'>
              <div className='font-greycliff font-semibold text-slate-500 dark:text-clemson text-lg'>
                Popular Searches
              </div>
              <hr />
              <div className='flex flex-wrap items-center gap-3 mt-3'>
                {tags.map((tag) => (
                  <div
                    className='flex items-center gap-1 bg-slate-200 dark:bg-slate-500 rounded-lg px-3 py-1.5'
                    key={tag.value}
                    onClick={() => queryHook(tag.value)}
                  >
                    <div>
                      <MagnifyingGlassIcon className='w-4 h-4 text-slate-700 dark:text-white' />
                    </div>
                    <div className='text-sm'>{tag.value}</div>
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchContainer;
