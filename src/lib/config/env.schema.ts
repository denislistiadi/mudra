import { z } from 'zod';

export const envSchema = z.object({
  MONGODB_URI: z.string().min(1),
  MONGODB_NAME: z.string().min(1)
});

export type Env = z.infer<typeof envSchema>;
