import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0/client';
import Meta from '../components/shared/Meta';
import { generateMetadata } from '../libs/seo/generateMetadata';
import HomeVariantB from '../components/home/variants/HomeVariantB';
import HomeVariantC from '../components/home/variants/HomeVariantC';
import SummerSavingsBanner from '../components/nav/SummerSavingsBanner';
import {
  HOME_EXPERIMENT_KEY,
  chooseVariant,
  createVariantCookieValue,
  getAllowedHomeVariants,
  getVariantFromCookieHeader,
} from '../libs/abVariant';
import {
  trackAbEngagement,
  trackAbExposure,
  trackAbNavNext,
} from '../libs/analytics';

const HOME_VARIANT_COMPONENTS = {
  B: HomeVariantB,
  C: HomeVariantC,
};

const App = ({ variant }) => {
  const router = useRouter();
  const { user } = useUser();
  const resolvedVariant = HOME_VARIANT_COMPONENTS[variant] ? variant : 'B';
  const VariantComponent = HOME_VARIANT_COMPONENTS[resolvedVariant];

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

  useEffect(() => {
    trackAbExposure({
      experimentKey: HOME_EXPERIMENT_KEY,
      variant: resolvedVariant,
      pagePath: '/',
    });

    const dwellMilestones = [10, 30, 60];
    const timers = dwellMilestones.map((seconds) =>
      window.setTimeout(() => {
        trackAbEngagement({
          experimentKey: HOME_EXPERIMENT_KEY,
          variant: resolvedVariant,
          pagePath: '/',
          metric: 'dwell_seconds',
          value: seconds,
        });
      }, seconds * 1000),
    );

    const clickHandler = (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest('a');
      if (!anchor) return;

      const nextPath = anchor.getAttribute('href');
      if (!nextPath) return;

      trackAbNavNext({
        experimentKey: HOME_EXPERIMENT_KEY,
        variant: resolvedVariant,
        pagePath: '/',
        nextPath,
      });
    };

    document.addEventListener('click', clickHandler);

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      document.removeEventListener('click', clickHandler);
    };
  }, [resolvedVariant]);

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
      <SummerSavingsBanner />
      <VariantComponent />
    </>
  );
};

export default App;

export async function getServerSideProps({ req, res, query }) {
  const existingVariant = getVariantFromCookieHeader(req.headers.cookie);
  const allowedVariants = getAllowedHomeVariants();
  const overrideQueryValue =
    typeof query?.ab_variant === 'string' ? query.ab_variant : null;
  const overrideVariant =
    overrideQueryValue &&
    allowedVariants.includes(overrideQueryValue.toUpperCase())
      ? overrideQueryValue.toUpperCase()
      : null;
  const variant = overrideVariant || existingVariant || chooseVariant();

  // Prevent intermediary caches from serving one variant to all users.
  res.setHeader('Cache-Control', 'private, no-store, no-cache, max-age=0');

  // Write one authoritative variant cookie for this host/domain.
  const nextCookie = createVariantCookieValue(variant, req.headers.host);
  const currentSetCookie = res.getHeader('Set-Cookie');
  const normalized = Array.isArray(currentSetCookie)
    ? currentSetCookie
    : currentSetCookie
      ? [currentSetCookie]
      : [];
  res.setHeader('Set-Cookie', [...normalized, nextCookie]);

  return {
    props: {
      variant,
    },
  };
}

{
  /* <div className='w-full flex bg-black aspect-[16/9]'>
              <VideoPlayer
                videoEmbedLink='https://www.youtube.com/embed/Xz1nkZfD83c'
                light={true}
                playing={true}
              />
            </div> */
}
