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
import { toast } from 'react-toastify';
import { ErrorIcon } from '@/assets/images/svgs';
import client from '@/apis/client';

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
  const { mutate: changeQuantity } = useChangeQuantityMutation();

  const itemPrice = (item.price * item.quantity).toLocaleString('ko-kR');

  const handleChangeQuantity = (diff: number) => () => {
    if (item.quantity + diff <= 0 || item.quantity + diff > 99) {
      return;
    }
    changeQuantity({ productId: item.productId, quantity: item.quantity + diff });
  }

  const handleDeleteItem = (productId: string) => async () => {
    deleteItem(productId); // 상태에서 아이템 삭제
    const deleteData = { productId };
    try {
      const response = await client.delete('/cart/remove', {
        data: deleteData, // 요청 본문에 데이터 포함
      });
      if (response) {
        alert('상품이 삭제되었습니다.');
      }
    } catch (error) {
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
              // onClick={() => deleteItem(item.productId)}
              onClick={handleDeleteItem(item.productId)}
            >
              <IoCloseOutline size={20} color={colors.Gray400} />
            </CartItemButton>
          </Flex>
          <Flex justify="flex-end" padding="12px 0 0">
            <CartText typo="Heading4">{itemPrice}원</CartText>
          </Flex>
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
