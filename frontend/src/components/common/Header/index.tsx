import styled from '@emotion/styled';
import { Flex } from '../Flex';

interface HeaderType {
  title?: string;
  LeftIcon?: JSX.Element | null;
  RightIcon?: JSX.Element | null;
  onLeftIconClick?: () => void;
  onRightIconClick?: () => void;
}

export const Header = ({
  title,
  LeftIcon,
  RightIcon,
  onLeftIconClick,
  onRightIconClick,
}: HeaderType) => {
  return (
    <Flex direction="row" align="center" justify="space-between" height={56}>
      <Flex width={24} height={24} onClick={() => onLeftIconClick}>
        {LeftIcon}
      </Flex>

      <Flex width={24} height={24} onClick={() => onRightIconClick}>
        {RightIcon}
      </Flex>
    </Flex>
  );
};

const Wrapper = styled(Flex)`
  height: 56px;
  overflow-x: hidden;
`;
