import styled from '@emotion/styled';
import { Flex } from '../Flex';

export const Header = () => {
  return (
    <Wrapper direction="row" align="center" justify="space-between"></Wrapper>
  );
};

const Wrapper = styled(Flex)`
  overflow-x: hidden;
`;
