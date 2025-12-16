import type { BaseModel } from '$lib/server/db/base.model';

export interface Session extends BaseModel {
  userId: string;
  expiresAt: Date;
}
