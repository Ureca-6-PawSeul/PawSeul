import { Flex } from '@components/common/Flex';
import { colors } from '@styles/colors';
import ReviewStats from '@components/store/detail/ReviewStats';
import DetailButton from '@components/store/detail/DetailButton';
import reviews from '@/mocks/data/review.json';
import ProductReviewItem from './ProductReviewItem';
import { ReviewText } from '@components/store/detail/ReviewText';
import { calculateScoreCounts } from '@/utils/scoreCounts';
import { forwardRef, useState } from 'react';
import { Modal } from '@/components/common/Modal';
import { Button } from '@/components/common/Button';
import { Text } from '@/components/common/Typo';
import styled from '@emotion/styled';
import { FaStar } from 'react-icons/fa';
import { createReview } from '@/apis/hooks/review';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CheckIcon } from '@/assets/images/svgs';

const ProductReview = forwardRef<HTMLDivElement, {}>((_, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewScore, setReviewScore] = useState(0);
  const [review, setReview] = useState('');
  const { id } = useParams<{ id: string }>();
  const { mutate } = createReview();

  const reviewCount = reviews.length;
  const score = reviews.reduce((acc, cur) => acc + cur.score, 0) / reviewCount;

  const scoreCounts = calculateScoreCounts(reviews);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleStarClick = (newScore: number) => {
    setReviewScore(newScore);
  };

  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview(e.target.value);
  };
  
  const handleExit = () => {
    setReviewScore(0);
    setReview('');
    toggleModal();
  }
  
  const handleSubmit = () => {
    if (reviewScore < 1) {
      toast(
        <Flex justify="space-between">
          <span>별점을 입력해주세요</span>
          <CheckIcon width={24} height={24} />
        </Flex>,
        { position: 'bottom-center' },
      );
      return;
    }
    if (review.trim() === '') {
      toast(
        <Flex justify="space-between">
          <span>후기 내용을 입력해주세요</span>
          <CheckIcon width={24} height={24} />
        </Flex>,
        { position: 'bottom-center' },
      );
      return;
    }

    // 서버로 전송할 데이터 객체 생성
    const reviewData = {
      productId: id,
      score: reviewScore,
      text: review,
    };

    mutate(reviewData); // useMutation으로 후기를 서버에 요청
  };

  return (
    <Flex ref={ref} direction="column" gap={24} padding='32px 0 0' margin="16px 0 0" backgroundColor={colors.White}>
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
      <DetailButton
        handleButtonClick={toggleModal}
        colorCode={colors.MainColor}
      >
        새로운 후기 작성하기
        <Modal isOpen={isModalOpen} toggleModal={toggleModal}>
          <Flex direction='column'>
            <Flex margin='10px 0 10px'>
              <Text typo="Heading4" colorCode={colors.Gray600}>별점을 선택해주세요</Text>
            </Flex>
            <Flex>
            {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => handleStarClick(star)}
              style={{ cursor: 'pointer', fontSize: '24px' }}
            >
              {reviewScore >= star ? <FaStar size={24} color={colors.Star} /> : <FaStar size={24} color={colors.Gray200} />}
            </span>
          ))}
            </Flex>
            <Flex direction='column' padding='10px 20px' margin="30px 0 0">
              <Text typo="Heading4" colorCode={colors.Gray600}>자세한 후기를 알려주세요</Text>
              <Textarea 
                placeholder='후기를 작성해주세요'
                value={review}
                onChange={handleReviewChange}
                onKeyDown={(e) => {
                  if (e.key === ' ') {
                    e.preventDefault(); // 스페이스바의 기본 동작을 막음
                    e.stopPropagation(); // 스페이스바의 이벤트 전파를 막음
                  }
                }}
              />
            </Flex>
            <Flex padding="0px 52px" margin='20px 0 10px' gap={20}>
            <Button height='40px' bg={colors.Gray400} onClick={handleExit}>취소</Button>
            <Button 
            height='40px'
            onClick={() => {
              handleSubmit();
              toggleModal();
            }}>등록</Button>
            </Flex>
          </Flex>
        </Modal>
      </DetailButton>
      <div />
      {reviews.map((review, index) => (
        <ProductReviewItem review={review} key={index} />
      ))}
    </Flex>
  );
});

ProductReview.displayName = 'ProductReview';

const Textarea = styled.textarea`
  width: 100%;
  height: 200px;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid ${colors.Gray100};
  border-radius: 5px;
  resize: none;
`;

export default ProductReview;
function useEffect(arg0: () => () => void, arg1: boolean[]) {
  throw new Error('Function not implemented.');
}

