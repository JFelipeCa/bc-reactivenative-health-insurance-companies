import { create } from 'zustand';

type HealthStore = {
  selectedPlan: string;
  favoritecoverages: string[];
  selectPlan: (plan: string) => void;
  toggleFavorite: (coverageId: string) => void;
};

export const useHealthStore = create<HealthStore>((set) => ({
  selectedPlan: 'Familiar',
  favoritecoverages: [],
  selectPlan: (selectedPlan) => set({ selectedPlan }),
  toggleFavorite: (coverageId) =>
    set((state) => ({
      favoritecoverages: state.favoritecoverages.includes(coverageId)
        ? state.favoritecoverages.filter((id) => id !== coverageId)
        : [...state.favoritecoverages, coverageId],
    })),
}));
