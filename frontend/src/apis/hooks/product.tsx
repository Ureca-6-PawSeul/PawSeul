import { getProductList } from '@/apis/getProductList';
import { useQuery } from '@tanstack/react-query';

export const useGetProductList = (category, subCategory) => {
  console.log(category, subCategory)
  const {data} =  useQuery({
    queryKey: ['getProductList', category, subCategory],
    queryFn: () => getProductList(category, subCategory),
    // staleTime : 1000 * 60 * 30,
  })

  console.log(data)

  return data
};