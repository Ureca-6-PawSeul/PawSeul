import styled from '@emotion/styled';
import { Flex } from '../Flex';
import { Text } from '../Typo';
import { colors } from '@/styles/colors';

interface HeaderType {
  title?: string;
  LeftIcon?: JSX.Element | null;
  RightIcon?: JSX.Element | null;
  onLeftIconClick?: () => void;
  onRightIconClick?: () => void;
  iconWidth?: string;
}

export const Header = ({
  title,
  LeftIcon,
  RightIcon,
  onLeftIconClick,
  onRightIconClick,
  iconWidth = '48px',
}: HeaderType) => {
  return (
    <HeaderWrapper>
      <FixedHeader
        direction="row"
        align="center"
        justify="space-between"
        height={56}
        padding="0 24px"
      >
        <IconBox onClick={onLeftIconClick} iconWidth={iconWidth}>{LeftIcon}</IconBox>

        {title && (
          <Text
            typo="Heading4"
            align="center"
            colorCode={colors.Black}
            margin="0 auto"
          >
            {title}
          </Text>
        )}

        <IconBox onClick={onRightIconClick} iconWidth={iconWidth}>{RightIcon}</IconBox>
      </FixedHeader>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled(Flex)`
  position: relative;
  height: fit-content;
`;

const FixedHeader = styled(Flex)`
  position: absolute;
  top: 0;
  background-color: ${colors.White};
  z-index: 10;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const IconBox = styled.div<{ iconWidth: string }>`
  display: flex;
  width: ${({ iconWidth }) => `${iconWidth}`};
  height: 100%;
  align-items: center;
  justify-content: center;

  cursor: pointer;
`;
