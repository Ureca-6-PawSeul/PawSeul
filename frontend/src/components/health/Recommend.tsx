import { Flex, HeightFitFlex } from '@components/common/Flex';
import { Text } from '@components/common/Typo';
import { useUserStore } from '@/stores/userStore';
import { PartialProductType } from '@/apis/health';
import { Product } from '../store/Product';
import { Hr } from '../store/Hr';
import { useNavigate } from 'react-router-dom';

const Recommend = ({
  recommendProduct,
}: {
  recommendProduct: PartialProductType[];
}) => {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();
  const handleNavigateToDetail = (productId: string) => {
    navigate(`/store/detail/${productId}`);
  };

  return (
    <HeightFitFlex
      padding="32px 24px 0 24px"
      direction="column"
      align="flex-start"
      gap={24}
    >
      <Hr colorCode="#DFE0E7" />
      <Text typo="Heading3" margin="8px 0 0 0">
        {user.pet.petname}에게 맞는 제품
      </Text>

      <HeightFitFlex justify="flex-start" gap={18}>
        {recommendProduct?.map((item) => (
          <Flex
            width={124}
            onClick={() => handleNavigateToDetail(item.productId)}
          >
            <Product
              productId={item.productId}
              title={item.title || '상품 정보 읽기 실패'}
              productImg={item.productImg || ''}
              price={item.price || 19900}
              averageScore={item.averageScore ?? 0}
            />
          </Flex>
        ))}
      </HeightFitFlex>
    </HeightFitFlex>
  );
};

export default Recommend;
