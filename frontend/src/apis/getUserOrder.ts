import client from './client';

export const getUserOrder = async (user_id : string, setUserOrder) => {
  const { data } = await client.get(`/api/history/order/${user_id}`);
  setUserOrder(data);
  console.log(data)
};
