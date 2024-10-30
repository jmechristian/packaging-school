import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import algoliasearch from 'algoliasearch';
import { getAlgoliaResults } from '@algolia/autocomplete-js';
import { Autocomplete } from '../search/Autocomplete';
import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches';
import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions';
import CMPMIcon from '../icons/CMPMIcon';
import { useRouter } from 'next/router';
import GlobalMaterialsIcon from '../icons/GlobalMaterialsIcon';
import LotmIcon from '../icons/LotmIcon';

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY
);

export function CertItem({ hit, components }) {
  const setBackground = () => {
    switch (hit.title) {
      case 'Certificate of Mastery in Packaging Management':
        return 'bg-gradient-to-br from-base-brand to-gray-700';
      case 'Certificate of Packaging Science':
        return 'bg-gradient-to-br from-base-dark to-gray-900';
      case 'Automotive Packaging Certificate':
        return 'bg-gradient-to-br from-clemson to-orange-800';
      default:
        return 'bg-gradient-to-br from-base-brand to-gray-900';
    }
  };

  return (
    <a href={hit.slug} className='aa-ItemLink hover:bg-gray-100 cursor-pointer'>
      <div className='grid grid-cols-5 w-full'>
        <div className='lg:px-3 py-1.5 col-span-5'>
          <div className='flex gap-3 w-full'>
            <div>
              <CMPMIcon scale={12} background={setBackground()} />
            </div>
            <div className='flex flex-col '>
              <div className='font-greycliff font-semibold leading-snug dark:text-gray-700'>
                <components.Highlight hit={hit} attribute='title' />
              </div>
              <div className='aa-ItemTitle text-sm line-clamp-2  text-gray-600 dark:text-gray-700'>
                <components.Highlight hit={hit} attribute='subheadline' />
              </div>
              <div className='aa-ItemTitle line-clamp-2   text-gray-600 dark:text-gray-700'>
                <components.Highlight hit={hit} attribute='subhead' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

export function ProductItem({ hit, components }) {
  return (
    <div className='flex justify-between items-center w-full pl-6'>
      <a
        href={`https://www.packagingschool.com/articles/${hit.slug}`}
        className='aa-ItemLink hover:bg-gray-100 cursor-pointer w-full'
        target='_blank'
        rel='noReferrer'
      >
        <div className='font-greycliff font-semibold leading-snug lg:text-lg dark:text-gray-700 w-full'>
          <components.Highlight hit={hit} attribute='title' />
        </div>
      </a>
    </div>
  );
}

export function CourseItem({ hit, components }) {
  const setBackground = () => {
    switch (hit.title) {
      case 'Certificate of Mastery in Packaging Management':
        return 'bg-gradient-to-br from-base-brand to-gray-700';
      case 'Certificate of Packaging Science':
        return 'bg-gradient-to-br from-base-dark to-slate-900';
      case 'Automotive Packaging Certificate':
        return 'bg-gradient-to-br from-clemson to-orange-800';
      default:
        return 'bg-gradient-to-br from-green-600 to-green-900';
    }
  };

  return (
    <a
      href={`/courses/${hit.slug}`}
      className='aa-ItemLink hover:bg-slate-100 cursor-pointer'
    >
      <div className='grid grid-cols-5 w-full'>
        <div className='px-3 py-1.5 col-span-5'>
          <div className='flex gap-3 w-full'>
            <div>
              <GlobalMaterialsIcon scale={12} background={setBackground()} />
            </div>
            <div className='flex flex-col '>
              <div className='font-greycliff font-semibold leading-snug'>
                <components.Highlight hit={hit} attribute='title' />
              </div>
              <div className='aa-ItemTitle line-clamp-2 text-sm text-slate-600 dark:text-slate-700'>
                <components.Highlight hit={hit} attribute='subheadline' />
              </div>
              <div className='aa-ItemTitle line-clamp-2  text-sm md:text-base text-slate-600 dark:text-slate-700'>
                <components.Highlight hit={hit} attribute='subhead' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

export function LOTMItem({ hit, components }) {
  const setBackground = () => {
    switch (hit.title) {
      case 'Certificate of Mastery in Packaging Management':
        return 'bg-gradient-to-br from-base-brand to-slate-700';
      case 'Certificate of Packaging Science':
        return 'bg-gradient-to-br from-base-dark to-slate-900';
      case 'Automotive Packaging Certificate':
        return 'bg-gradient-to-br from-clemson to-orange-800';
      default:
        return 'bg-gradient-to-br from-red-500 to-red-900';
    }
  };

  return (
    <a
      href={hit.type === 'INDEX' ? `/${hit.slug}` : `/lessons/${hit.slug}`}
      className='aa-ItemLink hover:bg-slate-100 cursor-pointer'
    >
      <div className='grid grid-cols-5 w-full'>
        <div className='px-3 py-1.5 col-span-5'>
          <div className='flex gap-3 w-full'>
            {hit.type === 'LOTM' && (
              <div>
                <LotmIcon style='w-12 h-12 fill-slate-900' />
              </div>
            )}

            <div className='flex flex-col '>
              <div className='font-greycliff font-semibold leading-snug '>
                <components.Highlight hit={hit} attribute='title' />
              </div>
              <div className='aa-ItemTitle line-clamp-2 text-sm text-gray-600 '>
                <components.Highlight hit={hit} attribute='subheadline' />
              </div>
              <div className='aa-ItemTitle line-clamp-2 text-sm text-gray-600 '>
                <components.Highlight hit={hit} attribute='subhead' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

const HomeHero = () => {
  const router = useRouter();

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
    transformSource({ source }) {
      return {
        ...source,
        onSelect({ setIsOpen }) {
          setIsOpen(true);
        },
      };
    },
  });

  return (
    <div className='flex flex-col lg:flex-col-reverse gap-12 container__inner '>
      <div className='w-full flex flex-col gap-4 lg:max-w-4xl lg:mx-auto pt-12 lg:pt-0'>
        <Autocomplete
          openOnFocus={true}
          // onStateChange={(state) => console.log(state)}
          plugins={[recentSearchesPlugin, querySuggestionsPlugin]}
          elements={{ recentSearchesPlugin, querySuggestionsPlugin }}
          getSources={({ query }) => {
            return [
              {
                sourceId: 'COURSES',
                getItems() {
                  return getAlgoliaResults({
                    searchClient,
                    queries: [
                      {
                        indexName: 'COURSES',
                        query,
                      },
                    ],
                  });
                },
                templates: {
                  item({ item, components }) {
                    return <CourseItem hit={item} components={components} />;
                  },
                },
              },
              {
                sourceId: 'CERTIFICATES',
                getItems() {
                  return getAlgoliaResults({
                    searchClient,
                    queries: [
                      {
                        indexName: 'CERTIFICATES',
                        query,
                      },
                    ],
                  });
                },
                templates: {
                  item({ item, components }) {
                    return <CertItem hit={item} components={components} />;
                  },
                },
              },
              {
                sourceId: 'LESSONS',
                getItems() {
                  return getAlgoliaResults({
                    searchClient,
                    queries: [
                      {
                        indexName: 'LESSONS',
                        query,
                      },
                    ],
                  });
                },
                templates: {
                  item({ item, components }) {
                    return <LOTMItem hit={item} components={components} />;
                  },
                },
              },
              {
                sourceId: 'LIBRARY',
                getItems() {
                  return getAlgoliaResults({
                    searchClient,
                    queries: [
                      {
                        indexName: 'LIBRARY',
                        query,
                      },
                    ],
                  });
                },
                templates: {
                  item({ item, components }) {
                    return <ProductItem hit={item} components={components} />;
                  },
                },
              },
            ];
          }}
        />
      </div>
      <div className='flex flex-col gap-9 md:gap-12 lg:max-w-5xl lg:mx-auto lg:text-center lg:pt-24'>
        <div className='w-full flex flex-col gap-1 items-start md:items-center h-44'>
          <div className='font-sans font-bold text-5xl md:text-6xl lg:text-8xl tracking-tight'>
            Become a
          </div>
          <TypeAnimation
            sequence={[
              'Packaging Consultant', // Types 'One'
              1000, // Waits 1s
              'Packaging Engineer', // Deletes 'One' and types 'Two'
              1000, // Waits 2s
              'Sustainability Expert', // Types 'Three' without deleting 'Two',
              1000,
              'Logistics Expert',
              1000,
              'Startup Champion',
              1000,
              'Knowledge Leader',
              1000,
              () => {},
            ]}
            wrapper='span'
            cursor={true}
            repeat={Infinity}
            className='font-sans tracking-tight text-5xl font-bold md:text-6xl lg:text-8xl'
          />
        </div>
        <div className='text-gray-600 text-lg md:text-xl lg:text-2xl lg:leading-normal font-greycliff font-medium'>
          Join the tens of thousands of people across the globe that have
          leveraged the expert-led curriculum of the Packaging School to stand
          out amongst their peers, accelerate their teams, and develop
          cost-efficient, packaging solutions for their companies and startups.
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
