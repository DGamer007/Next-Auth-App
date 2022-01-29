import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useAuth } from '../../contexts/AuthContext';
import Login from './Login';
import Signup from './Signup';

function AuthOverlay() {

    const [, setPortalState] = useAuth();

    const [authState, setAuthState] = useState('login'); // 'login' or 'signup'

    function toggleAuth() {
        setAuthState(prevState => prevState === 'login' ? 'signup' : 'login');
    }

    return createPortal((
        <section>
            <button onClick={() => setPortalState(false)}>Close</button>
            {
                authState === 'login' ? <Login /> : <Signup />
            }
            <button onClick={toggleAuth}>
                {
                    authState === 'login' ? 'Create a new Account' : 'Already have an Account ?'
                }
            </button>
        </section>
    ), document.getElementById('authentication'));
}

export default AuthOverlay;