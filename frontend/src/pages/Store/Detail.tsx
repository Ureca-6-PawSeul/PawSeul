import styled from '@emotion/styled';
import { Flex } from '@components/common/Flex';
import { Text } from '@components/common/Typo';
import { colors } from '@styles/colors';
import { Hr } from '@components/store/Hr';
import foodDetail from '@/mocks/data/foodDetail.json';
import tableData from '@/utils/tableData';
import DetailTable from '@components/store/detail/DetailTable';
import DetailImageList from '@components/store/detail/DetailImageList';
import StarRating from '@components/store/Star';
import ProductReview from '@components/store/detail/ProductReview';
import reviews from '@/mocks/data/review.json';

const Detail = () => {
  const mock = foodDetail;
  const descriptionData = tableData(mock);
  const reviewCount = reviews.length;

  return (
    <Wrapper direction="column" justify="center" gap={20}>
      <Image src={mock.product_img} alt="product_img" />
      <Flex direction="column" gap={20} padding="40px 0 0">
        <Flex
          direction="column"
          align="flex-start"
          gap={7}
          padding="0px 16px"
        >
          <Text typo="Heading3" align="flex-start">{mock.title}</Text>
          <Flex gap={8} justify="flex-start">
            <StarRating score={mock.score} size={14} width={74} gap={1} />
            <DetailText
              typo="Body3"
              colorCode={colors.Gray500}
              decorationLine="underline"
              justify="flex-start"
            >
              {`${reviewCount}개 후기`}
            </DetailText>
          </Flex>
        </Flex>
        <Flex justify="flex-end" padding="0px 16px">
          <Text typo="Heading3">{mock.price}</Text>
        </Flex>
      </Flex>
      <Hr />
      <Flex direction="column" gap={16} justify="flex-start" padding="0px 16px">
        <DetailText typo="Heading3" justify="flex-start">
          상품 설명
        </DetailText>
        <DetailTable tableData={descriptionData} />
      </Flex>
      <Flex direction="column" padding="16px 0px">
        <DetailImageList images={mock.description_img} />
      </Flex>
      <Hr />
      <ProductReview />
    </Wrapper>
  );
};

const Wrapper = styled(Flex)`
  overflow-y: scroll;
  /* height: calc(100% - 60px); */
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
`;

const DetailText = styled(Text)<{
  decorationLine?: string;
  justify?: string;
  width?: string;
}>`
  text-decoration-line: ${({ decorationLine }) =>
    decorationLine ? `${decorationLine}` : 'none'};
  justify-content: ${({ justify }) => (justify ? `${justify}` : 'center')};
  width: ${({ width }) => (width ? `${width}` : '100%')};
`;

export default Detail;
