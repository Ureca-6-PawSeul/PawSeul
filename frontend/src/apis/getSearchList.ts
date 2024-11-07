import client from './client';

export const getSearchList = async (searchQuery: string) => {
  const response = await client.get(`/product/search?query=${searchQuery}`);
  console.log(response.data);
  return response.data;
}
