import { Flex } from '@components/common/Flex';
import { Text } from '@components/common/Typo';
import styled from '@emotion/styled';
import Checkbox from '@/components/cart/Checkbox';
import { colors } from '@styles/colors';

import CartItem from '@components/cart/CartItem';
import CartCost from '@/components/cart/CartCost';
import { CartEmptyBlack } from '@/assets/images/svgs';

import useCartStore from '@/store/cartStore';
import { useEffect } from 'react';

const Cart = () => {
  const {
    cartItems,
    selectedItems,
    totalPrice,
    toggleSelectItem,
    toggleSelectAll,
    deleteItem,
    deleteSelectedItems,
    calculateTotalPrice,
  } = useCartStore();

  const allSelected = cartItems.length > 0 && selectedItems.length === cartItems.length;

  //selectedItems가 바뀔 때 마다 총 가격을 계산함
  useEffect(() => {
    calculateTotalPrice();
  }, [selectedItems]);
  
  const handleAllItemSelect = () => {
    toggleSelectAll();
  }

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
        <DeleteText typo="Label1" colorCode={colors.Gray500} onClick={deleteSelectedItems}>
          상품삭제
        </DeleteText>
      </CartHeader>
      <Flex direction="column">
        <CartListWrapper direction="column" margin="16px 0px" justify='flex-start'>
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => {
              return (
                <CartItem
                  key={index}
                  item={item}
                  index={index}
                />
              );
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
    </Flex>
  );
};

const CartWrapper = styled(Flex)`
  position: relative;
`; 

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
