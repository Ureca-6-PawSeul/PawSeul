import client from './client';
import { ReviewType } from '@/assets/types/ReviewType';

export const getUserReviewDone = async () => {
  const { data } = await client.get('review/me', {
    withCredentials: true,
  });

  return data.reviews;
};

export const getUserReviewRemain = async () => {
  const { data } = await client.get('order/unreviewed', {
    withCredentials: true,
  });
  return data.reviews;
};

export const getReviews = async (id: string): Promise<ReviewType[]> => {
  try {
    const { data } = await client.get(`/review/${id}`);
    return data;
  } catch (error: any) {
    if (error.response && error.response.status === 400) {
      // 400 에러일 경우 빈 배열을 반환
      return [];
    }
    // 다른 에러는 그대로 던져서 React Query에서 처리
    throw new Error(
      error.message || '데이터를 불러오는 중 문제가 발생했습니다.',
    );
  }
};
