import styled from '@emotion/styled';
import { Flex, HeightFitFlex } from '@/components/common/Flex';
import { Text } from '@/components/common/Typo';
import { colors } from '@/styles/colors';
import Tag from '@/components/common/Tag';
import { Button } from '../common/Button';

interface AllergyProps {
  hasAllergy: boolean | null;
  selectedAllergies: number[];
  handleAllergyClick: (status: boolean) => void;
  handleTagClick: (id: number) => void;
}

export const Allergies = [
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

const Allergy = ({
  hasAllergy,
  selectedAllergies,
  handleAllergyClick,
  handleTagClick,
}: AllergyProps) => {
  return (
    <>
      <HeightFitFlex direction="column" align="flex-start">
        <Text typo="Heading2">알러지가 있나요?</Text>
        <Text typo="Body3" colorCode={colors.Gray500}>
          알러지가 있다면 어떤 알러지가 있는지 선택해주세요.
        </Text>
      </HeightFitFlex>
      <Flex direction="column" gap={24} justify="flex-start">
        <HeightFitFlex direction="column" gap={16}>
          <StyledButton
            bg={colors.White}
            hoverBg={colors.White}
            fontColor={colors.Black}
            hoverFontColor={colors.Black}
            border={`1px solid ${colors.Gray700}`}
            selected={hasAllergy === true}
            onClick={() => handleAllergyClick(true)}
          >
            <Text typo="Body2">알러지가 있어요</Text>
          </StyledButton>
          <StyledButton
            bg={colors.White}
            hoverBg={colors.White}
            fontColor={colors.Black}
            hoverFontColor={colors.Black}
            border={`1px solid ${colors.Gray700}`}
            selected={hasAllergy === false}
            onClick={() => handleAllergyClick(false)}
          >
            <Text typo="Body2">알러지가 없어요</Text>
          </StyledButton>
        </HeightFitFlex>

        {hasAllergy && (
          <TagBox justify="flex-start">
            {Allergies.map((item) => (
              <Tag
                key={item.id}
                colorCode={
                  selectedAllergies.includes(item.id)
                    ? 'FilledBlack'
                    : 'BorderBlack'
                }
                onClick={() => handleTagClick(item.id)}
              >
                <Text typo="Label3">{item.name}</Text>
              </Tag>
            ))}
          </TagBox>
        )}
      </Flex>
    </>
  );
};

export default Allergy;

const StyledButton = styled(Button)<{ selected: boolean }>`
  opacity: ${({ selected }) => (selected ? 1 : 0.3)};
  font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')};
`;

const TagBox = styled(HeightFitFlex)`
  flex-wrap: wrap;
  gap: 10px;
  width: 98%;
`;
