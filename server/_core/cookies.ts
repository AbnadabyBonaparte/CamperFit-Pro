import type { Request, Response } from 'express';

const TOKEN_COOKIE_NAME = 'camperfit_token';

export function setTokenCookie(res: Response, token: string) {
  res.cookie(TOKEN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
}

export function getTokenFromCookie(req: Request): string | null {
  return req.cookies[TOKEN_COOKIE_NAME] || null;
}

export function clearTokenCookie(res: Response) {
  res.clearCookie(TOKEN_COOKIE_NAME);
}

