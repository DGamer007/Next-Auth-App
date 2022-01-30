import { useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { signIn } from 'next-auth/react';
import styles from '../../styles/AuthPages.module.css';

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
        <section className={styles.container}>
            <h1>Login</h1>
            <form className={styles.form} onSubmit={onSubmitHandler}>
                <div className={styles.field}>
                    <label htmlFor='identifier'>
                        <img src='/assets/user.png' />
                    </label>
                    <input type='text' id='identifier' spellCheck='false' placeholder='Username or Email' ref={identifierInputRef} required />
                </div>
                <div className={styles.field}>
                    <label htmlFor='password'><img src='/assets/key.png' /></label>
                    <input type='password' id='password' spellCheck='false' placeholder='Password' ref={passwordInputRef} required />
                </div>
                <div className={styles.actions}>
                    <button type='submit'>Login</button>
                </div>
            </form>
        </section>
    );
}

export default Login;