import client from './client';
import { ProductDetailType } from '@/assets/types/ProductType';

export const getProductDetail = async (
  id: string,
): Promise<ProductDetailType> => {
  const { data } = await client.get(`/product/${id}/detail`);
  return data;
};
