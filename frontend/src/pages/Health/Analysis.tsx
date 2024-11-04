import { useState } from 'react';
import styled from '@emotion/styled';
import { Flex } from '@/components/common/Flex';
import { Button } from '@/components/common/Button';
import Allergy from '@/components/health/Allergy';

const Analysis = () => {
  const [hasAllergy, setHasAllergy] = useState<boolean | null>(null);
  const [selectedAllergies, setSelectedAllergies] = useState<number[]>([]);

  const handleAllergyClick = (allergyStatus: boolean) => {
    setHasAllergy(allergyStatus);
  };

  const handleTagClick = (id: number) => {
    setSelectedAllergies((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id)
        : [...prevSelected, id],
    );
  };

  return (
    <Flex
      direction="column"
      justify="flex-start"
      align="center"
      padding="60px 32px 0 32px"
      gap={40}
    >
      <Allergy
        hasAllergy={hasAllergy}
        selectedAllergies={selectedAllergies}
        handleAllergyClick={handleAllergyClick}
        handleTagClick={handleTagClick}
      />

      <ContinueBtn>계속하기</ContinueBtn>
    </Flex>
  );
};

export default Analysis;

export const HeightFitFlex = styled(Flex)`
  height: fit-content;
`;

const ContinueBtn = styled(Button)`
  padding: 16px 20px;
  border: none;
  bottom: 48px;
  position: sticky;
`;
