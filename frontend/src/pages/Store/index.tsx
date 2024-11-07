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
import { Header } from '@/components/common/Header';
import { CartIcon, MiniLogo } from '@/assets/images/svgs';
import { useGetProductList } from '@/apis/hooks/product';
import { useUserStore } from '@/stores/userStore';

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
        <Flex
          direction="row"
          align="center"
          // justify="space-between"
          height={40}
          gap={30}
          margin="0 0 8px 0"
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

        <Flex justify="flex-start" height={24} margin="4px 0px 4px 0">
          <Text colorCode={colors.Black} typo="Heading4" align="flex-start">
            {user.username.slice(1)}님의 맞춤 상품 찾기
          </Text>
        </Flex>
        <Flex
          direction="row"
          justify="flex-start"
          height={40}
          gap={8}
          margin="0 0 16px 0"
        >
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
