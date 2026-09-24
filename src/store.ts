import { create } from 'zustand';

type HealthStore = {
  selectedPlan: string;
  favoriteCoberturass: string[];
  selectPlan: (plan: string) => void;
  toggleFavorite: (coverageId: string) => void;
};

export const useHealthStore = create<HealthStore>((set) => ({
  selectedPlan: 'Familiar',
  favoriteCoberturass: [],
  selectPlan: (selectedPlan) => set({ selectedPlan }),
  toggleFavorite: (coverageId) =>
    set((state) => ({
      favoriteCoberturass: state.favoriteCoberturass.includes(coverageId)
        ? state.favoriteCoberturass.filter((id) => id !== coverageId)
        : [...state.favoriteCoberturass, coverageId],
    })),
}));

