import { Flex } from '@components/common/Flex';
import { Text } from '@components/common/Typo';
import {
  Container,
  Input,
  ButtonContainer,
  MaleBtn,
  FemaleBtn,
  AgeSelect,
  YesBtn,
  NoBtn,
  Guide,
  NextButton,
} from '../../styles/PetAddStyles';

const PetAdd = () => {
  return (
    <Container direction="column" align="flex-start" webGap={40} padding="35px">
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
      <Flex
        direction="column"
        align="flex-start"
        webGap={7}
        height="fit-content"
      >
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

export default PetAdd;
