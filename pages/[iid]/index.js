import React, { useState } from 'react';
import { API } from 'aws-amplify';
import { getAllIndexes } from '../../helpers/api';
import { indexPagesBySlug } from '../../src/graphql/queries';
import { useSelector } from 'react-redux';
import { registgerCourseClick } from '../../helpers/api';
import { useRouter } from 'next/router';
import {
  HeaderBasic,
  HeaderTwoColumnText,
  HeaderTwoColumnHero,
  HeaderGrid,
  SocialGrid,
  EditorialGrid,
  CourseCardGrid,
  CourseTable,
  BasicCallout,
  CourseCardCallout,
  CertCallout,
  ThumbnailGallery,
  ImageSlider,
  SingleImage,
  TwoImage,
  ImageQuote,
} from '@jmechristian/ps-component-library';
import '@jmechristian/ps-component-library/dist/style.css';
import { motion, AnimatePresence } from 'framer-motion';
import Meta from '../../components/shared/Meta';
import VideoPlayer from '../../components/VideoPlayer';

const Page = ({ indexPage }) => {
  const index = indexPage && JSON.parse(indexPage.content);
  console.log(index);
  const router = useRouter();
  const { location } = useSelector((state) => state.auth);

  const cardClickHandler = async (id, slug, altLink, type) => {
    await registgerCourseClick(id, router.asPath, location, slug, 'GRID');

    altLink
      ? router.push(altLink)
      : router.push(
          `/${
            type && type === 'COLLECTION' ? 'collections' : 'courses'
          }/${slug}`
        );
  };

  const cardPurchaseHandler = async (id, link, coupon) => {
    await registgerCourseClick(id, router.asPath, location, link, 'GRID');
    coupon ? router.push(link + `?${coupon}`) : router.push(link);
  };

  const setHeroContent = (type) => {
    switch (type) {
      case 'BASIC':
        return (
          <div>
            <HeaderBasic
              headline={index.hero.headline}
              subheadline={index.hero.subheadline}
              centered={false}
              authors={[]}
            />
          </div>
        );
      case 'TWOCOLUMN':
        return (
          <div>
            <HeaderTwoColumnText
              headline={index.hero.headline}
              subheadline={index.hero.subheadline}
              centered={false}
              authors={[]}
            />
          </div>
        );
      case 'TWOCOLHERO':
        return (
          <div>
            <HeaderTwoColumnHero
              headline={index.hero.headline}
              subheadline={index.hero.subheadline}
              centered={false}
              authors={[]}
              hero={index.hero.hero}
            />
          </div>
        );
      case 'EDITORIAL':
        return (
          <div>
            <HeaderGrid
              headline={index.hero.headline}
              subheadline={index.hero.subheadline}
              centered={false}
              authors={[]}
              hero={index.hero.hero}
              lessons={index.hero.lessons && index.hero.lessons}
              setNewHero={(val) => setIsHero(val)}
            />
          </div>
        );

      default:
        return <></>;
    }
  };

  const setLessonRow = (row) => {
    switch (row.template) {
      case 'SOCIAL':
        return (
          <SocialGrid
            headline={row.headline}
            subheadline={row.subheadline}
            lessons={row.lessons}
          />
        );
      case 'EDITORIAL':
        return (
          <EditorialGrid
            headline={row.headline}
            subheadline={row.subheadline}
            heroLesson={row.lessons[0]}
            lessons={row.lessons.slice(1, 4)}
          />
        );
      default:
        return <div>No Template Chosen.</div>;
    }
  };

  const setCertRow = (row) => {
    return (
      <CertCallout
        headline={row.headline}
        subheadline={row.subheadline}
        link={row.link}
        cert={row.template}
        linkText={row.linkText}
      />
    );
  };

  const setGalleryRow = (row) => {
    switch (row.template) {
      case 'THUMBNAIL':
        return <ThumbnailGallery images={row.images} />;
      case 'SLIDER':
        return (
          <div className='w-full'>
            <ImageSlider images={row.images} />
          </div>
        );
      case 'SINGLEIMAGE':
        return <SingleImage images={row.images} />;
      case 'TWOIMAGE':
        return <TwoImage images={row.images} />;
      case 'IMAGEQUOTE':
        return <ImageQuote images={row.images} />;
      default:
        return <div>Default</div>;
    }
  };

  const setCourseRow = (row) => {
    switch (row.template) {
      case 'CARD':
        return (
          <CourseCardGrid
            headline={row.headline}
            subheadline={row.subheadline}
            courses={row.courses}
            cardClickHandler={(id, slug, altLink, type) =>
              cardClickHandler(id, slug, altLink, type)
            }
            cardPurchaseHandler={(id, link, coupon) =>
              cardPurchaseHandler(id, link, coupon)
            }
          />
        );
      case 'TABLE':
        return (
          <CourseTable
            headline={row.headline}
            subheadline={row.subheadline}
            courses={row.courses}
          />
        );
      default:
        return <div>No Template Chosen.</div>;
    }
  };

  const setRowContent = (row) => {
    switch (row.type) {
      case 'LESSON':
        return setLessonRow(row);
      case 'COURSES':
        return setCourseRow(row);
      case 'CTA':
        return setCtaRow(row);
      case 'CERT':
        return setCertRow(row);
      case 'GALLERY':
        return setGalleryRow(row);
      case 'VIDEO':
        return <VideoPlayer videoEmbedLink={row.url} />;
      default:
        return <div>Default</div>;
    }
  };

  const setCtaRow = (row) => {
    switch (row.template) {
      case 'BASIC':
        return (
          <BasicCallout
            headline={row.headline}
            subheadline={row.subheadline}
            link={row.link}
            linkText={row.linkText}
          />
        );
      case 'COURSE':
        return (
          <CourseCardCallout
            headline={row.headline}
            subheadline={row.subheadline}
            link={row.link}
            course={row.courses[0]}
            linkText={row.linkText}
            cardPurchaseHandler={(id, link, coupon) =>
              cardPurchaseHandler(id, link, coupon)
            }
            cardClickHandler={(id, slug, altLink, type) =>
              cardClickHandler(id, slug, altLink, type)
            }
          />
        );
      default:
        return (
          <BasicCallout
            headline={row.headline}
            subheadline={row.subheadline}
            link={row.link}
            linkText={row.linkText}
          />
        );
    }
  };

  return (
    <>
      <Meta
        title={index && index.title}
        description={index && index.description}
        image={
          index && index.hero.hero
            ? index.hero.hero
            : 'https://packmedia54032-staging.s3.amazonaws.com/public/all-courses-seoimagewebp'
        }
      />
      {index ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.75 }}
          className='flex flex-col gap-32 max-w-7xl px-5 mx-auto pt-32 pb-32'
        >
          <div>{setHeroContent(index.hero.type)}</div>
          <div className='flex flex-col gap-32'>
            {index.rows.map((row) => (
              <div key={row.id}>{setRowContent(row)}</div>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className='flex flex-col gap-16 max-w-7xl px-5 mx-auto pt-16 pb-32 animate-pulse'
        >
          {/* Hero Section */}
          <div className='h-64 bg-gray-200 rounded-lg'></div>

          {/* Content Rows */}
          <div className='flex flex-col gap-16'>
            {/* Row 1 */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              <div className='h-48 bg-gray-200 rounded-lg'></div>
              <div className='h-48 bg-gray-200 rounded-lg'></div>
              <div className='h-48 bg-gray-200 rounded-lg'></div>
            </div>

            {/* Row 2 */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              <div className='h-64 bg-gray-200 rounded-lg'></div>
              <div className='h-64 bg-gray-200 rounded-lg'></div>
            </div>

            {/* Row 3 */}
            <div className='h-32 bg-gray-200 rounded-lg'></div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export async function getStaticPaths() {
  const res = await getAllIndexes();
  const paths = res.map((lesson) => ({
    params: { iid: lesson.slug },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const { iid } = params;

  const res = await API.graphql({
    query: indexPagesBySlug,
    variables: { slug: iid },
  });
  const indexPage = res.data.indexPagesBySlug.items[0];

  if (!indexPage) {
    return {
      notFound: true,
    };
  }

  return { props: { indexPage }, revalidate: 10 };
}

export default Page;
