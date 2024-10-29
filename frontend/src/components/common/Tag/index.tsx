import styled from '@emotion/styled';
import { Flex } from '../Flex';
import { tag } from '@styles/tag';
import { css } from '@emotion/react';

interface TagProps {
  width?: number;
  height?: number;
  colorCode: keyof typeof tag;
  onClick?: () => void;
  children: React.ReactNode;
}

const Tag = ({ width, height, colorCode, onClick, children }: TagProps) => {
  return (
    <TagWrapper
      width={width}
      height={height}
      colorCode={colorCode}
      onClick={onClick}
      borderRadius={20}
    >
      {children}
    </TagWrapper>
  );
};
export default Tag;

const TagWrapper = styled(Flex)<{
  colorCode: keyof typeof tag;
  width?: number | string;
}>`
  ${({ colorCode }) => tag[colorCode]}
  ${({ width }) =>
    width
      ? css`
          width: ${width}px;
        `
      : 'width: fit-content;'}

    ${({ height }) =>
    height
      ? css`
          height: ${height}px;
        `
      : 'height: fit-content;'}
`;
