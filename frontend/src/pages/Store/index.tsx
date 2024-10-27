import styled from '@emotion/styled';
import { Flex } from '@components/common/Flex';
import { Text } from '@components/common/Typo';
import { colors } from '@styles/colors';
import { Product } from '@components/store/Product';
import { SetStateAction, useEffect, useState } from 'react';
import { ProductDetailType } from '@assets/types/ProductType';
import { Category, subCategories } from '@assets/types/CategoryType';
import snack from '@/mocks/data/snack.json';
import { getProductList } from '@/apis/getProductList';
import { useNavigate } from 'react-router-dom';

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
  const fetch = async (
    category: string,
    setProductDataList: React.Dispatch<SetStateAction<ProductDetailType[]>>,
  ) => {
    try {
      await getProductList('food', setProductDataList);
    } catch (e) {
      console.log(e);
    }
  };

  const [selectedCategory, setSelectedCategory] = useState<Category>('사료');
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<string>('전체');
  const [productDataList, setProductDataList] = useState<ProductDetailType[]>(
    [],
  );
  const navigate = useNavigate();
  const handleClick = (productId: number | string) => {
    console.log(`Navigating to detail/${productId}`);
    navigate(`detail/${productId}`);
  };

  useEffect(() => {
    fetch(selectedCategory, setProductDataList);
  }, [selectedCategory]);

  useEffect(() => {
    //productDataList가 업데이트될 때 재렌더링
    // let filteredItems = productDataList;

    // 사료 세부 카테고리
    if (selectedCategory === '영양제' && selectedSubCategory !== '전체') {
      //api -> 세부 카테고리 데이터
      //setProductList
    } else if (selectedCategory === '사료' && selectedSubCategory !== '전체') {
      ///api -> 세부 카테고리 데이터
      //setProductList
    }
  }, [productDataList, selectedSubCategory]);

  return (
    <Flex
      direction="column"
      justify="flex-start"
      align="center"
      gap={5}
      padding="0 12px"
    >
      {/* 카테고리 버튼 */}
      <Flex direction="row" align="center" height={40}>
        <button onClick={() => setSelectedCategory('사료')}>사료</button>
        <button onClick={() => setSelectedCategory('간식')}>간식</button>
        <button onClick={() => setSelectedCategory('영양제')}>영양제</button>
      </Flex>

      <Flex justify="flex-start" height={24} margin="20px 0px 0 0">
        <Text colorCode={colors.Black} typo="Heading4" align="flex-start">
          여은이의 맞춤 상품 찾기
        </Text>
      </Flex>

      <Flex direction="row" justify="flex-start" height={40} gap={8}>
        {subCategories[selectedCategory]?.map((subCategory, index) => (
          <button key={index}>{subCategory}</button>
        ))}
      </Flex>

      {/* 상품 리스트 */}
      <Wrapper direction="row" justify="center" gap={30}>
        {productDataList?.map((item) => (
          <ProductWrapper onClick={() => handleClick(item.product_id)}>
            <Product
              product_id={item.product_id}
              product_img={item.product_img}
              title={item.title}
              price={item.price}
            />
          </ProductWrapper>
        ))}
      </Wrapper>
    </Flex>
  );
};

export default Store;

const Wrapper = styled(Flex)`
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(100vh - 256px);
  flex-wrap: wrap;
  width: 100%;
`;

const ProductWrapper = styled.div`
  /* width: calc(33.33% - 8px); */
  width: calc(50% - 30px);
  box-sizing: border-box;
`;
