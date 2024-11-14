import { Flex, HeightFitFlex } from '@/components/common/Flex';
import { Text } from '@/components/common/Typo';
import { ClickBtn } from '@/components/mypage/profile';
import { colors } from '@/styles/colors';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Button } from '@/components/common/Button';
import {
  useGetReviewDone,
  useGetReviewRemain,
} from '@/apis/hooks/review';
import { OrderContent } from '@/components/mypage/orderHistory/orderContent';
import { IoPersonCircleSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/common/Header';

import { ErrorIcon } from '@/assets/images/svgs';
import { useUserStore } from '@/stores/userStore';
import { Modal } from '@/components/common/Modal';
import { FaStar } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useCreateReview } from '@/apis/hooks/review';
import { Toast } from '@/components/common/Toast';
import { IoIosArrowBack } from 'react-icons/io';



export const ReviewHistoryPage = () => {
  const navigate = useNavigate();
  const handleNavigateToMypage = () => {
    navigate('/mypage');
  };
  // 전역상태 user. user와 그 펫 정보를 담고있음.
  const user = useUserStore((state) => state.user);
  const [activeTab, setActiveTab] = useState(1);
  const [userReviewList, setUserReviewList] = useState([]);
  const reviewDone = useGetReviewDone();
  const reviewRemain = useGetReviewRemain();
  const [isMoveModalOpen, setIsMoveModalOpen] = useState(false);
  const [reviewScore, setReviewScore] = useState(0);
  const [newReview, setNewReview] = useState('');
  const [currentProductId, setCurrentProductId] = useState<string | null>();

  const handleClickTab = (tabIndex: number) => setActiveTab(tabIndex);
  const handleClickBtn = (productId : string) => {
    setCurrentProductId(productId);  // 리뷰할 제품의 productId 설정
    toggleMoveModal();
  }
  const toggleMoveModal = () => setIsMoveModalOpen((prev) => !prev);
  const handleStarClick = (newScore: number) => setReviewScore(newScore);
  const { mutateAsync } = useCreateReview();
  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setNewReview(e.target.value);
  const handleExit = () => {
    setReviewScore(0);
    setNewReview('');
    toggleMoveModal();
  };

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

  const handleSubmit = async ()=>{
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
      productId: currentProductId,
      score: reviewScore,
      text: newReview,
    };
    try {
      await mutateAsync(reviewData);
        // toggleMoveModal();
      window.location.href = "/mypage/review";
    } catch (error) {
      console.error('리뷰 작성에 실패했습니다:', error);
    };// useMutation으로 후기를 서버에 요청
    
  };


  useEffect(() => {
    if (activeTab === 1) {
      setUserReviewList(reviewRemain);
    } else if (activeTab === 2) {
      setUserReviewList(reviewDone);
    }
  }, [activeTab, reviewDone, reviewRemain]);

  return (
    <>
      <Header
        title="구매후기"
        LeftIcon={<IoIosArrowBack size={26} color={colors.Black}/>}
        onLeftIconClick={handleNavigateToMypage}
      />
      <Flex align="flex-start" padding="0 0 60px 0" margin="60px 0 0 0">
        <Flex
          direction="column"
          justify="flex-start"
          // width="auto"
          // height="auto"
        >
          <HeightFitFlex
            direction="row"
            justify="flex-start"
            gap={12}
            borderRadius={10}
            padding="24px 24px 12px 24px"
          >
            <IoPersonCircleSharp size={60} color={colors.Gray300} />
            <Flex
              direction="column"
              justify="center"
              align="flex-start"
              width="auto"
            >
              <ProfileText colorCode={colors.Black} typo="Heading4">
                {user.username}
              </ProfileText>
              <ProfileText colorCode={colors.Gray600} typo="Body3">
                {user.email}
              </ProfileText>
            </Flex>
          </HeightFitFlex>
          <Hr />
          <HeightFitFlex
            justify="flex-start"
            gap={10}
            margin="12px 0 4px 0"
            padding="0 24px"
            height="60px"
          >
            <Tab
              direction="row"
              onClick={() => handleClickTab(1)}
              isSelected={activeTab === 1}
            >
              <Text typo="Label1">구매후기 작성</Text>
            </Tab>
            <Tab
              direction="row"
              onClick={() => handleClickTab(2)}
              isSelected={activeTab === 2}
            >
              <Text typo="Label1">작성한 구매후기</Text>
            </Tab>
          </HeightFitFlex>
          <Flex direction="column" padding="0 24px" justify="flex-start">
            {userReviewList?.length > 0 ? (
              userReviewList?.map((review) => (
                <>
                  <Wrapper align="flex-start" padding="12px 12px ">
                    <OrderContent
                      key={review.productId}
                      price={review.price}
                      title={review.title}
                      bottomContent={review.state}
                      quantity={review.quantity}
                      productImg={review.productImg}
                    >
                      <Flex width="120px">
                        {activeTab === 1 ? (
                          <Button
                            width="103px"
                            height="30px"
                            borderRadius="25px"
                            onClick={()=>handleClickBtn(review.productId)}
                          >
                            <Text typo="Label2">리뷰 작성하기</Text>
                          </Button>
                        ) : (
                          <Button
                            width="103px"
                            height="30px"
                            borderRadius="25px"
                            bg={colors.Gray300}
                            fontColor={colors.White}
                            disabled={true}
                          >
                            <Text typo="Label2">작성 완료</Text>
                          </Button>
                        )}
                      </Flex>
                    </OrderContent>
                  </Wrapper>
                </>
              ))
            ) : activeTab === 1 ? (
              <Flex direction="column" margin="50px 0">
                <Text>작성할 리뷰가 없습니다.</Text>
              </Flex>
            ) : (
              <Flex direction="column" margin="50px 0">
                <Text>작성한 리뷰가 없습니다.</Text>
              </Flex>
            )}
          </Flex>
        </Flex>
            {isMoveModalOpen && (<>
              <Modal
                isOpen={isMoveModalOpen}
                toggleModal={toggleMoveModal}
              >
                <Flex direction="column">
                  <Flex margin="10px 0 10px">
                    <Text typo="Heading4" colorCode={colors.Gray600}>
                      별점을 선택해주세요
                    </Text>
                  </Flex>
                  <Flex>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        onClick={() => handleStarClick(star)}
                        style={{ cursor: 'pointer', fontSize: '24px' }}
                      >
                        {reviewScore >= star ? (
                          <FaStar size={24} color={colors.Star} />
                        ) : (
                          <FaStar size={24} color={colors.Gray200} />
                        )}
                      </span>
                    ))}
                  </Flex>
                  <Flex
                    direction="column"
                    padding="10px 20px"
                    margin="30px 0 0"
                  >
                    <Text typo="Heading4" colorCode={colors.Gray600}>
                      자세한 후기를 알려주세요
                    </Text>
                    <Textarea
                      placeholder="후기를 작성해주세요"
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
                  <Flex padding="0px 52px" margin="20px 0 10px" gap={20}>
                    <Button
                      height="40px"
                      bg={colors.Gray400}
                      onClick={handleExit}
                    >
                      취소
                    </Button>
                    <Button
                      height="40px"
                      onClick={handleSubmit}
                    >
                      등록
                    </Button>
                  </Flex>
                </Flex>
              <Toast />
              </Modal>
              </>
            )}
      </Flex>
    </>
  );
};


const Tab = styled(ClickBtn)<{ isSelected: boolean }>`
  width: 100px;
  
  border-bottom: solid 2px;
  border-color: ${({ isSelected }) =>
    isSelected ? colors.Gray200 : 'transparent'};
`;

const Wrapper = styled(HeightFitFlex)`
  border: solid 1px ${colors.Gray100};
  border-radius: 5px;
  margin: 4px;
`;

const Hr = styled.hr`
  border: none;
  background-color: ${colors.Gray50};
  height: 16px;
  width: 100%;
  margin: 10px 0;
`;

const ProfileText = styled(Text)`
  line-height: 140%;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 200px;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid ${colors.Gray100};
  border-radius: 5px;
  resize: none;
`;
