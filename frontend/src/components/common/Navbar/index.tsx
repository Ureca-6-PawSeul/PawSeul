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

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname; // 현재 경로

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
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
            isActive={pathname === '/health'}
            text="건강"
            onClick={() => handleNavigate('/health')}
            iconType="health"
          >
            <HealthIcon height={24} />
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
    </>
  );
};

export default Navbar;

const TabContainer = styled.div`
  width: 100%;
  height: 60px;
  display: fixed;
  bottom: 0;
  z-index: 20;
  border-top: 0.5px solid rgba(112, 115, 124, 0.16);
  background-color: ${colors.White};
`;
