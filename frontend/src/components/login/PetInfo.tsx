import styled from '@emotion/styled';
import { Flex } from '@components/common/Flex';
import { Text } from '@components/common/Typo';
import { colors } from '@styles/colors';

const PetInfo = () => {
  return (
    <Container direction="column" align="flex-start" gap={40} padding="35px">
      {/* 펫 이름 */}
      <Flex direction="column" align="flex-start" height="fit-content">
        <Text typo="Label2">반려견의 이름은 무엇인가요?</Text>
        <Input type="text" placeholder="이름" />
      </Flex>

      {/* 펫 성별 */}
      <Flex direction="column" align="flex-start" height="fit-content">
        <Text typo="Label2">반려견의 성별을 선택해주세요</Text>
        <ButtonContainer>
          <MaleBtn>수컷</MaleBtn>
          <FemaleBtn>암컷</FemaleBtn>
        </ButtonContainer>
      </Flex>

      {/* 펫 연령 */}
      <Flex direction="column" align="flex-start" height="fit-content">
        <Text typo="Label2">반려견이 몇살인가요?</Text>
        <Guide>연령별 필요한 식품을 제공해드릴게요</Guide>
        <AgeSelect>
          <option value="">나이를 선택하세요</option>
          <option value="0-2">0~2살</option>
          <option value="3-5">3~5살</option>
        </AgeSelect>
      </Flex>

      {/* 펫 몸무게 */}
      <Flex direction="column" align="flex-start" height="fit-content">
        <Text typo="Label2">반려견의 몸무게를 알려주세요</Text>
        <Guide>몸무게에 따라 소/중/대형견으로 나뉘어져요</Guide>
        <Input type="text" placeholder="몸무게" />
      </Flex>

      {/* 펫 중성화 여부 */}
      <Flex direction="column" align="flex-start" gap={7} height="fit-content">
        <Text typo="Label2">중성화 수술을 했나요?</Text>
        <YesBtn>중성화 수술을 했어요!</YesBtn>
        <NoBtn>아니요. 하지않았어요!</NoBtn>
      </Flex>

      {/* 다음 버튼 */}
      <Flex direction="column" align="flex-start" height="fit-content">
        <NextButton>다음으로</NextButton>
      </Flex>
    </Container>
  );
};

export default PetInfo;

const Container = styled(Flex)`
  background-color: ${colors.White};
  border: 1px ${colors.Black} solid;
`;

const Input = styled.input`
  width: -webkit-fill-available;
  padding: 10px 20px;
  border: 2px solid ${colors.Gray100};
  border-radius: 5px;

  &:focus {
    border-color: ${colors.MainColor};
    outline: none;
  }
`;

const ButtonContainer = styled(Flex)`
  border-radius: 5px;
  justify-content: space-between;
`;

const MaleBtn = styled.button`
  width: 48%;
  padding: 10px;
  background-color: ${colors.White};
  border: 2px solid ${colors.Gray100};
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.MainColor};
    border: 2px solid ${colors.MainColor};
    color: ${colors.White};
    font-weight: bold;
  }
`;

const FemaleBtn = styled(MaleBtn)``;

const AgeSelect = styled.select`
  width: 100%;
  padding: 10px 15px;
  border: 2px solid ${colors.Gray100};
  border-radius: 5px;

  &:focus {
    border-color: ${colors.MainColor};
    outline: none;
  }
`;

const YesBtn = styled.button`
  width: 100%;
  padding: 10px 20px;
  background-color: ${colors.White};
  border: 2px solid ${colors.Gray100};
  border-radius: 5px;
  cursor: pointer;
  text-align: left;

  &:hover {
    background-color: ${colors.MainColor};
    border: 2px solid ${colors.MainColor};
    color: ${colors.White};
    font-weight: bold;
  }
`;

const NoBtn = styled(YesBtn)``;

const Guide = styled.p`
  text-align: left;
  margin-bottom: 10px;
  color: ${colors.Gray400};
  font-size: 12px;
`;

const NextButton = styled.button`
  background-color: ${colors.MainColor};
  color: ${colors.White};
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  width: 100%;
  font-weight: bold;

  &:hover {
    background-color: ${colors.Mint200};
  }
`;
