import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

function Navbar() {

    const { status } = useSession();

    async function logoutHandler() {
        await signOut({ redirect: false });

        window.location.href = '/';
    }

    return (
        <nav>
            <ul>
                <li>
                    <Link href='/'>Home</Link>
                </li>
                <li>
                    {
                        status === 'loading' ? '...' : (
                            status === 'authenticated' ? (
                                <button onClick={logoutHandler}>Logout</button>
                            ) : (
                                <Link href='/login'>Login</Link>
                            )
                        )
                    }
                </li>
            </ul>

        </nav>
    );
}

export default Navbar;