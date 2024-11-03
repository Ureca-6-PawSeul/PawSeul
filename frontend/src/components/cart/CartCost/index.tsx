import { colors } from '@styles/colors';
import { Flex } from '@components/common/Flex';
import { Text } from '@components/common/Typo';
import styled from '@emotion/styled';

interface CartCostProps {
  cost: number;
}

const CartCost = ({cost}:CartCostProps) => {
  return (
    <Flex
    direction="column"
    justify="space-between"
    backgroundColor={colors.White}
    padding="20px 16px"
    height={176}
  >
    <CostWrapper direction="column" align="flex-start">
      <Flex justify="space-between" padding="0 0 14px">
        <CostTitle typo='Body4'>상품금액</CostTitle>
        <Text typo='Body2'>{cost.toLocaleString('ko-KR')}원</Text>
      </Flex>
      <Flex justify="space-between" padding="0 0 14px">
        <CostTitle>배송비</CostTitle>
        <Text typo='Body2'>무료</Text>
      </Flex>
    </CostWrapper>
    <Flex justify="space-between" padding="16px 0 0">
      <Text typo="Heading4">총 결제 금액</Text>
      <TotalPrice typo="Heading2">{cost.toLocaleString('ko-KR')}원</TotalPrice>
    </Flex>
  </Flex>
  );
}

const CostWrapper = styled(Flex)`
  border-bottom: 1px solid ${colors.Gray50};
`;

const CostTitle = styled(Text)`
  font-size: 15px;
  color: ${colors.Gray700};
`
const TotalPrice = styled(Text)`
  text-align: right;
  font-weight: 700;
  letter-spacing: -.5px;
  color: ${colors.MainColor};
`;

export default CartCost;