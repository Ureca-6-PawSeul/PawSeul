import paymentLoading from '@assets/images/lotties/PaymentLoading.json'
import lottie from 'lottie-web';
import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';
import { Flex } from '../common/Flex';
import { Text } from '../common/Typo';


const PaymentLoading = () => {
  const lottieRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        lottie.loadAnimation({
          container: lottieRef.current,
          renderer: 'svg',
          loop: false,
          autoplay: true,
          animationData: paymentLoading,
        });
      }, []);

      return (
        <Flex direction="column" gap={24}>
          <LottieContainer ref={lottieRef} />
          <LoadingMsg>
            결제 중입니다. <br />
            잠시만 기다려주세요.
          </LoadingMsg>
        </Flex>
      );
}

export default PaymentLoading;

const LottieContainer = styled.div`
  width: 70%;
  aspect-ratio: 1;
`;
const LoadingMsg = styled(Text)`
  text-align: center;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 120%;
`;