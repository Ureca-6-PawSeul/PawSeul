import styled from '@emotion/styled';
import { Flex, HeightFitFlex } from '@components/common/Flex';
import { Text } from '@components/common/Typo';
import { colors } from '@styles/colors';
import { Product } from '@components/store/Product';
import { useEffect, useState } from 'react';
import { ProductDetailType } from '@assets/types/ProductType';
import { Category, subCategories } from '@assets/types/CategoryType';
import { foodTypeMapping } from '@assets/types/CategoryType';
import Tag from '@components/common/Tag';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/common/Header';
import { CartIcon, MiniLogo } from '@/assets/images/svgs';
import { useGetProductList } from '@/apis/hooks/product';
import { useUserStore } from '@/stores/userStore';
import { Hr } from '@/components/store/Hr';

const categoryMapping = {
  사료: 'food',
  영양제: 'supplement',
  간식: 'snack',
};

const Store = () => {
  const user = useUserStore((state) => state.user);
  const [selectedCategory, setSelectedCategory] = useState<Category>('사료');
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<string>('전체');
  const [productDataList, setProductDataList] = useState<ProductDetailType[]>(
    [],
  );
  const data = useGetProductList(
    categoryMapping[selectedCategory],
    foodTypeMapping[selectedCategory][selectedSubCategory],
  );

  const navigate = useNavigate();
  const handleClick = (productId: number | string) => {
    navigate(`detail/${productId}`);
  };

  useEffect(() => {
    if (data) {
      setProductDataList(data);
    }
  }, [data]);
  useEffect(() => {
    setSelectedSubCategory('전체');
  }, [selectedCategory]);

  const handleNavigateToHome = () => {
    navigate('/');
  };
  const handleNavigateToCart = () => {
    navigate('/cart');
  };

  return (
    <>
      <Header
        LeftIcon={<MiniLogo height={26} />}
        RightIcon={<CartIcon height={24} />}
        onLeftIconClick={handleNavigateToHome}
        onRightIconClick={handleNavigateToCart}
      />
      <Flex
        direction="column"
        justify="flex-start"
        align="center"
        gap={5}
        padding="72px 12px 0 12px"
      >
        {/* 카테고리 버튼 */}
        <HeightFitFlex
          direction="row"
          align="center"
          margin="4px 0 16px 0"
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
        </HeightFitFlex>

        <Flex justify="flex-start" height={24} padding="0 14px">
          <Text colorCode={colors.Black} typo="Heading4" align="flex-start">
            {user.pet.petname}의 맞춤 상품 찾기
          </Text>
        </Flex>
        <Hr />
        <HeightFitFlex
          direction="row"
          justify="flex-start"
          gap={10}
          margin="4px 0 8px 0"
          padding="0 12px"
        >
          {subCategories[selectedCategory]?.map((subCategory, index) => (
            <Tag
              key={index}
              colorCode={
                selectedSubCategory === subCategory
                  ? 'FilledGray'
                  : 'BorderGray'
              }
              onClick={() => setSelectedSubCategory(subCategory)}
            >
              <Text typo="Label3">{subCategory}</Text>
            </Tag>
          ))}
        </HeightFitFlex>
        {/* 상품 리스트 */}
        <Wrapper
          direction="row"
          justify="flex-start"
          align="flex-start"
          gap={35}
          padding="0 0 0 35px"
        >
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
    </>
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

const ShadowFlex = styled(Flex)`
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;
