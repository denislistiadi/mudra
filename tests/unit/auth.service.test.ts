import { describe, it, expect, beforeAll } from 'vitest';
import { AuthService } from '$lib/server/auth/auth.service';
import { getDb } from '$lib/server/db/mongo';

beforeAll(async () => {
  const db = await getDb();
  await db.collection('users').deleteMany({});
  await db.collection('sessions').deleteMany({});
});

describe('AuthService', () => {
  it('registers a user', async () => {
    const user = await AuthService.register(
      'test@mudra.dev',
      'password123'
    );

    expect(user.email).toBe('test@mudra.dev');
    expect(user.passwordHash).not.toBe('password123');
  });

  it('logs in with correct credentials', async () => {
    const session = await AuthService.login(
      'test@mudra.dev',
      'password123'
    );

    expect(session).toBeTruthy();
    expect(session?.userId).toBeTruthy();
  });

  it('rejects wrong password', async () => {
    const session = await AuthService.login(
      'test@mudra.dev',
      'wrong-password'
    );

    expect(session).toBeNull();
  });
});
