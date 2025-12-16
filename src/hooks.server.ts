import type { Handle } from '@sveltejs/kit';
import { AuthService } from '$lib/server/auth/auth.service';

export const handle: Handle = async ({ event, resolve }) => {
  const sessionId = event.cookies.get('session_id');

  if (sessionId) {
    const session = await AuthService.validateSession(sessionId);

    if (session) {
      event.locals.session = session;
    } else {
      event.cookies.delete('session_id', { path: '/' });
    }
  }

  return resolve(event);
};
