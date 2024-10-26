import styled from '@emotion/styled';
import { Flex } from '../../common/Flex';
import { Text } from '../../common/Typo';
import { colors } from '@styles/colors';
import StarRating from '@components/store/Star';
import { ProductType } from './type';

export const Product = ({ product_img, title, price }: ProductType) => {
  return (
    <Wrapper
      direction="column"
      widthPer={100}
      height={210}
      align="flex-start"
      gap={1}
      padding="2"
      backgroundColor={colors.White}
    >
      <ProductImage src={product_img} />
      <TitleWrapper>
        <Title colorCode={colors.Black} typo="Body3">
          {title}
        </Title>
      </TitleWrapper>
      <Text colorCode={colors.Black} typo="Label1">
        {price}
      </Text>
      <RatingWrapper height={10} align="center">
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
      </RatingWrapper>
    </Wrapper>
  );
};

const Wrapper = styled(Flex)`
  box-sizing: border-box;
  border-radius: 10px;
  &:hover {
    transform: scale(1.02); /* 2px 확대 효과 */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
`;
const ProductImage = styled.img`
  width: 100%;
  border-radius: 10px;
`;
const RatingWrapper = styled(Flex)`
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 1px;
`;

const TitleWrapper = styled(Flex)`
  height: auto;
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
