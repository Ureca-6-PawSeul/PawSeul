import styled from '@emotion/styled';
import { KeyOfTypo, theme } from '@styles/theme';

export const Text = styled.div<{
  // webTypo?: KeyOfWebTypo;
  // mobileTypo?: KeyOfMobileTypo;
  typo?: KeyOfTypo;
  colorCode?: string;
  margin?: string;
}>`
  ${({ typo }) => (typo ? theme.typo[typo] : '')};
  color: ${({ colorCode }) => colorCode ?? `${colorCode}`};

  display: flex;
  align-items: center;
  margin: ${({ margin }) => (margin ? margin : '0')};
`;
