import { getSession, useSession } from 'next-auth/react';
import { useState } from 'react';
import ChangePasswordForm from '../components/user/ChangePasswordForm';
import BackDrop from '../components/auth/BackDrop';
import connectDatabase from '../utils/database.util';
import styles from '../styles/Home.module.css';

function UserProfilePage({ userName, email, status, isOwner }) {

    status = useSession().status;
    const [changePasswordState, setChangePasswordState] = useState(false);

    if (status === 'loading') {
        return (<h1>Loading...</h1>);
    }

    return (
        <main className={styles.main}>
            <h1>{userName}</h1>
            <h3>{email}</h3>
            {
                isOwner && (
                    <>
                        <button className={styles.button} onClick={() => setChangePasswordState(true)}>Change Account Password</button>
                        {
                            changePasswordState && (
                                <>
                                    <ChangePasswordForm setChangePasswordState={setChangePasswordState} />
                                    <BackDrop setPortalState={setChangePasswordState} />
                                </>
                            )
                        }
                    </>
                )
            }
        </main>
    );
}

export async function getServerSideProps({ req, params }) {

    const { username } = params;
    const props = {};

    const session = await getSession({ req });

    !session ? props.status = 'unauthenticated' : props.status = 'authenticated';

    let client;

    try {
        client = await connectDatabase();

        try {
            const db = client.db();

            const user = await db.collection('users').findOne({ userName: username });

            if (!user) {
                return { notFound: true };
            }

            props.userName = user.userName;
            props.email = user.email;

            if (session && (session.user.userName === user.userName)) props.isOwner = true;
        } catch (err) {
            return {
                notFound: true
            };
        }
    } catch (err) {
        return {
            notFound: true
        };
    }

    return {
        props
    };
}

export default UserProfilePage;