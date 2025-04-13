import axios from 'axios';

const API_BASE_URL = 'https://podstreamb.vercel.app/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  }
);

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Admin API endpoints with headers added
export const adminApi = {
  addUser: (userData) => 
    axios.post('https://podstreamb.vercel.app/api/admin/users', userData, {
      headers: getAuthHeader()
    }),

  getStats: () =>
    axios.get('https://podstreamb.vercel.app/api/admin/stats', {
      headers: getAuthHeader()
    }),

  getUsers: (page = 1, search = '', role = '') =>
    axios.get(`https://podstreamb.vercel.app/api/admin/users?page=${page}&search=${search}&role=${role}`, {
      headers: getAuthHeader()
    }),

  getPodcasts: (page = 1, search = '', category = '') =>
    axios.get(`https://podstreamb.vercel.app/api/admin/podcasts?page=${page}&search=${search}&category=${category}`, {
      headers: getAuthHeader()
    }),

  getCategories: () =>
    axios.get('https://podstreamb.vercel.app/api/admin/categories', {
      headers: getAuthHeader()
    }),

  getTags: () =>
    axios.get('https://podstreamb.vercel.app/api/admin/tags', {
      headers: getAuthHeader()
    }),

  deleteUser: (userId) =>
    axios.delete(`https://podstreamb.vercel.app/api/admin/users/${userId}`, {
      headers: getAuthHeader()
    }),

  updateUserRole: (userId, role) =>
    axios.patch(`https://podstreamb.vercel.app/api/admin/users/${userId}/role`, { role }, {
      headers: getAuthHeader()
    }),

  createCategory: (data) =>
    axios.post('https://podstreamb.vercel.app/api/admin/categories', data, {
      headers: getAuthHeader()
    }),

  updateCategory: (id, data) =>
    axios.put(`https://podstreamb.vercel.app/api/admin/categories/${id}`, data, {
      headers: getAuthHeader()
    }),

  deleteCategory: (id) =>
    axios.delete(`https://podstreamb.vercel.app/api/admin/categories/${id}`, {
      headers: getAuthHeader()
    }),

  createTag: (data) =>
    axios.post('https://podstreamb.vercel.app/api/admin/tags', data, {
      headers: getAuthHeader()
    }),

  updateTag: (id, data) =>
    axios.put(`https://podstreamb.vercel.app/api/admin/tags/${id}`, data, {
      headers: getAuthHeader()
    }),

  deleteTag: (id) =>
    axios.delete(`https://podstreamb.vercel.app/api/admin/tags/${id}`, {
      headers: getAuthHeader()
    }),

  deletePodcast: (podcastId) =>
    axios.delete(`https://podstreamb.vercel.app/api/admin/podcasts/${podcastId}`, {
      headers: getAuthHeader()
    }),

  updatePodcastStatus: (podcastId, status) =>
    axios.patch(`https://podstreamb.vercel.app/api/admin/podcasts/${podcastId}/status`, { status }, {
      headers: getAuthHeader()
    }),
  updatePodcast: (podcastId, podcastData) =>
    axios.put(`https://podstreamb.vercel.app/api/admin/podcasts/${podcastId}`, podcastData, {
      headers: getAuthHeader()
    }),

  getAnalytics: (period = 'week') =>
    axios.get(`https://podstreamb.vercel.app/api/admin/analytics?period=${period}`, {
      headers: getAuthHeader()
    }),

  getReports: () =>
    axios.get('https://podstreamb.vercel.app/api/admin/reports', {
      headers: getAuthHeader()
    }),

  generateReport: (type, format) =>
    axios.post('https://podstreamb.vercel.app/api/admin/reports/generate', { type, format }, {
      headers: getAuthHeader()
    })
};

export default api;
