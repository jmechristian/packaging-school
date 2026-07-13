import Link from 'next/link';
import React from 'react';
import GradientCTA from '../components/GradientCTA';
import CenteredTextHeader from '../components/layout/CenteredTextHeader';
import CourseCard from '../components/course-card/CourseCard';
import Meta from '../components/shared/Meta';
import {
  buildHomeJsonLd,
  buildBreadcrumbJsonLd,
} from '../libs/seo/organizationJsonLd';

const Index = () => {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://packagingschool.com';
  const { organization, website } = buildHomeJsonLd(siteUrl);
  const breadcrumb = buildBreadcrumbJsonLd(
    [{ name: 'Automotive Courses', path: '/automotive-courses' }],
    siteUrl,
  );

  return (
    <>
      <Meta
        title={'Automotive Packaging Courses'}
        description={
          'We visited leading experts at PakFab (Returnable Metal Packaging), Tree Brand Packaging (Expendable Packaging – Wood), NTIC Excor Zerust (Comprehensive Corrosion Control), and IPS (Packaging Distributor) to develop industry-specific education from the people who know it best.'
        }
        image={'https://packschool.s3.amazonaws.com/autocourses-seoImage.webp'}
        url='/automotive-courses'
        structuredData={[organization, website, breadcrumb]}
      />
      <div className='w-full flex justify-center items-center bg-base-mid mt-24'>
        <div className='flex gap-12 max-w-7xl mx-auto py-4'>
          <div className='font-greycliff text-white font-semibold text-lg'>
            <Link href='/automotive-resources'>Free Resources</Link>
          </div>
          <div className='font-greycliff text-white font-semibold text-lg'>
            <Link href='https://autopacksummit.com'>AutoPack Summit</Link>
          </div>
          <div className='font-greycliff text-white font-semibold text-lg'>
            <Link href='/certificates'>Certificates</Link>
          </div>
          <div className='font-greycliff text-white font-semibold text-lg'>
            <Link href='/courses/hazmat-packaging'>Hazmat</Link>
          </div>
        </div>
      </div>
      <CenteredTextHeader
        headline='We Teach Automotive Packaging.'
        subhead='Level-up your automotive packaging IQ with expert-led courses.'
      />
      <div className='max-w-5xl mx-auto px-6 lg:px-0 pb-44 pt-12'>
        <div className='grid md:grid-cols-2 gap-12'>
          <CourseCard
            newWidth='w-full'
            title={'Transport Testing 101'}
            desc={
              'The Packaging School in partnership with BMW and Clemson’s Distribution Testing Lab brings you this overview of the required ISTA, ASTM, and DIN ship-tests for BMW’s new protocol. Instructed by Dr. Gregory Batt, Director of the Sonoco Transport Package Testing Laboratory.'
            }
            price={'FREE'}
            slug={'/courses/bmw-distribution-testing'}
            category={'MATERIALS'}
          />
          <CourseCard
            newWidth='w-full'
            title={'Packaging Bootcamp 101'}
            desc={
              "This Boot Camp will serve as an introduction to the packaging industry and provide the fundamental knowledge necessary to get you up to speed. Packaging 101 BootCamp runs over 20 work days, with an investment of less than 20 minutes per day. With eight hours of educational content, activities, and cheat sheets, you'll exit with a solid foundation in packaging basics. Departments such as marketing, sales, procurement, legal, distribution, quality control, manufacturing and warehousing all have unique demands on the packaging. After taking this course, you will have the thought process required of a successful stakeholder in the packaging development process."
            }
            price={'97'}
            slug={'/courses/packaging-boot-camp'}
            category={'INDUSTRY'}
          />
          <CourseCard
            newWidth='w-full'
            title={'HAZMAT Packaging Certificate Courses'}
            desc={
              'This course is designed to provide basic information about common dangerous goods transported in the automotive industry. It will cover the many requirements associated with transporting dangerous goods.'
            }
            price={'99'}
            slug={
              '/courses/hazmat-packaging-certificate-for-automotive-applications'
            }
            category={'SUPPLYCHAIN'}
          />
          <CourseCard
            newWidth='w-full'
            title={'Automotive Packaging Certificate'}
            desc={
              'To make this course, our team visited leading experts at PakFab (Returnable Metal Packaging), Tree Brand Packaging (Expendable Packaging – Wood), and NTIC Excor Zerust (Comprehensive Corrosion Control), and IPS (Packaging Distributor).'
            }
            price={'2400'}
            slug={'/certificates/get-to-know-cps'}
            category={'INDUSTRY'}
          />
        </div>
      </div>
      <GradientCTA
        headline='Ready to Elevate Your Career?'
        subheadline='Try a demo, risk-free.'
        buttonText='Get Started For Free'
        secondaryButtonText='Need More Info?'
      />
    </>
  );
};

export default Index;
