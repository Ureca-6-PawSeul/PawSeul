import { Flex, HeightFitFlex } from '@components/common/Flex';
import { Text } from '@components/common/Typo';
import { colors } from '@styles/colors';
import Profile from '@components/mypage/profile';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/stores/userStore';
import { Header } from '@/components/common/Header';
import { CheckIcon } from '@/assets/images/svgs';
import { IoIosArrowBack } from 'react-icons/io';

import { toast } from 'react-toastify';
import { Toast } from '@/components/common/Toast';
import { useGetUserInfo } from '@/apis/hooks/user';
import { useEffect } from 'react';

const Mypage = () => {
  const { data } = useGetUserInfo();
  const setUserInfo = useUserStore((state) => state.setUserInfo);
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();
  const handleClickOrderHistory = () => navigate('order');
  const handleClickReviewHistory = () => navigate('review');
  const handleNavigateToHome = () => navigate('/');
  const handleNavigateToModify = () => navigate('/mypage/pet');
  const handleClickLogout = () => {
    const notify = () => {
      toast(
        <Flex justify="space-between">
          <span>로그아웃이 완료되었습니다.</span>
          <CheckIcon width={24} height={24} />
        </Flex>,
        { position: 'bottom-center' },
      );
    };

    notify();
    setTimeout(() => {
      sessionStorage.removeItem('user-storage');
      navigate('/main');
    }, 1800);
  };

  useEffect(() => {
    if (data) {
      setUserInfo(data);
    }
  }, [data]);

  return (
    <>
      <Header
        title="마이페이지"
        LeftIcon={<IoIosArrowBack size={26} color={colors.Black} />}
        onLeftIconClick={handleNavigateToHome}
      />
      <Flex
        direction="column"
        align="center"
        padding="12px 24px"
        justify="flex-start"
        margin="72px 0 112px 0"
      >
        <HeightFitFlex
          direction="column"
          justify="flex-start"
          align="flex-end"
          margin="0 0 24px 0"
        >
          <HeightFitFlex justify="flex-start" align="flex-end" gap={6}>
            <HeightFitFlex
              width="fit-content"
              justify="flex-start"
              align="flex-end"
            >
              <Text colorCode={colors.Black} typo="Heading4" align="flex-start">
                {user ? user.username : '-'}
              </Text>
              <Text colorCode={colors.Black} typo="Body2" align="flex-start">
                님
              </Text>
            </HeightFitFlex>
            <Text
              colorCode={colors.MainColor}
              typo="Heading3"
              align="flex-start"
              style={{ fontWeight: 700 }}
            >
              포슬과 함께
            </Text>
          </HeightFitFlex>
          <HeightFitFlex gap={4} justify="flex-start">
            <Text
              typo="Heading3"
              align="flex-start"
              style={{ fontWeight: 700 }}
            >
              슬기로운
            </Text>
            <Text typo="Heading3" align="flex-start">
              반려생활 시작해요!
            </Text>
          </HeightFitFlex>
        </HeightFitFlex>
        {user.pet && (
          <>
            <Flex
              direction="row"
              justify="flex-start"
              height={40}
              margin="0 0 8px 0"
            >
              <Text colorCode={colors.Black} typo="Heading3" align="flex-start">
                반려견 정보
              </Text>
              {/* 반려견 정보 컴포넌트 */}
            </Flex>
            <Profile
              petId={user.pet.petId}
              petname={user.pet.petname}
              age={user.pet.age}
              breed={user.pet.breed}
              weight={user.pet.weight}
              gender={user.pet.gender}
              isNeutered={user.pet.isNeutered}
              onClick={handleNavigateToModify}
            />
          </>
        )}
        <BottomBtn direction="column" align="flex-start" padding="19px 11px">
          <Text colorCode={colors.Black} typo="Body2" align="flex-start">
            찜한 목록
          </Text>
        </BottomBtn>
        <BottomBtn
          direction="column"
          align="flex-start"
          padding="19px 11px"
          onClick={handleClickOrderHistory}
        >
          <Text colorCode={colors.Black} typo="Body2" align="flex-start">
            주문 내역
          </Text>
        </BottomBtn>
        <BottomBtn
          direction="column"
          align="flex-start"
          padding="19px 11px"
          onClick={handleClickReviewHistory}
        >
          <Text colorCode={colors.Black} typo="Body2" align="flex-start">
            구매 후기
          </Text>
        </BottomBtn>
        <BottomBtn
          direction="column"
          align="flex-start"
          padding="19px 11px"
          onClick={handleClickLogout}
        >
          <Text colorCode={colors.Black} typo="Body2" align="flex-start">
            로그아웃
          </Text>
        </BottomBtn>
        <Flex align="flex-end">
          <Toast />
        </Flex>
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
