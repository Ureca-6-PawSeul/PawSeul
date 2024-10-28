import styled from '@emotion/styled';
import { Text } from '@components/common/Typo';

export const ReviewText = styled(Text)<{
  decorationLine?: string;
  justify?: string;
  width?: string;
  whiteSpace?: string;
  fontWeight?: string;
}>`
  text-decoration-line: ${({ decorationLine }) =>
    decorationLine ? `${decorationLine}` : 'none'};
  justify-content: ${({ justify }) => (justify ? `${justify}` : 'center')};
  width: ${({ width }) => (width ? `${width}` : 'auto')};
  white-space: ${({ whiteSpace }) => (whiteSpace ? `${whiteSpace}` : 'none')};
  font-weight: ${({ fontWeight }) =>
    fontWeight ? `${fontWeight}` : 'inherit'};
`;
