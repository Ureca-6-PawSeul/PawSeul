// /** @jsxImportSource @emotion/react */
// import styled from '@emotion/styled';
// import { colors } from '@/styles/colors';

// interface ButtonProps{
//     width:number;
//     height: number;
//     bg: string;
//     hoverBg: string;
//     font
// }

// export const Button = styled.div<ButtonProps>`
//   display: flex;
//   padding: 8px 16px;
//   justify-content: center;
//   align-items: center;
//   width: ${({ width }) => (width ? `${width}px` : 'fit-content')};
//   height: ${({ height }) => (height ? `${height}px` : 'fit-content')};

//   border-radius: ${({ borderRadius }) =>
//     borderRadius ? borderRadius : '10px'};
//   background-color: ${({ bg }) => (bg ? bg : colors.white)};
//   background-image: ${({ bgi }) => (bgi ? bgi : 'none')};
//   border: ${({ isBorder }) =>
//     isBorder ? '1px solid rgba(255, 255, 255, 0.5)' : 'none'};

//   box-sizing: border-box;
//   flex-shrink: 0;

//   font-family: 'Pretendard';
//   font-size: ${({ fontSize }) => (fontSize ? fontSize : '14px')};
//   font-weight: 600;
//   color: ${({ fontColor }) => (fontColor ? fontColor : colors.primaryColor)};

//   &:hover {
//     cursor: pointer;
//     background-color: ${({ hoverBg }) =>
//       hoverBg ? hoverBg : colors.primaryColor};
//     background-image: ${({ hbgi }) => (hbgi ? hbgi : 'none')};
//     color: ${({ hoverFontColor }) =>
//       hoverFontColor ? hoverFontColor : colors.white};
//   }
// `;
