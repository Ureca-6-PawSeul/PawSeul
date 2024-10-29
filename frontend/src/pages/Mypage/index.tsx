// import styled from '@emotion/styled';
import { Flex } from '@components/common/Flex';
import { Text } from '@components/common/Typo';
import { colors } from '@styles/colors';
import ProfileData from '@/mocks/data/profile.json';
import Profile from '@components/mypage/profile';
import styled from '@emotion/styled';

const Mypage = () => {
  return (
    <Flex direction="column" align="center">
      <Flex direction="row" justify="flex-start" height={40}>
        <Text colorCode={colors.Black} typo="Label1" align="flex-start">
          {ProfileData.username}
        </Text>
        <Text colorCode={colors.Black} typo="Body3" align="flex-start">
          님
        </Text>
      </Flex>
      <Flex direction="row" justify="flex-start" height={40}>
        <Text colorCode={colors.Black} typo="Heading3" align="flex-start">
          반려견 정보
        </Text>
        {/* 반려견 정보 컴포넌트 */}
      </Flex>
        <Profile
          petname={ProfileData.petname}
          age={ProfileData.age}
          breedname={ProfileData.breedname}
          weight={ProfileData.weight}
          gender={ProfileData.gender}
          is_neutered={ProfileData.is_neutered}
        />
      <BottomBtn direction="column" align="flex-start" padding="19px 11px">
        <Text colorCode={colors.Black} typo="Body3" align="flex-start">
          찜한 목록
        </Text>
      </BottomBtn>
      <BottomBtn direction="column" align="flex-start" padding="19px 11px">
        <Text colorCode={colors.Black} typo="Body3" align="flex-start">
          주문 내역
        </Text>
      </BottomBtn>
      <BottomBtn direction="column" align="flex-start" padding="19px 11px">
        <Text colorCode={colors.Black} typo="Body3" align="flex-start">
          구매 후기
        </Text>
      </BottomBtn>
    </Flex>
  );
};

export default Mypage;

const BottomBtn = styled(Flex)`
  border-bottom: solid 1px ${colors.Gray100};
  &:hover {
    cursor: pointer;
  }
`;