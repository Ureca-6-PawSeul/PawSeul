import { Flex } from '@components/common/Flex';
import styled from '@emotion/styled';
import LoginImg from '@assets/images/pngs/kakao_button.png';
import MainLogo from '@assets/images/pngs/signup_logo.png';

const Main = () => {
  const handleKakaoRedirect = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${
      import.meta.env.VITE_CLIENT_ID
    }&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}`;
  };

  return (
    <Flex direction="column">
      <Container>
        <LogoImg src={MainLogo} />
      </Container>
      <LoginButton onClick={handleKakaoRedirect}>
        <KaKaoLogin src={LoginImg} />
      </LoginButton>
    </Flex>
  );
};

export default Main;

const Container = styled(Flex)`
  flex: 4;
`;

const LogoImg = styled.img`
  display: flex;
  width: 220px;
  margin: 0 0 30px 32px;
`;

const LoginButton = styled(Flex)`
  height: fit-content;
  position: relative;
  flex: 1;
  cursor: pointer;
`;

const KaKaoLogin = styled.img`
  display: flex;
  width: 320px;
  position: absolute;
  bottom: 65px;
`;
