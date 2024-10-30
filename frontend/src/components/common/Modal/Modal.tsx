import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { colors } from '@styles/colors';
import { Flex } from '../Flex';
import { CloseIcon } from '@assets/images/svgs/CloseIcon';

interface ModalProps {
  isOpen: boolean;
  toggleModal: () => void;
  children: React.ReactNode;
}

const Modal = forwardRef<HTMLDivElement, ModalProps>((props, ref) => {
  const handleClickInnerModal = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  if (!props.isOpen) return null;

  return (
    <Backdrop
      onClick={props.toggleModal}
      className={props.isOpen ? 'open' : ''}
    >
      <ModalBox ref={ref} onClick={handleClickInnerModal}>
        <CloseIcon
          isOpen={props.isOpen}
          toggleModal={props.toggleModal}
          margin="0 0 auto auto"
          width={18}
          height={18}
        />
        <ModalContent>{props.children}</ModalContent>
      </ModalBox>
    </Backdrop>
  );
});

export default Modal;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const ModalBox = styled.div`
  width: 346px;
  height: 404px;
  padding: 1.25rem;
  position: relative;
  background-color: ${colors.White};
  box-sizing: border-box;
  border-radius: 20px;
  box-shadow: 0px 12px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
`;
