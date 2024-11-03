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
} from '@/assets/images/svgs';
import { Text } from '@/components/common/Typo';
import { colors } from '@/styles/colors';
import { ProductType } from '@/assets/types/ProductType';
import { getTopProductList } from '@/apis/getTopProductLis';
import { Product } from '@/components/store/Product';
import { useUserStore } from '@/stores/userStore';
import { useGetUserInfo } from '@/apis/hooks/user';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Toast } from '@/components/common/Toast';

const Home = () => {
  const imageList = [Banner1, Banner2, Banner3, Banner4];
  const [productList, setProductList] = useState<ProductType[]>([]);

  useEffect(() => {
    getTopProductList(setProductList);
  }, []);

  const { data } = useGetUserInfo();
  const setUserInfo = useUserStore((state) => state.setUserInfo);

  useEffect(() => {
    if (data) {
      setUserInfo(data);
    }
    console.log(data);
  }, [data, setUserInfo]);

  //토스트 메시지 설정하는 방법!
  const notify = (msg: string) => {
    toast(
      <Flex justify="space-between">
        <span>{msg}</span>
        <CheckIcon width={24} height={24} style={{ marginLeft: '8px' }} />
      </Flex>,
      {
        position: 'bottom-center',
      },
    );
  };

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

        <button onClick={() => notify('성공적으로 로그인되었습니다.')}>
          토스트메시지 예시
        </button>
      </Flex>
      <Footer />
      {/* 토스트 메시지 적용 예시 ! 바깥에 놔주면 됌*/}
      <Toast />
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
