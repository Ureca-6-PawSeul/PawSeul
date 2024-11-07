import styled from '@emotion/styled';
import { Flex } from '@components/common/Flex';
import { Text } from '@components/common/Typo';
import { colors } from '@styles/colors';
import tableData from '@/utils/tableData';
import DetailTable from '@components/store/detail/DetailTable';
import DetailImageList from '@components/store/detail/DetailImageList';
import StarRating from '@components/store/Star';
import ProductReview from '@components/store/detail/ProductReview';
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import StickyFooter from '@/components/store/StickyFooter';
import { Button } from '@/components/common/Button';
import { FiPlusCircle } from 'react-icons/fi';
import { FiMinusCircle } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import { createCartItem } from '@/apis/hooks/cart';
import { Modal } from '@/components/common/Modal';
import { getReviews } from '@/apis/hooks/review';
import { Header } from '@/components/common/Header';
import { IoIosArrowBack } from 'react-icons/io';
import { BiShoppingBag } from 'react-icons/bi';
import useProductDetailQuery from '@/apis/hooks/product';

const Detail = () => {
  const { id } = useParams<{ id: string }>();
  // tanstack query 사용
  const { data } = useProductDetailQuery();
  const reviews = getReviews(id);
  const [reviewData, setReviewData] = useState([]);
  const [descriptionData, setDescriptionData] = useState(null);
  const [productPrice, setProductPrice] = useState('');
  const [cartPrice, setCartPrice] = useState(0);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { mutateAsync } = createCartItem();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isMoveModalOpen, setIsMoveModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (data && reviews) {
      console.log(data);
      setDescriptionData(tableData(data));
      setProductPrice(data.price.toLocaleString('ko-KR'));
      setCartPrice(data.price);
      setReviewData(reviews);
    }
  }, [data, reviews]);

  const reviewCount = reviewData.length;
  const reviewRef = useRef<HTMLDivElement>(null);

  const handleRefClick = () => {
    reviewRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleBottomSheetOpen = () => {
    setIsBottomSheetOpen((prev) => !prev);
  };

  const handleQuantityChange = (value) => {
    setQuantity((prev) => Math.max(1, prev + value));
    setCartPrice((prev) => Math.max(0, prev + value * data.price));
  };

  const toggleAddModal = () => {
    setIsAddModalOpen((prev) => !prev);
  };

  const toggleMoveModal = () => {
    setIsMoveModalOpen((prev) => !prev);
  };

  const handleAddToCart = () => {
    const cartData = {
      productId: id,
      quantity: quantity,
    };
    try {
      const response = mutateAsync(cartData);
      if (response) {
        setIsBottomSheetOpen(false);
        toggleMoveModal();
      }
    } catch (error) {
      console.error(error);
    }
  };
  if (!data) {
    return <div>로딩중...</div>;
  }

  const handleNavigateToBack = () => {
    navigate(-1);
  };

  const handleNavigateToCart = () => {
    navigate('/cart');
  };

  return (
    <>
      <Header
        LeftIcon={<IoIosArrowBack size={28} />}
        RightIcon={<BiShoppingBag size={28} />}
        onLeftIconClick={handleNavigateToBack}
        onRightIconClick={handleNavigateToCart}
        iconWidth="36px"
      />
      <Flex
        direction="column"
        justify="flex-start"
        align="center"
        gap={5}
        padding="56px 0 0"
      >
        <Wrapper
          direction="column"
          justify="flex-start"
          padding="0 0 80px 0"
          backgroundColor={colors.Gray50}
          height="fit-content"
        >
          <Image src={data.productImg} alt="product_img" />
          <Flex
            direction="column"
            gap={12}
            padding="60px 0 32px 0"
            backgroundColor={colors.White}
          >
            <Flex
              direction="column"
              align="flex-start"
              gap={7}
              padding="0px 16px"
            >
              <Text typo="Heading3" align="flex-start">
                {data.title}
              </Text>
              <Flex gap={8} justify="flex-start">
                <StarRating
                  score={data.averageScore}
                  size={14}
                  width={74}
                  gap={1}
                />
                <DetailText
                  typo="Body3"
                  colorCode={colors.Gray500}
                  decorationLine="underline"
                  justify="flex-start"
                  cursor="pointer"
                  onClick={handleRefClick}
                >
                  {`${reviewCount}개 후기`}
                </DetailText>
              </Flex>
            </Flex>
            <Flex justify="flex-end" padding="0px 16px">
              <Text typo="Heading3">{productPrice}원</Text>
            </Flex>
          </Flex>
          <Flex
            direction="column"
            gap={16}
            justify="flex-start"
            padding="32px 16px 48px 16px"
            margin="16px 0 0"
            backgroundColor={colors.White}
            align="flex-start"
          >
            <DetailText typo="Heading3" justify="flex-start">
              상품 설명
            </DetailText>
            {descriptionData && <DetailTable tableData={descriptionData} />}
          </Flex>
          <Flex
            direction="column"
            padding="0 0 32px"
            backgroundColor={colors.White}
            height='auto'
          >
            <DetailImageList images={data.descriptionImg} />
          </Flex>
          <ProductReview ref={reviewRef} />
          <StickyFooter
            isScrolledToBottom={false}
            isBottomSheetOpen={isBottomSheetOpen}
          >
            {isBottomSheetOpen ? (
              <>
                <Flex direction="column" gap={16} justify="flex-start">
                  <BottomItemWrapper justify="flex-start">
                    <Flex
                      backgroundColor={colors.Gray50}
                      padding="16px 0"
                      margin="0 0 16px"
                    >
                      <Flex>
                        <CartText typo="Label1">수량</CartText>
                        <Flex justify="flex-start" gap={12}>
                          <CartItemButton
                            width="auto"
                            height="auto"
                            onClick={() => handleQuantityChange(1)}
                          >
                            <FiPlusCircle color={colors.Gray400} size={20} />
                          </CartItemButton>
                          <Text typo="Label2" colorCode={colors.Gray600}>
                            {quantity}
                          </Text>
                          <CartItemButton
                            width="auto"
                            height="auto"
                            onClick={() => handleQuantityChange(-1)}
                          >
                            <FiMinusCircle color={colors.Gray400} size={20} />
                          </CartItemButton>
                        </Flex>
                      </Flex>
                      <CartText typo="Label1">{`1개 (${productPrice})원`}</CartText>
                    </Flex>
                  </BottomItemWrapper>
                  <Flex justify="space-between" margin="0 0 16px">
                    <CartText typo="Body2">총 수량 {quantity}개</CartText>
                    <CartText typo="Heading3">
                      {Number(cartPrice).toLocaleString('ko-KR')}원
                    </CartText>
                  </Flex>
                </Flex>
                <Flex justify="center">
                  <Button bg={colors.MainColor} onClick={toggleAddModal}>
                    장바구니에 추가하기
                  </Button>
                </Flex>
              </>
            ) : (
              <Flex justify="center">
                <Button bg={colors.MainColor} onClick={toggleBottomSheetOpen}>
                  장바구니에 추가하기
                </Button>
              </Flex>
            )}
            {isAddModalOpen && (
              <Modal isOpen={isAddModalOpen} toggleModal={toggleAddModal}>
                <Flex direction="column" padding="32px 0 0" gap={12}>
                  <Text typo="Heading4">
                    장바구니에 상품을 추가하시겠습니까?
                  </Text>
                  <Flex padding="0px 52px" margin="20px 0 10px" gap={20}>
                    <Button
                      height="40px"
                      bg={colors.Gray400}
                      onClick={() => {
                        toggleAddModal();
                        toggleBottomSheetOpen();
                      }}
                    >
                      취소
                    </Button>
                    <Button
                      height="40px"
                      onClick={() => {
                        handleAddToCart();
                        toggleAddModal();
                      }}
                    >
                      추가
                    </Button>
                  </Flex>
                </Flex>
              </Modal>
            )}
            {isMoveModalOpen && (
              <Modal isOpen={isMoveModalOpen} toggleModal={toggleMoveModal}>
                <Flex direction="column" padding="32px 0 0" gap={12}>
                  <Text typo="Heading4">장바구니에 상품이 추가되었습니다.</Text>
                  <Text typo="Body2">장바구니로 이동하시겠습니까?</Text>
                  <Flex padding="0px 52px" margin="20px 0 10px" gap={20}>
                    <Button
                      height="40px"
                      bg={colors.Gray400}
                      onClick={toggleMoveModal}
                    >
                      취소
                    </Button>
                    <Button
                      height="40px"
                      onClick={() => {
                        window.location.href = '/cart';
                      }}
                    >
                      이동
                    </Button>
                  </Flex>
                </Flex>
              </Modal>
            )}
          </StickyFooter>
        </Wrapper>
      </Flex>
    </>
  );
};

const Wrapper = styled(Flex)`
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(100vh - 65px);

  -ms-overflow-style: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Image = styled.img`
  width: 100%;
`;

const DetailText = styled(Text)<{
  decorationLine?: string;
  justify?: string;
  width?: string;
  cursor?: string;
}>`
  text-decoration-line: ${({ decorationLine }) =>
    decorationLine ? `${decorationLine}` : 'none'};
  justify-content: ${({ justify }) => (justify ? `${justify}` : 'center')};
  width: ${({ width }) => (width ? `${width}` : 'auto')};
`;

const PriceText = styled(Text)`
  letter-spacing: -0.5px;
`;

const BottomItemWrapper = styled(Flex)`
  border-bottom: 1px solid ${colors.Gray50};
`;

const CartItemButton = styled(Flex)`
  cursor: pointer;
`;

const CartText = styled(Text)`
  white-space: nowrap;
  padding: 0 16px;
`;

export default Detail;
