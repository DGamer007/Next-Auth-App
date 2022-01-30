import { useRef } from 'react';
import styles from '../../styles/ChangePasswordForm.module.css';

function ChangePasswordForm({ setChangePasswordState }) {

    const newPasswordInputRef = useRef();
    const currentPasswordInputRef = useRef();

    async function onSubmitHandler(e) {
        e.preventDefault();

        const request = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                newPassword: newPasswordInputRef.current.value,
                currentPassword: currentPasswordInputRef.current.value
            })
        };

        try {
            const response = await fetch('/api/user/change-password', request);

            let data;

            try {
                data = await response.json();
            } catch (err) {
                throw new Error('Unable to parse response data');
            }

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            setChangePasswordState(false);
        } catch (err) {
            console.error(err.message || err);
            alert(err.message || err);
        }
    }

    return (
        <section className={styles.container}>
            <div className={styles.closeButton}>
                <button onClick={() => setChangePasswordState(false)}></button>
            </div>
            <h1>Change Account Password</h1>
            <form className={styles.form} onSubmit={onSubmitHandler}>
                <input type='password' spellCheck='false' ref={newPasswordInputRef} placeholder='New Password' required />
                <input type='password' spellCheck='false' ref={currentPasswordInputRef} placeholder='Current Password' required />
                <div className={styles.actions}>
                    <button type='submit'>Change Password</button>
                </div>
            </form>
        </section>
    );
}

export default ChangePasswordForm;