import client from '../client';

export const getUserInfo = async () => {
  const response = await client.get('/api/v1/user/me', {
    withCredentials: true,
  });
  return response.data;
};
