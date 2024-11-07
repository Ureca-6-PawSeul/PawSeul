import { Flex } from '@components/common/Flex';
import { colors } from '@styles/colors';
import ReviewStats from '@components/store/detail/ReviewStats';
import ProductReviewItem from './ProductReviewItem';
import { ReviewText } from '@components/store/detail/ReviewText';
import { calculateScoreCounts } from '@/utils/scoreCounts';
import { forwardRef, useEffect, useState } from 'react';
import { getReviews } from '@/apis/hooks/review';
import { useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Toast } from '@/components/common/Toast';

const ProductReview = forwardRef<HTMLDivElement, {}>((_, ref) => {
  const [reviews, setReviews] = useState([]);
  const { id } = useParams<{ id: string }>();
  const data = getReviews(id);

  useEffect(() => {
    if (data) {
      console.log(data);
      setReviews(data);
    }
  }, [data]);

  const reviewCount = reviews ? reviews.length : 0;
  // 소수점 첫째 자리까지 평균 계산 나타내기
  const score =
    reviews.length > 0
      ? Number(
          (
            reviews.reduce((acc, cur) => acc + cur.score, 0) / reviewCount
          ).toFixed(1),
        )
      : 0;
  const scoreCounts = reviews
    ? calculateScoreCounts(reviews)
    : calculateScoreCounts([]);

  return (
    <Flex
      ref={ref}
      direction="column"
      gap={24}
      padding="32px 0 0"
      margin="16px 0 0"
      backgroundColor={colors.White}
    >
      <Flex direction="column" justify="flex-start" padding="0px 16px">
        <ReviewText
          typo="Heading3"
          justify="flex-start"
          width="100%"
          fontWeight="600"
        >
          {`후기 ${reviewCount}개`}
        </ReviewText>
        <ReviewStats score={score} scoreCounts={scoreCounts} />
      </Flex>
      <div />
      {reviews &&
        reviews.map((review, index) => (
          <ProductReviewItem review={review} key={index} />
        ))}
      <Toast />
    </Flex>
  );
});

export default ProductReview;
