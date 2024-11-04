import styled from '@emotion/styled';
import { Flex } from '@components/common/Flex';
import { Text } from '@components/common/Typo';
import { colors } from '@styles/colors';
import { Product } from '@components/store/Product';
import { useEffect, useState } from 'react';
import { ProductDetailType } from '@assets/types/ProductType';
import { Category, subCategories } from '@assets/types/CategoryType';
import { foodTypeMapping } from '@assets/types/CategoryType';
import Tag from '@components/common/Tag';
import { useNavigate } from 'react-router-dom';
import { getProductList } from '@/apis/getProductList';

const categoryMapping = {
  사료 : 'food',
  영양제 : 'supplement',
  간식 : 'snack'
}

const Store = () => {
  const fetch = async (
    category: string,
    subCategory: string
  ) => {
    try {
      await getProductList(categoryMapping[category], subCategory, setProductDataList);
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
    fetch('food', '전체');
  }, []);

  useEffect(() => {
    fetch(selectedCategory, '전체');
  }, [selectedCategory]);

  useEffect(() => {
    //productDataList가 업데이트될 때 재렌더링
    // let filteredItems = productDataList;

    // 사료 세부 카테고리
    if (selectedCategory === '영양제' && selectedSubCategory !== '전체') {
      //api -> 세부 카테고리 데이터
      getProductList('supplement', foodTypeMapping['영양제'][selectedSubCategory], setProductDataList)
    } 
    else if (selectedCategory === '사료' && selectedSubCategory !== '전체') {
      ///api -> 세부 카테고리 데이터
      console.log(selectedSubCategory);
      getProductList('food', foodTypeMapping['사료'][selectedSubCategory], setProductDataList)
    }
    else if (selectedCategory === '간식' && selectedSubCategory !== '전체') {
      ///api -> 세부 카테고리 데이터
      getProductList('snack', foodTypeMapping['간식'][selectedSubCategory], setProductDataList)
    }
  }, [selectedSubCategory]);

  return (
    <Flex
      direction="column"
      justify="flex-start"
      align="center"
      gap={5}
      padding="0 12px"
    >
      {/* 카테고리 버튼 */}
      <Flex
        direction="row"
        align="center"
        // justify="space-between"
        height={40}
        gap={30}
      >
        {(['사료', '간식', '영양제'] as Category[]).map((category) => (
          <Tag
            key={category}
            width={60}
            height={30}
            colorCode={
              selectedCategory === category ? 'FilledMainColor' : 'Empty'
            }
            onClick={() => setSelectedCategory(category)}
          >
            <Text typo="Body3">{category}</Text>
          </Tag>
        ))}
      </Flex>

      <Flex justify="flex-start" height={24} margin="20px 0px 0 0">
        <Text colorCode={colors.Black} typo="Heading4" align="flex-start">
          여은이의 맞춤 상품 찾기
        </Text>
      </Flex>

      <Flex direction="row" justify="flex-start" height={40} gap={8}>
        {subCategories[selectedCategory]?.map((subCategory, index) => (
          <Tag
            key={index}
            colorCode={
              selectedSubCategory === subCategory
                ? 'FilledMainColor'
                : 'BorderGray'
            }
            onClick={() => setSelectedSubCategory(subCategory)}
          >
            <Text typo="Label3">{subCategory}</Text>
          </Tag>
        ))}
      </Flex>

      {/* 상품 리스트 */}
      <Wrapper direction="row" justify="flex-start" gap={35}>
        {productDataList?.map((item, index) => (
          <ProductWrapper
            key={index}
            onClick={() => handleClick(item.productId)}
          >
            <Product
              productId={item.productId}
              productImg={item.productImg}
              title={item.title}
              price={item.price}
              averageScore={item.averageScore}
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

  -ms-overflow-style: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const ProductWrapper = styled.div`
  /* width: calc(33.33% - 8px); */
  width: calc(50% - 35px);
  box-sizing: border-box;
`;
