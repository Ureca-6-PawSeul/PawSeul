import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProductDetail } from '../getProductDetail';
import useProductDetailStore from '@/stores/productDetailStore';
import { ProductDetailType } from '@/assets/types/ProductType';
import { useEffect } from 'react';

const useProductDetailQuery = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useQuery<ProductDetailType, Error>({
    queryKey: ['productDetail', id],
    queryFn: () => getProductDetail(id!),
    staleTime: 1000 * 60 * 5,
  });

  return { data, isLoading, isError };
};

export default useProductDetailQuery;
