import Link from 'next/link';
import { useRef } from 'react';

function SignupPage() {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const userNameRef = useRef();

    async function onSubmitHandler(e) {
        e.preventDefault();

        const request = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: emailInputRef.current.value,
                password: passwordInputRef.current.value,
                userName: userNameRef.current.value
            })
        };

        try {
            const response = await fetch('/api/auth/signup', request);
            let data;

            try {
                data = await response.json();
            } catch (err) {
                throw new Error('Unable to parse response data');
            }

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong!');
            }

            console.log(data);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <form onSubmit={onSubmitHandler}>
                <input type='text' placeholder='Username' ref={userNameRef} required />
                <input type='email' placeholder='Email' ref={emailInputRef} required />
                <input type='password' placeholder='Password' ref={passwordInputRef} required />
                <button type='submit'>Sign Up</button>
            </form>
            <Link href='/login'>Already have an Account?</Link>
            <Link href='/'>Go Home</Link>
        </>
    );
}

export default SignupPage;