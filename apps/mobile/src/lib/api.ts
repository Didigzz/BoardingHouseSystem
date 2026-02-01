import { createORPCClient } from '@orpc/client';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';
import superjson from 'superjson';

// Import AppRouter type from API package
import type { AppRouter } from '@bhms/api';

// Create oRPC client
const orpcClient = createORPCClient<AppRouter>({
  baseURL: () => {
    const debuggerHost = Constants.expoConfig?.hostUri;
    const localhost = debuggerHost?.split(':')[0];

    if (!localhost) {
      return 'http://localhost:3001'; // API server port
    }
    return `http://${localhost}:3001`;
  },
  headers: async () => {
    const token = await getAuthToken();
    return {
      authorization: token ? `Bearer ${token}` : '',
    };
  },
  transformer: superjson,
});

// Auth token management
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

// Export a wrapper for the oRPC client to match existing API
export const api = {
  // Boarder operations
  boarders: {
    getAll: (input?: any) => orpcClient.boarder.getAll.query(input),
    getById: (id: string) => orpcClient.boarder.getById.query({ id }),
    create: (input: any) => orpcClient.boarder.create.mutate(input),
    update: (input: any) => orpcClient.boarder.update.mutate(input),
    delete: (id: string) => orpcClient.boarder.delete.mutate({ id }),
    assignRoom: (input: any) => orpcClient.boarder.assignRoom.mutate(input),
    getStats: () => orpcClient.boarder.getStats.query(),
  },

  // Room operations
  rooms: {
    getAll: (input?: any) => orpcClient.room.getAll.query(input),
    getById: (id: string) => orpcClient.room.getById.query({ id }),
    create: (input: any) => orpcClient.room.create.mutate(input),
    update: (input: any) => orpcClient.room.update.mutate(input),
    delete: (id: string) => orpcClient.room.delete.mutate({ id }),
    getStats: () => orpcClient.room.getStats.query(),
    getAvailableRooms: (input?: any) =>
      orpcClient.room.getAvailableRooms.query(input),
  },

  // Payment operations
  payments: {
    getAll: (input?: any) => orpcClient.payment.getAll.query(input),
    getById: (id: string) => orpcClient.payment.getById.query({ id }),
    create: (input: any) => orpcClient.payment.create.mutate(input),
    update: (input: any) => orpcClient.payment.update.mutate(input),
    markAsPaid: (input: any) => orpcClient.payment.markAsPaid.mutate(input),
    delete: (id: string) => orpcClient.payment.delete.mutate({ id }),
    getStats: (input?: any) => orpcClient.payment.getStats.query(input),
    getMonthlyRevenue: (input?: any) =>
      orpcClient.payment.getMonthlyRevenue.query(input),
  },

  // User operations
  users: {
    getProfile: () => orpcClient.user.getProfile.query(),
    updateProfile: (input: any) => orpcClient.user.updateProfile.mutate(input),
    changePassword: (input: any) =>
      orpcClient.user.changePassword.mutate(input),
    getAll: (input?: any) => orpcClient.user.getAll.query(input),
  },

  // Utility operations
  utilities: {
    getReadings: (input?: any) => orpcClient.utility.getReadings.query(input),
    createReading: (input: any) =>
      orpcClient.utility.createReading.mutate(input),
    updateReading: (input: any) =>
      orpcClient.utility.updateReading.mutate(input),
    deleteReading: (id: string) =>
      orpcClient.utility.deleteReading.mutate({ id }),
    getConsumptionSummary: (input: any) =>
      orpcClient.utility.getConsumptionSummary.query(input),
    getLatestReadings: (input?: any) =>
      orpcClient.utility.getLatestReadings.query(input),
  },

  // Dashboard operations
  dashboard: {
    getStats: (input?: any) => orpcClient.dashboard.getStats.query(input),
    getRecentActivity: (input?: any) =>
      orpcClient.dashboard.getRecentActivity.query(input),
    getUpcomingPayments: (input?: any) =>
      orpcClient.dashboard.getUpcomingPayments.query(input),
  },
};

// Export the raw client for advanced usage
export { orpcClient };
export type { AppRouter };
