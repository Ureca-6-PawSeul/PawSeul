import { patchUserOrder } from '@/apis/order';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

// 결제 성공해서 Order 테이블에 주문 내역 patch 요청을 보내고 결제 성공 얼럿 보내기
// 마이페이지 > 구매내역으로 이동시키게
export const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const paymentKey = searchParams.get('paymentKey');
  const amount = searchParams.get('amount');
  const successMessage="결제가 완료되었습니다.";
  const navigate = useNavigate();

  useEffect(() => {
    console.log(orderId, paymentKey, amount);

    //patch : 결제 상태를 "결제 완료"로 변경 요청
    const patchData = {orderId : orderId, state : "결제 완료"}
    const response = patchUserOrder(patchData);

    alert(successMessage);
    navigate('/mypage/order');
  });

  return <></>;
};
