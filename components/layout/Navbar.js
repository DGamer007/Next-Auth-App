import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import styles from '../../styles/Navbar.module.css';

function Navbar() {

    const { data: session, status } = useSession();

    const [, setPortalState] = useAuth();

    async function logoutHandler() {
        await signOut({ redirect: false });

        window.location.href = '/';
    }

    function loginHandler() {
        setPortalState(true);
    }

    return (
        <header className={styles.header}>
            <Link href="/">
                <a>
                    <div className={styles.logo}>{'DGamer\' NextAuth'}</div>
                </a>
            </Link>
            <nav>
                <ul>
                    {
                        status === 'authenticated' && (
                            <li><Link href={`/${session.user.userName}`}>Profile</Link></li>
                        )
                    }
                    {
                        status !== 'loading' && (
                            <li>
                                {
                                    status === 'authenticated' ? (
                                        <a onClick={logoutHandler}>Logout</a>
                                    ) : (
                                        <a onClick={loginHandler}>Login</a>
                                    )
                                }
                            </li>
                        )
                    }
                </ul>

            </nav>
        </header>
    );
}

export default Navbar;