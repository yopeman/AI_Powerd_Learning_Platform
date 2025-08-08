import axios from 'axios';
import store from './storage';

const createApiInstance = (baseURL, requiresAuth = false) => {
  const instance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (requiresAuth) {
    instance.interceptors.request.use(
      (config) => {
        const token = store.get('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        store.clear();
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export const api = createApiInstance('http://localhost:7000/api/v1', true);
export const authApi = createApiInstance('http://localhost:7000', false);