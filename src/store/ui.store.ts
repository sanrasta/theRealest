import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  navOpen: boolean;
  toggleNav: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      navOpen: false,
      toggleNav: () => set((s) => ({ navOpen: !s.navOpen })),
      isDarkMode: true,
      toggleTheme: () => set((s) => {
        const newMode = !s.isDarkMode;
        // Update the HTML attribute
        if (typeof document !== 'undefined') {
          if (newMode) {
            document.documentElement.removeAttribute('data-theme');
          } else {
            document.documentElement.setAttribute('data-theme', 'light');
          }
        }
        return { isDarkMode: newMode };
      }),
    }),
    {
      name: 'ui-storage',
    }
  )
);

