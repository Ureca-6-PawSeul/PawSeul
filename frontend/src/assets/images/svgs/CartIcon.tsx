import * as React from 'react';
const SvgCartIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <g clipPath="url(#cart_icon_svg__a)">
      <path
        stroke="#1E1E1E"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.5}
        d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6m4 15a1 1 0 1 1-2 0 1 1 0 0 1 2 0m11 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"
      />
    </g>
    <defs>
      <clipPath id="cart_icon_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgCartIcon;
