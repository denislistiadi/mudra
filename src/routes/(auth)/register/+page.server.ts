import { fail, redirect, type Actions } from '@sveltejs/kit';
import { AuthService } from '$lib/server/auth/auth.service';
import { setSessionCookie } from '$lib/server/http/session-cookie';
import { registerSchema } from '$lib/server/auth/auth.schema';
import type { AuthFormErrors } from '$lib/types/form-error';

export type ActionData = {
	errors?: AuthFormErrors;
	formError?: string;
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const formData = Object.fromEntries(await request.formData());

		const parsed = registerSchema.safeParse(formData);

		if (!parsed.success) {
			const flattened = parsed.error.flatten();

			return fail<ActionData>(400, {
				errors: flattened.fieldErrors as AuthFormErrors,
				formError: flattened.formErrors[0]
			});
		}

		const { email, password } = parsed.data;

		try {
			await AuthService.register(email, password);
		} catch (err) {
			if (err instanceof Error && err.message === 'EMAIL_ALREADY_EXISTS') {
				return fail<ActionData>(400, {
					errors: {
						email: ['Email sudah terdaftar']
					}
				});
			}

			return fail<ActionData>(500, {
				formError: 'Terjadi kesalahan server'
			});
		}

		const session = await AuthService.login(email, password);
		if (!session) {
			return fail<ActionData>(500, {
				formError: 'Gagal membuat session'
			});
		}

		setSessionCookie(cookies, session._id!.toHexString());

		throw redirect(302, '/dashboard');
	}
};
