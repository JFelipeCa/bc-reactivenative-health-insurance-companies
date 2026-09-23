import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage, persist } from 'zustand/middleware';

type HealthStore = {
  selectedPlan: string;
  favoriteCoverages: string[];
  isAuthenticated: boolean;
  selectPlan: (plan: string) => void;
  toggleFavorite: (coverageId: string) => void;
  signIn: () => void;
  signOut: () => void;
};

export const useHealthStore = create<HealthStore>()(persist((set) => ({
  selectedPlan: 'Familiar',
  favoriteCoverages: [],
  isAuthenticated: false,
  selectPlan: (selectedPlan) => set({ selectedPlan }),
  toggleFavorite: (coverageId) =>
    set((state) => ({
      favoriteCoverages: state.favoriteCoverages.includes(coverageId)
        ? state.favoriteCoverages.filter((id) => id !== coverageId)
        : [...state.favoriteCoverages, coverageId],
    })),
  signIn: () => set({ isAuthenticated: true }),
  signOut: () => set({ isAuthenticated: false }),
}), {
  name: 'health-insurance-preferences',
  storage: createJSONStorage(() => AsyncStorage),
}));
