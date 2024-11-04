import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { UserStore } from '@/assets/types/UserInfoType';

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      user: null,
      setUserInfo: (user) => set({ user }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
