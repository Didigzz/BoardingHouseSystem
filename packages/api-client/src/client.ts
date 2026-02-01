import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@bhms/api';

/**
 * tRPC React hooks client
 */
export const trpc = createTRPCReact<AppRouter>();
