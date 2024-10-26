import styled from '@emotion/styled';
import { Flex } from '@components/common/Flex';
import { Text } from '@components/common/Typo';
import { colors } from '@styles/colors';
import { Product } from '@components/store/Product';
import { useEffect, useState } from 'react';
import { ProductDetailType } from '@assets/types/ProductType';
import { Category, subCategories } from '@assets/types/CategoryType';
import snack from '@/mocks/data/snack.json';
import food from '@/mocks/data/food.json';
import supplement from '@/mocks/data/supplement.json';
import Tag from '@components/common/Tag';

const Store = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('사료');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('전체');
  const [items, setItems] = useState<ProductDetailType[]>([]);
  const [productDataList, setProductDataList] = useState<ProductDetailType[] | undefined>(food)


  const fetchData = async (category: Category) => {
    if (category === '사료') setProductDataList(food);
    else if (category === '간식') setProductDataList(snack);
    else if (category === '영양제') setProductDataList(supplement);
  };

  useEffect(() => {
    fetchData(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    //productDataList가 업데이트될 때 재렌더링
    //세부 카테고리 필터링 필요
    const filteredItems = selectedSubCategory === '전체'
      ? productDataList
      : productDataList.filter((item) => item.subCategory === selectedSubCategory);

    setItems(filteredItems);
  }, [productDataList, selectedSubCategory]);

  return (
    <Flex direction="column" justify="flex-start" align="center" gap={5}>
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
      <Wrapper direction="row" justify="start" gap={12}>
        {items.map((item) => (
          <ProductWrapper key={item.index}>
            <Product
              index={item.index}
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
  width: calc(33.33% - 8px);
  box-sizing: border-box;
`;
