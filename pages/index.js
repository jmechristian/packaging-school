import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0/client';
import Meta from '../components/shared/Meta';
import { generateMetadata } from '../libs/seo/generateMetadata';
import LearningPath from '../components/home/LearningPath';
import CardFilter from '../components/home/CardFilter';
import WhyPschool from '../components/shared/WhyPschool';
import NewHomeTestimonials from '../components/home/NewHomeTestimonials';
import HomeCorporate from '../components/home/HomeCorporate';
import SelfPacedAccess from '../components/home/SelfPacedAccess';
const App = () => {
  const router = useRouter();
  const { user } = useUser();

  // Handle expired token error from Thinkific SSO
  // IMPORTANT: do NOT hijack normal navigation. We only handle this if we have a
  // stored Thinkific destination (cookie) from a prior SSO attempt.
  useEffect(() => {
    const { kind, message, return_to } = router.query;

    if (kind === 'expired_token' || message?.includes('expired')) {
      // Token expired, regenerate SSO and redirect back to the original link
      const handleExpiredToken = async () => {
        try {
          // Prefer the original Thinkific destination from query, but fall back to cookie.
          let originalReturnTo =
            typeof return_to === 'string' ? return_to : null;

          if (!originalReturnTo && typeof document !== 'undefined') {
            const cookies = document.cookie.split(';');
            const returnToCookie = cookies.find((c) =>
              c.trim().startsWith('pendingReturnTo='),
            );
            if (returnToCookie) {
              originalReturnTo = decodeURIComponent(
                returnToCookie.split('=')[1],
              );
            }
          }

          // If we don't know where to go, do nothing (don't hijack homepage).
          if (!originalReturnTo) return;

          const isExternalUrl =
            originalReturnTo.startsWith('http') ||
            originalReturnTo.includes('learn.packagingschool.com');

          if (!isExternalUrl) {
            router.replace(originalReturnTo);
            return;
          }

          // Only retry SSO if user is logged in.
          if (!user) return;

          // Retry via the server handler (keeps SSO logic centralized).
          window.location.href = `/api/auth/external-redirect?returnTo=${encodeURIComponent(
            originalReturnTo,
          )}`;
        } catch (error) {
          console.error('Error handling expired token:', error);
        }

        // Only fallback to profile if we can't regenerate SSO
        // Don't redirect away from their intended destination
        console.warn(
          'Could not regenerate SSO token, user may need to try again',
        );
      };

      handleExpiredToken();
    }
  }, [router.query, user, router]);

  const metadata = generateMetadata({
    pageType: 'STATIC',
    pathname: '/',
    title: 'Packaging School',
    description:
      'The Packaging School brings together the business, art, and science of packaging so you can lead projects, optimize supply chains, increase margins, and develop sustainable solutions.',
  });

  return (
    <>
      <Meta
        title={metadata.title}
        description={metadata.description}
        url='/'
        image='https://packschool.s3.amazonaws.com/firework-box-3.webp'
      />
      <div className='w-full flex flex-col gap-16 lg:gap-20 relative py-16 lg:!py-24'>
        {/* HOW IT WORKS */}
        {/* <SubscriptionWhat /> */}
        <SelfPacedAccess />
        {/* COURSES */}
        <CardFilter />
        <WhyPschool />
        <div className='w-full h-px bg-clemson max-w-7xl mx-auto'></div>
        <NewHomeTestimonials />
        {/* <LearningPath /> */}
        <div className='w-full h-px bg-clemson max-w-7xl mx-auto'></div>
        <HomeCorporate />
      </div>
    </>
  );
};

export default App;

{
  /* <div className='w-full flex bg-black aspect-[16/9]'>
              <VideoPlayer
                videoEmbedLink='https://www.youtube.com/embed/Xz1nkZfD83c'
                light={true}
                playing={true}
              />
            </div> */
}
