import '../styles/globals.css';
import Script from 'next/script';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Layout from '../features/layout/Layout';
import { store } from '../features/store';
import { Provider } from 'react-redux';
import { Amplify } from 'aws-amplify';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import awsExports from '../src/aws-exports';
import DefaultMeta from '../components/shared/DefaultMeta';
import {
  ensureAbSessionId,
  trackAbNavNext,
  refreshAbSessionCookie,
  trackAbPageView,
  trackAbSessionEnd,
} from '../libs/analytics';

Amplify.configure(awsExports);

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const lastPathRef = useRef(null);
  const lastSessionEndAtRef = useRef(0);

  const normalizePath = (url) => {
    if (!url) return '';
    const [noQuery] = String(url).split('?');
    const [noHash] = noQuery.split('#');
    return noHash || '';
  };

  useEffect(() => {
    ensureAbSessionId();
    refreshAbSessionCookie();
    lastPathRef.current = normalizePath(window.location.pathname);

    trackAbPageView({
      pagePath: normalizePath(window.location.pathname),
      source: 'initial_load_app',
    });

    const handleRouteChangeComplete = (url) => {
      const nextPath = normalizePath(url);
      const previousPath = lastPathRef.current;
      if (nextPath === previousPath) return;

      lastPathRef.current = nextPath;
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

    const handleVisibilityChange = () => {
      if (document.visibilityState !== 'hidden') return;
      const now = Date.now();
      if (now - lastSessionEndAtRef.current < 2000) return;
      lastSessionEndAtRef.current = now;
      trackAbSessionEnd({
        pagePath: normalizePath(window.location.pathname),
        reason: 'visibility_hidden',
      });
    };

    const handlePageHide = () => {
      const now = Date.now();
      if (now - lastSessionEndAtRef.current < 2000) return;
      lastSessionEndAtRef.current = now;
      trackAbSessionEnd({
        pagePath: normalizePath(window.location.pathname),
        reason: 'page_hide',
      });
    };

    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pagehide', handlePageHide);
    window.addEventListener('mousemove', resetInactivityTimer);
    window.addEventListener('keydown', resetInactivityTimer);
    window.addEventListener('scroll', resetInactivityTimer, { passive: true });
    window.addEventListener('click', resetInactivityTimer);
    resetInactivityTimer();

    return () => {
      if (inactivityTimer) window.clearTimeout(inactivityTimer);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', handlePageHide);
      window.removeEventListener('mousemove', resetInactivityTimer);
      window.removeEventListener('keydown', resetInactivityTimer);
      window.removeEventListener('scroll', resetInactivityTimer);
      window.removeEventListener('click', resetInactivityTimer);
    };
  }, [router.events]);

  return (
    <UserProvider>
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
