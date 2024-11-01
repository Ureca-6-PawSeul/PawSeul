/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { colors } from '@/styles/colors';

interface ButtonProps {
  width: string;
  height: string;
  bg?: string; //background
  hoverBg?: string;
  fontColor?: string;
  fontSize?: number;
  hoverFontColor?: string;
  borderRadius?: string;
  border?: string;
  disabled?: boolean;
}

const Button = styled.div<ButtonProps>`
  display: flex;
  padding: 12px 16px;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => (width ? `${width}` : '100%')};
  height: ${({ height }) => (height ? `${height}` : '100%')};

  border-radius: ${({ borderRadius }) =>
    borderRadius ? borderRadius : '10px'};
  background-color: ${({ bg }) => (bg ? bg : colors.MainColor)};
  border: ${({ border }) => border ?? 'none'};
  box-sizing: border-box;
  flex: 1;

  flex-shrink: 0;
  font-family: 'Pretendard';
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '1rem')};
  font-weight: 600;
  color: ${({ fontColor }) => (fontColor ? fontColor : colors.White)};

  &:hover {
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    background-color: ${({ hoverBg, disabled }) =>
      disabled ? "none" : hoverBg || colors.MainColor};
    color: ${({ hoverFontColor, disabled }) =>
      disabled ? "none" : hoverFontColor || colors.White};
  }
`;

export default Button;
