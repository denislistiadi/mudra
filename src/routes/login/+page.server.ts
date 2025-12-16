import { fail, redirect, type Actions } from '@sveltejs/kit';
import { AuthService } from '$lib/server/auth/auth.service';

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = String(data.get('email'));
    const password = String(data.get('password'));

    const session = await AuthService.login(email, password);
    if (!session) {
      return fail(400, { error: 'Invalid credentials' });
    }

    cookies.set('session_id', session._id!.toHexString(), {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure:  process.env.NODE_ENV === 'production'
    });

    throw redirect(302, '/dashboard');
  }
};
