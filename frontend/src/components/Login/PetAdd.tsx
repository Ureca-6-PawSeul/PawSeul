import { Flex } from '@components/common/Flex';
import { Text } from '@components/common/Typo';
import styled from '@emotion/styled';
import { colors } from '@styles/colors';

const PetAdd = () => {
    return (
        <Container>
            <PetName>
            <Flex direction='column' align='flex-start' webGap={7}>
                <Text webTypo='Label2'>반려견의 이름은 무엇인가요?</Text></Flex>
                <Input type="text" placeholder="이름" />
            </PetName>
            <PetGender>
            <Flex direction='column' align='flex-start' webGap={7}>
                <Text webTypo='Label2'>반려견의 성별을 선택해주세요</Text></Flex>
                <ButtonContainer>
                    <MaleBtn>수컷</MaleBtn>
                    <FemaleBtn>암컷</FemaleBtn>
                </ButtonContainer>
            </PetGender>
            <PetAge>
            <Flex direction='column' align='flex-start' webGap={7}>
                <Text webTypo='Label2'>반려견이 몇살인가요?</Text>
                <Guide>연령별 필요한 식품을 제공해드릴게요</Guide></Flex>
                <AgeSelect>
                    <option value="">나이를 선택하세요</option>
                    <option value="0-2">0~2살</option>
                    <option value="3-5">3~5살</option>
                </AgeSelect>
            </PetAge>
            <PetWeight>
                <Flex direction='column' align='flex-start' webGap={7}>
                <Text webTypo='Label2'>반려견의 몸무게를 알려주세요</Text>
                <Guide>몸무게에 따라 소/중/대형견으로 나뉘어져요</Guide></Flex>
                <Input type="text" placeholder="몸무게" />
            </PetWeight>
            

            <PetSpayNeuterCheck>
                <Flex direction='column' align='flex-start' webGap={7}>
                <Text webTypo='Label2'>중성화 수술을 했나요?</Text></Flex>
                <YesBtn>중성화 수술을 했어요!</YesBtn>
                <NoBtn>아니요. 하지않았어요!</NoBtn>
            </PetSpayNeuterCheck>

            <NextButton>다음으로</NextButton>
        </Container>
    );
};

export default PetAdd;

const Container = styled(Flex)`
    width: 100%;
    max-width: 400px;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    background-color: ${colors.White};
    border: 1px ${colors.Black} solid;
    padding: 35px;
`;

const PetName = styled(Flex)`
    flex-direction: column;
    height: fit-content;
    margin: 20px 0;
`;

const Input = styled.input`
    width: 95%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    margin-top: 10px;

    &:focus {
        border-color: #ffeb3b;
        outline: none;
    }
`;

const PetGender = styled(Flex)`
    flex-direction: column;
    height: fit-content;
    margin: 20px 0;
`;

const ButtonContainer = styled(Flex)`
    width: 100%;
    height: 45px;
    padding: 10px;
    border-radius: 5px;
    font-size: 16px;
    margin-top: 10px;
    justify-content: space-between;
`;

const MaleBtn = styled.button`
    width: 47%;
    padding: 10px;
    background-color: #ffffff;
    border: 1px solid #ccc;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #68b2b7;
        color: #ffffff;
    }
`;

const FemaleBtn = styled.button`
    width: 47%;
    margin-right: 5px;
    padding: 10px 20px;
    background-color: #ffffff;
    border: 1px solid #ccc;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #68b2b7;
        color: #ffffff;
    }
`;

const PetAge = styled(Flex)`
    width: 100%;
    flex-direction: column;
    height: fit-content;
margin: 20px 0;
`;

const AgeSelect = styled.select`
    width: 90%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    margin-top: 10px;

    &:focus {
        border-color: #ffeb3b;
        outline: none;
    }
`;

const PetWeight = styled(Flex)`
    width: 100%;
    flex-direction: column;
    height: fit-content;
margin: 20px 0;
`;

const PetSpayNeuterCheck = styled(Flex)`
    width: 100%;
    flex-direction: column;
    height: fit-content;
margin: 20px 0;
`;

const YesBtn = styled.button`
    width: 90%;
    margin-right: 5px;
    padding: 10px 20px;
    background-color: #ffffff;
    border: 1px solid #ccc;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
    text-align: left;
`;

const NoBtn = styled.button`
    width: 90%;
    margin-right: 5px;
    padding: 10px 20px;
    background-color: #ffffff;
    border: 1px solid #ccc;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 3px;
    text-align: left;
`;

const Guide = styled.p`
    width: 100%;
    text-align: left;
    margin-bottom: 10px;
    color: #a6a6a6;
    padding-left: 10%;
    font-size: 12px;
`;

const NextButton = styled.button`
    background-color: #68b2b7;
    color: #ffffff;
    padding: 12px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    width: 100%;
    max-width: 300px;
    font-weight: bold;
    margin: 15px;

    &:hover {
        background-color: #cccccc;
    }
`;