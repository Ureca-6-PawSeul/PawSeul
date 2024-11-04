import { useQuery } from '@tanstack/react-query';
import { getCartList } from '@/apis/getCartList';
import { CartType } from '@/assets/types/CartType';
import useCartStore from '@/stores/cartStore';
import { useEffect } from 'react';

const useCartQuery = () => {
  // const setCartItems = useCartStore((state) => state.setCartItems);

  // TanStack Query를 사용하여 데이터를 패칭하고, 성공 시 Zustand 상태를 업데이트
  const {data} = useQuery<CartType[], Error>({
    queryKey: ['cartItems'],
    queryFn: getCartList,
  //   onSuccess: (data) => {
  //     setCartItems(data); // Zustand 상태에 cartItems 설정
  //   },
  //   staleTime: 1000 * 60 * 5, // 캐시 데이터가 5분 동안 유효
  // } as UseQueryOptions<CartType[], Error>);
  });

  return data;
};

export default useCartQuery;
