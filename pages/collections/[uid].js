import React, { useEffect, useMemo, useState } from 'react';
import { listLMSCollections } from '../../src/graphql/queries';
import { API } from 'aws-amplify';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import FadeIn from '../../helpers/FadeIn';
import { UserIcon } from '@heroicons/react/24/outline';
import CTAButtonLarge from '../../components/CTAButtonLarge';
import Meta from '../../components/shared/Meta';
import { generateMetadata } from '../../libs/seo/generateMetadata';
import {
  createNewOrder,
  registgerCourseClick,
  getDeviceType,
} from '../../helpers/api';
import { useThinkificLink } from '../../hooks/useThinkificLink';
import SortableTableHeader from '../../components/shared/SortableTableHeader';
import CourseTableRow from '../../components/shared/CourseTableRow';
import CourseMobileCard from '../../components/shared/CourseMobileCard';
import { MdVideocam } from 'react-icons/md';
import Image from 'next/legacy/image';

const collectionBySlugWithCourses = /* GraphQL */ `
  query LMSCollectionsBySlugWithCourses($slug: String!) {
    lMSCollectionsBySlug(slug: $slug) {
      items {
        id
        description
        title
        subtitle
        instructor
        instructorImage
        instructorDescription
        instructorLink
        hours
        price
        slug
        category
        collectionId
        lmsLink
        courses {
          items {
            id
            lMSCourse {
              id
              courseId
              title
              subheadline
              slug
              type
              category
              categoryArray
              hours
              lessons
              price
              preview
              video: videos
              link
              seoImage
            }
          }
        }
      }
    }
  }
`;

