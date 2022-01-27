import { hashPassword } from '../../../utils/auth.util';
import connectDatabase from '../../../utils/database.util';

async function signup(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not Allowed' });
    return;
  }

  const { userName, email, password } = req.body;

  if (!email || !email.includes('@') || !password || password.trim().length < 7 || password.includes('password')) {
    res.status(422).json({ message: 'Invalid Input/Data.' });
    return;
  }

  let client;

  try {

    client = await connectDatabase();
    const db = client.db();

    try {

      let existingUser = await db.collection('users').findOne({ email });

      if (existingUser) {
        res.status(422).json({ message: 'Email already available' });
        client.close();
        return;
      }

      existingUser = await db.collection('users').findOne({ userName });

      if (existingUser) {
        res.status(422).json({ message: 'Username already available' });
        client.close();
        return;
      }

    } catch (err) {
      console.error(err);
      throw new Error('Failed to find an Existing User');
    }

    try {
      const result = await db
        .collection('users')
        .insertOne({
          email,
          password: await hashPassword(password),
          userName
        });

      console.log(result);

      res.status(201).json({ message: 'User Created' });
      client.close();

    } catch (err) {
      console.error(err);
      throw new Error('Failed to store data');
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
    client.close();
  }
}

export default signup;
