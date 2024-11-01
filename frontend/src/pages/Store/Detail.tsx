import styled from '@emotion/styled';
import { Flex } from '@components/common/Flex';
import { Text } from '@components/common/Typo';
import { colors } from '@styles/colors';
import foodDetail from '@/mocks/data/foodDetail.json';
import tableData from '@/utils/tableData';
import DetailTable from '@components/store/detail/DetailTable';
import DetailImageList from '@components/store/detail/DetailImageList';
import StarRating from '@components/store/Star';
import ProductReview from '@components/store/detail/ProductReview';
import reviews from '@/mocks/data/review.json';
import { useRef } from 'react';

const Detail = () => {
  const mock = foodDetail;
  const descriptionData = tableData(mock);
  const reviewCount = reviews.length;
  const reviewRef = useRef<HTMLDivElement>(null);

  const handleRefClick = () => {
    reviewRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Wrapper
      direction="column"
      justify="flex-start"
      padding="0 0 80px 0"
      backgroundColor={colors.Gray50}
      height="fit-content"
    >
      <Image src={mock.product_img} alt="product_img" />
      <Flex
        direction="column"
        gap={12}
        padding="60px 0 32px 0"
        backgroundColor={colors.White}
      >
        <Flex direction="column" align="flex-start" gap={7} padding="0px 16px">
          <Text typo="Heading3" align="flex-start">
            {mock.title}
          </Text>
          <Flex gap={8} justify="flex-start">
            <StarRating score={mock.score} size={14} width={74} gap={1} />
            <DetailText
              typo="Body3"
              colorCode={colors.Gray500}
              decorationLine="underline"
              justify="flex-start"
              cursor="pointer"
              onClick={handleRefClick}
            >
              {`${reviewCount}개 후기`}
            </DetailText>
          </Flex>
        </Flex>
        <Flex justify="flex-end" padding="0px 16px">
          <PriceText typo="Heading2">{mock.price}</PriceText>
        </Flex>
      </Flex>
      <Flex
        direction="column"
        gap={16}
        justify="flex-start"
        padding="32px 16px 48px 16px"
        margin="16px 0 0"
        backgroundColor={colors.White}
      >
        <DetailText typo="Heading3" justify="flex-start">
          상품 설명
        </DetailText>
        <DetailTable tableData={descriptionData} />
      </Flex>
      <Flex
        direction="column"
        padding="0 0 32px"
        backgroundColor={colors.White}
      >
        <DetailImageList images={mock.description_img} />
      </Flex>
      <ProductReview ref={reviewRef} />
    </Wrapper>
  );
};

const Wrapper = styled(Flex)`
  /* height: calc(100% - 60px); */
  /* flex: 1; */
`;

const Image = styled.img`
  width: 100%;
`;

const DetailText = styled(Text)<{
  decorationLine?: string;
  justify?: string;
  width?: string;
  cursor?: string;
}>`
  text-decoration-line: ${({ decorationLine }) =>
    decorationLine ? `${decorationLine}` : 'none'};
  justify-content: ${({ justify }) => (justify ? `${justify}` : 'center')};
  width: ${({ width }) => (width ? `${width}` : '100%')};
  cursor: ${({ cursor }) => (cursor ? `${cursor}` : 'auto')};
`;

const PriceText = styled(Text)`
  letter-spacing: -0.5px;
`;

export default Detail;
