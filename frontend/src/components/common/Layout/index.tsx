import styled from '@emotion/styled';

import Navbar from '../Navbar';
import { Flex } from '../Flex';
import { Footer } from '../Footer';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Wrapper direction="column" align="center">
      {children}
      <Navbar />
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled(Flex)`
  overflow-x: hidden;
`;
