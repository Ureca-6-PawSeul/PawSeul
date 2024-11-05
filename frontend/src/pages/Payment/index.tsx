import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Flex } from '@components/common/Flex';
import { Text } from '@components/common/Typo';
import { ProductHorizontal } from '@components/store/Product/ProductHorizontal';
import { colors } from '@styles/colors';
import Check from '@assets/images/svgs/Check';
import StickyFooter from '@components/store/StickyFooter';
import Select from '@components/store/Select';
import { Button } from '@/components/common/Button';
import { TossPayment } from './TossPayment';
import { TossLogo } from '@/assets/images/svgs';
import useCartStore from '@/stores/cartStore';
import useModal from '@/components/common/Modal/useModal';
import { Modal } from '@/components/common/Modal';
import Address from '@/components/Address';

const SHIPMENT_MESSAGE = [
  '배송 요청 사항을 선택해주세요 (선택)',
  '문 앞에 놓아주세요.',
  '배송 전 미리 연락 부탁드립니다.',
  '부재 시 경비실에 맡겨주시기 바랍니다.',
  '택배 보관함에 넣어주시기 바랍니다.',
];

const CARD_MESSAGE = [
  '카드사 선택',
  '삼성카드',
  '하나카드',
  '국민카드',
  '롯데카드',
  '농협카드',
];

//Order table에 현재 주문내역을 저장시키고, 결제 상태는 "결제 전"으로 post요청
const Payment = () => {
  const { isOpen, modalRef, openModal, closeModal } = useModal();
  const [location, setLocation] = useState();
  const orderItems = useCartStore((state) => state.selectedItems);
  const totalPrice = useCartStore((state) => state.totalPrice);
  const totalPriceString = totalPrice
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [isClickedBtn, setIsClickedBtn] = useState(null);

  const handleCheckClick = () => {
    setIsCheck(!isCheck);
  };
  const handleClickBtn = (method: number) => {
    setIsClickedBtn(method);
    console.log(method);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollContainer = document.documentElement;
      const isBottom =
        scrollContainer.scrollHeight - scrollContainer.scrollTop <=
        scrollContainer.clientHeight + 85;
      setIsScrolledToBottom(isBottom);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Container direction="column" height="auto" padding="60px 24px">
      <Flex direction="column" gap={30}>
        {/* 배송지 정보 */}
        <Flex direction="row" justify="space-between">
          <Text typo="Heading3">배송지 정보</Text>
          <Flex width="fit-content">
            <Button
              height="30px"
              borderRadius="25px"
              bg={colors.Gray100}
              fontColor="#AEAEB2"
              fontSize="12px"
              onClick={openModal}
            >
              배송지 입력
            </Button>
            {isOpen && (
              <AddressModal isOpen={isOpen} toggleModal={closeModal}>
                <Address setLocation={setLocation} closeModal={closeModal}/>
              </AddressModal>
            )}
          </Flex>
        </Flex>
        <Flex direction="column" align="flex-start" gap={10}>
          <Flex direction="row" justify="flex-start" gap={10}>
            <Text typo="Body2">김찬별</Text>
            <Text typo="Body2">010-1234-5678</Text>
          </Flex>
          <Text>{location}</Text>
          <Select optionList={SHIPMENT_MESSAGE} />
        </Flex>

        {/* 상품 정보! */}
        <Flex direction="column" align="flex-start" gap={10}>
          <Flex direction="column" align="flex-start" margin="12px 0 0 0">
            <Text typo="Heading3">상품 정보</Text>
          </Flex>
          {orderItems.map((item, index) => (
            <ProductHorizontal
              key={index}
              productId={item.productId}
              price={item.price}
              title={item.title}
              productImg={item.productImg}
              quantity={item.quantity}
            />
          ))}
        </Flex>

        {/* 결제 방법 */}
        <Flex direction="column" gap={10}>
          <Flex justify="flex-start">
            <Text typo="Heading3">결제 방법</Text>
          </Flex>
          <Flex height="50px">
            {isClickedBtn === 1 ? (
              <Button height="50px">신용·체크카드</Button>
            ) : (
              <Button
                bg={colors.White}
                fontColor={colors.Gray500}
                border="solid 1px #AEAEB2"
                height="50px"
                hoverBg={colors.Gray400}
                hoverFontColor={colors.White}
                onClick={() => handleClickBtn(1)}
              >
                신용·체크카드
              </Button>
            )}
          </Flex>

          {isClickedBtn === 2 ? (
            <Button height="50px">
              <TossLogo width={100} height={30} />
            </Button>
          ) : (
            <Button
              bg={colors.White}
              fontColor={colors.Gray500}
              border="solid 1px #AEAEB2"
              height="50px"
              hoverBg={colors.Gray400}
              hoverFontColor={colors.White}
              onClick={() => handleClickBtn(2)}
            >
              <TossLogo width={100} height={30} />
            </Button>
          )}

          <Select optionList={CARD_MESSAGE} />
          <Text typo="Body4" colorCode={colors.Gray400}>
            삼성 앱카드 5만원 이상 결제 시 1,000원 할인
          </Text>
        </Flex>
      </Flex>

      {/* 최종 결제 금액 및 결제 버튼 */}
      <StickyFooter isScrolledToBottom={isScrolledToBottom}>
        <Flex direction="column">
          <Flex direction="row" justify="space-between">
            <Text typo="Heading3" colorCode={colors.Black}>
              최종 결제 금액
            </Text>
            <Text typo="Heading3" colorCode={colors.MainColor}>
              {}
            </Text>
          </Flex>
          <TouchableFlex
            direction="row"
            justify="flex-start"
            onClick={handleCheckClick}
            borderRadius={10}
            gap={5}
          >
            {isCheck && (
              <Check width={24} height={57} color={colors.MainColor} />
            )}
            {!isCheck && (
              <Check width={24} height={57} color={colors.Gray400} />
            )}
            <Text typo="Body3" colorCode={colors.Gray400}>
              [필수] 결제 서비스 이용약관, 개인정보 처리 동의
            </Text>
          </TouchableFlex>
          <Flex>
            {isCheck && isClickedBtn === 1 && (
              <Button height="50px">{totalPriceString}원 결제하기</Button>
            )}
            {isCheck && isClickedBtn === 2 && (
              <TossPayment price={totalPrice} orderItems={orderItems} />
            )}
            {(!isCheck || !isClickedBtn) && (
              <Button height="50px" disabled={true} bg={colors.Gray400}>
                {totalPriceString}원 결제하기
              </Button>
            )}
          </Flex>
        </Flex>
      </StickyFooter>
    </Container>
  );
};

export default Payment;

const Container = styled(Flex)`
  overflow-y: auto;
  padding-bottom: 200px;
  position: relative;
`;

// 터치 효과가 있는 Flex 컴포넌트
const TouchableFlex = styled(Flex)`
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:active {
    background-color: rgba(0, 0, 0, 0.03); // 클릭 시 살짝 어두워지는 효과
  }
`;

const AddressModal = styled(Modal)`
  height: auto;
`;
