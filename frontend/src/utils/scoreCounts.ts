import { ReviewType } from '@assets/types/ReviewType';

type ScoreCounts = Record<1 | 2 | 3 | 4 | 5, number>;

// 각 점수별 리뷰 수를 계산하는 유틸 함수
export const calculateScoreCounts = (reviews: ReviewType[]): ScoreCounts => {
  return reviews.reduce(
    (counts, review) => {
      // 각 리뷰의 점수를 가져와 타입 단언
      const score = review.score as 1 | 2 | 3 | 4 | 5;

      // 현재 score에 해당하는 점수의 개수를 1 증가
      counts[score] = (counts[score] || 0) + 1;

      return counts; // 업데이트된 counts 객체 반환
    },
    { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  );
};
