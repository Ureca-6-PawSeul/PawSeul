import { Flex } from '@components/common/Flex';
import { HealthGuideBanner } from '@/assets/images/svgs';
import { Button } from '@/components/common/Button';
import { Text } from '@/components/common/Typo';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/common/Header';
import { IoIosArrowBack } from 'react-icons/io';
import { colors } from '@/styles/colors';

const Health = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('/health/analysis');
  };
  const handleNavigateToBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Header
        title="건강"
        LeftIcon={<IoIosArrowBack size={26} color={colors.Black} />}
        onLeftIconClick={handleNavigateToBack}
      />
      <Flex
        direction="column"
        justify="flex-start"
        align="center"
        margin="72px 0 0 0"
      >
        <HealthGuideBanner width="90%" />
        <Flex widthPer={80} height="auto" padding="40px 0 120px 0">
          <Button height="50px" onClick={handleNavigate}>
            <Text typo="Body1">영양분석 하러가기</Text>
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default Health;
