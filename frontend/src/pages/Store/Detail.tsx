import styled from '@emotion/styled';
import { Flex } from '@components/common/Flex';
import { Text } from '@components/common/Typo';
import { colors } from '@styles/colors';
import foodDetail from '@/mocks/data/foodDetail.json';
import tableData from '@/utils/tableData';
import DetailTable from '@components/store/detail/DetailTable';
import DetailImageList from '@components/store/detail/DetailImageList';

const Detail = () => {
  const mock = foodDetail;
  const descriptionData = tableData(mock);

  return (
    <>
      <Flex direction="column" padding="0px 10px" gap={20}>
        <Image src={mock.product_img} alt="product_img" />
        <Flex direction="column" gap={10}>
          <Flex direction="column" justify="flex-start" gap={7}>
            <Text typo="Heading3">{mock.title}</Text>
            <Flex gap={4} justify="flex-start">
              <Text>★★★★★{/* 별점 */}</Text>
              <DetailText
                typo="Body3"
                colorCode={colors.Gray500}
                decorationLine="underline"
              >
                {/* 후기 개수*/}
                12,345개 후기
              </DetailText>
            </Flex>
          </Flex>
          <Flex justify="flex-end">
            <Text typo="Heading3">{mock.price}</Text>
          </Flex>
        </Flex>
        <Separator />
        <Flex direction="column" gap={16} justify="flex-start">
          <DetailText typo="Heading3" justify="flex-start" width="100%">
            상품 설명
          </DetailText>
          <DetailTable tableData={descriptionData} />
        </Flex>
        <Flex direction="column" padding="16px 0px">
          <DetailImageList images={mock.description_img}/>
        </Flex>
        <Separator />
        {/* 후기 목록 */}
      </Flex>
    </>
  );
};

const Image = styled.img<{
  width?: number;
  height?: number;
}>`
  object-fit: cover;
  width: ${({ width }) => (width ? `${width}%` : '100%')};
`;

const DetailText = styled(Text)<{
  decorationLine?: string;
  justify?: string;
  width?: string;
}>`
  text-decoration-line: ${({ decorationLine }) =>
    decorationLine ? `${decorationLine}` : 'none'};
  justify-content: ${({ justify }) => (justify ? `${justify}` : 'center')};
  width: ${({ width }) => (width ? `${width}` : 'auto')};
`;

const Separator = styled.div`
  width: 100vw;
  height: 10px;
  background-color: ${colors.Gray100};
`;

export default Detail;
