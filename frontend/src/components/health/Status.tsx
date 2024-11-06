import styled from '@emotion/styled';
import { Flex, HeightFitFlex } from '@components/common/Flex';
import { Text } from '@components/common/Typo';
import { useUserStore } from '@/stores/userStore';
import { colors } from '@/styles/colors';

const Status = () => {
  const user = useUserStore((state) => state.user);

  return (
    <StatusWrapper
      borderRadius={15}
      padding="32px 24px"
      direction="column"
      align="flex-start"
      gap={12}
    >
      <Text typo="Body2">
        오늘 {user.pet.petname}이 먹은 영양소는 총 240Kcal로, 섭취량이 조금
        부족한 수준이에요.
      </Text>

      <Flex
        direction="column"
        align="flex-start"
        margin="12px 0 0 0"
        padding="0 24px"
        gap={10}
      >
        <Text typo="Label1">부족 영양소</Text>
        <Text typo="Label1">과잉 영양소</Text>
        <Text typo="Label1">적정 영양소</Text>
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
