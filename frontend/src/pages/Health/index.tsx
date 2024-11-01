import styled from '@emotion/styled';
import { Flex } from '@components/common/Flex';
import { HealthGuideBanner } from '@/assets/images/svgs';
import { Button } from '@/components/common/Button';
import { Text } from '@/components/common/Typo';

const Health = () => {
  return (
    <Wrapper direction="column" justify="flex-start" align="center">
      <Flex direction="column" justify="flex-start" height="fit-content">
        <HealthGuideBanner width="100%" heigh="80%" />
      </Flex>
      <Flex width="auto" height="auto" padding="60px 0 ">
        <Button width="370px" height="50px">
          <Text typo="Body1">영양분석 하러가기</Text>
        </Button>
      </Flex>
    </Wrapper>
  );
};

export default Health;

const Wrapper = styled(Flex)``;
