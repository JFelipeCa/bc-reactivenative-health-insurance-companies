import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage, persist } from 'zustand/middleware';

type HealthStore = {
  selectedPlan: string;
  favoriteCoberturass: string[];
  selectPlan: (plan: string) => void;
  toggleFavorite: (coverageId: string) => void;
};

export const useHealthStore = create<HealthStore>()(persist((set) => ({
  selectedPlan: 'Familiar',
  favoriteCoberturass: [],
  selectPlan: (selectedPlan) => set({ selectedPlan }),
  toggleFavorite: (coverageId) =>
    set((state) => ({
      favoriteCoberturass: state.favoriteCoberturass.includes(coverageId)
        ? state.favoriteCoberturass.filter((id) => id !== coverageId)
        : [...state.favoriteCoberturass, coverageId],
    })),
}), {
  name: 'health-insurance-preferences',
  storage: createJSONStorage(() => AsyncStorage),
}));

