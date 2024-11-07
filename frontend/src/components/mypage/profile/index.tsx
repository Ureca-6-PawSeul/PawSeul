import { Flex } from '@components/common/Flex';
import { colors } from '@styles/colors';
import styled from '@emotion/styled';
import { Text } from '@components/common/Typo';
import DogProfile from '@/assets/images/svgs/DogProfile';
import { PetType } from '@assets/types/ProfileType';
import { KeyboardArrowRight } from '@/assets/images/svgs';

type ProfileProps = PetType & {
  onClick: () => void;
};

const Profile = (
  { petId, petname, breed, age, weight, gender, isNeutered, onClick }: ProfileProps) => {
  
  return (
    <ProfileWrapper direction="column" justify='flex-start' padding="10px 10px" borderRadius={10}>
      <ClickBtn justify="flex-end" direction="row" onClick={onClick}>
        <Text align="flex-end" typo="Label3" colorCode={colors.Gray600}>
          정보 수정하기
        </Text>
        <KeyboardArrowRight width={13} />
      </ClickBtn>
      <Flex direction="row" padding="0 0 13px 0">
        <DogProfile width={200} />
        <Flex direction="column" justify="center" align="flex-start" gap={5}>
          <Text typo="Body2" colorCode={colors.Black}>
            {petname}
          </Text>
          <Text typo="Label3" colorCode={colors.Black}>
            {breed}
          </Text>
          <Flex justify="flex-start" align="flex-start" height={12} gap={5}>
            <Text typo="Label3">{age}살</Text>
            <Text typo="Label3">{weight}KG</Text>
          </Flex>
          <Text typo="Label3" colorCode={colors.Black}>
            {gender === '수컷' ? '남자' : '여자'}
          </Text>
          <Text typo="Label3" colorCode={colors.Black}>
            중성화 {isNeutered === 'yes' ? '완료' : '미완료'}
          </Text>
        </Flex>
      </Flex>
    </ProfileWrapper>
  );
};

export default Profile;

const ProfileWrapper = styled(Flex)`
  border: solid 1px ${colors.Gray200};
  height: fit-content;
`;

export const ClickBtn = styled(Flex)`
  &:hover {
    cursor: pointer;
  }
  &:active {
    opacity: 0.5;
  }
`;
