import { z } from 'zod';

export const loginSchema = z.object({
	email: z.string('Email wajib diisi').email('Format email tidak valid'),
	password: z.string('Password wajib diisi').min(8, 'Password minimal 8 karakter')
});

export type LoginSchema = z.infer<typeof loginSchema>;
