import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getProductDetail, getProductList, getTopProductList } from '../product';

export const useGetProductList = (category, subCategory) => {
  const {data} =  useQuery({
    queryKey: ['getProductList', category, subCategory],
    queryFn: () => getProductList(category, subCategory),
  })

  return data
};

export const useGetTopProduct = () => {
  const {data} =  useQuery({
    queryKey: ['getTopProductList'],
    queryFn: () => getTopProductList(),
    staleTime : 1000 * 60 * 10,
  })
  return data;
}

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
