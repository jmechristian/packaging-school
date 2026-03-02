import React, { useState } from 'react';
import {
  listLMSCollections,
  listLMSCourses,
  lMSCollectionsBySlug,
} from '../../src/graphql/queries';
import { API } from 'aws-amplify';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import FadeIn from '../../helpers/FadeIn';
import ShortCourseCard from '../../components/shared/ShortCourseCard';
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

const Page = ({ collection, courses }) => {
  console.log(collection);
  console.log(courses);
  const router = useRouter();
  const { location, awsUser } = useSelector((state) => state.auth);
  const { navigateToThinkific } = useThinkificLink();
  const deviceType = getDeviceType();
  const [isLoading, setIsLoading] = useState(false);

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
      <div className='relative dark:bg-dark-dark py-24'>
        <div className='flex flex-col gap-24  container-7xl'>
          <div className='grid grid-cols-1 lg:grid-cols-7 lg:gap-24'>
            <div className='flex flex-col gap-6 max-w-3xl lg:col-span-5 w-full'>
              <h1 className='text-4xl xl:text-5xl leading-tight max-w-3xl dark:text-white'>
                {collection && collection.title}
              </h1>
              <h3 className='dark:text-white text-xl max-w-3xl'>
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
            <div className='lg:col-span-2 w-full flex justify-center items-center'>
              <div className='flex flex-col gap-6 bg-slate-100 dark:bg-dark-mid p-9 w-full rounded-lg'>
                <div className='flex flex-col gap-2 w-full'>
                  <div className='font-medium black__white font-greycliff text-lg'>
                    Future Proof Your Skills
                  </div>
                  <div className='font-semibold black__white text-5xl lg:text-6xl font-greycliff'>
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
              <h3 className='dark:text-white text-xl lg:text-2xl'>
                {courses && courses.length > 0 && 'Courses Included'}
              </h3>
            </FadeIn>
            <FadeIn>
              <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                {courses &&
                  courses.map((course) => (
                    <div key={course.id}>
                      <ShortCourseCard
                        courseId={course.id}
                        title={course.title}
                        desc={course.subheadline}
                        hours={course.hours}
                        price={course.price}
                        slug={course.slug}
                        category={course.category}
                        video={course.preview}
                      />
                    </div>
                  ))}
              </div>
            </FadeIn>
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
  const slug = params.uid;
  const res = await API.graphql({
    query: lMSCollectionsBySlug,
    variables: { slug: slug },
  });
  const collection = res.data.lMSCollectionsBySlug.items[0];

  if (!collection) {
    return { notFound: true, revalidate: 60 };
  }

  const collectionId = collection.id;

  const collectionCourses = await API.graphql({
    query: listLMSCourses,
    variables: {
      filter: {
        collection: { eq: collectionId },
      },
    },
  });
  const courses = collectionCourses.data.listLMSCourses.items;

  return {
    props: { collection, courses },
    revalidate: 10,
  };
}
