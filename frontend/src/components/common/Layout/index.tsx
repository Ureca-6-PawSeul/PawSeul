import styled from '@emotion/styled';
import { Flex } from './Flex';
import Navbar from './Navbar';
import Footer from './Footer';

export const Layout = ({ children }) => {
  return (
    <Wrapper direction="column" align="center">
      <Navbar />
      {children}
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled(Flex)`
  overflow-x: hidden;
`;
