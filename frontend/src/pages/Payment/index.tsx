import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Flex } from '@components/common/Flex';
import { Text } from '@components/common/Typo';
import { ProductHorizontal } from '@components/store/Product/ProductHorizontal';
import { colors } from '@styles/colors';
import Check from '@assets/images/svgs/Check';
import StickyFooter from '@components/store/StickyFooter';
import Select from '@components/common/Select';


const SHIPMENT_MESSAGE = [
    "배송 요청 사항을 선택해주세요 (선택)",
    "문 앞에 놓아주세요.",
    "배송 전 미리 연락 부탁드립니다.",
    "부재 시 경비실에 맡겨주시기 바랍니다.",
    "택배 보관함에 넣어주시기 바랍니다.",
]

const CARD_MESSAGE = [
  "카드사 선택",
  "삼성카드",
  "하나카드",
  "국민카드",
  "롯데카드",
  "농협카드"
]


const Payment = () => {
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  const [isCheck, setIsCheck] = useState(false);

  const handleCheckClick = () => {
    setIsCheck(!isCheck);
  }


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
    <Container direction="column" heightPer={100}>
      <Flex
        direction="column"
        padding="0 0 3rem 0"
        gap={8}
      >
        {/* 배송지 정보 */}
        <Flex direction="row" justify="space-between">
          <Text typo="Heading3">배송지 정보</Text>
          <button>배송지 입력</button>
        </Flex>
        <Flex
          direction="column"
          align="flex-start"
          gap={10}
          margin="0 0 1rem 0"
        >
          <Flex direction="row" justify="flex-start" gap={10}>
            <Text typo="Body2">김찬별</Text>
            <Text typo="Body2">010-1234-5678</Text>
          </Flex>
          <Text>경기도 수원시 XX구 XX로</Text>
          <Select optionList={SHIPMENT_MESSAGE}/>
        </Flex>

        {/* 상품 정보 */}
        <Flex direction="column" align="flex-start">
          <Text typo="Heading3">상품 정보</Text>
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <ProductHorizontal
                key={index}
                index={index}
                price="3,900원"
                title="강아지 촉촉뼈껌 22종 모음"
                product_img="https://thumbnail9.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/2024/03/21/14/0/1b080f58-7903-45cc-b500-47fdcce960ce.jpg"
              />
            ))}
        </Flex>

        {/* 결제 방법 */}
        <Flex direction="column">
          <Flex justify="flex-start">
            <Text typo="Heading3">결제 방법</Text>
          </Flex>
          <button>신용·체크카드</button>
          <button>TOSS</button>
          <Select optionList={CARD_MESSAGE}/>
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
              24,800원
            </Text>
          </Flex>
          <TouchableFlex direction="row" width={400} onClick={handleCheckClick} borderRadius={10}>
            {isCheck && <Check width={24} height={57} color={colors.MainColor}/>}
            {!isCheck && <Check width={24} height={57} color={colors.Gray400}/>}
            <Text typo="Body3" colorCode={colors.Gray400}>
              [필수] 결제 서비스 이용약관, 개인정보 처리 동의
            </Text>
          </TouchableFlex>
          <button>24,800원 결제하기</button>
        </Flex>
      </StickyFooter>
    </Container>
  );
};

export default Payment;

const Container = styled(Flex)`
  overflow-y: auto;
  padding-bottom: 100px;
`;

// 터치 효과가 있는 Flex 컴포넌트
const TouchableFlex = styled(Flex)`
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:active {
    background-color: rgba(0, 0, 0, 0.1); // 클릭 시 살짝 어두워지는 효과
  }
`;
