import { Text } from '@/components/common/Typo';
import { Img } from '@/components/store/Product';
import { colors } from '@/styles/colors';
import { Flex } from '@components/common/Flex';

export const OrderContent = ({
  productImg,
  title,
  price,
  quantity,
  bottomContent,
  children,
}: {
  productImg: string;
  title: string;
  price: number;
  quantity: number;
  bottomContent: string;
  children?: React.ReactNode;
}) => {
  const priceString = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <Flex
      justify="flex-start"
      align="flex-start"
      margin="10px 0"
      padding="8px 12px 0 12px"
      gap={16}
      height="fit-content"
    >
      <Img src={productImg} width="80px" height="80px" />
      <Flex direction="column" align="flex-start" gap={3}>
        <Text typo="Body3" colorCode={colors.Black}>
          {title}
        </Text>
        <Flex direction="row" align="center" justify="flex-start" gap={10}>
          <Text typo="Label1" colorCode={colors.Black}>
            {priceString}원
          </Text>
          <Text typo="Body4" colorCode={colors.Gray500}>
            {quantity}개
          </Text>
        </Flex>
        <Text typo="Body4" colorCode={colors.Gray500}>
          {bottomContent}
        </Text>
        <Flex height="fit-content" justify="flex-end">
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};
