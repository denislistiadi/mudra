import type { BaseModel } from '$lib/server/db/base.model';

export interface User extends BaseModel {
  email: string;
  passwordHash: string;
}
