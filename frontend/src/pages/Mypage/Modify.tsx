// import { LeftArrow } from '@/assets/images/svgs';
import { Flex } from '@/components/common/Flex';
import { Header } from '@/components/common/Header';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Text } from '@/components/common/Typo';
import { useRef, useState } from 'react';
import { colors } from '@/styles/colors';
import { useUserStore } from '@/stores/userStore';
import { usePatchMypageInfo } from '@/apis/hooks/mypage';
import { IoIosArrowBack } from 'react-icons/io';

interface SignupProps {
  petname: string;
  age: number;
  weight: number;
  gender: string;
  isNeutered: string;
  breed: string;
}

const PetInfoModify = () => {
  const navigate = useNavigate();
  const pet = useUserStore((state) => state.user.pet);
  const handleNavigateToMypage = () => navigate('/mypage');
  const { mutateAsync : modifyMutate } = usePatchMypageInfo(() => {
    navigate('/mypage');
  });

  const handleBtnClicked = () => {
    const petData = {
      ...formData,
      age: parseInt(`${formData.age}`),
      weight: parseFloat(`${formData.weight}`),
      gender: formData.gender,
    };


    if(modifyMutate(petData)) window.location.href = "/mypage";
  };
  const [formData, setFormData] = useState<SignupProps>({
    petname: `${pet.petname}`,
    age: parseInt(`${pet.age}`),
    weight: parseFloat(`${pet.weight}`),
    gender: `${pet.gender}`,
    isNeutered: `${pet.isNeutered}`,
    breed: `${pet.breed}`,
  });
  const handleAnswerChanged = (key: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };
  const bottomRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Header
        title="정보 수정"
        LeftIcon={<IoIosArrowBack size={26} color={colors.Black}/>}
        onLeftIconClick={handleNavigateToMypage}
      />
      <Container
        direction="column"
        justify="flex-start"
        gap={48}
        padding="0 32px 32px"
      >
        <Flex direction="column" justify="flex-start" gap={32}>
          <InfoBox direction="column" align="flex-start">
            <Text typo="Body2">반려견의 이름은 무엇인가요?</Text>
            <Flex>
              <Input
                type="text"
                placeholder="이름"
                value={formData.petname}
                onChange={(e) => handleAnswerChanged('petname', e.target.value)}
              />
            </Flex>
          </InfoBox>
          <InfoBox direction="column" align="flex-start">
            <Text typo="Body2">반려견의 성별을 선택해주세요</Text>
            <Flex gap={12} justify="space-between">
              <InfoBtn
                onClick={() => handleAnswerChanged('gender', '수컷')}
                active={formData.gender === '수컷'}
              >
                남자
              </InfoBtn>
              <InfoBtn
                onClick={() => handleAnswerChanged('gender', '암컷')}
                active={formData.gender === '암컷'}
              >
                여자
              </InfoBtn>
            </Flex>
          </InfoBox>
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
                onChange={(e) => handleAnswerChanged('weight', e.target.value)}
              />
              <Text typo="Body3" colorCode={colors.Gray400}>
                kg
              </Text>
            </Flex>
          </InfoBox>
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
        </Flex>

        <BtnWrapper ref={bottomRef}>
          <NextButton
            backgroundColor={colors.MainColor}
            padding="12px 20px"
            borderRadius={10}
            onClick={handleBtnClicked}
          >
            수정하기
          </NextButton>
        </BtnWrapper>
      </Container>
    </>
  );
};

const Container = styled(Flex)`
  overflow-y: auto;
  padding-top: 72px;
  margin-bottom: 60px;
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
  z-index: 1;
`;

export default PetInfoModify;
