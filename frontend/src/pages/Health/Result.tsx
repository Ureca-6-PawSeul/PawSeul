import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { useState } from 'react';

import CircularProgressBar from 'react-customizable-progressbar';
import ProgressBar from '@ramonak/react-progress-bar';

import { Header } from '@/components/common/Header';
import { Text } from '@/components/common/Typo';
import { colors } from '@/styles/colors';
import { Flex, HeightFitFlex } from '@components/common/Flex';
import { Status } from '@/components/health';
import HealthBackground from '@assets/images/pngs/health_background.png';
import { Button } from '@/components/common/Button';

const HealthResult = () => {
  const navigate = useNavigate();
  const [curCal, setCurCal] = useState<number>(240);
  const [needCal, setNeedCal] = useState<number>(300);

  const handleNavigateToHome = () => {
    navigate('/');
  };

  return (
    <Flex direction="column">
      <Header title="분석 결과" />
      <Wrapper
        direction="column"
        gap={16}
        padding="72px 24px 40px 24px"
        justify="flex-start"
        align="flex-start"
      >
        <BackgroundImg src={HealthBackground} />
        <HeightFitFlex gap={15}>
          <CircularProgressBar
            progress={Math.floor((curCal / needCal) * 100)}
            radius={100}
            cut={70}
            rotate={125}
            strokeColor={colors.MainColor}
            strokeWidth={20}
            trackStrokeWidth={20}
          />
          <Flex direction="column" heightPer={60} justify="space-between">
            <Flex direction="column" align="flex-start">
              <Text typo="Body3">탄수화물</Text>
              <ProgressBar
                completed={60}
                customLabel=" "
                bgColor={colors.Red}
                height="10px"
                width="144px"
                baseBgColor={colors.Gray200}
              />
              <Text typo="Body3" colorCode={colors.Gray400}>
                3.03 / 4.44 g
              </Text>
            </Flex>
            <Flex direction="column" align="flex-start">
              <Text typo="Body3">단백질</Text>
              <ProgressBar
                completed={80}
                customLabel=" "
                bgColor={colors.MainColor}
                height="10px"
                width="144px"
                baseBgColor={colors.Gray200}
              />
              <Text typo="Body3" colorCode={colors.Gray400}>
                3.03 / 4.44 g
              </Text>
            </Flex>
            <Flex direction="column" align="flex-start">
              <Text typo="Body3">지방</Text>
              <ProgressBar
                completed={80}
                customLabel=" "
                bgColor={colors.MainColor}
                height="10px"
                width="144px"
                baseBgColor={colors.Gray200}
              />
              <Text typo="Body3" colorCode={colors.Gray400}>
                3.03 / 4.44 g
              </Text>
            </Flex>
          </Flex>
        </HeightFitFlex>

        <Status />
      </Wrapper>
      <HeightFitFlex margin="12px 0 56px 0" widthPer={80}>
        <Button height="48px" onClick={handleNavigateToHome}>
          <Text>홈으로 돌아가기</Text>
        </Button>
      </HeightFitFlex>
    </Flex>
  );
};

export default HealthResult;

const Wrapper = styled(Flex)`
  overflow-y: auto;
`;

const BackgroundImg = styled.img`
  display: flex;
  width: 100%;
  margin-bottom: 12px;
`;
