import { initTRPC, TRPCError } from '@trpc/server';
import type { Context } from './context';
import { verifyToken, extractTokenFromHeader } from './auth';

const t = initTRPC.context<Context>().create({
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        code: error.code,
      },
    };
  },
});

export const router = t.router;
export const publicProcedure = t.procedure;

// Protected procedure - requires authentication
export const protectedProcedure = t.procedure.use(async (opts) => {
  const { ctx } = opts;

  if (!ctx.user) {
    // Try to get token from header or cookie
    const authHeader = ctx.req.headers.authorization;
    const tokenFromHeader = extractTokenFromHeader(authHeader);
    const tokenFromCookie = ctx.req.cookies?.camperfit_token;
    const token = tokenFromHeader || tokenFromCookie;

    if (token) {
      try {
        const payload = verifyToken(token);
        ctx.user = {
          id: payload.userId,
          email: payload.email,
          role: payload.role,
        };
      } catch (error) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid token',
        });
      }
    } else {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Not authenticated',
      });
    }
  }

  return opts.next({
    ctx: {
      ...ctx,
      user: ctx.user, // Now guaranteed to be non-null
    },
  });
});

