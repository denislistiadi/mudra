import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { AuthService } from '$lib/server/auth/auth.service';
import { setSessionCookie } from '$lib/server/http/session-cookie';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const email = String(data.get('email') || '').trim();
		const password = String(data.get('password') || '');

		if (!email || !password) {
			return fail(400, { error: 'Email and password are required' });
		}

		if (password.length < 8) {
			return fail(400, { error: 'Password must be at least 8 characters' });
		}

		try {
			await AuthService.register(email, password);
		} catch (err) {
			if (err instanceof Error && err.message === 'EMAIL_ALREADY_EXISTS') {
				return fail(400, { error: 'Email already registered' });
			}
			throw err;
		}

		const session = await AuthService.login(email, password);
		if (!session) {
			return fail(500, { error: 'Failed to create session' });
		}

		setSessionCookie(cookies, session._id!.toHexString());

		throw redirect(302, '/dashboard');
	}
};
