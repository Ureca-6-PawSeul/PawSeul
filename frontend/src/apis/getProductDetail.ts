import client from './client';
import { ProductDetailType } from '@/assets/types/ProductType';

export const getProductDetail = async (id: string) => {
  const temp = await client.get(`/product/${id}/detail`);
  return temp.data;
};
