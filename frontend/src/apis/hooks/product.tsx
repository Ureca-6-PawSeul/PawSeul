import { getProductList } from '@/apis/getProductList';
import { useQuery } from '@tanstack/react-query';
import { getTopProductList } from '../getTopProductLis';

export const useGetProductList = (category, subCategory) => {
  console.log(category, subCategory)
  const {data} =  useQuery({
    queryKey: ['getProductList', category, subCategory],
    queryFn: () => getProductList(category, subCategory),
    // staleTime : 1000 * 60 * 30,
  })

  // console.log(data)

  return data
};

export const useGetTopProduct = () => {
  const {data} =  useQuery({
    queryKey: ['getTopProductList'],
    queryFn: () => getTopProductList(),
    staleTime : 1000 * 60 * 10,
  })

  // console.log(data)
  return data;
}