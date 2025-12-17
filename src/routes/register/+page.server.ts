import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { AuthService } from '$lib/server/auth/auth.service';
import { setSessionCookie } from '$lib/server/http/session-cookie';

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const form = await request.formData();

    const email = String(form.get('email') ?? '').trim();
    const password = String(form.get('password') ?? '');

    if (!email || !password) {
      return fail(400, { error: 'Email and password are required' });
    }

    if (password.length < 8) {
      return fail(400, { error: 'Password must be at least 8 characters' });
    }

    const result = await AuthService.safeRegister(email, password);
    if (!result.ok) {
      return fail(400, { error: result.error });
    }

    const session = await AuthService.login(email, password);
    if (!session) {
      return fail(500, { error: 'Failed to create session' });
    }

    setSessionCookie(cookies, session._id!.toHexString());

    throw redirect(302, '/dashboard');
  }
};
