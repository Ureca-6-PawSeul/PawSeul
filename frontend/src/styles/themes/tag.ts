import { css } from '@emotion/react';
import { colors } from '../colors';

export const calcRem = (px: number) => `${px / 16}rem`;

export const tag = {
  BorderGray: css`
    outline: solid 1px ${colors.Gray200};
    outline-offset: -1px;
    border-radius: 30px;
    color: ${colors.Gray700};
    padding: 8px 12px;
    height: fit-content;
  `,
  BorderMainColor: css`
    border: solid 1px ${colors.MainColor};
    border-radius: 15px;
    color: ${colors.MainColor};
    padding: 10px;
    height: fit-content;
  `,
  FilledGray: css`
    border: solid 1px ${colors.Gray300};
    border-radius: 30px;
    color: ${colors.White};
    background-color: ${colors.Gray300};
    padding: 7px 11px;
    height: fit-content;
  `,
  FilledMainColor: css`
    border-radius: 30px;
    color: ${colors.White};
    background-color: ${colors.MainColor};
    padding: 8px 12px;
    height: fit-content;
  `,
  Empty: css`
    border: none;
    padding: 8px 12px;
    height: fit-content;
  `,
  BorderBlack: css`
    outline: solid 1px ${colors.Gray500};
    border-radius: 30px;
    color: ${colors.Gray600};
    padding: 8px 12px;
    height: fit-content;
  `,
  FilledBlack: css`
    border: solid 1px ${colors.Gray600};
    border-radius: 30px;
    color: ${colors.White};
    background-color: ${colors.Gray600};
    padding: 7px 11px;
    height: fit-content;
  `,
} as const;
