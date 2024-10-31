import styled from '@emotion/styled';
import { Flex } from '@components/common/Flex';
import { Text } from '@components/common/Typo';
import { colors } from '@styles/colors';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SignupProps {
  name: string;
  gender: string;
  age: string;
  weight: string;
  neutered: boolean;
}

const PetInfo = () => {
  const [step, setStep] = useState<number>(0); // 현재 단계 추적
  const [formData, setFormData] = useState<SignupProps>({
    name: '',
    gender: '수컷',
    age: '',
    weight: '',
    neutered: true,
  });

  const handleNextClicked = () => {
    if (step < 4) setStep((prev) => prev + 1);
    else handleSubmit();
  };

  const handleSubmit = () => {
    console.log('서버로 전송할 데이터:', formData);
  };

  const handleAnswerChanged = (key: string, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('/signup/result');
  };

  return (
    <Container
      direction="column"
      justify="flex-start"
      gap={48}
      padding="0 32px"
    >
      <Flex direction="column" justify="flex-start" gap={32}>
        {step >= 0 && (
          <InfoBox direction="column" align="flex-start">
            <Text typo="Body2">반려견의 이름은 무엇인가요?</Text>
            <Input
              type="text"
              placeholder="이름"
              value={formData.name}
              onChange={(e) => handleAnswerChanged('name', e.target.value)}
            />
          </InfoBox>
        )}

        {step >= 1 && (
          <InfoBox direction="column" align="flex-start">
            <Text typo="Body2">반려견의 성별을 선택해주세요</Text>
            <Flex gap={12} justify="space-between">
              <InfoBtn
                onClick={() => handleAnswerChanged('gender', '수컷')}
                active={formData.gender === '수컷'}
              >
                수컷
              </InfoBtn>
              <InfoBtn
                onClick={() => handleAnswerChanged('gender', '암컷')}
                active={formData.gender === '암컷'}
              >
                암컷
              </InfoBtn>
            </Flex>
          </InfoBox>
        )}

        {step >= 2 && (
          <InfoBox direction="column" align="flex-start">
            <Flex direction="column" align="flex-start" gap={1}>
              <Text typo="Body2">반려견이 몇살인가요?</Text>
              <Guide>연령별 필요한 식품을 제공해드릴게요</Guide>
            </Flex>
            <AgeSelect
              value={formData.age}
              onChange={(e) => handleAnswerChanged('age', e.target.value)}
            >
              <option value="">나이를 선택하세요</option>
              <option value="0-2">0~2살</option>
              <option value="3-5">3~5살</option>
            </AgeSelect>
          </InfoBox>
        )}

        {step >= 3 && (
          <InfoBox direction="column" align="flex-start">
            <Flex direction="column" align="flex-start" gap={1}>
              <Text typo="Body2">반려견의 몸무게를 알려주세요</Text>
              <Guide>몸무게에 따라 소/중/대형견으로 나뉘어져요</Guide>
            </Flex>
            <Input
              type="text"
              placeholder="몸무게"
              value={formData.weight}
              onChange={(e) => handleAnswerChanged('weight', e.target.value)}
            />
          </InfoBox>
        )}

        {step >= 4 && (
          <InfoBox direction="column" align="flex-start" gap={7}>
            <Text typo="Body2">중성화 수술을 여부를 선택해주세요</Text>
            <Flex gap={12} justify="space-between">
              <InfoBtn
                onClick={() => handleAnswerChanged('neutered', true)}
                active={formData.neutered == true}
              >
                중성화 했어요
              </InfoBtn>
              <InfoBtn
                onClick={() => handleAnswerChanged('neutered', false)}
                active={formData.neutered == false}
              >
                하지 않았어요
              </InfoBtn>
            </Flex>
          </InfoBox>
        )}
      </Flex>

      {/* 다음 버튼 */}
      <BtnWrapper>
        <NextButton
          backgroundColor={colors.MainColor}
          padding="12px 20px"
          borderRadius={10}
          onClick={step < 4 ? handleNextClicked : handleNavigate}
        >
          {step < 4 ? '다음으로' : '회원가입'}
        </NextButton>
      </BtnWrapper>
    </Container>
  );
};

export default PetInfo;

const Container = styled(Flex)`
  overflow-y: auto;
  height: 100%;
`;

const Input = styled.input`
  width: -webkit-fill-available;
  padding: 12px 20px;
  border: 1px solid ${colors.Gray200};
  border-radius: 10px;

  flex-shrink: 0;
  font-family: 'Pretendard';
  font-size: 0.85rem;
  font-weight: 500;
  color: ${colors.Gray600};

  &:focus {
    border-color: ${colors.MainColor};
    outline: none;
    color: ${colors.Black};
  }
`;

const InfoBtn = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 12px 20px;
  background-color: ${({ active }) =>
    active ? colors.MainColor : colors.White};
  border: 1px solid
    ${({ active }) => (active ? colors.MainColor : colors.Gray200)};
  border-radius: 10px;
  cursor: pointer;

  flex-shrink: 0;
  font-family: 'Pretendard';
  font-size: 0.825rem;
  font-weight: 500;
  color: ${({ active }) => (active ? colors.White : colors.Gray600)};

  &:hover {
    background-color: ${colors.MainColor};
    border: 1px solid ${colors.MainColor};
    color: ${colors.White};
  }
`;

const AgeSelect = styled.select`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid ${colors.Gray300};
  border-radius: 10px;

  &:focus {
    border-color: ${colors.MainColor};
    outline: none;
  }
`;

const Guide = styled.p`
  text-align: left;
  margin-bottom: 10px;
  color: ${colors.Gray400};
  font-size: 12px;
`;

const NextButton = styled(Flex)`
  color: ${colors.White};
  padding: 14px 20px;
  border: none;
  height: fit-content;

  margin-top: 50px;

  cursor: pointer;

  flex-shrink: 0;
  font-family: 'Pretendard';
  font-size: 0.9rem;
  font-weight: 800;
  color: ${colors.White};
`;

const InfoBox = styled(Flex)`
  gap: 10px;
  height: fit-content;
`;

const BtnWrapper = styled(Flex)`
  width: -webkit-fill-available;
  height: fit-content;
  position: sticky;
  left: 32px;
  bottom: 32px;
`;
