import { create } from 'zustand';

type HealthStore = {
  selectedPlan: string;
  favoriteCoverages: string[];
  selectPlan: (plan: string) => void;
  toggleFavorite: (coverageId: string) => void;
};

export const useHealthStore = create<HealthStore>((set) => ({
  selectedPlan: 'Familiar',
  favoriteCoverages: [],
  selectPlan: (selectedPlan) => set({ selectedPlan }),
  toggleFavorite: (coverageId) =>
    set((state) => ({
      favoriteCoverages: state.favoriteCoverages.includes(coverageId)
        ? state.favoriteCoverages.filter((id) => id !== coverageId)
        : [...state.favoriteCoverages, coverageId],
    })),
}));
