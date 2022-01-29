import { getSession } from 'next-auth/react';
import connectDatabase from '../../../utils/database.util';
import { hashPassword, verifyPassword } from '../../../utils/auth.util';

async function changePassword(req, res) {
    if (req.method !== 'PATCH') {
        res.status(405).json({ message: 'Method not Allowed' });
        return;
    }

    const session = await getSession({ req });

    if (!session) {
        res.status(401).json({ message: 'Not Authenticated' });
        return;
    }

    let client;

    try {
        client = await connectDatabase();

        const db = client.db();

        try {
            const user = await db.collection('users').findOne({ email: session.user.email });

            if (!user) {
                res.status(404).json({ message: 'User not found' });
                client.close();
                return;
            }

            const { newPassword, currentPassword } = req.body;

            try {
                const isEqual = await verifyPassword(currentPassword, user.password);

                if (!isEqual) {
                    res.status(422).json({ message: 'Invalid Password' });
                    client.close();
                    return;
                }

                try {
                    await db.collection('users').updateOne({ email: session.user.email }, { $set: { password: await hashPassword(newPassword) } });

                    res.status(200).json({ message: 'Password updated successfully' });
                    return;
                } catch {
                    throw new Error('Failed to update Password');
                }

            } catch (err) {
                throw new Error(err.message || 'Failed to verify passwords');
            }

        } catch (err) {
            throw new Error(err.message || 'Failed to find an User');
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message || 'Something went wrong' });
        client.close();
        return;
    }
}

export default changePassword;