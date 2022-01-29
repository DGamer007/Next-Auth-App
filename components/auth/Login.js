import { useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { signIn } from 'next-auth/react';

function Login() {

    const [, setPortalState] = useAuth();

    const identifierInputRef = useRef();
    const passwordInputRef = useRef();

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

        setPortalState(false);
        window.location.reload();
    }

    return (
        <form onSubmit={onSubmitHandler}>
            <input type='text' placeholder='Username or Email' ref={identifierInputRef} required />
            <input type='password' placeholder='Password' ref={passwordInputRef} required />
            <button type='submit'>Login</button>
        </form>
    );
}

export default Login;