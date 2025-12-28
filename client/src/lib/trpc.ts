import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../../../server/routers/_app';
import { httpBatchLink } from '@trpc/client';

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: import.meta.env.VITE_TRPC_URL || 'http://localhost:3001/api/trpc',
      credentials: 'include',
    }),
  ],
});

