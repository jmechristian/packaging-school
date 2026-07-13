import React from 'react';
import GradientCTA from '../components/GradientCTA';
import SalesDetails from '../components/sales-bootcamp/SalesDetails';
import SalesHeroVideo from '../components/sales-bootcamp/SalesHeroVideo';
import CourseScroller from '../components/shared/CourseScroller';
import SalesFeatures from '../components/sales-bootcamp/SalesFeatures';
import SalesStaff from '../components/sales-bootcamp/SalesStaff';
import Meta from '../components/shared/Meta';
import {
  buildHomeJsonLd,
  buildBreadcrumbJsonLd,
} from '../libs/seo/organizationJsonLd';

const Page = () => {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://packagingschool.com';
  const { organization, website } = buildHomeJsonLd(siteUrl);
  const breadcrumb = buildBreadcrumbJsonLd(
    [{ name: 'Sales Bootcamp', path: '/sales-bootcamp' }],
    siteUrl,
  );

  return (
    <>
      <Meta
        title={'Packaging School | Sandler Training Packaging Sales Fast Track'}
        description={
          'This introductory course is designed to give a complete overview of the Sandler Selling System concepts as they apply to packaging sales, along with actionable steps that you or your team can implement from the first day to immediately start to improve performance.'
        }
        url='/sales-bootcamp'
        structuredData={[organization, website, breadcrumb]}
      />
      <div className='flex flex-col gap-12'>
        <SalesHeroVideo />
        <SalesFeatures />
        <SalesDetails />
        <CourseScroller
          headline='Bootcamp also includes 2 courses taught by The Packaging School'
          subheadline='Packaging Foundations plus a materials course of your choosing.'
          link={'/sales-bootcamp-registration-page'}
          link_text={'Register Now'}
          category='Materials'
        />
        <SalesStaff />
        <GradientCTA
          headline='Ready to Work Together?'
          subheadline="Let's Get Training."
          buttonText='Register Now'
          buttonLink='/sales-bootcamp-registration-page'
        />
      </div>
    </>
  );
};

export default Page;
