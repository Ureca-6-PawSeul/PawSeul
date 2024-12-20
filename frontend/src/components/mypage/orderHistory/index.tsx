import { Flex, HeightFitFlex } from '@/components/common/Flex';
import { Text } from '@/components/common/Typo';
import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import { useState } from 'react';
import { ClickBtn } from '../profile';
import { KeyboardArrowDown, KeyboardArrowUp } from '@/assets/images/svgs';
import { OrderItemType } from '@/assets/types/OrderType';
import { OrderContent } from './orderContent';
import { addDays, format } from 'date-fns';
export const OrderHistory = ({
  date,
  state,
  items,
  bottomContent,
  children,
}: {
  date: Date;
  state: string;
  items: OrderItemType[];
  bottomContent: string;
  children?: React.ReactNode;
}) => {
  const parseDateString = format(date, 'yyyy-MM-dd');
  const shipDateString = format(addDays(date, 3), 'yyyy-MM-dd');
  const [isOpen, setisOpen] = useState<boolean>(false);
  const handleClick = () => {
    setisOpen(!isOpen);
  };

  return (
    <Flex
      direction="column"
      justify="flex-start"
      align="flex-start"
      margin="24px 0 4px 0"
    >
      <HeightFitFlex justify="flex-start" margin="0 0 4px 0">
        <Text typo="Body2" colorCode={colors.Black}>
          {/* {dateString} */}
          {parseDateString}
        </Text>
      </HeightFitFlex>

      <OrderWrapper
        isOpen={isOpen}
        direction="column"
        justify="flex-start"
        align="flex-start"
        gap={10}
      >
        <ClickBtn
          direction="row"
          justify="space-between"
          onClick={handleClick}
          padding="0 4px"
        >
          <Text
            typo="Body2"
            colorCode={state === '결제 취소' ? colors.Red : colors.MainColor}
          >
            {state}
          </Text>
          {items.length > 1 ? (
            isOpen ? (
              <KeyboardArrowUp width={20} height={20} />
            ) : (
              <KeyboardArrowDown width={20} height={20} />
            )
          ) : null}
        </ClickBtn>

        {items?.map((item, index) =>
          index === 0 || isOpen ? (
            // <Flex margin='10px 0' gap={12}>
            //   <Img src={item.product_img} width={90} height={90} />
            //   <Flex direction="column" align="flex-start" gap={3}>
            //     <Text typo="Body3" colorCode={colors.Black}>
            //       {item.title}
            //     </Text>
            //     <Flex
            //       direction="row"
            //       align="center"
            //       justify="flex-start"
            //       gap={10}
            //     >
            //       <Text typo="Label1" colorCode={colors.Black}>
            //         {item.price}원
            //       </Text>
            //       <Text typo="Body4" colorCode={colors.Gray500}>
            //         {item.quantity}개
            //       </Text>
            //     </Flex>
            //     <Text typo="Body4" colorCode={colors.Gray500}>
            //       {bottomContent}
            //     </Text>
            //   </Flex>
            //   {children}
            // </Flex>

            <OrderContent
              productImg={item.productImg}
              title={item.title}
              price={item.price}
              quantity={item.quantity}
              bottomContent={shipDateString + bottomContent}
              children={children}
            />
          ) : null,
        )}
      </OrderWrapper>
    </Flex>
  );
};

export default OrderHistory;

const OrderWrapper = styled(Flex)<{ isOpen: boolean }>`
  border: solid 1px ${colors.Gray100};
  border-radius: 5px;
  padding: 12px 10px;
  height: fit-content;
  background-color: ${({ isOpen }) => (isOpen ? colors.Gray50 : 'transparent')};
  margin-bottom: 12px;
`;
