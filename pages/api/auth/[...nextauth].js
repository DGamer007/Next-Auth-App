import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { verifyPassword } from '../../../utils/auth.util';
import connectDatabase from '../../../utils/database.util';

const config = {
    session: {
        secret: process.env.TOKEN_SECRET,
        jwt: true
    },
    providers: [
        CredentialsProvider({
            async authorize({ identifier, password }) {
                let client;

                try {

                    client = await connectDatabase();

                    const db = client.db();

                    let user = await db.collection('users').findOne({ email: identifier });
                    if (user) {
                        user.password = await verifyPassword(password, user.password);

                        if (!user.password) {
                            throw new Error('Invalid Password');
                        }

                        return { identifier };
                    }

                    user = await db.collection('users').findOne({ userName: identifier });
                    client.close();
                    if (user) {
                        user.password = await verifyPassword(password, user.password);
                        if (!user.password) {
                            throw new Error('Invalid Password');
                        }
                        return { identifier };
                    }

                } catch (err) {
                    console.error(err);
                    client.close();
                    throw new Error(err.message || 'User not found');
                }
            }
        })
    ]
};

export default NextAuth(config);