import React, { useMemo, useState } from 'react';
import { Amplify, API } from 'aws-amplify';
import Meta from '../../components/shared/Meta';
import awsExports from '../../src/aws-exports';
import { listGlossaryTerms } from '../../src/graphql/queries';

Amplify.configure(awsExports);

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const normalizeText = (value) => value.toLowerCase();

const splitDefinition = (definition) => {
  const bulletSplit = definition.split('\n- ');
  if (bulletSplit.length === 1) {
    return { intro: definition, bullets: [] };
  }

  const [intro, ...bullets] = bulletSplit;
  return { intro: intro.trim(), bullets: bullets.map((item) => item.trim()).filter(Boolean) };
};

const highlightText = (text, query) => {
  if (!query) {
    return text;
  }

  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(escaped, 'gi');
  const parts = text.split(regex);
  const matches = text.match(regex);

  if (!matches) {
    return text;
  }

  return parts.flatMap((part, index) => {
    const match = matches[index];
    if (!match) {
      return [part];
    }
    return [part, <mark key={`${part}-${index}`}>{match}</mark>];
  });
};

const Page = ({ terms }) => {
  const [query, setQuery] = useState('');
  const normalizedQuery = query.trim().toLowerCase();

  const filteredTerms = useMemo(() => {
    if (!normalizedQuery) {
      return terms;
    }

    return terms.filter((term) => {
      const termText = normalizeText(term.term || '');
      const definitionText = normalizeText(term.definition || '');
      return termText.includes(normalizedQuery) || definitionText.includes(normalizedQuery);
    });
  }, [normalizedQuery, terms]);

  const groupedTerms = useMemo(() => {
    const map = new Map();

    filteredTerms.forEach((term) => {
      const letter = term.letter || term.term?.[0]?.toUpperCase() || '#';
      if (!map.has(letter)) {
        map.set(letter, []);
      }
      map.get(letter).push(term);
    });

    map.forEach((items, letter) => {
      items.sort((a, b) => a.term.localeCompare(b.term));
      map.set(letter, items);
    });

    return map;
  }, [filteredTerms]);

  return (
    <>
      <Meta
        title='Glossary | Packaging School'
        description='Browse packaging terms and definitions with an A–Z index and search.'
        image='https://packschool.s3.amazonaws.com/about-seoImage.webp'
      />
      <div className='glossary'>
        <header className='glossary__header'>
          <h1>Glossary</h1>
          <p>
            Find terms and definitions from across packaging, printing, and production.{' '}
            <span className='glossary__count'>
              {filteredTerms.length.toLocaleString()} terms
            </span>
          </p>
        </header>

        <div className='glossary__search'>
          <input
            type='search'
            placeholder='Search terms or definitions...'
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label='Search glossary'
          />
        </div>

        <nav className='glossary__letters' aria-label='Glossary A to Z'>
          {LETTERS.map((letter) => {
            const hasTerms = groupedTerms.has(letter);
            return hasTerms ? (
              <a key={letter} href={`#letter-${letter}`}>
                {letter}
              </a>
            ) : (
              <span key={letter} aria-disabled='true'>
                {letter}
              </span>
            );
          })}
        </nav>

        <div className='glossary__content'>
          {LETTERS.filter((letter) => groupedTerms.has(letter)).map((letter) => (
            <section key={letter} id={`letter-${letter}`} className='glossary__section'>
              <h2>{letter}</h2>
              <dl>
                {groupedTerms.get(letter).map((term) => {
                  const { intro, bullets } = splitDefinition(term.definition || '');
                  return (
                    <div key={term.id} className='glossary__entry'>
                      <dt>{highlightText(term.term, normalizedQuery)}</dt>
                      <dd>
                        {intro && (
                          <p className='glossary__intro'>
                            {highlightText(intro, normalizedQuery)}
                          </p>
                        )}
                        {bullets.length > 0 && (
                          <ul>
                            {bullets.map((item, index) => (
                              <li key={`${term.id}-bullet-${index}`}>
                                {highlightText(item, normalizedQuery)}
                              </li>
                            ))}
                          </ul>
                        )}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </section>
          ))}
        </div>
      </div>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      <style jsx>{`
        .glossary {
          max-width: 1100px;
          margin: 0 auto;
          padding: 48px 24px 96px;
          color: #111827;
        }

        .glossary__header h1 {
          font-size: 2.5rem;
          margin-bottom: 8px;
        }

        .glossary__header p {
          font-size: 1rem;
          color: #4b5563;
          margin-bottom: 24px;
        }

        .glossary__count {
          font-weight: 600;
        }

        .glossary__search {
          margin-bottom: 24px;
        }

        .glossary__search input {
          width: 100%;
          padding: 12px 16px;
          border-radius: 10px;
          border: 1px solid #d1d5db;
          font-size: 1rem;
          transition: border 0.2s ease, box-shadow 0.2s ease;
        }

        .glossary__search input:focus {
          outline: none;
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
        }

        .glossary__letters {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(28px, 1fr));
          gap: 10px;
          margin-bottom: 32px;
          position: sticky;
          top: 0;
          background: #ffffff;
          padding: 12px 0;
          z-index: 5;
        }

        .glossary__letters a,
        .glossary__letters span {
          text-align: center;
          padding: 8px 0;
          border-radius: 8px;
          font-weight: 600;
          text-decoration: none;
          color: #111827;
          border: 1px solid transparent;
        }

        .glossary__letters a:hover {
          border-color: #e5e7eb;
          background: #f9fafb;
        }

        .glossary__letters span {
          color: #9ca3af;
          cursor: not-allowed;
        }

        .glossary__section {
          margin-bottom: 48px;
          scroll-margin-top: 96px;
        }

        .glossary__section h2 {
          font-size: 1.75rem;
          margin-bottom: 16px;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 8px;
        }

        dl {
          display: grid;
          gap: 20px;
        }

        .glossary__entry dt {
          font-weight: 700;
          font-size: 1.05rem;
          margin-bottom: 6px;
        }

        .glossary__entry dd {
          margin: 0;
          color: #374151;
        }

        .glossary__intro {
          white-space: pre-line;
          margin: 0 0 8px;
        }

        .glossary__entry ul {
          margin: 0;
          padding-left: 20px;
        }

        mark {
          background: rgba(99, 102, 241, 0.18);
          color: inherit;
          padding: 0 2px;
          border-radius: 4px;
        }

        .glossary__entry li {
          margin-bottom: 6px;
          line-height: 1.5;
        }
      `}</style>
    </>
  );
};

export const getServerSideProps = async () => {
  const terms = [];
  let nextToken = null;

  do {
    const res = await API.graphql({
      query: listGlossaryTerms,
      variables: {
        limit: 1000,
        nextToken,
        filter: { status: { eq: 'LIVE' } },
      },
    });

    const data = res.data.listGlossaryTerms;
    terms.push(...data.items.filter(Boolean));
    nextToken = data.nextToken;
  } while (nextToken);

  terms.sort((a, b) => {
    const letterCompare = a.letter.localeCompare(b.letter);
    if (letterCompare !== 0) {
      return letterCompare;
    }
    return a.term.localeCompare(b.term);
  });

  return { props: { terms } };
};

export default Page;