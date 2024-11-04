import { Flex } from '@components/common/Flex';
import { Text } from '@components/common/Typo';
import { colors } from '@styles/colors';
import Profile from '@components/mypage/profile';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/stores/userStore';
import { Header } from '@/components/common/Header';
const Mypage = () => {
  const navigate = useNavigate();
  const handleClickOrderHistory = () => navigate('order');
  const handleClickReviewHistory = () => navigate('review');

  // 전역상태 user. user와 그 펫 정보를 담고있음.
  const user = useUserStore((state) => state.user);

  return (
    <>
      <Header title="마이페이지" />
      <Flex
        direction="column"
        align="center"
        padding="0px 12px"
        justify="flex-start"
        margin="60px 0 0 0"
      >
        {' '}
        <Flex direction="row" justify="flex-start" height={40}>
          <Text colorCode={colors.Black} typo="Label1" align="flex-start">
            김찬별
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
        {user && (
          <Profile
            petId={user.pet.petId}
            petname={user.pet.petname}
            age={user.pet.age}
            breed={user.pet.breed}
            weight={user.pet.weight}
            gender={user.pet.gender}
            isNeutered={user.pet.isNeutered}
          />
        )}
        <BottomBtn direction="column" align="flex-start" padding="19px 11px">
          <Text colorCode={colors.Black} typo="Body3" align="flex-start">
            찜한 목록
          </Text>
        </BottomBtn>
        <BottomBtn
          direction="column"
          align="flex-start"
          padding="19px 11px"
          onClick={handleClickOrderHistory}
        >
          <Text colorCode={colors.Black} typo="Body3" align="flex-start">
            주문 내역
          </Text>
        </BottomBtn>
        <BottomBtn
          direction="column"
          align="flex-start"
          padding="19px 11px"
          onClick={handleClickReviewHistory}
        >
          <Text colorCode={colors.Black} typo="Body3" align="flex-start">
            구매 후기
          </Text>
        </BottomBtn>
      </Flex>
    </>
  );
};
export default Mypage;
const BottomBtn = styled(Flex)`
  border-bottom: solid 1px ${colors.Gray100};
  height: fit-content;
  &:hover {
    cursor: pointer;
  }
`;
