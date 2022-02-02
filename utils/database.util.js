import { MongoClient } from 'mongodb';

async function connectDatabase() {
    try {
        const client = await MongoClient.connect(process.env.MONGODB_URL, {
            dbName: process.env.MONGODB_DATABASE
        });
        return client;

    } catch (err) {
        console.error(err);
        throw new Error('Database Connection refused.');
    }
}

export default connectDatabase;