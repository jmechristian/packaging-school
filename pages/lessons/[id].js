import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useMemo, useEffect, useState } from 'react';
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
} from 'react-share';
import { API, graphqlOperation } from 'aws-amplify';
import LessonQuiz from '../../components/lessons/LessonQuiz';
import VideoPlayer from '../../components/VideoPlayer';
import LessonSlides from '../../components/lessons/LessonSlides';
import ImageHero from '../../components/lessons/ImageHero';
import VideoHero from '../../components/lessons/VideoHero';
import '@jmechristian/ps-component-library/dist/style.css';
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
import { MdExpandMore } from 'react-icons/md';
import WiredLessonCard from '../../components/shared/WiredLessonCard';
const Page = ({ lesson }) => {
  console.log(lesson);
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
        <div className='w-full max-w-7xl mx-auto py-16 flex flex-col'>
          <div className='w-full grid grid-cols-12 gap-10'>
            <div className='col-span-12 lg:!col-span-9 flex flex-col gap-10'>
              <div className='w-full flex flex-col gap-6 lg:!gap-9  max-w-4xl'>
                <div className='h2-base'>{lesson.title}</div>
                <div className=' text-gray-500 text-xl'>{lesson.subhead}</div>
              </div>
              {lesson.mediaType === 'VIDEO' && (
                <div className='max-w-7xl mx-auto object-cover w-full border-b border-b-gray-400 mb-5'>
                  <VideoPlayer light={false} videoEmbedLink={lesson.media} />
                  {lesson.videoLink && (
                    <div className='w-full py-2 flex items-center justify-center bg-base-dark'>
                      <div className='text-white font-semibold'>
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
              {lesson.analysis && (
                <div className='w-full'>
                  <LessonQuiz analysis={lesson.analysis} lessonId={lesson.id} />
                </div>
              )}
            </div>
            <div className='col-span-12 lg:col-span-3 border-l border-l-gray-400'>
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
                  <div className='grid grid-cols-3 gap-2 w-fit'>
                    {awsUser &&
                    awsUser.savedLessons &&
                    awsUser.savedLessons.length > 0 &&
                    awsUser.savedLessons.includes(lesson.id) ? (
                      <div
                        className='flex gap-2 items-center cursor-pointer'
                        onClick={() =>
                          handleBookmarkAdd(
                            awsUser.savedLessons.filter(
                              (id) => id !== lesson.id
                            ),
                            awsUser.id
                          )
                        }
                      >
                        <MdBookmarkRemove size={32} color='gray' />
                      </div>
                    ) : (
                      <div
                        className='flex gap-2 items-center cursor-pointer'
                        onClick={() =>
                          handleBookmarkAdd(
                            [...awsUser.savedLessons, lesson.id],
                            awsUser.id
                          )
                        }
                      >
                        <MdBookmarkAdd size={32} color='green' />
                      </div>
                    )}
                    <FacebookShareButton
                      url={router.asPath}
                      quote={lesson.subhead}
                      // onClick={() => socialShareClickHandler('facebook')}
                      data-click-target='social_share'
                      data-click-name='Facebook'
                    >
                      <FacebookIcon round size={32} />
                    </FacebookShareButton>
                    <LinkedinShareButton
                      url={router.asPath}
                      title={lesson.title}
                      source='PackagingSchool.com'
                      summary={lesson.subhead}
                      // onClick={() => socialShareClickHandler('linkedin')}
                      data-click-target='social_share'
                      data-click-name='LinkedIn'
                    >
                      <LinkedinIcon round size={32} />
                    </LinkedinShareButton>
                  </div>
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
                <div className='flex flex-col gap-3 bg-brand-yellow/20 dark:bg-base-mid dark:text-white px-3 py-4 lg:rounded'>
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
                      <div className='w-full aspect-[16/9] bg-black'>
                        <VideoPlayer
                          videoEmbedLink={isFeaturedCard.obj.preview}
                          light={false}
                          playing={true}
                        />
                      </div>
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
            </div>
            <div className='col-span-full'>
              {lesson.sources && sortedSources && sortedSources.length > 0 && (
                <div className='hidden lg:flex flex-col gap-3 border-t border-t-black dark:border-t-white pt-6  px-6 lg:px-0'>
                  <div className='font-bold dark:text-white'>Sources</div>
                  <div className='grid lg:grid-cols-2 dark:text-white gap-3 text-xs'>
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
        {/* <div className='w-full lg:pt-6 pb-12 relative dark:bg-dark-dark'>
          <div className='w-full flex flex-col gap-6 lg:gap-9 max-w-7xl mx-auto'>
            {setMedia()}
            <div className='w-full flex flex-col lg:!flex-row gap-6 lg:!gap-12'>
              <div className='flex w-full'>
                <div className='flex flex-col gap-6 w-full'>
                  {lesson.mediaType != 'IMAGE' && (
                    <div className='border-b-8 border-b-neutral-900 dark:border-white pb-9'>
                      <div className='w-full dark:text-white font-bold max-w-xs md:max-w-3xl text-3xl lg:text-4xl xl:text-5xl leading-none lg:tracking-tight tracking-tighter px-4 xl:px-0'>
                        {lesson.title}
                      </div>
                    </div>
                  )}
                  {lesson.mediaType === 'VIDEO' ? (
                    <div className='flex flex-col md:!flex-row md:!items-center gap-3 lg:gap-5 font-medium border-b border-b-neutral-900 dark:border-b-white pb-6 px-4 xl:px-0'>
                      <div className='w-fit font-bold dark:text-white text-sm uppercase bg-brand-yellow/40 px-2 py-4 flex items-center justify-center text-center leading-tighter'>
                        {newDate}
                      </div>
                      {lesson.author && (
                        <div className='flex flex-col w-full md:!flex-row gap-3 md:!gap-9 md:!items-center'>
                          {lesson.author.map((a) => (
                            <div
                              key={a}
                              className='w-fit md:border-r md:!border-r-neutral-600 md:!last:border-r-0 pr-4'
                            >
                              <AuthorBlock id={a} />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : lesson.mediaType === 'SLIDES' ? (
                    <></>
                  ) : (
                    <div className='border-t-8 border-t-neutral-900 pt-9'></div>
                  )}
                  {lesson.objectives && lesson.objectives.length > 0 ? (
                    <div className='flex flex-col md:flex-row gap-6 w-full bg-brand-yellow/20 dark:bg-base-mid dark:text-white lg:rounded-xl p-9'>
                      <div className='aspect-[4/3] w-full lg:max-w-[250px] bg-clemson dark:bg-brand-yellow flex items-center justify-center'>
                        <div className='w-full p-3'>
                          <Image
                            src={
                              'https://packschool.s3.amazonaws.com/LOTM-Logo-Final-White-sm.png'
                            }
                            width={600}
                            height={309}
                            layout='responsive'
                            alt='Learning of the Month'
                          />
                        </div>
                      </div>

                      <div className='flex flex-col gap-4'>
                        <div className='font-bold tracking-tight text-lg lg:text-xl lg:leading-none'>
                          Learning Objectives
                        </div>
                        {lesson.objectives.map((ob) => (
                          <div className='flex gap-2' key={ob}>
                            <div>
                              <MdTrackChanges color='black' size={32} />
                            </div>
                            <div className='leading-tight'>{ob}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                  {lesson.actionLink && (
                    <div className='w-full bg-base-dark flex flex-col gap-4 md:flex-row text-center md:text-left justify-between items-center lg:rounded-lg px-6 py-6 lg:py-4'>
                      <div className='text-white text-lg font-semibold leading-tight'>
                        {lesson.actionLinkTitle}
                      </div>
                      <div
                        className='w-fit flex gap-1 items-center px-6 py-2 text-white cursor-pointer font-bold bg-clemson rounded shadow-lg'
                        onClick={actionClickHandler}
                      >
                        <div>
                          {user ? (
                            <LockOpenIcon className='w-5 h-5 stroke-white' />
                          ) : (
                            <LockClosedIcon className='w-5 h-5 stroke-white' />
                          )}
                        </div>
                        <div>Download</div>
                      </div>
                    </div>
                  )}
                  <div
                    className={`relative px-6 xl:px-0 ${
                      lesson.mediaType === 'IMAGE' ? 'mt-0' : 'mt-6'
                    }`}
                  >
                    <div
                      dangerouslySetInnerHTML={{ __html: lesson.content }}
                      className='tiptap lg:text-lg'
                    ></div>
                  </div>
                  
                </div>
              </div> */}

        {/* Sidebar */}
        {/* <div className='w-full lg:max-w-[360px] h-full flex flex-col md:!items-start md:!grid md:!grid-cols-3 lg:!flex lg:!flex-col gap-6 py-2 px-6 md:!px-0'>
                <div className='flex flex-col justify-center md:!items-start items-center gap-6 p-4 mx-auto'>
                  <div className='flex flex-col gap-1.5 '>
                    <div className='flex gap-1 items-center'>
                      <MdFastForward size={28} color='orange' />
                      <div className='font-bold tracking-tight text-lg text-white'>
                        Want to Go Further?
                      </div>
                    </div>
                    <div className='text-sm text-white/60 leading-snug'>
                      Dive into a comprehensive course crafted by subject-matter
                      experts.
                    </div>
                  </div>
                  {isFeaturedCard && isFeaturedCard.type === 'COURSE' ? (
                    <CourseCard
                      course={isFeaturedCard.obj}
                      cardClickHandler={(id, slug, altLink, type) => {
                        handleCourseClick(id, slug, altLink, type);
                      }}
                      cardPurchaseHandler={(id, link) => {
                        handleCoursePurchase(id, link);
                      }}
                    />
                  ) : isFeaturedCard && isFeaturedCard.type === 'CERT' ? (
                    <CertCard
                      cert={isFeaturedCard.obj}
                      cardClickHandler={(
                        abbreviation,
                        type,
                        link,
                        applicationLink
                      ) => {
                        handleCertClick(abbreviation, link);
                      }}
                      purchaseText='Start Today'
                    />
                  ) : (
                    <></>
                  )}
                </div>
                <div className='w-full h-0.5 bg-white/30 px-3'></div>
                <div className='flex flex-col justify-center items-start md:col-span-2 py-2'>
                  <div className='flex gap-2 items-center px-4 md:py-4 lg:py-0'>
                    <MdScreenShare size={24} color='orange' />
                    <div className='font-bold tracking-tight text-lg text-white'>
                      Related Lessons
                    </div>
                  </div>
                  <div className='md:grid md:grid-cols-2 lg:flex lg:flex-col'>
                    
                  </div>
                </div>
              </div> */}
        {/* </div> */}
        {/* {lesson.sources && sortedSources && sortedSources.length > 0 && (
              <div className='lg:hidden flex flex-col gap-3 border-t border-t-black dark:border-t-white pt-6  px-6 lg:px-0'>
                <div className='font-bold dark:text-white'>Sources</div>
                <div className='flex flex-col dark:text-white gap-3 text-xs'>
                  <div className='flex flex-col gap-3'>
                    {sortedSources[0].map((sou) => (
                      <div className='flex gap-1' key={sou.id}>
                        <div>
                          <sup>{sou.position}</sup>
                        </div>
                        <div className='break-all'>
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
                        <div className='break-all'>
                          <a href={sou.link}>{sou.name}</a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div> */}
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
