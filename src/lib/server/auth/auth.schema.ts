import { z } from 'zod';

export const loginSchema = z.object({
	email: z.string('Email wajib diisi').email('Format email tidak valid'),
	password: z.string('Password wajib diisi').min(8, 'Password minimal 8 karakter')
});

export const registerSchema = z
	.object({
		email: z.string('Email wajib diisi').email('Format email tidak valid'),
		password: z.string('Password wajib diisi').min(8, 'Password minimal 8 karakter'),
		confirmPassword: z.string('Konfirmasi password wajib diisi')
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Password tidak sama',
		path: ['confirmPassword']
	});

export type RegisterSchema = z.infer<typeof registerSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
