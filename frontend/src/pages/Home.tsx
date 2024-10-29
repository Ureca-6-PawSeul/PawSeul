import styled from '@emotion/styled';
import { Flex } from '@components/common/Flex';
import { Footer } from '@components/common/Footer';
import { Modal } from '@components/common/Modal';
import useModal from '@components/common/Modal/useModal';

const Home = () => {
  return (
    <>
      <Wrapper direction="column" align="center">
        <div>
          <button onClick={toggleModal}>Open Modal</button>
        </div>
        <Footer />
      </Wrapper>
    </>
  );
};

export default Home;

const Wrapper = styled(Flex)``;
