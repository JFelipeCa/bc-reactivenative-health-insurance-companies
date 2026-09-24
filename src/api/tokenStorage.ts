import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const ACCESS_TOKEN_KEY = 'health-coverage-access-token';
const REFRESH_TOKEN_KEY = 'health-coverage-refresh-token';

export type AuthTokens = { accessToken: string; refreshToken?: string };

function assertNativeSecureStore() {
  if (Platform.OS === 'web') throw new Error('El almacenamiento seguro de sesión requiere iOS o Android.');
}

export async function saveTokens(tokens: AuthTokens): Promise<void> {
  assertNativeSecureStore();
  await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, tokens.accessToken);
  if (tokens.refreshToken) await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, tokens.refreshToken);
  else await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
}

export async function readTokens(): Promise<AuthTokens | null> {
  if (Platform.OS === 'web') return null;
  const [accessToken, refreshToken] = await Promise.all([
    SecureStore.getItemAsync(ACCESS_TOKEN_KEY),
    SecureStore.getItemAsync(REFRESH_TOKEN_KEY),
  ]);
  return accessToken ? { accessToken, refreshToken: refreshToken ?? undefined } : null;
}

export async function clearTokens(): Promise<void> {
  if (Platform.OS === 'web') return;
  await Promise.all([
    SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY),
    SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY),
  ]);
}
