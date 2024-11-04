import { create } from 'zustand';
import { CartType } from '@/assets/types/CartType';
import { createJSONStorage, persist } from 'zustand/middleware';

interface CartStore {
  cartItems: CartType[];
  selectedItems: CartType[];
  totalPrice: number;
  setCartItems: (items: CartType[]) => void;
  addCartItem: (items: CartType) => void;
  toggleSelectItem: (product: CartType) => void;
  toggleSelectAll: () => void;
  deleteItem: (productId: string) => void;
  deleteSelectedItems: () => void;
  calculateTotalPrice: () => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
}

const useCartStore = create<CartStore>()(
  persist(
  (set) => ({
  //state 변수들 초기값
  cartItems: [],
  selectedItems: [],
  totalPrice: 0,

  // 서버에서 가져온 cartItems를 설정
  setCartItems: (items) => set({ cartItems: items }),

  // 새로운 아이템을 추가
  addCartItem: (item) =>
    set((state) => ({
      cartItems: [...state.cartItems, item],
    })),

  // 특정 아이템 선택 / 선택 해제
  toggleSelectItem: (product) =>
    set((state) => {
      const isSelected = state.selectedItems.some(
        (item) => item.productId === product.productId,
      );
      return {
        selectedItems: isSelected
          ? state.selectedItems.filter(
              (item) => item.productId !== product.productId,
            )
          : [...state.selectedItems, product],
      };
    }),

  // 전체를 선택 / 선택 해제
  toggleSelectAll: () =>
    set((state) => ({
      selectedItems:
        state.selectedItems.length === state.cartItems.length
          ? []
          : [...state.cartItems],
    })),

  // 특정 아이템 삭제
  deleteItem: (productId) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.productId !== productId),
      selectedItems: state.selectedItems.filter(
        (item) => item.productId !== productId,
      ),
    })),

  // 선택된 모든 아이템을 삭제
  deleteSelectedItems: () =>
    set((state) => ({
      cartItems: state.cartItems.filter(
        (item) =>
          !state.selectedItems.some(
            (selected) => selected.productId === item.productId,
          ),
      ),
      selectedItemIds: [],
    })),

  // 총 가격 계산 함수
  calculateTotalPrice: () =>
    set((state) => ({
      ...state, // 기존 상태를 유지
      totalPrice: state.selectedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      ),
    })),

  // 수량 증가 함수
  increaseQuantity: (productId) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.productId === productId && item.quantity < 100
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
      selectedItems: state.selectedItems.map((item) =>
        item.productId === productId && item.quantity < 100
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    })),

  // 수량 감소 함수
  decreaseQuantity: (productId) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.productId === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
      selectedItems: state.selectedItems.map((item) =>
        item.productId === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    })),
    }),
    {
      name: 'cart-store',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ selectedItems: state.selectedItems, totalPrice: state.totalPrice }), // 'selectedItems'로 수정
    }
  ),
);

export default useCartStore;
