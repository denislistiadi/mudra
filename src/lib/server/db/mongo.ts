import { MongoClient, Db } from 'mongodb';
import { env } from '$lib/config/env';

let client: MongoClient;
let db: Db;

export async function getDb(): Promise<Db> {
  if (db) return db;

  client = new MongoClient(env.MONGODB_URI);
  await client.connect();

  db = client.db(env.MONGODB_NAME);
  return db;
}
