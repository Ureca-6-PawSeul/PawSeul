import * as React from 'react';
const SvgCheckIcon = (props) => (
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
      fill="#4CD8E5"
      fillRule="evenodd"
      d="M16.707 8.733a1 1 0 0 1-.052 1.413l-6.267 5.82A1 1 0 0 1 9 15.94l-2.293-2.293a1 1 0 1 1 1.414-1.414l1.612 1.611 5.56-5.164a1 1 0 0 1 1.414.053"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgCheckIcon;
