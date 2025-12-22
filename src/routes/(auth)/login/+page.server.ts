import { fail, redirect, type Actions } from '@sveltejs/kit';
import { AuthService } from '$lib/server/auth/auth.service';
import { setSessionCookie } from '$lib/server/http/session-cookie';
import { loginSchema } from '$lib/server/auth/auth.schema';
import type { AuthFormErrors } from '$lib/types/form-error';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const formData = Object.fromEntries(await request.formData());

		const parsed = loginSchema.safeParse(formData);
		if (!parsed.success) {
			const errors = parsed.error.flatten().fieldErrors;
			return fail(400, {
				errors: errors as AuthFormErrors,
				formError: errors as AuthFormErrors
			});
		}

		const { email, password } = parsed.data;

		const session = await AuthService.login(email, password);
		if (!session) {
			const formError: AuthFormErrors = {
				email: ['Email atau password salah'],
				password: []
			};

			return fail(400, { formError });
		}

		setSessionCookie(cookies, session._id!.toHexString());

		throw redirect(302, '/dashboard');
	}
};
