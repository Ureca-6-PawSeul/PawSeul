import { postUserOrder } from '@/apis/order';
import { ProductType } from '@/assets/types/ProductType';
import { Button } from '@/components/common/Button';
import { loadTossPayments } from '@tosspayments/tosspayments-sdk';
import { useEffect, useState } from 'react';

// ------  SDK 초기화 ------
// @docs https://docs.tosspayments.com/sdk/v2/js#토스페이먼츠-초기화
const clientKey = 'test_ck_E92LAa5PVbvwObBw0bWzV7YmpXyJ';
const customerKey = 'HGuVDqQX_LwPcLpsdVLY9';

interface TossPaymentProps {
  price: number;
  orderItems: ProductType[];
}

export const TossPayment = ({ price, orderItems }: TossPaymentProps) => {
  const [payment, setPayment] = useState(null);
  // const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [amount] = useState({
    currency: 'KRW',
    value: price,
  });

  useEffect(() => {
    async function fetchPayment() {
      try {
        const tossPayments = await loadTossPayments(clientKey);

        // 회원 결제
        // @docs https://docs.tosspayments.com/sdk/v2/js#tosspaymentspayment
        const payment = tossPayments.payment({
          customerKey,
        });
        // 비회원 결제
        // const payment = tossPayments.payment({ customerKey: ANONYMOUS });

        setPayment(payment);
      } catch (error) {
        console.error('Error fetching payment:', error);
      }
    }
    fetchPayment();
  }, []);

  // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
  // @docs https://docs.tosspayments.com/sdk/v2/js#paymentrequestpayment
  async function requestPayment() {
    // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
    //아이템 보내면 orderId reponse로 받아와
    const orderData = {
      totalPrice: price,
      orderItems,
    };
    // console.log(orderData);
    const orderId = await postUserOrder(orderData);

    // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
    await payment.requestPayment({
      method: 'CARD', // 카드 및 간편결제
      amount,
      orderId: orderId, // 고유 주분번호
      orderName: `${orderItems[0].title} 외 ${orderItems.length - 1}건`,
      successUrl: window.location.origin + '/payment/success', // 결제 요청이 성공하면 리다이렉트되는 URL
      failUrl: window.location.origin + '/payment/fail', // 결제 요청이 실패하면 리다이렉트되는 URL
      // customerEmail: 'customer123@gmail.com',
      // customerName: '김토스',
      // customerMobilePhone: '01012341234',
      // 카드 결제에 필요한 정보
      card: {
        useEscrow: false,
        flowMode: 'DEFAULT', // 통합결제창 여는 옵션
        useCardPoint: false,
        useAppCardOnly: false,
      },
    });
  }

  return (
    <Button height="50px" onClick={() => requestPayment()}>
      {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원 결제하기
    </Button>
  );
};
