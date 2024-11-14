import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import client from '@/apis/client';
import { CartType } from '@/assets/types/CartType';
import useCartStore from '@/stores/cartStore';
import { getCartList } from '../product';

interface CartItem {
  productId: string;
  quantity: number;
}

interface ChangeQuantityData {
  productId: string;
  quantity: number;
}
interface ContextType {
  previousItems?: CartType[];
}

export const useCartItem = () => {
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

export const useCartQuery = () => {
  // TanStack Query를 사용하여 데이터를 패칭하고, 성공 시 Zustand 상태를 업데이트
  const { data } = useQuery<CartType[], Error>({
    queryKey: ['cartItems'],
    queryFn: getCartList,
  });
  return data;
};

export const useChangeQuantityMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, ChangeQuantityData, ContextType>({
    mutationFn: async (changeData) => {
      return await client.patch(`/cart/update`, changeData);
    },
    onMutate: async ({ productId, quantity }) => {
      await queryClient.cancelQueries({ queryKey: ['cartItems'] });
      const previousItems = queryClient.getQueryData<CartType[]>(['cartItems']);
      useCartStore.getState().deleteSelectedItems();
      // 변경된 상품의 수량만 업데이트 -> 낙관적 업데이트
      queryClient.setQueryData<CartType[]>(
        ['cartItems'],
        (old) =>
          old?.map((item) =>
            item.productId === productId ? { ...item, quantity } : item,
          ) || [],
      );

      return { previousItems };
    },
    onError: (err, _, context) => {
      // 에러 발생 시 이전 상태로 롤백
      if (context?.previousItems) {
        queryClient.setQueryData(['cartItems'], context.previousItems);
      }
    },
    onSuccess: () => {
      // 성공 또는 실패 시 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['cartItems'] });
    },
  });
};
