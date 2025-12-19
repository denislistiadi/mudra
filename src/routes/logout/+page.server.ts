import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { sessionsCollection } from '$lib/server/db/collections';
import type { Session } from '$lib/server/auth/session.model';
import { ObjectId } from 'mongodb';

export const actions: Actions = {
  default: async ({ cookies }) => {
    const sessionId = cookies.get('session_id');

    if (sessionId) {
      const sessions = await sessionsCollection<Session>();
      try {
        await sessions.deleteOne({ _id: new ObjectId(sessionId) });
      } catch {
        // Ignore errors during session deletion
      }
    }

    cookies.delete('session_id', { path: '/' });
    throw redirect(303, '/login');
  }
};
