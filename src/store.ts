import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage, persist } from 'zustand/middleware';

type HealthStore = {
  selectedPlan: string;
  favoriteCoverages: string[];
  selectPlan: (plan: string) => void;
  toggleFavorite: (coverageId: string) => void;
};

export const useHealthStore = create<HealthStore>()(persist((set) => ({
  selectedPlan: 'Familiar',
  favoriteCoverages: [],
  selectPlan: (selectedPlan) => set({ selectedPlan }),
  toggleFavorite: (coverageId) =>
    set((state) => ({
      favoriteCoverages: state.favoriteCoverages.includes(coverageId)
        ? state.favoriteCoverages.filter((id) => id !== coverageId)
        : [...state.favoriteCoverages, coverageId],
    })),
}), {
  name: 'health-insurance-preferences',
  storage: createJSONStorage(() => AsyncStorage),
}));
