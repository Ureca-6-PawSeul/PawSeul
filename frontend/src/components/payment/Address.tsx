import styled from '@emotion/styled';
import { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';

const Address = ({setLocation, closeModal}) => {
  const selectAddress = (data) => {
    setLocation(`${data.zonecode} ${data.address}`);
    closeModal()
  };

  return (
    <Wrapper>
      <DaumPostcode
        onComplete={selectAddress} // 값을 선택할 경우 실행되는 이벤트
        autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
        style={{ height: '360px' }}
      />
      </Wrapper>
  );
};

export default Address;

const Wrapper = styled.div`
  width: 100%;
  height: '360px';
  overflow: hidden;
`;