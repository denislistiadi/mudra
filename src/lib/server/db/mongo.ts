import { MongoClient } from 'mongodb';
import { appEnv } from '$lib/config/env.svelte';

let client: MongoClient | null = null;

export async function getDb() {
  if (!client) {
    client = new MongoClient(appEnv.MONGODB_URI);
    await client.connect();
  }
  return client.db(appEnv.MONGODB_NAME);
}
