import { Button } from '@/components/common/Button';
import { Flex } from '@/components/common/Flex';
import styled from '@emotion/styled';
import lottie from 'lottie-web';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import errorAnimation from '@assets/images/lotties/Error.json';

const ErrorPage = () => {
  const navigate = useNavigate();
  const lottieRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: lottieRef.current,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      animationData: errorAnimation,
    });
  }, []);

  return (
    <Flex direction="column">
      <LottieContainer ref={lottieRef} />
      <ErrorMessage>오류가 발생했습니다. 다시 시도해주세요.</ErrorMessage>
      <ButtonContainer>
        <Button onClick={() => navigate('/')}>홈으로</Button>
      </ButtonContainer>
    </Flex>
  );
};

export default ErrorPage;

const LottieContainer = styled.div`
  width: 20%;
  aspect-ratio: 1;
`;

const ErrorMessage = styled.div`
  text-align: center;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 40px;
`;

const ButtonContainer = styled.div`
  width: 80%;
  padding: 0 24px;
  display: flex;
  justify-content: center;
`;
