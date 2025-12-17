import { fail, redirect, type Actions } from '@sveltejs/kit';
import { AuthService } from '$lib/server/auth/auth.service';
import { setSessionCookie } from '$lib/server/http/session-cookie';

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = String(data.get('email'));
    const password = String(data.get('password'));

    const session = await AuthService.login(email, password);
    if (!session) {
      return fail(400, { error: 'Invalid credentials' });
    }

    setSessionCookie(cookies, session._id!.toHexString());

    throw redirect(302, '/dashboard');
  }
};
