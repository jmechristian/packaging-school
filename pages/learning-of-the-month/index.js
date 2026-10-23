import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { API } from 'aws-amplify';
import { MdOutlineSearch, MdClose } from 'react-icons/md';
import EducationPartnerCallout from '../../components/shared/EducationPartnerCallout';
import Meta from '../../components/shared/Meta';
import Pagination from '../../components/shared/Pagination';
import FooterEmailSignup from '../../features/navigation/Footer/FooterEmailSignup';
import {
  getAllLearningOfTheMonths,
  registgerLessonClick,
} from '../../helpers/api';
import { getAuthor } from '../../src/graphql/queries';
import { generateMetadata } from '../../libs/seo/generateMetadata';
import {
  buildBreadcrumbJsonLd,
  buildHomeJsonLd,
} from '../../libs/seo/organizationJsonLd';

const PAGE_SIZE = 9;
const LOTM_LOGO =
  'https://packschool.s3.us-east-1.amazonaws.com/LOTM-Logo-Final_White.png';
const DEFAULT_AVATAR =
  'https://packschool.s3.amazonaws.com/avatar_default.jpeg';
const INTRO =
  'Each month, the Packaging School team comes together to develop a short lesson related to numerous industry topics—from site visits, deep dives, and interviews, our LOTM series is designed to help you keep your finger on the pulse of the dynamic packaging industry.';
const PAGE_PATH = '/learning-of-the-month';
const PAGE_TITLE = 'The Learning of the Month Library | Packaging School';
const PAGE_DESCRIPTION =
  'Explore Learning of the Month: short Packaging School lessons from site visits, deep dives, and interviews, published every month.';
const PAGE_KEYWORDS =
  'Learning of the Month, LOTM, packaging lessons, packaging industry, site visits, packaging interviews, packaging deep dives';

const lessonTimestamp = (lesson) => {
  const raw = lesson?.backdate || lesson?.createdAt;
  const time = raw ? new Date(raw).getTime() : 0;
  return Number.isNaN(time) ? 0 : time;
};

