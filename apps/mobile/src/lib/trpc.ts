import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';
import { QueryClient } from '@tanstack/react-query';
import superjson from 'superjson';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';
import type { AppRouter } from '@bhms/api';

export const trpc = createTRPCReact<AppRouter>();

const getBaseUrl = () => {
  const debuggerHost = Constants.expoConfig?.hostUri;
  const localhost = debuggerHost?.split(':')[0];

  if (!localhost) {
    return 'http://localhost:3001'; // API server port
  }
  return `http://${localhost}:3001`;
};

export const getAuthToken = async () => {
  try {
    return await SecureStore.getItemAsync('auth_token');
  } catch {
    return null;
  }
};

export const setAuthToken = async (token: string | null) => {
  if (token === null) {
    await SecureStore.deleteItemAsync('auth_token');
  } else {
    await SecureStore.setItemAsync('auth_token', token);
  }
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

export const trpcClient = trpc.createClient({
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
