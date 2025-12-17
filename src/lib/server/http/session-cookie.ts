import type { Cookies } from '@sveltejs/kit';

const isProd = process.env.NODE_ENV === 'production';

export function setSessionCookie(
  cookies: Cookies,
  sessionId: string
) {
  cookies.set('session_id', sessionId, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: isProd
  });
}
