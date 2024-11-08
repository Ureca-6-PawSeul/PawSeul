import styled from '@emotion/styled';
import DaumPostcode from 'react-daum-postcode';

const Address = ({ setLocation, closeModal }) => {
  const selectAddress = (data) => {
    setLocation(`${data.zonecode} ${data.address}`);
    closeModal();
  };

  return (
    <Wrapper>
      <DaumPostcode
        onComplete={selectAddress} // 값을 선택할 경우 실행되는 이벤트
        autoClose={false}
        style={{ height: '360px' }}
      />
    </Wrapper>
  );
};

export default Address;

const Wrapper = styled.div`
  width: 100%;
  height: 368px;
  overflow: hidden;
  margin: 4px;
`;
