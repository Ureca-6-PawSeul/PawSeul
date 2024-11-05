import { useMutation } from '@tanstack/react-query';
import client from '@/apis/client';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CheckIcon } from '@/assets/images/svgs';
import { Flex } from '@components/common/Flex';

// 후기를 생성하는 Mutation 훅
interface ReviewData {
  productId: string;
  score: number;
  text: string;
}

export const createReview = () => {
  return useMutation<void, Error, ReviewData>({
    mutationFn: async (reviewData) => {
      return await client.post(`/review/${reviewData.productId}`, reviewData);
    },
    onSuccess: () => {
      // toast(
      //   <Flex justify="space-between">
      //     <span>후기가 성공적으로 작성되었습니다.</span>
      //     <CheckIcon width={24} height={24} />
      //   </Flex>,
      //   { position: 'bottom-center' },
      // );
      alert('후기가 성공적으로 작성되었습니다.');
    },
    onError: (error) => {
      console.error(error);
      // toast(
      //   <Flex justify="space-between">
      //     <span>후기 작성에 실패했습니다. 다시 시도해주세요.</span>
      //     <CheckIcon width={24} height={24} />
      //   </Flex>,
      //   { position: 'bottom-center' },
      // );
      alert('후기 작성에 실패했습니다. 다시 시도해주세요.');
    },
  });
};

export const getReivews = () => {
  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      return await client.get(`/review/${id}`);
    },
    onError: (error) => {
      console.error(error);
      // toast(
      //   <Flex justify="space-between">
      //     <span>후기를 불러오는데 실패했습니다.</span>
      //     <CheckIcon width={24} height={24} />
      //   </Flex>,
      //   { position: 'bottom-center' },
      // );
      alert('후기를 불러오는데 실패했습니다.');
    },
  });
};
