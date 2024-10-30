import { Flex } from '@components/common/Flex';
import styled from '@emotion/styled';
import LoginImg from '@assets/images/pngs/kakao_button.png';
import { colors } from '@styles/colors';

const Login = () => {
  const handleKakaoRedirect = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${
      import.meta.env.VITE_CLIENT_ID
    }&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}`;
  };

  return (
    <Container direction="column" justify="flex-start">
      <LoginButton onClick={handleKakaoRedirect}>
        <KaKaoLogin src={LoginImg} />
      </LoginButton>
    </Container>
  );
};

export default Login;

const Container = styled(Flex)``;
const LoginButton = styled(Flex)`
  height: fit-content;
  padding: 0 80px;
`;
const KaKaoLogin = styled.img`
  display: flex;
  width: 100%;
`;
