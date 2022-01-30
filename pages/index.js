import { useSession } from 'next-auth/react';
import HomePage from '../components/pages/HomePage';
import LandingPage from '../components/pages/LandingPage';

function Home() {

  const { status } = useSession();

  if (status === 'loading') {
    return (
      <h1>Loading...</h1>
    );
  }

  return (
    <>
      {status === 'authenticated' ? <HomePage /> : <LandingPage />}
    </>
  );
}

export default Home;