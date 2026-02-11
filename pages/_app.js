import '../styles/globals.css';
import Layout from '../features/layout/Layout';
import { store } from '../features/store';
import { Provider } from 'react-redux';
import { Amplify } from 'aws-amplify';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import awsExports from '../src/aws-exports';
import DefaultMeta from '../components/shared/DefaultMeta';

Amplify.configure(awsExports);

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Provider store={store}>
        <DefaultMeta />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </UserProvider>
  );
}
