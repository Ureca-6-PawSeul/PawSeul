import { Flex } from '@components/common/Flex';
import { Text } from '@components/common/Typo';
import styled from '@emotion/styled';
import Checkbox from '@/components/cart/Checkbox';
import { colors } from '@styles/colors';

import CartItem from '@components/cart/CartItem';
import CartCost from '@/components/cart/CartCost';
import { CartEmptyBlack, ErrorIcon } from '@/assets/images/svgs';

import useCartStore from '@/stores/cartStore';
import { useCartQuery } from '@/apis/hooks/cart';

import { useEffect, useState } from 'react';
import StickyFooter from '@/components/store/StickyFooter';
import { Button } from '@/components/common/Button';
import client from '@/apis/client';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Toast } from '@/components/common/Toast';
import { Modal } from '@/components/common/Modal';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

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

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
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
        setSelectedItems([]); // 선택된 아이템 초기화
        toggleModal(); // 모달 닫기
        notify('선택한 상품이 삭제되었습니다.');
      }
    } catch (error) {
      notify('선택한 상품 삭제에 실패했습니다.');
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleMoveToPayment = () => {
    if (selectedItems.length === 0) {
      notify('상품을 선택해주세요.');
      return;
    }
    window.location.href = '/payment';
  };

  return (
    <Flex
      direction="column"
      backgroundColor={colors.Gray50}
      margin="0 0 62px 0"
      justify="flex-start"
    >
      <CartHeader
        justify="flex-start"
        backgroundColor={colors.White}
        padding="16px 16px"
        direction="column"
        gap={24}
        height={108}
      >
        <Flex justify="flex-start">
          <IoIosArrowBack
            size={26}
            color={colors.Black}
            onClick={handleBack}
            style={{ cursor: 'pointer' }}
          />
        </Flex>
        <Flex>
          <Flex gap={8} justify="flex-start">
            <Label>
              <Checkbox
                isChecked={allSelected}
                handleSelect={handleAllItemSelect}
                size={24}
              />
            </Label>
            <Text typo="Label1">전체선택 ({selectedItems.length > 0 ? selectedItems.length : 0 }/{cartItems.length > 0 ? cartItems.length : 0})</Text>
          </Flex>
          <DeleteText
            typo="Label1"
            colorCode={colors.Gray500}
            onClick={toggleModal}
          >
            상품삭제
          </DeleteText>
        </Flex>
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
        <Button bg={colors.MainColor} onClick={handleMoveToPayment} height='40px'>
          결제하기
        </Button>
      </StickyFooter>
      <Toast />
      {isModalOpen && ( // 장바구니 추가 모달
        <Modal isOpen={isModalOpen} toggleModal={toggleModal}>
          <Flex direction="column" padding="16px 0 0" gap={8}>
            <Text typo="Heading4">선택한 상품을 삭제하시겠습니까?</Text>
            <Flex padding="0px 24px" margin="16px 0 16px" gap={24}>
              <Button
                height="40px"
                bg={colors.Gray400}
                onClick={() => {
                  toggleModal();
                }}
              >
                취소
              </Button>
              <Button height="40px" onClick={handleDeleteSelectedItems}>
                삭제
              </Button>
            </Flex>
          </Flex>
        </Modal>
      )}
    </Flex>
  );
};

const CartHeader = styled(Flex)`
  position: sticky;
  top: 0px;
  z-index: 5;
  border-bottom: 1px solid ${colors.Gray50};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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
