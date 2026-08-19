import React from 'react';
import FadeIn from '../helpers/FadeIn';
import GlobalMaterialsIcon from '../components/icons/GlobalMaterialsIcon';
import LotmIcon from '../components/icons/LotmIcon';
import CMPMIcon from '../components/icons/CMPMIcon';
import algoliasearch from 'algoliasearch';
import { getAlgoliaResults } from '@algolia/autocomplete-js';
import { Autocomplete } from '../components/search/Autocomplete';
import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches';
import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions';
import { useSelector } from 'react-redux';
import SavedContentCard from '../components/shared/SavedContentCard';
import SavedArticleCard from '../components/shared/SavedArticleCard';
import { useRouter } from 'next/router';
import GradientCTA from '../components/GradientCTA';
import { ArrowSmallRightIcon } from '@heroicons/react/24/outline';
import Meta from '../components/shared/Meta';
import {
  buildHomeJsonLd,
  buildBreadcrumbJsonLd,
} from '../libs/seo/organizationJsonLd';

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY,
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
        href={`https://library.packagingschool.com/blog/${hit.slug}`}
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
      href={`/lessons/${hit.slug}`}
      className='aa-ItemLink hover:bg-slate-100 cursor-pointer'
    >
      <div className='grid grid-cols-5 w-full'>
        <div className='px-3 py-1.5 col-span-5'>
          <div className='flex gap-3 w-full'>
            <div>
              <LotmIcon style='w-12 h-12 fill-slate-900' />
            </div>
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

const Page = () => {
  const { allLessons, allCourses, allArticles } = useSelector(
    (state) => state.course_filter,
  );

  const router = useRouter();

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://packagingschool.com';
  const { organization, website } = buildHomeJsonLd(siteUrl);
  const breadcrumb = buildBreadcrumbJsonLd(
    [{ name: 'Library', path: '/library' }],
    siteUrl,
  );

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
    <>
      <Meta
        title={'Packaging School Library'}
        description={
          'Explore an expansive collection of courses and articles covering a wide array of packaging design, management, and regulations topics.'
        }
        image={'https://packschool.s3.us-east-1.amazonaws.com/default-seo.webp'}
        url='/library'
        structuredData={[organization, website, breadcrumb]}
      />
      <div className='flex flex-col gap-6'>
        <FadeIn>
          <div className='container-7xl flex justify-center items-center lg:text-center flex-col gap-6 py-16 lg:py-24'>
            <div className='flex flex-col gap-2'>
              <div className='uppercase tracking-widest font-bold text-lg text-base-mid md:text-center'>
                Welcome To The
              </div>
              <div className='text-4xl xl:text-6xl'>
                <h1 className='font-bold'>Packaging School Library</h1>
              </div>
            </div>
            <div className='text-gray-600 text-lg xl:text-xl max-w-4xl md:text-center'>
              Here you will find a robust collection of information from the
              packaging industry&apos;s leading educator. Be sure to check back
              frequently as new content and features are added.
            </div>
            <div className='w-full flex flex-col gap-6 lg:max-w-4xl lg:mx-auto pt-12 lg:pt-6'>
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
                          return (
                            <CourseItem hit={item} components={components} />
                          );
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
                          return (
                            <CertItem hit={item} components={components} />
                          );
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
                          return (
                            <LOTMItem hit={item} components={components} />
                          );
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
                          return (
                            <ProductItem hit={item} components={components} />
                          );
                        },
                      },
                    },
                  ];
                }}
              />
            </div>
          </div>
        </FadeIn>
        <FadeIn>
          <div className='container-7xl flex flex-col gap-6 pb-24'>
            <div className='w-full flex flex-col gap-6 lg:grid lg:grid-cols-6 lg:gap-16'>
              <div className='flex flex-col lg:col-span-4'>
                <div className='font-semibold text-lg'>Latest Lessons</div>
                <div className='border-t border-t-gray-900 mt-1 py-6'>
                  <div className='flex flex-col gap-4 md:grid md:grid-cols-2 xl:grid-cols-3'>
                    {allLessons &&
                      allLessons
                        .slice(0, 6)
                        .map((les) => (
                          <SavedContentCard
                            key={les.id}
                            id={les.id}
                            title={les.title}
                            slug={`/lessons/${les.slug}`}
                            desc={les.subhead}
                          />
                        ))}
                  </div>
                </div>
              </div>
              <div className='flex flex-col lg:col-span-2'>
                <div className='font-semibold text-lg'>Latest Articles</div>
                <div className='border-t border-t-gray-900 mt-1 py-6'>
                  <div className='flex flex-col gap-3 w-full'>
                    {allArticles &&
                      allArticles.slice(0, 10).map((art) => (
                        <div
                          key={art.id}
                          className='flex justify-between gap-2 cursor-pointer'
                          onClick={() => router.push(`/articles/${art.slug}`)}
                        >
                          <div className='font-semibold text-gray-800 text-lg w-fit'>
                            {art.title}
                          </div>
                          <div className='w-6 h-6 bg-gray-900 flex justify-center items-center rounded-full cursor-pointer'>
                            <ArrowSmallRightIcon className='w-4 h-4 stroke-white' />
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
        <GradientCTA
          headline='Ready to Elevate Your Career?'
          subheadline='Try a demo, risk-free.'
          buttonText='Get Started For Free'
          secondaryButtonText='Need More Info?'
          buttonLink={'/all_courses'}
        />
      </div>
    </>
  );
};

export default Page;
