import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage, persist } from 'zustand/middleware';

type HealthStore = {
  selectedPlan: string;
  favoriteCoverages: string[];
  isAuthenticated: boolean;
  authReady: boolean;
  selectPlan: (plan: string) => void;
  toggleFavorite: (coverageId: string) => void;
  signIn: () => void;
  signOut: () => void;
  setAuthReady: (ready: boolean) => void;
};

export const useHealthStore = create<HealthStore>()(persist<HealthStore, [], [], Pick<HealthStore, 'selectedPlan' | 'favoriteCoverages'>>((set) => ({
  selectedPlan: 'Familiar',
  favoriteCoverages: [],
  isAuthenticated: false,
  authReady: false,
  selectPlan: (selectedPlan) => set({ selectedPlan }),
  toggleFavorite: (coverageId) =>
    set((state) => ({
      favoriteCoverages: state.favoriteCoverages.includes(coverageId)
        ? state.favoriteCoverages.filter((id) => id !== coverageId)
        : [...state.favoriteCoverages, coverageId],
    })),
  signIn: () => set({ isAuthenticated: true, authReady: true }),
  signOut: () => set({ isAuthenticated: false }),
  setAuthReady: (authReady) => set({ authReady }),
}), {
  name: 'health-insurance-preferences',
  storage: createJSONStorage(() => AsyncStorage),
  partialize: (state) => ({
    selectedPlan: state.selectedPlan,
    favoriteCoverages: state.favoriteCoverages,
  }),
}));
