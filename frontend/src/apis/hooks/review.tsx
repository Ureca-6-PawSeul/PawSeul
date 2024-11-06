import {
  QueryCache,
  QueryClient,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import client from '@/apis/client';
import { toast } from 'react-toastify';
import { CheckIcon, ErrorIcon } from '@/assets/images/svgs';
import { Flex } from '@components/common/Flex';
import 'react-toastify/dist/ReactToastify.css';
import { Toast } from '@/components/common/Toast';
import { ReviewType } from '@/assets/types/ReviewType';

// 후기를 생성하는 Mutation 훅
interface ReviewData {
  productId: string;
  score: number;
  text: string;
}

const notifySuccess = (msg: string) => {
  toast(
    <Flex justify="space-between">
      <span>{msg}</span>
      <CheckIcon width={24} height={24} style={{ marginLeft: '8px' }} />
    </Flex>,
    {
      position: 'bottom-center',
    },
  );
};

const notifyError = (msg: string) => {
  toast(
    <Flex>
      <Flex justify="space-between">
        <span>{msg}</span>
        <ErrorIcon width={24} height={24} style={{ marginLeft: '8px' }} />
      </Flex>
    </Flex>,
    {
      position: 'bottom-center',
    },
  );
};

// 후기 작성하기 mutation
export const createReview = () => {
  return useMutation<void, Error, ReviewData>({
    mutationFn: async (reviewData) => {
      return await client.post(`/review/${reviewData.productId}`, reviewData);
    },
    onSuccess: () => {
      notifySuccess('후기가 성공적으로 작성되었습니다.');
    },
    onError: () => {
      notifyError('후기 작성에 실패했습니다. 다시 시도해주세요.');
    },
  });
};

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: Error) => {
      notifyError(error.message);
    },
  }),
});

export const getReviews = (id: string) => {
  const { data } = useQuery<ReviewType[], Error>({
    queryKey: ['getReviews', id],
    queryFn: () => getReviewsAPI(id),
    meta: {
      errorMessage: '후기를 불러오는 중 문제가 발생했습니다.',
    },
  });
  return data;
};

const getReviewsAPI = async (id: string): Promise<ReviewType[]> => {
  try {
    const { data } = await client.get(`/review/${id}`);
    return data;
  } catch (error: any) {
    if (error.response && error.response.status === 400) {
      // 400 에러일 경우 빈 배열을 반환
      return [];
    }
    // 다른 에러는 그대로 던져서 React Query에서 처리
    throw new Error(error.message || '데이터를 불러오는 중 문제가 발생했습니다.');
  }
};
