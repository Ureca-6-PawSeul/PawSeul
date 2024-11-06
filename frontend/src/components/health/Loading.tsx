import { Button } from '@/components/common/Button';
import { Flex } from '@/components/common/Flex';
import styled from '@emotion/styled';
import lottie from 'lottie-web';
import { useEffect, useRef } from 'react';
import loadingAnimation from '@assets/images/lotties/Loading.json';
import { Text } from '../common/Typo';

const Loading = () => {
  const lottieRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: lottieRef.current,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      animationData: loadingAnimation,
    });
  }, []);

  return (
    <Flex direction="column" gap={24}>
      <LottieContainer ref={lottieRef} />
      <LoadingMsg>
        건강 분석 중입니다. <br />
        잠시만 기다려주세요.
      </LoadingMsg>
    </Flex>
  );
};

export default Loading;

const LottieContainer = styled.div`
  width: 70%;
  aspect-ratio: 1;
`;

const LoadingMsg = styled(Text)`
  text-align: center;
  font-size: 1.25rem;
  font-weight: 600;
`;
