import { getSession, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

function UserProfilePage() {

    // const [status, setStatus] = useState('loading');

    // useEffect(() => {
    //     getSession().then(session => {
    //         setStatus('authenticated');
    //         if (!session) {
    //             window.location.href = '/login';
    //         }
    //     });
    // });

    // return <h1>Status : {status}</h1>;

    const { status } = useSession();

    if (status === 'loading') {
        return <h1>Loading...</h1>;
    }

    return (<>
        <h1>DGamer007</h1>

        {
            status === 'authenticated' ? <p>Private Repository 1</p> : null
        }
    </>
    );
}

export default UserProfilePage;