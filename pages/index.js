import { useSession } from 'next-auth/react';
import Loading from '../components/layout/Loading';
import HomePage from '../components/pages/HomePage';
import LandingPage from '../components/pages/LandingPage';

function Home() {

  const { status } = useSession();


  if (status === 'loading') {
    return (
      <Loading />
    );
  }

  return (
    <>
      {status === 'authenticated' ? <HomePage /> : <LandingPage />}
    </>
  );
}

export default Home;