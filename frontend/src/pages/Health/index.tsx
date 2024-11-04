import styled from '@emotion/styled';
import { Flex } from '@components/common/Flex';
import { HealthGuideBanner } from '@/assets/images/svgs';
import { Button } from '@/components/common/Button';
import { Text } from '@/components/common/Typo';
import { useNavigate } from 'react-router-dom';

const Health = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('/health/analysis');
  };

  return (
    <Wrapper
      direction="column"
      justify="flex-start"
      align="center"
      margin="60px 0 0 0"
    >
      <HealthGuideBanner width="90%" />
      <Flex width="auto" height="auto" padding="40px 0 120px 0">
        <Button width="370px" height="50px" onClick={handleNavigate}>
          <Text typo="Body1">영양분석 하러가기</Text>
        </Button>
      </Flex>
    </Wrapper>
  );
};

export default Health;

const Wrapper = styled(Flex)``;
