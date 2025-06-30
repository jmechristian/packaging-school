import React, { useState, useRef, useEffect } from 'react';
import algoliasearch from 'algoliasearch';
import { getAlgoliaResults } from '@algolia/autocomplete-js';
import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches';
import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions';
import { autocomplete } from '@algolia/autocomplete-js';
import { createElement, Fragment } from 'react';
import { createRoot } from 'react-dom/client';
import GlobalMaterialsIcon from '../../../components/icons/GlobalMaterialsIcon';
import LotmIcon from '../../../components/icons/LotmIcon';
import CertIcon from '../../../components/icons/CertIcon';

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY
);

// Simple item components
const SearchItem = ({ hit, components, type, href }) => {
  const getIcon = () => {
    switch (type) {
      case 'course':
        return (
          <GlobalMaterialsIcon
            scale={8}
            background='bg-gradient-to-br from-green-600 to-green-900'
          />
        );
      case 'certificate':
        return (
          <CertIcon className='w-6 h-6 fill-transparent stroke-gray-400 stroke-2' />
        );
      case 'lesson':
        return <LotmIcon style='w-6 h-6 fill-slate-900' />;
      default:
        return null;
    }
  };

  return (
    <a
      href={href}
      className='aa-ItemLink block hover:bg-slate-50 dark:hover:bg-dark-light'
    >
      <div className='px-3 py-2 flex gap-3 items-center'>
        {getIcon()}
        <div className='flex-1 min-w-0'>
          <div className='font-semibold text-sm truncate'>
            <components.Highlight hit={hit} attribute='title' />
          </div>
          <div className='text-xs text-slate-600 dark:text-slate-400 truncate'>
            <components.Highlight hit={hit} attribute='subheadline' />
          </div>
        </div>
      </div>
    </a>
  );
};

export default function HeaderSearchAutocomplete() {
  const containerRef = useRef(null);
  const panelRootRef = useRef(null);
  const rootRef = useRef(null);

  const recentSearchesPlugin = createLocalStorageRecentSearchesPlugin({
    key: 'HEADER_RECENT_SEARCH',
    limit: 3,
  });

  const querySuggestionsPlugin = createQuerySuggestionsPlugin({
    searchClient,
    indexName: 'COURSES_query_suggestions',
    getSearchParams() {
      return { hitsPerPage: 3 };
    },
  });

  useEffect(() => {
    if (!containerRef.current) return;

    const search = autocomplete({
      container: containerRef.current,
      placeholder: 'Search...',
      openOnFocus: true,
      classNames: {
        input:
          'px-2 py-1.5 w-72 rounded-md border border-slate-300 dark:border-gray-700 bg-white dark:bg-dark-mid text-slate-700 dark:text-white/80 focus:ring-0 text-sm placeholder:text-sm',
        panel:
          'absolute top-full left-0 right-0 z-[9999] bg-white dark:bg-dark-mid border border-slate-300 dark:border-gray-700 rounded-md shadow-lg max-h-80 overflow-y-auto mt-1',
        item: '',
      },
      insights: true,
      renderer: { createElement, Fragment, render: () => {} },
      render({ state, elements }, root) {
        if (!panelRootRef.current || rootRef.current !== root) {
          rootRef.current = root;
          panelRootRef.current?.unmount();
          panelRootRef.current = createRoot(root);
        }

        const renderContent = () => {
          if (!state.query) {
            return (
              <div className='p-3'>
                <div className='text-xs font-semibold text-slate-500 mb-2'>
                  Recent Searches
                </div>
                {elements.recentSearchesPlugin}
              </div>
            );
          }

          const sections = [
            {
              key: 'CERTIFICATES',
              title: 'Certificates',
              type: 'certificate',
              href: (hit) => `/certifications/${hit.slug}`,
            },
            {
              key: 'COURSES',
              title: 'Courses',
              type: 'course',
              href: (hit) => `/courses/${hit.slug}`,
            },
            {
              key: 'LESSONS',
              title: 'Lessons',
              type: 'lesson',
              href: (hit) =>
                hit.type === 'INDEX' ? `/${hit.slug}` : `/lessons/${hit.slug}`,
            },
          ];

          return (
            <div className='py-2'>
              {sections.map(
                ({ key, title, type, href }) =>
                  elements[key] && (
                    <div key={key}>
                      <div className='px-3 py-1 bg-slate-100 dark:bg-dark-light text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase'>
                        {title}
                      </div>
                      <div>
                        {React.Children.map(elements[key], (child) => {
                          if (React.isValidElement(child)) {
                            return React.cloneElement(child, {
                              ...child.props,
                              type,
                              href: href(child.props.hit),
                            });
                          }
                          return child;
                        })}
                      </div>
                    </div>
                  )
              )}
            </div>
          );
        };

        panelRootRef.current.render(renderContent());
      },
      plugins: [recentSearchesPlugin, querySuggestionsPlugin],
      elements: { recentSearchesPlugin, querySuggestionsPlugin },
      getSources({ query }) {
        return [
          {
            sourceId: 'COURSES',
            getItems() {
              return getAlgoliaResults({
                searchClient,
                queries: [{ indexName: 'COURSES', query }],
              });
            },
            templates: {
              item({ item, components }) {
                return (
                  <SearchItem
                    hit={item}
                    components={components}
                    type='course'
                    href={`/courses/${item.slug}`}
                  />
                );
              },
            },
          },
          {
            sourceId: 'CERTIFICATES',
            getItems() {
              return getAlgoliaResults({
                searchClient,
                queries: [{ indexName: 'CERTIFICATES', query }],
              });
            },
            templates: {
              item({ item, components }) {
                return (
                  <SearchItem
                    hit={item}
                    components={components}
                    type='certificate'
                    href={`/certifications/${item.slug}`}
                  />
                );
              },
            },
          },
          {
            sourceId: 'LESSONS',
            getItems() {
              return getAlgoliaResults({
                searchClient,
                queries: [{ indexName: 'LESSONS', query }],
              });
            },
            templates: {
              item({ item, components }) {
                const href =
                  item.type === 'INDEX'
                    ? `/${item.slug}`
                    : `/lessons/${item.slug}`;
                return (
                  <SearchItem
                    hit={item}
                    components={components}
                    type='lesson'
                    href={href}
                  />
                );
              },
            },
          },
        ];
      },
    });

    return () => search.destroy();
  }, []);

  return <div ref={containerRef} className='relative' />;
}
