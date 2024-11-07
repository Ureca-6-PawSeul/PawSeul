import { useMutation, useQuery } from '@tanstack/react-query';
import { cancelUserOrder, getUserOrder } from '@/apis/order';
import { toast } from 'react-toastify';
import { CheckIcon } from '@/assets/images/svgs';
import { Flex } from '@/components/common/Flex';

export const useGetUserOrder = () => {
    const {data} = useQuery({
        queryKey: ['getUserOrder'],
        queryFn: () => getUserOrder(),
        staleTime : 1000 * 60 * 30,
    })

    return data
};

export const useDeleteOrder = (handleNavigate: () => void) => {
    const notify = () => {
        toast(
          <Flex justify="space-between">
            <span>취소되었습니다.</span>
            <CheckIcon width={24} height={24} />
          </Flex>,
          { position: 'bottom-center' },
        );
      };


    return useMutation<void, Error, string>({
        mutationFn: async(orderId) => {
            return await cancelUserOrder(orderId);
        },
        onSuccess: () => {
            notify();
            setTimeout(() => {
                handleNavigate();
              }, 1000);
        },
        onError: (error) => {
            console.log(error)
            alert("주문 취소에 실패했습니다. 다시 시도해주세요.")
        }
    })
};