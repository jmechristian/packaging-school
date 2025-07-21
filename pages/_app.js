import '../styles/globals.css';
import Layout from '../features/layout/Layout';
import { store } from '../features/store';
import { Provider } from 'react-redux';
import { Amplify } from 'aws-amplify';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import awsExports from '../src/aws-exports';
import { useEffect } from 'react';

Amplify.configure(awsExports);

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Only run on client
    const checkSSO = async () => {
      const res = await fetch('/api/auth/me');
      if (!res.ok) return;
      const session = await res.json();
      if (session?.needsSSO && session?.ssoUser) {
        // Call your SSO endpoint to get the SSO URL
        const ssoRes = await fetch('/api/generateJWT', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(session.ssoUser),
        });
        const ssoData = await ssoRes.json();
        if (ssoData.url) {
          // Optionally: clear the SSO flag on the server here if needed
          window.location.href = ssoData.url;
        }
      }
    };
    checkSSO();
  }, []);

  return (
    <UserProvider>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </UserProvider>
  );
}
