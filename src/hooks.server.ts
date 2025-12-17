import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';
import { AuthService } from '$lib/server/auth/auth.service';
import { usersCollection } from '$lib/server/db/collections';
import type { User } from '$lib/server/auth/user.model';
import { PUBLIC_ROUTES } from '$lib/config/route.config';

export const handle: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get('session_id');

	event.locals.user = null;

	if (sessionId) {
		const session = await AuthService.validateSession(sessionId);

		if (session) {
			const users = await usersCollection<User>();
			const user = await users.findOne(
				{ _id: new ObjectId(session.userId) },
				{ projection: { email: 1 } }
			);

			if (user) {
				event.locals.user = {
					id: user._id!.toHexString(),
					email: user.email
				};
			}
		}
	}

	const pathname = event.url.pathname;
	const isPublic = PUBLIC_ROUTES.some((p) => pathname.startsWith(p));

	if (!event.locals.user && !isPublic) {
		throw redirect(302, '/login');
	}

	if (event.locals.user && isPublic) {
		throw redirect(302, '/dashboard');
	}

	return resolve(event);
};
