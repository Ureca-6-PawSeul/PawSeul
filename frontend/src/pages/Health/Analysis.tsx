import { useState } from 'react';
import styled from '@emotion/styled';
import { Flex } from '@/components/common/Flex';
import { Button } from '@/components/common/Button';
import { HardText, Text } from '@/components/common/Typo';

import Allergy, { Allergies } from '@/components/health/Allergy';
import CurFood from '@/components/health/CurFood';
import healthFood from '@/mocks/data/healthFood.json';
import healthSnack from '@/mocks/data/healthSnack.json';
import { InfoLine } from '../Signup/Result';
import { colors } from '@/styles/colors';
import {
  AllergyItem,
  FoodItem,
  HealthDataType,
  SnackItem,
} from '@/assets/types/AnalysisType';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/stores/userStore';
import { Header } from '@/components/common/Header';
import { IoIosArrowBack } from 'react-icons/io';

const Analysis = () => {
  const navigate = useNavigate();
  // 현재 단계 확인용
  const [step, setStep] = useState(1);

  const [hasAllergy, setHasAllergy] = useState<boolean | null>(null);
  const [selectedAllergies, setSelectedAllergies] = useState<number[]>([]);
  const [selectedAllergiesItems, setSelectedAllergiesItems] =
    useState<AllergyItem>([]);

  // 알러지 데이터 취합용
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

  // 사료/간식 선택 데이터 취합용
  const [selectedFood, setSelectedFood] = useState<number | null>(null);
  const [selectedSnack, setSelectedSnack] = useState<number | null>(null);
  // 사료/간식 id값으로 찾은 데이터 취합용
  const [selectedFoodItem, setSelectedFoodItem] = useState<FoodItem | null>(
    null,
  );
  const [selectedSnackItem, setSelectedSnackItem] = useState<SnackItem | null>(
    null,
  );

  const handleFoodChange = (foodId: number | null) => {
    setSelectedFood(foodId);
  };

  const handleSnackChange = (snackId: number | null) => {
    setSelectedSnack(snackId);
  };

  const user = useUserStore((state) => state.user);

  const handleNavigateToBack = () => {
    navigate(-1);
  };

  // 단계별 설정
  const handleContinue = () => {
    if (step < 3) {
      setStep(step + 1);
      if (step === 2) {
        setSelectedAllergiesItems(
          Allergies.filter((item) => selectedAllergies.includes(item.id)),
        );
        setSelectedFoodItem(
          healthFood.find((item) => item.product_id === selectedFood),
        );
        setSelectedSnackItem(
          healthSnack.find((item) => item.index === selectedSnack),
        );
      }
    } else {
      const selectedData: HealthDataType = {
        allergy: selectedAllergiesItems,
        food: selectedFoodItem,
        snack: selectedSnackItem,
        pet: {
          age: user.pet.age,
          breed: user.pet.breed,
          weight: user.pet.weight,
          gender: user.pet.gender,
        },
      };

      navigate('/health/result', { state: selectedData });
    }
  };

  return (
    <>
      <Header
        title="영양 분석"
        LeftIcon={<IoIosArrowBack size={26} color={colors.Black} />}
        onLeftIconClick={handleNavigateToBack}
      />
      <Flex
        direction="column"
        justify="flex-start"
        align="center"
        padding="80px 32px 0 32px"
        gap={40}
      >
        {step === 1 && (
          <Allergy
            hasAllergy={hasAllergy}
            selectedAllergies={selectedAllergies}
            handleAllergyClick={handleAllergyClick}
            handleTagClick={handleTagClick}
          />
        )}
        {step === 2 && (
          <CurFood
            selectedFood={selectedFood}
            selectedSnack={selectedSnack}
            handleFoodChange={handleFoodChange}
            handleSnackChange={handleSnackChange}
          />
        )}
        {step === 3 && (
          <Flex
            direction="column"
            gap={24}
            align="flex-start"
            padding="0 0px 32px 0"
          >
            <Text typo="Heading2">정보를 다시 한번 확인해주세요.</Text>
            <Flex
              direction="column"
              gap={18}
              justify="flex-start"
              align="flex-start"
            >
              <InfoLine
                justify="space-between"
                borderRadius={10}
                backgroundColor={colors.White}
              >
                <HardText typo="Body3" margin="0 24px 0 0">
                  알러지
                </HardText>
                <Text typo="Body3" colorCode={colors.Gray400}>
                  {selectedAllergiesItems.length === 0
                    ? '없음'
                    : selectedAllergiesItems
                        .map((item) => item.name)
                        .join(', ')}
                </Text>
              </InfoLine>
              <InfoLine
                justify="space-between"
                borderRadius={10}
                backgroundColor={colors.White}
              >
                <HardText typo="Body3" margin="0 24px 0 0">
                  선택한 사료
                </HardText>
                <Text typo="Body3" colorCode={colors.Gray400}>
                  {selectedFoodItem?.title || '선택된 사료 없음'}
                </Text>
              </InfoLine>
              <InfoLine
                justify="space-between"
                borderRadius={10}
                backgroundColor={colors.White}
              >
                <HardText typo="Body3" margin="0 24px 0 0">
                  선택한 간식
                </HardText>
                <Text typo="Body3" colorCode={colors.Gray400}>
                  {selectedSnackItem?.title || '선택된 간식 없음'}
                </Text>
              </InfoLine>
            </Flex>
          </Flex>
        )}
        <ContinueBtn onClick={handleContinue}>
          {step < 3 ? '계속하기' : '분석요청'}
        </ContinueBtn>
      </Flex>
    </>
  );
};

export default Analysis;

const ContinueBtn = styled(Button)`
  padding: 16px 20px;
  border: none;
  bottom: 48px;
  position: sticky;
`;
