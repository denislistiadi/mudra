import { ObjectId } from 'mongodb';
import { usersCollection, sessionsCollection } from '$lib/server/db/collections';
import { hashPassword, verifyPassword } from './password.service';
import type { User } from './user.model';
import type { Session } from './session.model';

const SESSION_DAYS = 7;

export class AuthService {
	static async register(email: string, password: string): Promise<User> {
		const users = await usersCollection<User>();

		const user: User = {
			email,
			passwordHash: await hashPassword(password),
			createdAt: new Date()
		};

		try {
			await users.insertOne(user);
			return user;
		} catch (err: unknown) {
			if (
				typeof err === 'object' &&
				err !== null &&
				'code' in err &&
				(err as { code: number }).code === 11000
			) {
				throw new Error('EMAIL_ALREADY_EXISTS');
			}
			throw err;
		}
	}

	static async login(email: string, password: string): Promise<Session | null> {
		const users = await usersCollection<User>();
		const user = await users.findOne({ email });

		if (!user) return null;

		const ok = await verifyPassword(user.passwordHash, password);
		if (!ok) return null;

		const session: Session = {
			userId: user._id!.toHexString(),
			expiresAt: new Date(Date.now() + SESSION_DAYS * 86400_000),
			createdAt: new Date()
		};

		const sessions = await sessionsCollection<Session>();
		await sessions.insertOne(session);

		return session;
	}

	static async validateSession(sessionId: string): Promise<Session | null> {
		if (!ObjectId.isValid(sessionId)) return null;

		const sessions = await sessionsCollection<Session>();
		const session = await sessions.findOne({
			_id: new ObjectId(sessionId)
		});

		if (!session) return null;
		if (session.expiresAt < new Date()) return null;

		return session;
	}

	static async invalidateSession(sessionId: string) {
		const sessions = await sessionsCollection<Session>();
		await sessions.deleteOne({ _id: new ObjectId(sessionId) });
	}
}
