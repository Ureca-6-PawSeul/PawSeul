import styled from '@emotion/styled';
import { Flex } from '@components/common/Flex';
import { Footer } from '@components/common/Footer';
import { Carousel } from '@/components/home/Carousel';
import { Banner1, Banner2, Banner3, Banner4 } from '@/assets/images/svgs';
import { Text } from '@/components/common/Typo';
import { colors } from '@/styles/colors';
import { useEffect, useState } from 'react';
import { ProductType } from '@/assets/types/ProductType';
import { getTopProductList } from '@/apis/getTopProductLis';
import { Product } from '@/components/store/Product';
import { useNavbarStore } from '@/stores/navStore';

const Home = () => {
  const imageList = [Banner1, Banner2, Banner3, Banner4];
  const [productList, setProductList] = useState<ProductType[]>([]);

  useEffect(() => {
    getTopProductList(setProductList);
  }, []);

  return (
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
              <ProductWrapper key={product.product_id}>
                <Product
                  product_id={product.product_id}
                  title={product.title}
                  price={product.price}
                  product_img={product.product_img}
                />
              </ProductWrapper>
            ))}
        </ProductContainer>
      </Flex>
      <Footer />
    </Flex>
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
