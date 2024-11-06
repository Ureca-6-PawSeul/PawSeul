import * as React from 'react';
const SvgErrorIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <circle cx={12} cy={12} r={9} fill="#FCFCD4" />
    <path
      fill="#FCFCD4"
      fillRule="evenodd"
      d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16m0 2c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10"
      clipRule="evenodd"
    />
    <path
      fill="#F84D4D"
      d="M12 14a1 1 0 0 1-1-1V8a1 1 0 1 1 2 0v5a1 1 0 0 1-1 1m0 3.5a1 1 0 1 1 0-2 1 1 0 1 1 0 2"
    />
  </svg>
);
export default SvgErrorIcon;
