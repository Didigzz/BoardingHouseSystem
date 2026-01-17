import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';
import { QueryClient } from '@tanstack/react-query';
import superjson from 'superjson';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';

// Placeholder AppRouter type - replace with actual import when API package is ready
// import type { AppRouter } from '@bhms/api';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AppRouter = any;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const trpc = createTRPCReact<AppRouter>() as any;

const getBaseUrl = () => {
  const debuggerHost = Constants.expoConfig?.hostUri;
  const localhost = debuggerHost?.split(':')[0];

  if (!localhost) {
    return 'http://localhost:3000';
  }
  return `http://${localhost}:3000`;
};

export const getAuthToken = async () => {
  try {
    return await SecureStore.getItemAsync('auth_token');
  } catch {
    return null;
  }
};

export const setAuthToken = async (token: string) => {
  await SecureStore.setItemAsync('auth_token', token);
};

export const removeAuthToken = async () => {
  await SecureStore.deleteItemAsync('auth_token');
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 2,
    },
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const trpcClient = (trpc as any).createClient({
  links: [
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
      transformer: superjson,
      async headers() {
        const token = await getAuthToken();
        return {
          authorization: token ? `Bearer ${token}` : '',
        };
      },
    }),
  ],
});
