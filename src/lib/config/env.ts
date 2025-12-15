import { z } from 'zod';
import {
  MONGODB_URI,
  MONGODB_NAME
} from '$env/static/private';

const schema = z.object({
  MONGODB_URI: z.string().min(1),
  MONGODB_NAME: z.string().min(1)
});

export const env = schema.parse({
  MONGODB_URI,
  MONGODB_NAME
});
