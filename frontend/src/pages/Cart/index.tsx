import { Flex } from '@components/common/Flex';
import { Text } from '@components/common/Typo';
import styled from '@emotion/styled';
import Checkbox from '@/components/cart/Checkbox';
import { colors } from '@styles/colors';

import CartItem from '@components/cart/CartItem';
import CartCost from '@/components/cart/CartCost';
import { CartEmptyBlack } from '@/assets/images/svgs';

import useCartStore from '@/stores/cartStore';
import useCartQuery from '@/apis/hooks/useCartQuery';

import { useEffect } from 'react';
import StickyFooter from '@/components/store/StickyFooter';
import { Button } from '@/components/common/Button';

const Cart = () => {
  const data = useCartQuery();
  const setCartItems = useCartStore((state) => state.setCartItems);
  const cartItems = useCartStore((state) => state.cartItems);
  const selectedItems = useCartStore((state) => state.selectedItems);
  const totalPrice = useCartStore((state) => state.totalPrice);
  const toggleSelectAll = useCartStore((state) => state.toggleSelectAll);
  const deleteSelectedItems = useCartStore(
    (state) => state.deleteSelectedItems,
  );
  const calculateTotalPrice = useCartStore(
    (state) => state.calculateTotalPrice,
  );

  // useEffect에서 cartItems나 selectedItems가 바뀔 때마다 실행
  useEffect(() => {
    if (data) {
      setCartItems(data);
    }
  }, [data]);

  // 수량이 변경될 때 총 가격을 다시 계산
  useEffect(() => {
    calculateTotalPrice();
  }, [cartItems, selectedItems]);

  const allSelected =
    cartItems.length > 0 && selectedItems.length === cartItems.length;

  const handleAllItemSelect = () => {
    toggleSelectAll();
  };

  return (
    <Flex
      direction="column"
      backgroundColor={colors.Gray50}
      margin="0 0 62px 0"
      justify="flex-start"
    >
      <CartHeader
        justify="space-between"
        backgroundColor={colors.White}
        padding="16px 16px"
        height={64}
      >
        <Flex gap={8} justify="flex-start">
          <Label>
            <Checkbox
              isChecked={allSelected}
              handleSelect={handleAllItemSelect}
              size={24}
            />
          </Label>
          <Text typo="Label1">전체선택</Text>
        </Flex>
        <DeleteText
          typo="Label1"
          colorCode={colors.Gray500}
          onClick={deleteSelectedItems}
        >
          상품삭제
        </DeleteText>
      </CartHeader>
      <Flex direction="column">
        <CartListWrapper
          direction="column"
          margin="16px 0px"
          justify="flex-start"
        >
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => {
              return <CartItem key={index} item={item} index={index} />;
            })
          ) : (
            <Flex backgroundColor={colors.White}>
              <CartEmptyBlack width="180px" />
            </Flex>
          )}
        </CartListWrapper>
      </Flex>
      {cartItems.length > 0 ? (
        <CartCost cost={totalPrice} />
      ) : (
        <CartCost cost={0} />
      )}
      <StickyFooter isScrolledToBottom={false}>
        <Button
          bg={colors.MainColor}
          onClick={() => {
            window.location.href = '/payment';
          }}
        >
          결제하기
        </Button>
      </StickyFooter>
    </Flex>
  );
};

const CartHeader = styled(Flex)`
  position: sticky;
  top: 0px;
  z-index: 5;
  border-bottom: 1px solid ${colors.Gray50};
`;

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
  cursor: pointer;
`;

const CartListWrapper = styled(Flex)`
  position: relative;
  top: 0;
`;

export default Cart;
