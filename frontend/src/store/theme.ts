import { create } from 'zustand';

type ThemeState = {
  mode: 'light' | 'dark';
  toggleMode: () => void;
};

export const useThemeStore = create<ThemeState>((set, get) => ({
  mode: 'light',
  toggleMode: () => set({ mode: get().mode === 'light' ? 'dark' : 'light' }),
}));
