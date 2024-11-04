import { useQuery } from '@tanstack/react-query';
import { getUserOrder } from '@/apis/order';

export const useGetUserOrder = () => {
    const {data} = useQuery({
        queryKey: ['getUserOrder'],
        queryFn: () => getUserOrder(),
        staleTime : 1000 * 60 * 30,
    })

    return data
};