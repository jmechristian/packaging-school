import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import CertificateHero from '../../components/certifications/cmpm/CertificateHero';
import CertificateNavigation from '../../components/certifications/cmpm/CertificateNavigation';
import CertificateAbout from '../../components/certifications/cmpm/CertificateAbout';
import Meta from '../../components/shared/Meta';
import { buildCertificationJsonLd } from '../../libs/seo/certificationJsonLd';
import {
  CMPM_EXPERIMENT_KEY,
  chooseCmpmVariant,
  createCmpmVariantCookieValue,
  getAllowedCmpmVariants,
  getCmpmVariantFromCookieHeader,
} from '../../libs/abVariant';
import { trackAbExposure, withCmpmExperiment } from '../../libs/analytics';
import CmpmLandingB from '../../components/certifications/cmpm/variantB/CmpmLandingB';
import CertContextNav from '../../components/certifications/CertContextNav';

const CMPMHow = dynamic(
  () => import('../../components/certifications/cmpm/CMPMHow'),
  {
    ssr: false,
    loading: () => (
      <div className='w-full h-64 bg-gray-100 animate-pulse rounded-lg' />
    ),
  },
);
const CertificateCirriculum = dynamic(
  () => import('../../components/certifications/cmpm/CertificateCirriculum'),
  {
    ssr: false,
    loading: () => (
      <div className='w-full h-64 bg-gray-100 animate-pulse rounded-lg' />
    ),
  },
);
const Testimonial = dynamic(() => import('../../components/shared/Testimonial'), {
  ssr: false,
});
const CMPMWhere = dynamic(
  () => import('../../components/certifications/cmpm/CMPMWhere'),
  {
    ssr: false,
    loading: () => (
      <div className='w-full h-48 bg-gray-100 animate-pulse rounded-lg' />
    ),
  },
);
const CMPMReviews = dynamic(
  () => import('../../components/certifications/cmpm/CMPMReviews'),
  {
    ssr: false,
    loading: () => (
      <div className='w-full h-64 bg-gray-100 animate-pulse rounded-lg' />
    ),
  },
);
const CMPMPDP = dynamic(
  () => import('../../components/forms/cmpm/CMPMPDP'),
  {
    ssr: false,
    loading: () => (
      <div className='w-full h-48 bg-gray-100 animate-pulse rounded-lg' />
    ),
  },
);

const META_A = {
  title: 'Certificate of Mastery in Packaging Management (CMPM)',
  description:
    'A 12-week, PhD-led certificate program ideal for ambitious professionals seeking to advance their career in the packaging industry and for companies actively seeking future leaders and rising stars to lead their teams.',
};

const META_B = {
  title:
    'Certificate of Mastery in Packaging Management (CMPM) | Clemson-Backed, PhD-Led',
  description:
    'Clemson-backed, PhD-mentored packaging certificate for professionals and career-changers alike—with a built-in work project and full course-library access for the rest of the year after you finish.',
};

function ClassicCmpmLanding() {
  return (
    <div className='flex flex-col dark:bg-dark-dark gap-28 md:gap-36 lg:gap-48'>
      <CertificateHero />
      <div className='flex flex-col gap-6 md:gap-12 lg:gap-24'>
        <CertificateNavigation />
        <CertificateAbout />
      </div>
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
          “I have greatly broadened my knowledge of the packaging industry as a
          whole, which was exactly what I hoped to gain from this program. I
          highly recommend this program to anyone who wants to take a deeper dive
          into the industry!”
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
    </div>
  );
}

const Page = ({ variant }) => {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://packagingschool.com';
  const isB = variant === 'B';
  const meta = isB ? META_B : META_A;
  const cmpmCert = {
    title: meta.title,
    description: meta.description,
    seoImage: 'https://packschool.s3.amazonaws.com/cmpm-seoImage-sm.webp',
    link: `${siteUrl}/certifications/get-to-know-cmpm`,
  };
  const cmpmJsonLd = buildCertificationJsonLd(cmpmCert, siteUrl);

  useEffect(() => {
    trackAbExposure(
      withCmpmExperiment({
        experimentKey: CMPM_EXPERIMENT_KEY,
        variant,
        pagePath: '/certifications/get-to-know-cmpm',
        source: 'cmpm_landing_ssr',
      }),
    );
  }, [variant]);

  return (
    <>
      <Meta
        title={meta.title}
        description={meta.description}
        image={'https://packschool.s3.amazonaws.com/cmpm-seoImage-sm.webp'}
        keywords={
          isB
            ? 'CMPM, Clemson University, Packaging Development Plan, PhD mentorship, packaging certificate, Package Development Plan, executive packaging education'
            : 'Global Competitive Landscape, Project Management Essentials, Regulations, Sustainability, Materials, Package Design, Packaging Development Workflow, Capital Equipment, Manufacturing, Logistics, Supply Chain Management, certification'
        }
        structuredData={[
          cmpmJsonLd?.breadcrumb,
          cmpmJsonLd?.credential,
        ].filter(Boolean)}
      />
      <CertContextNav active='cmpm' />
      {isB ? <CmpmLandingB /> : <ClassicCmpmLanding />}
    </>
  );
};

export async function getServerSideProps({ req, res, query }) {
  const existingVariant = getCmpmVariantFromCookieHeader(req.headers.cookie);
  const overrideRaw =
    typeof query?.ab_variant === 'string' ? query.ab_variant : null;
  const overrideVariant =
    overrideRaw &&
    getAllowedCmpmVariants().includes(overrideRaw.toUpperCase())
      ? overrideRaw.toUpperCase()
      : null;
  const variant = overrideVariant || existingVariant || chooseCmpmVariant();

  if (!existingVariant || overrideVariant) {
    const nextCookie = createCmpmVariantCookieValue(
      variant,
      req.headers.host,
    );
    const currentSetCookie = res.getHeader('Set-Cookie');
    const normalized = Array.isArray(currentSetCookie)
      ? currentSetCookie
      : currentSetCookie
        ? [currentSetCookie]
        : [];
    res.setHeader('Set-Cookie', [...normalized, nextCookie]);
  }

  res.setHeader(
    'Cache-Control',
    'private, no-cache, no-store, max-age=0, must-revalidate',
  );

  return {
    props: {
      variant,
    },
  };
}

export default Page;
