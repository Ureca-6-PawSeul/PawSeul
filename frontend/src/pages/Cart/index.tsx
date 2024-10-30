import { Hr } from '@components/store/Hr';
import { Flex } from '@components/common/Flex';
import { Text } from '@components/common/Typo';
import carts from '@/mocks/data/cart.json';
import styled from '@emotion/styled';
import { Button } from '@components/common/Button';
import Checkbox from '@/components/cart/Checkbox';
import { colors } from '@styles/colors';
import { IoCloseOutline } from 'react-icons/io5';
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";

const Cart = () => {
  const cartList = carts;

  return (
    <Flex direction="column" backgroundColor={colors.Gray50}>
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
        <CartListWrapper direction="column" margin='16px 12px'>
          {cartList.map((cart, index) => {
            return (
              <Flex key={index}>
                <CartItemWrapper
                  backgroundColor={colors.White}
                  
                  padding="24px 0"
                  direction="column"
                >
                  <Flex align="flex-start" padding="0 16px 16px">
                    <Label margin="0 10px 0 0">
                      <Checkbox isChecked={true} size={20} />
                    </Label>
                    <Flex direction="column">
                      <Flex justify="space-between" align="flex-start">
                        <Image src={cart.product_img} />
                        <Flex
                          direction="column"
                          align="flex-start"
                          padding="0 0 0 10px"
                          gap={4}
                        >
                          <Title typo="Label2" colorCode={colors.Gray600}>
                            {cart.title}
                          </Title>
                          <Flex justify='flex-end'>
                      <ChangeCountButton justify='space-between' padding="0px 10px">
                      <FiPlus color={colors.Gray400} size={16}/><Text typo="Label3">{cart.quantity}</Text><FiMinus color={colors.Gray400} size={16}/>
                      </ChangeCountButton>
                    </Flex>
                        </Flex>
                        <Flex justify="flex-end" width="auto" margin="0 0 0 16px">
                          <IoCloseOutline size={20} color={colors.Gray400} />
                        </Flex>
                      </Flex>
                      <Flex justify="flex-end"> 
                      <CartText typo="Label1">{cart.price}</CartText>
                      </Flex>
                    </Flex>
                  </Flex>
                  <Flex direction='column' padding="0px 16px 0" gap={4}>
                    {/* <Flex justify='flex-end'>
                      <ChangeCountButton justify='space-between' padding="0px 10px">
                      <FiPlus color={colors.Gray400} size={16}/><Text typo="Label3">{cart.quantity}</Text><FiMinus color={colors.Gray400} size={16}/>
                      </ChangeCountButton>
                    </Flex> */}
                  </Flex>
                </CartItemWrapper>
              </Flex>
            );
          })}
        </CartListWrapper>
        <Flex
          direction="column"
          justify="space-between"
          backgroundColor={colors.White}
          padding="12px"
        >
          <Flex direction="column" align="flex-start">
            <CartText typo="Heading4" padding="0px 0px 16px">결제 예상 금액</CartText>
            <Flex justify="space-between">
              <Text>상품금액</Text>
              <Text>12,345원</Text>
            </Flex>
            <Flex justify="space-between">
              <Text>배송비</Text>
              <Text>123원</Text>
            </Flex>
          </Flex>
          <Flex justify="space-between">
            <Text>총 결제 금액</Text>
            <Text>12,468원</Text>
          </Flex>
        </Flex>
      </Flex>
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

const Image = styled.img`
  object-fit: cover;
  width: 72px;
`;

const ChangeCountButton = styled(Flex)`
  width: 120px;
  height: 34px;
  border-radius: 2px;
  border: 1px solid ${colors.Gray100}
`;

const CartItemWrapper = styled(Flex)`
  border-bottom: 1px solid ${colors.Gray50};
`;


const CartListWrapper = styled(Flex)`
  box-shadow: rgba(0, 0, 0, 0.04) 0px 0px 8px 0px;

  /* border: 1px solid ${colors.Gray50}; */
  position: relative;
`;

const Title = styled(Text)`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  white-space: normal;
`;

const CartText = styled(Text)<{
  margin?: string,
  padding?: string
}>`
  white-space: nowrap;
  margin: ${({ margin }) => (margin ? margin : 'none')};
  padding: ${({ padding }) => (padding ? padding : 'none')};
`;

export default Cart;
