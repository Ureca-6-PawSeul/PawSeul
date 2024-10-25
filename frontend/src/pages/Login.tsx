import { Flex } from '@components/common/Flex';
import styled from '@emotion/styled';
import { colors } from '@styles/colors';

const Login = () => {
  return (
    <Container direction="column">
      <Logo src="https://via.placeholder.com/150" alt="로고" />
      <LoginButton>카카오톡으로 시작하기</LoginButton>
      <Nosign>나중에 가입할래요</Nosign>
    </Container>
  );
};

export default Login;

const Container = styled(Flex)`
  background-color: ${colors.White};
  border: 1px ${colors.Black} solid;
`;

const Logo = styled.img`
  width: 150px;
  height: 150px;
  margin: 55%;
`;

const LoginButton = styled.button`
  background-color: #ffeb3b;
  color: ${colors.Gray200};
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  width: 100%;
  max-width: 300px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #cccccc;
  }
`;

const Nosign = styled.h2`
  margin-top: 20px;
  color: #8c8c8c;
  text-decoration: none;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    color: #515151;
  }
`;
