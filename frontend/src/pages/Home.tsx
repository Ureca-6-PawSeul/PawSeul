import styled from '@emotion/styled';
import { Flex } from '@components/common/Flex';
import { Footer } from '@components/common/Footer';

const Home = () => {
  const {isOpen, modalRef, toggleModal} = useModal;

  return (
    <Wrapper direction="column" align="center" justify="flex-start">
      <div></div>

      <Footer />
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled(Flex)``;
