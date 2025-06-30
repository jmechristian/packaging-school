import algoliasearch from 'algoliasearch/lite';
import { autocomplete, getAlgoliaResults } from '@algolia/autocomplete-js';

import '@algolia/autocomplete-theme-classic';

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY
);

// Add custom styles
const customStyles = `
  .aa-Form {
    border: none !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    background: transparent !important;
  }
  
  .aa-Input {
    border: 1px solid #e5e7eb !important;
    border-radius: 0 !important;
    padding: 6px 12px !important;
    height: 32px !important;
    font-size: 12px !important;
    background: white !important;
    color: #374151 !important;
    transition: border-color 0.2s ease !important;
    text-align: left !important;
  }
  
  .aa-Input::placeholder {
    font-size: 14px !important;
    text-align: left !important;
    color: #9ca3af !important;
  }
  
  .aa-Input:focus {
    outline: none !important;
    border-color: #3b82f6 !important;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
  }
  
  .aa-Panel {
    border: 1px solid #e5e7eb !important;
    border-radius: 8px !important;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
    background: white !important;
    margin-top: 4px !important;
  }
  
  .aa-List {
    padding: 8px 0 !important;
  }
  
  .aa-Item {
    padding: 8px 16px !important;
    border: none !important;
    background: transparent !important;
    transition: background-color 0.2s ease !important;
  }
  
  .aa-Item:hover {
    background-color: #f3f4f6 !important;
  }
  
  .aa-Item[aria-selected="true"] {
    background-color: #eff6ff !important;
  }
  
  .aa-ItemLink {
    text-decoration: none !important;
    color: inherit !important;
    display: block !important;
  }
  
  .aa-ItemBadge {
    display: inline-block !important;
    padding: 0.5px 4px !important;
    border-radius: 6px !important;
    font-size: 10px !important;
    font-weight: 600 !important;
    text-transform: uppercase !important;
    margin-right: 8px !important;
  }
  
  .aa-ItemBadge--certificate {
    background-color: #fef3c7 !important;
    color: #92400e !important;
  }
  
  .aa-ItemBadge--course {
    background-color: #dbeafe !important;
    color: #1e40af !important;
  }
  
  .aa-ItemBadge--lesson {
    background-color: #dcfce7 !important;
    color: #166534 !important;
  }
  
  .aa-ItemTitle {
    font-weight: 600 !important;
    font-size: 14px !important;
    color: #111827 !important;
    margin-bottom: 2px !important;
    display: inline !important;
  }
  
  .aa-ItemSubtitle {
    font-size: 12px !important;
    color: #6b7280 !important;
    line-height: 1.4 !important;
    display: block !important;
    margin-top: 2px !important;
    overflow: hidden !important;
    display: -webkit-box !important;
    -webkit-box-orient: vertical !important;
    -webkit-line-clamp: 3 !important;
  }
  
  .aa-ItemContent {
    display: block !important;
  }
  
  .aa-SourceHeader {
    display: block !important;
    padding: 8px 16px 4px !important;
    font-size: 12px !important;
    font-weight: 600 !important;
    color: #6b7280 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.5px !important;
    margin-bottom: 4px !important;
  }
  
  .aa-Label {
    display: none !important;
  }
  
  .aa-SubmitButton {
    display: none !important;
  }
  
  .aa-LoadingIndicator {
    color: #6b7280 !important;
  }
  
  .aa-NoResults {
    padding: 16px !important;
    text-align: center !important;
    color: #6b7280 !important;
    font-size: 14px !important;
  }
`;

export const initializeAutocomplete = (containerId = '#autocomplete') => {
  // Inject custom styles
  if (typeof document !== 'undefined') {
    const styleElement = document.createElement('style');
    styleElement.textContent = customStyles;
    document.head.appendChild(styleElement);
  }

  return autocomplete({
    container: containerId,
    placeholder: 'Search...',
    getSources({ query }) {
      return [
        {
          sourceId: 'CERTIFICATES',
          getItems() {
            return getAlgoliaResults({
              searchClient,
              queries: [
                {
                  indexName: 'CERTIFICATES',
                  params: {
                    query,
                    hitsPerPage: 5,
                  },
                },
              ],
            });
          },
          templates: {
            item({ item, components, html }) {
              return html`
                <a href="/${item.slug}" class="aa-ItemLink">
                  <div class="aa-ItemContent">
                    <div class="aa-ItemBadge aa-ItemBadge--certificate">
                      <span>Certification</span>
                    </div>
                    <div class="aa-ItemTitle">
                      ${components.Highlight({ hit: item, attribute: 'title' })}
                    </div>
                    ${item.subheadline
                      ? html`
                          <div class="aa-ItemSubtitle line-clamp-2">
                            ${components.Highlight({
                              hit: item,
                              attribute: 'subheadline',
                            })}
                          </div>
                        `
                      : ''}
                  </div>
                </a>
              `;
            },
            noResults() {
              return 'No certifications found.';
            },
          },
        },
        {
          sourceId: 'COURSES',
          getItems() {
            return getAlgoliaResults({
              searchClient,
              queries: [
                {
                  indexName: 'COURSES',
                  params: {
                    query,
                    hitsPerPage: 5,
                  },
                },
              ],
            });
          },
          templates: {
            item({ item, components, html }) {
              return html`
                <a href="/courses/${item.slug}" class="aa-ItemLink">
                  <div class="aa-ItemContent">
                    <div class="aa-ItemBadge aa-ItemBadge--course">
                      <span>Course</span>
                    </div>
                    <div class="aa-ItemTitle">
                      ${components.Highlight({ hit: item, attribute: 'title' })}
                    </div>
                    ${item.subheadline
                      ? html`
                          <div class="aa-ItemSubtitle line-clamp-2">
                            ${components.Highlight({
                              hit: item,
                              attribute: 'subheadline',
                            })}
                          </div>
                        `
                      : ''}
                  </div>
                </a>
              `;
            },
            noResults() {
              return 'No courses found.';
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
                  params: {
                    query,
                    hitsPerPage: 5,
                  },
                },
              ],
            });
          },
          templates: {
            item({ item, components, html }) {
              return html`
                <a href="/lessons/${item.slug}" class="aa-ItemLink">
                  <div class="aa-ItemContent">
                    <div class="aa-ItemBadge aa-ItemBadge--lesson">
                      <span>Lesson</span>
                    </div>
                    <div class="aa-ItemTitle">
                      ${components.Highlight({ hit: item, attribute: 'title' })}
                    </div>
                    ${item.subhead
                      ? html`
                          <div class="aa-ItemSubtitle line-clamp-2">
                            ${components.Highlight({
                              hit: item,
                              attribute: 'subhead',
                            })}
                          </div>
                        `
                      : ''}
                  </div>
                </a>
              `;
            },
            noResults() {
              return 'No lessons found.';
            },
          },
        },
      ];
    },
  });
};
