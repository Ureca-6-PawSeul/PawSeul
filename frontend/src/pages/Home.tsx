import styled from '@emotion/styled';
import { Flex } from '@components/common/Flex';
import { Footer } from '@components/common/Footer';
import { Modal } from '@components/common/Modal';
import useModal from '@components/common/Modal/useModal';

const Home = () => {
  const { isOpen, toggleModal, modalRef } = useModal();

  return (
    <Wrapper direction="column" align="center">
      <div>
        {/* 모달을 열기 위한 버튼 */}
        <button onClick={toggleModal}>Open Modal</button>

        {/* 모달 컴포넌트 */}
        <Modal isOpen={isOpen} toggleModal={toggleModal} ref={modalRef}>
          <div>안녕</div>
        </Modal>
      </div>

      <Footer />
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled(Flex)``;
