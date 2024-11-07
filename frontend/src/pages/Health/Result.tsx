import { useLocation, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { useEffect, useMemo, useState } from 'react';

import CircularProgressBar from 'react-customizable-progressbar';
import ProgressBar from '@ramonak/react-progress-bar';

import { Header } from '@/components/common/Header';
import { Text } from '@/components/common/Typo';
import { colors } from '@/styles/colors';
import { Flex, HeightFitFlex } from '@components/common/Flex';
import { Status } from '@/components/health';
import HealthBackground from '@assets/images/pngs/health_background.png';
import { Button } from '@/components/common/Button';
import { HealthDataType } from '@/assets/types/AnalysisType';
import { usePostHealthInfo } from '@/apis/hooks/health';
import Loading from '@/components/health/Loading';
import { NutrientType } from '@/apis/health';
import { format } from 'date-fns';
import ErrorPage from '../404';
import { useUserStore } from '@/stores/userStore';
import Recommend from '@/components/health/Recommend';

const HealthResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const healthData = useMemo(
    () => location.state as HealthDataType,
    [location.state],
  );

  // 결과 데이터 받기
  const [nutrientData, setNutrientData] = useState<NutrientType>();
  const { mutate: healthMutate, isPending } = usePostHealthInfo(
    setNutrientData,
    () => {
      navigate('/health');
    },
  );

  useEffect(() => {
    if (healthData) {
      healthMutate(healthData);
    }
  }, [healthData]);

  console.log(nutrientData);

  const currentDate = format(new Date(), 'yyyy-MM-dd');

  const calorieStatus =
    nutrientData?.calories.current < nutrientData?.calories.recommended
      ? '섭취량이 조금 부족한 수준이에요.'
      : '적정량을 섭취했어요.';

  const handleNavigateToHome = () => {
    navigate('/');
  };
  const user = useUserStore((state) => state.user);

  return isPending ? (
    <Loading />
  ) : nutrientData ? (
    <Flex direction="column">
      <Header title="분석 결과" />
      <Wrapper
        direction="column"
        gap={16}
        padding="72px 24px 40px 24px"
        justify="flex-start"
        align="flex-start"
      >
        <Text typo="Body2">{`${currentDate} 분석 결과`}</Text>
        <RelativeWrapper>
          <BackgroundImg src={HealthBackground} />
          <ImgText
            direction="column"
            align="flex-start"
            justify="flex-start"
            gap={4}
          >
            <HeightFitFlex justify="flex-start">
              <Text typo="Heading2" colorCode={colors.Red}>
                {nutrientData.deficientNutrients.join(', ')}
              </Text>
              <Text typo="Heading2"> (이)가 부족해요!</Text>
            </HeightFitFlex>
            <HeightFitFlex justify="flex-start" gap={12}>
              <WidthFitFlex gap={16}>
                <Text typo="Body2">몸무게</Text>
                <Text typo="Body2" colorCode={colors.Gray500}>
                  {user.pet.weight}kg{' '}
                </Text>
              </WidthFitFlex>
              <Text>|</Text>
              <WidthFitFlex gap={16}>
                <Text typo="Body2">견종 </Text>
                <Text typo="Body2" colorCode={colors.Gray500}>
                  {user.pet.breed}
                </Text>
              </WidthFitFlex>
            </HeightFitFlex>
          </ImgText>
        </RelativeWrapper>
        <HeightFitFlex gap={16}>
          <RelativeWrapper>
            <CircularProgressBar
              progress={Math.min(
                Math.floor(
                  (nutrientData.calories.current /
                    nutrientData.calories.recommended) *
                    100,
                ),
                100,
              )}
              radius={100}
              cut={70}
              rotate={125}
              strokeColor={colors.MainColor}
              strokeWidth={20}
              trackStrokeWidth={20}
            />
            <CenterText direction="column">
              <InnerText typo="Heading2">
                {nutrientData.calories.current} /{' '}
                {nutrientData.calories.recommended}
              </InnerText>
              <InnerText typo="Heading2">Kcal</InnerText>
            </CenterText>
          </RelativeWrapper>
          <Flex direction="column" heightPer={60} justify="space-between">
            <Flex direction="column" align="flex-start">
              <Text typo="Body3">탄수화물</Text>
              <ProgressBar
                completed={Math.min(
                  Math.floor(
                    (nutrientData.carbon.current /
                      nutrientData.carbon.recommended) *
                      100,
                  ),
                  100,
                )}
                customLabel=" "
                bgColor={colors.Red}
                height="10px"
                width="144px"
                baseBgColor={colors.Gray200}
              />
              <Text typo="Body3" colorCode={colors.Gray400}>
                {nutrientData.carbon.current}/{nutrientData.carbon.recommended}g
              </Text>
            </Flex>
            <Flex direction="column" align="flex-start">
              <Text typo="Body3">단백질</Text>
              <ProgressBar
                completed={Math.min(
                  Math.floor(
                    (nutrientData.protein.current /
                      nutrientData.protein.recommended) *
                      100,
                  ),
                  100,
                )}
                customLabel=" "
                bgColor={colors.MainColor}
                height="10px"
                width="144px"
                baseBgColor={colors.Gray200}
              />
              <Text typo="Body3" colorCode={colors.Gray400}>
                {nutrientData.protein.current}/
                {nutrientData.protein.recommended}g
              </Text>
            </Flex>
            <Flex direction="column" align="flex-start">
              <Text typo="Body3">지방</Text>
              <ProgressBar
                completed={Math.min(
                  Math.floor(
                    (nutrientData.fat.current / nutrientData.fat.recommended) *
                      100,
                  ),
                  100,
                )}
                customLabel=" "
                bgColor={colors.MainColor}
                height="10px"
                width="144px"
                baseBgColor={colors.Gray200}
              />
              <Text typo="Body3" colorCode={colors.Gray400}>
                {nutrientData.fat.current}/{nutrientData.fat.recommended}g
              </Text>
            </Flex>
          </Flex>
        </HeightFitFlex>
        <Status
          totalCalories={nutrientData.calories.current}
          calorieStatus={calorieStatus}
          deficientNutrients={nutrientData.deficientNutrients}
          excessNutrient={nutrientData.excessNutrient}
          optimalNutrient={nutrientData.optimalNutrient}
        />
        <Recommend recommandProduct={nutrientData.recommandProduct} />
      </Wrapper>
      <HeightFitFlex margin="12px 0 56px 0" widthPer={80}>
        <Button height="48px" onClick={handleNavigateToHome}>
          <Text>홈으로 돌아가기</Text>
        </Button>
      </HeightFitFlex>
    </Flex>
  ) : (
    <ErrorPage />
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

const RelativeWrapper = styled.div`
  position: relative;
  width: fit-content;
  height: fit-content;
`;

const CenterText = styled(Flex)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const InnerText = styled(Text)`
  font-size: 1.7rem;
  line-height: 120%;
`;

const ImgText = styled(HeightFitFlex)`
  position: absolute;
  top: 10%;
  left: 7%;
`;

const WidthFitFlex = styled(Flex)`
  width: fit-content;
`;
