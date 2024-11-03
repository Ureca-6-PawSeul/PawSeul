import { create } from 'zustand';

interface NavbarState {
  isVisible: boolean;
  showNavbar: () => void;
  hideNavbar: () => void;
}

export const useNavbarStore = create<NavbarState>((set) => ({
  isVisible: true,
  showNavbar: () => set({ isVisible: true }),
  hideNavbar: () => set({ isVisible: false }),
}));
