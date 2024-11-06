import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { colors } from '@styles/colors';
import { Flex } from '../Flex';
import NavItem from './NavItem';
import HomeIcon from '@assets/images/svgs/HomeIcon';
import StoreIcon from '@assets/images/svgs/StoreIcon';
import HealthIcon from '@assets/images/svgs/HealthIcon';
import SearchIcon from '@assets/images/svgs/SearchIcon';
import MypageIcon from '@assets/images/svgs/MypageIcon';
import { useNavbarStore } from '@/stores/navStore';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname; // 현재 경로

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const { isVisible, showNavbar, hideNavbar } = useNavbarStore();

  useEffect(() => {
    const hideNavbarPaths = [
      '/main',
      '/signup',
      '/signup/result',
      '/cart',
      '/payment',
      '/health/analysis',
      '/health/result',
      '/404',
    ];
    const detailPathPattern = /^\/store\/detail\/\d+$/;
    if (
      hideNavbarPaths.includes(pathname) ||
      detailPathPattern.test(pathname)
    ) {
      hideNavbar();
    } else {
      showNavbar();
    }
  }, [pathname, hideNavbar, showNavbar]);

  if (!isVisible) return null;

  return (
    <Wrapper>
      <TabContainer>
        <Flex direction="row" justify="center">
          <NavItem
            isActive={pathname === '/'}
            text="홈"
            onClick={() => handleNavigate('/')}
            iconType="home"
          >
            <HomeIcon height={20} />
          </NavItem>
          <NavItem
            isActive={pathname === '/store'}
            text="스토어"
            onClick={() => handleNavigate('/store')}
            iconType="store"
          >
            <StoreIcon height={20} />
          </NavItem>
          <NavItem
            isActive={pathname === '/health'}
            text="건강"
            onClick={() => handleNavigate('/health')}
            iconType="health"
          >
            <HealthIcon height={20} />
          </NavItem>
          <NavItem
            isActive={pathname === '/search'}
            text="검색"
            onClick={() => handleNavigate('/search')}
            iconType="mypage"
          >
            <SearchIcon height={20} />
          </NavItem>
          <NavItem
            isActive={pathname === '/mypage'}
            text="마이페이지"
            onClick={() => handleNavigate('/mypage')}
            iconType="mypage"
          >
            <MypageIcon height={20} />
          </NavItem>
        </Flex>
      </TabContainer>
    </Wrapper>
  );
};

export default Navbar;

const Wrapper = styled(Flex)`
  display: block;
  position: relative;
  height: fit-content;
`;

const TabContainer = styled.div`
  display: flex;
  max-width: 480px;
  min-width: 360px;
  position: fixed;
  width: 100%;
  height: 65px;
  display: fixed;
  bottom: 0;
  z-index: 20;
  border-top: 0.5px solid rgba(112, 115, 124, 0.16);
  background-color: ${colors.White};
  justify-content: center;
`;
