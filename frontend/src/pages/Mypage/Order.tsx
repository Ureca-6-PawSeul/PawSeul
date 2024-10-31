import { Flex } from '@/components/common/Flex';
import { OrderHistory } from '@components/mypage/orderHistory';
import { SetStateAction, useEffect, useState } from 'react';
import { getUserOrder } from '@/apis/getUserOrder';
import { OrderHistoryType } from '@/assets/types/OrderType';
import styled from '@emotion/styled';

// 나중엔 날짜가 Date객체로 올거니까 date-fns 라이브러리 사용해서 포맷 변경해줘야 함
export const OrderHistoryPage = () => {
  const [userOrder, setUserOrder] = useState([]);
  const fetch = async (
    user_id: string,
    setUserOrder: React.Dispatch<SetStateAction<OrderHistoryType[]>>,
  ) => {
    try {
      await getUserOrder('1', setUserOrder);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetch('1', setUserOrder);
  }, []);

  return (
    <Wrapper
      direction="column"
      justify="flex-start"
      align="flex-start"
      padding="0 12px"
    >
      {userOrder?.map((order,) => (
        <Flex direction="column" justify="flex-start" height="fit-content">
          <OrderHistory
            date={order.order_created_at}
            state={order.order_state}
            items={order.order_items}
            bottomContent={`${order.order_created_at} + 3일 후 발송 예정`}
          />
        </Flex>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled(Flex)`
overflow-y: auto;
padding-bottom: 70px;
`