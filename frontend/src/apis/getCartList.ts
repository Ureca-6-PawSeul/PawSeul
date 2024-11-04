import axios from 'axios';
import { CartType } from '@/assets/types/CartType';
import client from './client';

export const getCartList = async (): Promise<CartType[]> => {
  const { data } = await client.get<CartType[]>('/api/v1/cart');
  console.log(`data 조회: ${data}`);
  return data;
};
