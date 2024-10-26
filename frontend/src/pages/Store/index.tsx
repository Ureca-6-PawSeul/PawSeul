import styled from '@emotion/styled';
import { Flex } from '@components/common/Flex';
import { Header } from '@components/common/Header';
import { Text } from '@components/common/Typo';
import { colors } from '@styles/colors';
import { Product } from '@components/store/Product';
import { useEffect, useState } from 'react';
import Navbar from '@components/common/Navbar';
import { ProductDetailType, ProductType } from '@components/store/Product/type';
// import { getSnackData } from '@apis/snack';
import snack from '@/mocks/data/snack.json';

type Category = '사료' | '간식' | '영양제';

interface SubCategories {
  [key: string]: string[];
}

const subCategories: SubCategories = {
  사료: ['전체', '건식', '습식', '기타'],
  간식: ['수제간식', '건조간식', '져키', '트릿'],
  영양제: ['캡슐', '알약', '스틱', '바이오틱스', '기타'],
};

const Store = () => {
  // 선택한 카테고리를 상태로 관리
  const [selectedCategory, setSelectedCategory] = useState<Category>('사료');

  const [items, setItems] = useState<ProductDetailType[]>([]);
  const fetchData = async () => {
    const data = snack;
    setItems(data);
  };

  useEffect(() => {
    fetchData();
  }, [selectedCategory]);

  useEffect(() => {
    console.log(items);
  }, [items]);

  return (
    <>
      <Header />
      <Flex
        direction="column"
        justify="flex-start"
        align="center"
        gap={5}
        style={{ border: 'solid 1px' }}
      >
        {/* 카테고리 버튼 */}
        <Flex direction="row" align="center" height={40}>
          <button onClick={() => setSelectedCategory('사료')}>사료</button>
          <button onClick={() => setSelectedCategory('간식')}>간식</button>
          <button onClick={() => setSelectedCategory('영양제')}>영양제</button>
        </Flex>
        <Flex justify="flex-start" height={40}>
          <Text colorCode={colors.Black} typo="Heading3" align="flex-start">
            여은이의 맞춤 상품 찾기
          </Text>
        </Flex>
        <Flex direction="row" justify="flex-start" height={40}>
          {subCategories[selectedCategory]?.map((subCategory, index) => (
            <button key={index}>{subCategory}</button>
          ))}
        </Flex>
        {/* 상품 리스트 */}
        <Wrapper direction="row" justify="start" gap={8}>
          {items.map((item) => {
            return (
              <ProductWrapper key={item.index}>
                <Product
                  index={item.index}
                  product_img={item.product_img}
                  title={item.title}
                  price={item.price}
                />
              </ProductWrapper>
            );
          })}
        </Wrapper>

        <Navbar />
      </Flex>
    </>
  );
};

export default Store;

const Wrapper = styled(Flex)`
  overflow-y: auto; /* 세로 스크롤을 추가 */
  overflow-x: hidden;
  max-height: calc(100% - 200px);
  flex-wrap: wrap;
  width: 100%;
`;

const ProductWrapper = styled.div`
  width: calc(33.33% - 8px); /* 한 행에 3개씩 배치되도록 3등분 */
  box-sizing: border-box;
`;
