/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { ReactNode } from 'react';
import { colors } from '@styles/colors';

interface NavItemProps {
  isActive: boolean;
  text: string;
  onClick: () => void;
  iconType: 'home' | 'store' | 'search' | 'health' | 'mypage';
  children: ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({
  isActive,
  children,
  text,
  onClick,
}) => {
  const activeStyle = isActive ? active : inactive;

  return (
    <div css={[commonStyle, activeStyle]} onClick={onClick}>
      {children}
      <span css={textStyle}>{text}</span>
    </div>
  );
};

const commonStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 6rem;
`;

const active = css`
  color: ${colors.MainColor};
`;

const inactive = css`
  color: ${colors.Gray500};
`;

const textStyle = css`
  margin-top: 0.25rem;
  font-size: 0.7rem;
`;

export default NavItem;
