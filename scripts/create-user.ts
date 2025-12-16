import { getDb } from './db';
import { hashPassword } from '../src/lib/server/auth/password.service';

async function main() {
  const db = await getDb();
  const users = db.collection('users');

  await users.insertOne({
    email: 'admin@mudra.dev',
    passwordHash: await hashPassword('password123'),
    createdAt: new Date()
  });

  console.log('User created');
  process.exit(0);
}

main();
