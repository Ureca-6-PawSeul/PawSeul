import { Flex, HeightFitFlex } from '@/components/common/Flex';
import { OrderHistory } from '@components/mypage/orderHistory';
import styled from '@emotion/styled';
import { useDeleteOrder, useGetUserOrder } from '@/apis/hooks/order';
import { Header } from '@/components/common/Header';
// import { LeftArrow } from '@/assets/images/svgs';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '@/components/common/Button';
import { Text } from '@/components/common/Typo';
import { Modal } from '@/components/common/Modal';
import { colors } from '@/styles/colors';
import { Toast } from '@/components/common/Toast';
import { IoIosArrowBack } from 'react-icons/io';


// 나중엔 날짜가 Date객체로 올거니까 date-fns 라이브러리 사용해서 포맷 변경해줘야 함
export const OrderHistoryPage = () => {
  const [userOrder, setUserOrder] = useState([]);
  const [isMoveModalOpen, setIsMoveModalOpen] = useState(false);
  const orderHistory = useGetUserOrder();
  const navigate = useNavigate();
  const handleNavigateToMypage = () => navigate('/mypage');
  const handleNavigate = () =>window.location.href = '/mypage/order';
  const { mutate: cancelOrder } = useDeleteOrder(handleNavigate);
  const toggleMoveModal = () => setIsMoveModalOpen((prev) => !prev);
  const handleCancel = (orderId: string) => cancelOrder(orderId);

  useEffect(() => {
    if (orderHistory) {
      setUserOrder(orderHistory);
    }
  }, [orderHistory]);

  return (
    <>
      <Header
        title="주문내역"
        LeftIcon={<IoIosArrowBack size={26} color={colors.Black}/>}
        onLeftIconClick={handleNavigateToMypage}
      />
      {userOrder?.length > 0 ? (
        <Wrapper
          direction="column"
          justify="flex-start"
          align="flex-start"
          padding="0 24px"
          margin="60px 0 0 0"
        >
          {userOrder?.map((order) => (
            <HeightFitFlex key={order.orderId}> 
              <Flex direction="column" justify="flex-start">
                <OrderHistory
                  date={order.orderCreatedAt}
                  state={order.orderState}
                  items={order.orderItems}
                  bottomContent=" 에 발송 예정"
                />
                {order.orderState === '결제 완료' && (
                  <Flex margin="0 0 24px 0">
                    <Button
                      width="103px"
                      height="30px"
                      borderRadius="25px"
                      onClick={toggleMoveModal}
                    >
                      <Text typo="Label2">주문 취소하기</Text>
                    </Button>
                  </Flex>
                )}
              </Flex>

              {isMoveModalOpen && (
                <Modal isOpen={isMoveModalOpen} toggleModal={toggleMoveModal}>
                  <TopToast />
                  <Flex direction="column" padding="32px 0 0" gap={12}>
                    <Text typo="Body2">주문을 취소하시겠습니까?</Text>
                    <Flex padding="0px 52px" margin="20px 0 10px" gap={20}>
                      <Button
                        height="40px"
                        bg={colors.Gray400}
                        onClick={toggleMoveModal}
                      >
                        돌아가기
                      </Button>
                      <Button
                        height="40px"
                        onClick={() => handleCancel(order.orderId)}
                      >
                        취소하기
                      </Button>
                    </Flex>
                  </Flex>
                </Modal>
              )}
            </HeightFitFlex>
          ))}
        </Wrapper>
      ) : (
        <Flex>주문한 내역이 없습니다.</Flex>
      )}
    </>
  );
};

const Wrapper = styled(Flex)`
  overflow-y: auto;
  padding-bottom: 70px;
`;

const TopToast = styled(Toast)`
  z-index: 1000;
`