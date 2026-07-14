import '../styles/globals.css';
import Script from 'next/script';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Layout from '../features/layout/Layout';
import { store } from '../features/store';
import { Provider } from 'react-redux';
import { Amplify } from 'aws-amplify';
import { UserProvider, useUser } from '@auth0/nextjs-auth0/client';
import awsExports from '../src/aws-exports';
import DefaultMeta from '../components/shared/DefaultMeta';
import {
  ensureAbSessionId,
  ensureAbVisitorId,
  setAbIdentity,
  trackAbNavNext,
  trackAbEngagement,
  refreshAbSessionCookie,
  trackAbPageView,
  trackAbSessionEnd,
} from '../libs/analytics';

Amplify.configure(awsExports);

// Syncs the Auth0 identity into the analytics layer so userID/email ride on
// every event once the visitor is known. Must live inside <UserProvider>.
function AbIdentitySync() {
  const { user } = useUser();
  useEffect(() => {
    if (!user?.email) return;
    // Key identity on email: it matches how the order webhook attributes sales
    // and how purchase-intent is stored, so a logged-in visitor's browsing links
    // to their eventual purchase via the abEventByEmail GSI. (userID is left to
    // callers that have the real app user id, e.g. the checkout flow.)
    setAbIdentity({ email: user.email });
  }, [user]);
  return null;
}

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const lastPathRef = useRef(null);

  const normalizePath = (url) => {
    if (!url) return '';
    const [noQuery] = String(url).split('?');
    const [noHash] = noQuery.split('#');
    return noHash || '';
  };

  useEffect(() => {
    ensureAbSessionId();
    ensureAbVisitorId();
    refreshAbSessionCookie();
    lastPathRef.current = normalizePath(window.location.pathname);

    trackAbPageView({
      pagePath: normalizePath(window.location.pathname),
      source: 'initial_load_app',
    });

    // Scroll-depth engagement: fire once per threshold per page so the analytics
    // codebase can see how deeply visitors engage on the road to purchase.
    const firedScrollDepths = new Set();
    const SCROLL_DEPTH_THRESHOLDS = [25, 50, 75, 100];

    const handleScrollDepth = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const percent = Math.min(
        100,
        Math.round((window.scrollY / scrollable) * 100),
      );
      SCROLL_DEPTH_THRESHOLDS.forEach((threshold) => {
        if (percent >= threshold && !firedScrollDepths.has(threshold)) {
          firedScrollDepths.add(threshold);
          trackAbEngagement({
            pagePath: normalizePath(window.location.pathname),
            metric: 'scroll_depth',
            value: threshold,
            source: 'scroll',
          });
        }
      });
    };

    const handleRouteChangeComplete = (url) => {
      const nextPath = normalizePath(url);
      const previousPath = lastPathRef.current;
      if (nextPath === previousPath) return;

      lastPathRef.current = nextPath;
      firedScrollDepths.clear();
      refreshAbSessionCookie();

      if (previousPath && previousPath !== nextPath) {
        trackAbNavNext({
          pagePath: previousPath,
          nextPath,
          source: 'route_change',
        });
      }

      trackAbPageView({
        pagePath: nextPath,
        previousPath,
        source: 'route_change',
      });
    };

    let inactivityTimer = null;
    const INACTIVITY_MS = 30 * 60 * 1000;

    const resetInactivityTimer = () => {
      if (inactivityTimer) window.clearTimeout(inactivityTimer);
      inactivityTimer = window.setTimeout(() => {
        trackAbSessionEnd({
          pagePath: window.location.pathname,
          reason: 'inactivity_timeout',
        });
      }, INACTIVITY_MS);
    };

    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    window.addEventListener('mousemove', resetInactivityTimer);
    window.addEventListener('keydown', resetInactivityTimer);
    window.addEventListener('scroll', resetInactivityTimer, { passive: true });
    window.addEventListener('scroll', handleScrollDepth, { passive: true });
    window.addEventListener('click', resetInactivityTimer);
    resetInactivityTimer();

    return () => {
      if (inactivityTimer) window.clearTimeout(inactivityTimer);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      window.removeEventListener('mousemove', resetInactivityTimer);
      window.removeEventListener('keydown', resetInactivityTimer);
      window.removeEventListener('scroll', resetInactivityTimer);
      window.removeEventListener('scroll', handleScrollDepth);
      window.removeEventListener('click', resetInactivityTimer);
    };
  }, [router.events]);

  return (
    <UserProvider>
      <AbIdentitySync />
      <Script
        strategy='lazyOnload'
        src='https://www.googletagmanager.com/gtag/js?id=G-02DBGHP71V'
      />
      <Script
        id='google-analytics'
        strategy='lazyOnload'
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5H8KXB9');`,
        }}
      />
      <Script
        id='hotjar'
        strategy='lazyOnload'
        dangerouslySetInnerHTML={{
          __html: `(function(h,o,t,j,a,r){
h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
h._hjSettings={hjid:3554961,hjsv:6};
a=o.getElementsByTagName('head')[0];
r=o.createElement('script');r.async=1;
r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
a.appendChild(r);
})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
        }}
      />
      <Provider store={store}>
        <DefaultMeta />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </UserProvider>
  );
}