const Page = ({ collection, courses }) => {
  console.log(collection);
  console.log(courses);
  const router = useRouter();
  const { location, awsUser } = useSelector((state) => state.auth);
  const { navigateToThinkific } = useThinkificLink();
  const deviceType = getDeviceType();
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [navigatingId, setNavigatingId] = useState(null);
  const [isSort, setIsSort] = useState({
    value: 'course id',
    direction: 'ASC',
  });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const handleComplete = () => setNavigatingId(null);
    router.events?.on('routeChangeComplete', handleComplete);
    router.events?.on('routeChangeError', handleComplete);
    return () => {
      router.events?.off('routeChangeComplete', handleComplete);
      router.events?.off('routeChangeError', handleComplete);
    };
  }, [router.events]);

  useEffect(() => {
    if (!navigatingId) return;
    const fallback = setTimeout(() => setNavigatingId(null), 3000);
    return () => clearTimeout(fallback);
  }, [navigatingId]);

  const setSort = (value) => {
    setIsSort((prev) => ({
      value,
      direction:
        prev.value === value && prev.direction === 'ASC' ? 'DSC' : 'ASC',
    }));
  };

  const sortedCourses = useMemo(() => {
    if (!courses) return [];
    const { value, direction } = isSort;
    const mult = direction === 'ASC' ? 1 : -1;
    return [...courses].sort((a, b) => {
      if (value === 'title')
        return mult * (a.title || '').localeCompare(b.title || '');
      if (value === 'course id')
        return mult * (a.courseId || '').localeCompare(b.courseId || '');
      if (value === 'lessons')
        return mult * ((a.lessons || 0) - (b.lessons || 0));
      if (value === 'hours')
        return mult * (parseFloat(a.hours || 0) - parseFloat(b.hours || 0));
      if (value === 'price')
        return (
          mult * ((parseInt(a.price, 10) || 0) - (parseInt(b.price, 10) || 0))
        );
      return 0;
    });
  }, [courses, isSort]);

  const orderHandler = async () => {
    if (!collection?.lmsLink) return;
    setIsLoading(true);
    try {
      await registgerCourseClick(
        collection.id,
        router.asPath,
        location || { ip: null, country: null, lat: null, long: null },
        collection.lmsLink,
        'COLLECTION',
      );
      const orderId = await createNewOrder({
        courseDescription: collection.description || collection.subtitle,
        courseDiscount: 0,
        courseImage: courses?.[0]?.seoImage || null,
        courseName: collection.title,
        courseLink: collection.lmsLink,
        total: collection.price,
        userID: awsUser?.id ?? null,
        email: awsUser?.email ?? null,
        name: awsUser?.name ?? null,
        ipAddress: location?.ip ?? null,
        country: location?.country ?? null,
        device: deviceType,
        page: `/collections/${collection.slug}`,
      });
      if (awsUser?.name?.includes(' ')) {
        navigateToThinkific(collection.lmsLink, collection.lmsLink);
      } else {
        router.push(`/order/${orderId.id}`);
      }
    } finally {
      setIsLoading(false);
    }
  };
  const metadata = collection
    ? generateMetadata({
        pageType: 'COLLECTION',
        data: collection,
        pathname: `/collections/${collection.slug}`,
      })
    : generateMetadata({ pageType: 'STATIC', pathname: router?.asPath });

  return (
    <>
      <Meta
        title={metadata.title}
        description={metadata.description}
        image={collection?.seoImage}
        url={
          collection?.slug ? `/collections/${collection.slug}` : router.asPath
        }
        type='website'
      />
      <div className='relative py-24'>
        <div className='flex flex-col gap-10  container-7xl'>
          <div className='grid grid-cols-1 lg:grid-cols-7 lg:gap-24'>
            <div className='flex flex-col gap-6 max-w-3xl lg:col-span-5 w-full'>
              <h1 className='text-4xl xl:text-5xl leading-tight max-w-3xl '>
                {collection && collection.title}
              </h1>
              <h3 className=' text-xl max-w-3xl'>
                {collection && collection.subtitle}
              </h3>
              <div className='dark:text-gray-400 flex gap-1 items-center'>
                <div>
                  <UserIcon className='w-6 h-6' />
                </div>
                <a
                  href={collection && collection.instructorLink}
                  target='_blank'
                  rel='noreferrer'
                >
                  {collection && collection.instructor}
                </a>
              </div>
              <p className='text-base lg:text-lg dark:text-gray-500 text-gray-600 max-w-4xl'>
                {collection && collection.description}
              </p>
            </div>
            <div className='lg:col-span-2 w-full flex flex-col gap-6 justify-center items-center'>
              <div className='flex flex-col gap-6 bg-slate-100 dark:bg-dark-mid p-8 w-full rounded-lg'>
                <div>
                  <img
                    src={collection?.instructorImage}
                    alt={collection?.title}
                    className='w-[76%] mx-auto'
                  />
                </div>
                <div className='flex flex-col gap-2 w-full'>
                  <div className='font-medium black__white font-greycliff text-lg text-center'>
                    Future Proof Your Skills
                  </div>
                  <div className='font-semibold black__white text-5xl text-center font-greycliff'>
                    {collection &&
                    collection.price &&
                    collection.price === 'FREE'
                      ? 'Free!'
                      : `$${
                          collection && collection.price && collection.price
                        }`}
                  </div>
                </div>
                <div className='flex flex-col gap-4'>
                  <CTAButtonLarge
                    link={collection?.lmsLink}
                    onClick={orderHandler}
                    isLoading={isLoading}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-6'>
            <FadeIn>
              <h3 className=' text-xl lg:text-2xl'>
                {courses && courses.length > 0 && 'Courses Included'}
              </h3>
            </FadeIn>
            {courses && courses.length > 0 && (
              <FadeIn>
                <div className='w-full'>
                  {isMobile ? (
                    <div className='border border-slate-200 rounded-lg overflow-hidden'>
                      {sortedCourses.map((course) => (
                        <CourseMobileCard
                          key={course.id}
                          course={course}
                          isNavigating={navigatingId === course.id}
                          hidePrice
                          onRowClick={async () => {
                            setNavigatingId(course.id);
                            await registgerCourseClick(
                              course.id,
                              router.asPath,
                              location || {
                                ip: null,
                                country: null,
                                lat: null,
                                long: null,
                              },
                              course.slug,
                              'TABLE',
                            );
                            if (course.altLink) {
                              window.open(course.altLink, '_blank');
                            } else {
                              router.push(
                                `/${
                                  course.type === 'COLLECTION'
                                    ? 'collections'
                                    : 'courses'
                                }/${course.slug}`,
                              );
                            }
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className='w-full overflow-x-auto'>
                      <table className='w-full table-fixed border-collapse border border-slate-200 rounded-lg overflow-hidden'>
                        <colgroup>
                          <col style={{ width: '8%' }} />
                          <col style={{ width: '24%' }} />
                          <col style={{ width: '44%' }} />
                          <col style={{ width: '6%' }} />
                          <col style={{ width: '6%' }} />
                          <col style={{ width: '4%' }} />
                        </colgroup>
                        <thead>
                          <tr className='bg-slate-100'>
                            <SortableTableHeader
                              label='ID'
                              className='sticky left-0 z-10 bg-slate-100 shadow-[2px_0_4px_-2px_rgba(0,0,0,0.1)]'
                              sortKey='course id'
                              currentSort={isSort.value}
                              direction={isSort.direction}
                              onClick={() => setSort('course id')}
                            />
                            <SortableTableHeader
                              label='Title'
                              sortKey='title'
                              currentSort={isSort.value}
                              direction={isSort.direction}
                              onClick={() => setSort('title')}
                            />
                            <th className='collapse sm:visible px-2 sm:px-3 py-2 text-left font-semibold text-xs sm:text-sm'>
                              Subheadline
                            </th>
                            <SortableTableHeader
                              label='Hours'
                              sortKey='hours'
                              currentSort={isSort.value}
                              direction={isSort.direction}
                              onClick={() => setSort('hours')}
                              align='center'
                              className='collapse sm:visible'
                            />
                            <SortableTableHeader
                              label='Lessons'
                              sortKey='lessons'
                              currentSort={isSort.value}
                              direction={isSort.direction}
                              onClick={() => setSort('lessons')}
                              align='center'
                              className='collapse sm:visible'
                            />
                            <th
                              className='px-1 py-2 text-center font-semibold text-xs sm:text-sm'
                              aria-label='Preview'
                            >
                              <MdVideocam
                                size={18}
                                className='text-slate-600 inline-block'
                              />
                            </th>
                          </tr>
                        </thead>
                        <tbody className='bg-white'>
                          {sortedCourses.map((course) => (
                            <CourseTableRow
                              key={course.id}
                              course={course}
                              isNavigating={navigatingId === course.id}
                              hidePrice
                              onRowClick={async () => {
                                setNavigatingId(course.id);
                                await registgerCourseClick(
                                  course.id,
                                  router.asPath,
                                  location || {
                                    ip: null,
                                    country: null,
                                    lat: null,
                                    long: null,
                                  },
                                  course.slug,
                                  'TABLE',
                                );
                                if (course.altLink) {
                                  window.open(course.altLink, '_blank');
                                } else {
                                  router.push(
                                    `/${
                                      course.type === 'COLLECTION'
                                        ? 'collections'
                                        : 'courses'
                                    }/${course.slug}`,
                                  );
                                }
                              }}
                            />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </FadeIn>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;

export async function getStaticPaths() {
  const res = await API.graphql({ query: listLMSCollections });
  const paths = res.data.listLMSCollections.items.map((collection) => ({
    params: { uid: collection.slug },
  }));

  // Important for social scrapers: ensure first request returns full HTML + meta tags.
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  try {
    const slug = params.uid;
    const res = await API.graphql({
      query: collectionBySlugWithCourses,
      variables: { slug },
    });
    const items = res.data?.lMSCollectionsBySlug?.items ?? [];
    const collection = items[0];

    if (!collection) {
      return { notFound: true, revalidate: 60 };
    }

    const courses =
      collection.courses?.items
        ?.map((item) => item?.lMSCourse)
        .filter(Boolean) ?? [];

    return {
      props: { collection, courses },
      revalidate: 10,
    };
  } catch (error) {
    console.error('Error in getStaticProps for collection', params?.uid, error);
    // Fail safe for export: treat errored collections as not found
    return { notFound: true, revalidate: 60 };
  }
}
