import { Flex } from '@components/common/Flex';
import { colors } from '@styles/colors';
import ReviewStats from '@components/store/detail/ReviewStats';
import DetailButton from '@components/store/detail/DetailButton';
import ProductReviewItem from './ProductReviewItem';
import { ReviewText } from '@components/store/detail/ReviewText';
import { calculateScoreCounts } from '@/utils/scoreCounts';
import { forwardRef, useEffect, useState } from 'react';
import { Modal } from '@/components/common/Modal';
import { Button } from '@/components/common/Button';
import { Text } from '@/components/common/Typo';
import styled from '@emotion/styled';
import { FaStar } from 'react-icons/fa';
import { createReview, getReviews } from '@/apis/hooks/review';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Toast } from '@/components/common/Toast';
import { ErrorIcon } from '@/assets/images/svgs';

const ProductReview = forwardRef<HTMLDivElement, {}>((_, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewScore, setReviewScore] = useState(0);
  const [newReview, setNewReview] = useState('');
  const [reviews, setReviews] = useState([]);

  const { mutate } = createReview();

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
  const score = reviews.length > 0 ? Number((reviews.reduce((acc, cur) => acc + cur.score, 0) / reviewCount).toFixed(1)) : 0;

  const scoreCounts = reviews ? calculateScoreCounts(reviews) : calculateScoreCounts([]);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleStarClick = (newScore: number) => {
    setReviewScore(newScore);
  };

  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewReview(e.target.value);
  };
  
  const handleExit = () => {
    setReviewScore(0);
    setNewReview('');
    toggleModal();
  }

  const notify = (msg: string) => {
    toast(
      <Flex justify='space-between'>
        <span>{msg}</span>
        <ErrorIcon width={24} height={24} style={{ marginLeft: '8px'}}/>
      </Flex>,
      {
        position: 'bottom-center',
      },
    );
  };
  
  const handleSubmit = () => {
    if (reviewScore < 1) {
      notify('리뷰 점수를 입력해주세요');
      return;
    }
    if (newReview.trim() === '') {
      notify('리뷰 내용을 입력해주세요');
      return;
    }

    // 서버로 전송할 데이터 객체 생성
    const reviewData = {
      productId: id,
      score: reviewScore,
      text: newReview,
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
                value={newReview}
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
      {reviews && reviews.map((review, index) => (
        <ProductReviewItem review={review} key={index} />
      ))}
      <Toast/>
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

