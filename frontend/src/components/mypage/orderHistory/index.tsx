import { Flex } from '@/components/common/Flex';
import { Text } from '@/components/common/Typo';
import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import { useState } from 'react';
import { ClickBtn } from '../profile';
import { KeyboardArrowDown, KeyboardArrowUp } from '@/assets/images/svgs';
import { OrderItemType } from '@/assets/types/OrderType';
export const OrderHistory = ({
  date,
  items,
  children,
}: {
  date: string;
  items: OrderItemType[];
  children?: React.ReactNode;
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked(!isClicked);
    console.log('버튼 클릭');
  };

  return (
    <Flex direction="column" gap={10} margin="12px 0 0 0">
      <ClickBtn
        direction="row"
        justify="space-between"
        height={30}
        onClick={handleClick}
      >
        <Text typo="Label1" colorCode={colors.Black}>
          {date}
        </Text>
        <Flex width={20} height={20}>
          {isClicked ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </Flex>
      </ClickBtn>
      {items?.map((item, index) => (
        <OrderWrapper
          justify="flex-start"
          align="flex-start"
          gap={10}
        >
          {(index === 0 || isClicked) && (
            <ProductWrapper>
              <img src={item.product_img} width={90} height={90} />
              <Flex direction="column" align="flex-start" gap={3}>
                <Text typo="Body3" colorCode={colors.Black}>
                  {item.title}
                </Text>
                <Flex
                  direction="row"
                  align="center"
                  justify="flex-start"
                  gap={10}
                >
                  <Text typo="Label1" colorCode={colors.Black}>
                    {item.price}원
                  </Text>
                  <Text typo="Body4" colorCode={colors.Gray500}>
                    {item.quantity}개
                  </Text>
                </Flex>
                <Text typo="Body4" colorCode={colors.Gray500}>
                  10.24(목)이내 발송 예정
                </Text>
              </Flex>
              {children}
            </ProductWrapper>
          )}
        </OrderWrapper>
      ))}
    </Flex>
  );
};

export default OrderHistory;

const OrderWrapper = styled(Flex)`
  /* border: solid 1px ${colors.Gray100}; */
  /* border-radius: 5px; */
  /* padding: 12px 10px; */
  height: fit-content;
`;
const ProductWrapper = styled(Flex)`
  border: solid 1px ${colors.Gray100};
  border-radius: 5px;
  padding: 12px 10px;
  /* height: fit-content; */
`;