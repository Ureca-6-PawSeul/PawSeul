import { ProductType } from '@assets/types/ProductType';
import { Flex } from '@components/common/Flex';
import { Text } from '@components/common/Typo';
export const ProductHorizontal = ({
  productImg,
  title,
  price,
}: ProductType) => {
  return (
    <Flex direction='row' justify='flex-start' align='center' gap={25}>
      <Flex align="center" borderRadius={10} width={91} height={91}>
        <img src={productImg} width="100%" height="100%" />
      </Flex>
      <Flex direction="column" align="flex-start" gap={10}>
        <Text typo='Body3'>{title}</Text>
        <Flex justify="flex-start" gap={10}>
        <Text typo='Body3'>1개</Text>
        <Text typo='Label1'>{price}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
