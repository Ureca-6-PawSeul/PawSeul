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
import Address from '@/components/payment/Address';
import { StyledButton } from '@/components/health/Allergy';
import { useUserStore } from '@/stores/userStore';
import { Header } from '@/components/common/Header';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';

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
  const user = useUserStore((state) => state.user);
  const { isOpen, openModal, closeModal } = useModal();
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);
  const [name, setName] = useState(user.username);
  const [phone, setPhone] = useState();
  const orderItems = useCartStore((state) => state.selectedItems);
  const totalPrice = useCartStore((state) => state.totalPrice);
  const totalPriceString = totalPrice
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [isClickedBtn, setIsClickedBtn] = useState(null);
  const isEnabled =
    isCheck &&
    isClickedBtn === 2 &&
    name !== null &&
    phone !== null &&
    location !== null; //버튼 활성화 조건

  const handleCheckClick = () => setIsCheck(!isCheck);
  const handleClickBtn = (method: number) => setIsClickedBtn(method);
  const handleChange = (value: string, setFunction) => setFunction(value);
  const handleAlert = () => alert('배송 정보를 모두 입력해주세요.');
  // const handleNavigateToHome = () => navigate('/cart');
  const handleNavigateToHome = () => navigate(-1);
  const formatPhone = (value) => {
    if (value === undefined) return null;
    const onlyNums = value.replace(/[^0-9]/g, '');
    if (onlyNums.length <= 3) return onlyNums;
    if (onlyNums.length <= 7)
      return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}-${onlyNums.slice(
      7,
      11,
    )}`;
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
    <>
      <Header
        title="결제"
        LeftIcon={
          <IoIosArrowBack
            size={26}
            color={colors.Black}
            style={{ cursor: 'pointer' }}
          />
        }
        onLeftIconClick={handleNavigateToHome}
      />
      <Container
        direction="column"
        height="auto"
        padding="8px 24px"
        margin="60px 0"
      >
        <Flex direction="column" gap={30}>
          {/* 배송지 정보 */}
          <Flex direction="row" justify="space-between">
            <Text typo="Heading3">배송지 정보</Text>
          </Flex>
          <Flex direction="column" align="flex-start" gap={30}>
            <InfoBox direction="column" align="flex-start">
              <Text typo="Body3">수령인</Text>
              <Flex>
                <Input
                  type="text"
                  placeholder="이름"
                  value={name}
                  onChange={(e) => handleChange(e.target.value, setName)}
                />
              </Flex>
            </InfoBox>

            <InfoBox direction="column" align="flex-start">
              <Text typo="Body3">연락처</Text>
              <Flex>
                <Input
                  type="text"
                  placeholder="연락처"
                  value={formatPhone(phone)}
                  onChange={(e) => handleChange(e.target.value, setPhone)}
                  maxLength={13}
                />
              </Flex>
            </InfoBox>

            <InfoBox direction="column" align="flex-start" gap={20}>
              <Text typo="Body3">배송지</Text>
              <Flex gap={15}>
                <Input
                  type="text"
                  placeholder="배송지"
                  value={location}
                  onChange={(e) => handleChange(e.target.value, setPhone)}
                  readOnly
                />
                <Flex width="fit-content">
                  <Button
                    height="36px"
                    borderRadius="15px"
                    bg={colors.Gray100}
                    fontColor="#AEAEB2"
                    hoverBg={colors.Gray100}
                    hoverFontColor="#AEAEB2"
                    fontSize="12px"
                    onClick={openModal}
                  >
                    배송지 입력
                  </Button>
                  {isOpen && (
                    <AddressModal isOpen={isOpen} toggleModal={closeModal}>
                      <Address
                        setLocation={setLocation}
                        closeModal={closeModal}
                      />
                    </AddressModal>
                  )}
                </Flex>
              </Flex>
              <Input type="text" placeholder="상세 주소 입력" value={null} />
            </InfoBox>
            <InfoBox direction="column" align="flex-start" gap={20}>
              <Text typo="Body3">요청사항</Text>
              <Select optionList={SHIPMENT_MESSAGE} />
            </InfoBox>
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
                <StyledButton
                  height="50px"
                  bg={colors.White}
                  hoverBg={colors.White}
                  fontColor={colors.Black}
                  hoverFontColor={colors.Black}
                  border={`1px solid ${colors.Gray700}`}
                  selected={isClickedBtn === 1}
                >
                  신용·체크카드
                </StyledButton>
              ) : (
                <StyledButton
                  height="50px"
                  bg={colors.White}
                  hoverBg={colors.White}
                  fontColor={colors.Black}
                  hoverFontColor={colors.Black}
                  border={`1px solid ${colors.Gray700}`}
                  selected={isClickedBtn === 1}
                  onClick={() => handleClickBtn(1)}
                >
                  신용·체크카드
                </StyledButton>
              )}
            </Flex>

            {isClickedBtn === 2 ? (
              <StyledButton
                height="50px"
                bg={colors.White}
                hoverBg={colors.White}
                fontColor={colors.Black}
                hoverFontColor={colors.Black}
                border={`1px solid ${colors.Gray700}`}
                selected={isClickedBtn === 2}
              >
                <TossLogo width={100} height={30} />
              </StyledButton>
            ) : (
              <Button
                bg={colors.White}
                fontColor={colors.Gray500}
                border="solid 1px #AEAEB2"
                height="50px"
                hoverBg={colors.White}
                hoverFontColor={colors.Black}
                onClick={() => handleClickBtn(2)}
              >
                <TossLogo width={100} height={30} opacity={0.3} />
              </Button>
            )}

            <Select optionList={CARD_MESSAGE} disabled={true} />
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
              {isEnabled ? (
                <TossPayment price={totalPrice} orderItems={orderItems} />
              ) : (
                <Button
                  height="50px"
                  disabled={true}
                  bg={colors.Gray400}
                  onClick={handleAlert}
                >
                  {totalPriceString}원 결제하기
                </Button>
              )}
            </Flex>
          </Flex>
        </StickyFooter>
      </Container>
    </>
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

const Input = styled.input`
  flex: 1;
  padding: 15px 20px;
  border: 1px solid ${colors.Gray700};
  border-radius: 10px;

  flex-shrink: 0;
  font-family: 'Pretendard';
  font-size: 0.85rem;
  font-weight: 500;
  color: ${colors.Gray800};
  width: -webkit-fill-available;

  &:focus {
    border-color: ${colors.MainColor};
    outline: none;
    color: ${colors.Black};
  }
`;

const InfoBox = styled(Flex)`
  gap: 10px;
  height: fit-content;
`;