const formatLessonDate = (lesson) => {
  const time = lessonTimestamp(lesson);
  if (!time) return '';
  return new Date(time).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const authorIdsFor = (lesson) => {
  if (Array.isArray(lesson?.author)) {
    return lesson.author.filter(Boolean);
  }
  return lesson?.author ? [lesson.author] : [];
};

const LotmMark = ({ className = 'h-16 w-16' }) => (
  <div
    className={`${className} flex shrink-0 items-center justify-center rounded-full bg-brand-yellow-light`}
  >
    <div
      className='h-[70%] w-[70%] bg-contain bg-center bg-no-repeat'
      style={{ backgroundImage: `url(${LOTM_LOGO})` }}
      role='img'
      aria-label='Learning of the Month'
    />
  </div>
);

const AuthorList = ({ ids, authors, authorsLoaded }) => {
  if (!ids.length) return null;

  return (
    <div className='flex flex-wrap items-center gap-x-3 gap-y-1.5'>
      {ids.map((id) => {
        const author = authors[id];
        if (!authorsLoaded) {
          return (
            <div
              key={id}
              className='h-6 w-28 animate-pulse rounded-full bg-neutral-200'
            />
          );
        }
        if (!author?.name) return null;

        return (
          <div key={id} className='flex items-center gap-1.5'>
            <span
              className='h-6 w-6 shrink-0 rounded-full bg-neutral-200 bg-cover bg-center'
              style={{
                backgroundImage: `url(${author.headshot || DEFAULT_AVATAR})`,
              }}
              aria-hidden='true'
            />
            <span className='text-sm text-neutral-600'>{author.name}</span>
          </div>
        );
      })}
    </div>
  );
};

const LessonCard = ({ lesson, authors, authorsLoaded, onOpen }) => {
  const date = formatLessonDate(lesson);
  const ids = authorIdsFor(lesson);

  return (
    <article className='h-full'>
      <Link
        href={`/lessons/${lesson.slug}`}
        onClick={onOpen}
        className='group flex h-full flex-col border border-black bg-white transition-colors hover:bg-neutral-50'
      >
        <div className='aspect-[16/9] w-full overflow-hidden bg-base-light'>
          {lesson.seoImage ? (
            <img
              src={lesson.seoImage}
              alt=''
              className='h-full w-full object-cover'
            />
          ) : (
            <div className='flex h-full w-full items-center justify-center bg-base-brand/20'>
              <LotmMark className='h-20 w-20' />
            </div>
          )}
        </div>
        <div className='flex flex-1 flex-col gap-2 p-4'>
          {date ? (
            <time className='text-sm font-medium text-clemson-dark' dateTime={lesson.backdate || lesson.createdAt}>
              {date}
            </time>
          ) : null}
          <h2 className='line-clamp-3 text-lg font-semibold leading-snug text-neutral-900'>
            {lesson.title}
          </h2>
          <AuthorList ids={ids} authors={authors} authorsLoaded={authorsLoaded} />
          {lesson.subhead ? (
            <p className='line-clamp-4 text-sm leading-snug text-neutral-600'>
              {lesson.subhead}
            </p>
          ) : null}
          <div className='mt-auto pt-3 text-sm font-semibold uppercase tracking-wide text-clemson-dark'>
            Read lesson
          </div>
        </div>
      </Link>
    </article>
  );
};

const CardSkeleton = () => (
  <div className='flex h-full animate-pulse flex-col border border-neutral-200 bg-white'>
    <div className='aspect-[16/9] w-full bg-neutral-200' />
    <div className='flex flex-col gap-3 p-4'>
      <div className='h-3 w-24 rounded bg-neutral-200' />
      <div className='h-5 w-full rounded bg-neutral-200' />
      <div className='h-5 w-4/5 rounded bg-neutral-200' />
      <div className='h-3 w-32 rounded bg-neutral-200' />
      <div className='h-12 w-full rounded bg-neutral-100' />
    </div>
  </div>
);

const toIsoDate = (lesson) => {
  const time = lessonTimestamp(lesson);
  return time ? new Date(time).toISOString() : undefined;
};

const buildLotmStructuredData = (lessons, siteUrl) => {
  const pageUrl = `${siteUrl}${PAGE_PATH}`;
  const { organization, website } = buildHomeJsonLd(siteUrl);
  const breadcrumb = buildBreadcrumbJsonLd(
    [{ name: 'Learning of the Month', path: PAGE_PATH }],
    siteUrl,
  );

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${pageUrl}#lessons`,
    name: 'Learning of the Month Library',
    description: INTRO,
    url: pageUrl,
    itemListOrder: 'https://schema.org/ItemListOrderDescending',
    numberOfItems: lessons.length,
    itemListElement: lessons.slice(0, 100).map((lesson, index) => {
      const url = `${siteUrl}/lessons/${lesson.slug}`;
      return {
        '@type': 'ListItem',
        position: index + 1,
        url,
        item: {
          '@type': 'Article',
          headline: lesson.title,
          description: lesson.subhead || undefined,
          image: lesson.seoImage || undefined,
          datePublished: toIsoDate(lesson),
          url,
          mainEntityOfPage: url,
          publisher: { '@id': `${siteUrl}/#organization` },
        },
      };
    }),
  };

  const collectionPage = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: 'Learning of the Month Library',
    headline: 'Learning of the Month Library',
    description: INTRO,
    inLanguage: 'en-US',
    isPartOf: { '@id': `${siteUrl}/#website` },
    publisher: { '@id': `${siteUrl}/#organization` },
    mainEntity: { '@id': `${pageUrl}#lessons` },
  };

  return [organization, website, breadcrumb, collectionPage, itemList].filter(
    Boolean,
  );
};

const SignupCallout = () => (
  <section className='border border-black bg-base-brand/15'>
    <div className='grid items-center gap-8 p-6 md:p-10 lg:grid-cols-[auto_1fr_minmax(280px,420px)]'>
      <LotmMark className='h-24 w-24' />
      <div className='flex flex-col gap-3'>
        <p className='text-xs font-semibold uppercase tracking-[0.18em] text-base-dark'>
          Learning of the Month
        </p>
        <h2 className='font-oswald text-3xl font-light uppercase leading-none text-base-dark md:text-4xl'>
          Knowledge is <span className='font-bold text-clemson'>Free!</span>
        </h2>
        <p className='max-w-xl text-base leading-snug text-neutral-700'>
          Receive a monthly dose of fresh insights across diverse topics,
          delivered straight to your inbox.
        </p>
      </div>
      <FooterEmailSignup />
    </div>
  </section>
);

