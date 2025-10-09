import { create } from 'zustand';

interface UIState {
  navOpen: boolean;
  toggleNav: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  navOpen: false,
  toggleNav: () => set((s) => ({ navOpen: !s.navOpen })),
}));

