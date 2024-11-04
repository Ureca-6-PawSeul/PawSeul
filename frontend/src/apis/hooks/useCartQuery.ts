import { useQuery } from '@tanstack/react-query';
import { getCartList } from '@/apis/getCartList';
import { CartType } from '@/assets/types/CartType';
import useCartStore from '@/stores/cartStore';
import { useEffect } from 'react';

const useCartQuery = () => {
  // TanStack Query를 사용하여 데이터를 패칭하고, 성공 시 Zustand 상태를 업데이트
  const {data} = useQuery<CartType[], Error>({
    queryKey: ['cartItems'],
    queryFn: getCartList,
  });

  return data;
};

export default useCartQuery;
