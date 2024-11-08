import { useMutation } from '@tanstack/react-query';
import client from '@/apis/client';

interface CartItem {
  productId: string;
  quantity: number;
}

export const createCartItem = () => {
  return useMutation<void, Error, CartItem>({
    mutationFn: async (cartItem) => {
      return await client.post('/cart/add', cartItem);
    },
    onError: (error) => {
      console.error(error);
      alert('장바구니에 상품을 추가하는데 실패했습니다.');
    },
  });
};
