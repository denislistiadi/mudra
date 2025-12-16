import { env } from '$env/dynamic/private';
import { envSchema } from './env.schema';

export const appEnv = envSchema.parse({
	MONGODB_URI: env.MONGODB_URI,
	MONGODB_NAME: env.MONGODB_NAME
});
