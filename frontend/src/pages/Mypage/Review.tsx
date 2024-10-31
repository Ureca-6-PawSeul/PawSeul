import KakaoIcon from '@/assets/images/svgs/KakaoIcon';
import { Flex } from '@/components/common/Flex';
import { Text } from '@/components/common/Typo';
import { ClickBtn } from '@/components/mypage/profile';
import { colors } from '@/styles/colors';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import user_reviews from '@/mocks/data/user_order.json';
import { OrderContent } from '@/components/mypage/orderHistory/orderContent';
import { Button } from '@/components/common/Button';

export const ReviewHistoryPage = () => {
  const [activeTab, setactiveTab] = useState(1);

  const handleClickTab = (tabIndex: number) => {
    setactiveTab(tabIndex);
    console.log(tabIndex);
  };

  return (
    <Flex
      direction="column"
      justify="flex-start"
      padding="0 12px"
      margin="12px 0"
      gap={20}
    >
      <Flex
        direction="row"
        justify="space-evenly"
        height="fit-content"
      >
        <Flex
          direction="column"
          align="flex-start"
          width="fit-content"
        >
          <Text colorCode={colors.Black} typo="Label1">
            이예원님
          </Text>
          <Text colorCode={colors.Black} typo="Label1">
            email@naver.com
          </Text>
        </Flex>
        <KakaoIcon width={40} />
      </Flex>

      <Flex justify="flex-start" height="fit-content" gap={10}>
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

      <Wrapper align="flex-start" padding="12px 12px" height="fit-content">
        <OrderContent
          price={7800}
          title="수제명가 오리도가니 대용량500g 국산수제개껌 껌"
          bottomContent="배송 완료"
          quantity={3}
          productImg="https://thumbnail8.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/10e6/e003352126219d2cecc126175760f06540c241e1fbc15ce2a84791f79074.jpg"
        >
          <Flex width="120px">
            <Button width="100%" height="25px">
              <Text typo="Label3">리뷰 작성하기</Text>
            </Button>
          </Flex>
        </OrderContent>
      </Wrapper>
    </Flex>
  );
};

const Tab = styled(ClickBtn)<{ isSelected: boolean }>`
  width: 100px;
  border-bottom: solid 1px;
  border-color: ${({ isSelected }) =>
    isSelected ? colors.Gray200 : 'transparent'};
`;

const Wrapper = styled(Flex)`
 border : solid 1px ${colors.Gray100}
`