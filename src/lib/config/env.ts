import { z } from 'zod';

const schema = z.object({
  MONGODB_URI: z.string().min(1),
  MONGODB_NAME: z.string().min(1)
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  console.error(parsed.error.format());
  throw new Error('Invalid environment variables');
}

export const env = parsed.data;
