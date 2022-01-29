import { useRef } from 'react';

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
            console.error(err.message);
        }
    }

    return (
        <section>
            <button onClick={() => setChangePasswordState(false)}>Close</button>
            <form onSubmit={onSubmitHandler}>
                <input type='password' ref={newPasswordInputRef} placeholder='New Password' required />
                <input type='password' ref={currentPasswordInputRef} placeholder='Current Password' required />
                <button type='submit'>Change Password</button>
            </form>
        </section>
    );
}

export default ChangePasswordForm;