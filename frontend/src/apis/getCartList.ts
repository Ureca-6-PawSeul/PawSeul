import axios from 'axios';
import { CartType } from '@/assets/types/CartType';
import client from './client';

interface cartRequest {
  carts : CartType[]
}

export const getCartList = async (): Promise<CartType[]> => {
  const { data } = await client.get<cartRequest>('/cart');
  return data.carts;
};
