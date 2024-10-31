import { Flex } from '@/components/common/Flex';
import { Text } from '@/components/common/Typo';
import { OrderHistory } from '@components/mypage/orderHistory';
import { colors } from '@/styles/colors';
import { SetStateAction, useEffect, useState } from 'react';
import { getUserOrder } from '@/apis/getUserOrder';
import { OrderHistoryType } from '@/assets/types/OrderType';

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
    <Flex
      direction="column"
      justify="flex-start"
      align="flex-start"
      padding="0 12px"
    >
      {userOrder?.map((order,) => (
        <Flex direction="column" justify="space-between">
          <OrderHistory
            date={order.order_created_at}
            items={order.order_items}
          />
        </Flex>
      ))}
    </Flex>
  );
};
