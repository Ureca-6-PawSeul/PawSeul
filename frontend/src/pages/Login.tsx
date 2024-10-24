import { Flex } from '@components/common/Flex';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';


const Login = () => {

    const navigate = useNavigate(); // useNavigate 훅 사용
  
    const handleLoginClick = () => {
      navigate('/signup'); // 회원가입 페이지로 이동
    };

  return (
        <Container>
            <Logo src="https://via.placeholder.com/150" alt="로고" />
            <LoginButton onClick={handleLoginClick}>카카오톡으로 시작하기</LoginButton>
            <Nosign>나중에 가입할래요</Nosign>
        </Container>
  );
};

export default Login;


const Container = styled(Flex)`
    width: 100%;
    max-width: 400px;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: #ffffff;
    border: 1px #000000 solid;
    padding: 20px;
`

const Logo = styled.img`
    width: 150px;
    height: 150px;
    margin: 55%;
`;

const LoginButton = styled.button`
    background-color: #ffeb3b;
    color: #3c1e1e;
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
