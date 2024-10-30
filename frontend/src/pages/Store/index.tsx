import styled from '@emotion/styled';
import { Flex } from '@components/common/Flex';
import { Text } from '@components/common/Typo';
import { colors } from '@styles/colors';
import { Product } from '@components/store/Product';
import { SetStateAction, useEffect, useState } from 'react';
import { ProductDetailType } from '@assets/types/ProductType';
import { Category, subCategories } from '@assets/types/CategoryType';
import snack from '@/mocks/data/snack.json';
import food from '@/mocks/data/food.json';
import supplement from '@/mocks/data/supplement.json';
import { foodTypeMapping } from '@assets/types/CategoryType';
import Tag from '@components/common/Tag';
import { useNavigate } from 'react-router-dom';
import { getProductList } from '@/apis/getProductList';

const Store = () => {
  const fetch = async (
    category: string,
    setProductDataList: React.Dispatch<
      SetStateAction<ProductDetailType[]>
    >,
  ) => {
    try {
      await getProductList('food', setProductDataList);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchData = async (category: Category) => {
    if (category === '사료') setProductDataList(food);
    else if (category === '간식') setProductDataList(snack);
    else if (category === '영양제') setProductDataList(supplement);
  };

  useEffect(() => {
    fetch('food', setProductDataList);
  }, []);

  useEffect(() => {
    // fetchData(selectedCategory);
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
