import { OrderType, PatchOrderType } from '@/assets/types/OrderType';
import client from './client';

export const getUserOrder = async () => {
  const { data } = await client.get(`order/list`);

  return data
};

export const postUserOrder = async (orderData : OrderType) => {
  const { data } = await client.post(`order/temp-order`, orderData);

  return data
}

export const patchUserOrder = async (patchData : PatchOrderType) => {
  const { data } = await client.patch(`order/change`, patchData);

  return data
}