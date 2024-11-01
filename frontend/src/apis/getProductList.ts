import { Category } from '@assets/types/CategoryType';
import client from './client';

export const getProductList = async (category, setProduct) => {
  // console.log(`api/product/${category}`)
  const { data } = await client.get(`api/product/${category}`);

  setProduct(data);
};
