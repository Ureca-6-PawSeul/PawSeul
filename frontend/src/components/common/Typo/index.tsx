import styled from '@emotion/styled';
import { KeyOfMobileTypo, KeyOfWebTypo, theme } from '@styles/theme';

export const Text = styled.div<{
  webTypo?: KeyOfWebTypo;
  mobileTypo?: KeyOfMobileTypo;
  colorCode?: string;
  margin?: string;
}>`
  ${({ webTypo }) => (webTypo ? theme.typo.Web[webTypo] : '')};
  color: ${({ colorCode }) => colorCode ?? `${colorCode}`};

  display: flex;
  align-items: center;
  margin: ${({ margin }) => (margin ? margin : '0')};

  /* 브라우저 크기에 따라 가로 크기 변경 */
  @media (max-width: 1023px) {
    ${({ mobileTypo }) => (mobileTypo ? theme.typo.Mobile[mobileTypo] : '')};
  }
`;
