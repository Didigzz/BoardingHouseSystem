import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Room API calls
export const roomAPI = {
  getAllRooms: () => api.get('/rooms'),
  getRoomById: (id) => api.get(`/rooms/${id}`),
  createRoom: (data) => api.post('/rooms', data),
  updateRoom: (id, data) => api.put(`/rooms/${id}`, data),
  deleteRoom: (id) => api.delete(`/rooms/${id}`),
  getRoomOccupancy: (id) => api.get(`/rooms/${id}/occupancy`),
};

// Boarder API calls
export const boarderAPI = {
  getAllBoarders: () => api.get('/boarders'),
  getBoarderById: (id) => api.get(`/boarders/${id}`),
  createBoarder: (data) => api.post('/boarders', data),
  updateBoarder: (id, data) => api.put(`/boarders/${id}`, data),
  deleteBoarder: (id) => api.delete(`/boarders/${id}`),
  getBoardersByRoom: (roomId) => api.get(`/boarders/room/${roomId}`),
};

// Payment API calls
export const paymentAPI = {
  getAllPayments: () => api.get('/payments'),
  getPaymentById: (id) => api.get(`/payments/${id}`),
  createPayment: (data) => api.post('/payments', data),
  updatePayment: (id, data) => api.put(`/payments/${id}`, data),
  deletePayment: (id) => api.delete(`/payments/${id}`),
  getPaymentsByBoarder: (boarderId) => api.get(`/payments/boarder/${boarderId}`),
  getOverduePayments: () => api.get('/payments/status/overdue'),
};

// Utility API calls
export const utilityAPI = {
  getAllUtilities: () => api.get('/utilities'),
  getUtilityById: (id) => api.get(`/utilities/${id}`),
  createUtility: (data) => api.post('/utilities', data),
  updateUtility: (id, data) => api.put(`/utilities/${id}`, data),
  deleteUtility: (id) => api.delete(`/utilities/${id}`),
};

export default api;
