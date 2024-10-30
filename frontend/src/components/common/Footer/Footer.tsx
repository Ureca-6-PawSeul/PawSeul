import styled from '@emotion/styled';
import { Flex } from '../Flex';
import { Text } from '../Typo';
import { colors } from '@styles/colors';

const Footer = () => {
  return (
    <Wrapper
      direction="column"
      align="center"
      justify="center"
      backgroundColor={colors.Gray100}
      padding="50px 15px"
      gap={10}
    >
      <Text typo="Label2">(주)포슬</Text>
      <FooterText>
        대표이사: 김포슬 / 서울특별시 강남구 태해산로4길 15, 위워크
        <br />
        사업자번호 : 000-00-00000/통신판매업 : 제0000-서울강남-00000호
        <br />
        개인정보보호책임자 : 김포슬/ 구매안전(에스크로)서비스
      </FooterText>
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styled(Flex)`
  height: fit-content;
`;

const FooterText = styled(Text)`
  font-family: 'Pretendard';
  font-size: 0.65rem;
  line-height: 140%;
`;
