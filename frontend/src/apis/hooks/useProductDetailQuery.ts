import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProductDetail } from '@/apis/getProductDetail';
import { ProductDetailType } from '@/assets/types/ProductType';

const useProductDetailQuery = () => {
  const { id } = useParams<{ id: string }>();

  const { data } = useQuery({
    queryKey: ['productDetail', id],
    queryFn: () => getProductDetail(id!),
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });

  return { data };
};

export default useProductDetailQuery;
