import styled from '@emotion/styled';
import { Flex } from '../Flex';
import { Text } from '../Typo';
import { colors } from '@/styles/colors';
import { CartIcon } from '@/assets/images/svgs';
import useCartStore from '@/stores/cartStore';

interface HeaderType {
  title?: string;
  LeftIcon?: JSX.Element | null;
  RightIcon?: JSX.Element | null;
  onLeftIconClick?: () => void;
  onRightIconClick?: () => void;
  iconWidth?: string;
}

export const Header = ({
  title,
  LeftIcon,
  RightIcon,
  onLeftIconClick,
  onRightIconClick,
  iconWidth = '48px',
}: HeaderType) => {
  // RightIcon이 CartIcon일 경우 특정 로직을 실행하도록 조건부 확인
  const isCartIcon =
    RightIcon && RightIcon.type === CartIcon && RightIcon.props.height === 24;
  
  const cartItems = useCartStore((state) => state.cartItems);
  

  return (
    <HeaderWrapper>
      <FixedHeader
        direction="row"
        align="center"
        justify="space-between"
        height={56}
        padding="0 18px"
      >
        <IconBox onClick={onLeftIconClick} iconWidth={iconWidth} isLeft={true}>
          {LeftIcon}
        </IconBox>

        {title && (
          <Text
            typo="Heading4"
            align="center"
            colorCode={colors.Black}
            margin="0 auto"
          >
            {title}
          </Text>
        )}

        <IconBox
          onClick={onRightIconClick}
          iconWidth={iconWidth}
          isLeft={false}
        >
          {RightIcon}
          {/* {isCartIcon && cartItems.length > 0 && (
            <RedBadge />
          )} */}
        </IconBox>
      </FixedHeader>
    </HeaderWrapper>
  );
};

const RedBadge = styled.div`
  position: absolute;
  top: 15px; /* 위치 조정 */
  right: -4px; /* 위치 조정 */
  width: 12px;
  height: 12px;
  background-color: red;
  border-radius: 50%;
  z-index: 1; /* RightIcon보다 위에 표시되도록 설정 */
`;

const HeaderWrapper = styled(Flex)`
  position: relative;
  height: fit-content;
`;

const FixedHeader = styled(Flex)`
  position: absolute;
  top: 0;
  background-color: ${colors.White};
  z-index: 10;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const IconBox = styled.div<{ iconWidth: string; isLeft?: boolean }>`
  display: flex;
  width: ${({ iconWidth }) => `${iconWidth}`};
  height: 100%;
  align-items: center;
  justify-content: ${({ isLeft }) => (isLeft ? 'flex-start' : 'flex-end')};

  cursor: pointer;

  position: relative;
`;
