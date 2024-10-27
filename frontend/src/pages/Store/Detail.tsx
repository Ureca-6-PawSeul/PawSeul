import styled from '@emotion/styled';
import { Flex } from '@components/common/Flex';
import { Text } from '@components/common/Typo';
import Navbar from '@components/common/Navbar';
import { colors } from '@styles/colors';

const mock = {
  index: 0,
  category: 'food',
  product_img:
    'https://thumbnail9.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/7295993519305983-34d2ca7f-5ca8-4a5e-ba39-b9776d147b49.jpg',
  title: '탐사 6free 강아지 사료 연어 레시피, 6kg, 연어, 1개',
  price: '25,990원',
  description_img: [
    'https://thumbnail6.coupangcdn.com/thumbnails/remote/q89/image/retail/images/813919679459372-d916cb07-2146-4c48-8519-44bef8fda4bb.jpg',
    'https://thumbnail10.coupangcdn.com/thumbnails/remote/q89/image/retail/images/7138052969640772-d5451202-845b-42ab-9a1f-e51066e277a0.jpg',
    'https://thumbnail7.coupangcdn.com/thumbnails/remote/q89/image/retail/images/2448470305360427-e98910d8-1de2-4eac-adb3-e0adfa435ed1.jpg',
    'https://thumbnail10.coupangcdn.com/thumbnails/remote/q89/image/retail/images/987353662102941-e81d95e3-c720-4a31-8b6e-edc305d6e84e.jpg',
  ],
  main_ingredient: '연어',
  food_function: '미표기',
  target_age: '전연령',
  food_type: '건식사료',
  target_size: '전대상견용',
  is_grainfree: false,
};

const descriptionData = (data: typeof mock) => {
  // data 객체의 키 배열 생성
  const keys = Object.keys(data);
  // description_img 키의 인덱스 찾기
  const startIdx = keys.indexOf('description_img') + 1;

  // description_img 이후의 키만 선택하여 새로운 객체 생성
  // reduce 함수의 초기값 타입 설정
  const afterDescriptionImg = keys.slice(startIdx).reduce((obj, key) => {
    obj[key] = data[key as keyof typeof data];
    return obj;
  }, {} as Record<string, any>); 

  // JSON 문자열로 리턴
  return JSON.stringify(afterDescriptionImg, null, 2);
};

const Detail: React.FC = () => {
  return (
    <>
      <Flex direction="column" padding="0px 10px">
        <Image src={mock.product_img} alt="product_img" />
        <Flex direction="column" gap={10}>
          <Flex direction="column" justify="flex-start" gap={7}>
            <Text typo="Heading3">{mock.title}</Text>
            <Flex gap={4} justify="flex-start">
              <Text>★★★★★{/* 별점 */}</Text>
              <DetailText typo="Body3" colorCode={colors.Gray500} decorationLine="underline">
                {/* 후기 개수*/}
                12,345개 후기
              </DetailText>
            </Flex>
          </Flex>
          <Flex justify="flex-end">
            <Text typo="Heading3">{mock.price}</Text>
          </Flex>
        </Flex>
        <Flex>
          <DetailText typo="Heading3" justify="flex-start" width="100%">
            상품 설명
          </DetailText>
          {/* <ProductTable data={descriptionData}/> */}
        </Flex>
        {mock.description_img.map((img, index) => (
          <Image src={img} key={index} alt={`description_img_${index}`} />
        ))}
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
  /* height: ${({ height }) => (height ? `${height}px` : '50%')}; */
`;

const DetailText = styled(Text)<{
  decorationLine?: string;
  justify?: string;
  width?: string;
}>`
  text-decoration-line: ${({ decorationLine }) => (decorationLine ? `${decorationLine}` : 'none')};
  justify-content: ${({ justify }) => (justify ? `${justify}` : 'center')};
  width: ${({ width }) => (width ? `${width}` : 'auto')};
`;

export default Detail;
