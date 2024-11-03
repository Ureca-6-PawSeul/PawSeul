import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '../common/userAPI';

export const useGetUserInfo = () => {
  const { data } = useQuery({
    queryKey: ['getUserInfo'],
    queryFn: getUserInfo,
  });
  return { data };
};
