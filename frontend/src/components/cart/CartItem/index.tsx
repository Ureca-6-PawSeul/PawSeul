import { Flex } from '@components/common/Flex';
import { Text } from '@components/common/Typo';
import { colors } from '@styles/colors';
import styled from '@emotion/styled';
import Checkbox from '@/components/cart/Checkbox';
import { IoCloseOutline } from 'react-icons/io5';
import { FiPlusCircle } from "react-icons/fi";
import { FiMinusCircle } from "react-icons/fi";
import { CartType } from '@assets/types/CartType';

interface CartItemProps {
  item: CartType;
  index: number | string;
}

const CartItem = ({item, index}: CartItemProps) => {
  return (
    <Flex>
      <CartItemWrapper
        backgroundColor={colors.White}
        padding="24px 0"
        direction="column"
      >
        <Flex align="flex-start" padding="0 16px">
          <Label margin="0 10px 0 0">
            <Checkbox isChecked={true} size={20} />
          </Label>
          <Flex direction="column">
            <Flex justify="space-between" align="flex-start">
              <Image src={item.product_img} />
              <Flex
                direction="column"
                align="flex-start"
                padding="0 0 0 14px"
                gap={16}
              >
                <Title typo="Label1" colorCode={colors.Gray700}>
                  {item.title}
                </Title>
                  <Flex
                    justify="flex-start"
                    gap={12}
                  >
                    <FiPlusCircle color={colors.Gray400} size={20} />
                    <Text typo="Label2" colorCode={colors.Gray600}>{item.quantity}</Text>
                    <FiMinusCircle color={colors.Gray400} size={20} />
                  </Flex>
              </Flex>
              <Flex
                justify="flex-end"
                width="auto"
                margin="0 0 0 20px"
              >
                <IoCloseOutline size={20} color={colors.Gray400} />
              </Flex>
            </Flex>
            <Flex justify="flex-end" padding='12px 0 0'>
              <CartText typo="Heading4">{item.price.toLocaleString('ko-KR')}원</CartText>
            </Flex>
          </Flex>
        </Flex>
      </CartItemWrapper>
    </Flex>
  );
}

const Label = styled.label<{
  margin?: string;
}>`
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  margin: ${({ margin }) => (margin ? margin : '0')};
`;

const Image = styled.img`
  object-fit: cover;
  width: 96px;
`;

const CartItemWrapper = styled(Flex)`
  border-bottom: 1px solid ${colors.Gray50};
`;

const Title = styled(Text)`
  text-overflow: ellipsis;
  white-space: normal;
`;

const CartText = styled(Text)<{
  margin?: string;
  padding?: string;
}>`
  white-space: nowrap;
  margin: ${({ margin }) => (margin ? margin : 'none')};
  padding: ${({ padding }) => (padding ? padding : 'none')};
`;

export default CartItem;