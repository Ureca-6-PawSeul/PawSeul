import * as React from 'react';
const SvgMiniSearchIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="#141414"
      d="M15.707 17.121a1 1 0 0 1 1.414-1.414l4.243 4.243a1 1 0 0 1-1.414 1.414z"
    />
    <circle cx={10.5} cy={10.5} r={7.5} stroke="#141414" strokeWidth={2} />
  </svg>
);
export default SvgMiniSearchIcon;
