import { SessionProvider } from 'next-auth/react';
import Layout from '../components/layout/Layout';
import '../styles/globals.css';
import LoginPage from './login';
import SignupPage from './signup';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {

  return (
    <SessionProvider session={session}>
      {
        (Component !== LoginPage && Component !== SignupPage) ? (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        ) : (
          <Component {...pageProps} />
        )
      }
    </SessionProvider>
  );
}

export default MyApp;
