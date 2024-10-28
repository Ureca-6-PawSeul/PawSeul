import { Text } from '@components/common/Typo';
import { Flex } from '@components/common/Flex';
import styled from '@emotion/styled';
import { colors } from '@styles/colors';
import { ReactNode } from 'react';

interface DetailButtonProps {
  children: ReactNode;
  handleButtonClick: () => void;
  colorCode: string | undefined;
}

const DetailButton = ({
  children,
  handleButtonClick,
  colorCode,
}: DetailButtonProps) => {
  return (
    <Flex padding="0 16px 0">
      <OpenButton onClick={handleButtonClick} colorCode={colorCode}>
        <Text typo="Body2" margin="10px 0px" colorCode={colorCode}>
          {children}
        </Text>
      </OpenButton>
    </Flex>
  );
};

const OpenButton = styled.button<{
  colorCode: string | undefined;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.White};
  cursor: pointer;
  padding: 0;
  border-radius: 6px;
  border: 1px solid;
  border-color: ${({ colorCode }) => colorCode};
  width: 100%;
`;

export default DetailButton;
