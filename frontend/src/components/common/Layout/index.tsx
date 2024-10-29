import styled from '@emotion/styled';

import Navbar from '../Navbar';
import { Flex } from '../Flex';
import { Header } from '../Header';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Wrapper direction="column" align="center">
      <Header />
      <MobileWrapper direction="column">
        <Flex padding="0 10px">{children}</Flex>
        <Navbar />
      </MobileWrapper>
    </Wrapper>
  );
};

const Wrapper = styled(Flex)`
  overflow-x: hidden;
  min-height: 100vh;
`;

const MobileWrapper = styled(Flex)`
  width: 100%;
  max-width: 480px;
  min-width: 320px;
`;
