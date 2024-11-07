import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Flex, HeightFitFlex } from '@components/common/Flex';
import { Footer } from '@components/common/Footer';
import { Carousel } from '@/components/home/Carousel';
import {
  Banner1,
  Banner2,
  Banner3,
  Banner4,
  CartIcon,
  MiniLogo,
} from '@/assets/images/svgs';
import { Text } from '@/components/common/Typo';
import { colors } from '@/styles/colors';
import { ProductType } from '@/assets/types/ProductType';
import { Product } from '@/components/store/Product';
import { useUserStore } from '@/stores/userStore';
import { useGetUserInfo } from '@/apis/hooks/user';
import { Header } from '@/components/common/Header';
import { useNavigate } from 'react-router-dom';
import { useGetTopProduct } from '@/apis/hooks/product';
import HealthHistory, { MarkText } from '@/components/home/HealthHistory';
import { NutrientType } from '@/apis/health';
import { useGetHealthInfo } from '@/apis/hooks/health';

const Home = () => {
  const user = useUserStore((state) => state.user);
  const [nutrientData, setNutrientData] = useState<NutrientType>();
  const imageList = [Banner1, Banner2, Banner3, Banner4];
  const [productList, setProductList] = useState<ProductType[]>([]);
  const healthData = useGetHealthInfo();
  const { data } = useGetUserInfo();
  const setUserInfo = useUserStore((state) => state.setUserInfo);
  const productListData = useGetTopProduct();

  useEffect(() => {
    if (data) setUserInfo(data);
    if (productListData) setProductList(productListData);
  }, [data, setUserInfo, productListData, healthData]);

  useEffect(() => {
    if (healthData) setNutrientData(healthData);
  }, [healthData]);

  const navigate = useNavigate();
  const handleNavigateToHome = () => {
    navigate('/');
  };
  const handleNavigateToCart = () => {
    navigate('/cart');
  };
  const handleNavigateToProduct = (productId: string) => {
    navigate(`/store/detail/${productId}`);
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
        align="center"
        justify="flex-start"
        // height="fit-content"
        margin="0 0 60px 0"
      >
        {/* 배너 */}
        <Flex direction="column" height="fit-content" margin="56px 0 24px 0">
          <Carousel>
            {imageList.map((ImageComponent, index) => (
              <Flex key={index}>
                <ImageComponent />
              </Flex>
            ))}
          </Carousel>
        </Flex>

        {nutrientData && (
          <HealthHistory
            petname={user?.pet.petname}
            nutrientData={nutrientData}
          />
        )}

        {/* TOP10 상품 리스트 */}
        <HeightFitFlex padding="24px" direction="column" gap={12}>
          <Flex gap={5} justify="flex-start" height="fit-content">
            <Text typo="Heading3" colorCode={colors.Black}>
              요즘 포슬 트렌드는?&nbsp;<MarkText>TOP 10</MarkText>
            </Text>
          </Flex>
          <ProductContainer
            gap={35}
            justify="flex-start"
            padding="10px 0"
            height="auto"
          >
            {productList.length > 0 &&
              productList?.map((product: ProductType) => (
                <ProductWrapper
                  key={product.productId}
                  onClick={() => handleNavigateToProduct(product.productId)}
                >
                  <Product
                    productId={product.productId}
                    title={product.title}
                    price={product.price}
                    productImg={product.productImg}
                  />
                </ProductWrapper>
              ))}
          </ProductContainer>
        </HeightFitFlex>
        <Footer />
      </Flex>
    </>
  );
};

export default Home;

const ProductContainer = styled(Flex)`
  overflow-x: scroll;
  overflow-y: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ProductWrapper = styled(Flex)`
  flex: 0 0 35%;
`;