const Page = ({ initialLessons = [], initialAuthors = {} }) => {
  const router = useRouter();
  const { location } = useSelector((state) => state.auth);
  const libraryRef = useRef(null);
  const [lessons, setLessons] = useState(initialLessons);
  const [authors, setAuthors] = useState(initialAuthors);
  const [authorsLoaded, setAuthorsLoaded] = useState(
    Object.keys(initialAuthors).length > 0,
  );
  const [isLoading, setIsLoading] = useState(initialLessons.length === 0);
  const [hasError, setHasError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://packagingschool.com';

  useEffect(() => {
    if (initialLessons.length > 0) return undefined;

    let cancelled = false;

    const loadLessons = async () => {
      try {
        const items = await getAllLearningOfTheMonths();
        if (!cancelled) setLessons(items || []);
      } catch (error) {
        console.error('Error loading Learning of the Month lessons:', error);
        if (!cancelled) setHasError(true);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    loadLessons();
    return () => {
      cancelled = true;
    };
  }, [initialLessons.length]);

  const sortedLessons = useMemo(() => {
    return [...lessons]
      .filter((lesson) => lesson?.type === 'LOTM' && lesson?.slug)
      .sort((a, b) => lessonTimestamp(b) - lessonTimestamp(a));
  }, [lessons]);

  useEffect(() => {
    if (isLoading || Object.keys(initialAuthors).length > 0) return undefined;

    const ids = [
      ...new Set(sortedLessons.flatMap((lesson) => authorIdsFor(lesson))),
    ];
    if (!ids.length) {
      setAuthorsLoaded(true);
      return undefined;
    }

    let cancelled = false;
    setAuthorsLoaded(false);

    const loadAuthors = async () => {
      const entries = await Promise.all(
        ids.map(async (id) => {
          try {
            const result = await API.graphql({
              query: getAuthor,
              variables: { id },
            });
            return [id, result?.data?.getAuthor || null];
          } catch {
            return [id, null];
          }
        }),
      );

      if (!cancelled) {
        setAuthors(Object.fromEntries(entries.filter(([, author]) => author)));
        setAuthorsLoaded(true);
      }
    };

    loadAuthors();
    return () => {
      cancelled = true;
    };
  }, [sortedLessons, isLoading, initialAuthors]);

  const filteredLessons = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return sortedLessons;

    return sortedLessons.filter((lesson) => {
      const title = lesson.title?.toLowerCase() || '';
      const subhead = lesson.subhead?.toLowerCase() || '';
      return title.includes(query) || subhead.includes(query);
    });
  }, [searchTerm, sortedLessons]);

  const paginatedLessons = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredLessons.slice(start, start + PAGE_SIZE);
  }, [filteredLessons, currentPage]);

  const metadata = generateMetadata({
    pageType: 'STATIC',
    pathname: PAGE_PATH,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  });

  const structuredData = useMemo(
    () => buildLotmStructuredData(sortedLessons, siteUrl),
    [sortedLessons, siteUrl],
  );

  const shareImage =
    sortedLessons.find((lesson) => lesson.seoImage)?.seoImage ||
    'https://packschool.s3.us-east-1.amazonaws.com/default-seo.webp';

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const openLesson = (lesson) => {
    if (!location) return;
    registgerLessonClick(lesson.id, router.asPath, location, 'GRID').catch(
      () => {},
    );
  };

  const resultLabel = isLoading
    ? 'Loading lessons'
    : searchTerm.trim()
      ? `${filteredLessons.length} ${
          filteredLessons.length === 1 ? 'lesson' : 'lessons'
        } found`
      : `${filteredLessons.length} ${
          filteredLessons.length === 1 ? 'lesson' : 'lessons'
        }`;

  return (
    <>
      <Meta
        title={metadata.title}
        description={metadata.description}
        keywords={PAGE_KEYWORDS}
        image={shareImage}
        preloadImage={shareImage}
        url={PAGE_PATH}
        robots={metadata.robots}
        type='website'
        structuredData={structuredData}
      />
      <div className='bg-white'>
      <div className='container-base flex flex-col gap-12 px-3 xl:px-0'>
        <header className='flex max-w-3xl flex-col gap-5'>
          <div className='flex items-center gap-3'>
            <LotmMark />
            <p className='text-xs font-semibold uppercase tracking-[0.18em] text-clemson-dark'>
              Monthly series
            </p>
          </div>
          <div className='flex flex-col gap-4'>
            <h1 className='h1-base'>Learning of the Month Library</h1>
            <p className='text-lg leading-relaxed text-neutral-700'>{INTRO}</p>
          </div>
        </header>

        <div className='flex flex-col gap-6' ref={libraryRef}>
          <div className='flex flex-col gap-3 border-b border-neutral-300 pb-5'>
            <label className='flex items-center gap-2 border border-black px-3 py-1'>
              <MdOutlineSearch size={26} aria-hidden='true' />
              <input
                type='search'
                value={searchTerm}
                onChange={(event) => handleSearch(event.target.value)}
                placeholder='Search the Learning of the Month Library'
                className='w-full border-none bg-transparent py-2 text-base focus:ring-0 [&::-webkit-search-cancel-button]:appearance-none'
              />
              {searchTerm ? (
                <button
                  type='button'
                  onClick={() => handleSearch('')}
                  className='flex h-8 w-8 items-center justify-center text-neutral-500'
                  aria-label='Clear search'
                >
                  <MdClose size={20} />
                </button>
              ) : null}
            </label>
            <p className='text-sm text-neutral-500'>{resultLabel}</p>
          </div>

          {isLoading ? (
            <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
              {Array.from({ length: PAGE_SIZE }).map((_, index) => (
                <CardSkeleton key={index} />
              ))}
            </div>
          ) : hasError ? (
            <div className='border border-black bg-white px-6 py-16 text-center'>
              <p className='text-lg font-semibold'>
                The library is unavailable right now.
              </p>
              <p className='mt-2 text-neutral-600'>
                Refresh the page to try loading the lessons again.
              </p>
            </div>
          ) : paginatedLessons.length > 0 ? (
            <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
              {paginatedLessons.map((lesson) => (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  authors={authors}
                  authorsLoaded={authorsLoaded}
                  onOpen={() => openLesson(lesson)}
                />
              ))}
            </div>
          ) : (
            <div className='border border-black bg-white px-6 py-16 text-center'>
              <p className='text-lg font-semibold'>No lessons match that search.</p>
              <p className='mt-2 text-neutral-600'>
                Try a different title or topic.
              </p>
            </div>
          )}

          {!isLoading && filteredLessons.length > PAGE_SIZE ? (
            <div className='flex justify-center'>
              <Pagination
                totalItems={filteredLessons.length}
                itemsPerPage={PAGE_SIZE}
                currentPage={currentPage}
                plain
                onPageChange={(page) => {
                  setCurrentPage(page);
                  libraryRef.current?.scrollIntoView({ behavior: 'smooth' });
                }}
              />
            </div>
          ) : null}
        </div>

        <EducationPartnerCallout
          page={PAGE_PATH}
          pageTitle='Learning of the Month Library'
        />
        <SignupCallout />
      </div>
      </div>
    </>
  );
};

