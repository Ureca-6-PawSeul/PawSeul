import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Flex } from '@components/common/Flex';
import { Footer } from '@components/common/Footer';
import { Carousel } from '@/components/home/Carousel';
import {
  Banner1,
  Banner2,
  Banner3,
  Banner4,
  CheckIcon,
  CartIcon,
  MiniLogo,
} from '@/assets/images/svgs';
import { Text } from '@/components/common/Typo';
import { colors } from '@/styles/colors';
import { ProductType } from '@/assets/types/ProductType';
import { getTopProductList } from '@/apis/getTopProductLis';
import { Product } from '@/components/store/Product';
import { useUserStore } from '@/stores/userStore';
import { useGetUserInfo } from '@/apis/hooks/user';
import { Header } from '@/components/common/Header';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Toast } from '@/components/common/Toast';

const Home = () => {
  const imageList = [Banner1, Banner2, Banner3, Banner4];
  const [productList, setProductList] = useState<ProductType[]>([]);

  useEffect(() => {
    getTopProductList(setProductList);
    console.log(productList);
  }, []);

  const { data } = useGetUserInfo();
  const setUserInfo = useUserStore((state) => state.setUserInfo);

  useEffect(() => {
    if (data) {
      setUserInfo(data);
    }
  }, [data, setUserInfo]);

  const navigate = useNavigate();
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
        align="center"
        justify="flex-start"
        padding="0 0 70px 0"
        // height="fit-content"
      >
        {/* 배너 */}
        <Flex direction="column">
          <Carousel>
            {imageList.map((ImageComponent, index) => (
              <Flex key={index}>
                <ImageComponent />
              </Flex>
            ))}
          </Carousel>
        </Flex>

        {/* TOP10 상품 리스트 */}
        <Flex padding="12px 12px" direction="column" height={360}>
          <Flex gap={5} justify="flex-start" height="fit-content">
            <Text typo="Heading3" colorCode={colors.Black}>
              요즘 포슬 트렌드는?
            </Text>
            <Text typo="Heading3" colorCode={colors.MainColor}>
              TOP 10
            </Text>
          </Flex>
          <ProductContainer gap={10} justify="flex-start" padding="5px">
            {productList.length > 0 &&
              productList.map((product: ProductType) => (
                <ProductWrapper key={product.productId}>
                  <Product
                    productId={product.productId}
                    title={product.title}
                    price={product.price}
                    productImg={product.productImg}
                  />
                </ProductWrapper>
              ))}
          </ProductContainer>
        </Flex>
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
  flex: 0 0 33.33%;
`;
