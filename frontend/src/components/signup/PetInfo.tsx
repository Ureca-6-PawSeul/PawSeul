import styled from '@emotion/styled';
import { Flex } from '@components/common/Flex';
import { Text } from '@components/common/Typo';
import { colors } from '@styles/colors';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../common/Header';

interface SignupProps {
  petname: string;
  age: number;
  weight: number;
  gender: string;
  isNeutered: string;
  breed: string;
}

const PetInfo = () => {
  const [step, setStep] = useState<number>(0);
  const [formData, setFormData] = useState<SignupProps>({
    petname: '',
    age: 0,
    weight: 0,
    gender: '성별',
    isNeutered: '중성화 여부',
    breed: '',
  });

  const bottomRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleNextClicked = () => {
    if (step < 5) setStep((prev) => prev + 1);
    else handleNavigate();
  };

  const handleAnswerChanged = (key: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleNavigate = () => {
    navigate('/signup/result', { state: formData });
  };

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [step]);

  const isFormComplete = Object.values(formData).every(
    (value) => value !== '' && value !== '성별' && value !== '중성화 여부',
  );

  return (
    <>
      <Header title="반려견 정보 입력" />
      <Container
        direction="column"
        justify="flex-start"
        gap={48}
        padding="0 32px 32px"
      >
        <Flex direction="column" justify="flex-start" gap={32}>
          {step >= 0 && (
            <InfoBox direction="column" align="flex-start">
              <Text typo="Body2">반려견의 이름은 무엇인가요?</Text>
              <Flex>
                <Input
                  type="text"
                  placeholder="이름"
                  value={formData.petname}
                  onChange={(e) =>
                    handleAnswerChanged('petname', e.target.value)
                  }
                />
              </Flex>
            </InfoBox>
          )}

          {step >= 1 && (
            <InfoBox direction="column" align="flex-start">
              <Text typo="Body2">반려견의 성별을 선택해주세요</Text>
              <Flex gap={12} justify="space-between">
                <InfoBtn
                  onClick={() => handleAnswerChanged('gender', '남자')}
                  active={formData.gender === '남자'}
                >
                  남자
                </InfoBtn>
                <InfoBtn
                  onClick={() => handleAnswerChanged('gender', '여자')}
                  active={formData.gender === '여자'}
                >
                  여자
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
              <Flex gap={4}>
                <Input
                  type="text"
                  placeholder="나이"
                  value={formData.age}
                  onChange={(e) => handleAnswerChanged('age', e.target.value)}
                />
                <Text typo="Body3" colorCode={colors.Gray400}>
                  세
                </Text>
              </Flex>
            </InfoBox>
          )}

          {step >= 3 && (
            <InfoBox direction="column" align="flex-start">
              <Flex direction="column" align="flex-start" gap={1}>
                <Text typo="Body2">반려견의 몸무게를 알려주세요</Text>
                <Guide>몸무게에 따라 체형을 분석해요</Guide>
              </Flex>
              <Flex gap={4}>
                <Input
                  type="text"
                  placeholder="몸무게"
                  value={formData.weight}
                  onChange={(e) =>
                    handleAnswerChanged('weight', e.target.value)
                  }
                />
                <Text typo="Body3" colorCode={colors.Gray400}>
                  kg
                </Text>
              </Flex>
            </InfoBox>
          )}

          {step >= 4 && (
            <InfoBox direction="column" align="flex-start">
              <Text typo="Body2">반려견의 견종을 적어주세요</Text>
              <Flex>
                <Input
                  type="text"
                  placeholder="견종"
                  value={formData.breed}
                  onChange={(e) => handleAnswerChanged('breed', e.target.value)}
                />
              </Flex>
            </InfoBox>
          )}

          {step >= 5 && (
            <InfoBox direction="column" align="flex-start" gap={7}>
              <Text typo="Body2">중성화 수술 여부를 선택해주세요</Text>
              <Flex gap={12} justify="space-between">
                <InfoBtn
                  onClick={() => handleAnswerChanged('isNeutered', 'yes')}
                  active={formData.isNeutered === 'yes'}
                >
                  중성화 했어요
                </InfoBtn>
                <InfoBtn
                  onClick={() => handleAnswerChanged('isNeutered', 'no')}
                  active={formData.isNeutered === 'no'}
                >
                  하지 않았어요
                </InfoBtn>
              </Flex>
            </InfoBox>
          )}
        </Flex>

        <BtnWrapper ref={bottomRef}>
          <NextButton
            backgroundColor={colors.MainColor}
            padding="12px 20px"
            borderRadius={10}
            onClick={handleNextClicked}
            disabled={step >= 5 && !isFormComplete}
          >
            {step < 5 ? '다음으로' : '회원가입'}
          </NextButton>
        </BtnWrapper>
      </Container>
    </>
  );
};

export default PetInfo;

const Container = styled(Flex)`
  overflow-y: auto;
  height: 100%;
  padding-top: 72px;
`;

const Input = styled.input`
  flex: 1;
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

const Guide = styled.p`
  text-align: left;
  margin-bottom: 10px;
  color: ${colors.Gray400};
  font-size: 12px;
`;

const NextButton = styled(Flex)<{ disabled?: boolean }>`
  color: ${colors.White};
  padding: 14px 20px;
  border: none;
  height: fit-content;
  margin-top: 50px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  flex-shrink: 0;

  font-family: 'Pretendard';
  font-size: 0.9rem;
  font-weight: 800;
  background-color: ${colors.MainColor};
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
  bottom: 24px;
`;
