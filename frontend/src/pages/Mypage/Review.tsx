import { Flex } from '@/components/common/Flex';
import { Text } from '@/components/common/Typo';
import { ClickBtn } from '@/components/mypage/profile';
import { colors } from '@/styles/colors';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Button } from '@/components/common/Button';
import {
  useGetReviewDone,
  useGetReviewRemain,
} from '@/apis/hooks/useUserReview';
import { OrderContent } from '@/components/mypage/orderHistory/orderContent';
import { IoPersonCircleSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/common/Header';
import { LeftArrow } from '@/assets/images/svgs';
import { useUserStore } from '@/stores/userStore';

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

  const handleClickTab = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  // useEffect(() => {
  //   if (reviewDone) {
  //     setUserReviewList(reviewDone);
  //   }
  // }, [reviewDone]);

  useEffect(() => {
    if (reviewRemain) {
      setUserReviewList(reviewRemain);
    }
  }, [reviewRemain]);

  useEffect(() => {
    if (activeTab === 2) setUserReviewList(reviewDone);
    else if (activeTab === 1) setUserReviewList(reviewRemain);

  }, [activeTab]);

  return (
    <>
      <Header
        title="구매후기"
        LeftIcon={<LeftArrow height={24} />}
        onLeftIconClick={handleNavigateToMypage}
      />
      <Flex align="flex-start" padding="0 0 60px 0" margin="60px 0 0 0">
        <Flex
          direction="column"
          justify="flex-start"
          // width="auto"
          height="auto"
        >
          <Flex
            direction="row"
            justify="flex-start"
            gap={12}
            borderRadius={10}
            padding="12px 24px"
          >
            <IoPersonCircleSharp size={60} color={colors.Gray300} />
            <Flex
              direction="column"
              justify="flex-start"
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
          </Flex>
          <Hr />
          <Flex
            justify="flex-start"
            gap={10}
            margin="3px 0 8px 0"
            padding="0 12px"
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
          </Flex>
          <Flex direction="column" padding="0 12px">
            {userReviewList?.map((review) => (
              <Wrapper align="flex-start" padding="12px 12px">
                <OrderContent
                  price={review.price}
                  title={review.title}
                  bottomContent={review.state}
                  quantity={review.quantity}
                  productImg={review.productImg}
                >
                  <Flex width="120px">
                    {activeTab === 1 ? (
                      <Button width="103px" height="30px" borderRadius="25px">
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
            ))}
          </Flex>
        </Flex>
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

const Wrapper = styled(Flex)`
  border: solid 1px ${colors.Gray100};
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
