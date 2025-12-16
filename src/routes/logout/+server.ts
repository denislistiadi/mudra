import { redirect, type RequestHandler } from '@sveltejs/kit';
import { AuthService } from '$lib/server/auth/auth.service';

export const POST: RequestHandler = async ({ cookies }) => {
  const sessionId = cookies.get('session_id');
  if (sessionId) {
    await AuthService.invalidateSession(sessionId);
    cookies.delete('session_id', { path: '/' });
  }

  throw redirect(302, '/login');
};
