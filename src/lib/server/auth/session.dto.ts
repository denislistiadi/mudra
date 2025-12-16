import type { Session } from './session.model';

export interface SessionDTO {
  id: string;
  userId: string;
  expiresAt: string;
}

export function toSessionDTO(session: Session): SessionDTO {
  return {
    id: session._id!.toHexString(),
    userId: session.userId,
    expiresAt: session.expiresAt.toISOString()
  };
}
