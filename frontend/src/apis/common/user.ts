import client from '../client';

export const getUserInfo = async () => {
  const response = await client.get('user/me', {
    withCredentials: true,
  });
  return response.data;
};
