import styled from '@emotion/styled';
import Navbar from '../Navbar';
import { Flex } from '../Flex';
import { Header } from '../Header';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Wrapper direction="column" align="center" justify="flex-start">
      <MobileWrapper direction="column">
        <Header />
        <Flex direction="column">{children}</Flex>
        <Navbar />
      </MobileWrapper>
    </Wrapper>
  );
};

const Wrapper = styled(Flex)`
  overflow-x: hidden;
`;
