import React, { Suspense } from 'react';
import Image from 'next/image';
import {
  AcademicCapIcon,
  BoltIcon,
  RocketLaunchIcon,
  SparklesIcon,
  SignalIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline';
import { API } from 'aws-amplify';

import NewCouseCard from '../components/shared/NewCouseCard';
import ExpandSearch from '../components/shared/ExpandSearch';
import VideoPlayer from '../components/VideoPlayer';
import CustomerCourses from '../components/shared/CustomerCourses';
import Meta from '../components/shared/Meta';
import {
  buildHomeJsonLd,
  buildBreadcrumbJsonLd,
} from '../libs/seo/organizationJsonLd';

const Page = ({ isbt, isbtCourses }) => {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://packagingschool.com';
  const { organization, website } = buildHomeJsonLd(siteUrl);
  const breadcrumb = buildBreadcrumbJsonLd(
    [{ name: 'ISBT', path: '/isbt' }],
    siteUrl,
  );

  return (
    <>
      <Meta
        title={'Packaging School | ISBT'}
        description={
          'Enroll in unique online courses from ISBT, the sole organization focused on the science of beverages since 1953.'
        }
        image={'https://packschool.s3.us-east-1.amazonaws.com/default-seo.webp'}
        url='/isbt'
        structuredData={[organization, website, breadcrumb]}
      />
      <div className='w-full flex flex-col gap-4 md:gap-6 lg:gap-12 py-6 lg:py-9 mx-auto'>
        <div className='w-full h-full grid md:grid-cols-2 gap-x-24 py-16 max-w-7xl mx-auto px-3 md:px-6 xl:px-0'>
          <div className='flex flex-col gap-9'>
            <div className='w-full max-w-[60%]'>
              <Image
                src='https://packschool.s3.amazonaws.com/logos/isbt-logo.png'
                alt='ISBT logo'
                width={400}
                height={120}
                className='w-full h-auto'
                priority
              />
            </div>
            <div className='flex flex-col gap-6'>
              <div className='lg:text-lg'>
                The ISBT (formerly SSDT) was founded in Washington, D.C. in
                1953. It is unique in being the only organization whose sole
                interest is the technical and scientific aspects of soft drinks
                and beverages. Membership is open to any person engaged in the
                science, technology or production of soft drinks or beverages,
                including those suppliers to the beverage industry whose
                principal occupation is substantially technical in nature.
              </div>
              <div
                className=' w-fit cursor-pointer flex gap-1 items-center'
                onClick={() =>
                  window.open('https://www.isbt.com/membership.asp', '_blank')
                }
              >
                <div className='text-base-brand font-bold'>
                  Learn More about ISBT<sup>&reg;</sup>
                </div>
                <div>
                  <ArrowTopRightOnSquareIcon className='w-4 h-4 stroke-base-brand' />
                </div>
              </div>
            </div>
          </div>
          <div className='w-full h-full'>
            <div className='aspect-[16/9] bg-neutral-500'>
              <VideoPlayer
                hideSupport={true}
                videoEmbedLink={
                  'https://www.youtube.com/embed/IWL8R7Xk8cU?si=bifvut2F-qRq6Igr'
                }
                light={false}
                playing={false}
              />
            </div>
          </div>
        </div>
        <div className='flex flex-col bg-base-mid w-full pb-3 max-w-[1400px] mx-auto lg:rounded-xl shadow-lg'>
          <div className='max-w-7xl w-full mx-auto flex flex-col gap-4 py-16'>
            <div className='flex flex-col gap-3 justify-center text-center text-white mb-9'>
              <h2 className='w-full font-bold lg:text-4xl text-white text-center'>
                <span className='text-brand-yellow-light'>Featured</span>{' '}
                Learning
              </h2>
              <div className='text-lg'>
                See below for a full list of courses offered.
              </div>
            </div>
            <div className='card-grid'>
              <NewCouseCard
                title={'Beverage Institute Value Bundle'}
                description={
                  'This limited time offer allows learners to take all the courses offered by the Beverage Institute for a discounted price. The courses in this bundle total 39 hours and take the learner on a journey through the fundamentals of beverage technology, beverage ingredients, sanitation for foundation beverages, microbiology basics, water and wastewater treatments, sweeteners, beverage gases, and all PET resins, preforms, and bottle technology.'
                }
                background={
                  'https://packschool.s3.amazonaws.com/bev-value-sm.png'
                }
                link={'https://learn.packagingschool.com/enroll/389255'}
                link_text={'Select Course'}
                Icon={RocketLaunchIcon}
                callout={'Best Value!'}
              />
              <NewCouseCard
                title={'Beverage Ingredients Bundle'}
                description={
                  'This course covers the key ingredients used in most beverages. Each module covers chemistry, applications, quality attributes, food safety, regulatory requirements, and much more. And more importantly, especially for the product developer, is how these ingredients interact with one another to produce the intended beverage attributes. Anyone who works with beverages or ingredients will benefit from this course. Any consumer who wants more detailed and accurate information about the ingredients they consume will find it here.'
                }
                background={
                  'https://packschool.s3.amazonaws.com/ben-ingredients-sm.png'
                }
                link={'https://learn.packagingschool.com/enroll/389255'}
                link_text={'Select Course'}
                Icon={RocketLaunchIcon}
                callout={'Best Value!'}
              />
              <NewCouseCard
                title={'Complete Gases Course'}
                description={
                  'The course benefits individuals who use beverage gases to create products such as carbonated soft drinks, oxygenated water, argon systems in wine processing, nitrogen for headspace control and pressurization, ozone generation, and oxygen in brewing and wastewater processes.'
                }
                background={'https://packschool.s3.amazonaws.com/gases-sm.png'}
                link={'https://learn.packagingschool.com/enroll/1014824'}
                link_text={'Select Course'}
                Icon={AcademicCapIcon}
                callout={'Comprehensive'}
              />
              <NewCouseCard
                title={'Fundamentals of Beverage Technology'}
                description={
                  'This course is a self-paced, interactive session providing a technical overview of the beverage industry.'
                }
                background={
                  'https://packschool.s3.amazonaws.com/fund-bev-full-sm.png'
                }
                link={'https://learn.packagingschool.com/enroll/165283'}
                video={'https://www.youtube.com/embed/IWL8R7Xk8cU'}
                link_text={'Select Course'}
                Icon={SparklesIcon}
                callout={'Most Popular'}
              />
            </div>
          </div>
        </div>

        <CustomerCourses courses={isbtCourses} />

        {isbt && isbt.link && (
          <div className='w-full bg-gradient-to-tr from-base-brand via-base-mid to-clemson rounded-xl max-w-7xl mx-auto mt-2 mb-12'>
            <div className='mx-auto max-w-7xl px-6 text-center lg:text-left py-12 lg:py-20 flex flex-col gap-12 lg:flex-row items-center justify-center lg:justify-between w-full lg:px-16'>
              <h2 className='text-4xl font-bold  text-white sm:text-5xl font-etna'>
                Interested in learning more
                <br />
                about {isbt.displayName}?
              </h2>
              <div className='flex flex-col justify-center items-center gap-3 '>
                <div
                  className=' text-white cursor-pointer flex w-fit px-6 py-4 rounded-xl shadow-md bg-clemson text-lg font-medium'
                  onClick={() => window.open(isbt.link, '_blank')}
                >
                  Get More Info
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const getISBTCustomer = /* GraphQL */ `
  query MyQuery {
    getCustomer(id: "4c14edd3-d25d-4409-ac1c-0da8b609d99e") {
      displayName
      highlightColor
      email
      id
      link
      logo
      offered
      offerings
      pdf
      primaryColor
      slide
      status
      updatedAt
      video
    }
  }
`;

const getISBTCourses = /* GraphQL */ `
  query ListISBTCourses($filter: ModelLMSCourseFilterInput, $limit: Int) {
    listLMSCourses(filter: $filter, limit: $limit) {
      items {
        id
        courseId
        categoryArray
        type
        price
        hours
        lessons
        preview
        seoImage
        title
        subheadline
        slug
        altLink
        callout
        link
        subscriptionLink
        subscriptionPrice
        stripeLink
      }
    }
  }
`;

export async function getStaticProps() {
  const [customerRes, coursesRes] = await Promise.all([
    API.graphql({ query: getISBTCustomer }),
    API.graphql({
      query: getISBTCourses,
      variables: {
        filter: { courseId: { contains: 'ISBT' } },
        limit: 100,
      },
    }),
  ]);

  const isbt = customerRes.data.getCustomer;
  const isbtCourses = (coursesRes.data.listLMSCourses.items || []).sort(
    (a, b) => a.courseId.localeCompare(b.courseId),
  );

  return {
    props: { isbt, isbtCourses },
    revalidate: 60 * 60 * 4, // revalidate every 4 hours
  };
}

export default Page;
