import styled from '@emotion/styled';
import Navbar from '../Navbar';
import { Flex } from '../Flex';
import { colors } from '@/styles/colors';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Wrapper direction="column" align="center" justify="flex-start">
      <MobileWrapper direction="column">
        <Flex direction="column">{children}</Flex>
        <Navbar />
      </MobileWrapper>
    </Wrapper>
  );
};

const Wrapper = styled(Flex)`
  overflow-x: hidden;
  background-color: ${colors.Gray700};
`;

const MobileWrapper = styled(Flex)`
  max-width: 480px;
  min-width: 320px;
  height: auto;
  flex: 1;
  @media (min-width: 431px) {
    border-style: solid;
    border-color: rgb(225, 225, 225);
    border-image: initial;
    border-width: 0.5px;
  }
  background-color: ${colors.White};
`;
