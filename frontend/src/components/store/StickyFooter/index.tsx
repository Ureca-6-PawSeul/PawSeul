import styled from '@emotion/styled';
import { colors } from '@styles/colors';

export const StickyFooter = ({
  isScrolledToBottom,
  isBottomSheetOpen = false,
  children,
}: {
  isScrolledToBottom: boolean;
  children: React.ReactNode;
  isBottomSheetOpen?: boolean;
}) => {
  return <Wrapper isScrolledToBottom={isScrolledToBottom} isBottomSheetOpen={isBottomSheetOpen}>{children}</Wrapper>;
};

const Wrapper = styled.div<{ isScrolledToBottom: boolean, isBottomSheetOpen: boolean }>`
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
  /* height: ${({ isBottomSheetOpen }) => (isBottomSheetOpen ? '100%' : 'auto')}; */
`;

export default StickyFooter;
