import type { Collection, Document } from 'mongodb';
import { getDb } from './mongo';

export async function usersCollection<T extends Document>(): Promise<Collection<T>> {
	const db = await getDb();
	return db.collection<T>('users');
}

export async function sessionsCollection<T extends Document>(): Promise<Collection<T>> {
	const db = await getDb();
	return db.collection<T>('sessions');
}
