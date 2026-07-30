import Meta from '../../components/shared/Meta';
import { buildCertificationJsonLd } from '../../libs/seo/certificationJsonLd';
import CmpmLandingB from '../../components/certifications/cmpm/variantB/CmpmLandingB';

const Page = () => {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://packagingschool.com';
  const cmpmCert = {
    title:
      'Certificate of Mastery in Packaging Management | Clemson-Backed, PhD-Led',
    description:
      'Clemson-backed, PhD-mentored packaging certificate for professionals and career-changers alike—with a built-in work project and full course-library access for the rest of the year after you finish.',
    seoImage: 'https://packschool.s3.amazonaws.com/cmpm-seoImage-sm.webp',
    link: `${siteUrl}/certifications/get-to-know-cmpm-b`,
  };
  const cmpmJsonLd = buildCertificationJsonLd(cmpmCert, siteUrl);

  return (
    <>
      <Meta
        title={
          'Certificate of Mastery in Packaging Management | Clemson-Backed, PhD-Led'
        }
        description={
          'Clemson-backed, PhD-mentored packaging certificate for professionals and career-changers alike—with a built-in work project and full course-library access for the rest of the year after you finish.'
        }
        image={'https://packschool.s3.amazonaws.com/cmpm-seoImage-sm.webp'}
        keywords={
          'Certificate of Mastery, Clemson University, Packaging Development Plan, PhD mentorship, packaging certificate, Package Development Plan, executive packaging education'
        }
        structuredData={[
          cmpmJsonLd?.breadcrumb,
          cmpmJsonLd?.credential,
        ].filter(Boolean)}
      />
      <CmpmLandingB />
    </>
  );
};

export default Page;
