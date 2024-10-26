import styled from '@emotion/styled';
import { Flex } from '../Flex';
import { Text } from '../Typo';
import { colors } from '@styles/colors';

export const Footer = () => {
  return (
    <Flex
      direction="column"
      align="center"
      backgroundColor={colors.Gray100}
      height={360}
      padding="5px"
    >
      <Text typo="Label2">(주)포슬</Text>
      <Text typo="Body3">
        대표이사: 김포슬 / 서울특별시 강남구 태해산로4길 15, 위워크
        <br />
        사업자번호 : 000-00-00000/통신판매업 : 제0000-서울강남-00000호
        <br />
        개인정보보호책임자 : 김포슬/ 구매안전(에스크로)서비스
      </Text>
    </Flex>
  );
};
