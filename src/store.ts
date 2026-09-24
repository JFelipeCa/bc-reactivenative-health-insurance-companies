import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage, persist } from 'zustand/middleware';

type HealthStore = {
  selectedPlan: string;
  favoritecoverages: string[];
  isAuthenticated: boolean;
  selectPlan: (plan: string) => void;
  toggleFavorite: (coverageId: string) => void;
  signIn: () => void;
  signOut: () => void;
};

export const useHealthStore = create<HealthStore>()(persist((set) => ({
  selectedPlan: 'Familiar',
  favoritecoverages: [],
  isAuthenticated: false,
  selectPlan: (selectedPlan) => set({ selectedPlan }),
  toggleFavorite: (coverageId) =>
    set((state) => ({
      favoritecoverages: state.favoritecoverages.includes(coverageId)
        ? state.favoritecoverages.filter((id) => id !== coverageId)
        : [...state.favoritecoverages, coverageId],
    })),
  signIn: () => set({ isAuthenticated: true }),
  signOut: () => set({ isAuthenticated: false }),
}), {
  name: 'health-insurance-preferences',
  storage: createJSONStorage(() => AsyncStorage),
}));
