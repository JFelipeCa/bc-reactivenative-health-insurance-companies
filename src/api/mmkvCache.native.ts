const memoryCache = new Map<string, string>();
type MmkvCache = ReturnType<typeof import('react-native-mmkv').createMMKV>;
let cache: MmkvCache | null = null;

// Expo Go does not include NitroModules. Load MMKV lazily so its native-module
// error can be caught and the app can continue with the in-memory cache.
try {
  const { createMMKV } = require('react-native-mmkv');
  cache = createMMKV({ id: 'health-coverage-cache' });
} catch {
  cache = null;
}

export function readCachedCoverages(): string | null {
  try { return cache?.getString('coverages') ?? memoryCache.get('coverages') ?? null; }
  catch { return memoryCache.get('coverages') ?? null; }
}

export function writeCachedCoverages(value: string): void {
  memoryCache.set('coverages', value);
  try { cache?.set('coverages', value); } catch { /* Keep the in-memory value. */ }
}