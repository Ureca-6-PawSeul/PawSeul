import { Flex } from '@components/common/Flex';
import { Text } from '@components/common/Typo';
import carts from '@/mocks/data/cart.json';
import styled from '@emotion/styled';
import Checkbox from '@/components/cart/Checkbox';
import { colors } from '@styles/colors';

import CartItem from '@components/cart/CartItem';
import CartCost from '@/components/cart/CartCost';
import { CartEmptyBlack } from '@/assets/images/svgs';

const Cart = () => {
  const cartList = carts;
  const totalPrice = cartList.reduce(
    (acc, cart) => acc + cart.price * cart.quantity,
    0,
  );

  return (
    <Flex
      direction="column"
      backgroundColor={colors.Gray50}
      margin="0 0 62px 0"
      justify="flex-start"
    >
      <Flex
        justify="space-between"
        backgroundColor={colors.White}
        padding="20px 16px"
        height="fit-content"
      >
        <Flex gap={8} justify="flex-start">
          <Label>
            <Checkbox isChecked={false} size={24} />
          </Label>
          <Text typo="Label1">전체선택</Text>
        </Flex>
        <DeleteText typo="Label1" colorCode={colors.Gray500}>
          상품삭제
        </DeleteText>
      </Flex>
      <Flex direction="column">
        <CartListWrapper direction="column" margin="16px 0px">
          {cartList.length > 0 ? (
            cartList.map((item, index) => {
              return <CartItem key={index} item={item} index={index} />;
            })
          ) : (
            <Flex backgroundColor={colors.White}>
              <CartEmptyBlack width="180px" />
            </Flex>
          )}
        </CartListWrapper>
      </Flex>
      {cartList.length > 0 ? (
        <CartCost cost={totalPrice} />
      ) : (
        <CartCost cost={0} />
      )}
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
  position: relative;
`;

export default Cart;
