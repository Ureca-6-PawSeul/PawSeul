import { Flex } from '@components/common/Flex';
import { Text } from '@components/common/Typo';
import styled from '@emotion/styled';
import Checkbox from '@/components/cart/Checkbox';
import { colors } from '@styles/colors';

import CartItem from '@components/cart/CartItem';
import CartCost from '@/components/cart/CartCost';
import { CartEmptyBlack } from '@/assets/images/svgs';

import useCartStore from '@/store/cartStore';

const Cart = () => {
  // const cartList = carts;

  // // 전체 cartItem 관리
  // const [cartItems, setCartItems] = useState([]);
  // // cartItem의 id 관리
  // const [selectedItemIds, setSelectedItemIds] = useState([]);

  // useEffect(() => {
  //   setCartItems(carts);
  // }, []);

  // const totalPrice = cartItems.reduce(
  //   (acc, cart) => acc + cart.price * cart.quantity,
  //   0,
  // );

  // // 개별 선택 체크박스 핸들러
  // const handleItemSelect = (product_id) => {
  //   setSelectedItemIds((prevSelected) =>
  //     prevSelected.includes(product_id)
  //       ? prevSelected.filter((id) => id !== product_id)
  //       : [...prevSelected, product_id],
  //   );
  // };

  // // 전체 선택 체크박스 핸들러
  // const handleAllItemSelect = () => {
  //   if (selectedItemIds.length === cartItems.length) {
  //     setSelectedItemIds([]);
  //   } else {
  //     setSelectedItemIds(cartItems.map((item) => item.product_id));
  //   }
  // };

  // // 개별 아이템 삭제 핸들러
  // const handleItemDelete = (product_id) => {
  //   setCartItems((prevItems) => prevItems.filter((item) => item.product_id !== product_id));
  //   setSelectedItemIds((prevSelected) => prevSelected.filter((id) => id !== product_id));
  // }

  // // 선택된 아이템 삭제 핸들러
  // const handleSelectedItemDelete = () => {
  //   setCartItems((prevItems) =>
  //     prevItems.filter((item) => !selectedItemIds.includes(item.product_id)),
  //   );
  //   setSelectedItemIds([]);
  // };

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
            {/* 장바구니가 비었을 경우 경고 메세지 날리기 */}
            <Checkbox
              isChecked={selectedItemIds.length === cartItems.length && cartItems.length > 0}
              handleSelect={handleAllItemSelect}
              size={24}
            />
          </Label>
          <Text typo="Label1">전체선택</Text>
        </Flex>
        <DeleteText typo="Label1" colorCode={colors.Gray500} onClick={handleSelectedItemDelete}>
          상품삭제
        </DeleteText>
      </Flex>
      <Flex direction="column">
        <CartListWrapper direction="column" margin="16px 0px">
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => {
              return (
                <CartItem
                  key={index}
                  item={item}
                  index={index}
                  handleSelect={handleItemSelect}
                  handleDelete={handleItemDelete}
                  isChecked={selectedItemIds.includes(item.product_id)}
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
`;

export default Cart;
