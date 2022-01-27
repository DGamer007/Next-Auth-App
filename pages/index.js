import { useSession } from 'next-auth/react';

function HomePage() {

  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <h1>Loading...</h1>
    );
  }

  return (
    <>
      {status === 'authenticated' ? <h1>HomePage</h1> : <h1>Landing Page</h1>}
    </>
  );
}

export default HomePage;