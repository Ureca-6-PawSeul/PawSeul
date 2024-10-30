import { Flex } from '@components/common/Flex';
import { colors } from '@styles/colors';
import styled from '@emotion/styled';
import { Text } from '@components/common/Typo';
import DogProfile from '@assets/images/svgs/DogProfile';
import KeyboardArrowRight from '@assets/images/svgs/KeyboardArrowRight';
import { CardProfileType } from '@assets/types/ProfileType';

const Profile = (
  { petname, breedname, age, weight, gender, is_neutered }: CardProfileType,
  handleClick: () => void,
) => {
  return (
    <ProfileWrapper direction="column" padding="10px 10px" borderRadius={10}>
      <UpdateBtn
        justify="flex-end"
        direction="row"
        onClick={handleClick}
      >
        <Text align="flex-end" typo="Label3" colorCode={colors.Gray400}>
          정보 수정하기
        </Text>
        <KeyboardArrowRight width={13} />
      </UpdateBtn>
      <Flex direction="row">
        <DogProfile width={200} />
        <Flex direction="column" align="flex-start" gap={5}>
          <Text typo="Body2" colorCode={colors.Black}>
            {petname}
          </Text>
          <Text typo="Label3" colorCode={colors.Black}>
            {breedname}
          </Text>
          <Flex justify="flex-start" align="flex-start" gap={5}>
            <Text typo="Label3">{age}살</Text>
            <Text typo="Label3">{weight}KG</Text>
          </Flex>
          <Text typo="Label3" colorCode={colors.Black}>
            {gender}
          </Text>
          <Text typo="Label3" colorCode={colors.Black}>
            중성화 {is_neutered}
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

const UpdateBtn = styled(Flex)`
  &:hover {
    cursor: pointer;
  }
`;
