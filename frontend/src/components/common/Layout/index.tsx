import styled from '@emotion/styled';

import Navbar from '../Navbar';
import { Flex } from '../Flex';
import { Footer } from '../Footer';
import { Header } from '../Header';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Wrapper direction="column" align="center" height={812}>
      <Flex width={375} direction='column'>
        <Header />
        {children}
        {/* <Navbar /> */}
        {/* <Footer /> */}
      </Flex>
    </Wrapper>
  );
};

const Wrapper = styled(Flex)`
  overflow-x: hidden;
`;
