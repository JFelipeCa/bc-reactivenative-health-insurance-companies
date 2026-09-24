import { useQuery } from '@tanstack/react-query';
import { fetchCoverages } from '../api/coverages';

export function useCoverages() {
  return useQuery({ queryKey: ['coverages'], queryFn: fetchCoverages });
}
