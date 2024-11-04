import { useState } from 'react';
import styled from '@emotion/styled';
import { Flex } from '@/components/common/Flex';
import { Button } from '@/components/common/Button';
import { Text } from '@/components/common/Typo';
import { colors } from '@/styles/colors';
import Tag from '@/components/common/Tag';

const Analysis = () => {
  const Allergies = [
    { id: 0, name: '소고기' },
    { id: 1, name: '콩' },
    { id: 2, name: '닭고기' },
    { id: 3, name: '우유' },
    { id: 4, name: '옥수수' },
    { id: 5, name: '밀' },
    { id: 6, name: '계란' },
    { id: 7, name: '견과류' },
    { id: 8, name: '과일' },
    { id: 9, name: '꽃가루' },
    { id: 10, name: '먼지' },
    { id: 11, name: '곰팡이' },
    { id: 12, name: '벼룩' },
  ];

  const [hasAllergy, setHasAllergy] = useState<boolean | null>(null);

  const handleAllergyClick = (allergyStatus: boolean) => {
    setHasAllergy(allergyStatus);
  };

  return (
    <Flex
      direction="column"
      justify="flex-start"
      align="center"
      padding="60px 32px 0 32px"
      gap={55}
    >
      <HeightFitFlex direction="column" align="flex-start">
        <Text typo="Heading2">알러지가 있나요?</Text>
        <GuideText typo="Body3" colorCode={colors.Gray500}>
          알러지가 없다면 선택하지 않고 다음으로 넘어가주세요.
        </GuideText>
      </HeightFitFlex>

      <Flex direction="column" gap={24} justify="flex-start">
        <HeightFitFlex direction="column" gap={16}>
          <StyledButton
            height="50px"
            selected={hasAllergy === true}
            onClick={() => handleAllergyClick(true)}
          >
            <Text typo="Body1">알러지가 있어요</Text>
          </StyledButton>
          <StyledButton
            height="50px"
            selected={hasAllergy === false}
            onClick={() => handleAllergyClick(false)}
          >
            <Text typo="Body1">알러지가 없어요</Text>
          </StyledButton>
        </HeightFitFlex>

        {hasAllergy && (
          <TagBox justify="flex-start">
            {Allergies.map((item) => (
              <Tag key={item.id} colorCode="BorderGray">
                {item.name}
              </Tag>
            ))}
          </TagBox>
        )}
      </Flex>
      <ContinueBtn>계속하기</ContinueBtn>
    </Flex>
  );
};

export default Analysis;

const StyledButton = styled(Button)<{ selected: boolean }>`
  opacity: ${({ selected }) => (selected ? 1 : 0.5)};
  font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')};
`;

export const HeightFitFlex = styled(Flex)`
  height: fit-content;
`;

const TagBox = styled(HeightFitFlex)`
  flex-wrap: wrap;
  gap: 10px;
`;

const GuideText = styled(Text)`
  line-height: 100%;
`;

const ContinueBtn = styled(Button)`
  padding: 14px 20px;
  border: none;
  bottom: 48px;
  position: sticky;
`;
