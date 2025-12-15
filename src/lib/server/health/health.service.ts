import { getDb } from '$lib/server/db/mongo';

export async function checkHealth() {
  const db = await getDb();
  await db.command({ ping: 1 });

  return {
    status: 'ok',
    time: new Date().toISOString()
  };
}
