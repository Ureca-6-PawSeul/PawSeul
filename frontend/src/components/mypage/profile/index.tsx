import { Flex, HeightFitFlex } from '@components/common/Flex';
import { colors } from '@styles/colors';
import styled from '@emotion/styled';
import { Text } from '@components/common/Typo';
import DogProfile from '@/assets/images/svgs/DogProfile';
import { PetType } from '@assets/types/ProfileType';
import { KeyboardArrowRight } from '@/assets/images/svgs';

type ProfileProps = PetType & {
  onClick: () => void;
};

const Profile = ({
  petId,
  petname,
  breed,
  age,
  weight,
  gender,
  isNeutered,
  onClick,
}: ProfileProps) => {
  return (
    <ProfileWrapper
      direction="column"
      justify="flex-start"
      padding="16px 12px 8px 12px"
      borderRadius={10}
    >
      <ClickBtn
        justify="flex-end"
        direction="row"
        onClick={onClick}
        padding="4px 4px"
      >
        <Text align="flex-end" typo="Label2" colorCode={colors.Gray600}>
          정보 수정하기
        </Text>
        <KeyboardArrowRight width={13} />
      </ClickBtn>
      <Flex
        direction="row"
        padding="0 0 24px 0"
        align="flex-start"
        justify="flex-start"
      >
        <DogProfile width={160} />
        <Flex
          direction="column"
          justify="center"
          align="flex-start"
          margin="0 0 0 16px"
          width="fit-content"
        >
          <Text typo="Heading3" colorCode={colors.Black}>
            {petname}
          </Text>
          <HeightFitFlex direction="column" align="flex-start" gap={2}>
            <Text typo="Body2" colorCode={colors.Black}>
              {breed}
            </Text>
            <HeightFitFlex direction="column" align="flex-start" gap={10}>
              <Flex justify="flex-start" align="flex-start" height={12} gap={8}>
                <Text typo="Body2" colorCode={colors.Gray700}>
                  {age}살
                </Text>
                <Text typo="Body2" colorCode={colors.Gray700}>
                  {weight}kg
                </Text>
              </Flex>
              <Flex justify="flex-start" align="flex-start" height={12} gap={8}>
                <Text typo="Body2" colorCode={colors.Gray700}>
                  {gender === '수컷' ? '남자' : '여자'}
                </Text>
                <Text typo="Body2" colorCode={colors.Gray700}>
                  중성화 {isNeutered === 'yes' ? '완료' : '미완료'}
                </Text>
              </Flex>
            </HeightFitFlex>
          </HeightFitFlex>
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
