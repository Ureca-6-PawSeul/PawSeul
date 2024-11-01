import KakaoIcon from '@/assets/images/svgs/KakaoIcon';
import { Flex } from '@/components/common/Flex';
import { Text } from '@/components/common/Typo';
import { ClickBtn } from '@/components/mypage/profile';
import { colors } from '@/styles/colors';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Button } from '@/components/common/Button';
import { getUserReviewDone } from '@/apis/getUserReviewDone';
import { getUserReviewRemain } from '@/apis/getUserReviewRemain';
import { OrderContent } from '@/components/mypage/orderHistory/orderContent';

export const ReviewHistoryPage = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [userReviewList, setUserReviewList] = useState({
    user_id: '',
    username: '',
    email: '',
    reviews: [],
  });

  const handleClickTab = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  useEffect(() => {
    if (activeTab === 2) getUserReviewDone(setUserReviewList);
    else if (activeTab === 1) getUserReviewRemain(setUserReviewList);

    console.log(userReviewList);
  }, [activeTab]);

  return (
    <Flex align="flex-start" padding="0 0 50px 0">
      <Flex
        direction="column"
        justify="flex-start"
        padding="0 12px"
        margin="12px 0"
        gap={0}
        width="auto"
        height="auto"
      >
        <Flex direction="row" justify="space-evenly" gap={20} backgroundColor={colors.Gray50} borderRadius={10} padding='12px'>
          <Flex direction="column" justify="flex-start" align="flex-start" width="auto">
            <Text colorCode={colors.Black} typo="Label1">
              {userReviewList.username}님
            </Text>
            <Text colorCode={colors.Black} typo="Label1">
              {userReviewList.email}
            </Text>
          </Flex>
          <KakaoIcon width={40} />
        </Flex>
        <Flex justify="flex-start" gap={10} margin="40px 0 8px 0">
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
        {userReviewList?.reviews.map((review) => (
          <Wrapper align="flex-start" padding="12px 12px">
            <OrderContent
              price={review.price}
              title={review.title}
              bottomContent={review.state}
              quantity={review.quantity}
              productImg={review.product_img}
            >
              <Flex width="120px">
                <Button width="100%" height="25px">
                  <Text typo="Label3">리뷰 작성하기</Text>
                </Button>
              </Flex>
            </OrderContent>
          </Wrapper>
        ))}
      </Flex>
    </Flex>
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
