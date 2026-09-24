import { createMMKV } from 'react-native-mmkv';

const memoryCache = new Map<string, string>();
let cache: ReturnType<typeof createMMKV> | null = null;
try { cache = createMMKV({ id: 'health-coverage-cache' }); } catch { /* Expo Go falls back to memory. */ }

export function readCachedCoverages(): string | null {
  try { return cache?.getString('coverages') ?? memoryCache.get('coverages') ?? null; }
  catch { return memoryCache.get('coverages') ?? null; }
}

export function writeCachedCoverages(value: string): void {
  memoryCache.set('coverages', value);
  try { cache?.set('coverages', value); } catch { /* Expo Go cannot persist MMKV data. */ }
}
