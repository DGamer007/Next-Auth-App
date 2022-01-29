import { useRef } from 'react';
import { signIn } from 'next-auth/react';
import { useAuth } from '../../contexts/AuthContext';

function Signup() {

    const [, setPortalState] = useAuth();

    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const userNameInputRef = useRef();

    async function onSubmitHandler(e) {
        e.preventDefault();

        const request = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: emailInputRef?.current.value,
                password: passwordInputRef?.current.value,
                userName: userNameInputRef?.current.value
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

            const result = await signIn('credentials', {
                identifier: emailInputRef.current.value,
                password: passwordInputRef.current.value,
                redirect: false
            });

            if (!result.ok) {
                alert(result.error);
                return;
            }

            setPortalState(false);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <form onSubmit={onSubmitHandler}>
            <input type='text' placeholder='Username' ref={userNameInputRef} required />
            <input type='email' placeholder='Email' ref={emailInputRef} required />
            <input type='password' placeholder='Password' ref={passwordInputRef} required />
            <button type='submit'>Sign Up</button>
        </form>
    );
}

export default Signup;