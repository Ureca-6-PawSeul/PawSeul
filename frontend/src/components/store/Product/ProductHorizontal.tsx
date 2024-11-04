import { ProductType } from '@assets/types/ProductType';
import { Flex } from '@components/common/Flex';
import { Text } from '@components/common/Typo';
import { Img } from '.';
export const ProductHorizontal = ({
  productImg,
  title,
  price,
  quantity
}: ProductType) => {
  const priceString = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return (
    <Flex direction='row' justify='flex-start' align='center' gap={25}>
      <Flex align="center" borderRadius={10} width={91} height={91}>
        <Img src={productImg} width="90px" height="90px" />
      </Flex>
      <Flex direction="column" align="flex-start" gap={10}>
        <Text typo='Body3'>{title}</Text>
        <Flex justify="flex-start" gap={10}>
        <Text typo='Body3'>{quantity}개</Text>
        <Text typo='Label1'>{priceString}원</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
