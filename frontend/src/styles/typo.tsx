import { css } from '@emotion/react';

export const calcRem = (px: number) => `${px / 16}rem`;

export const typo = {
    Heading1: css`
      font-family: 'Pretendard';
      font-weight: 600;
      font-size: ${calcRem(36)};
      line-height: 120%;
    `,
    Heading2: css`
      font-family: 'Pretendard';
      font-weight: 600;
      font-size: ${calcRem(24)};
      line-height: 150%;
    `,
    Heading3: css`
      font-family: 'Pretendard';
      font-weight: 600;
      font-size: ${calcRem(20)};
      line-height: 150%;
    `,
    Heading4: css`
      font-family: 'Pretendard';
      font-weight: 600;
      font-size: ${calcRem(18)};
      line-height: 170%;
    `,
    Body1: css`
      font-family: 'Pretendard';
      font-weight: 500;
      font-size: ${calcRem(18)};
      line-height: 170%;
    `,
    Body2: css`
      font-family: 'Pretendard';
      font-weight: 500;
      font-size: ${calcRem(16)};
      line-height: 170%;
    `,
    Body3: css`
      font-family: 'Pretendard';
      font-weight: 500;
      font-size: ${calcRem(13)};
      line-height: 170%;
    `,
    Body4: css`
      font-family: 'Pretendard';
      font-weight: 400;
      font-size: ${calcRem(8)};
      line-height: 140%;
    `,
    Label1: css`
      font-family: 'Pretendard';
      font-weight: 600;
      font-size: ${calcRem(14)};
      line-height: 170%;
    `,
    Label2: css`
      font-family: 'Pretendard';
      font-weight: 600;
      font-size: ${calcRem(13)};
      line-height: 140%;
    `,
} as const;
