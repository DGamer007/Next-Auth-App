import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useAuth } from '../../contexts/AuthContext';
import Login from './Login';
import Signup from './Signup';
import styles from '../../styles/AuthOverlay.module.css';

function AuthOverlay() {

    const [, setPortalState] = useAuth();

    const [authState, setAuthState] = useState('login'); // 'login' or 'signup'

    function toggleAuth() {
        setAuthState(prevState => prevState === 'login' ? 'signup' : 'login');
    }

    return createPortal((
        <section className={styles.container}>
            <div className={styles.closeButton}>
                <button onClick={() => setPortalState(false)}></button>
            </div>
            {
                authState === 'login' ? <Login /> : <Signup />
            }
            <a onClick={toggleAuth}>
                {
                    authState === 'login' ? 'Create new Account' : 'Already have an Account ?'
                }
            </a>
        </section>
    ), document.getElementById('authentication'));
}

export default AuthOverlay;