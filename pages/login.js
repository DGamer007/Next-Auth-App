import { useRef } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

function LoginPage() {

    const identifierInputRef = useRef();
    const passwordInputRef = useRef();
    const router = useRouter();

    async function onSubmitHandler(e) {
        e.preventDefault();

        const options = {
            identifier: identifierInputRef.current.value.trim(),
            password: passwordInputRef.current.value.trim(),
            redirect: false,
        };

        const result = await signIn('credentials', options);

        if (!result.ok) {
            alert(result.error);
        }

        router.back();
    }

    return (
        <>
            <form onSubmit={onSubmitHandler}>
                <input type='text' placeholder='Username or Email' ref={identifierInputRef} required />
                <input type='password' placeholder='Password' ref={passwordInputRef} required />
                <button type='submit'>Login</button>
            </form>
            <Link href='/signup'>Create a new Account</Link>
            <Link href='/'>Go Home</Link>
        </>
    );
}

export default LoginPage;