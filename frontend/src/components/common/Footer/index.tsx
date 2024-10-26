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
      <Text typo="label3">(주)펫프렌즈</Text>
      <Text typo="Body3">
        대표이사: 윤현신 / 서울특별시 강남구 도산대로4길 15, 큐브타워
        <br />
        사업자번호 : 175-81-00190/통신판매업 : 제2019-서울강남-04113호
        <br />
        개인정보보호책임자 : 윤현신/ 구매안전(에스크로)서비스
      </Text>
    </Flex>
  );
};
