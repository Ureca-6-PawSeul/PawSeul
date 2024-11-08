import { patchUserOrder } from '@/apis/order';
import PaymentLoading from '@/components/payment/PaymentLoading';
import useCartStore from '@/stores/cartStore';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const orderId = searchParams.get('orderId');
  const paymentKey = searchParams.get('paymentKey');
  const amount = searchParams.get('amount');
  const successMessage = '결제가 완료되었습니다.';
  const navigate = useNavigate();
  const setSelectedItems = useCartStore((state) => state.setSelectedItems); //선택아이템 세션 삭제를 위해서
  const setTotalPrice = useCartStore((state) => state.setTotalPrice);

  useEffect(() => {
    const handlePatchOrder = async () => {
      if (orderId && paymentKey && amount) {
        setIsLoading(true);
        try {
          const patchData = {
            orderId: orderId,
            tossOrderKey: paymentKey,
            price: parseInt(amount),
          };
          await patchUserOrder(patchData);

          //성공 시 장바구니 전역 상태 변수(selectedItems, totalPrice) 초기화
          setSelectedItems([]);
          setTotalPrice(0);
          alert(successMessage);
          navigate('/mypage/order');
        } catch (error) {
          console.error('Error fetching payment:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    handlePatchOrder();
  }, [amount, navigate, orderId, paymentKey, setSelectedItems, setTotalPrice]);

  if (isLoading) {
    return <PaymentLoading />;
  }

  return null;
};
