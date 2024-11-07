import styled from '@emotion/styled';
import { HeightFitFlex } from '@components/common/Flex';
import { Text } from '@components/common/Typo';
import { useUserStore } from '@/stores/userStore';
import { PartialProductType } from '@/apis/health';
import { Product } from '../store/Product';

const Recommend = ({
  recommandProduct,
}: {
  recommandProduct: PartialProductType;
}) => {
  const user = useUserStore((state) => state.user);

  return (
    <RecommendWrapper
      borderRadius={15}
      padding="32px 24px"
      direction="column"
      align="flex-start"
      gap={16}
    >
      <Text typo="Heading3">{user.pet.petname}에 맞는 제품 추천</Text>

      {/* {recommandProduct?.map((item) => (
        <Product
          productId={item.productId}
          title={item.title}
          productImg={item.productImg}
          price={item.price}
          averageScore={item.averageScore}
        />
      ))} */}
      <Product
        productId={recommandProduct.productId}
        title={recommandProduct.title}
        productImg={recommandProduct.productImg}
        price={recommandProduct.price}
        averageScore={recommandProduct.averageScore}
      />
    </RecommendWrapper>
  );
};

export default Recommend;

const RecommendWrapper = styled(HeightFitFlex)`
  /* box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); */
`;
