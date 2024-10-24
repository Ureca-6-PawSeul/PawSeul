import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { colors } from '@styles/colors';
import { Flex } from '../Flex';
import NavItem from './NavItem';
import HomeIcon from '@assets/images/svgs/HomeIcon';
import MypageIcon from '@assets/images/svgs/MypageIcon';
import SearchIcon from '@assets/images/svgs/SearchIcon';
import StoreIcon from '@assets/images/svgs/StoreIcon';

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
        <Flex direction="row">
          <NavItem
            isActive={pathname === '/'}
            text="홈"
            onClick={() => handleNavigate('/')}
            iconType="home"
          >
            <HomeIcon height={24} />
          </NavItem>
          <NavItem
            isActive={pathname === '/store'}
            text="스토어"
            onClick={() => handleNavigate('/store')}
            iconType="store"
          >
            <StoreIcon height={24} />
          </NavItem>
          <NavItem
            isActive={pathname === '/search'}
            text="검색"
            onClick={() => handleNavigate('/search')}
            iconType="mypage"
          >
            <SearchIcon height={24} />
          </NavItem>
          <NavItem
            isActive={pathname === '/mypage'}
            text="마이페이지"
            onClick={() => handleNavigate('/mypage')}
            iconType="mypage"
          >
            <MypageIcon height={24} />
          </NavItem>
        </Flex>
      </TabContainer>
    </>
  );
};

export default Navbar;

const TabContainer = styled.div`
  width: 100%;
  height: 85px;
  display: fixed;
  bottom: 0;
  z-index: 20;
  border-top: '0.5px solid rgba(112, 115, 124, 0.16)';
  background-color: ${colors.White};
`;
