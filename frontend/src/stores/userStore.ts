import { create } from 'zustand';
import { UserStore } from '@/assets/types/UserInfoType';

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUserInfo: (user) => set({ user }),
}));
