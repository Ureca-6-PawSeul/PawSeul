import { Flex } from '@components/common/Flex';
import { Text } from '@components/common/Typo';
import { colors } from '@styles/colors';
import styled from '@emotion/styled';
import Checkbox from '@/components/cart/Checkbox';
import { IoCloseOutline } from 'react-icons/io5';
import { FiPlusCircle } from 'react-icons/fi';
import { FiMinusCircle } from 'react-icons/fi';
import { CartType } from '@assets/types/CartType';
import useCartStore from '@/stores/cartStore';
import { useChangeQuantityMutation } from '@/apis/hooks/useCartQuery';

import { ErrorIcon } from '@/assets/images/svgs';
import client from '@/apis/client';
import { debounce } from 'lodash';
import { useCallback, useState } from 'react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Toast } from '@/components/common/Toast';
import { Modal } from '@/components/common/Modal';
import { Button } from '@/components/common/Button';

interface CartItemProps {
  item: CartType;
  index: number | string;
}

const CartItem = ({ item, index }: CartItemProps) => {
  const toggleSelectItem = useCartStore((state) => state.toggleSelectItem);
  const deleteItem = useCartStore((state) => state.deleteItem);
  const isChecked = useCartStore((state) =>
    state.selectedItems.some(
      (selectedItem) => selectedItem.productId === item.productId,
    ),
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const { mutate: changeQuantity } = useChangeQuantityMutation();

  const itemPrice = (item.price * item.quantity).toLocaleString('ko-kR');

  const debouncedChangeQuantity = debounce(
    (changeQuantity, productId, quantity) => {
      changeQuantity({ productId, quantity });
    },
    150, // 150ms 후에 마지막 호출만 실행
  );

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

  const handleChangeQuantity = useCallback(
    (diff: number) => () => {
      const newQuantity = item.quantity + diff;
      if (newQuantity <= 0 || newQuantity > 99) {
        return;
      }
      // 디바운스 적용된 changeQuantity 호출
      debouncedChangeQuantity(changeQuantity, item.productId, newQuantity);
    },
    [item, changeQuantity], // 디펜던시 배열에 필요한 값 추가
  );

  const handleDeleteItem = (productId: string) => async () => {
    const deleteData = { productIds: [productId] };
    try {
      const response = await client.delete('/cart/remove', {
        data: deleteData, // 요청 본문에 데이터 포함
      });
      if (response) {
        deleteItem(productId); // 상태에서 아이템 삭제
        notify('상품이 삭제되었습니다.');
      }
    } catch (error) {
      notify('상품 삭제에 실패했습니다.');
      console.error(error);
    }
  };

  return (
    <CartItemWrapper
      backgroundColor={colors.White}
      padding="24px 0"
      direction="column"
      height="fit-content"
      justify="flex-start"
    >
      <Flex align="flex-start" padding="0 16px">
        <Label margin="0 10px 0 0">
          <Checkbox
            isChecked={isChecked}
            handleSelect={() => toggleSelectItem(item)}
            size={20}
          />
        </Label>
        <Flex direction="column">
          <Flex justify="space-between" align="flex-start">
            <Image src={item.productImg} />
            <Flex
              direction="column"
              align="flex-start"
              padding="0 0 0 14px"
              gap={16}
            >
              <Title typo="Label1" colorCode={colors.Gray700}>
                {item.title}
              </Title>
              <Flex justify="flex-start" gap={12}>
                <CartItemButton
                  width="auto"
                  height="auto"
                  onClick={handleChangeQuantity(-1)}
                >
                  <FiMinusCircle color={colors.Gray400} size={20} />
                </CartItemButton>
                <Text typo="Label2" colorCode={colors.Gray600}>
                  {item.quantity}
                </Text>
                <CartItemButton
                  width="auto"
                  height="auto"
                  onClick={handleChangeQuantity(+1)}
                >
                  <FiPlusCircle color={colors.Gray400} size={20} />
                </CartItemButton>
              </Flex>
            </Flex>
            <CartItemButton
              justify="flex-end"
              width="auto"
              height="auto"
              margin="0 0 0 20px"
              align="flex-start"
              onClick={toggleModal}
            >
              <IoCloseOutline size={20} color={colors.Gray400} />
            </CartItemButton>
            {isModalOpen && (
              <Modal isOpen={isModalOpen} toggleModal={toggleModal}>
                <Flex direction="column" padding="32px 0 0" gap={12}>
                  <Text typo="Heading4">해당 상품을 삭제하시겠습니까?</Text>
                  <Flex padding="0px 52px" margin="20px 0 10px" gap={20}>
                    <Button
                      height="40px"
                      bg={colors.Gray400}
                      onClick={() => {
                        toggleModal();
                      }}
                    >
                      취소
                    </Button>
                    <Button
                      height="40px"
                      onClick={() => {
                        handleDeleteItem(item.productId)();
                        toggleModal();
                      }}
                    >
                      삭제
                    </Button>
                  </Flex>
                </Flex>
              </Modal>
            )}
          </Flex>
          <Flex justify="flex-end" padding="12px 0 0">
            <CartText typo="Heading4">{itemPrice}원</CartText>
          </Flex>
          <Toast />
        </Flex>
      </Flex>
    </CartItemWrapper>
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

const CartItemButton = styled(Flex)`
  cursor: pointer;
`;

export default CartItem;
