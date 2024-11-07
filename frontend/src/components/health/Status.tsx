import styled from '@emotion/styled';
import { Flex, HeightFitFlex } from '@components/common/Flex';
import { Text } from '@components/common/Typo';
import { colors } from '@/styles/colors';
import { useUserStore } from '@/stores/userStore';

const Status = ({
  calorieStatus,
  deficientNutrients,
  excessNutrient,
  optimalNutrient,
  totalCalories,
}: {
  calorieStatus: string;
  deficientNutrients: string[];
  excessNutrient: string;
  optimalNutrient: string;
  totalCalories: number;
}) => {
  const user = useUserStore((state) => state.user);

  return (
    <StatusWrapper
      borderRadius={15}
      padding="32px 24px"
      direction="column"
      align="flex-start"
      gap={16}
    >
      <Text typo="Body1">
        오늘 {user.pet.petname}이 먹은 영양소는 총 {totalCalories}Kcal로,{' '}
        {calorieStatus}
      </Text>

      <Flex
        direction="column"
        align="flex-start"
        margin="12px 0 0 0"
        padding="0 24px"
        gap={10}
      >
        <Flex gap={12} justify="flex-start">
          <Text typo="Body2">부족 영양소 :</Text>
          <Text typo="Body2">{deficientNutrients.join(', ')}</Text>
        </Flex>
        <Flex gap={12} justify="flex-start">
          <Text typo="Body2">과잉 영양소 :</Text>
          <Text typo="Body2"> {excessNutrient}</Text>
        </Flex>
        <Flex gap={12} justify="flex-start">
          <Text typo="Body2">적정 영양소 :</Text>
          <Text typo="Body2"> {optimalNutrient}</Text>
        </Flex>
      </Flex>

      <Text typo="Body3" colorCode={colors.Gray400}>
        * 사용자 정보를 기반으로 AI로 분석한 결과입니다.
      </Text>
    </StatusWrapper>
  );
};

export default Status;

const StatusWrapper = styled(HeightFitFlex)`
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;
