// 결제 실패해서 다시 결제 페이지로 돌아가도록 하는 용도

import { deleteUserOrder } from '@/apis/order';
import PaymentLoading from '@/components/payment/PaymentLoading';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const PaymentFail = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const orderId = searchParams.get('orderId');
  const navigate = useNavigate();
  const errorMessage = '결제가 실패했습니다. 다시 시도해 주세요.';

  useEffect(() => {
    // 페이지 진입 시 alert를 띄우고 일정 시간 후 결제 페이지로 이동
    alert(errorMessage);

    const handleDeleteOrder = async () => {
      if (orderId) {
        setIsLoading(true);
      }
      try {
        await deleteUserOrder(orderId); // 결제 상태 "결제 실패"로 변경 요청
        navigate('/payment'); // 성공 시 결제 페이지로 이동
      } catch (error) {
        alert('결제를 실패했습니다.');
      } finally {
        setIsLoading(false); // 로딩 완료
      }
    };

    handleDeleteOrder();
  }, [navigate, orderId]);

  if (isLoading) {
    return <PaymentLoading />; // 로딩 애니메이션 컴포넌트
  }

  return <></>;
};
