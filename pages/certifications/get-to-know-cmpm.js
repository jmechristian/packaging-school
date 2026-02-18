import React from 'react';
import dynamic from 'next/dynamic';
import CertificateHero from '../../components/certifications/cmpm/CertificateHero';
import CertificateNavigation from '../../components/certifications/cmpm/CertificateNavigation';
import CertificateAbout from '../../components/certifications/cmpm/CertificateAbout';
import Meta from '../../components/shared/Meta';
import { buildCertificationJsonLd } from '../../libs/seo/certificationJsonLd';

const CMPMHow = dynamic(
  () => import('../../components/certifications/cmpm/CMPMHow'),
  { ssr: false, loading: () => <div className='w-full h-64 bg-gray-100 animate-pulse rounded-lg' /> }
);
const CertificateCirriculum = dynamic(
  () => import('../../components/certifications/cmpm/CertificateCirriculum'),
  { ssr: false, loading: () => <div className='w-full h-64 bg-gray-100 animate-pulse rounded-lg' /> }
);
const Testimonial = dynamic(
  () => import('../../components/shared/Testimonial'),
  { ssr: false }
);
const CMPMWhere = dynamic(
  () => import('../../components/certifications/cmpm/CMPMWhere'),
  { ssr: false, loading: () => <div className='w-full h-48 bg-gray-100 animate-pulse rounded-lg' /> }
);
const CMPMReviews = dynamic(
  () => import('../../components/certifications/cmpm/CMPMReviews'),
  { ssr: false, loading: () => <div className='w-full h-64 bg-gray-100 animate-pulse rounded-lg' /> }
);
const CMPMPDP = dynamic(
  () => import('../../components/forms/cmpm/CMPMPDP'),
  { ssr: false, loading: () => <div className='w-full h-48 bg-gray-100 animate-pulse rounded-lg' /> }
);
const GradientCTA = dynamic(
  () => import('../../components/GradientCTA'),
  { ssr: false }
);

const Page = () => {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://packagingschool.com';
  const cmpmCert = {
    title: 'Certificate of Mastery in Packaging Management (CMPM)',
    description:
      'A 12-week, PhD-led certificate program ideal for ambitious professionals seeking to advance their career in the packaging industry and for companies actively seeking future leaders and rising stars to lead their teams.',
    seoImage: 'https://packschool.s3.amazonaws.com/cmpm-seoImage-sm.webp',
    link: `${siteUrl}/certifications/get-to-know-cmpm`,
  };
  const cmpmJsonLd = buildCertificationJsonLd(cmpmCert, siteUrl);

  return (
    <>
      <Meta
        title={'Certificate of Mastery in Packaging Management (CMPM)'}
        description={
          'A 12-week, PhD-led certificate program ideal for ambitious professionals seeking to advance their career in the packaging industry and for companies actively seeking future leaders and rising stars to lead their teams.'
        }
        image={'https://packschool.s3.amazonaws.com/cmpm-seoImage-sm.webp'}
        keywords={
          'Global Competitive Landscape, Project Management Essentials, Regulations, Sustainability, Materials, Package Design, Packaging Development Workflow, Capital Equipment, Manufacturing, Logistics, Supply Chain Management, certification'
        }
        structuredData={[
          cmpmJsonLd?.breadcrumb,
          cmpmJsonLd?.credential,
        ].filter(Boolean)}
      />
      <div className='flex flex-col dark:bg-dark-dark gap-28 md:gap-36 lg:gap-48'>
        <CertificateHero />
        <div className='flex flex-col gap-6 md:gap-12 lg:gap-24'>
          <CertificateNavigation />
          <CertificateAbout />
        </div>
        {/* <CertificateWhat /> */}
        <CMPMHow />
        <CertificateCirriculum />
        <Testimonial
          id='testimonial-from-tommy-stroman'
          author={{
            name: 'Sheridyn Gasser',
            role: 'Structural / Graphic Designer',
            image: 'https://packschool.s3.amazonaws.com/sharw.jpeg',
          }}
        >
          <p>
            “I have greatly broadened my knowledge of the packaging industry as
            a whole, which was exactly what I hoped to gain from this program. I
            highly recommend this program to anyone who wants to take a deeper
            dive into the industry!”
          </p>
        </Testimonial>
        <CMPMWhere />
        <CMPMReviews />
        <CMPMPDP
          headline='Looking to sharpen your expertise in a specific area?'
          subheadline='This program has been expertly crafted to align with your unique goals. Share your information with us, and we’ll tailor the experience to your ambitions. Brace yourself for the remarkable ways this program will empower you to achieve your objectives like never before. '
          buttonText='Get My PDP Plan'
          buttonLink='/cmpm-custom-development-plan-registration'
        />
        {/* <div className='w-full max-w-7xl mx-auto'>
          <iframe
            src='https://calendar.google.com/calendar/appointments/schedules/AcZssZ2eiEThi0l71vZZ9rsXQ1nFF-4Tx7v_8ODrjYRgu0EnGTkLRttKa4-OSmoYtBI5DyqP7C9qegRr?gv=true'
            style={{ border: '0' }}
            width='100%'
            height='1000'
            frameborder='0'
          ></iframe>
        </div> */}
      </div>
    </>
  );
};

export default Page;
