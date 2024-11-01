import { Flex } from '@/components/common/Flex';
import { Text } from '@/components/common/Typo';
import { colors } from '@/styles/colors';

export const ReviewHistoryPage = () => {
  return (
    <Flex direction="column" padding="0 12px" justify="flex-start" height="100%" >
      <Flex justify="space-between">
        <Flex direction="column">
          <Text colorCode={colors.Black} typo="Label1" align="flex-start">
            이예원님
          </Text>
          <Text colorCode={colors.Black} typo="Label1" align="flex-start">
            email@naver.com
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
