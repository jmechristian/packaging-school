import Meta from '../../components/shared/Meta';
import { buildCertificationJsonLd } from '../../libs/seo/certificationJsonLd';
import CmpmLandingB from '../../components/certifications/cmpm/variantB/CmpmLandingB';
import CertContextNav from '../../components/certifications/CertContextNav';

const META = {
  title:
    'Certificate of Mastery in Packaging Management (CMPM) | Clemson-Backed, PhD-Led',
  description:
    'Clemson-backed, PhD-mentored packaging certificate for professionals and career-changers alike—with a built-in work project and full course-library access for the rest of the year after you finish.',
};

const Page = () => {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://packagingschool.com';
  const cmpmCert = {
    title: META.title,
    description: META.description,
    seoImage: 'https://packschool.s3.us-east-1.amazonaws.com/default-seo.webp',
    link: `${siteUrl}/certifications/get-to-know-cmpm`,
  };
  const cmpmJsonLd = buildCertificationJsonLd(cmpmCert, siteUrl);

  return (
    <>
      <Meta
        title={META.title}
        description={META.description}
        image={'https://packschool.s3.us-east-1.amazonaws.com/default-seo.webp'}
        keywords={
          'CMPM, Clemson University, Packaging Development Plan, PhD mentorship, packaging certificate, Package Development Plan, executive packaging education'
        }
        structuredData={[cmpmJsonLd?.breadcrumb, cmpmJsonLd?.credential].filter(
          Boolean,
        )}
      />
      <CertContextNav active='cmpm' />
      <CmpmLandingB />
    </>
  );
};

export default Page;
