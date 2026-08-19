import React, { useState, useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import awsExports from '../../src/aws-exports';
import CPSHero from '../../components/certifications/cps/CPSHero';
import CPSNav from '../../components/certifications/cps/CPSNav';
import CPSWhat from '../../components/certifications/cps/CPSWhat';
import CPSAbout from '../../components/certifications/cps/CPSAbout';
import CPSHow from '../../components/certifications/cps/CPSHow';
import CPSWhere from '../../components/certifications/cps/CPSWhere';
import Testimonial from '../../components/shared/Testimonial';
import CPSReviews from '../../components/certifications/cps/CPSReviews';
import Meta from '../../components/shared/Meta';
import { getCertificates } from '../../helpers/api';
import { buildCertificationJsonLd } from '../../libs/seo/certificationJsonLd';
import CertContextNav from '../../components/certifications/CertContextNav';
Amplify.configure(awsExports);

export const Page = () => {
  const [cert, setCert] = useState(null);
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://packagingschool.com';
  const fallbackCert = {
    title: 'Certificate of Packaging Science (CPS)',
    description:
      'Ideal for professionals in the packaging or related industries seeking a comprehensive understanding of the packaging industry. With the flexibility of 6-month access, this is an excellent choice for salespeople, packaging engineers, marketing leads, operations personnel, and procurement professionals looking to gain valuable insights.',
    seoImage: 'https://packschool.s3.us-east-1.amazonaws.com/default-seo.webp',
    link: `${siteUrl}/certifications/get-to-know-cps`,
  };
  useEffect(() => {
    const fetchCertificates = async () => {
      const certificates = await getCertificates();
      setCert(certificates.find((cert) => cert.abbreviation === 'CPS'));
    };
    fetchCertificates();
  }, []);
  const cpsJsonLd = buildCertificationJsonLd(cert || fallbackCert, siteUrl);
  return (
    <>
      {/* <Head>
        <title>Packaging School | Certificate of Packaging Science</title>
        <meta
          property='og:title'
          content={`Packaging School |  Certificate of Packaging Science`}
          key='title'
        />
      </Head> */}
      <Meta
        title={'Certificate of Packaging Science (CPS)'}
        description={
          'Ideal for professionals in the packaging or related industries seeking a comprehensive understanding of the packaging industry. With the flexibility of 6-month access, this is an excellent choice for salespeople, packaging engineers, marketing leads, operations personnel, and procurement professionals looking to gain valuable insights.'
        }
        image={'https://packschool.s3.us-east-1.amazonaws.com/default-seo.webp'}
        keywords={
          'certification, packaging design, packaging materials, corrugated containers, polymers, machinery, packaging regulations'
        }
        structuredData={[cpsJsonLd?.breadcrumb, cpsJsonLd?.credential].filter(
          Boolean,
        )}
      />
      <CertContextNav active='cps' />
      <div className='flex flex-col dark:bg-dark-dark'>
        <CPSHero cert={cert} />
        <CPSNav />
        <CPSWhat />
        <CPSAbout />
        <CPSHow />
        <Testimonial
          id='testimonial'
          author={{
            name: 'Gregory Cox',
            role: 'Packaging and Containers Professional',
            image: 'https://packschool.s3.amazonaws.com/greg_cox.jpeg',
          }}
        >
          <p>
            “If you’re looking to increase your Packaging IQ. Here’s a good
            start! Despite having a degree in packaging and having worked in the
            industry for nearly 10 years, I still learned quite a bit. Very
            proud to share this achievement! Thank you Prof. Andrew Hurley, PhD,
            Julie Rice Suggs, PhD, and everyone at The Packaging School for
            putting together this program. It was a lot of fun and well
            designed! Cheers!”
          </p>
        </Testimonial>
        <CPSWhere cert={cert} />
        <CPSReviews />
      </div>
    </>
  );
};

export default Page;
