import { json } from '@sveltejs/kit';
import { checkHealth } from '$lib/server/health/health.service';

export const GET = async () => {
  const health = await checkHealth();
  return json(health);
};
