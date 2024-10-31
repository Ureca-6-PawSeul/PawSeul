import { Flex } from '@components/common/Flex';
import { Text } from '@components/common/Typo';
import carts from '@/mocks/data/cart.json';
import styled from '@emotion/styled';
import Checkbox from '@/components/cart/Checkbox';
import { colors } from '@styles/colors';

import CartItem from "@components/cart/CartItem";
import CartCost from '@/components/cart/CartCost';

const Cart = () => {
  const cartList = carts;
  const totalPrice = cartList.reduce((acc, cart) => acc + (cart.price * cart.quantity), 0);

  return (
    <Flex
      direction="column"
      backgroundColor={colors.Gray50}
      margin="0 0 62px 0"
    >
      <Flex
        justify="space-between"
        backgroundColor={colors.White}
        padding="0 16px"
        height={40}
      >
        <Flex gap={8} justify="flex-start">
          <Label>
            <Checkbox isChecked={false} size={24} />
          </Label>
          <Text typo="Label1">전체선택</Text>
        </Flex>
        <DeleteText typo="Label3" colorCode={colors.Gray500}>
          상품삭제
        </DeleteText>
      </Flex>
      <Flex direction="column">
        <CartListWrapper direction="column" margin="16px 0px">
          {cartList.map((item, index) => {
            return (
              <CartItem key={index} item={item} index={index}/>
            );
          })}
        </CartListWrapper>
      </Flex>
      <CartCost cost={totalPrice}/>
    </Flex>
  );
};

const Label = styled.label<{
  margin?: string;
}>`
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  margin: ${({ margin }) => (margin ? margin : '0')};
`;

const DeleteText = styled(Text)`
  white-space: nowrap;
`;

const CartListWrapper = styled(Flex)`
  /* box-shadow: rgba(0, 0, 0, 0.04) 0px 0px 8px 0px; */
  position: relative;
`;



export default Cart;
