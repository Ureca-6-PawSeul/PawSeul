import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Flex } from '@/components/common/Flex';
import { Text } from '@/components/common/Typo';
import { colors } from '@/styles/colors';
import healthFood from '@/mocks/data/healthFood.json';
import healthSnack from '@/mocks/data/healthSnack.json';
import { HeightFitFlex } from './Allergy';

const CurFood = ({
  selectedFood,
  selectedSnack,
  handleFoodChange,
  handleSnackChange,
}) => (
  <>
    <HeightFitFlex direction="column" align="flex-start">
      <Text typo="Heading2">반려견이 먹는 식단을 입력해주세요.</Text>
      <Text typo="Body3" colorCode={colors.Gray500}>
        식단에 따라 필요한 영양소를 계산해요.
      </Text>
    </HeightFitFlex>
    <Flex direction="column" gap={30} justify="flex-start">
      <HeightFitFlex direction="column" align="flex-start" gap={12}>
        <Text typo="Heading3">사료 선택</Text>
        <StyledSelect
          onChange={(e) => handleFoodChange(Number(e.target.value))}
          value={selectedFood ?? ''}
        >
          <option value="" disabled>
            사료를 선택해주세요
          </option>
          {healthFood.map((item) => (
            <option key={item.product_id} value={item.product_id}>
              {item.title}
            </option>
          ))}
        </StyledSelect>
      </HeightFitFlex>

      <HeightFitFlex direction="column" align="flex-start" gap={12}>
        <Text typo="Heading3">간식 선택</Text>
        <StyledSelect
          onChange={(e) => handleSnackChange(Number(e.target.value))}
          value={selectedSnack ?? ''}
        >
          <option value="" disabled>
            간식을 선택해주세요
          </option>
          {healthSnack.map((item) => (
            <option key={item.index} value={item.index}>
              {item.title}
            </option>
          ))}
        </StyledSelect>
      </HeightFitFlex>
    </Flex>
  </>
);

export default CurFood;

const StyledSelect = styled.select`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid ${colors.Gray300};
  border-radius: 10px;
  &:focus {
    border-color: ${colors.MainColor};
    outline: none;
  }
`;
