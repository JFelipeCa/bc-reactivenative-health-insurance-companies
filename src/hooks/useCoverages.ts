import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchCoverages, setRemoteFavorite } from '../api/coverages';
import { useHealthStore } from '../store';

export function useCoverages() {
  return useQuery({ queryKey: ['coverages'], queryFn: fetchCoverages });
}

export function useToggleFavorite() {
  const queryClient = useQueryClient();
  const toggleFavorite = useHealthStore((state) => state.toggleFavorite);
  return useMutation({
    mutationFn: async ({ id, nextValue }: { id: string; nextValue: boolean }) => setRemoteFavorite(id, nextValue),
    onMutate: ({ id }) => toggleFavorite(id),
    onError: (_error, { id }) => toggleFavorite(id),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['coverages'] }),
  });
}
