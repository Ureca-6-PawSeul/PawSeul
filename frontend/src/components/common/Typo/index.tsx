import styled from '@emotion/styled';
import { KeyOfTypo, theme } from '@styles/theme';

export const Text = styled.div<{
  typo?: KeyOfTypo;
  colorCode?: string;
  margin?: string;
  align?: string;
}>`
  ${({ typo }) => (typo ? theme.typo[typo] : '')};
  color: ${({ colorCode }) => colorCode ?? `${colorCode}`};

  display: flex;
  align-items: ${({ align }) => (align ? align : 'center')};
  margin: ${({ margin }) => (margin ? margin : '0')};
`;

export const HardText = styled(Text)`
  flex-shrink: 0;
`;
