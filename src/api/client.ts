import axios, { type InternalAxiosRequestConfig } from 'axios';
import { clearTokens, readTokens, saveTokens } from './tokenStorage';
import { useHealthStore } from '../store';

const demoBaseUrl = 'https://dummyjson.com';
export const apiBaseUrl = process.env.EXPO_PUBLIC_API_URL?.replace(/\/$/, '') ?? '';
const authBaseUrl = apiBaseUrl || demoBaseUrl;

export const apiClient = axios.create({ baseURL: authBaseUrl, timeout: 12_000 });

type RetriableConfig = InternalAxiosRequestConfig & { _retry?: boolean };
let refreshTask: Promise<{ accessToken: string; refreshToken: string }> | null = null;

apiClient.interceptors.request.use(async (config) => {
  const tokens = await readTokens();
  if (tokens?.accessToken) config.headers.set('Authorization', `Bearer ${tokens.accessToken}`);
  return config;
});

apiClient.interceptors.response.use((response) => response, async (error: unknown) => {
  if (!axios.isAxiosError(error)) throw error;
  const config = error.config as RetriableConfig | undefined;
  if (error.response?.status !== 401 || !config || config._retry) throw error;

  config._retry = true;
  const tokens = await readTokens();
  if (!tokens?.refreshToken) {
    await clearTokens();
    useHealthStore.getState().signOut();
    throw error;
  }

  try {
    refreshTask ??= axios.post<{ accessToken: string; refreshToken: string }>(`${authBaseUrl}/auth/refresh`, {
      refreshToken: tokens.refreshToken,
      expiresInMins: 30,
    }).then((response) => response.data).finally(() => { refreshTask = null; });
    const refreshedTokens = await refreshTask;
    await saveTokens(refreshedTokens);
    config.headers.set('Authorization', `Bearer ${refreshedTokens.accessToken}`);
    return apiClient.request(config);
  } catch (refreshError) {
    await clearTokens();
    useHealthStore.getState().signOut();
    throw refreshError;
  }
});

export async function loginWithDemoCredentials(username: string, password: string): Promise<void> {
  const { data } = await apiClient.post<{ accessToken: string; refreshToken: string }>('/auth/login', {
    username,
    password,
    expiresInMins: 30,
  });
  await saveTokens(data);
  try {
    await apiClient.get('/auth/me');
  } catch (error) {
    await clearTokens();
    throw error;
  }
}

export async function logoutMember(): Promise<void> {
  await clearTokens();
}
