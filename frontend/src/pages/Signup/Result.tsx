import { Text } from '@/components/common/Typo';
import { colors } from '@/styles/colors';
import { Flex } from '@components/common/Flex';
import styled from '@emotion/styled';
import { useLocation, useNavigate } from 'react-router-dom';

const SignUpResult = () => {
  const location = useLocation();
  const formData = location.state;

  console.log('전달된 데이터:', formData);

  const fieldLabels: Record<string, string> = {
    name: '이름',
    gender: '성별',
    age: '나이',
    weight: '몸무게',
    neutered: '중성화 여부',
  };

  const formatValue = (key: string, value: any) => {
    switch (key) {
      case 'age':
        return `${value}세`;
      case 'neutered':
        return value ? '중성화 했어요' : '하지 않았어요';
      case 'weight':
        return `${value}kg`;
      default:
        return value;
    }
  };

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('/main');
  };

  return (
    <Flex
      direction="column"
      gap={32}
      padding="40px 40px"
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
      <SignUpBtn borderRadius={10} onClick={handleNavigate}>
        회원가입
      </SignUpBtn>
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
  bottom: 32px;
  position: sticky;

  cursor: pointer;

  flex-shrink: 0;
  font-family: 'Pretendard';
  font-size: 0.9rem;
  font-weight: 800;
  color: ${colors.White};
`;
