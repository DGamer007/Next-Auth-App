import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';

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
        <nav>
            <ul>
                <li>
                    <Link href='/'>Home</Link>
                </li>
                {
                    status !== 'loading' && (
                        <li>
                            {
                                status === 'authenticated' ? (
                                    <button onClick={logoutHandler}>Logout</button>
                                ) : (
                                    <button onClick={loginHandler}>Login</button>
                                )
                            }
                        </li>
                    )
                }

                {status === 'authenticated' && <li><Link href={`/${session.user.userName}`}>Profile</Link></li>}
            </ul>

        </nav>
    );
}

export default Navbar;