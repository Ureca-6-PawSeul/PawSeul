import { Text } from '@/components/common/Typo';
import { colors } from '@/styles/colors';
import { Flex } from '@components/common/Flex';
import styled from '@emotion/styled';
import { useLocation, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Toast } from '@/components/common/Toast';
import { usePostPetInfo } from '@/apis/hooks/signup';
import { PetInfoType } from '@/apis/signup';

const SignUpResult = () => {
  const location = useLocation<{ state: PetInfoType }>();
  const formData = location.state;

  console.log('전달된 데이터:', formData);

  const fieldLabels: Record<string, string> = {
    petname: '이름',
    age: '나이',
    weight: '몸무게',
    gender: '성별',
    isNeutered: '중성화 여부',
    breed: '견종',
  };

  const formatValue = (key: string, value: any) => {
    switch (key) {
      case 'age':
        return `${value}세`;
      case 'isNeutered':
        return value === 'yes' ? '중성화 했어요' : '하지 않았어요';
      case 'weight':
        return `${value}kg`;
      default:
        return value;
    }
  };

  const navigate = useNavigate();
  const { mutate: signUpMutate } = usePostPetInfo(() => {
    navigate('/');
  });

  const handleSignUp = () => {
    const petData = {
      ...formData,
      age: parseInt(formData.age),
      weight: parseFloat(formData.weight),
      gender: formData.gender === '남자' ? '수컷' : '암컷',
    };
    console.log('petData:', petData);
    signUpMutate(petData);
  };

  return (
    <Flex
      direction="column"
      gap={32}
      padding="40px 40px 32px 40px"
      justify="flex-start"
      align="flex-start"
      backgroundColor={colors.Gray50}
    >
      <Text typo="Heading3">정보를 다시 한번 확인해주세요.</Text>
      <Flex direction="column" gap={18} justify="flex-start" align="flex-start">
        {Object.entries(formData).map(([key, value]) => (
          <InfoLine
            key={key}
            justify="space-between"
            borderRadius={10}
            backgroundColor={colors.White}
          >
            <Text typo="Body3">{fieldLabels[key] || key}</Text>
            <Text typo="Body3" colorCode={colors.Gray400}>
              {formatValue(key, value)}
            </Text>
          </InfoLine>
        ))}
      </Flex>
      <SignUpBtn borderRadius={10} onClick={handleSignUp}>
        회원가입 완료하기
      </SignUpBtn>
      <Toast />
    </Flex>
  );
};

export default SignUpResult;

const InfoLine = styled(Flex)`
  height: fit-content;
  padding: 14px 20px;

  border: 1px solid ${colors.Gray200};
`;
const SignUpBtn = styled(Flex)`
  background-color: ${colors.MainColor};
  padding: 14px 20px;
  border: none;
  height: fit-content;
  bottom: 24px;
  position: sticky;

  cursor: pointer;

  flex-shrink: 0;
  font-family: 'Pretendard';
  font-size: 0.9rem;
  font-weight: 800;
  color: ${colors.White};
`;
