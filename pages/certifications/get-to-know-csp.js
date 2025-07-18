import React from 'react';
import VideoPlayer from '../../components/VideoPlayer';
import CSPHero from '../../components/certifications/csp/CSPHero';
import CSPMissionStatement from '../../components/certifications/csp/CSPMissionStatement';
import CSPNav from '../../components/certifications/csp/CSPNav';
import CSPWhat from '../../components/certifications/csp/CSPWhat';
import CSPHow from '../../components/certifications/csp/CSPHow';
import CSPWhere from '../../components/certifications/csp/CSPWhere';
import CSPBio from '../../components/certifications/csp/CSPBio';
import Meta from '../../components/shared/Meta';
import { createNewOrder } from '../../helpers/api';
import { useThinkificLink } from '../../hooks/useThinkificLink';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const Page = () => {
  const { awsUser } = useSelector((state) => state.auth);
  const { navigateToThinkific } = useThinkificLink();
  const router = useRouter();
  const orderHandler = async (cert) => {
    const orderId = await createNewOrder({
      courseDescription:
        "The Packaging School's program helps professionals master sustainable design, creating company champions. Discover the dos and don'ts of sustainable packaging and drive impactful change in your organization.",
      courseDiscount: 0,
      courseImage: 'https://packschool.s3.amazonaws.com/csp-seoImage-1-sm.png',
      courseName: 'Certificate of Sustainable Packaging (CSP)',
      courseLink: `https://learn.packagingschool.com/enroll/2772370?price_id=3600658`,
      total: 2400,
      userID: awsUser ? awsUser.id : null,
      email: awsUser ? awsUser.email : null,
      name: awsUser ? awsUser.name : null,
    });

    if (awsUser && awsUser.name.includes(' ')) {
      navigateToThinkific(
        `https://learn.packagingschool.com/enroll/2772370?price_id=3600658`,
        `https://learn.packagingschool.com/enroll/2772370?price_id=3600658`
      );
    } else {
      router.push(`/order/${orderId.id}`);
    }
  };

  return (
    <>
      <Meta
        title={'Certificate of Sustainable Packaging (CSP)'}
        description={
          'Master sustainable packaging with our certificate program: learn sustainability terms, UN goals, system creation, carbon footprint, neutrality via offsets, and LCA software usage for design.'
        }
        keywords={
          'sustainability terms, UN goals, system creation, carbon footprint, neutrality via offsets, LCA software'
        }
        image={'https://packschool.s3.amazonaws.com/csp-seoImage-1-sm.png'}
      />
      <div className='w-full h-full flex flex-col gap-12 lg:!gap-36 pt-6 md:!pt-20 pb-20 dark:bg-dark-dark'>
        <CSPHero orderHandler={orderHandler} />
        <CSPNav />
        <div className='flex flex-col gap-12 md:!gap-48'>
          <CSPWhat />
          {/* <CSPMissionStatement /> */}
          <CSPHow />
          <CSPWhere />
          <CSPBio />
        </div>
      </div>
    </>
  );
};

export default Page;