const slimLesson = (lesson) => ({
  id: lesson.id,
  title: lesson.title || '',
  subhead: lesson.subhead || '',
  seoImage: lesson.seoImage || '',
  slug: lesson.slug,
  author: authorIdsFor(lesson),
  backdate: lesson.backdate || null,
  createdAt: lesson.createdAt || null,
  type: lesson.type || 'LOTM',
});

export async function getStaticProps() {
  try {
    const lessons = await getAllLearningOfTheMonths();
    const published = (lessons || [])
      .filter((lesson) => lesson?.type === 'LOTM' && lesson?.slug)
      .sort((a, b) => lessonTimestamp(b) - lessonTimestamp(a))
      .map(slimLesson);

    const ids = [...new Set(published.flatMap((lesson) => lesson.author))];
    const entries = await Promise.all(
      ids.map(async (id) => {
        try {
          const result = await API.graphql({
            query: getAuthor,
            variables: { id },
          });
          const author = result?.data?.getAuthor;
          if (!author?.name) return null;
          return [
            id,
            {
              id: author.id,
              name: author.name,
              headshot: author.headshot || null,
              linkedIn: author.linkedIn || null,
            },
          ];
        } catch {
          return null;
        }
      }),
    );

    return {
      props: {
        initialLessons: published,
        initialAuthors: Object.fromEntries(entries.filter(Boolean)),
      },
      revalidate: 60 * 60,
    };
  } catch (error) {
    console.error('Error building Learning of the Month page:', error);
    return {
      props: { initialLessons: [], initialAuthors: {} },
      revalidate: 60,
    };
  }
}

export default Page;
