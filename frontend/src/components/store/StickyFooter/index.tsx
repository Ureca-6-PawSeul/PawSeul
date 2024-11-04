import styled from '@emotion/styled';
import { colors } from '@styles/colors';

export const StickyFooter = ({
  isScrolledToBottom,
  children,
}: {
  isScrolledToBottom: boolean;
  children: React.ReactNode;
}) => {
  return <Wrapper isScrolledToBottom={isScrolledToBottom}>{children}</Wrapper>;
};

const Wrapper = styled.div<{ isScrolledToBottom: boolean }>`
  position: fixed;
  bottom: ${({ isScrolledToBottom }) => (isScrolledToBottom ? '85px' : '0')};
  border-radius: 10px;
  padding: 16px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  background-color: ${colors.White};
  z-index: 1000;
  transition: bottom 0.3s ease;
  max-width: 480px;
  width: 100%;
  box-sizing: border-box;
`;

export default StickyFooter;
