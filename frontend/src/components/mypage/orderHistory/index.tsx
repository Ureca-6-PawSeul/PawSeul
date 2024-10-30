import { Flex } from '@/components/common/Flex';
import { Text } from '@/components/common/Typo';
import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
export const OrderHistory = ({
  date,
  children,
}: {
  date: string;
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <Flex direction="column" gap={10}>
      <Flex justify="space-between" height={12}>
        <Text typo="Label2" colorCode={colors.Black}>
          {date}
        </Text>
      </Flex>
      <OrderWrapper
        direction="column"
        justify="flex-start"
        align="flex-start"
        gap={10}
        padding="10px"
      >
        {children}
      </OrderWrapper>
    </Flex>
  );
};

export default OrderHistory;

const OrderWrapper = styled(Flex)`
  border: solid 1px ${colors.Gray100};
  /* border-radius: 5px; */
  padding: 10px 10px;
  height: fit-content;
`;
