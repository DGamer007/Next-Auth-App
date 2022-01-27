import { MongoClient } from 'mongodb';

async function connectDatabase() {
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017/auth-app');
        return client;

    } catch (err) {
        console.error(err);
        throw new Error('Database Connection refused.');
    }
}

export default connectDatabase;