import * as React from 'react';
const SvgHomeIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <mask
      id="home_icon_svg__a"
      width={22}
      height={24}
      x={1}
      y={0}
      fill="currentColor"
      maskUnits="userSpaceOnUse"
    >
      <path fill="#fff" d="M1 0h22v24H1z" />
      <path d="m12 2 9 7v13h-4.694v-7a1 1 0 0 0-1-1H8.694a1 1 0 0 0-1 1v7H3V9z" />
    </mask>
    <path
      fill="currentColor"
      d="m12 2 9 7v13h-4.694v-7a1 1 0 0 0-1-1H8.694a1 1 0 0 0-1 1v7H3V9z"
    />
    <path
      fill="currentColor"
      d="M21 9h2a2 2 0 0 0-.772-1.579zm-9-7L13.228.421a2 2 0 0 0-2.456 0zM3 9 1.772 7.421A2 2 0 0 0 1 9zm0 13H1a2 2 0 0 0 2 2zm4.694 0v2h2v-2zm8.612 0h-2v2h2zM21 22v2a2 2 0 0 0 2-2zm1.228-14.579-9-7-2.456 3.158 9 7zm-11.456-7-9 7 2.456 3.158 9-7zM1 9v13h4V9zm2 15h4.694v-4H3zm6.694-2v-7h-4v7zm-1-6h6.612v-4H8.694zm5.612-1v7h4v-7zm2 9H21v-4h-4.694zM23 22V9h-4v13zm-7.694-6a1 1 0 0 1-1-1h4a3 3 0 0 0-3-3zm-5.612-1a1 1 0 0 1-1 1v-4a3 3 0 0 0-3 3z"
      mask="url(#home_icon_svg__a)"
    />
  </svg>
);
export default SvgHomeIcon;
