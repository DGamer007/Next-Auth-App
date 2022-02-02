import { useRef } from 'react';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { useAuth } from '../../contexts/AuthContext';
import styles from '../../styles/AuthPages.module.css';

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
                throw new Error(result.error);
            }

            setPortalState(false);
        } catch (err) {
            console.error(err.message || err);
            alert(err.message);
        }
    }

    return (
        <section className={styles.container}>
            <h1>Signup</h1>
            <form className={styles.form} onSubmit={onSubmitHandler}>
                <div className={styles.field}>
                    <label htmlFor='username'>
                        <Image src='/assets/user.png' width='24' height='24' />
                    </label>
                    <input type='text' id='username' spellCheck='false' placeholder='Username' ref={userNameInputRef} required />
                </div>
                <div className={styles.field}>
                    <label htmlFor='email'>
                        <Image src='/assets/email.png' width='24' height='24' />
                    </label>
                    <input type='email' id='email' spellCheck='false' placeholder='Email' ref={emailInputRef} required />
                </div>
                <div className={styles.field}>
                    <label htmlFor='password'>
                        <Image src='/assets/key.png' width='24' height='24' />
                    </label>
                    <input type='password' id='password' spellCheck='false' placeholder='Password' ref={passwordInputRef} required />
                </div>
                <div className={styles.actions}>
                    <button type='submit'>Sign Up</button>
                </div>
            </form>
        </section>
    );
}

export default Signup;