import { Flex } from '@components/common/Flex';
import { Text } from '@components/common/Typo';
import styled from '@emotion/styled';
import Checkbox from '@/components/cart/Checkbox';
import { colors } from '@styles/colors';

import CartItem from '@components/cart/CartItem';
import CartCost from '@/components/cart/CartCost';
import { CartEmptyBlack, ErrorIcon } from '@/assets/images/svgs';

import useCartStore from '@/stores/cartStore';
import { useCartQuery } from '@/apis/hooks/useCartQuery';

import { useEffect } from 'react';
import StickyFooter from '@/components/store/StickyFooter';
import { Button } from '@/components/common/Button';
import client from '@/apis/client';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Toast } from '@/components/common/Toast';

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
  const setSelectedItems = useCartStore((state) => state.setSelectedItems);

  // useEffect에서 cartItems나 selectedItems가 바뀔 때마다 실행
  useEffect(() => {
    if (data) {
      setCartItems(data);

      // data를 기반으로 selectedItems의 수량을 업데이트한 배열
      const updatedSelectedItems = useCartStore
        .getState()
        .selectedItems.map((selectedItem) => {
          const updatedItem = data.find(
            (item) => item.productId === selectedItem.productId,
          );
          return updatedItem
            ? { ...selectedItem, quantity: updatedItem.quantity }
            : selectedItem;
        });

      // updatedSelectedItems로 selectedItems 업데이트
      setSelectedItems(updatedSelectedItems);
      calculateTotalPrice();
    }
  }, [data, setCartItems, setSelectedItems, calculateTotalPrice]);

  // 수량이 변경될 때 총 가격을 다시 계산
  useEffect(() => {
    calculateTotalPrice();
  }, [cartItems, selectedItems]);

  const allSelected =
    cartItems.length > 0 && selectedItems.length === cartItems.length;

  const handleAllItemSelect = () => {
    toggleSelectAll();
  };

  const notify = (msg: string) => {
    toast(
      <Flex justify="space-between">
        <span>{msg}</span>
        <ErrorIcon width={24} height={24} style={{ marginLeft: '8px' }} />
      </Flex>,
      {
        position: 'bottom-center',
      },
    );
  };

  const handleDeleteSelectedItems = async () => {
    // selectedItems에서 productId 배열 생성
    const deleteSelectedData = {
      productIds: selectedItems.map((item) => item.productId),
    };

    try {
      const response = await client.delete('/cart/remove', {
        data: deleteSelectedData, // 요청 본문에 배열 데이터를 포함
      });

      if (response) {
        deleteSelectedItems(); // 상태에서 선택된 아이템 삭제
        notify('선택한 상품이 삭제되었습니다.');
      }
    } catch (error) {
      notify('선택한 상품 삭제에 실패했습니다.');
    }
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
          onClick={handleDeleteSelectedItems}
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
      <Toast />
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
