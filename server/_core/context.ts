import type { inferAsyncReturnType } from '@trpc/server';
import type { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import { verifyToken, extractTokenFromHeader } from './auth';
import type { JWTPayload } from './auth';

export interface User {
  id: number;
  email: string;
  role: string;
}

export async function createContext(opts: CreateExpressContextOptions) {
  const { req, res } = opts;

  // Get token from header or cookie
  const authHeader = req.headers.authorization;
  const tokenFromHeader = extractTokenFromHeader(authHeader);
  const tokenFromCookie = req.cookies?.camperfit_token;
  const token = tokenFromHeader || tokenFromCookie;

  let user: User | null = null;

  if (token) {
    try {
      const payload = verifyToken(token);
      user = {
        id: payload.userId,
        email: payload.email,
        role: payload.role,
      };
    } catch (error) {
      // Invalid token, user remains null
    }
  }

  return {
    req,
    res,
    user,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;

