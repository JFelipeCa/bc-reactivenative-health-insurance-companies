const memoryCache = new Map<string, string>();

export function readCachedCoverages(): string | null {
  return memoryCache.get('coverages') ?? null;
}

export function writeCachedCoverages(value: string): void {
  memoryCache.set('coverages', value);
}
