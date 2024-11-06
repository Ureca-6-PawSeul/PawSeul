import { Flex } from '@/components/common/Flex';
import { OrderHistory } from '@components/mypage/orderHistory';
import styled from '@emotion/styled';
import { useGetUserOrder } from '@/apis/hooks/order';
import { Header } from '@/components/common/Header';
import { LeftArrow } from '@/assets/images/svgs';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

// 나중엔 날짜가 Date객체로 올거니까 date-fns 라이브러리 사용해서 포맷 변경해줘야 함
export const OrderHistoryPage = () => {
  const [userOrder, setUserOrder] = useState([]);
  const orderHistory = useGetUserOrder();
  const navigate = useNavigate();
  const handleNavigateToMypage = () => {
    navigate('/mypage')
  }

  useEffect(()=>{
    if(orderHistory){
      setUserOrder(orderHistory)
    }
  },[orderHistory])

  return (
    <>
    <Header title="주문내역" LeftIcon={<LeftArrow height={24}/>} onLeftIconClick={handleNavigateToMypage}/>
    {userOrder?.length > 0 ?
    (<Wrapper
      direction="column"
      justify="flex-start"
      align="flex-start"
      padding="0 12px"
      margin="60px 0 0 0"
    >
      {userOrder?.map((order,) => (
        <Flex direction="column" justify="flex-start" height="fit-content">
          <OrderHistory
            date={order.orderCreatedAt}
            state={order.orderState}
            items={order.orderItems}
            bottomContent=' 에 발송 예정'
          />
        </Flex>
      ))}
    </Wrapper>)
    :
    (<Flex>
        주문한 내역이 없습니다.
    </Flex>)
  }
    </>
  );
};

const Wrapper = styled(Flex)`
overflow-y: auto;
padding-bottom: 70px;
`