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
  return (
    <Flex
      justify="flex-start"
      align="flex-start"
      margin="10px 0"
      gap={12}
      height="fit-content"
    >
      <Img src={productImg} width={90} height={90} />
      <Flex direction="column" align="flex-start" gap={3}>
        <Text typo="Body3" colorCode={colors.Black}>
          {title}
        </Text>
        <Flex direction="row" align="center" justify="flex-start" gap={10}>
          <Text typo="Label1" colorCode={colors.Black}>
            {price}원
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
