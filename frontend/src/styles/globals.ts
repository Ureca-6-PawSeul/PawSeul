import { css } from '@emotion/react';
import emotionReset from 'emotion-reset';

export const globalStyle = css`
  ${emotionReset}
  * {
    font-family: 'Pretendard', sans-serif;
  }

  html {
    box-sizing: border-box;
    font-family: 'Pretendard', sans-serif;
  }

  body {
    width: 100%;
    height: 100vh;
    margin: 0;
    padding: 0;
    min-width: 320px;
    min-height: 100vh;
    overflow-x: hidden;

    justify-content: flex-start;
    align-items: center;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: 'Pretendard', sans-serif;

    -ms-overflow-style: none;
    scrollbar-width: none;
    .scroll::-webkit-scrollbar {
      display: none;
    }
  }
`;
