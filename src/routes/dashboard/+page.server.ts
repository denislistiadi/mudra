import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { toSessionDTO } from '$lib/server/auth/session.dto';

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.session) {
    throw redirect(302, '/login');
  }

  return {
    session: toSessionDTO(locals.session)
  };
};
