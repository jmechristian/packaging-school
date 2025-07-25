import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useMemo, useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import VideoPlayer from '../../components/VideoPlayer';

import {
  registerCertificateClick,
  getDeviceType,
  registgerCourseClick,
  handleBookmarkAdd,
  handleBookmarkRemove,
  getCertificate,
  getCourse,
} from '../../helpers/api';
import {
  listLessons,
  getCertificateObject,
  getLMSCourse,
} from '../../src/graphql/queries';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSignInModal } from '../../features/layout/layoutSlice';
import AuthorBlock from '../../components/shared/AuthorBlock';
import Meta from '../../components/shared/Meta';
import {
  MdBookmarkAdd,
  MdBookmark,
  MdBookmarkRemove,
  MdRocket,
  MdBolt,
} from 'react-icons/md';
import WiredLessonCard from '../../components/shared/WiredLessonCard';
import LessonSubscribe from '../../components/shared/LessonSubscribe';
const Page = ({ lesson }) => {
  const router = useRouter();
  const deviceType = getDeviceType();
  const { location, awsUser } = useSelector((state) => state.auth);
  const newDate =
    lesson &&
    new Date(
      lesson.backdate ? lesson.backdate : lesson.updatedAt
    ).toLocaleDateString('en-US');
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [isFeaturedCourse, setIsFeaturedCourse] = useState(null);

  const [isFeaturedCard, setIsFeaturedCard] = useState(null);

  useEffect(() => {
    const getFeaturedCard = async (type, id) => {
      if (type === 'CERT') {
        const featuredCard = await API.graphql({
          query: getCertificateObject,
          variables: {
            id: id,
          },
        });
        setIsFeaturedCard({
          type: 'CERT',
          obj: featuredCard.data.getCertificateObject,
        });
      } else if (type === 'COURSE') {
        const featuredCard = await API.graphql({
          query: getLMSCourse,
          variables: {
            id: id,
          },
        });
        setIsFeaturedCard({
          type: 'COURSE',
          obj: featuredCard.data.getLMSCourse,
        });
      }
    };

    let featuredData;
    if (lesson && lesson.featured) {
      try {
        featuredData = JSON.parse(lesson.featured);
      } catch (e) {
        featuredData = lesson.featured;
      }
    } else {
      featuredData = null;
      console.log('No lesson or featured data available');
    }

    if (lesson && featuredData && typeof featuredData === 'object') {
      getFeaturedCard(featuredData.type, featuredData.id);
    } else if (lesson && featuredData && typeof featuredData === 'string') {
      getFeaturedCard('COURSE', featuredData);
    }
  }, [lesson]);

  const sortedSources = useMemo(() => {
    if (lesson && lesson.sources.items) {
      const sorted =
        lesson &&
        lesson.sources.items &&
        lesson.sources.items.sort(function (a, b) {
          return a.position - b.position;
        });

      const chunkSize = sorted && sorted.length / 2;
      const chunks = [];

      for (let i = 0; i < sorted.length; i += chunkSize) {
        const chunk = sorted.slice(i, i + chunkSize);
        chunks.push(chunk);
      }

      return chunks;
    } else return null;
  }, [lesson]);

  const actionClickHandler = () => {
    if (user) {
      window.open(lesson.actionLink);
    } else {
      dispatch(toggleSignInModal());
    }
  };

  const handleCertClick = async (abbreviation, link) => {
    const data = {
      country: location.country,
      ipAddress: location.ipAddress,
      device: deviceType,
      object: abbreviation,
      page: router.asPath,
      type: 'CERTIFICATE-VIEW',
    };
    await registerCertificateClick(data);
    router.push(link);
  };

  const handleCourseClick = async (id, slug, altLink, type) => {
    await registgerCourseClick(
      id,
      router.asPath,
      location,
      slug,
      'COURSE-VIEW'
    );
    altLink
      ? router.push(altLink)
      : router.push(
          `/${
            type && type === 'COLLECTION' ? 'collections' : 'courses'
          }/${slug}`
        );
  };

  const handleCoursePurchase = async (id, link) => {
    await registgerCourseClick(
      id,
      router.asPath,
      location,
      link,
      'COURSE-PURCHASE'
    );
    router.push(link);
  };

  const getFeaturedCard = async ({ featured }) => {
    if (featured && featured.type === 'COURSE') {
      const course = await getCourse(featured.id);
      setIsFeaturedCard(course);
    } else if (featured && featured.type === 'CERT') {
      const cert = await getCertificate(featured.id);
      setIsFeaturedCard(cert);
    }
  };

  useEffect(() => {
    if (lesson && lesson.featured) {
      getFeaturedCard(lesson.featured);
    }
  }, [lesson]);

  return (
    lesson && (
      <>
        <Meta
          title={lesson.title}
          description={lesson.subhead}
          image={lesson.seoImage}
        />
        <div className='w-full max-w-7xl mx-auto py-16 flex flex-col px-4 lg:px-0'>
          <div className='w-full grid lg:grid-cols-12 gap-10 '>
            <div className='col-span-1 lg:!col-span-9 flex flex-col gap-10'>
              <div className='w-full flex flex-col gap-6 lg:!gap-9 max-w-4xl'>
                <div className='h2-base'>{lesson.title}</div>
                <div className=' text-gray-500 text-xl'>{lesson.subhead}</div>
              </div>
              {lesson.mediaType === 'VIDEO' && (
                <div className='max-w-7xl mx-auto object-cover w-full border-b border-b-gray-400 mb-5'>
                  <VideoPlayer light={false} videoEmbedLink={lesson.media} />
                  {lesson.videoLink && (
                    <div className='w-full py-2 flex items-center justify-center bg-base-dark'>
                      <div className='text-sm md:text-base text-white font-semibold'>
                        Trouble viewing video? Try{' '}
                        <Link
                          href={`/alt/lessons/${lesson.slug}`}
                          className='text-brand-yellow underline'
                        >
                          Alt Link 1
                        </Link>
                        ,{' '}
                        <a
                          href={lesson.videoLink}
                          className='text-brand-yellow underline'
                        >
                          Alt Link 2
                        </a>
                        .
                      </div>
                    </div>
                  )}
                </div>
              )}
              <div
                dangerouslySetInnerHTML={{ __html: lesson.content }}
                className='tiptap lg:text-lg'
              ></div>
            </div>
            <div className='col-span-1 lg:!col-span-3 md:border-l md:border-l-gray-400 w-full'>
              <div className='w-full flex flex-col'>
                <div className='flex flex-col gap-5 px-4'>
                  <div className='text-sm text-gray-700'>{newDate}</div>
                  {lesson.author && (
                    <div className='flex flex-col w-full gap-3 '>
                      {lesson.author.map((a) => (
                        <div key={a} className='w-fit'>
                          <AuthorBlock id={a} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className='w-full border-b border-b-gray-400 py-2'></div>
                <div className='flex flex-col gap-5 py-5 px-4'>
                  {lesson.analysis && (
                    <div className='flex flex-col gap-0'>
                      <div className='font-bold text-sm'>
                        Estimated Reading Time
                      </div>
                      <div className='italic text-sm'>
                        {lesson.analysis.readingTime} minutes
                      </div>
                    </div>
                  )}
                  {lesson.tags &&
                    lesson.tags.items &&
                    lesson.tags.items.length > 0 && (
                      <div className='flex flex-col gap-2'>
                        <div className='font-bold text-sm'>Tags</div>
                        <div className='text-sm flex flex-wrap gap-1'>
                          {lesson.tags.items.map((tag) => (
                            <div
                              key={tag.tags.tag}
                              className='bg-gray-900 text-white px-1.5 py-0.5 rounded'
                            >
                              {tag.tags.tag}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              </div>
              <div className='w-full border-b border-b-gray-400 py-2'></div>
              <div className='flex flex-col gap-5 py-5 pl-2'>
                <div className='flex flex-col gap-3 bg-brand-yellow/20  px-3 py-4 lg:rounded'>
                  <div className='flex items-center gap-0'>
                    <div>
                      <MdBolt size={22} color='black' />
                    </div>
                    <div>
                      <div className='font-bold'>Expand Your Knowledge</div>
                    </div>
                  </div>
                  {isFeaturedCard && isFeaturedCard.type === 'COURSE' ? (
                    <div className='w-full flex flex-col gap-2'>
                      {isFeaturedCard.obj.preview ? (
                        <div className='w-full aspect-[16/9] bg-black'>
                          <VideoPlayer
                            videoEmbedLink={isFeaturedCard.obj.preview}
                            light={false}
                            playing={false}
                          />
                        </div>
                      ) : (
                        <div
                          className='w-full aspect-[16/9] bg-black bg-center bg-cover'
                          style={{
                            backgroundImage: `url(${isFeaturedCard.obj.seoImage})`,
                          }}
                        ></div>
                      )}
                      <div className='font-bold text-sm'>
                        {isFeaturedCard.obj.title}
                      </div>
                      <div className='text-xs'>
                        {isFeaturedCard.obj.subheadline}
                      </div>
                      <div
                        className='w-full flex justify-end text-sm font-bold gap-3 text-clemson-dark cursor-pointer'
                        onClick={() => {
                          handleCourseClick(
                            isFeaturedCard.obj.id,
                            isFeaturedCard.obj.slug,
                            isFeaturedCard.obj.altLink,
                            isFeaturedCard.obj.type
                          );
                        }}
                      >
                        Get Started &rarr;
                      </div>
                    </div>
                  ) : isFeaturedCard && isFeaturedCard.type === 'CERT' ? (
                    <div className='w-full flex flex-col gap-3'>
                      <div
                        className='w-full aspect-[4/3] bg-black bg-center bg-cover'
                        style={{
                          backgroundImage: `url(${isFeaturedCard.obj.seoImage})`,
                        }}
                      ></div>
                      <div className='font-bold text-sm'>
                        {isFeaturedCard.obj.title}
                      </div>
                      <div className='text-xs'>
                        {isFeaturedCard.obj.description}
                      </div>
                      <div
                        className='w-full flex justify-end text-sm font-bold gap-3 text-clemson-dark cursor-pointer'
                        onClick={() => {
                          handleCertClick(
                            isFeaturedCard.obj.abbreviation,
                            isFeaturedCard.obj.link
                          );
                        }}
                      >
                        Get Started &rarr;
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className='w-full border-b border-b-gray-400 pt-2'></div>
              <div className='flex flex-col pl-5 py-5 gap-3'>
                <div className='font-bold text-sm'>Related Lessons</div>
                <div className='flex flex-col gap-5'>
                  {lesson.related && lesson.related.length > 0 ? (
                    lesson.related.map((cou) => (
                      <WiredLessonCard
                        key={cou}
                        id={cou}
                        external={true}
                        reference={`/lessons/${cou}`}
                      />
                    ))
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className='w-full border-b border-b-gray-400 pt-2'></div>
              <div className='flex flex-col gap-5 py-5 pl-2 mt-3'>
                <LessonSubscribe />
              </div>
            </div>
            <div className='col-span-full'>
              {lesson.sources && sortedSources && sortedSources.length > 0 && (
                <div className='hidden lg:flex flex-col gap-3 border-t border-t-black  pt-6  px-6 lg:px-0'>
                  <div className='font-bold '>Sources</div>
                  <div className='grid lg:grid-cols-2  gap-3 text-xs'>
                    <div className='flex flex-col gap-3'>
                      {sortedSources[0].map((sou) => (
                        <div className='flex gap-1' key={sou.id}>
                          <div>
                            <sup>{sou.position}</sup>
                          </div>
                          <div className='break-all w-full'>
                            <a href={sou.link}>{sou.name}</a>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className='flex flex-col gap-3'>
                      {sortedSources[1].map((sou) => (
                        <div className='flex gap-1' key={sou.id}>
                          <div>
                            <sup>{sou.position}</sup>
                          </div>
                          <div className='break-all w-full'>
                            <a href={sou.link}>{sou.name}</a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    )
  );
};

export async function getStaticPaths() {
  const res = await API.graphql({
    query: listLessons,
  });
  const paths = res.data.listLessons.items
    .filter((it) => it.status != 'DRAFT')
    .map((lesson) => ({
      params: { id: lesson.slug },
    }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const { id } = params;

  const getLesson = /* GraphQL */ `
    query MyQuery($slug: String!) {
      lessonsBySlug(slug: $slug) {
        items {
          id
          links {
            items {
              name
              link
              lessonLinksId
            }
          }
          analysis {
            id
            quizCorrectAnswer
            quizOptions
            quizQuestion
            readingTime
          }
          author
          videoLink
          backdate
          media
          mediaType
          content
          objectives
          seoImage
          slides
          slug
          actionCTA
          actionLink
          actionSubhead
          actionExample
          actionLinkTitle
          tags {
            items {
              tags {
                tag
              }
            }
          }
          sources {
            items {
              name
              link
              lessonSourcesId
              position
            }
          }
          subhead
          title
          featured
          related
          type
          updatedAt
        }
      }
    }
  `;

  const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT;
  const GRAPHQL_API_KEY = process.env.GRAPHQL_API_KEY;

  const variables = {
    slug: id, // key is "input" based on the mutation above
  };

  const res = await API.graphql({ query: getLesson, variables: variables });
  const lesson = res.data.lessonsBySlug.items[0];

  return { props: { lesson }, revalidate: 10 };
}

export default Page;
