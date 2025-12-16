import 'dotenv/config';
import { MongoClient } from 'mongodb';
import { nodeEnv } from '../src/lib/config/env.node';

let client: MongoClient | null = null;

export async function getDb() {
  if (!client) {
    client = new MongoClient(nodeEnv.MONGODB_URI);
    await client.connect();
  }
  return client.db(nodeEnv.MONGODB_NAME);
}
