import styled from '@emotion/styled';
import { Flex } from '@components/common/Flex';
import { Text } from '@components/common/Typo';
import { colors } from '@styles/colors';
import { Product } from '@components/store/Product';
import { useEffect, useState } from 'react';
import { ProductDetailType } from '@assets/types/ProductType';
import { Category, subCategories } from '@assets/types/CategoryType';
// import { getSnackData } from '@apis/snack';
import snack from '@/mocks/data/snack.json';
import food from '@/mocks/data/food.json'
import supplement from '@/mocks/data/supplement.json'



const Store = () => {
  // 선택한 카테고리를 상태로 관리
  const [selectedCategory, setSelectedCategory] = useState<Category>('사료');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('전체');
  const [items, setItems] = useState<ProductDetailType[]>([]);

  function handleCategoryBtn(selectedCategory:Category) {
    setSelectedCategory(selectedCategory);
    setSelectedSubCategory('전체');
  }

  const fetchData = async (
    selectedCategory: Category, selectedSubCategory: string
  ) => {

    let data:ProductDetailType[] | undefined;

    if(selectedCategory === '사료'){
      data = food;
    }
    else if(selectedCategory === '간식'){
      data = snack;
    }
    else if(selectedCategory === '영양제'){
      data = supplement;
    }

    // 서브카테고리가 '전체'이거나 null일 경우 필터링 없이 전체 데이터 사용
    if (selectedSubCategory && selectedSubCategory !== '전체') {
      console.log(selectedSubCategory);
      data = data.filter((item) => item.category === selectedSubCategory);
    }


    setItems(data ?? []); // data가 undefined일 경우 빈 배열 할당
  };

  useEffect(() => {
    fetchData(selectedCategory, selectedSubCategory);
  }, [selectedCategory, selectedSubCategory]);

  useEffect(() => {
    console.log(items);
  }, [items]);

  return (
    <Flex direction="column" justify="flex-start" align="center" gap={5}>
      {/* 카테고리 버튼 */}
      <Flex direction="row" align="center" height={40}>
        <button onClick={() => handleCategoryBtn('사료')}>사료</button>
        <button onClick={() => handleCategoryBtn('간식')}>간식</button>
        <button onClick={() => handleCategoryBtn('영양제')}>영양제</button>
      </Flex>
      <Flex justify="flex-start" height={40}>
        <Text colorCode={colors.Black} typo="Heading3" align="flex-start">
          여은이의 맞춤 상품 찾기
        </Text>
      </Flex>
      <Flex direction="row" justify="flex-start" height={40}>
        {subCategories[selectedCategory]?.map((subCategory, index) => (
          <button key={index} onClick={()=>setSelectedSubCategory(subCategory)}>{subCategory}</button>
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
    </Flex>
  );
};

export default Store;

const Wrapper = styled(Flex)`
  overflow-y: auto; /* 세로 스크롤을 추가 */
  overflow-x: hidden;
  height: calc(100vh - 256px);
  flex-wrap: wrap;
  width: 100%;
`;

const ProductWrapper = styled.div`
  width: calc(33.33% - 8px); /* 한 행에 3개씩 배치되도록 3등분 */
  box-sizing: border-box;
`;
