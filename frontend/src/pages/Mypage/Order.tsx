import { Flex } from '@/components/common/Flex';
import { Text } from '@/components/common/Typo';
import { OrderHistory } from '@components/mypage/orderHistory';
import { colors } from '@/styles/colors';
import Fordong1 from '@assets/images/svgs/Fordong/Fordong1';
import user_order from '@/mocks/data/user_order.json';
import { ClickBtn } from '@/components/mypage/profile';
import { KeyboardArrowDown, KeyboardArrowUp } from '@/assets/images/svgs';
import { useEffect, useState } from 'react';

export const OrderHistoryPage = () => {
  const handleClick = () => {
    setIsClicked(!isClicked)
    console.log("버튼 클릭")
  };
  const [isClicked, setIsClicked] = useState(false);

  useEffect(()=>{
    console.log("상태 변경")
  }, [isClicked])

  return (
    <Flex
      direction="column"
      justify="flex-start"
      align="flex-start"
      padding="0 12px"
    >
      <OrderHistory date="24.10.22" onClick={handleClick}>
        <Flex direction="row" justify="space-between">
          <Text typo="Label2" colorCode={colors.MainColor}>
            결제 완료
          </Text>
          <ClickBtn onClick={handleClick} width={20} height={20}>
            {isClicked ? <KeyboardArrowUp/> : <KeyboardArrowDown />}
          </ClickBtn>
        </Flex>
        <Flex direction="row" gap={10} justify="flex-start">
          <Fordong1 width={70} height={70} />
          <Flex direction="column" align="flex-start" gap={3}>
            <Text typo="Body3" colorCode={colors.Black}>
              닥터할리 펫밀크 홍삼 200ML
            </Text>
            <Flex direction="row" align="center" justify="flex-start" gap={10}>
              <Text typo="Label1" colorCode={colors.Black}>
                14,900원
              </Text>
              <Text typo="Body4" colorCode={colors.Gray500}>
                1개
              </Text>
            </Flex>

            <Text typo="Body4" colorCode={colors.Gray500}>
              10.24(목)이내 발송 예정
            </Text>
          </Flex>
        </Flex>
      </OrderHistory>
    </Flex>
  );
};
