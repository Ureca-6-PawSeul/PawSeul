import styled from '@emotion/styled';
import { Flex } from '../Flex';

export const Header = () => {
  return (
    <Wrapper direction="row" align="center" justify="space-between"></Wrapper>
  );
};

const Wrapper = styled(Flex)`
height: 0px;
  overflow-x: hidden;
`;
