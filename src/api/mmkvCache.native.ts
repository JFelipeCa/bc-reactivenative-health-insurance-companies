import { createMMKV } from 'react-native-mmkv';

const cache = createMMKV({ id: 'health-coverage-cache' });

export function readCachedCoverages(): string | null {
  return cache.getString('coverages') ?? null;
}

export function writeCachedCoverages(value: string): void {
  cache.set('coverages', value);
}
