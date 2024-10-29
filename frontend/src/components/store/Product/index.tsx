import styled from '@emotion/styled';
import { Flex } from '../../common/Flex';
import { Text } from '../../common/Typo';
import { colors } from '@styles/colors';
import StarRating from '@components/store/Star';
import { ProductType } from '@assets/types/ProductType';

export const Product = ({ product_img, title, price }: ProductType) => {
  return (
    <Wrapper
      direction="column"
      widthPer={100}
      height={232}
      align="flex-start"
      gap={1}
      padding="2"
      backgroundColor={colors.White}
      onClick={() => navigate('/store/detail/1')}
    >
      <Flex direction="column" align="center">
        <Img src={product_img} width="100%" />
      </Flex>
      <Flex height="auto">
        <Title colorCode={colors.Black} typo="Body3">
          {title}
        </Title>
      </Flex>
      <Text colorCode={colors.Black} typo="Label1">
        {price}
      </Text>
      <Flex
        direction="row"
        height={10}
        justify="flex-start"
        align="flex-end"
        gap={1}
      >
        <StarRating score={4.5} />
        <Text colorCode={colors.Black} typo="Body4">
          {4}
        </Text>
        <Text colorCode={colors.Gray400} typo="Body4">
          /
        </Text>
        <Text colorCode={colors.Gray400} typo="Body4">
          5.0
        </Text>
      </Flex>
    </Wrapper>
  );
};

const Wrapper = styled(Flex)`
  box-sizing: border-box;
  border-radius: 10px;
  cursor: pointer;
  /* &:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  } */
`;

// 두줄 이상 말줄임표
const Title = styled(Text)`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  white-space: normal;
`;

export const Img = styled.img`
  border-radius: 10px;
`;
