import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { readSession } from './session';

const baseURL = (import.meta.env.VITE_API_URL || 'http://localhost:3001').replace(/\/$/, '');
export const api = axios.create({ baseURL, timeout: 20000 });
export const encode = (value) => encodeURIComponent(String(value));

api.interceptors.request.use((config) => {
  const session = readSession();
  if (!['/login', '/loginT'].includes(config.url)) {
    if (!session) {
      window.dispatchEvent(new Event('depease:session-expired'));
      return Promise.reject(new axios.CanceledError('Your session has expired.'));
    }
    config.headers.Authorization = `Bearer ${session.token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && error.config?.headers?.Authorization) {
      window.dispatchEvent(new Event('depease:session-expired'));
    }
    return Promise.reject(error);
  },
);

export function errorMessage(error) {
  if (!error.response && error.isAxiosError)
    return 'We could not reach the server. Check your connection and try again.';
  const message = error.response?.data?.error || error.response?.data?.message || error.message;
  return typeof message === 'string' ? message : 'Something went wrong. Please try again.';
}

export function useData(url, options = {}) {
  return useQuery({
    queryKey: ['data', url],
    queryFn: async ({ signal }) => (await api.get(url, { signal })).data,
    enabled: Boolean(url),
    ...options,
  });
}

export function useAction(operation) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: operation,
    onSuccess: () => client.invalidateQueries(),
  });
}

export const list = (value) => (Array.isArray(value) ? value : []);
