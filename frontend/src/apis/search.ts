import client from './client';

export const getSearchList = async (searchQuery: string) => {
  const response = await client.get(`/product/search?query=${searchQuery}`);
  return response.data;
}
