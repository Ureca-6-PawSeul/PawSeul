import styled from '@emotion/styled';
import { colors } from '@styles/colors';

const SkeletonUI = () => {
  return (
    <Wrapper>
      {Array.from({ length: 4 }).map((_, index) => (
        <ProductWrapper key={index}>
          <Placeholder width="100%" height="175px" />
          <Placeholder width="80%" height="20px" delay="0.2s" />{' '}
          <Placeholder width="60%" height="20px" delay="0.4s" />{' '}
          <Placeholder width="40%" height="20px" delay="0.6s" />{' '}
        </ProductWrapper>
      ))}
    </Wrapper>
  );
};

export default SkeletonUI;

const Wrapper = styled.div`
  display: flex;
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(100vh - 256px);
  flex-wrap: wrap;
  width: 100%;
  gap: 35px;
`;

const ProductWrapper = styled.div`
  width: calc(50% - 35px);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

interface PlaceholderProps {
  width: string;
  height: string;
  delay?: string;
}

const Placeholder = styled.div<PlaceholderProps>`
  background-color: ${colors.Gray200};
  border-radius: 10px;
  animation: pulse 1.5s infinite;

  width: ${({ width }) => width};
  height: ${({ height }) => height};
  animation-delay: ${({ delay }) => delay};

  @keyframes pulse {
    0% {
      opacity: 0.7;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.7;
    }
  }
`;
